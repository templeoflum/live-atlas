const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {execFileSync} = require('node:child_process');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const model = require('../atlas-model.cjs')();
const drill = vm.runInNewContext(read('manual-data.js') + '\n' + read('shortcut-explorer.js') + '\n' + read('practice/drill.js') + '\nnavigationDrill');
assert.equal(drill.items.length, 10);
assert.equal(new Set(drill.items.map(item => item.row.action)).size, 10);
assert.ok(model.workspaceAtlas.neighborhoods.find(n => n.id === 'navigation').ids.includes('shortcuts'));
for (const item of drill.items) {
  const source = model.manualData.shortcuts.find(row => row.section === item.row.section && row.action === item.row.action);
  assert.ok(source, item.row.action);
  assert.equal(source.mac, item.row.mac);
  assert.equal(model.shortcutExplorer.rowHome(source), item.card);
  assert.equal(model.entries.get(item.card).view, 'workspace');
  assert.ok(model.entries.get(item.card).atlasContext.includes('Move around'));
  assert.equal(item.href, '../index.html#workspace/' + item.card);
  for (const combo of item.combinations) {
    // Option modifies event.key on Mac; physical event.code remains stable.
    const event = {code: combo.code, key: '¡', metaKey: combo.meta, altKey: combo.alt, shiftKey: combo.shift, ctrlKey: combo.ctrl};
    assert.equal(drill.matches(event, item), true);
    for (const flag of ['metaKey', 'altKey', 'shiftKey', 'ctrlKey']) {
      assert.equal(drill.matches({...event, [flag]: !event[flag]}, item), false);
    }
    assert.equal(drill.matches({...event, code: 'KeyY'}, item), false);
  }
}
const compatibility = execFileSync(process.execPath, ['--expose-internals', '-e', `
  const fs=require('node:fs'),acorn=require('internal/deps/acorn/acorn/dist/acorn');
  for(const file of ['manual-data.js','shortcut-explorer.js','practice/drill.js']){
    const source=fs.readFileSync(file,'utf8');
    acorn.parse(source,{ecmaVersion:2020});
    if(/\\.at\\s*\\(|\\[\\s*['"]at['"]\\s*\\]\\s*\\(/.test(source))throw Error('Array.at in '+file);
  }
  console.log('PASS: three browser scripts parse as ES2020; no Array.at');
`], {cwd: root, encoding: 'utf8'});
console.log('PASS: all 10 drill actions, keys and links resolve to Workspace Navigation atlas data; all alternatives and exact modifiers checked');
console.log(compatibility.trim());

// Exercise the mounted interface, including focus, feedback, map and optional speech.
const nodes = new Map();
let focused, speech = [], cancelled = 0;
function node(id) {
  const element = {id, dataset:{}, textContent:'', events:{}, attributes:{}, state:{textContent:''},
    addEventListener(type, callback) {this.events[type] = callback;},
    focus() {focused = id;},
    setAttribute(name, value) {this.attributes[name] = value;},
    querySelector() {return this.state;}};
  nodes.set(id, element); return element;
}
['action','card','keys','feedback','next','previous','effect','audio',
  ...['browser','session','arrangement','clip','device'].map(id => 'region-' + id)].forEach(node);
const doc = {hidden:false, events:{}, getElementById:id => nodes.get(id),
  addEventListener(type, callback) {this.events[type] = callback;}};
const win = {speechSynthesis:{cancel() {cancelled++;}, speak(utterance) {speech.push(utterance.text);}},
  SpeechSynthesisUtterance:function(text) {this.text = text;}};
vm.runInNewContext(read('manual-data.js') + '\n' + read('shortcut-explorer.js') + '\n' + read('practice/drill.js'), {document:doc, window:win});
const text = id => nodes.get(id).textContent;
function press(event) {
  let prevented = false;
  nodes.get('keys').events.keydown({...event, preventDefault() {prevented = true;}});
  return prevented;
}
assert.equal(speech.length, 0, 'silent by default');
assert.equal(press({key:'x',code:'KeyX'}), true);
assert.equal(text('feedback'), 'Tab');
assert.equal(text('effect'), '', 'wrong key does not move the map');
press({key:'Tab',code:'Tab'});
assert.equal(text('feedback'), 'yes · Tab');
assert.equal(nodes.get('region-arrangement').state.textContent, 'Visible');
assert.equal(nodes.get('region-session').state.textContent, 'Hidden');
press({key:'Tab',code:'Tab'});
assert.equal(nodes.get('region-session').state.textContent, 'Visible', 'toggle is reversible');
press({key:'Enter',code:'Enter',repeat:true});
assert.equal(text('action'), drill.items[0].row.action, 'held Enter cannot skip prompts');
for (let i = 1; i <= drill.items.length; i++) {
  press({key:'Enter',code:'Enter'});
  assert.equal(focused, 'keys');
  const item = drill.items[i % drill.items.length];
  assert.equal(text('action'), item.row.action);
  assert.equal(nodes.get('card').href, item.href);
  assert.equal(text('feedback'), '');
  for (const combo of item.combinations) {
    press({key:combo.key,code:combo.code,metaKey:combo.meta,altKey:combo.alt,shiftKey:combo.shift,ctrlKey:combo.ctrl});
    assert.equal(text('feedback'), 'yes · ' + item.row.mac);
    assert.ok(text('effect'));
  }
}
nodes.get('previous').events.click();
assert.equal(text('action'), drill.items[9].row.action);
press({key:'5',code:'Digit5',altKey:true});
assert.equal(nodes.get('region-browser').state.textContent, 'Focused');
assert.equal(nodes.get('region-browser').dataset.active, 'true');
press({key:'Escape'});
assert.equal(focused, 'next');
nodes.get('next').events.click();
assert.equal(focused, 'keys');
assert.equal(text('action'), drill.items[0].row.action);
nodes.get('audio').events.click();
assert.equal(nodes.get('audio').attributes['aria-pressed'], 'true');
assert.equal(speech[speech.length-1], drill.items[0].row.action);
press({key:'Tab',code:'Tab'});
assert.equal(speech[speech.length-1], text('effect'));
doc.hidden = true; const before = cancelled; doc.events.visibilitychange();
assert.equal(cancelled, before + 1);
nodes.get('audio').events.click();
assert.equal(nodes.get('audio').attributes['aria-pressed'], 'false');
console.log('PASS: mounted drill checks wrong/right keys, all alternatives, all 10 Enter transitions and wrap, retained focus, reversible map, Escape, previous/next, silent default, speech on/off and hidden-page cancellation');
