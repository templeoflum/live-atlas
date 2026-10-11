const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const root=process.env.ATLAS_TEST_URL||'http://127.0.0.1:54868';
(async()=>{
  const atlas=readFileSync(join(__dirname,'atlas.js'),'utf8');
  const images=[...require('./manual-images.json').figures.filter(f=>!f.error),...require('./history-images-data.js').figures];
  const queue=[...new Map(images.map(f=>[f.file,f])).values()];
  await Promise.all(Array.from({length:8},async()=>{while(queue.length){
    const f=queue.pop(),res=await fetch(root+'/assets/'+f.file,{method:'HEAD'});
    assert.equal(res.status,200,f.file);assert.match(res.headers.get('content-type'),/^image\//);
    if(f.file.startsWith('history/'))assert.equal(res.headers.get('content-type'),f.file.endsWith('.svg')?'image/svg+xml':f.file.endsWith('.png')?'image/png':'image/jpeg');
    assert.equal(Number(res.headers.get('content-length')),f.bytes,f.file);
  }}));
  for(const file of ['manual-completion.js','push-atlas.js','manual-images-data.js','manual-images.js','device-control-details.js','sampler-control-details.js'])assert.equal((await fetch(root+'/'+file,{method:'HEAD'})).status,200,file);
  for(const file of ['manual-images.json','import-manual-images.mjs','atlas-model.cjs','manual-content-audit.cjs','manual-content-audit.test.cjs','MANUAL_CONTENT_REVIEW.md','MANUAL_IMAGES.md'])assert.equal((await fetch(root+'/'+file)).status,404,file);
  const captures=vm.runInNewContext(readFileSync(join(__dirname,'workspace-media.js'),'utf8')+'\n'+atlas.slice(0,atlas.indexOf('const flags=new Set();'))+'\ncaptures');
  for(const file of new Set(Object.values(captures).map(c=>c.file))){
    const res=await fetch(root+'/assets/'+file,{method:'HEAD'});
    assert.equal(res.status,200,file);assert.equal(res.headers.get('content-type'),'image/png',file);
  }
  for(const file of ['/record-midi.js','/entry-reference.js','/manual-data.js','/manual-guides.js','/manual-device-guides.js','/manual-workflow-guides.js','/manual-editing-guides.js','/manual-clip-guides.js','/manual-workspace-guides.js','/manual-set-guides.js','/manual-routing-guides.js','/manual-envelope-guides.js','/manual-file-guides.js','/manual-atlas.js','/assets/native/record-unarmed.png','/assets/native/record-armed.png','/assets/arm-toggle.mp4']){
    const res=await fetch(root+file);assert.equal(res.status,200,file);assert.ok(Number(res.headers.get('content-length'))>0);await res.arrayBuffer();
  }
  const head=await fetch(root+'/assets/arm-toggle.mp4',{method:'HEAD'});
  assert.equal((await fetch(root+'/workspace-atlas.js')).status,200);
  assert.equal((await fetch(root+'/clips-atlas.js')).status,200);
  for(const file of ['device-actions.js','device-effects.js','device-racks-max.js','devices-atlas.js'])assert.equal((await fetch(root+'/'+file)).status,200,file);
  for(const file of ['devices.test.cjs','DEVICES_MAP.md'])assert.equal((await fetch(root+'/'+file)).status,404,file);
  assert.equal((await fetch(root+'/clips.test.cjs')).status,404);
  assert.equal((await fetch(root+'/workspace-media.js')).status,200);
  assert.equal((await fetch(root+'/shortcut-explorer.js')).status,200);
  for(const file of ['history-data.js','history-atlas.js','history-images-data.js','history-images.js','card-navigation.js','neighborhood-cards.js'])assert.equal((await fetch(root+'/'+file)).status,200,file);
  for(const file of ['history-diagrams-data.js','assets/history/diagram-sixty-four.svg','assets/history/diagram-training-history.svg'])assert.equal((await fetch(root+'/'+file)).status,404,'Retired diagram must not be served: '+file);
  for(const file of ['history-images.test.cjs','import-history-images.cjs','capture-tests/history-image-review.html','history-diagram-review.html','history-diagram-review.js'])assert.equal((await fetch(root+'/'+file)).status,404,file);
  for(const file of ['history.test.cjs','HISTORY_RESEARCH.md','navigation-pilot.test.cjs','neighborhood-cards.test.cjs','NAVIGATION_LESSON_RND.md','SHORTCUT_TRAINER_RND.md'])assert.equal((await fetch(root+'/'+file)).status,404,file);
  assert.equal((await fetch(root+'/shortcut-explorer.test.cjs')).status,404);
  assert.equal((await fetch(root+'/SHORTCUT_MAP.md')).status,404);
  for(const path of ['/workspace-media.test.cjs','/WORKSPACE_IMAGES.md','/assets/native/ws-splice.png','/assets/native/ws-splice-private-source.png','/capture-tests/ws-splice-private-source.png','/../capture-tests/ws-splice-private-source.png'])assert.equal((await fetch(root+path)).status,404,path);
  assert.equal((await fetch(root+'/workspace.test.cjs')).status,404);
  assert.equal((await fetch(root+'/assets/native/ws-editor-tall.png')).status,404,'Unused capture attempt is not published');
  const size=Number(head.headers.get('content-length'));
  assert.equal(head.headers.get('content-type'),'video/mp4');assert.equal(head.headers.get('accept-ranges'),'bytes');
  assert.equal((await head.arrayBuffer()).byteLength,0);
  for(const [range,length] of [['bytes=0-99',100],['bytes=-50',50],[`bytes=${size-20}-`,20]]){
    const r=await fetch(root+'/assets/arm-toggle.mp4',{headers:{Range:range}});
    assert.equal(r.status,206);assert.equal((await r.arrayBuffer()).byteLength,length);
  }
  for(const range of [`bytes=${size}-`,'bytes=9-2','bytes=-0','bytes=','bytes=0-2,4-6']){
    const r=await fetch(root+'/assets/arm-toggle.mp4',{headers:{Range:range}});assert.equal(r.status,416,range);
  }
  for(const file of ['/README.md','/REFERENCE_COVERAGE.md','/MANUAL_COVERAGE.md','/manual-coverage.json','/manual-coverage.cjs','/manual-research/welcome-to-live.html','/manual-research/read-chapter.cjs','/import-manual.mjs','/capture-tests/arm-track-source.mov','/record-midi.test.cjs','/reference.test.cjs','/manual.test.cjs','/not-a-file'])assert.equal((await fetch(root+file)).status,404);
  assert.equal((await fetch(root+'/assets/arm-toggle.mp4',{method:'POST'})).status,404);
  console.log('Passed: every available official image served with its exact byte length; active modules, archived pilot assets, byte ranges and private-file exclusion.');
})().catch(e=>{console.error(e);process.exitCode=1;});
