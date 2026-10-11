const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const read=name=>readFileSync(join(__dirname,name),'utf8');
const atlas=read('atlas.js'),html=read('index.html');
const modules=Array.from(html.matchAll(/<script src="([^"]+)"/g),m=>m[1]).filter(n=>n!=='atlas.js');
const prelude=atlas.slice(0,atlas.indexOf('const flags=new Set();'));
const evaluate=withWorkspace=>vm.runInNewContext(modules.filter(n=>withWorkspace||n!=='workspace-atlas.js').map(read).join('\n')+'\n'+prelude+'\n({entries,topicGroups,manualAtlas,captures'+(withWorkspace?',workspaceAtlas':'')+'})',{URL,document:{querySelector:()=>null}});
const before=evaluate(false),after=evaluate(true);
const {workspaceAtlas:w,entries,topicGroups,manualAtlas,captures}=after;
const json=value=>JSON.parse(JSON.stringify(value));
assert.deepEqual(json(w.neighborhoods.map(a=>a.name)),['Navigation','Browser','Session','Arrangement','Mixer','Routing','Files','Settings & controllers']);
assert.deepEqual(json(topicGroups.workspace),json(w.neighborhoods));
assert.equal(topicGroups.sets,undefined,'No separate Sets territory');
for(const view of ['clips','devices','history'])assert.deepEqual(json(topicGroups[view]),json(before.topicGroups[view]),`No reorganization outside Workspace: ${view}`);
for(const [id,entry] of before.entries){
  assert.ok(entries.has(id),`Old route retained: ${id}`);
  assert.equal(entries.get(id).view,entry.view,`Old territory retained: ${id}`);
}
for(const id of ['switch-views','clip-view','device-view','browser','hide-browser','transport','settings','mapping','undo','duplicate','rename'])assert.ok(w.owned(id),`Original Workspace action integrated: ${id}`);
for(const n of manualAtlas.nodes.values())if([2,4,5,6,7,17,18,20,25].includes(n.chapterNumber))assert.ok(w.owned(n.id),`Contextual home for source: ${n.key}`);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const context={esc,entries,captureFigure:id=>{assert.ok(captures[id],`Real image ${id}`);return `<figure data-capture="${id}"></figure>`;},flagHTML:id=>`<button data-flag="${id}">Flag</button>`};
const index=w.index(esc);
assert.equal((index.match(/data-workspace-neighborhood="/g)||[]).length,8);
assert.equal((index.match(/class="topic-item workspace-place/g)||[]).length,5);
assert.ok(!/<details|<summary|aria-expanded/.test(index),'Families filter; nothing expands');
const placeIDs=w.neighborhoods.flatMap(g=>g.ids);
assert.equal(new Set(placeIDs).size,placeIDs.length,'One family per place');
for(const group of w.neighborhoods){
  assert.ok(group.ids.length<=7,'Bounded place list: '+group.name);
  w.selectNeighborhood(group.id);
  const filtered=w.index(esc),picker=w.picker(esc);
  assert.equal((filtered.match(/data-workspace-neighborhood="/g)||[]).length,8);
  assert.equal((filtered.match(/class="topic-item workspace-place/g)||[]).length,group.ids.length);
  for(const id of group.ids){assert.equal(w.neighborhoodOf(id).id,group.id);assert.ok(picker.includes(`value="${id}"`));}
  assert.ok(picker.includes('data-workspace-neighborhood-select'));
}
for(const area of w.areas){assert.ok(placeIDs.includes(area.home));assert.ok(area.items.length<=6,'Bounded action bar: '+area.label);}
for(const [id,family] of [['session','session'],['scenes','session'],['split','arrangement'],['automation','arrangement'],['ws-zoom','arrangement'],['tracks','mixer'],['new-midi','mixer'],['set','files'],['export','files'],['mapping','settings']])assert.equal(w.neighborhoodOf(id).id,family);
assert.ok(!/manual-index|Manual/.test(index),'No parallel manual chapter tree in Workspace');
for(const [id,loc] of w.locations){
  assert.ok(entries.has(id));assert.equal(entries.get(id).view,'workspace');
  assert.equal(w.mainId(id),loc.area.home);
  assert.ok(loc.area.items.includes(loc.action));
  assert.ok(loc.item.data.body,`Introduction: ${id}`);
  assert.equal(new URL(loc.item.url).hostname,'www.ableton.com');
  for(const platform of ['mac','win']){
    const host={innerHTML:'',scrollTop:10};
    w.mount(host,entries.get(id),{...context,platform:()=>platform});
    assert.equal(host.scrollTop,0);
    assert.ok(host.innerHTML.includes(`aria-label="${esc(loc.area.label)} topics"`),'Local actions remain available at every depth');
    assert.ok(host.innerHTML.includes(`>${esc(loc.item.label)}</h4>`));
    assert.ok(!/undefined|\[object Object\]|\{(?:search|browser|duplicate|rename|undo|settings)\}/.test(host.innerHTML),id);
    assert.ok(!/<details\b/.test(host.innerHTML),'No fourth-level explanation disclosure');
    for(const match of host.innerHTML.matchAll(/data-entry="([^"]+)"/g))assert.ok(entries.has(match[1]),`Valid link ${match[1]}`);
    for(const [label,mac,win] of loc.item.data.keys)assert.ok(host.innerHTML.includes(esc(platform==='mac'?mac:win)),label);
    for(const parent of loc.parents)assert.ok(host.innerHTML.includes(`>${esc(parent.label)}</h4>`),'Parent and child content stay visible in one card');
  }
}
const sourceId=key=>manualAtlas.nodes.get(key).id;
const tags=w.locations.get(sourceId('working-with-the-browser#tag-editor'));
assert.deepEqual(json(tags.parents.map(p=>p.label)),['Filters','Tags']);
assert.equal(tags.area.label,'Filters & collections');assert.equal(tags.action.label,'Filters');
assert.equal(w.mainId(sourceId('working-with-the-browser#working-with-the-browser')),'browser');
assert.equal(w.label('browser'),'Search & load');
assert.equal(w.label('shortcuts'),'Shortcuts');
assert.ok(manualAtlas.search('tag editor').some(r=>w.owned(r.id)),'Find opens the contextual Workspace location');
assert.equal(manualAtlas.search('tag editor')[0].context,'Filters & collections › Filters › Tags');
const additions={
  views:['make-room','fold'],
  'arrangement-timeline':['zoom','pan','fit'],
  'mixer-tracks':['fold-tracks'],
  transport:['tap-tempo','nudge-tempo','read-feedback','cpu','disk'],
  editing:['select','adjust','type-value','reset-value','write-note'],
  controllers:['key-map','revise-map','range','invert-range','remove-map','takeover']
};
for(const [area,ids] of Object.entries(additions))for(const suffix of ids){
  const loc=w.locations.get('ws-'+suffix);
  assert.ok(loc,`Audit gap has a real action: ${suffix}`);
  assert.equal(loc.area.id,area,`Within the existing area: ${suffix}`);
  assert.ok(loc.item.data.steps.length,`Performable steps: ${suffix}`);
  for(const image of loc.item.data.images)assert.ok(captures[image].file.startsWith('manual/'),`Manual illustration: ${suffix}`);
}
for(const [source,home] of [
  ['live-concepts#the-status-bar','ws-read-feedback'],
  ['computer-audio-resources-and-strategies#the-cpu-load-meter','ws-cpu'],
  ['computer-audio-resources-and-strategies#managing-the-disk-load','ws-disk'],
  ['midi-and-key-remote-control#computer-keyboard-remote-control','ws-key-map'],
  ['midi-and-key-remote-control#the-mapping-browser','ws-revise-map'],
  ['midi-and-key-remote-control#takeover-mode','ws-takeover']
])assert.equal(w.locations.get(sourceId(source)).item.id,home,`Manual source lands inside the map: ${source}`);
assert.ok(w.locations.get(sourceId('first-steps#info-view')).item.data.links.includes('ws-write-note'));
assert.ok(w.locations.get('ws-reset-value').item.data.note.includes('selected device'));
assert.ok(w.locations.get('ws-tap-tempo').item.data.note.includes('start playback'));
assert.equal(w.locations.get('ws-remove-map').item.data.keys[0][2],'Backspace');
assert.ok(!w.locations.get('ws-disk').item.data.note.includes('screenshot'),'Retired screenshot description removed');
assert.ok(html.indexOf('workspace-atlas.js')>html.indexOf('manual-atlas.js'));
assert.ok(html.indexOf('workspace-atlas.js')<html.indexOf('src="atlas.js"'));
console.log('Passed: eight fixed Workspace families, bounded places/actions, contextual manual sections, search, references, both key platforms, unchanged Clips and Devices.');
