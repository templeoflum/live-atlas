const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const {audit,markdown}=require('./manual-card-audit.cjs');
const report=audit();
assert.equal(report.chapters.length,42);
assert.equal(report.rows.length,1051);
assert.equal(new Set(report.rows.map(r=>r.key)).size,report.rows.length);
assert.equal(report.counts.mapped+report.counts.missing,report.rows.length);
assert.equal(report.counts.plainReferenceGuides+report.counts.linkOnly,report.counts.missing);
for(const row of report.rows){
  assert.equal(new URL(row.url).hostname,'www.ableton.com');
  if(row.status==='reference-only'){assert.equal(row.card,null);assert.equal(row.path,null);}
  else assert.ok(row.card&&row.path,'A mapped section must identify a reachable card');
}
for(const chapter of report.chapters)assert.equal(chapter.mapped+chapter.missing,chapter.sections);
const byKey=new Map(report.rows.map(r=>[r.key,r]));
assert.equal(byKey.get('using-push-1#using-push-1').status,'action-card');
assert.equal(byKey.get('accessibility-and-keyboard-navigation#speak-help-text').status,'action-card');
assert.equal(report.counts.missing,0);
assert.equal(byKey.get('credits#credits').status,'source-information','Credits are information, not an invented musical action');
assert.equal(byKey.get('arrangement-view#selecting-clips-and-time').status,'action-card');
assert.match(byKey.get('arrangement-view#selecting-clips-and-time').path,/Workspace → Arrangement/);
assert.match(byKey.get('managing-files-and-sets#template-sets').path,/Workspace → Files/);
assert.equal(readFileSync(join(__dirname,'MANUAL_CARD_AUDIT.md'),'utf8'),markdown(report));
const html=readFileSync(join(__dirname,'index.html'),'utf8');
assert.ok(html.includes('IV · History'));
assert.ok(html.includes('id="view-history"'));
assert.ok(!/Origins|origins/.test(html));
const css=readFileSync(join(__dirname,'atlas.css'),'utf8');
assert.ok(!/body\.exploring\s+\.nav\s*\{/.test(css),'Top navigation has one layout across Overview and cards');
assert.ok(!/body\.exploring\s+\.atlas-header\s*\{[^}]*padding/.test(css),'Header padding is shared at each breakpoint');
console.log('Passed: full source-card audit, honest unmapped states, reproducible gap list, History naming and shared header rules.');
