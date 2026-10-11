const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const model=require('./atlas-model.cjs')();
const data=require('./manual-images.json');
const {manualImages:media,captures,entries,workspaceAtlas:w,clipsAtlas:c,devicesAtlas:d,manualAtlas:m,shortcutExplorer:k}=model;
assert.equal(data.figures.length,1146);
assert.equal(data.figures.filter(f=>!f.inline).length,1097);
assert.equal(media.unplaced.length,0,'No silently dropped source illustrations');
assert.equal(media.placements.length,data.figures.length);
assert.equal(new Set(media.placements.map(p=>p.id)).size,data.figures.length);
assert.equal(Object.keys(captures).filter(id=>id.startsWith('manual-')).length,data.figures.length);
for(const [id,capture]of Object.entries(captures).filter(([id])=>id.startsWith('manual-'))){
  assert.ok(id.startsWith('manual-'));assert.ok(capture.file.startsWith('manual/'));
  assert.equal(new URL(capture.url).hostname,'ableton-production.imgix.net');
  if(capture.error){assert.equal(capture.key,'working-with-instruments-and-effects#the-vst-plug-in-folder');continue;}
  const b=readFileSync(join(__dirname,'assets',capture.file));
  assert.ok(b.length>0);assert.equal(b.length,capture.bytes);
  if(capture.file.endsWith('.png')){assert.equal(b.subarray(1,4).toString(),'PNG');assert.equal(b.readUInt32BE(16),capture.width);assert.equal(b.readUInt32BE(20),capture.height);}
  assert.ok(capture.width>0&&capture.height>0);assert.ok(!capture.crop,'Whole source figure, no accidental clipping');
  assert.ok(capture.title&&capture.alt&&capture.source&&capture.credit);
}
const context={esc:s=>String(s),platform:()=> 'mac',entries,captureFigure:id=>`<figure data-capture="${id}"></figure>`,flagHTML:()=>''};
const rendered=new Map();
for(const p of media.placements){
  if(!rendered.has(p.card)){
    const owner=w.owned(p.card)?w:c.owned(p.card)?c:d.owned(p.card)?d:k.owned(p.card)?k:m;
    const host={innerHTML:'',scrollTop:0};owner.mount(host,entries.get(p.card),context);rendered.set(p.card,host.innerHTML);
  }
  assert.ok(rendered.get(p.card).includes(`data-capture="${p.sameAs||p.id}"`),p.id+' actually rendered on '+p.card);
  if(p.sameAs)assert.ok(!rendered.get(p.card).includes(`data-capture="${p.id}"`),p.id+' repeats '+p.sameAs+' and is shown once');
}
// Inline icons are named by what they are, never by the heading they sit under.
for(const f of data.figures.filter(f=>f.inline)){
  const c=captures[f.id];assert.notEqual(c.title,f.title,f.id+' needs its own label');assert.equal(c.alt,c.title);
}
assert.equal(media.placements.find(p=>p.id==='manual-live-instrument-reference-100').card,'da-simpler--loop');
assert.equal(media.placements.find(p=>p.id==='manual-max-for-live-devices-023').card,'da-max-for-live-devices--midi-monitor--flow');
for(const html of rendered.values())assert.ok(!/assets\/(native|live-)|<video/.test(html));
console.log('Passed: all 1,146 source-image placements rendered locally (four repeated icons shown once); every inline icon labelled; dimensions, provenance, no cropping, no active custom media. One upstream 404 is explicitly recorded.');
