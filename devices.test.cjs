const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const read=n=>readFileSync(join(__dirname,n),'utf8');
const html=read('index.html'),source=read('atlas.js');
const modules=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]).filter(n=>n!=='atlas.js');
const evaluate=devices=>vm.runInNewContext(modules.filter(n=>devices||n!=='devices-atlas.js').map(read).join('\n')+'\n'+source.slice(0,source.indexOf('const flags=new Set();'))+'\n({entries,topicGroups,manualAtlas,captures,families,entryCaptures'+(devices?',devicesAtlas':'')+'})',{URL,document:{querySelector:()=>null}});
const before=evaluate(false),after=evaluate(true),json=x=>JSON.parse(JSON.stringify(x));
const {devicesAtlas:d,manualAtlas:m,entries,topicGroups,captures,families,entryCaptures}=after;
for(const [id,e] of before.entries){assert.ok(entries.has(id),id);assert.equal(entries.get(id).view,e.view,'Preserve route and flag identity: '+id);}
for(const view of ['workspace','clips','history'])assert.deepEqual(json(topicGroups[view]),json(before.topicGroups[view]),'No changes to '+view);
assert.ok(Object.values(captures).every(c=>c.file.startsWith('manual/')||c.file.startsWith('history/')),'Only manual figures and separately curated historical sources');
assert.ok(Object.values(entryCaptures).every(images=>images.length===0),'Legacy screenshot assignments retired');
assert.deepEqual(json(families),json(before.families),'Keep the complete catalog');
for(const n of m.nodes.values())if(n.view==='devices'){
  assert.ok(d.owned(n.id),'Source has an action home: '+n.key);
  assert.ok(d.sourceHomes.has(n.key),'Explicit editorial source mapping: '+n.key);
}
const catalogIDs=families.flatMap(f=>f.items.map(i=>i[0]));
assert.equal(catalogIDs.length,85);
for(const id of [...catalogIDs,'chain','midi-effects','instrument','audio-effects'])assert.ok(d.owned(id),id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const index=d.index(esc);
assert.equal((index.match(/data-device-neighborhood="/g)||[]).length,d.neighborhoods.length,'Fixed neighborhood controls');
assert.equal((index.match(/class="topic-item device-place"/g)||[]).length,4,'Only one neighborhood is rendered');
assert.ok(!/<details|<summary|aria-expanded|manual-section-link/.test(index),'No expanding tree');
const neighborhoodIDs=d.neighborhoods.flatMap(g=>g.ids);
assert.equal(neighborhoodIDs.length,89);assert.equal(new Set(neighborhoodIDs).size,89,'One neighborhood per device');
for(const area of d.areas)assert.ok(neighborhoodIDs.includes(area.home),'Complete catalog: '+area.home);
for(const group of d.neighborhoods){
  assert.ok(group.ids.length<=11,'Small device list: '+group.name);
  d.selectNeighborhood(group.id);
  const rendered=d.index(esc);
  assert.equal((rendered.match(/data-device-neighborhood="/g)||[]).length,d.neighborhoods.length,'Controls remain in place');
  assert.equal((rendered.match(/class="topic-item device-place"/g)||[]).length,d.landings[group.id]?0:group.ids.length,'Pilot uses card choices; other neighborhoods keep their bounded list');
  assert.equal((rendered.match(/aria-pressed="true"/g)||[]).length,1);
  for(const id of group.ids)assert.equal(d.neighborhoodOf(id).id,group.id);
  const picker=d.picker(esc);
  assert.ok(picker.includes('data-device-neighborhood-select'));
  assert.ok(picker.includes('data-topic-picker="devices"'));
  for(const id of group.ids)assert.ok(picker.includes(`value="${id}"`));
}
assert.equal(d.neighborhoodOf('da-sampler--map').id,'samplers','Action routes retain neighborhood');
assert.equal(d.neighborhoodOf('ref-live-instrument-reference--slicing-playback-mode').id,'samplers','Legacy source routes retain neighborhood');
assert.equal(d.neighborhoodOf('ref-max-for-live-devices--ds-kick').id,'drums');
assert.equal(d.neighborhoodOf('ref-max-for-live-devices--lfo').id,'motion');
const active=d.activeNeighborhood();d.selectNeighborhood('not-a-neighborhood');assert.equal(d.activeNeighborhood(),active,'Invalid filter is inert');
assert.ok(!source.includes("$('#deviceGroups .device-place.selected')?.scrollIntoView"),'No page/sidebar scroll on action selection');
const allItems=d.areas.flatMap(a=>a.items);
assert.equal(new Set(allItems.map(i=>i.id)).size,allItems.length);
for(const area of d.areas){assert.ok(area.items.length>=2&&area.items.length<=6,'Bounded action bar: '+area.home);assert.equal(d.mainId(area.home),area.home);}
const context={esc,entries,captureFigure:id=>{assert.ok(captures[id],id);assert.ok(captures[id].file.startsWith('manual/'),'Device cards still use manual figures only');return `<figure data-capture="${id}"></figure>`;},flagHTML:id=>`<button data-flag="${id}">Flag</button>`};
for(const [id,loc] of d.locations){
  assert.equal(entries.get(id).view,'devices');assert.equal(d.mainId(id),loc.area.home);
  assert.ok(loc.item.steps.length>=2,'Performable steps: '+id);
  assert.equal(new URL(loc.item.url).hostname,'www.ableton.com');
  for(const n of loc.item.sources){
    const file=readFileSync(join(__dirname,'../manual-research',n.chapter+'.html'),'utf8');
    assert.ok(file.includes(`id="${n.anchor}"`),'Actual manual anchor: '+n.key);
  }
  for(const platform of ['mac','win']){
    const host={innerHTML:'',scrollTop:99};d.mount(host,entries.get(id),{...context,platform:()=>platform});
    assert.equal(host.scrollTop,0);assert.ok(host.innerHTML.includes(`data-flag="${id}"`));
    assert.ok(!/<details|<summary|<video/.test(host.innerHTML),'No fourth disclosure or new video: '+id);
    assert.ok(!/undefined|\[object Object\]|\{[A-Za-z]+\}/.test(host.innerHTML),'Resolved content: '+id);
    assert.equal((host.innerHTML.match(/aria-current="page"/g)||[]).length,1);
    for(const step of loc.item.steps)if(!step.includes('{'))assert.ok(host.innerHTML.includes(esc(step)),'Visible step: '+id);
    for(const match of host.innerHTML.matchAll(/data-entry="([^"]+)"/g))assert.ok(entries.has(match[1]),match[1]);
  }
}
assert.equal(d.locations.get('ref-live-instrument-reference--slicing-playback-mode').item.slug,'slice');
assert.equal(d.locations.get('ref-live-audio-effect-reference--sidechain-parameters-1').item.slug,'duck');
assert.equal(d.locations.get('ref-max-for-live-devices--slide').item.slug,'slide');
assert.ok(d.locations.get('da-plugins--configure').item.note.includes('automation'),'Configuration deletion warning');
assert.ok(d.locations.get('da-drum-rack--extract').item.steps.some(s=>s.includes('not the clip notes')),'Extraction paths distinguished');
assert.ok(html.includes('aria-label="Device shortcut platform"'));
console.log('Passed: device catalog and source routes, bounded action bars, visible content, citations, key platforms and manual-only active captures.');
