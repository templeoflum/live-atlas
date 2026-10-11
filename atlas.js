/* Shell, territory cards, inspector and local flags adapted from templeoflum/piano-atlas.
   Content and territory renderers are new. No connection to a running Live instance. */
'use strict';
const MANUAL = 'https://www.ableton.com/en/manual/';
const sources = {
  concepts: MANUAL+'live-concepts/', keys: MANUAL+'live-keyboard-shortcuts/',
  browser: MANUAL+'working-with-the-browser/', session: MANUAL+'session-view/',
  arrangement: MANUAL+'arrangement-view/', devices: MANUAL+'working-with-instruments-and-effects/',
  instruments: MANUAL+'live-instrument-reference/', audiofx: MANUAL+'live-audio-effect-reference/',
  midifx: MANUAL+'live-midi-effect-reference/', racks: MANUAL+'instrument-drum-and-effect-racks/',
  recording: MANUAL+'recording-new-clips/', midi: MANUAL+'editing-midi/',
  warp: MANUAL+'audio-clips-tempo-and-warping/', automation: MANUAL+'automation-and-editing-envelopes/',
  mixing: MANUAL+'mixing/', files: MANUAL+'managing-files-and-sets/',
  mapping: MANUAL+'midi-and-key-remote-control/',
  history: 'https://www.roberthenke.com/interviews/ableton.html',
  live4: 'https://www.ableton.com/de/pages/press/releases/2004_06_04/',
  operator: 'https://roberthenke.com/technology/operator.html',
  team: 'https://www.roberthenke.com/technology/ableton_live.html',
  push: 'https://www.ableton.com/en/blog/the-evolution-of-push/'
};
const territories = [
  {id:'workspace',num:'I',name:'The Workspace',tag:'Navigate · Arrange · Mix · Save',color:'var(--brass)'},
  {id:'clips',num:'II',name:'Clips',tag:'Record · Notes · Audio',color:'var(--steel)'},
  {id:'devices',num:'III',name:'Devices',tag:'Instruments · Effects · Racks',color:'var(--bone)'},
  {id:'history',num:'IV',name:'History',tag:'People · Design · Development',color:'var(--crimson)'}
];
const entries = new Map();
function entry(id,view,title,body,source,extra={}) { const e={id,view,title,body,source,...extra}; entries.set(id,e);return e; }

// I. The workspace — literal places in Live, not a prescribed learning route.
entry('browser','workspace','Browser','Sounds, devices, presets, and files. Search by name, then load the selected result.','browser',{key:['⌘ F','Ctrl F'],keyLabel:'Search',controls:['Sounds','Instruments','Audio Effects','Places']});
entry('transport','workspace','Transport','Playback, tempo, metronome, and Arrangement Record live in the control bar.','concepts',{key:['Space','Space'],keyLabel:'Start / stop'});
entry('switch-views','workspace','Session / Arrangement','Switch between the clip grid and timeline. Changing views does not change playback.','keys',{key:['Tab','Tab'],keyLabel:'Switch views',note:'When “Use Tab to Move Focus” is off.',links:['session','arrangement']});
entry('session','workspace','Session View','A grid of clips that can be launched individually or in scenes.','session',{key:['Tab','Tab'],keyLabel:'Session / Arrangement',note:'Tab switches views when “Use Tab to Move Focus” is off. Changing views does not change playback.',links:['launch','scenes','arrangement']});
entry('arrangement','workspace','Arrangement View','Clips placed along a timeline. Record performances here or edit their placement.','arrangement',{key:['Tab','Tab'],keyLabel:'Session / Arrangement',note:'With Tab focus navigation off.',links:['split','consolidate','automation','session']});
entry('mixer','workspace','Mixer','Track levels, pan, sends, solo, and mute. The same tracks appear in both views.','mixing',{controls:['Volume','Pan','Sends','Solo']});
entry('device-view','workspace','Device View','The selected track’s instruments and effects, arranged in processing order.','devices',{key:['⇧ Tab','Shift Tab'],keyLabel:'Clip / Device',note:'With Tab focus navigation off.',links:['simpler','utility']});
entry('clip-view','workspace','Clip View','The selected clip’s notes or waveform, plus its timing and playback settings.','concepts',{key:['⇧ Tab','Shift Tab'],keyLabel:'Clip / Device',note:'With Tab focus navigation off.',links:['clips','edit-notes','warp']});
entry('hide-browser','workspace','Show / hide Browser','Open or close Live’s Browser without changing the Set.','keys',{key:['⌘ ⌥ B','Ctrl Alt B'],keyLabel:'Show / hide Browser'});
entry('undo','workspace','Undo','Undo the last edit.','keys',{key:['⌘ Z','Ctrl Z']});
entry('duplicate','workspace','Duplicate','Duplicate the selected material.','keys',{key:['⌘ D','Ctrl D'],note:'What duplicates depends on the current selection.'});
entry('rename','workspace','Rename','Rename the selected track, clip, or device.','keys',{key:['⌘ R','Ctrl R']});
entry('new-midi','workspace','Insert MIDI Track','Add a track for MIDI notes and instruments.','keys',{key:['⌘ ⇧ T','Ctrl Shift T']});
entry('new-audio','workspace','Insert Audio Track','Add a track for audio.','keys',{key:['⌘ T','Ctrl T']});
entry('settings','workspace','Settings','Audio devices, MIDI inputs, and Live’s preferences.','keys',{key:['⌘ ,','Ctrl ,']});

// Structure and signal flow live with the objects they describe.
entry('set','workspace','Live Set','The document containing tracks, clips, devices, and their settings.','concepts',{meta:'.als',links:['session','arrangement','save-set']});
entry('tracks','workspace','Tracks','Containers for clips and device chains, with their own routing and mixer controls.','concepts',{links:['new-midi','new-audio','sends']});
entry('clips','clips','Clips','Audio references or MIDI notes, with playback settings.','concepts',{links:['midi-clip','audio-source','clip-view']});
entry('chain','devices','Device chain','A track’s processors, read from left to right.','devices',{links:['device-view']});
entry('midi-clip','clips','MIDI','Notes and control messages—not sound. An instrument turns them into audio.','concepts',{meta:'MIDI clip / controller',links:['edit-notes','instrument']});
entry('midi-effects','devices','MIDI effects','Change note and control messages before they reach an instrument.','devices',{links:['arpeggiator','velocity']});
entry('instrument','devices','Instrument','Receives MIDI and produces audio.','devices',{links:['simpler','drift']});
entry('audio-source','clips','Audio','Recorded sound, a sample, or an incoming audio signal.','concepts',{meta:'Audio clip / input',links:['record-audio','warp']});
entry('audio-effects','devices','Audio effects','Process sound after an instrument or audio source.','devices',{links:['utility','reverb']});
entry('track-mixer','workspace','Track mixer','Balances the track and sends its output onward.','mixing',{links:['levels','sends']});
entry('main','workspace','Main output','The final mix sent to your chosen audio output.','mixing',{note:'Older Live versions call this the Master track.'});

