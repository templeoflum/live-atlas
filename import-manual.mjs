// Build metadata and factual shortcut mappings only. Never ship manual prose.
// Raw pages are a private research cache outside the preview's allowlist.
import {mkdir,writeFile,readFile} from 'node:fs/promises';
const root=new URL('./',import.meta.url),cache=new URL('../manual-research/',root);
const origin='https://www.ableton.com';
const decode=s=>s.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&nbsp;/g,' ').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replace(/\s+/g,' ').trim();
await mkdir(cache,{recursive:true});
async function page(slug){
  const file=new URL(slug+'.html',cache);
  if(!process.argv.includes('--refresh'))try{return await readFile(file,'utf8');}catch{}
  const response=await fetch(origin+'/en/live-manual/12/'+slug+'/',{signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw Error(slug+': '+response.status);
  const html=await response.text();await writeFile(file,html);return html;
}
const welcome=await page('welcome-to-live');
const toc=[...welcome.matchAll(/<a href="(\/en\/live-manual\/12\/([^"#]+)\/#([^"]+))">\s*<span class="section-number">([^<]+)<\/span>\s*([\s\S]*?)<\/a>/g)].map(m=>({chapter:m[2],anchor:m[3],number:m[4].replace(/\.$/,''),title:decode(m[5]),url:origin+m[1]}));
if(toc.length<800)throw Error('Manual inventory unexpectedly short; inspect source format.');
const chapters=toc.filter(n=>!n.number.includes('.'));
const nodes=[];const shortcuts=[];let index=0;
await Promise.all(Array.from({length:3},async()=>{
  while(index<chapters.length){
    const chapter=chapters[index++],html=await page(chapter.chapter);
    const headingPattern=/<h([1-6])\b[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
    const headings=[...html.matchAll(headingPattern)];
    const ids=new Set(headings.map(m=>m[2]));
    for(const node of toc.filter(n=>n.chapter===chapter.chapter)){
      if(!ids.has(node.anchor))throw Error('Missing section '+node.url);
      nodes.push(node);
    }
    // Include deeper headings omitted from the public compact table of contents.
    for(const m of headings){
      const title=decode(m[3]);const number=title.match(/^(\d+(?:\.\d+)*)(?:\.\s|\s)/)?.[1];
      if(number&&+number.split('.')[0]===+chapter.number&&!nodes.some(n=>n.chapter===chapter.chapter&&n.anchor===m[2]))nodes.push({chapter:chapter.chapter,anchor:m[2],number,title:title.replace(/^\d+(?:\.\d+)*\.?\s+/,''),url:origin+'/en/live-manual/12/'+chapter.chapter+'/#'+m[2]});
    }
    if(chapter.chapter==='live-keyboard-shortcuts'){
      for(let i=0;i<headings.length;i++){
        const m=headings[i],section=html.slice(m.index,headings[i+1]?.index||html.length);
        for(const table of section.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/g)){
          for(const row of table[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)){
            const cells=[...row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)].map(c=>decode(c[1]));
            if(cells.length===3&&cells[0])shortcuts.push({action:cells[0],win:cells[1],mac:cells[2],section:m[2],group:decode(m[3]).replace(/^\d+(?:\.\d+)*\.?\s+/,''),source:origin+'/en/live-manual/12/live-keyboard-shortcuts/#'+m[2]});
          }
        }
      }
    }
  }
}));
const numberCompare=(a,b)=>{const x=a.number.split('.').map(Number),y=b.number.split('.').map(Number);for(let i=0;i<Math.max(x.length,y.length);i++){if(x[i]===undefined)return -1;if(y[i]===undefined)return 1;if(x[i]!==y[i])return x[i]-y[i];}return 0;};
nodes.sort(numberCompare);
const data={version:'Live 12',retrieved:new Date().toISOString().slice(0,10),source:origin+'/en/live-manual/12/welcome-to-live/',tocCount:toc.length,chapters:chapters.length,nodes,shortcuts};
if(shortcuts.length<200)throw Error('Shortcut table extraction unexpectedly short: '+shortcuts.length);
await writeFile(new URL('manual-data.js',root),'// Generated factual index; see import-manual.mjs. No manual body text.\nconst manualData = '+JSON.stringify(data,null,2)+';\n');
console.log(JSON.stringify({chapters:data.chapters,toc:toc.length,sections:nodes.length,shortcuts:shortcuts.length,cache:cache.pathname}));
