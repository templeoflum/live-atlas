const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const read=n=>readFileSync(join(__dirname,n),'utf8');
const html=read('index.html'),atlas=read('atlas.js');
// The earlier native screenshots are retained as recoverable source material.
// Test their archived crops independently from the active manual-only pipeline.
const modules=Array.from(html.matchAll(/<script src="([^"]+)"/g),m=>m[1]).filter(n=>!['atlas.js','manual-images.js'].includes(n));
const {workspaceMedia:media,workspaceAtlas:w,captures,entries}=vm.runInNewContext(modules.map(read).join('\n')+'\n'+atlas.slice(0,atlas.indexOf('const flags=new Set();'))+'\n({workspaceMedia,workspaceAtlas,captures,entries})',{URL,document:{querySelector:()=>null}});
const allItems=[...new Set([...w.locations.values()].map(l=>l.item))];
const used=new Set();
assert.deepEqual(Array.from(captures.wsSelection.crop),Array.from(captures.wsDuplicate.crop),'Before/after crops keep the same scale');
assert.deepEqual(Array.from(captures.wsRestored.crop),Array.from(captures.wsDuplicate.crop),'Undo crops keep the same scale');
assert.deepEqual(Array.from(captures.wsGainDefault.crop),Array.from(captures.wsGainTyped.crop),'Typed/reset values keep the same framing');
for(const item of allItems){
  const key=item.key||item.id,d=item.data;
  const images=[...d.images,...(d.variants||[]).map(v=>v.image)];
  if(Object.hasOwn(media.items,key))assert.ok(images.length||media.pending[key],`No silent gap in previously reviewed media: ${key}`);
  if(media.pending[key])assert.equal(images.length,0,`Pending is not counted as illustrated: ${key}`);
  for(const id of images){assert.ok(captures[id],id);used.add(id);}
  for(const v of d.variants||[]){assert.ok(v.label);if(v.entry)assert.ok(entries.has(v.entry));}
}
// New text placements intentionally wait for the next manual-image pass.
// Validate existing media, without falsely requiring every new card to be illustrated.
for(const [key] of Object.entries(media.items))assert.ok(allItems.some(i=>(i.key||i.id)===key),`No orphan mapping: ${key}`);
for(const [id,c] of Object.entries(media.captures)){
  assert.ok(used.has(id),`No unused picture: ${id}`);
  const png=readFileSync(join(__dirname,'assets',c.file));
  assert.equal(png.subarray(1,4).toString(),'PNG');
  assert.equal(png.readUInt32BE(16),c.width,id);assert.equal(png.readUInt32BE(20),c.height,id);
  assert.equal(c.pixelRatio,2,id);assert.ok(c.alt&&c.caption&&c.title);
  const [x,y,width,height]=c.crop||[0,0,c.width,c.height];
  for(const n of [x,y,width,height])assert.ok(Number.isInteger(n));
  assert.ok(x>=0&&y>=0&&width>0&&height>0&&x+width<=c.width&&y+height<=c.height,`Crop inside source: ${id}`);
  assert.ok(!/splice/i.test(c.file),'No signed-in Splice capture shipped');
}
// Exercise every image choice, not only the initial picture on each route.
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const context={esc,platform:()=> 'mac',captureFigure:id=>`<figure data-capture="${id}"></figure>`,flagHTML:()=>''};
for(const item of allItems){
  const reader={innerHTML:''};let focused=false;
  const host={innerHTML:'',scrollTop:0,querySelector:s=>s==='.workspace-reading'?reader:{focus:()=>{focused=true;},scrollIntoView:()=>{}}};
  w.mount(host,entries.get(item.id),context);
  for(let n=0;n<(item.data.variants?.length||0);n++){
    focused=false;
    assert.equal(w.click({target:{closest:selector=>selector==='[data-workspace-variant]'?{dataset:{workspaceVariant:String(n),workspaceImageEntry:item.id}}:null}}),true);
    assert.ok(reader.innerHTML.includes(`data-capture="${item.data.variants[n].image}"`));
    const action=w.locations.get(item.id).action;
    const count=i=>(i.data.variants?.length?1:i.data.images.length)+(i.details||[]).reduce((sum,c)=>sum+count(c),0);
    assert.equal((reader.innerHTML.match(/<figure /g)||[]).length,count(action),'One picture per comparison; child content is inline');
    assert.ok(!/undefined|\[object Object\]/.test(reader.innerHTML));assert.ok(focused);
  }
}
console.log(`Passed: ${Object.keys(media.captures).length} archived native views and crop metadata remain recoverable. Active manual media is tested separately.`);