// Selected native devices. Family names reflect Live, not a genre or aesthetic.
const families=[
  {name:'Instruments',role:'MIDI → audio',source:'instruments',items:[
    ['simpler','Simpler','Play a sample as an instrument or divide it into slices.',['Classic','One-Shot','Slicing']],
    ['sampler','Sampler','Map multiple samples across notes and playing velocities.',['Zones','Filter','Modulation']],
    ['drift','Drift','A compact subtractive synthesizer.',['Oscillators','Filter','Envelopes']],
    ['operator','Operator','Combine four oscillators through FM or additive arrangements.',['Algorithm','Level','Envelope']],
    ['wavetable','Wavetable','Move through waveforms to change a synthesized tone.',['Position','Filter','Matrix']],
    ['analog','Analog','Synthesis modeled on analog circuitry.',['Oscillators','Filters','Amplifiers']],
    ['electric','Electric','Modeled electric-piano mechanics.',['Mallet','Fork','Pickup']],
    ['collision','Collision','Modeled struck and resonating objects.',['Mallet','Noise','Resonators']]
  ]},
  {name:'Audio Effects',role:'Audio → audio',source:'audiofx',items:[
    ['utility','Utility','Adjust gain, stereo width, and channel behavior.',['Gain','Width','Mono']],
    ['eq-eight','EQ Eight','Shape frequency balance with eight filter bands.',['Frequency','Gain','Q']],
    ['auto-filter','Auto Filter','Filter sound with moving cutoff and resonance.',['Frequency','Resonance']],
    ['compressor','Compressor','Reduce dynamic range above a threshold.',['Threshold','Ratio','Attack']],
    ['saturator','Saturator','Add nonlinear distortion and harmonics.',['Drive','Curve','Output']],
    ['delay','Delay','Repeat incoming sound.',['Time','Feedback','Dry/Wet']],
    ['echo','Echo','Delay with modulation and character controls.',['Echo','Modulation','Character']],
    ['reverb','Reverb','Add a simulated reverberant space.',['Decay Time','Size','Dry/Wet']],
    ['chorus','Chorus-Ensemble','Create moving, layered copies of the signal.',['Mode','Rate','Amount']]
  ]},
  {name:'MIDI Effects',role:'MIDI → MIDI',source:'midifx',items:[
    ['arpeggiator','Arpeggiator','Turn held notes into a repeating note pattern.',['Style','Rate','Gate']],
    ['chord','Chord','Add transposed notes to each incoming note.',['Shift']],
    ['pitch','Pitch','Transpose incoming notes.',['Pitch']],
    ['velocity','Velocity','Change the velocity values of incoming notes.',['Drive','Compand','Random']],
    ['note-length','Note Length','Change how long outgoing notes last.',['Length','Gate']]
  ]},
  {name:'Racks',role:'Chains · Layers · Macros',source:'racks',items:[
    ['instrument-rack','Instrument Rack','Combine instruments and effects, with key zones and Macro controls.',['Chains','Key','Macros']],
    ['drum-rack','Drum Rack','Place instruments and effects on note-addressed drum pads.',['Pads','Chains','Returns']],
    ['audio-rack','Audio Effect Rack','Arrange audio effects in parallel chains.',['Chains','Macros']],
    ['midi-rack','MIDI Effect Rack','Arrange MIDI effects in parallel chains.',['Chains','Macros']]
  ]}
];
families.forEach(f=>f.items.forEach(([id,title,body,controls])=>entry(id,'devices',title,body,f.source,{group:f.name,meta:f.role,controls})));

// Operations retain their IDs; their homes and navigation groups are assigned below.
const workGroups=[
  {name:'Recording',items:[
    ['record-midi','Record MIDI','Choose a MIDI input and an instrument, arm the track, then record into a clip or the Arrangement.','recording',['Input','Arm','Record']],
    ['record-audio','Record audio','Choose an audio input, set monitoring, arm the track, and record.','recording',['Input','Monitor','Arm']],
    ['capture','Capture MIDI','Recover recent MIDI playing from an armed or monitored track using Capture MIDI.','recording',['Capture MIDI']]
  ]},
  {name:'Editing',items:[
    ['split','Split','Divide selected Arrangement material at the selection boundaries or insert marker.','arrangement',['Selection','Split']],
    ['edit-notes','Edit notes','Move, resize, or draw MIDI notes in the Note Editor.','midi',['Pitch','Length','Velocity']],
    ['consolidate','Consolidate','Turn a selected span of Arrangement material into a new clip.','arrangement',['Time selection','Consolidate']]
  ]},
  {name:'Time',items:[
    ['loop','Loop','Set the repeating region of a clip or the Arrangement.','arrangement',['Start','End','Loop']],
    ['warp','Warp','Align events in an audio clip to musical time using Warp Markers.','warp',['Warp','Markers','Warp Mode']],
    ['quantize','Quantize notes','Move selected MIDI notes toward a chosen timing grid.','midi',['Grid','Amount']]
  ]},
  {name:'Mixing',items:[
    ['levels','Levels & pan','Balance tracks and position them across the stereo field.','mixing',['Volume','Pan']],
    ['sends','Sends & returns','Feed several tracks into a shared effect on a Return track.','mixing',['Send','Return']],
    ['automation','Automation','Record or draw changes to a parameter over time.','automation',['Envelope','Breakpoint']]
  ]},
  {name:'Performance',items:[
    ['launch','Launch clips','Trigger a Session clip. Launch quantization determines when it starts.','session',['Launch','Quantization']],
    ['scenes','Scenes','Launch a horizontal row of Session clips together.','session',['Scene']],
    ['mapping','MIDI mapping','Assign a hardware control to a mappable Live parameter.','mapping',['MIDI Map','Control']]
  ]},
  {name:'Files',items:[
    ['save-set','Save a Set','Save the Live document inside a project folder. This is not an audio export.','files',['Set','Project']],
    ['collect','Collect All and Save','Copy referenced media into the project. Plug-ins are not bundled.','files',['Referenced files']],
    ['export','Export audio','Render the selected material as an audio file.','managing-files-and-sets',['Rendered Track','Range','Format']]
  ]}
];
workGroups.forEach(g=>g.items.forEach(([id,title,body,source,controls])=>entry(id,null,title,body,source,{controls})));
entries.get('export').source='files';
entries.get('split').key=['⌘ E','Ctrl E'];
entries.get('consolidate').key=['⌘ J','Ctrl J'];
entries.get('save-set').key=['⌘ S','Ctrl S'];
entries.get('save-set').links=['collect','export'];
entries.get('export').key=['⌘ ⇧ R','Ctrl Shift R'];
Object.assign(entries.get('loop'),{title:'Clip loop',body:'Set the repeating region of a clip.',source:'concepts',links:['arrangement-loop']});
entry('arrangement-loop','workspace','Arrangement loop','Set the repeating region of the Arrangement.','arrangement',{controls:['Start','End','Loop'],links:['loop']});

