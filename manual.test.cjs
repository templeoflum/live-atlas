const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const read=name=>readFileSync(join(__dirname,name),'utf8');
const atlas=read('atlas.js');
const modules=['entry-reference.js','manual-data.js','manual-guides.js','manual-device-guides.js','manual-workflow-guides.js','manual-editing-guides.js','manual-clip-guides.js','manual-workspace-guides.js','manual-set-guides.js','manual-routing-guides.js','manual-envelope-guides.js','manual-file-guides.js','manual-atlas.js'];
const source=modules.map(read).join('\n')+'\n'+atlas.slice(0,atlas.indexOf('const flags=new Set();'));
const m=vm.runInNewContext(source+'\n({manualAtlas,manualData,manualGuides,entries,families,topicGroups,captures})',{URL,document:{querySelector:()=>null}});
const {manualAtlas:a,manualData:d,manualGuides:g,entries,families,topicGroups,captures}=m;
assert.equal(a.roots.length,42);
assert.equal(a.nodes.size,1051);
assert.equal(d.tocCount,871);
assert.equal(d.shortcuts.length,292);
assert.equal(new Set(d.nodes.map(n=>n.number)).size,d.nodes.length);
const reachable=new Set();
function visit(n){assert.ok(!reachable.has(n.key),'No duplicate/cyclic tree position');reachable.add(n.key);for(const child of n.children){assert.equal(child.parent,n);visit(child);}}
a.roots.forEach(visit);assert.equal(reachable.size,a.nodes.size);
for(const n of a.nodes.values()){
  assert.ok(entries.has(n.id));assert.ok(topicGroups[n.view]);
  assert.equal(new URL(n.url).hostname,'www.ableton.com');
  assert.equal(new URL(n.url).hash,'#'+n.anchor);
  if(n.number.includes('.'))assert.ok(n.parent,n.number);
  const html=readFileSync(join(__dirname,'../manual-research',n.chapter+'.html'),'utf8');
  assert.ok(html.includes('id="'+n.anchor+'"'),`Source anchor: ${n.key}`);
}
for(const [key,guide] of Object.entries(g.items)){
  assert.ok(a.nodes.has(key),`Orphan guide ${key}`);
  assert.ok(guide.body);if(guide.steps.length)assert.ok(guide.title);
  assert.ok(Array.isArray(guide.steps)&&Array.isArray(guide.terms)&&Array.isArray(guide.images));
  guide.images.forEach(id=>assert.ok(captures[id],`Missing still ${key}: ${id}`));
  if(guide.imageLabels)assert.equal(guide.imageLabels.length,guide.images.length,'Every comparison image has a visible state label');
  for(const shortcut of guide.keys||[]){
    assert.ok(shortcut.action&&shortcut.mac&&shortcut.win,`Both platform labels: ${key}`);
    assert.ok(!/[⌘⌥⇧]/.test(shortcut.win),`Windows modifiers spelled out: ${key}`);
  }
}
assert.deepEqual(Array.from(families,f=>[f.name,f.items.length]),[['Instruments',13],['Audio Effects',42],['MIDI Effects',8],['Racks',4],['Max for Live',18]]);
for(const family of families){
  assert.equal(new Set(family.items.map(x=>x[0])).size,family.items.length);
  for(const [id] of family.items){const entry=entries.get(id);assert.ok(entry);if(entry.manualNode)assert.ok(a.nodes.get(entry.manualNode).guide,`Device needs its own introduction: ${id}`);}
}
for(const row of d.shortcuts){
  assert.ok(row.action&&(row.mac||row.win));
  assert.ok(a.nodes.has('live-keyboard-shortcuts#'+row.section));
  assert.ok(entries.get(a.nodes.get('live-keyboard-shortcuts#'+row.section).id).manualNode,'Original shortcut source-group routes remain available');
}
for(const query of ['comping','meld','glissando','tuning','cmd f'])assert.ok(a.search(query).length,query);
assert.ok(a.search('cmd f').some(r=>r.shortcut==='cmd f'),'Shortcut keys are searchable');
assert.equal(a.search('cmd f')[0].title,'Search in Browser','Exact key mapping precedes modified shortcuts');
assert.ok(!a.search('cmd f').some(r=>r.title==='Copy Time'),'F must not match the F inside Shift');
const coverage=a.coverage();assert.equal(coverage.authored+coverage.sourceOnly,1051);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const context={esc,captureFigure:id=>`<figure data-capture="${esc(id)}"></figure>`,flagHTML:id=>`<button data-flag="${esc(id)}">Flag</button>`,platform:()=> 'mac'};
let rendered=0;
for(const entry of entries.values()){
  if(!entry.manualNode)continue;
  const host={innerHTML:'',scrollTop:9};a.mount(host,entry,context);rendered++;
  assert.ok(host.innerHTML.includes(esc(entry.title)),entry.id);
  assert.ok(!/undefined|\[object Object\]/.test(host.innerHTML),entry.id);
  assert.equal(host.scrollTop,0);
  for(const match of host.innerHTML.matchAll(/data-entry="([^"]+)"/g))assert.ok(entries.has(match[1]),match[1]);
  assert.ok(!/<details\b/.test(host.innerHTML),'Explanation content never requires another disclosure');
  const guide=a.nodes.get(entry.manualNode).guide;
  if(guide?.keys?.length){
    for(const platform of ['mac','win']){
      a.mount(host,entry,{...context,platform:()=>platform});
      for(const shortcut of guide.keys)assert.ok(host.innerHTML.includes(esc(shortcut[platform])),`Rendered ${platform} key: ${entry.id}`);
    }
  }
}
for(const chapterNumber of [2,4,5,6,7,8,9,10,16,17,18,19,25,26]){
  const chapter=Array.from(a.nodes.values()).filter(n=>n.chapterNumber===chapterNumber);
  assert.ok(chapter.every(n=>n.guide||n.existing),`Every section of completed writing batch ${chapterNumber} has an authored entry`);
}
const stepRecord=g.items['recording-new-clips#midi-step-recording'];
assert.ok(stepRecord.steps[0].includes('Preview'));
assert.ok(stepRecord.steps[0].includes('Arm'));
assert.ok(g.items['clip-view#clip-time-signature'].body.includes('does not change'));
assert.ok(g.items['working-with-the-browser#filters-and-tags'].terms.some(([label])=>label==='Results Clear'));
// Scope and safety distinctions must remain in the new operation guides.
const guideText=key=>JSON.stringify(g.items[key]);
assert.match(guideText('arrangement-view#using-the-time-commands'),/all tracks/);
assert.match(guideText('session-view#recording-sessions-into-the-arrangement'),/Back to Arrangement/);
assert.match(guideText('routing-and-i-o#monitoring'),/can still record/);
assert.match(guideText('automation-and-editing-envelopes#deleting-automation'),/Arrangement and Session/);
assert.match(guideText('automation-and-editing-envelopes#overriding-automation'),/does not erase/);
assert.match(guideText('clip-envelopes#mixer-and-device-clip-envelopes'),/relative/);
assert.match(guideText('clip-envelopes#programming-a-fade-out-for-a-live-set'),/not every track/);
assert.match(guideText('managing-files-and-sets#finding-unused-files'),/not unused everywhere/);
assert.match(guideText('managing-files-and-sets#manual-repair'),/not proof/);
assert.match(guideText('managing-files-and-sets#packing-projects-into-packs'),/not automatically collected/);
for(const query of ['Resampling','Locking Envelopes','Packing Projects','Follow Actions'])assert.ok(a.search(query).length,query);
const shortcutRoot={innerHTML:''};a.mount(shortcutRoot,entries.get('shortcuts'),context);
assert.ok(!shortcutRoot.innerHTML.includes('shortcut-query'),'No old lookup form');
assert.ok(shortcutRoot.innerHTML.includes('momentary-latching-shortcuts'));
const html=read('index.html');let last=-1;for(const module of modules){const p=html.indexOf(module);assert.ok(p>last,`Script load order ${module}`);last=p;}
assert.ok(html.indexOf('atlas.js',last)>last);
console.log('Passed: full source tree, cached official anchors, guide integrity, 85 devices/Racks, all 292 shortcut rows, search and load order.');
console.log('Legacy guide-index integrity checked. Guide counts are not action-card or parameter coverage.');
console.log(`Rendered ${rendered} references without missing entry targets or folded explanations.`);
