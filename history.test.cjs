const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const {historyData:d,historyAtlas:h,entries,topicGroups,manualAtlas}=require('./atlas-model.cjs')();
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const context={esc,flagHTML:id=>`<button data-flag="${id}">Flag</button>`};
assert.equal(h.cards.size,60);
assert.equal(Object.keys(d.sources).length,58);
assert.equal(d.checked,'2026-09-23');
assert.equal(new Set(d.cards.map(c=>c.id)).size,d.cards.length);
assert.deepEqual(Array.from(d.cards.filter(c=>c.release).map(c=>c.release)),Array.from({length:12},(_,i)=>i+1),'Each major Live version is represented');
const homes=topicGroups.history.flatMap(g=>g.ids);
assert.equal(new Set(homes).size,homes.length,'No duplicated navigation homes');
for(const c of d.cards){
  assert.equal(entries.get(c.id).view,'history');
  assert.ok(homes.includes(c.id));
  assert.ok(h.owned(c.id));assert.equal(h.periodOf(c.id).id,c.period);
  assert.ok(c.when&&c.title&&c.lead&&c.sections.length&&c.refs.length,c.id);
  for(const id of c.refs)assert.ok(d.sources[id],'Valid source: '+id);
  for(const id of c.links)assert.ok(h.cards.has(id)&&id!==c.id,'Valid related card: '+id);
  const host={innerHTML:'',scrollTop:99};h.mount(host,entries.get(c.id),context);
  assert.equal(host.scrollTop,0);
  const rendered=host.innerHTML;
  assert.ok(rendered.includes(esc(c.title))&&rendered.includes(esc(c.lead)));
  for(const s of c.sections)assert.ok(rendered.includes(esc(s.text)),'Full text visible: '+c.id);
  assert.ok(rendered.includes(`data-flag="${c.id}"`));
  assert.ok(!/<details|<summary|<video|undefined|\[object Object\]/.test(rendered),'No hidden explanations or unresolved content');
  for(const id of c.refs){assert.ok(rendered.includes(esc(d.sources[id].url)));assert.ok(rendered.includes(esc(d.sources[id].kind)));}
  for(const match of rendered.matchAll(/data-entry="([^"]+)"/g))assert.ok(entries.has(match[1]));
}
for(const p of h.periods){
  assert.ok(p.ids.length>0&&p.ids.length<=8,'Bounded period list: '+p.label);
  h.selectPeriod(p.id);
  const index=h.index(esc),picker=h.picker(esc);
  assert.equal((index.match(/data-history-period="/g)||[]).length,10);
  assert.equal((index.match(/class="topic-item history-place/g)||[]).length,p.ids.length);
  assert.ok(!/<details|<summary|aria-expanded/.test(index));
  for(const id of p.ids){assert.ok(index.includes(`data-entry="${id}"`));assert.ok(picker.includes(`value="${id}"`));}
  assert.ok(picker.includes('data-history-period-select')&&picker.includes('data-topic-picker="history"'));
}
const before=h.activePeriod();h.selectPeriod('unknown');assert.equal(h.activePeriod(),before);
h.revealSelection('operator-design');assert.equal(h.activePeriod().id,'instruments');
h.revealSelection('current-history');assert.equal(h.activePeriod().id,'now');
const selectedHost={innerHTML:'',scrollTop:0};h.mount(selectedHost,entries.get('current-history'),context);
const sameContent=selectedHost.innerHTML;h.selectPeriod('before');assert.equal(selectedHost.innerHTML,sameContent,'Filtering never replaces the open card');
for(const s of Object.values(d.sources)){
  assert.equal(new URL(s.url).protocol,'https:');
  assert.ok(s.title&&s.kind);assert.equal(s.checked,d.checked);
  if(s.date)assert.ok(s.date<=d.checked,'No source published after cutoff');
  // Conservative editorial guard: charge the entire text of each citing card
  // to every cited page, even when each page supports only part of that card.
  const words=d.cards.filter(c=>c.refs.includes(s.id)).reduce((n,c)=>n+[c.title,c.lead,...c.sections.flatMap(x=>[x.title,x.text])].join(' ').split(/\s+/).length,0);
  assert.ok(words<=200,'Keep source-derived summaries short: '+s.id+' ('+words+')');
}
assert.equal(h.cards.get('current-history').currentVersion,'12.4.6');
assert.match(JSON.stringify(h.cards.get('extensions-history')),/public beta|Public beta/);
assert.match(JSON.stringify(h.cards.get('sixty-four')),/beta/);
assert.match(d.sources['push-story'].note,/2012.*2013/,'Retrospective date discrepancy recorded');
assert.match(d.sources.quality.kind,/primary/,'Reprinted statement identified honestly');
for(const q of ['Monolake','Roggendorf','Cytomic','Link Audio','Matthias Mayrock'])assert.ok(manualAtlas.search(q).some(e=>e.view==='history'),'Historical people and details searchable: '+q);
for(const id of ['ref-welcome-to-live--welcome-to-live','ref-credits--credits'])assert.ok(homes.includes(id),'Manual reference home preserved');
const team=manualAtlas.nodes.get('welcome-to-live#the-ableton-team-says-thank-you');
assert.ok(team.parent.children.includes(team)&&homes.includes(team.parent.id),'Team acknowledgement reachable from the welcome card');
const page=readFileSync(join(__dirname,'index.html'),'utf8');
assert.ok(page.indexOf('history-data.js')<page.indexOf('history-atlas.js')&&page.indexOf('history-atlas.js')<page.indexOf('src="atlas.js"'));
console.log('Passed: 60 historical entries, 58 source records, all 12 major versions, bounded periods, source distinctions, complete visible text, search and reference homes.');
