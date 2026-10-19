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
// T-0203: the manual-backed corrections and missing basics retain explicit provenance.
const corrected=['Set','Track','MIDI','Quantize','Launch Quantization','Follow Action','Capture MIDI','Clip Envelope','Device Chain','MIDI Effect','Main track','Routing','Consolidate','Resampling','Loop Brace','Take Lane'];
const added=['Audio','Project','Modulation','Envelope','LFO','Filter','Cutoff','Resonance'];
for(const name of [...corrected,...added]){
  const t=vocabulary.terms.find(t=>t.term===name);
  assert.ok(t?.source,'Manual-backed resolution exists: '+name);
}
// These are distinct concepts, even when one name contains another.
for(const [name,example] of [['Project','project folder'],['Envelope','envelopes'],['LFO','LFOs'],['Resonance','resonances'],['Loop Brace','loop brace']]){
  const t=vocabulary.terms.find(t=>t.term===name);
  assert.ok(new RegExp(`\\b(?:${t.match})\\b`,'i').test(example),'Basic mention matches: '+example);
}
assert.deepEqual(Array.from(vocabulary.terms.find(t=>t.term==='Filter').views),['devices'],'Audio filters are scoped away from Browser search filters');
console.log('Passed: 16 corrected meanings and 8 added basics retain manual sources and contextual patterns.');
// Project means a folder, not the manual's colloquial Set tempo/rate wording.
const projectPattern=new RegExp(`\\b(?:${vocabulary.terms.find(t=>t.term==='Project').match})\\b`,'i');
for(const text of ['The current project playback tempo.','Project playback speed in beats per minute.','project sample rate','The project’s separate timing reference.','project tempo','Project rate','project\'s sample rate','Live Project’s tempo','projects rate']){
  assert.equal(projectPattern.test(text),false,'No folder definition for Set timing/rate: '+text);
}
for(const text of ['project folder','Live Projects','the project’s Samples/Recorded folder','the Project’s Samples folder','collect the project’s samples','move the project']){
  assert.equal(projectPattern.test(text),true,'Folder Project remains discoverable: '+text);
}
console.log('Passed: Project folder matches exclude Set tempo, playback, sample-rate and timing-reference senses.');
// T-0281: an instruction that opens with "Set" is a verb, not the Live Set.
for(const [before,after] of [['','the loop length.'],['Tap twice. ','how fast it moves.'],['','a note length.']]){
  assert.equal(vocabulary.imperative(before,'Set',' '+after),true,'Imperative Set is skipped: Set '+after);
}
for(const [before,word,after] of [['','Set',' documents, media dependencies.'],['Tracks run down the page; ','Set',' time runs across it.'],['Save the ','Set',' before you quit.'],['','Sets',' hold tracks.'],['Open a ','Set','.'],['','Set','']]){
  assert.equal(vocabulary.imperative(before,word,after),false,'Noun Set stays a term: '+before+word+after);
}
console.log('Passed: sentence-opening "Set the…" instructions are not linked as Live Set; noun uses still are.');
