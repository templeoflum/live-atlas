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
