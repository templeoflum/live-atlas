// Download curated source originals; extract historical manual figures at their
// embedded resolution. A later version is never a substitute for a missing one.
// Existing downloaded source bytes are not overwritten.
const {mkdir,readFile,writeFile}=require('node:fs/promises');
const {execFileSync}=require('node:child_process');
const {join}=require('node:path');
const {createHash}=require('node:crypto');
const {figures}=require('./history-images-data.js');
(async()=>{
  await mkdir(join(__dirname,'assets/history'),{recursive:true});
  const archiveDir=join(__dirname,'tmp/pdfs');
  await mkdir(archiveDir,{recursive:true});
  const dimensions={};
  for(const f of figures){
    const path=join(__dirname,'assets',f.file);
    let bytes;
    try{bytes=await readFile(path);}catch(error){
      if(error.code!=='ENOENT')throw error;
      if(f.kind==='archive-manual'){
        const pdf=join(archiveDir,'live-'+f.sourceMajor+'.pdf');
        let original;
        try{original=await readFile(pdf);}catch(error){
          if(error.code!=='ENOENT')throw error;
          const response=await fetch(f.url);
          if(!response.ok)throw Error(f.id+': '+response.status);
          original=Buffer.from(await response.arrayBuffer());
          if(original.subarray(0,5).toString()!=='%PDF-')throw Error('Not a PDF: '+f.url);
          await writeFile(pdf,original,{flag:'wx'});
        }
        if(createHash('sha256').update(original).digest('hex')!==f.pdfSha256)throw Error('Historical source changed: '+f.url);
        execFileSync(process.env.LIVE_ATLAS_PYTHON||'python3',[join(__dirname,'extract-history-manual-image.py'),pdf,String(f.pdfPage),String(f.pdfImage),path,...(f.pdfDisplayTransform?[f.pdfDisplayTransform]:[])]);
        bytes=await readFile(path);
      }else{
        const response=await fetch(f.url);
        if(!response.ok||!response.headers.get('content-type')?.startsWith('image/'))throw Error(f.id+': '+response.status);
        bytes=Buffer.from(await response.arrayBuffer());
        await writeFile(path,bytes,{flag:'wx'});
      }
    }
    const info=execFileSync('sips',['-g','pixelWidth','-g','pixelHeight',path],{encoding:'utf8'});
    const width=Number(info.match(/pixelWidth: (\d+)/)?.[1]),height=Number(info.match(/pixelHeight: (\d+)/)?.[1]);
    if(!width||!height)throw Error('Unreadable image: '+f.file);
    dimensions[f.id]={width,height,bytes:bytes.length};
  }
  process.stdout.write(JSON.stringify(dimensions,null,2)+'\n');
})().catch(error=>{console.error(error);process.exitCode=1;});
