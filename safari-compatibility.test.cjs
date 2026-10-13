const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
// Node's bundled Acorn avoids a new build step or dependency installation.
const scan=execFileSync(process.execPath,['--expose-internals','-e',`
 const fs=require('node:fs'),acorn=require('internal/deps/acorn/acorn/dist/acorn');
 const files=Array.from(fs.readFileSync('index.html','utf8').matchAll(/<script\\b[^>]*src="([^"]+)"/g),m=>m[1]);
 function check(source,name){
  const ast=acorn.parse(source,{ecmaVersion:2020,locations:true});
  function walk(n){
   if(!n||typeof n!=='object')return;
   if(n.type==='MemberExpression'&&((!n.computed&&n.property.name==='at')||(n.computed&&n.property.value==='at')))throw Error(name+':'+n.loc.start.line+' Array.at is outside the compatibility floor');
   for(const v of Object.values(n))if(Array.isArray(v))v.forEach(walk);else if(v&&typeof v==='object')walk(v);
  }walk(ast);
 }
 for(const file of files)check(fs.readFileSync(file,'utf8'),file);
 for(const fixture of ['a ||= b','a ??= b','a &&= b','[].at(-1)','[]["at"](-1)']){
  let rejected=false;try{check(fixture,'fixture')}catch{rejected=true}if(!rejected)throw Error('Guard missed '+fixture);
 }
 console.log('Passed: '+files.length+' shipped scripts parse as Acorn ES2020; no Array.at; all five regression fixtures rejected.');
`],{cwd:__dirname,encoding:'utf8'});
assert.match(scan,/Passed:/);
const css=fs.readFileSync(path.join(__dirname,'atlas.css'),'utf8');
assert.match(css,/body\.exploring\{height:100vh;height:100dvh/);
console.log(scan.trim());
