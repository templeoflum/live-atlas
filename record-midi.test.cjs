const {readFileSync,existsSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const pilotSource=readFileSync(join(__dirname,'record-midi.js'),'utf8');
const {steps,stepById}=vm.runInNewContext(pilotSource+'\nmidiPilot');
const atlas=readFileSync(join(__dirname,'atlas.js'),'utf8');
const data=atlas.slice(0,atlas.indexOf('const flags=new Set();'));
const {captures,entries}=vm.runInNewContext(data+'\n({captures,entries})');
assert.deepEqual(Array.from(steps,s=>s.id),['instrument','input','arm','record','listen']);
assert.equal(new Set(steps.map(s=>s.id)).size,5);
assert.equal(stepById('missing'),undefined);
for(const step of steps){
  assert.ok(step.title&&step.action&&step.result);
  assert.equal(stepById(step.id),step);
  assert.ok(step.source.startsWith('https://www.ableton.com/en/manual/'));
  for(const detail of [step.detail,step.help]){
    assert.ok(detail.title&&(detail.text||detail.rows));
    assert.ok(detail.source.startsWith('https://www.ableton.com/en/manual/'));
    if(detail.entry)assert.ok(stepById(detail.entry));
    if(detail.link)assert.ok(entries.has(detail.link));
    if(detail.image)assert.ok(captures[detail.image]);
  }
  const images=step.images||Object.values(step.states).flat();
  for(const id of images)assert.ok(captures[id],`Missing pilot capture: ${id}`);
  for(const key of step.keys||[])assert.ok(key.label&&key.mac&&key.win);
  if(step.video){assert.ok(existsSync(join(__dirname,step.video.file)));assert.ok(step.video.description);}
}
assert.equal(steps.filter(s=>s.video).length,1,'Only Arm has a completed recording in this pilot');
assert.notEqual(captures.pilotArmOff.file,captures.pilotArmOn.file);
assert.deepEqual(Array.from(captures.pilotArmOff.crop),Array.from(captures.pilotArmOn.crop),'Before/after framing must not move');
assert.deepEqual(Array.from(captures.pilotSlotsOff.crop),Array.from(captures.pilotSlotsOn.crop));
for(const id of ['pilotInput','pilotArmOff','pilotArmOn']){
  assert.equal(captures[id].crop[2],captures.pilotSlotsOn.crop[2],`${id} shows one track only`);
}
assert.ok(pilotSource.includes('class="pilot-video-frame"'),'The demonstration is cropped to the same single track');
assert.ok(!/<video[^>]*autoplay/.test(pilotSource));
assert.equal(stepById('arm').video.seconds,2,'The Arm action is a short demonstration');
assert.equal(stepById('arm').video.loop,true,'Repeat the on/off action after explicit Play');
assert.ok(!pilotSource.includes('12 sec'),'Remove obsolete duration labels');
assert.ok(!pilotSource.includes('localStorage'),'Action selection is not student progress');
assert.ok(pilotSource.includes('aria-selected')&&pilotSource.includes('ArrowRight')&&pilotSource.includes('Home:0'));
assert.ok(pilotSource.includes("if(!watch.open)stop()"),'Closing a recording stops playback');
const html=readFileSync(join(__dirname,'index.html'),'utf8');
assert.ok(html.indexOf('record-midi.js')<html.indexOf('atlas.js'),'Load pilot before its atlas hook');
console.log('Passed: archived Record MIDI pilot actions and media integrity; custom video is not active in the current atlas.');
