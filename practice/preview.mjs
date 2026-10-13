// Practice-only wrapper. The existing atlas allowlist and build remain untouched.
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
const atlas = spawn(process.execPath, ['serve.mjs'], {
  cwd: new URL('../', import.meta.url), env: {...process.env, LIVE_ATLAS_PORT: '0'}, stdio: ['ignore', 'pipe', 'inherit']
});
const files = new Map([['/practice/drill.html', 'drill.html'], ['/practice/drill.js', 'drill.js']]);
let server;
atlas.stdout.once('data', chunk => {
  const match = /http:\/\/127\.0\.0\.1:(\d+)/.exec(String(chunk));
  if (!match) throw Error('Atlas preview address missing');
  server = http.createServer(async (req, res) => {
    const file = files.get(new URL(req.url, 'http://127.0.0.1').pathname);
    if (file) {
      if (!['GET', 'HEAD'].includes(req.method)) {res.writeHead(404); res.end(); return;}
      try {
        const body = await readFile(new URL(file, import.meta.url));
        res.writeHead(200, {'Content-Type': file.endsWith('.html') ? 'text/html; charset=utf-8' : 'text/javascript; charset=utf-8', 'Cache-Control': 'no-store'});
        res.end(req.method === 'HEAD' ? undefined : body);
      } catch {res.writeHead(404); res.end();}
      return;
    }
    const request = http.request({hostname:'127.0.0.1', port:Number(match[1]), path:req.url, method:req.method, headers:req.headers}, response => {
      res.writeHead(response.statusCode, response.headers); response.pipe(res);
    });
    request.on('error', () => {res.writeHead(502); res.end();});
    req.pipe(request);
  });
  server.listen(Number(process.env.PRACTICE_PORT || 54869), '127.0.0.1', () => {
    console.log('Navigation drill: http://127.0.0.1:' + server.address().port + '/practice/drill.html');
  });
});
atlas.on('exit', () => {if (server) server.close();});
process.on('exit', () => atlas.kill());
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => process.exit());
