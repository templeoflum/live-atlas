// Read-only triage, not semantic certification. Compare the manual's emphasized
// control vocabulary with what each real action card renders (not image captions,
// hidden data, source URLs or the global search index).
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const model=require('./atlas-model.cjs');
const decode=s=>s.replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n));
const plain=s=>decode(s.replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
const normalize=s=>plain(s).normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g,'');
function audit(){
  const m=model(),{entries,manualAtlas:manual,workspaceAtlas:w,clipsAtlas:c,devicesAtlas:d,shortcutExplorer:k}=m;
  const sourceChunks=new Map(),rendered=new Map();
  for(const root of manual.roots){
    let html=readFileSync(join(__dirname,'../manual-research',root.chapter+'.html'),'utf8');
    html=html.slice(html.indexOf('<h1'));html=html.slice(0,html.indexOf('</section>'));
    const headings=[...html.matchAll(/<h([1-6])\b[^>]*id="([^"]+)"[^>]*>[\s\S]*?<\/h\1>/g)];
    headings.forEach((h,i)=>sourceChunks.set(root.chapter+'#'+h[2],html.slice(h.index+h[0].length,headings[i+1]?.index||html.length).replace(/<figure\b[\s\S]*?<\/figure>/g,'')));
  }
  const ctx={esc:s=>String(s),platform:()=> 'mac',entries,captureFigure:()=>'',flagHTML:()=>''};
  const rows=[];
  for(const node of manual.nodes.values()){
    const owner=k.owned(node.id)?k:w.owned(node.id)?w:c.owned(node.id)?c:d.owned(node.id)?d:manual;
    const loc=owner.locations?.get(node.id),card=(loc?.action||loc?.item)?.id||node.id;
    if(!rendered.has(card)){
      const host={innerHTML:'',scrollTop:0};owner.mount(host,entries.get(card),ctx);
      rendered.set(card,plain(host.innerHTML.replace(/<nav\b[\s\S]*?<\/nav>/g,'').replace(/<a\b[\s\S]*?<\/a>/g,'')));
    }
    const chunk=sourceChunks.get(node.key)||'';
    const candidates=[...new Set([...chunk.matchAll(/<(?:em|strong)\b[^>]*>([\s\S]*?)<\/(?:em|strong)>/g)].map(x=>plain(x[1])).filter(x=>x.length>=3&&x.length<=70&&/[a-z]/i.test(x)))];
    const visible=normalize(rendered.get(card)),missing=candidates.filter(term=>!visible.includes(normalize(term)));
    rows.push({key:node.key,section:node.number,title:node.title,card,view:entries.get(card).view,url:node.url,sourceWords:plain(chunk).split(/\s+/).filter(Boolean).length,cardWords:rendered.get(card).split(/\s+/).filter(Boolean).length,candidates,notNamed:missing});
  }
  return {retrieved:m.manualData.retrieved,method:'Emphasized-name triage only. Missing names are review candidates, not proven omissions; matching names do not prove a correct explanation. Whole-card text may span several sections. Captions and links do not count.',chapters:manual.roots.map(r=>{const rowsInChapter=rows.filter(n=>n.key.startsWith(r.chapter+'#'));return {number:r.number,chapter:r.chapter,title:r.title,sections:rowsInChapter.length,candidateSections:rowsInChapter.filter(n=>n.notNamed.length).length};}),rows};
}
if(require.main===module){
  const result=audit();
  if(process.argv.includes('--json'))console.log(JSON.stringify(result,null,2));
  else {
    console.log(result.method);
    for(const ch of result.chapters)if(ch.candidateSections)console.log(ch.number+'. '+ch.title+': '+ch.candidateSections+' sections to inspect');
    console.log('\nUse --json for exact control names and local card destinations. This is not a completion score.');
  }
}
module.exports={audit};
