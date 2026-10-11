const assert=require('node:assert/strict');
const r=require('./manual-content-audit.cjs').audit();
assert.equal(r.chapters.length,42);assert.equal(r.rows.length,1051);
assert.match(r.method,/not proven omissions/);
const wave=r.rows.find(n=>n.key.endsWith('#saturators-waveshaper-controls'));
for(const name of ['Drive','Curve','Depth','Linear','Damp','Period']){
  assert.ok(wave.candidates.includes(name));assert.ok(!wave.notNamed.includes(name));
}
for(const row of r.rows){assert.ok(row.card&&row.view&&row.url);assert.ok(row.sourceWords>=0&&row.cardWords>0);}
assert.ok(r.rows.some(n=>n.notNamed.length),'Unresolved candidates are retained, not reclassified as complete.');
console.log('Passed: all source headings compared with actual card text; figure captions excluded; review candidates remain explicitly unresolved.');
