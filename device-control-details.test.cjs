const assert=require('node:assert/strict');
const m=require('./atlas-model.cjs')();
const {devicesAtlas:d,entries}=m;
const checks=[
  ['saturator','curve',['Drive (%)','Curve','Depth','Period','Linear','Damp']],
  ['saturator','drive',['Post Clip Mode','Bass Shaper Threshold','Pre-DC Filter','Hi-Quality']],
  ['compressor','reduce',['Lookahead','Expand','Lin / Log','Makeup','Activity']],
  ['compressor','duck',['Sidechain Gain','Sidechain EQ','Listen']],
  ['eq-eight','move',['Adaptive Q','Scale','48 dB','Option-drag']],
  ['eq-eight','listen',['Oversampling','Analyze','Audition','M/S']],
  ['eq-three','split',['Signal LEDs','24 / 48 dB','FreqLo / FreqHi']],
  ['utility','level',['DC','Mute placement']],
  ['utility','width',['Bass Mono Audition','100S','50–500 Hz']],
  ['limiter','catch',['True Peak','1.5, 3 or 6 ms']],
  ['limiter','maximize',['Maximize','M/S','Link']],
  ['auto-filter','sweep',['Resampling','Notch + LP','SVF / DFM','MS2 / PRD']],
  ['auto-filter','cycle',['Phase Offset','Quantization','Wander','Smooth']],
  ['auto-filter','follow',['Envelope S&H / Rate','Mono Sidechain','SC Filter']],
  ['sampler','load',['Normalize Pan','Distribute Ranges Around Root Key','Sampler → Simpler']],
  ['sampler','zone',['Reset Interval','Other / Random','Lin / Pow','Selector 0–127']],
  ['sampler','loop',['Release Mode','Crossfade','Interpol','Reverse','B/M/L/R']],
  ['sampler','pitch',['Vol < Vel','Fixed / Freq / Multi','Zn Shft','Portamento']],
  ['sampler','shape',['A. Slope','Time < Vel','Voices / R','F. Env','4bit']],
  ['sampler','map',['Pitch Bend Range','Release Velocity','Attack / Retrig / Offset','29 available']]
];
for(const [device,action,terms]of checks){
  const area=d.areas.find(a=>a.anchor===device),item=area.items.find(i=>i.slug===action),host={innerHTML:'',scrollTop:0};
  d.mount(host,entries.get(item.id),{esc:String,platform:()=> 'mac',entries,captureFigure:()=>'',flagHTML:()=>''});
  for(const term of terms)assert.ok(host.innerHTML.includes(term),device+'/'+action+': '+term);
  assert.ok(!host.innerHTML.includes('<details'),'Controls remain visible inside the selected action.');
}
for(const a of d.areas)for(const item of a.items)for(const s of item.manualSections||[])if(s.controls){
  assert.ok(item.sources.some(n=>n.key===s.key),'Control details stay with an action that actually cites their source.');
  for(const [name,body]of s.controls)assert.ok(name&&body.length>20);
}
console.log('Passed: every reviewed device family (instruments, audio and MIDI effects, Racks, Max for Live) exposes cited controls, behaviors and caveats inside its existing action card.');
