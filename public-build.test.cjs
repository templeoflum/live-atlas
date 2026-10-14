// The public build hosts no third-party images; the local atlas still shows them.
const assert=require('node:assert/strict');
const {readFileSync,existsSync,mkdtempSync,mkdirSync,rmSync}=require('node:fs');
const {join}=require('node:path');
const {execFileSync}=require('node:child_process');
const vm=require('node:vm');
const read=n=>readFileSync(join(__dirname,n),'utf8');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function load(prefix){
  const html=read('index.html'),scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]).filter(n=>n!=='atlas.js');
  return vm.runInNewContext(prefix+scripts.map(read).join('\n')+'\n'+read('atlas.js').split('const flags=new Set();')[0]+'\n({captures,captureFigure,historyImages,neighborhoodCards})',{URL,document:{querySelector:()=>null}});
}
const local=load(''),pub=load('const publicBuild=true;\n');
const ids=Object.keys(pub.captures).filter(id=>!pub.captures[id].error);
assert.equal(ids.length,1145+45,'Every placed manual figure and history image');
for(const id of ids){
  const c=pub.captures[id];
  const html=id.startsWith('history-')?pub.historyImages.figure(id.slice('history-image-'.length),{esc}):pub.captureFigure(id);
  assert.ok(!/<img|assets\//.test(html),'No hosted image in the public build: '+id);
  assert.ok(html.includes(`href="${esc(c.source)}"`),'Links to its source: '+id);
  if(id.startsWith('manual-'))assert.match(c.source,/^https:\/\/www\.ableton\.com\/en\/live-manual\/12\/[a-z0-9-]+\/#/,id);
  const before=id.startsWith('history-')?local.historyImages.figure(id.slice('history-image-'.length),{esc}):local.captureFigure(id);
  assert.match(before,/<img [^>]*src="assets\//,'Local atlas still shows the image: '+id);
}
for(const view of Object.keys(pub.neighborhoodCards.groups))for(const g of pub.neighborhoodCards.groups[view]){
  assert.ok(!/<img/.test(pub.neighborhoodCards.render(g.home,{esc})),'No thumbnails in the public build: '+g.home);
}
assert.ok(Object.values(local.neighborhoodCards.groups).flat().some(g=>/<img/.test(local.neighborhoodCards.render(g.home,{esc}))),'Local thumbnails unchanged');
// The build itself: no assets folder, and the flag loads before every other script.
mkdirSync(join(__dirname,'tmp'),{recursive:true});
const out=mkdtempSync(join(__dirname,'tmp','public-build-'));
try{
  const report=JSON.parse(execFileSync(process.execPath,[join(__dirname,'build-pages.mjs'),'--out',out],{encoding:'utf8'}));
  assert.equal(report.mode,'public');assert.equal(report.images,0);
  assert.ok(!existsSync(join(out,'assets')),'No assets folder');
  const page=readFileSync(join(out,'index.html'),'utf8'),scripts=[...page.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(scripts[0],'public-build.js');
  for(const s of scripts)assert.ok(existsSync(join(out,s)),s);
  assert.equal(page.replace('<script src="public-build.js" defer></script>\n  ',''),read('index.html'),'Only the flag differs from the local page');
  assert.match(readFileSync(join(out,'README.md'),'utf8'),/hosts no third-party images/);
}finally{rmSync(out,{recursive:true,force:true});}
console.log('public build: '+ids.length+' figures render as links; local images unchanged');