// V. Actual Live history, without extending it into a universal production genealogy.
const milestones=[
  entry('monolake','history','A playable studio','Gerhard Behles and Robert Henke made music together as Monolake. Their sequencers, hardware, and Max patches made the studio playable; its limitations helped prompt Live.','history',{year:'1990s',meta:'Gerhard Behles · Robert Henke'}),
  entry('live-one','history','Live','An audio-focused instrument for working with loops in real time. Session View and warping were central to the early software.','push',{year:'2001',meta:'Clips · Session View · Warp'}),
  entry('live-four','history','Notes and instruments','Live 4 added MIDI sequencing and software-instrument support, including Simpler and Impulse. Keyboard playing became part of the same environment.','live4',{year:'2004',meta:'Live 4 · MIDI · Simpler · Impulse'}),
  entry('operator-design','history','Building Operator','Henke’s FM instruments and experiments informed Operator. The 2004 prototype aimed for varied sound, low CPU use, and approachable programming; Torsten Slama shaped its interface.','operator',{year:'2004',meta:'Operator prototype · Robert Henke · Torsten Slama'}),
  entry('push-design','history','From screen to pads','Push brought note playing, sequencing, and control of Live to a dedicated instrument. Jesse Terry’s account traces its development from early prototypes to standalone hardware.','push',{year:'Push',meta:'Jesse Terry · Hardware development'})
];
const people=[
  entry('behles','history','Gerhard Behles','Monolake collaborator and Ableton co-founder. His account of Live begins with the music he and Henke wanted to perform.','history',{meta:'Music · Software'}),
  entry('henke','history','Robert Henke','Musician and early Live developer. His instrument work includes Operator, developed alongside other members of the Ableton team.','team',{meta:'Music · Instrument design'}),
  entry('slama','history','Torsten Slama','Designer of Live’s original visual language and a key contributor to Operator’s interface.','operator',{meta:'Interface design'}),
  entry('terry','history','Jesse Terry','Musician and product lead involved in the development of Push.','push',{meta:'Hardware · Playing Live'})
];

