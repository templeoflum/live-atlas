import http from 'node:http';
import { readFile } from 'node:fs/promises';
import os from 'node:os';
import { spawn } from 'node:child_process';
import historyImages from './history-images-data.js';
const manualImages=JSON.parse(await readFile(new URL('manual-images.json',import.meta.url),'utf8'));
const files = new Map([['/','index.html'],['/index.html','index.html'],['/atlas.css','atlas.css'],['/atlas.js','atlas.js']]);
files.set('/record-midi.js','record-midi.js');
files.set('/entry-reference.js','entry-reference.js');
files.set('/workspace-atlas.js','workspace-atlas.js');
for(const name of ['manual-images-data.js','manual-images.js','device-control-details.js','sampler-control-details.js','device-review-instruments.js','device-review-effects.js','device-review-midi.js','device-review-racks.js'])files.set('/'+name,name);
for(const image of manualImages.figures.filter(f=>!f.error))files.set('/assets/'+image.file,'assets/'+image.file);
for(const name of ['manual-completion.js','push-atlas.js'])files.set('/'+name,name);
files.set('/clips-atlas.js','clips-atlas.js');
for(const name of ['device-actions.js','device-effects.js','device-racks-max.js','devices-atlas.js'])files.set('/'+name,name);
files.set('/workspace-media.js','workspace-media.js');
files.set('/shortcut-explorer.js','shortcut-explorer.js');
for(const name of ['history-data.js','history-atlas.js','history-images-data.js','history-images.js'])files.set('/'+name,name);
for(const image of historyImages.figures)files.set('/assets/'+image.file,'assets/'+image.file);
files.set('/card-navigation.js','card-navigation.js');
files.set('/vocabulary.js','vocabulary.js');
files.set('/neighborhood-cards.js','neighborhood-cards.js');
for(const name of ['manual-data.js','manual-guides.js','manual-device-guides.js','manual-workflow-guides.js','manual-editing-guides.js','manual-clip-guides.js','manual-workspace-guides.js','manual-set-guides.js','manual-routing-guides.js','manual-envelope-guides.js','manual-file-guides.js','manual-atlas.js'])files.set('/'+name,name);
for (const name of ['arm-track.mp4','arm-track.vtt','arm-toggle.mp4']) files.set('/assets/'+name,'assets/'+name);
for (const name of ['record-unarmed','record-armed']) files.set(`/assets/native/${name}.png`,`assets/native/${name}.png`);
for (const name of ['live-session.jpg','live-arrangement.jpg','live-search.jpg','live-drift.jpg','live-device-chain.jpg','live-midi-clip.jpg','live-midi-clip-sample.png']) files.set('/assets/'+name,'assets/'+name);
const nativeCaptures=['analog','arpeggiator','arrangement','audio-clip','audio-rack','auto-filter','automation','browser-hidden','chord','chorus','collision','compressor','consolidate','delay','drum-rack','echo','electric','eq-eight','export','instrument-rack','mapping','midi-rack','note-length','operator','pitch','quantize','rename','reverb','sampler','saturator','search-drift','session-chain','settings','simpler','split','velocity','wavetable'];
for (const name of nativeCaptures) files.set(`/assets/native/${name}.png`,`assets/native/${name}.png`);
const workspaceCaptures=['ws-browser-filters','ws-cloud','ws-current-project','ws-duplicate','ws-info-view','ws-learn-view','ws-packs','ws-push','ws-quick-tags','ws-restored','ws-selection','ws-tag-editor','ws-tempo-lane','ws-user-library','ws-display','ws-theme','ws-midi-ports','ws-link','ws-library-settings','ws-storage','ws-plugins','ws-record-defaults','ws-installation','ws-filter-menu','ws-metronome-menu','ws-track-menu','ws-tempo-menu'];
for(const name of workspaceCaptures)files.set(`/assets/native/${name}.png`,`assets/native/${name}.png`);
for(const name of ['ws-key-map','ws-info-note','ws-note-status','ws-device-folded','ws-value-typed'])files.set(`/assets/native/${name}.png`,`assets/native/${name}.png`);
const types = {html:'text/html; charset=utf-8',css:'text/css; charset=utf-8',js:'text/javascript; charset=utf-8',jpg:'image/jpeg',jpeg:'image/jpeg',png:'image/png',svg:'image/svg+xml',gif:'image/gif',mp4:'video/mp4',vtt:'text/vtt; charset=utf-8'};
const server = http.createServer(async (req,res) => {
  const file = files.get(new URL(req.url,'http://127.0.0.1').pathname);
  if (!file || !['GET','HEAD'].includes(req.method)) { res.writeHead(404);res.end('Not found');return; }
  try {
    const body = await readFile(new URL(file,import.meta.url));
    const headers={'Content-Type':types[file.split('.').pop()],'Content-Length':body.length,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"};
    if(file.endsWith('.mp4')){
      headers['Accept-Ranges']='bytes';
      if(req.headers.range && req.method==='GET'){
        const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
        let start=0,end=body.length-1;
        if(match && (match[1]||match[2])){
          if(match[1]){start=Number(match[1]);if(match[2])end=Math.min(end,Number(match[2]));}
          else start=Math.max(0,body.length-Number(match[2]));
        } else start=body.length;
        if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start>end||start>=body.length){
          res.writeHead(416,{'Content-Range':`bytes */${body.length}`});res.end();return;
        }
        res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${body.length}`,'Content-Length':end-start+1});res.end(body.subarray(start,end+1));return;
      }
    }
    res.writeHead(200,headers);
    res.end(req.method === 'HEAD' ? undefined : body);
  } catch { res.writeHead(404);res.end('Not found'); }
});
// --lan shares the atlas on the local network (e.g. with a student's laptop); default stays local-only.
// Port 80 lets the address be typed without a port number; fall back if it is taken.
const lan=process.argv.includes('--lan');
const listen=port=>server.listen(port,lan?'0.0.0.0':'127.0.0.1');
server.on('listening',()=>{
  const {port}=server.address();
  console.log(`Live Atlas: http://127.0.0.1:${port}/`);
  if(!lan)return;
  const suffix=port===80?'':`:${port}`;
  const addresses=Object.values(os.networkInterfaces()).flat().filter(a=>a.family==='IPv4'&&!a.internal).map(a=>a.address);
  // Advertise atlas.local while the server runs, so the Mac's own name is not needed.
  const alias=addresses.length?'atlas.local':null;
  if(alias){
    const dnsSd=spawn('dns-sd',['-P','Live Atlas','_http._tcp','local',String(port),alias,addresses[0]],{stdio:'ignore'});
    dnsSd.on('error',()=>{});
    process.on('exit',()=>dnsSd.kill());
    for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>process.exit());
  }
  console.log('On the same Wi-Fi, open:');
  for(const address of [alias,...addresses].filter(Boolean))console.log(`  http://${address}${suffix}/`);
  console.log('Over Tailscale, open http://<this machine’s Tailscale name>'+suffix+'/');
});
server.on('error',error=>{
  if(lan&&!process.env.LIVE_ATLAS_PORT&&error.code==='EADDRINUSE'&&!server.retried){server.retried=true;listen(54868);return;}
  throw error;
});
listen(Number(process.env.LIVE_ATLAS_PORT || (lan ? 80 : 0)));
