const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const read=n=>readFileSync(join(__dirname,n),'utf8');
const source=read('atlas.js'),html=read('index.html');
const modules=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]).filter(n=>n!=='atlas.js');
const evaluate=clips=>vm.runInNewContext(modules.filter(n=>clips||n!=='clips-atlas.js').map(read).join('\n')+'\n'+source.slice(0,source.indexOf('const flags=new Set();'))+'\n({entries,topicGroups,manualAtlas,captures'+(clips?',clipsAtlas':'')+'})',{URL,document:{querySelector:()=>null}});
const before=evaluate(false),after=evaluate(true);
const {clipsAtlas:c,manualAtlas:m,entries,captures,topicGroups}=after;
const json=x=>JSON.parse(JSON.stringify(x));
for(const [id,e] of before.entries){assert.ok(entries.has(id),id);assert.equal(entries.get(id).view,e.view,'Preserve territory and flag identity: '+id);}
for(const view of ['workspace','devices','history'])assert.deepEqual(json(topicGroups[view]),json(before.topicGroups[view]),'Clips does not reorganize '+view);
for(const n of m.nodes.values())if(n.view==='clips'){
  assert.ok(c.owned(n.id),'Existing Clips source has an action home: '+n.key);
  assert.ok(c.sourceHomes.has(n.key),'Explicit editorial mapping, not incidental ID alias: '+n.key);
}
for(const id of ['clips','midi-clip','audio-source','record-midi','record-audio','capture','edit-notes','quantize','loop','warp'])assert.ok(c.owned(id));
assert.deepEqual(json(topicGroups.clips[0].ids),json(c.areas.map(a=>a.home)));
assert.equal(new Set(c.areas.flatMap(a=>a.items.map(i=>i.id))).size,c.areas.flatMap(a=>a.items).length);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const index=c.index(esc);assert.ok(!/<details|Manual/.test(index),'No parallel chapter tree');
assert.equal((index.match(/class="topic-item clip-place"/g)||[]).length,c.areas.length);
const context={esc,entries,captureFigure:id=>{assert.ok(captures[id],id);return `<figure data-capture="${id}"></figure>`;},flagHTML:id=>`<button data-flag="${id}">Flag</button>`};
for(const [id,loc] of c.locations){
  assert.equal(entries.get(id).view,'clips');assert.equal(c.mainId(id),loc.area.home);
  assert.ok(loc.area.items.includes(loc.item));assert.ok(loc.item.parts.length);
  assert.ok(loc.item.parts.some(p=>p.guide.steps.length),'Performable steps: '+id);
  assert.equal(new URL(loc.item.url).hostname,'www.ableton.com');
  for(const platform of ['mac','win']){
    const host={innerHTML:'',scrollTop:99};c.mount(host,entries.get(id),{...context,platform:()=>platform});
    assert.equal(host.scrollTop,0);assert.ok(host.innerHTML.includes(`data-flag="${id}"`),'Existing flag remains individually accessible');
    assert.ok(!/<details|<summary/.test(host.innerHTML),'No fourth-level disclosure: '+id);
    assert.ok(!/undefined|\[object Object\]|\{[A-Za-z]+\}/.test(host.innerHTML),id);
    assert.ok(!/\bautoplay\b/.test(host.innerHTML));
    assert.ok(host.innerHTML.includes(`>${esc(loc.item.label)}</h4>`));
    assert.equal((host.innerHTML.match(/aria-current="page"/g)||[]).length,1,'Exactly one selected card action');
    for(const p of loc.item.parts)for(const step of p.guide.steps)if(!step.includes('{'))assert.ok(host.innerHTML.includes(esc(step)),'All steps are present immediately');
    for(const match of host.innerHTML.matchAll(/data-entry="([^"]+)"/g))assert.ok(entries.has(match[1]),match[1]);
  }
}
assert.ok(m.search('changing note length').some(r=>c.owned(r.id)),'Source search lands in a card');
assert.ok(c.locations.get('ca-length').item.parts.some(p=>p.key==='editing-midi#changing-note-length'));
assert.ok(c.locations.get('ca-tuning').item.parts[0].guide.terms.some(([t,s])=>s.includes('save a copy')),'Retuning warning retained');
assert.ok(c.locations.get('ca-tools').item.parts[0].guide.steps.some(s=>s.includes('Reset')),'Apply/undo/reset distinction');
assert.equal(c.locations.get('ca-arm').item.video,false,'Image pass retires the custom demonstration from the active card');
assert.ok(html.includes('aria-label="Clip shortcut platform"'));
console.log('Passed: all Clips source homes, action navigation, visible content, citations, both key platforms, image references, legacy links and flags.');
