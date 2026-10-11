// Vocabulary: core Live terms are underlined where they first appear on a card.
// Tapping one shows a one-line meaning, its shortcut from the manual's table, and its card.
const vocabulary=(()=>{
  // match: regex source (case-insensitive unless exact:true). keys: manual shortcut action names.
  const terms=[
    {term:'Session View',match:'Session View',home:'session',keys:['Toggle Session/Arrangement View'],def:'The grid for launching clips in any order: tracks are columns, scenes are rows.'},
    {term:'Arrangement View',match:'Arrangement View',home:'arrangement',keys:['Toggle Session/Arrangement View'],def:'The timeline, where clips play in order from left to right.'},
    {term:'Clip View',match:'Clip View',home:'clip-view',keys:['Toggle Between Device/Clip View'],def:'The editor for the selected clip’s notes or audio.'},
    {term:'Device View',match:'Device View',home:'device-view',keys:['Toggle Between Device/Clip View'],def:'The panel showing the selected track’s devices.'},
    {term:'Browser',match:'Browser',home:'browser',keys:['Hide/Show Browser'],def:'The panel for finding sounds, devices, samples and presets.'},
    {term:'Set',match:'Live Sets?|Sets?',exact:true,home:'set',def:'A Live project file (.als): tracks, clips, devices and settings.'},
    {term:'Clip',match:'clips?',home:'clips',def:'A piece of audio or MIDI in a Session slot or on the timeline.'},
    {term:'Scene',match:'scenes?',home:'scenes',keys:['Insert Scene'],def:'A Session row. Launching it starts every clip in that row together.'},
    {term:'Track',match:'tracks?',home:'tracks',def:'A lane that holds clips and devices and feeds the mixer.'},
    {term:'MIDI',match:'MIDI',exact:true,home:'midi-clip',def:'Note data: which key, when and how hard. It makes no sound on its own.'},
    {term:'Sample',match:'samples?(?! rate| editor)',home:'audio-source',def:'A recorded audio file.'},
    {term:'Tempo',match:'tempo|BPM',home:'ref-first-steps--tempo--midi',def:'The Set’s speed, in beats per minute (BPM).'},
    {term:'Warp',match:'warp(?:s|ed|ing)?',home:'warp',def:'Stretching audio so it stays in time with the Set’s tempo.'},
    {term:'Warp Marker',match:'warp markers?',home:'ref-audio-clips-tempo-and-warping--warping',keys:['Insert Warp Marker'],def:'A pin that locks a point in the audio to a beat.'},
    {term:'Transient',match:'transients?',home:'ref-audio-clips-tempo-and-warping--transients-and-pseudo-warp-markers',def:'The sharp start of a sound, like a drum hit.'},
    {term:'Quantize',match:'quantiz(?:e|es|ed|ing|ation)',home:'quantize',keys:['Quantize'],def:'Snapping notes or audio to the nearest grid line.'},
    {term:'Launch Quantization',match:'launch quantization|global quantization',home:'launch',keys:['1-Bar Quantization'],def:'How long Live waits before a launched clip starts, such as one bar.'},
    {term:'Launch Mode',match:'launch modes?',home:'ref-launching-clips--launch-modes',def:'How a clip reacts to its button: Trigger, Gate, Toggle or Repeat.'},
    {term:'Follow Action',match:'follow actions?',home:'ref-launching-clips--follow-actions',keys:['Toggle Follow Actions for Selected Clips'],def:'A rule for what happens when a clip finishes, like playing the next one.'},
    {term:'Arm',match:'arm(?:s|ed|ing)?',home:'ref-recording-new-clips--arming-record-enabling-tracks',keys:['Arm Selected Tracks'],def:'Readying a track to record.'},
    {term:'Monitoring',match:'monitoring',home:'ref-routing-and-i-o--monitoring',def:'Whether you hear a track’s input live: In, Auto or Off.'},
    {term:'Overdub',match:'overdub(?:s|bed|bing)?',home:'record-midi',def:'Recording on top of what a MIDI clip already holds.'},
    {term:'Capture MIDI',match:'capture midi',home:'capture',def:'Recovers what you just played, even if you weren’t recording.'},
    {term:'Metronome',match:'metronome',home:'ref-recording-new-clips--metronome-settings',def:'The click that marks each beat while you play or record.'},
    {term:'Velocity',match:'velocit(?:y|ies)',home:'velocity',def:'How hard a note is played, from 1 to 127.'},
    {term:'Groove',match:'grooves?|groove pool',home:'ref-using-grooves--groove-pool',def:'A timing and feel template, like swing, applied to clips.'},
    {term:'Automation',match:'automation',home:'automation',keys:['Toggle Automation Mode'],def:'Recorded or drawn changes to a control over time.'},
    {term:'Breakpoint',match:'breakpoints?',home:'automation',def:'A point on an automation line. The line runs between points.'},
    {term:'Clip Envelope',match:'clip envelopes?',home:'ref-clip-envelopes--clip-envelopes',def:'Control changes drawn inside one clip. They move with the clip.'},
    {term:'Device',match:'devices?',home:'chain',def:'An instrument or effect on a track.'},
    {term:'Device Chain',match:'device chains?',home:'chain',def:'The row of devices on a track. Sound flows left to right.'},
    {term:'Instrument',match:'instruments?',home:'instrument',def:'A device that turns MIDI notes into sound.'},
    {term:'MIDI Effect',match:'MIDI effects?',home:'midi-effects',def:'A device that changes notes before they reach the instrument.'},
    {term:'Audio Effect',match:'audio effects?',home:'audio-effects',def:'A device that changes the sound passing through it.'},
    {term:'Plug-in',match:'plug-ins?|VST[23]?',home:'ref-first-steps--plug-ins',def:'An instrument or effect from another maker, in VST or AU format.'},
    {term:'Preset',match:'presets?',home:'ref-working-with-instruments-and-effects--live-device-presets',def:'A saved set of settings for a device.'},
    {term:'Rack',match:'racks?',home:'ref-instrument-drum-and-effect-racks--instrument-drum-and-effect-racks',keys:['Group Devices'],def:'A device that holds other devices in chains, with Macro knobs on top.'},
    {term:'Drum Rack',match:'drum racks?',home:'drum-rack',def:'A Rack with a pad for each drum sound.'},
    {term:'Macro',match:'macros?(?: controls?| knobs?)?',home:'ref-instrument-drum-and-effect-racks--macro-controls',def:'A Rack knob that can turn many controls at once.'},
    {term:'Sidechain',match:'side-?chain(?:s|ed|ing)?',home:'ref-live-audio-effect-reference--sidechaining-in-dance-music',def:'Letting one sound control an effect on another, like a kick ducking a bass.'},
    {term:'Mixer',match:'mixer',home:'mixer',keys:['Hide/Show Mixer'],def:'Volume, pan, sends and routing for every track.'},
    {term:'Pan',match:'pan(?:s|ned|ning)?',home:'levels',def:'Where a track sits between left and right.'},
    {term:'Send',match:'sends?',home:'sends',keys:['Hide/Show Sends'],def:'A knob that feeds some of a track’s sound to a return track.'},
    {term:'Return Track',match:'return tracks?',home:'sends',keys:['Insert Return Track'],def:'A track fed by sends, usually holding a shared reverb or delay.'},
    {term:'Group Track',match:'group tracks?',home:'ref-mixing--group-tracks',keys:['Group Selected Tracks'],def:'A track that holds other tracks so they mix as one.'},
    {term:'Main track',match:'Main (?:track|output|mixer)',home:'main',def:'The last stop: every track flows here on the way to your speakers.'},
    {term:'Routing',match:'routing',home:'ref-live-concepts--routing',def:'Where a track’s sound comes from and where it goes.'},
    {term:'Freeze',match:'freez(?:e|es|ing)|frozen',home:'ref-computer-audio-resources-and-strategies--track-freeze',keys:['Freeze/Unfreeze Tracks'],def:'Rendering a track to audio for now, to save CPU. Unfreeze to edit.'},
    {term:'Bounce',match:'bounc(?:e|es|ed|ing)',home:'ref-bounce-to-audio--bounce-to-audio',keys:['Bounce to New Track'],def:'Rendering clips or tracks into new audio.'},
    {term:'Consolidate',match:'consolidat(?:e|es|ed|ing)',home:'consolidate',keys:['Consolidate Selection into Clip'],def:'Joining the selected clips and time into one new clip.'},
    {term:'Resampling',match:'resampl(?:e|ed|ing)',home:'ref-routing-and-i-o--resampling',def:'Recording Live’s own output onto an audio track.'},
    {term:'Loop Brace',match:'loop brace',home:'arrangement-loop',keys:['Toggle Loop Brace'],def:'The bar above the timeline that marks what Live repeats.'},
    {term:'Take Lane',match:'take lanes?',home:'ref-comping--take-lanes',def:'A lane under a track holding one recorded pass.'},
    {term:'Comping',match:'comping',home:'ref-comping--comping',def:'Building one best take from pieces of several.'}
  ];
  let model,ctx,pattern,peek=null,peekButton=null;
  const byIndex=[];
  function shortcut(action){return model.manualData.shortcuts.find(k=>k.action===action);}
  function install(m){
    model=m;
    const ordered=[...terms].sort((a,b)=>b.term.length-a.term.length);
    ordered.forEach(t=>{t.rows=(t.keys||[]).map(shortcut);byIndex.push(t);});
    pattern=new RegExp(ordered.map(t=>`\\b(${t.match})\\b`).join('|'),'gi');
  }
  const skip='button,a,kbd,code,h1,h2,h3,h4,h5,h6,dt,label,select,option,summary,figcaption,nav,.term,.insp-meta,.insp-eyebrow,.card-navigation';
  function decorate(root,currentIds){
    const used=new Set([...root.querySelectorAll('.term')].map(el=>el.dataset.term));
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.nodeValue.trim()&&!n.parentElement.closest(skip)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT});
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    for(const node of nodes){
      const text=node.nodeValue;let last=0,frag=null;
      pattern.lastIndex=0;let m;
      while((m=pattern.exec(text))){
        const t=byIndex[m.slice(1).findIndex(Boolean)];
        if(!t||used.has(t.term)||currentIds.includes(t.home))continue;
        if(t.exact&&!new RegExp(`^(?:${t.match})$`).test(m[0]))continue;
        used.add(t.term);frag??=document.createDocumentFragment();
        frag.append(text.slice(last,m.index));
        const b=document.createElement('button');b.type='button';b.className='term';b.dataset.term=t.term;b.textContent=m[0];b.setAttribute('aria-haspopup','dialog');
        frag.append(b);last=m.index+m[0].length;
      }
      if(frag){frag.append(text.slice(last));node.replaceWith(frag);}
    }
  }
  function keyText(row){
    const value=(ctx.platform()==='mac'?row.mac:row.win).split(' or ')[0];
    return ctx.platform()==='mac'?value.replace(/\bCmd\b/g,'⌘').replace(/\bOption\b/g,'⌥').replace(/\bShift\b/g,'⇧').replace(/\bCtrl\b/g,'⌃'):value;
  }
  function close(focus=false){
    if(!peek)return false;
    peek.remove();peek=null;peekButton?.setAttribute('aria-expanded','false');
    if(focus)peekButton?.focus({preventScroll:true});
    peekButton=null;return true;
  }
  function open(button){
    const t=terms.find(x=>x.term===button.dataset.term);if(!t)return;
    const e=ctx.esc,home=model.entries.get(t.home);
    peek=document.createElement('div');peek.className='term-peek';peek.setAttribute('role','dialog');peek.setAttribute('aria-label',t.term);
    peek.innerHTML=`<b>${e(t.term)}</b><p>${e(t.def)}</p>${t.rows.map(r=>`<div class="term-key"><kbd>${e(keyText(r))}</kbd><span>${e(r.action)}</span></div>`).join('')}<button data-entry="${e(t.home)}">${e(home.title)} ↗</button>`;
    document.body.append(peek);peekButton=button;button.setAttribute('aria-expanded','true');
    const r=button.getBoundingClientRect(),w=peek.offsetWidth,h=peek.offsetHeight;
    const left=Math.max(16,Math.min(r.left,innerWidth-w-16));
    const top=r.bottom+8+h>innerHeight-8?Math.max(8,r.top-8-h):r.bottom+8;
    peek.style.left=left+'px';peek.style.top=top+'px';
    peek.querySelector('[data-entry]').focus({preventScroll:true});
  }
  function click(ev){
    const button=ev.target.closest('.term');
    if(button){const same=button===peekButton;close();if(!same)open(button);return true;}
    if(peek&&!ev.target.closest('.term-peek'))close();
    if(ev.target.closest('.term-peek [data-entry]'))setTimeout(()=>close());
    return false;
  }
  function bind(context){
    ctx=context;
    document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&close(true))ev.stopPropagation();},true);
    addEventListener('resize',()=>close());
    document.addEventListener('scroll',()=>close(),true);
    // Runs after each render's mutations; its own replacements settle on the next pass.
    document.querySelectorAll('.inspector').forEach(host=>{
      const run=()=>decorate(host,ctx.current(host));
      new MutationObserver(run).observe(host,{childList:true,subtree:true});
      run();
    });
  }
  return {terms,install,bind,decorate,click,close};
})();