const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Unaltered native 2× PNGs. Rectangles are measured against the 1225×769 UI preview,
// then converted to source pixels. Cropping happens only in the presentation layer.
function nativeCapture(file,title,caption,rect){
  return {file:`native/${file}.png`,title,caption,alt:`${title} in Ableton Live. ${caption}`,
    width:4112,height:2580,pixelRatio:2,
    ...(rect?{crop:rect.map((n,i)=>Math.round(n*(i%2?2580/769:4112/1225)))}:{})};
}
const captures={
  pilotInput:nativeCapture('record-unarmed','MIDI input','All Ins · All Channels · Monitor Auto',[261,302,73,89]),
  pilotArmOff:nativeCapture('record-unarmed','Track controls','The Arm button below Solo is grey.',[261,437,73,99]),
  pilotArmOn:nativeCapture('record-armed','Track controls','The track’s Arm button is red.',[261,437,73,99]),
  pilotSlotsOff:nativeCapture('record-unarmed','Empty slots','Squares in the first track’s empty Session slots.',[261,72,73,92]),
  pilotSlotsOn:nativeCapture('record-armed','Empty slots','Circles replace squares when the first track is armed.',[261,72,73,92]),
  session:nativeCapture('session-chain','Session View','A MIDI clip, four tracks, Returns, and Main.'),
  arrangement:nativeCapture('arrangement','Arrangement View','The same Set viewed along a timeline.'),
  browser:nativeCapture('search-drift','Search: Drift','Search field and native instrument result.',[5,40,250,155]),
  browserHidden:nativeCapture('browser-hidden','Browser hidden','Session View with the Browser closed.'),
  mixer:nativeCapture('session-chain','Mixer','Input routing · Monitoring · Sends · Pan · Volume · Arm',[261,341,293,247]),
  midiInput:nativeCapture('session-chain','MIDI track controls','MIDI input and channel, monitoring, instrument output, and record arm. The track is unarmed.',[261,341,73,247]),
  audioInput:nativeCapture('session-chain','Audio track controls','Audio input and channel, monitoring, output, and record arm. The track is unarmed.',[407,341,73,247]),
  main:nativeCapture('session-chain','Main output','Output routing, pan, cue level, and Main volume.',[1139,397,81,191]),
  returns:nativeCapture('session-chain','Return tracks','A Reverb · B Delay',[992,401,147,187]),
  sends:nativeCapture('session-chain','Sends','Send A and B on the first four tracks.',[261,443,293,50]),
  timing:nativeCapture('session-chain','Tempo & metronome','Tempo · Time signature · Metronome · Launch quantization',[42,14,259,21]),
  transport:nativeCapture('session-chain','Playback & recording','Position · Play · Stop · Arrangement Record · Capture MIDI',[435,14,230,21]),
  arrangementLoop:nativeCapture('arrangement','Arrangement loop controls','Loop start · Loop switch · Loop length',[696,14,170,21]),
  launch:nativeCapture('session-chain','Clip launch','The launch triangle at the left of a Session clip.',[261,40,145,123]),
  scenes:nativeCapture('session-chain','Scenes','Scene launch controls in the Main column.',[1139,40,81,125]),
  rename:nativeCapture('rename','Rename a track','Track name selected for editing.',[480,39,147,70]),
  mapping:nativeCapture('mapping','MIDI Map Mode','Mappable controls highlighted; no assignments made.'),
  chain:nativeCapture('session-chain','Drift → Utility','An instrument followed by an audio effect on one MIDI track.',[5,594,745,149]),
  drift:nativeCapture('session-chain','Drift','Oscillators · Mixer · Filter · Envelopes',[5,594,634,149]),
  utility:nativeCapture('session-chain','Utility','Width · Mono · Gain · Balance',[642,594,108,149]),
  audioClip:nativeCapture('audio-clip','Audio Clip View','An original four-pulse waveform, with clip and Warp controls.',[5,542,1215,201]),
  warp:nativeCapture('audio-clip','Warp controls','Warp enabled · Beats mode · Segment tempo',[139,544,128,198]),
  split:nativeCapture('split','Split','One bar divided into two clips.',[261,424,807,53]),
  consolidate:nativeCapture('consolidate','Consolidate','The same one-bar selection consolidated into one clip.',[261,407,807,70]),
  automation:nativeCapture('automation','Track volume automation','Three breakpoints on a volume envelope.',[261,407,807,70]),
  quantize:nativeCapture('quantize','Quantize notes','Grid · Note start/end · Amount. No transformation applied.',[139,544,129,198]),
  settings:{file:'native/settings.png',title:'Audio Settings',caption:'Input/output devices, sample rate, and latency. These are this computer’s settings, not recommended values.',alt:'Live Audio Settings showing audio device selectors, sample rate and buffer size.',width:1450,height:1576,pixelRatio:2,crop:[362,58,1088,822]},
  exportRange:{file:'native/export.png',title:'Export: range & rendering',caption:'Rendered track · Render start · Render length · Sample rate',alt:'The selection and rendering sections of Live’s Export Audio/Video dialog.',width:754,height:1586,pixelRatio:2,crop:[34,84,678,720]},
  exportFormat:{file:'native/export.png',title:'Export: file format',caption:'PCM · File type · Bit depth · Dither · MP3',alt:'The PCM and MP3 format sections of Live’s Export Audio/Video dialog.',width:754,height:1586,pixelRatio:2,crop:[34,806,678,406]},
  midiSample:{file:'live-midi-clip-sample.png',title:'MIDI Clip View',caption:'C3 · E3 · G3 · E3. One bar, quarter notes.',alt:'Ableton MIDI Clip View with four quarter notes, the playhead at the start, Fold off, and Highlight Scale off. Clip settings are at left and velocity below the notes.',width:4112,height:694,pixelRatio:2},
  clipLoop:{file:'live-midi-clip-sample.png',title:'Clip loop controls',caption:'Start · End · Loop · Position · Length',alt:'The clip properties panel with Loop enabled and a one-bar loop length.',width:4112,height:694,pixelRatio:2,crop:[18,62,448,458],contextLabel:'Full clip'}
};
// One native panel for every device currently in the atlas.
const deviceFrames={
  simpler:[5,594,556,149],sampler:[5,594,550,149],operator:[5,594,565,149],
  wavetable:[5,594,760,149],analog:[5,594,550,149],electric:[5,594,291,149],collision:[5,594,454,149],
  'eq-eight':[90,594,374,149],'auto-filter':[90,594,345,149],compressor:[90,594,365,149],
  saturator:[90,594,178,149],echo:[90,594,398,149],reverb:[90,594,398,149],chorus:[90,594,192,149],
  arpeggiator:[5,594,283,149],chord:[5,594,201,149],pitch:[5,594,98,149],velocity:[5,594,133,149],
  'note-length':[5,594,101,149],'instrument-rack':[5,594,445,149],'drum-rack':[5,594,440,149],
  'audio-rack':[90,594,437,149],'midi-rack':[5,594,409,149]
};
for(const [id,rect] of Object.entries(deviceFrames)){
  const e=entries.get(id);
  captures[id]=nativeCapture(id,e.title,e.controls.join(' · '),rect);
}
captures.delay={...nativeCapture('delay','Delay','Time · Filter · Feedback · Dry/Wet'),width:3884,height:2436,crop:[284,1886,984,462]};
if(typeof workspaceMedia!=='undefined')Object.assign(captures,workspaceMedia.captures);
const entryCaptures={
  'switch-views':['session','arrangement'],session:['session'],arrangement:['arrangement'],browser:['browser'],
  'hide-browser':['browserHidden'],transport:['timing','transport'],'device-view':['chain'],'clip-view':['midiSample'],
  duplicate:['midiSample'],rename:['rename'],settings:['settings'],mapping:['mapping'],
  set:['session'],tracks:['mixer'],'new-midi':['midiInput'],'new-audio':['audioInput'],
  mixer:['mixer'],'track-mixer':['mixer'],levels:['mixer'],sends:['sends','returns'],main:['main'],
  launch:['launch','timing'],scenes:['scenes'],split:['split'],consolidate:['split','consolidate'],
  automation:['automation'],'arrangement-loop':['arrangementLoop'],export:['exportRange','exportFormat'],
  clips:['midiSample','audioClip'],'midi-clip':['midiSample'],'audio-source':['audioClip'],
  'record-midi':['midiInput','transport'],'record-audio':['audioInput','transport'],capture:['transport'],
  'edit-notes':['midiSample'],quantize:['quantize'],loop:['clipLoop'],warp:['warp','audioClip'],
  chain:['chain'],'midi-effects':['arpeggiator'],instrument:['drift'],'audio-effects':['utility']
};
families.forEach(f=>f.items.forEach(([id])=>{entryCaptures[id]=[id];}));
// Explicit editorial exceptions, not missing assets. Historical entries retain their
// primary sources; a current Live 12 window would misrepresent the period or person.
const captureExceptions={
  undo:'Shortcut-only action; there is no persistent control state to illustrate.',
  'save-set':'File operation; a machine-specific file picker adds no useful reference.',
  collect:'File operation; keep the distinction from Save and Export in the text.',
  ...Object.fromEntries([...milestones,...people].map(e=>[e.id,'Historical entry: primary-source reference, not a present-day UI capture.']))
};
const examples={
  browser:{title:'Find an instrument',keys:[['⌘ F','Ctrl F'],'Drift'],text:'Search → instrument result.'},
  'edit-notes':{title:'Duplicate · Move · Resize',keys:[['⌘ D','Ctrl D'],'↑ ↓','⇧ ← →'],text:'A selected note: duplicate it, change its pitch, change its length.'},
  duplicate:{title:'One note → four notes',keys:[['⌘ D','Ctrl D'],'↑ ↓'],text:'The example was built by duplicating a quarter note and moving each copy.'}
};
function capturePicture(c,full=false,lazy=false){
  const src='assets/'+c.file;
  const [x,y,w,h]=captureBounds(c,full);
  return `<span class="capture-frame${c.matte==='light'?' matte-light':''}" style="--image-width:${captureDisplayWidth(c,full)}px;--preview-width:${Math.min(captureDisplayWidth(c,full),(c.previewHeight||360)*w/h)}px;aspect-ratio:${w}/${h}"><img class="capture-image" src="${src}" alt="${full?esc(c.contextLabel||'Full window')+' — ':''}${esc(c.alt)}" width="${c.width}" height="${c.height}" style="width:${c.width/w*100}%;left:${-x/w*100}%;top:${-y/h*100}%" ${lazy?'loading="lazy"':''}><span class="capture-error" role="status" hidden>Screenshot unavailable. Click to retry.</span></span>`;
}
function captureBounds(c,full=false){return c.crop&&!full?c.crop:[0,0,c.width,c.height];}
function captureDisplayWidth(c,full=false){return captureBounds(c,full)[2]/(c.pixelRatio||1);}
function captureFigure(id){
  const c=captures[id];if(!c)return '';
  if(c.error)return `<p class="manual-image-unavailable"><a href="${esc(c.source)}" target="_blank" rel="noreferrer">${esc(c.title)} · source image unavailable ↗</a></p>`;
  if(c.inline)return `<figure class="live-figure manual-icon" data-manual-icon="${id}"><span class="manual-icon-chip"><img src="assets/${esc(c.file)}" alt="" width="${c.width}" height="${c.height}" style="width:${captureDisplayWidth(c)*Math.max(1,18/(c.height/(c.pixelRatio||1)))}px"></span><figcaption>${esc(c.title)}</figcaption></figure>`;
  const picture=capturePicture(c,false,true);
  return `<figure class="live-figure${c.inline?' manual-icon':''}"><button class="capture-button" data-capture="${id}" aria-label="Enlarge ${esc(c.title)} illustration">${picture}</button><figcaption><span>${esc(c.title)}${c.credit?' · Ableton manual':' · Live 12'}</span><span aria-hidden="true">Enlarge ↗</span></figcaption></figure>`;
}
let activeCapture=null,fullCapture=false,actualCapture=false;
function fitCapture(){
  const c=captures[activeCapture];if(!c||!$('#captureDialog').open)return;
  const [, ,w,h]=captureBounds(c,fullCapture);
  const availableWidth=$('#captureScroll').clientWidth;
  const availableHeight=Math.max(80,innerHeight*.92-$('#captureToolbar').offsetHeight-$('#captureCaption').offsetHeight-64);
  const nativeWidth=captureDisplayWidth(c,fullCapture);
  const width=actualCapture?nativeWidth:Math.min(nativeWidth,availableWidth,availableHeight*w/h);
  $('#captureMedia').style.setProperty('--render-width',Math.max(1,width)+'px');
}
function renderCapture(){
  const c=captures[activeCapture];if(!c)return;
  $('#captureMedia').innerHTML=capturePicture(c,fullCapture);
  $('#captureRetry').hidden=true;
  $('#captureDialog').style.setProperty('--capture-width',Math.min(1440,Math.max(520,captureDisplayWidth(c,fullCapture)+34))+'px');
  $('#captureContext').hidden=!c.crop;
  $('#captureContext').textContent=fullCapture?'Detail':(c.contextLabel||'Full window');
  $('#captureContext').setAttribute('aria-pressed',fullCapture);
  actualCapture=false;
  $('#captureScale').setAttribute('aria-pressed','false');
  $('#captureScale').textContent='Actual size';
  $('#captureScroll').scrollTo(0,0);
  fitCapture();
}
function openCapture(id){
  const c=captures[id];if(!c)return;
  activeCapture=id;fullCapture=false;
  $('#captureTitle').textContent=c.title;
  $('#captureCaption').textContent=c.caption+' · '+(c.credit||'Captured in Ableton Live on macOS.');
  renderCapture();
  $('#captureDialog').showModal();
  fitCapture();
}
let currentView='overview', platform='mac';
const selection={workspace:'switch-views',clips:'clips',devices:'simpler',history:'live-one'};
// One home per entry. Desktop indices, mobile pickers, and flags use the same groups.
const topicGroups={
  workspace:[
    {name:'Navigation',ids:['switch-views','device-view','clip-view','hide-browser','transport']},
    {name:'Browser & setup',ids:['browser','settings','mapping']},
    {name:'Everyday keys',ids:['undo','duplicate','rename']},
    {name:'Session',ids:['session','launch','scenes']},
    {name:'Arrangement',ids:['arrangement','split','consolidate','arrangement-loop','automation']},
    {name:'Set & tracks',ids:['set','tracks','new-midi','new-audio']},
    {name:'Mixing & routing',ids:['mixer','track-mixer','levels','sends','main']},
    {name:'Files',ids:['save-set','collect','export']}
  ],
  clips:[
    {name:'Audio & MIDI',ids:['clips','midi-clip','audio-source']},
    {name:'Recording',ids:['record-midi','record-audio','capture']},
    {name:'Notes',ids:['edit-notes','quantize']},
    {name:'Time',ids:['loop','warp']}
  ],
  devices:[
    {name:'Signal flow',ids:['chain','midi-effects','instrument','audio-effects']},
    ...families.map(g=>({name:g.name,ids:g.items.map(i=>i[0])}))
  ],
  history:[{name:'Development',ids:milestones.map(e=>e.id)},{name:'People',ids:people.map(e=>e.id)}]
};
Object.entries(topicGroups).forEach(([view,groups])=>groups.forEach(g=>g.ids.forEach(id=>Object.assign(entries.get(id),{view,group:g.name}))));
function canonicalEntryId(id){return id;}
if(typeof manualAtlas!=='undefined')manualAtlas.install({entries,sources,families,topicGroups});
if(typeof workspaceAtlas!=='undefined')workspaceAtlas.install({entries,manual:manualAtlas,topicGroups,entryCaptures});
if(typeof shortcutExplorer!=='undefined')shortcutExplorer.install({entries,manual:manualAtlas});
if(typeof clipsAtlas!=='undefined')clipsAtlas.install({entries,manual:manualAtlas,topicGroups});
if(typeof devicesAtlas!=='undefined')devicesAtlas.install({entries,manual:manualAtlas,topicGroups,families,entryCaptures});
if(typeof manualCompletion!=='undefined'&&typeof workspaceAtlas!=='undefined'&&typeof clipsAtlas!=='undefined'&&typeof devicesAtlas!=='undefined')manualCompletion.attach({entries,manual:manualAtlas,workspace:workspaceAtlas,clips:clipsAtlas,devices:devicesAtlas});
if(typeof manualImages!=='undefined'&&typeof workspaceAtlas!=='undefined'&&typeof clipsAtlas!=='undefined'&&typeof devicesAtlas!=='undefined')manualImages.install({captures,entryCaptures,entries,manual:manualAtlas,workspace:workspaceAtlas,clips:clipsAtlas,devices:devicesAtlas,shortcuts:shortcutExplorer});
if(typeof deviceControlDetails!=='undefined'&&typeof devicesAtlas!=='undefined')deviceControlDetails.install({devices:devicesAtlas,manual:manualAtlas});
if(typeof historyAtlas!=='undefined')historyAtlas.install({entries,sources,topicGroups});
if(typeof historyImages!=='undefined')historyImages.install(captures);
if(typeof neighborhoodCards!=='undefined'&&typeof workspaceAtlas!=='undefined'&&typeof clipsAtlas!=='undefined'&&typeof devicesAtlas!=='undefined'&&typeof historyAtlas!=='undefined'){
  neighborhoodCards.install({entries,topicGroups,workspace:workspaceAtlas,clips:clipsAtlas,devices:devicesAtlas,history:historyAtlas,shortcuts:shortcutExplorer,manual:manualAtlas});
  for(const view of Object.keys(neighborhoodCards.groups))selection[view]=neighborhoodCards.groups[view][0].home;
}
if(typeof vocabulary!=="undefined")vocabulary.install({entries,manualData});
const flags=new Set();
const FLAG_STORE='ableton-live-atlas.flags.v1';
let storageOK=true;
try { const stored=JSON.parse(localStorage.getItem(FLAG_STORE)||'[]'); if(Array.isArray(stored))stored.forEach(value=>{const id=canonicalEntryId(value);if(entries.has(id))flags.add(id);}); } catch {storageOK=false;}
function saveFlags(){try{localStorage.setItem(FLAG_STORE,JSON.stringify([...flags]));}catch{storageOK=false;}}
// Trace: every working card opened during a session, once each. Listed in atlas order,
// not visit order. Nothing is recorded outside a session; ending one clears the trace, not flags.
const trace=new Set();
const TRACE_STORE='ableton-live-atlas.trace.v1',SESSION_STORE='ableton-live-atlas.session.v1';
let traceFilter='all',sessionActive=false;
try { sessionActive=localStorage.getItem(SESSION_STORE)==='active'; } catch {storageOK=false;}
function saveTrace(){try{localStorage.setItem(TRACE_STORE,JSON.stringify([...trace]));if(sessionActive)localStorage.setItem(SESSION_STORE,'active');else localStorage.removeItem(SESSION_STORE);}catch{storageOK=false;}}
function setSession(active){sessionActive=active;traceFilter='all';if(!active)trace.clear();saveTrace();updateFlags();renderFlags();$('#announcement').textContent=active?'Session started.':'Session ended. Trace cleared; flags kept.';}
try { const stored=JSON.parse(localStorage.getItem(TRACE_STORE)||'[]'); if(Array.isArray(stored))stored.forEach(id=>{if(entries.has(id))trace.add(id);}); } catch {storageOK=false;}
if(!sessionActive&&trace.size){trace.clear();saveTrace();}
function traceCard(view,id){
  if(!sessionActive||!id||neighborhoodCards.owned(id))return;
  const card=neighborhoodCards.adjacent(view,id)?.current.id||id;
  if(trace.has(card))return;
  trace.add(card);saveTrace();updateFlags();
}
const entryOrder=new Map([...entries.keys()].map((id,i)=>[id,i]));
function traceRow(id){
  const e=entries.get(id),route=neighborhoodCards.adjacent(e.view,id),card=route?.current;
  const sequence=neighborhoodCards.groups[e.view].flatMap(g=>g.choices);
  const own=!card||card.id===id;
  return {id,view:e.view,label:own?(card?.label||e.title):card.label+' · '+e.title,where:route?.group.name||e.group||'',
    order:[card?sequence.indexOf(card):sequence.length,own?0:1,entryOrder.get(id)]};
}
function keyFor(e){return e.key?.[platform==='mac'?0:1];}
function flagToggleHTML(id,label){const on=flags.has(id);return `<button class="fi-flag ${on?'on':''}" data-flag="${id}" data-flag-compact aria-pressed="${on}" aria-label="Flag ${esc(label)}" title="${on?'Flag planted':'Plant a flag'}">⚑</button>`;}
function flagHTML(id){const on=flags.has(id);return `<button class="flag-btn ${on?'on':''}" data-flag="${id}" aria-pressed="${on}"><span aria-hidden="true">⚑</span> ${on?'Flag planted':'Plant a flag'}</button>`;}
function renderOverview(){ $('#territoryGrid').innerHTML=territories.map(t=>`<button class="tc" style="--tc:${t.color}" data-view="${t.id}"><span class="tc-num">${t.num} / ${t.id}</span><div class="tc-name">${t.name}</div><div class="tc-tag">${t.tag}</div><span class="tc-enter" aria-hidden="true">↗</span></button>`).join(''); }
function renderIndex(target,groups){
  $(target).innerHTML=groups.map(g=>`${g.collapsed?'<details class="manual-index"><summary>'+esc(g.name)+'</summary>':'<section class="index-group"><h3>'+esc(g.name)+'</h3>'}${g.ids.map(id=>{const e=entries.get(id);return `<button class="topic-item" data-entry="${id}"><span>${esc(e.title)}</span>${e.key?`<kbd>${esc(keyFor(e))}</kbd>`:''}</button>`;}).join('')}${g.collapsed?'</details>':'</section>'}`).join('');
}
function renderIndices(){
  $('#workspaceIndex').innerHTML=neighborhoodCards.index('workspace',esc);
  $('#clipsIndex').innerHTML=neighborhoodCards.index('clips',esc);
}
function setMapHTML(){
  return `<div class="relationship-map"><div class="detail-label">Inside a Live Set</div><div class="set-map"><button class="node-button" data-entry="set">Live Set <small>.als</small></button><div class="set-tracks"><button class="node-button" data-entry="tracks">Tracks</button><div class="set-children"><button class="node-button" data-entry="clips">Clips <small>Audio / MIDI</small></button><button class="node-button" data-entry="chain">Devices <small>Device chains</small></button></div></div></div></div>`;
}
function signalMapHTML(){
  const paths=[{name:'MIDI track',ids:['midi-clip','midi-effects','instrument','audio-effects','track-mixer']},{name:'Audio track',ids:['audio-source','audio-effects','track-mixer']}];
  return '<div class="relationship-map"><div class="detail-label">Signal flow</div><div class="signal-map">'+paths.map(p=>`<section class="signal-lane"><h3>${p.name}</h3><ol>${p.ids.map(id=>`<li><button class="flow-button" data-entry="${id}" aria-label="${esc(entries.get(id).title)} on ${p.name.toLowerCase()}">${esc(id==='track-mixer'?'Mixer':entries.get(id).title)}</button></li>`).join('')}</ol></section>`).join('')+'<div class="flow-output"><button class="flow-button" data-entry="main">Main output</button></div></div></div>';
}
function renderDevices(){ $('#deviceGroups').innerHTML=neighborhoodCards.index('devices',esc); }
function renderHistory(){
  $('#historyIndex').innerHTML=neighborhoodCards.index('history',esc);
}
function initExplorers(){
  territories.forEach(t=>{
    const view=$('#view-'+t.id),split=view.querySelector('.split'),pane=split.firstElementChild;
    pane.classList.add('selector-pane');pane.setAttribute('role','region');pane.setAttribute('aria-label',t.name+' topics');pane.tabIndex=0;
    const inspector=$('#insp-'+t.id);inspector.tabIndex=0;
    pane.classList.add('neighborhood-selector-pane');
    split.insertAdjacentHTML('beforebegin',neighborhoodCards.picker(t.id,esc));
  });
}
function inspect(id){
  renderEntry(id);
  const entry=entries.get(id);if(entry)neighborhoodCards.decorate($('#insp-'+entry.view),entry,esc);
}
function renderEntry(id){
  const e=entries.get(id); if(!e)return;
  midiPilot.stop();
  clipsAtlas.stop();
  const host=$(`#insp-${e.view}`),workspace=workspaceAtlas.owned(id),keys=shortcutExplorer.owned(id),clips=clipsAtlas.owned(id),devices=devicesAtlas.owned(id);
  host.classList.toggle('workspace-inspector',workspace||keys||clips||devices||neighborhoodCards.owned(id));
  host.classList.toggle('clips-inspector',clips);
  host.classList.toggle('devices-inspector',devices);
  host.classList.toggle('history-inspector',historyAtlas.owned(id));
  if(neighborhoodCards.owned(id)){neighborhoodCards.mount(host,e,referenceContext());return;}
  if(historyAtlas.owned(id)){historyAtlas.mount(host,e,referenceContext());return;}
  if(keys){shortcutExplorer.mount(host,e,referenceContext());return;}
  if(workspace){workspaceAtlas.mount(host,e,referenceContext());return;}
  if(clips){clipsAtlas.mount(host,e,referenceContext());return;}
  if(devices){devicesAtlas.mount(host,e,referenceContext());return;}
  if(e.manualNode){manualAtlas.mount($(`#insp-${e.view}`),e,referenceContext());return;}
  if(id==='record-midi'){
    midiPilot.mount($('#insp-clips'),{esc,captureFigure,flagHTML,entries,platform:()=>platform});return;
  }
  const t=territories.find(t=>t.id===e.view);
  const reference=atlasReference.items[id];
  const platformPicker=reference&&e.view!=='workspace'?`<label class="platform-label">Keys <select data-reference-platform aria-label="Shortcut platform"><option value="mac" ${platform==='mac'?'selected':''}>Mac</option><option value="win" ${platform==='win'?'selected':''}>Windows</option></select></label>`:'';
  $(`#insp-${e.view}`).innerHTML=`<div class="reference-heading"><div><div class="insp-eyebrow">${esc(e.group||t.name)}</div><h3 class="insp-title">${esc(e.title)}</h3></div>${platformPicker}</div>${e.meta?`<div class="insp-meta">${esc(e.meta)}</div>`:''}<div class="insp-body"><p>${esc(e.body)}</p></div>${e.key?`<div class="detail-label">${esc(e.keyLabel||'Shortcut')} · ${platform==='mac'?'Mac':'Windows'}</div><kbd>${keyFor(e)}</kbd>`:''}${e.note?`<p class="context-note">${esc(e.note)}</p>`:''}${reference?atlasReference.render(id,{esc,platform}):''}<div style="margin-top:1.2rem">${flagHTML(id)}</div>${e.links?`<div class="detail-links">${e.links.map(id=>`<button data-entry="${id}">${esc(entries.get(id).title)} ↗</button>`).join('')}</div>`:''}<a class="detail-source" href="${reference?.source||sources[e.source]}" target="_blank" rel="noreferrer">${e.view==='history'?'Source':'Live manual'} ↗</a>`;
  const figure=(entryCaptures[id]||[]).map(captureFigure).join('');
  if(figure)$(`#insp-${e.view} .insp-body`).insertAdjacentHTML('afterend',figure);
  const diagram=id==='set'?setMapHTML():['tracks','chain'].includes(id)?signalMapHTML():'';
  if(diagram)$(`#insp-${e.view} .insp-body`).insertAdjacentHTML('afterend',diagram);
  const ex=examples[id];
  if(ex&&!reference)$(`#insp-${e.view} .detail-source`).insertAdjacentHTML('beforebegin',`<div class="live-example"><div class="detail-label">${esc(ex.title)}</div><div class="example-keys">${ex.keys.map(k=>`<kbd>${esc(Array.isArray(k)?k[platform==='mac'?0:1]:k)}</kbd>`).join('')}</div><p>${esc(ex.text)}</p></div>`);
  $(`#insp-${e.view} .detail-source`).insertAdjacentHTML('beforebegin',manualAtlas.related(id,referenceContext()));
  $(`#insp-${e.view}`).scrollTop=0;
}
function highlight(){
  document.querySelectorAll('[data-entry]').forEach(el=>{const e=entries.get(el.dataset.entry);const mapControl=el.matches('.topic-item,.node-button,.flow-button,.device-button,.tl-btn,.people-list button');const selected=el.matches('.workspace-place,.shortcut-home')?workspaceAtlas.mainId(selection.workspace):el.matches('.clip-place')?clipsAtlas.mainId(selection.clips):el.matches('.device-place')?devicesAtlas.mainId(selection.devices):selection[e?.view];const yes=mapControl&&e&&e.view===currentView&&selected===e.id;el.classList.toggle('selected',Boolean(yes));if(mapControl){el.setAttribute('aria-pressed',Boolean(yes));el.setAttribute('aria-controls','insp-'+e.view);}else el.removeAttribute('aria-pressed');});
  document.querySelectorAll('[data-timeline]').forEach(el=>el.classList.toggle('sel',selection.history===el.dataset.timeline));
}
function show(view,id){
  midiPilot.stop();
  clipsAtlas.stop();
  if(!['overview','flags',...territories.map(t=>t.id)].includes(view))view='overview';
  currentView=view;
  document.body.classList.toggle('exploring',territories.some(t=>t.id===view));
  if(id&&entries.get(id)?.view===view)selection[view]=id;
  if(territories.some(t=>t.id===view))traceCard(view,selection[view]);
  const color=territories.find(t=>t.id===view)?.color||'var(--brass)';
  document.documentElement.style.setProperty('--accent',color);
  document.querySelectorAll('.view').forEach(el=>{const active=el.id==='view-'+view;el.hidden=!active;el.classList.toggle('active',active);});
  document.querySelectorAll('.nav-btn').forEach(b=>{const active=b.dataset.view===view;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  if(view==='flags')renderFlags();else if(selection[view])inspect(selection[view]);
  if(view==='devices')devicesAtlas.revealSelection(selection.devices);
  if(view==='workspace')workspaceAtlas.revealSelection(selection.workspace);
  if(view==='history')historyAtlas.revealSelection(selection.history);
  neighborhoodCards.reveal(view,selection[view]);
  document.querySelectorAll('[data-reference-platform]').forEach(p=>p.value=platform);
  document.querySelectorAll('[data-topic-picker]').forEach(p=>{
    p.querySelector('[data-current-section]')?.remove();
    const selected=selection[p.dataset.topicPicker];
    const id=p.dataset.topicPicker==='workspace'?workspaceAtlas.mainId(selected):p.dataset.topicPicker==='clips'?clipsAtlas.mainId(selected):p.dataset.topicPicker==='devices'?devicesAtlas.mainId(selected):selected;
    if(id&&!Array.from(p.options).some(o=>o.value===id)){const option=document.createElement('option');option.value=id;option.textContent=entries.get(id).title;option.dataset.currentSection='';p.append(option);}
    p.value=id;
  });
  highlight();
  document.title=(view==='overview'?'Ableton Live, Mapped':view==='flags'?'Flags':territories.find(t=>t.id===view).name)+' — Ableton Atlas';
}
function navigate(view,id,position){
  cardNavigation.remember();
  const old=currentView;
  id=id||selection[view];
  const hash='#'+view+(id?'/'+id:'');
  if(location.hash!==hash)history.pushState(null,'',hash);
  show(view,id);
  const key=cardNavigation.arrive(currentView,selection[currentView]||null,history.state?.atlasCardKey,position);
  history.replaceState({...history.state,atlasCardKey:key},'',hash);
  if(old!==view)window.scrollTo({top:0,behavior:'instant'});
}
function selectEntry(id){
  const e=entries.get(id);if(!e)return;
  const fromDetail=document.activeElement?.closest('.inspector'),fromOtherView=currentView!==e.view;
  navigate(e.view,id);
  if(fromDetail||fromOtherView)($(`#insp-${e.view}`).querySelector('.workspace-action-title,.neighborhood-title')||$(`#insp-${e.view}`)).focus({preventScroll:true});
  $('#announcement').textContent=e.title+' selected.';
}
function updateFlags(){
  const toggle=$('#sessionToggle');toggle.dataset.session=sessionActive?'end':'start';toggle.classList.toggle('recording',sessionActive);
  toggle.innerHTML=sessionActive?'<i aria-hidden="true"></i>End session':'Start session';toggle.title=sessionActive?`${trace.size} card${trace.size===1?'':'s'} visited this session`:'Record the cards you visit';
  toggle.setAttribute('aria-label',sessionActive?`End session. ${trace.size} card${trace.size===1?'':'s'} visited; ending clears the trace and keeps flags.`:'Start session');
  $('#fcNum').textContent=flags.size;
  document.querySelectorAll('[data-flag]').forEach(b=>{const on=flags.has(b.dataset.flag);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);if('flagCompact' in b.dataset)b.title=on?'Flag planted':'Plant a flag';else b.innerHTML=`<span aria-hidden="true">⚑</span> ${on?'Flag planted':'Plant a flag'}`;});
  $('#storageNote').textContent=storageOK?'Saved in this browser.':'Browser storage is unavailable. Flags last for this visit only.';
}
function renderFlags(){
  const ids=[...new Set([...trace,...flags])].filter(id=>entries.has(id)&&territories.some(t=>t.id===entries.get(id).view));
  const shown=ids.filter(id=>traceFilter==='all'||flags.has(id)).map(traceRow);
  const session=sessionActive
    ?`<div class="trace-session is-active"><span><i aria-hidden="true"></i>Session in progress · ${trace.size} card${trace.size===1?'':'s'}</span><button data-session="end">End session</button></div>`
    :`<div class="trace-session"><button data-session="start">Start session</button></div>`;
  const filter=sessionActive&&ids.length?`<div class="segmented trace-filter" role="group" aria-label="Show">${[['all',`All visited · ${ids.length}`],['flagged',`Flagged · ${flags.size}`]].map(([value,label])=>`<button data-trace-filter="${value}" aria-pressed="${traceFilter===value}">${label}</button>`).join('')}</div>`:'';
  const empty=text=>`<div class="flags-empty"><div class="fe-mark" aria-hidden="true">⚑</div><p>${text}</p></div>`;
  $('#flagsBody').innerHTML=session+filter+(shown.length?territories.map(t=>{
    const items=shown.filter(r=>r.view===t.id).sort((a,b)=>a.order[0]-b.order[0]||a.order[1]-b.order[1]||a.order[2]-b.order[2]);
    return items.length?`<section class="flag-group"><h3 class="fg-head"><i style="background:${t.color}"></i>${t.name}</h3>${items.map(r=>`<div class="flag-item trace-item"><button class="fi-body" data-entry="${r.id}"><div class="fi-label">${esc(r.label)}</div><div class="fi-why">${esc(r.where)}</div></button>${flagToggleHTML(r.id,r.label)}</div>`).join('')}</section>`:'';
  }).join(''):empty(traceFilter==='flagged'||!sessionActive?'No flags planted.':'No cards visited yet this session.'));
  $('#storageNote').textContent=storageOK?'Saved in this browser.':'Browser storage is unavailable. The trace and flags last for this visit only.';
}
document.addEventListener('click',ev=>{
  const skip=ev.target.closest('a[href="#main"]');if(skip){ev.preventDefault();$('#main').focus();return;}
  if(vocabulary.click(ev))return;
  if(cardNavigation.click(ev))return;
  if(neighborhoodCards.click(ev))return;
  if(midiPilot.click(ev))return;
  if(workspaceAtlas.click(ev))return;
  if(devicesAtlas.click(ev))return;
  if(historyAtlas.click(ev))return;
  const capture=ev.target.closest('[data-capture]');if(capture){const failed=capture.querySelector('.is-error');if(failed)retryCapture(failed);else openCapture(capture.dataset.capture);return;}
  const sessionButton=ev.target.closest('[data-session]');if(sessionButton){setSession(sessionButton.dataset.session==='start');return;}
  const filter=ev.target.closest('[data-trace-filter]');if(filter){traceFilter=filter.dataset.traceFilter;renderFlags();return;}
  const flag=ev.target.closest('[data-flag]');
  if(flag){const id=flag.dataset.flag;if(flags.has(id))flags.delete(id);else flags.add(id);saveFlags();updateFlags();if(currentView==='flags')renderFlags();$('#announcement').textContent=`${entries.get(id).title}: ${flags.has(id)?'flag planted':'flag removed'}.`;return;}
  const view=ev.target.closest('[data-view]');if(view){navigate(view.dataset.view);return;}
  const target=ev.target.closest('[data-entry]');if(target)selectEntry(target.dataset.entry);
});
document.addEventListener('keydown',ev=>{
  if(ev.key==='Escape'&&!document.querySelector('dialog[open]')&&cardNavigation.closePreview(true)){ev.preventDefault();return;}
  midiPilot.keydown(ev);
});
function referenceContext(){return {esc,captureFigure,flagHTML,entries,platform:()=>platform,selectEntry};}
function changePlatform(value){
  platform=value;$('#platform').value=platform;renderIndices();
  document.querySelectorAll('[data-reference-platform]').forEach(p=>p.value=platform);
  const id=selection[currentView],host=$('#insp-'+currentView);
  if(neighborhoodCards.owned(id)){/* Landing cards contain no platform-specific keys. */}
  else if(clipsAtlas.owned(id))clipsAtlas.setPlatform();
  else if(devicesAtlas.owned(id))devicesAtlas.setPlatform();
  else if(id==='record-midi')midiPilot.setPlatform();
  else if(shortcutExplorer.owned(id))shortcutExplorer.setPlatform();
  else if(workspaceAtlas.owned(id))workspaceAtlas.setPlatform();
  else if(id&&host){
    const scroll=host.scrollTop;
    const opened=Array.from(host.querySelectorAll('.reference-section'),d=>d.open);
    const focusPlatform=document.activeElement?.matches('[data-reference-platform]');
    inspect(id);
    host.querySelectorAll('.reference-section').forEach((d,i)=>{d.open=Boolean(opened[i]);});
    host.scrollTop=scroll;
    if(focusPlatform)host.querySelector('[data-reference-platform]')?.focus({preventScroll:true});
  }
  highlight();
}
document.addEventListener('change',ev=>{
  if(ev.target.matches('[data-neighborhood-select]'))selectEntry(ev.target.value);
  if(ev.target.matches('[data-device-neighborhood-select]'))devicesAtlas.chooseNeighborhood(ev.target.value);
  if(ev.target.matches('[data-workspace-neighborhood-select]'))workspaceAtlas.selectNeighborhood(ev.target.value);
  if(ev.target.matches('[data-history-period-select]'))historyAtlas.selectPeriod(ev.target.value);
  if(ev.target.matches('[data-topic-picker]'))selectEntry(ev.target.value);
  if(ev.target.matches('[data-pilot-platform],[data-reference-platform]'))changePlatform(ev.target.value);
});
$('#platform').addEventListener('change',ev=>changePlatform(ev.target.value));
document.addEventListener('visibilitychange',()=>{if(document.hidden){midiPilot.stop();clipsAtlas.stop();}});
$('#captureClose').addEventListener('click',()=>$('#captureDialog').close());
$('#captureRetry').addEventListener('click',()=>retryCapture($('#captureMedia .capture-frame')));
$('#captureContext').addEventListener('click',()=>{fullCapture=!fullCapture;renderCapture();});
$('#captureDialog').addEventListener('click',ev=>{if(ev.target===$('#captureDialog')){const r=ev.target.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)ev.target.close();}});
$('#captureScale').addEventListener('click',()=>{actualCapture=!actualCapture;$('#captureScale').setAttribute('aria-pressed',actualCapture);$('#captureScale').textContent=actualCapture?'Fit to view':'Actual size';fitCapture();});
window.addEventListener('resize',fitCapture);
function retryCapture(frame){
  frame.classList.remove('is-error');frame.querySelector('.capture-error').hidden=true;
  const img=frame.querySelector('img');const url=new URL(img.src);url.searchParams.set('retry',Date.now());img.src=url.href;
}
document.addEventListener('error',ev=>{
  if(!ev.target.matches?.('.capture-image'))return;
  const frame=ev.target.closest('.capture-frame');frame.classList.add('is-error');frame.querySelector('.capture-error').hidden=false;
  const button=frame.closest('[data-capture]');if(button)button.setAttribute('aria-label','Retry '+captures[button.dataset.capture].title+' image');
  if(frame.closest('#captureMedia'))$('#captureRetry').hidden=false;
},true);
document.addEventListener('load',ev=>{
  if(!ev.target.matches?.('.capture-image'))return;
  const frame=ev.target.closest('.capture-frame');frame.classList.remove('is-error');frame.querySelector('.capture-error').hidden=true;
  const button=frame.closest('[data-capture]');if(button)button.setAttribute('aria-label','Enlarge '+captures[button.dataset.capture].title+' image');
  if(frame.closest('#captureMedia'))$('#captureRetry').hidden=true;
},true);
// An entry's content model determines its territory.
function resolveRoute(view,id){
  if(view==='main')return {view:currentView};
  id=canonicalEntryId(id);
  if(entries.has(id))return {view:entries.get(id).view,id};
  return {view:view||'overview',id};
}
function readLocation(event){
  const [v,id]=location.hash.slice(1).split('/'),route=resolveRoute(v,id);
  const cardId=route.id||selection[route.view]||null;
  if(cardNavigation.isAt(route.view,cardId,history.state?.atlasCardKey))return;
  cardNavigation.remember();show(route.view,route.id);
  const key=cardNavigation.arrive(currentView,selection[currentView]||null,history.state?.atlasCardKey,null,event?.type==='popstate');
  history.replaceState({...history.state,atlasCardKey:key},'','#'+currentView+(selection[currentView]?'/'+selection[currentView]:''));
}
window.addEventListener('popstate',readLocation);
window.addEventListener('hashchange',readLocation);
renderOverview();renderIndices();renderDevices();renderHistory();initExplorers();
neighborhoodCards.bind({selectEntry});
cardNavigation.bind({entries,refreshFlags:updateFlags,cardTitle:id=>{
  const entry=entries.get(id);
  return entry.view==='devices'?devicesAtlas.label(id):entry.title;
},announce:text=>$('#announcement').textContent=text});
updateFlags();readLocation();
vocabulary.bind({esc,platform:()=>platform,current:host=>{const view=host.id.replace('insp-',''),id=selection[view];return [id,neighborhoodCards.adjacent(view,id)?.current.id].filter(Boolean);}});
manualAtlas.bind(referenceContext());
