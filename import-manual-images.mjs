// Asset importer: only Ableton's cached manual-body illustrations, never the
// site's navigation/footer artwork. Output is generated provenance metadata.
import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
import {inflateSync} from 'node:zlib';
const base=new URL('./',import.meta.url);
const data=vm.runInNewContext(await readFile(new URL('manual-data.js',base),'utf8')+'\nmanualData');
const decode=s=>s.replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g,' ').replace(/<[^>]*>/g,'').trim();
const figures=[];
for(const chapter of [...new Set(data.nodes.map(n=>n.chapter))]){
  let html=await readFile(new URL('../manual-research/'+chapter+'.html',base),'utf8');
  html=html.slice(html.indexOf('<h1'));html=html.slice(0,html.indexOf('</section>'));
  let anchor=chapter,index=0;
  for(const match of html.matchAll(/<h([1-6])\b[^>]*id="([^"]+)"[^>]*>[\s\S]*?<\/h\1>|<figure\b[\s\S]*?<\/figure>|<img\b[^>]*>/g)){
    if(match[2]){anchor=match[2];continue;}
    const tag=match[0],src=tag.match(/(?:data-src|src)="([^"]+)"/)?.[1];
    if(!src||!src.includes('/live-manual/12/'))continue;
    const url=new URL(decode(src));
    if(url.hostname!=='ableton-production.imgix.net')throw Error('Unexpected asset host '+url.hostname);
    url.search='';
    const sourceKey=chapter+'#'+anchor;
    const id='manual-'+chapter+'-'+String(++index).padStart(3,'0');
    const caption=decode(tag.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/)?.[1]||'');
    const inline=!tag.startsWith('<figure');
    const file='manual/'+createHash('sha256').update(url.href).digest('hex').slice(0,16)+'.'+url.pathname.split('.').at(-1).toLowerCase();
    const node=data.nodes.find(n=>n.chapter===chapter&&n.anchor===anchor);
    const sizes=[...tag.matchAll(/\s(\d+)w/g)].map(m=>+m[1]);
    // The manual's own desktop layout width: the first length in its sizes attribute (em at 16px).
    const layoutEm=+(tag.match(/sizes="[^"]*?\)\s*([\d.]+)em/)?.[1]||0);
    figures.push({id,key:sourceKey,chapter,section:node?.number,title:caption||node?.title||anchor,caption,inline,url:url.href,sourceAsset:decode(src),maxWidth:Math.max(0,...sizes),file,source:'https://www.ableton.com/en/live-manual/12/'+chapter+'/#'+anchor,layoutWidth:Math.round(layoutEm*16)});
  }
}
const offline=process.argv.includes('--offline');
if(!process.argv.includes('--download')&&!offline){
  console.log(JSON.stringify({occurrences:figures.length,figures:figures.filter(f=>!f.inline).length,inline:figures.filter(f=>f.inline).length,unique:new Set(figures.map(f=>f.url)).size,examples:figures.slice(0,3)},null,2));
  process.exit();
}
await mkdir(new URL('assets/manual/',base),{recursive:true});
function size(b,file){
  if(b.subarray(1,4).toString()==='PNG')return [b.readUInt32BE(16),b.readUInt32BE(20)];
  if(b.subarray(0,3).toString()==='GIF')return [b.readUInt16LE(6),b.readUInt16LE(8)];
  if(b[0]===255&&b[1]===216){let i=2;while(i<b.length){if(b[i]!==255)throw Error('Invalid JPEG');const mark=b[i+1];const len=b.readUInt16BE(i+2);if([192,193,194].includes(mark))return[b.readUInt16BE(i+7),b.readUInt16BE(i+5)];i+=len+2;}}
  throw Error('Unrecognized dimensions '+file);
}
// Figures drawn for a white page: black callouts, line art or gaps on transparent ground.
// Only interior transparency counts; rounded panel corners stay on the dark frame.
function matte(b){
  if(b.subarray(1,4).toString()!=='PNG')return null;
  let i=8,w,h,ct,bd,il;const idat=[];
  while(i<b.length){
    const len=b.readUInt32BE(i),type=b.toString('ascii',i+4,i+8),d=b.subarray(i+8,i+8+len);
    if(type==='IHDR'){w=d.readUInt32BE(0);h=d.readUInt32BE(4);bd=d[8];ct=d[9];il=d[12];}
    else if(type==='IDAT')idat.push(d);else if(type==='IEND')break;
    i+=12+len;
  }
  if(ct!==6)return null;
  if(bd!==8||il!==0)throw Error('Unsupported RGBA PNG layout');
  const raw=inflateSync(Buffer.concat(idat)),bpp=4,stride=w*bpp;
  let prev=Buffer.alloc(stride),cur=Buffer.alloc(stride),p=0,clear=0,count=0;
  const r=Math.max(12,Math.floor(Math.min(w,h)*0.06)),inset=w>2*r&&h>2*r?r:0;
  for(let y=0;y<h;y++){
    const filter=raw[p++];raw.copy(cur,0,p,p+stride);p+=stride;
    for(let x=0;x<stride;x++){
      const a=x>=bpp?cur[x-bpp]:0,up=prev[x],c=x>=bpp?prev[x-bpp]:0;let v=cur[x];
      if(filter===1)v+=a;else if(filter===2)v+=up;else if(filter===3)v+=(a+up)>>1;
      else if(filter===4){const pp=a+up-c,pa=Math.abs(pp-a),pb=Math.abs(pp-up),pc=Math.abs(pp-c);v+=pa<=pb&&pa<=pc?a:pb<=pc?up:c;}
      cur[x]=v&255;
    }
    if(y>=inset&&y<h-inset)for(let x=inset;x<w-inset;x++){count++;if(cur[x*4+3]<128)clear++;}
    [prev,cur]=[cur,prev];
  }
  return count&&clear/count>0.001?'light':null;
}
const previous=offline?new Map(JSON.parse(await readFile(new URL('manual-images.json',base),'utf8')).figures.map(f=>[f.id,f])):null;
const queue=[...new Map(figures.map(f=>[f.file,f])).values()];
let done=0;
await Promise.all(Array.from({length:6},async()=>{
  while(queue.length){
    const f=queue.shift(),path=new URL('assets/'+f.file,base);let bytes;
    try{await access(path);bytes=await readFile(path);size(bytes,f.file);}catch{
      if(offline){const old=previous.get(f.id);if(!old?.error)throw Error('Missing local asset '+f.file);for(const item of figures.filter(item=>item.file===f.file))item.error=previous.get(item.id).error;continue;}
      let response=await fetch(f.url,{signal:AbortSignal.timeout(30000)});
      if(!response.ok)response=await fetch(f.sourceAsset.replace(/w=\d+/, 'w='+(f.maxWidth||320)),{signal:AbortSignal.timeout(30000)});
      if(!response.ok){for(const item of figures.filter(item=>item.file===f.file))item.error='Official asset returned HTTP '+response.status;console.log('Unavailable: '+f.url);continue;}
      bytes=Buffer.from(await response.arrayBuffer());
      try{size(bytes,f.file);}catch{for(const item of figures.filter(item=>item.file===f.file))item.error='Unrecognized image response';console.log('Unrecognized: '+f.url+' '+bytes.subarray(0,32).toString('hex'));continue;}
      await writeFile(path,bytes);
    }
    const [width,height]=size(bytes,f.file),m=matte(bytes);
    for(const item of figures.filter(item=>item.file===f.file)){
      // Show each figure at the width the manual itself uses, never enlarged.
      const displayWidth=Math.min(width,item.layoutWidth||width);
      Object.assign(item,{width,height,bytes:bytes.length,pixelRatio:+(width/displayWidth).toFixed(3),displayWidth},m?{matte:m}:{});
    }
    if(++done%100===0)console.log('Downloaded / checked '+done+' manual images');
  }
}));
const output={retrieved:data.retrieved,source:data.source,figures};
await writeFile(new URL('manual-images.json',base),JSON.stringify(output,null,2)+'\n');
await writeFile(new URL('manual-images-data.js',base),'// Generated by import-manual-images.mjs; source metadata, not manual prose.\nconst manualImagesData='+JSON.stringify(output)+';\n');
console.log('Ready: '+figures.length+' image placements; '+new Set(figures.map(f=>f.file)).size+' unique files.');
