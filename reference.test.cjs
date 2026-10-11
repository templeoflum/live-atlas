const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const read=name=>readFileSync(join(__dirname,name),'utf8');
const source=read('entry-reference.js');
const {items,keys,render}=vm.runInNewContext(source+'\natlasReference');
const atlas=read('atlas.js');
const {entries,entryCaptures,captureExceptions}=vm.runInNewContext(atlas.slice(0,atlas.indexOf('const flags=new Set();'))+'\n({entries,entryCaptures,captureExceptions})');
const {steps}=vm.runInNewContext(read('record-midi.js')+'\nmidiPilot');
const manualEntries=Array.from(entries.values()).filter(e=>e.view!=='history');
assert.equal(manualEntries.length,71);
assert.equal(Object.keys(items).length,70,'Every current non-history entry except the existing Record MIDI pilot');
assert.ok(!/localStorage|<video|autoplay/.test(source),'No new media or student-state behavior in this pass');
for(const entry of manualEntries){
  if(entry.id==='record-midi')continue;
  const item=items[entry.id];assert.ok(item,`Missing detail layer: ${entry.id}`);
  assert.ok(item.title&&item.note);
  assert.ok(item.steps.length>=2&&item.steps.length<=3,'Brief usable operations, not chapters');
  assert.ok(item.terms.length>=2&&item.terms.length<=4);
  assert.ok(new URL(item.source).hash,`Needs a section-level source: ${entry.id}`);
  assert.ok(entryCaptures[entry.id]?.length||captureExceptions[entry.id]);
  for(const platform of ['mac','win']){
    const html=render(entry.id,{esc:s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),platform});
    assert.equal((html.match(/<section class="reference-section"/g)||[]).length,3);
    assert.ok(!/<details\b/.test(html),'Content is visible without another expansion');
    assert.ok(!/\{[A-Za-z]+\}/.test(html),`Unknown key token: ${entry.id}`);
    assert.ok(html.includes('rel="noreferrer"'));
  }
}
for(const id of Object.keys(items))assert.ok(entries.has(id),`Orphan detail ${id}`);
assert.ok(render('quantize',{esc:String,platform:'mac'}).includes('⌘ ⇧ U'));
assert.ok(render('quantize',{esc:String,platform:'win'}).includes('Ctrl Shift U'));
assert.equal(render('live-one',{esc:String,platform:'mac'}),'','No forced software workflow for history');
for(const pair of Object.values(keys))assert.equal(pair.length,2);
assert.ok(read('index.html').indexOf('entry-reference.js')<read('index.html').indexOf('atlas.js'));
console.log('Passed: legacy entry-reference schema, retained media, visible content, both shortcut platforms and separate history.');

if(process.argv.includes('--online')){
  const urls=new Set();
  for(const item of Object.values(items)){urls.add(item.source);if(item.detailSource)urls.add(item.detailSource);}
  for(const step of steps){urls.add(step.source);urls.add(step.detail.source);urls.add(step.help.source);}
  const pages=new Map();
  for(const url of urls){const [page,hash]=url.split('#');if(!pages.has(page))pages.set(page,[]);if(hash)pages.get(page).push(hash);}
  (async()=>{
    const failures=[];
    // Bound requests to avoid hammering the public reference site.
    const tasks=Array.from(pages);let index=0;
    await Promise.all(Array.from({length:3},async()=>{
      while(index<tasks.length){
        const [url,hashes]=tasks[index++];
        try{
          const response=await fetch(url,{signal:AbortSignal.timeout(20000)});
          if(!response.ok)throw new Error('HTTP '+response.status);
          const html=await response.text();
          const ids=new Set(Array.from(html.matchAll(/\bid=["']([^"']+)["']/g),m=>m[1]));
          for(const hash of hashes)if(!ids.has(hash))failures.push(url+'#'+hash);
        }catch(error){failures.push(url+' ('+error.message+')');}
      }
    }));
    assert.deepEqual(failures,[],'Missing official source sections');
    console.log(`Verified ${urls.size} manual links across ${pages.size} live official chapters.`);
  })().catch(error=>{console.error(error);process.exitCode=1;});
}
