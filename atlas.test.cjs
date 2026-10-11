const {readFileSync,existsSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');

const source=readFileSync(join(__dirname,'atlas.js'),'utf8');
const data=source.slice(0,source.indexOf('const flags=new Set();'));
const route=source.slice(source.indexOf('function resolveRoute('),source.indexOf('function readLocation('));
const model=vm.runInNewContext(data+'\n'+route+'\n({entries,territories,topicGroups,selection,sources,captures,entryCaptures,captureExceptions,families,resolveRoute,canonicalEntryId});');
const {entries,territories,topicGroups,selection,sources,captures,entryCaptures,captureExceptions,families,resolveRoute,canonicalEntryId}=model;
const views=Array.from(territories,t=>t.id);
assert.deepEqual(views,['workspace','clips','devices','history']);
assert.deepEqual(Array.from(territories,t=>t.num),['I','II','III','IV']);
assert.equal(entries.size,80,'79 original entries, two scoped additions, and one merged duplicate Save entry');

const indexed=[];
for(const [view,groups] of Object.entries(topicGroups)){
  assert.equal(entries.get(selection[view]).view,view);
  for(const group of groups)for(const id of group.ids){
    indexed.push(id);
    assert.ok(entries.has(id),`Unknown entry ${id}`);
    assert.equal(entries.get(id).view,view,`Wrong home for ${id}`);
    assert.equal(entries.get(id).group,group.name);
  }
}
assert.equal(indexed.length,entries.size);
assert.equal(new Set(indexed).size,entries.size,'Each entry has exactly one navigation home');
for(const e of entries.values()){
  assert.ok(indexed.includes(e.id),`Unreachable entry ${e.id}`);
  assert.ok(sources[e.source],`Missing source for ${e.id}`);
  for(const linked of e.links||[])assert.ok(entries.has(linked),`Broken link ${e.id} → ${linked}`);
}
for(const [id,images] of Object.entries(entryCaptures)){
  assert.ok(entries.has(id));
  for(const capture of images)assert.ok(captures[capture]);
}
for(const capture of Object.values(captures)){
  assert.ok(existsSync(join(__dirname,'assets',capture.file)));
  assert.ok(capture.file.endsWith('.png'),'No low-resolution JPEG remains in the active registry');
  assert.equal(capture.pixelRatio,2,'Native capture density must be declared');
  const png=readFileSync(join(__dirname,'assets',capture.file));
  assert.equal(png.subarray(1,4).toString(),'PNG');
  assert.equal(png.readUInt32BE(16),capture.width,`Wrong width: ${capture.file}`);
  assert.equal(png.readUInt32BE(20),capture.height,`Wrong height: ${capture.file}`);
  if(capture.crop){
    const [x,y,w,h]=capture.crop;
    assert.ok(x>=0&&y>=0&&w>0&&h>0);
    assert.ok(x+w<=capture.width&&y+h<=capture.height,`Crop exceeds ${capture.file}`);
  }
}
assert.deepEqual(Array.from(entryCaptures['midi-clip']),['midiSample']);
for(const e of entries.values()){
  assert.ok(entryCaptures[e.id]?.length||captureExceptions[e.id],`Unreviewed screenshot coverage: ${e.id}`);
  assert.ok(!(entryCaptures[e.id]&&captureExceptions[e.id]),`Conflicting coverage: ${e.id}`);
}
assert.equal(Object.keys(entryCaptures).length,68);
assert.equal(Object.keys(captureExceptions).length,12);
for(const f of families)for(const [id] of f.items){
  assert.deepEqual(Array.from(entryCaptures[id]),[id],`Each device gets its own image: ${id}`);
}
assert.equal(captures.midiSample.pixelRatio,2);
assert.equal(captures.midiSample.crop,undefined,'Keep the complete user-supplied frame');
const sample=readFileSync(join(__dirname,'assets',captures.midiSample.file));
assert.equal(sample.subarray(1,4).toString(),'PNG');
assert.equal(sample.readUInt32BE(16),captures.midiSample.width);
assert.equal(sample.readUInt32BE(20),captures.midiSample.height);
assert.equal(vm.runInNewContext(data+'\ncaptureDisplayWidth(captures.midiSample);'),2056,'Do not stretch a 2× screenshot to twice its UI size');
assert.ok(vm.runInNewContext(data+'\ncaptureDisplayWidth(captures.utility);')<200,'Small devices are not inflated to fill the page');
for(const id of ['session','arrangement','mixer','set','tracks','new-midi','new-audio','sends','export'])assert.equal(entries.get(id).view,'workspace',id);
assert.equal(topicGroups.sets,undefined);
assert.equal(canonicalEntryId('chain'),'chain');
const flagLoad=source.slice(source.indexOf('const flags=new Set();'),source.indexOf('function saveFlags()'));
const migratedFlags=vm.runInNewContext(data+'\n'+flagLoad+'\nArray.from(flags);',{
  localStorage:{getItem:()=>JSON.stringify(['save-set','save-set','chain','warp','unknown'])}
});
assert.deepEqual(Array.from(migratedFlags),['save-set','chain','warp'],'Flags contain valid unique entries');
for(const e of entries.values()){
  const result=resolveRoute(e.view,e.id);
  assert.equal(result.view,e.view);
  assert.equal(result.id,e.id);
}
const html=readFileSync(join(__dirname,'index.html'),'utf8');
const nav=html.slice(html.indexOf('<nav '),html.indexOf('</nav>'));
assert.deepEqual(Array.from(nav.matchAll(/data-view="([^"]+)"/g),m=>m[1]),['overview',...views],'Navigation follows the overview card order');
assert.deepEqual(Array.from(html.matchAll(/<section class="view" id="view-([^"]+)"/g),m=>m[1]),[...views,'flags'],'Territory DOM order follows navigation');
for(const t of territories){
  const section=html.slice(html.indexOf(`id="view-${t.id}"`)).split('</section>')[0];
  assert.ok(section.includes(`Territory ${t.num}</span>`),`Numbering matches for ${t.id}`);
  assert.ok(nav.includes(`data-view="${t.id}">${t.num} ·`),`Navigation numbering matches for ${t.id}`);
}
for(const view of views){
  assert.ok(html.includes(`id="view-${view}"`));
  assert.ok(html.includes(`id="insp-${view}"`));
  assert.ok(html.includes(`data-view="${view}"`));
}
assert.ok(!html.includes('data-view="system"'));
assert.ok(!html.includes('data-view="working"'));
assert.ok(source.includes("const FLAG_STORE='ableton-live-atlas.flags.v1'"));
console.log('Passed: base entries, unique navigation homes, sources, assets, cross-links and valid flags.');
console.log(Object.fromEntries(views.map(view=>[view,indexed.filter(id=>entries.get(id).view===view).length])));
console.log(`Screenshot coverage: ${Object.keys(entryCaptures).length}/80 illustrated entries; 26/26 devices; 12 documented text-only entries.`);
