const assert=require('node:assert/strict');
const m=require('./atlas-model.cjs')(),n=m.neighborhoodCards;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const views=['workspace','clips','devices','history'];
assert.deepEqual(Object.keys(n.groups),views);
for(const view of views){
  const groups=n.groups[view],index=n.index(view,esc),picker=n.picker(view,esc);
  assert.equal((index.match(/data-neighborhood="/g)||[]).length,groups.length);
  assert.ok(!/topic-item|<details|<summary|device-neighborhood-list/.test(index),'No lower scrolling list or expanding tree: '+view);
  assert.equal((picker.match(/<select /g)||[]).length,1,'One neighborhood picker on mobile');
  const choiceIDs=groups.flatMap(g=>g.choices.map(c=>c.id));
  const sequence=groups.flatMap(g=>g.choices);
  assert.equal(new Set(choiceIDs).size,choiceIDs.length,'Each destination has one neighborhood');
  for(const g of groups){
    assert.ok(g.name&&g.body&&g.choices.length&&g.choices.length<=11,g.home);
    assert.ok(n.owned(g.home));assert.equal(m.entries.get(g.home).view,view);
    const html=n.render(g.home,{esc});
    assert.equal((html.match(/data-entry="/g)||[]).length,g.choices.length);
    assert.ok(!/<details|<summary|undefined|\[object Object\]/.test(html));
    for(const c of g.choices){
      assert.ok(m.entries.has(c.id),c.id);assert.equal(m.entries.get(c.id).view,view);
      assert.equal(n.groupOf(view,c.id),g,'Destination returns to its neighborhood: '+c.id);
      assert.ok(html.includes(esc(c.label)));assert.ok(html.includes(`data-entry="${c.id}"`));
      const position=sequence.indexOf(c),route=n.adjacent(view,c.id),crumb=n.breadcrumb(m.entries.get(c.id),esc);
      assert.equal(route.current,c);
      assert.equal(route.previous,sequence[position-1]||null,'Previous continues across neighborhoods: '+c.id);
      assert.equal(route.next,sequence[position+1]||null,'Next continues across neighborhoods: '+c.id);
      assert.equal((crumb.match(/<button /g)||[]).length,3,'Return plus two fixed step controls');
      assert.equal((crumb.match(/ disabled/g)||[]).length,Number(position===0)+Number(position===sequence.length-1),'Only section endpoints disable stepping');
      assert.ok(crumb.includes(`data-entry="${g.home}"`));
      for(const [label,dest] of [['Previous',route.previous],['Next',route.next]])if(dest){
        assert.ok(crumb.includes(`data-entry="${dest.id}"`));
        assert.ok(crumb.includes(`aria-label="${esc(label+' card: '+dest.label)}"`));
      }
    }
    assert.equal(n.adjacent(view,g.home),null,'Neighborhoods are not working cards');
    assert.equal(n.breadcrumb(m.entries.get(g.home),esc),'');
  }
  for(const e of m.entries.values())if(e.view===view){
    assert.ok(n.groupOf(view,e.id),'Every entry has a neighborhood return: '+e.id);
    if(!n.owned(e.id))assert.ok(n.adjacent(view,e.id),'Every working card resolves to a neighborhood choice: '+e.id);
  }
}
assert.equal(n.adjacent('devices','da-sampler--map').current.id,'sampler','Action tabs resolve to their device');
assert.equal(n.adjacent('devices','da-sampler--map').previous.id,'simpler','Device stepping does not step through action tabs');
assert.equal(n.adjacent('workspace','keys-move').current.id,'shortcuts','Shortcut branches resolve to Shortcuts');
assert.equal(n.adjacent('clips','ca-name').current.id,'ca-name','Clip actions retain their individual choice');
assert.equal(n.adjacent('history','ref-welcome-to-live--the-ableton-team-says-thank-you').current.id,'ref-welcome-to-live--welcome-to-live','Nested manual references resolve to their neighborhood choice');
assert.equal(n.adjacent('history','laptop-audio').previous.id,'monolake');
assert.equal(n.adjacent('history','laptop-audio').next.id,'company');
assert.equal(n.adjacent('history','training-history').next.id,'live-eight');
assert.equal(n.adjacent('history','live-eight').previous.id,'training-history');
assert.equal(n.adjacent('history','sixty-four').next.id,'live-nine');
assert.equal(n.adjacent('devices','da-sampler--map').next.id,'drift');
for(const c of m.historyAtlas.cards.values()){
  const route=n.adjacent('history',c.id),html=m.historyAtlas.render(c.id,{esc,flagHTML:()=>''});
  const footer=html.match(/<nav class="history-adjacent"[\s\S]*?<\/nav>/)[0];
  for(const next of [route.previous,route.next].filter(Boolean))assert.ok(footer.includes(`data-entry="${next.id}"`),'Header and footer share the same sequence: '+c.id);
}
assert.equal(n.adjacent('history','missing'),null,'Unknown routes must not jump to the first choice');
// Existing pilot breadcrumbs and repeated decoration are upgraded, never duplicated.
const entry=m.entries.get('simpler'),expected=n.breadcrumb(entry,esc),crumb={outerHTML:''};
let inserted=0;
const header={insertAdjacentHTML:(position,html)=>{assert.equal(position,'afterbegin');assert.equal(html,expected);inserted++;}};
const bare={querySelector:selector=>selector.includes('.workspace-local-nav')?header:null};
n.decorate(bare,entry,esc);assert.equal(inserted,1);
for(const pilot of [false,true]){
  const host={querySelector:selector=>selector==='.neighborhood-return'?(pilot?null:crumb):selector.startsWith('.workspace-crumb ')?{closest:()=>crumb}:header};
  n.decorate(host,entry,esc);assert.equal(crumb.outerHTML,expected);assert.equal(inserted,1);
}
assert.equal(n.groups.workspace.flatMap(g=>g.choices).length,m.workspaceAtlas.areas.length+1,'All Workspace places plus Shortcuts');
assert.equal(n.groups.clips.flatMap(g=>g.choices).length,m.clipsAtlas.areas.flatMap(a=>a.items).length,'All Clip actions');
assert.equal(n.groups.devices.flatMap(g=>g.choices).length,89,'Full device catalog plus fundamentals');
assert.equal(n.groups.history.flatMap(g=>g.choices).filter(c=>m.historyAtlas.owned(c.id)).length,60,'All historical articles');
const selected=[];n.bind({selectEntry:id=>selected.push(id)});
for(const g of Object.values(n.groups).flat()){
  assert.ok(n.click({target:{closest:()=>({dataset:{neighborhood:g.home}})}}));assert.equal(selected.at(-1),g.home);
}
console.log('Passed: Previous/Next traverses every neighborhood in each section; only section endpoints stop; History header/footer agree; exact actions, return links and decoration preserved.');
