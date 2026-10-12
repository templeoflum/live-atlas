const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const m=require('./atlas-model.cjs')();
const vm=require('node:vm');
const vocabulary=vm.runInNewContext(readFileSync(__dirname+'/vocabulary.js','utf8')+';vocabulary');
vocabulary.install({entries:m.entries,manualData:m.manualData});
const names=new Set();
for(const t of vocabulary.terms){
  assert.ok(!names.has(t.term),'Duplicate term: '+t.term);names.add(t.term);
  assert.ok(m.entries.has(t.home),'Home card exists: '+t.term+' → '+t.home);
  assert.ok(m.entries.get(t.home).view!=='history','Home is a working card: '+t.term);
  assert.ok(t.def.length<=90,'One-line meaning: '+t.term);
  if(t.source)assert.ok(m.manualAtlas.nodes.has(t.source),'Meaning source is a manual section: '+t.term+' → '+t.source);
  for(const [i,action] of (t.keys||[]).entries())assert.ok(t.rows[i],'Shortcut is in the manual table: '+t.term+' → '+action);
  const re=new RegExp(`^(?:${t.match})$`,t.exact?'':'i');
  assert.ok(re.test(t.term)||re.test(t.term.toLowerCase()),'Pattern matches its own name: '+t.term);
}
// Lesson 1 gap: Operator's cards name oscillators; the term must underline there and lead off Operator's opening card.
const osc=vocabulary.terms.find(t=>t.term==='Oscillator'),pattern=new RegExp(`\\b(?:${osc.match})\\b`,'i');
const operator=m.devicesAtlas.locations.get('operator');
assert.equal(m.devicesAtlas.locations.get(osc.home).area,operator.area,'Oscillator home is an Operator card');
assert.notEqual(osc.home,'operator','Oscillator home differs from the opening card, so the term underlines there');
assert.ok(pattern.test(operator.item.body),'Operator’s opening card mentions oscillators');
console.log(`Passed: ${names.size} vocabulary terms, each with a real home card, manual-table shortcuts and a one-line meaning.`);
