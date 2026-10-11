const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const {join}=require('node:path'),{createHash}=require('node:crypto');
const read=name=>fs.readFileSync(join(__dirname,name),'utf8');
const html=read('index.html'),atlas=read('atlas.js');
const modules=Array.from(html.matchAll(/<script src="([^"]+)"/g),m=>m[1]).filter(n=>n!=='atlas.js');
const m=vm.runInNewContext(modules.map(read).join('\n')+'\n'+atlas.slice(0,atlas.indexOf('const flags=new Set();'))+'\n({shortcutExplorer,manualAtlas,manualData,workspaceAtlas,entries,captures})',{URL,document:{querySelector:()=>null}});
const {shortcutExplorer:s,manualAtlas:a,manualData:d,workspaceAtlas:w,entries,captures}=m;
// Source offsets are editorial references to this checked-in table. Fail loudly
// if a later manual import changes their meaning, not just their total count.
assert.equal(createHash('sha256').update(JSON.stringify(d.shortcuts)).digest('hex'),'08620bf89d3601ddae03a478d220a161a401311afdd74947c9807cea05948f37');
assert.equal(s.rowHomes.size,d.shortcuts.length);
assert.deepEqual(Array.from(s.tree,n=>n.label),['Move around','Find & load','Edit','Play & record','Shape & mix','Manage a Set']);
const seen=new Set();
for(const node of s.locations.values()){
  assert.ok(entries.has(node.route));assert.ok(s.owned(node.route));
  assert.equal(w.mainId(node.route),'shortcuts');
  assert.ok(node.parents.length<=2,'No more than intent / working context / action group');
  if(node.children)assert.ok(node.children.length<=7,'Small visible branch menu');
  if(node.keys){
    assert.ok(node.keys.length>0&&node.keys.length<=9,'No long lists at a stop');assert.ok(node.context);
    for(const k of node.keys){assert.ok(!seen.has(k.index),'One primary home per source row');seen.add(k.index);assert.equal(s.rowHome(k.row),node.route);}
  }
  if(node.image)assert.ok(captures[node.image]);
  if(node.entry)assert.ok(entries.has(node.entry));
}
assert.equal(seen.size,292);
assert.deepEqual(Array.from(s.locations.get('keys-views').keys,k=>k.row.mac),['Tab','Shift Tab or F12','Option click view toggle']);
assert.equal(s.locations.get('keys-search').keys[0].row.mac,'Cmd F');
assert.match(s.locations.get('keys-views').note,/off/);
assert.match(s.locations.get('keys-focus-controls').note,/on/);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const context={esc,captureFigure:id=>`<figure data-capture="${id}"></figure>`,flagHTML:id=>`<button data-flag="${id}">Flag</button>`};
const legacy=[...a.nodes.values()].filter(n=>n.chapterNumber===41&&d.shortcuts.some(k=>k.section===n.anchor));
for(const id of ['shortcuts',...s.locations.keys(),...legacy.map(n=>n.id)])for(const platform of ['mac','win']){
  assert.ok(s.owned(id));
  const host={innerHTML:'',scrollTop:10};s.mount(host,entries.get(id),{...context,platform:()=>platform});
  assert.equal(host.scrollTop,0);
  assert.match(host.innerHTML,/aria-label="Shortcut intentions"/);
  assert.ok(!/shortcut-query|shortcut-group|<input|<select|<table|All groups|undefined|\[object Object\]/.test(host.innerHTML));
  assert.ok(host.innerHTML.includes(`data-flag="${id}"`),'Legacy flag identity retained');
  for(const match of host.innerHTML.matchAll(/data-entry="([^"]+)"/g))assert.ok(entries.has(match[1]),match[1]);
  for(const match of host.innerHTML.matchAll(/data-capture="([^"]+)"/g))assert.ok(captures[match[1]],match[1]);
  if(platform==='win')for(const match of host.innerHTML.matchAll(/<kbd>(.*?)<\/kbd>/g))assert.ok(!/[⌘⌥⇧]/.test(match[1]));
}
for(const query of ['cmd f','quantize','record to session'])for(const result of a.search(query).filter(r=>r.shortcut)){
  assert.ok(s.owned(result.id));assert.ok(s.locations.get(result.id).keys.some(k=>k.index===result.shortcutRow),'Find lands on the exact context, not a broad manual group');
}
const search=a.search('cmd f')[0];assert.equal(search.id,'keys-search');
const dup=entries.get('keys-record'),host={innerHTML:'',scrollTop:0};
s.mount(host,dup,{...context,platform:()=> 'mac'});
assert.equal((host.innerHTML.match(/<dt>Record to Session View<\/dt>/g)||[]).length,1,'Duplicate source rows are one gesture in the map');
let platform='mac';const reader={innerHTML:'',scrollTop:72,querySelector:()=>({open:true})};
const platformHost={innerHTML:'',scrollTop:0,querySelector:()=>reader};
s.mount(platformHost,entries.get('keys-search'),{...context,platform:()=>platform});platform='win';s.setPlatform();
assert.match(reader.innerHTML,/Ctrl F/);assert.equal(reader.scrollTop,72);
assert.ok(!read('manual-atlas.js').includes('shortcut-query'),'Retired lookup removed, not hidden');
console.log('Passed: complete intention map, bounded depth, small action groups, legacy links/flags, exact Find destinations, both platforms and unchanged source keys.');
