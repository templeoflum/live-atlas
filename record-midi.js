// One editorial pilot, not a second atlas or a new course/progress system.
const midiPilot = (() => {
  const manual = 'https://www.ableton.com/en/manual/';
  const steps = [
    {id:'instrument',label:'Instrument',title:'Put a sound on a MIDI track',
      action:'Select a MIDI track. Search for Drift, select the instrument result, then press Enter to load it.',
      result:'Drift appears in Device View.',images:['browser'],
      keys:[{label:'New MIDI track',mac:'⌘ ⇧ T',win:'Ctrl Shift T'},{label:'Search',mac:'⌘ F',win:'Ctrl F'},{label:'Select result',mac:'↓',win:'↓'},{label:'Load',mac:'Enter',win:'Enter'}],
      detail:{title:'Notes and sound',text:'A MIDI clip holds note events. The instrument turns those events into sound. Replacing the instrument changes the sound, not the notes.',image:'drift',source:manual+'live-concepts/#midi-clips-and-midi-files'},
      help:{title:'Device View is hidden',text:'Select the track, then use Shift + Tab to switch between Clip View and Device View. This shortcut applies when “Use Tab to Move Focus” is off.',source:manual+'live-keyboard-shortcuts/#showing-and-hiding-views'},
      source:manual+'working-with-instruments-and-effects/#using-devices',sourceLabel:'Instruments & effects'},
    {id:'input',label:'Input',title:'Choose where notes come from',
      action:'Under MIDI From, choose your keyboard—or All Ins. Leave Monitor on Auto for this route.',
      result:'The track receives notes from that MIDI source.',images:['pilotInput'],
      keys:[{label:'Show / hide In/Out',mac:'⌘ ⌥ I',win:'Ctrl Alt I'}],
      detail:{title:'In · Auto · Off',rows:[['In','Hear incoming notes continuously; clip playback is suppressed.'],['Auto','Hear incoming notes when armed, except while a clip plays.'],['Off','Do not monitor incoming notes through the track.']],source:manual+'routing-and-i-o/#monitoring'},
      help:{title:'No keyboard connected',text:'Press M outside a text field to enable the Computer MIDI Keyboard. The A–L row plays notes; Z and X move the octave range down and up.',source:manual+'live-keyboard-shortcuts/#keymidi-map-mode-and-the-computer-midi-keyboard'},
      source:manual+'recording-new-clips/#choosing-an-input',sourceLabel:'Choosing an input'},
    {id:'arm',label:'Arm',title:'Enable the track for recording',
      action:'If Arm is grey, click it at the bottom of the MIDI track. If it is already red, the track is armed.',
      result:'Arm turns red. Empty clip slots show circles. Recording has not started.',
      states:{before:['pilotArmOff','pilotSlotsOff'],after:['pilotArmOn','pilotSlotsOn']},
      video:{file:'assets/arm-toggle.mp4',seconds:2,loop:true,label:'Watch Arm',description:'Click: armed. Click again: off. Playback stays stopped.'},
      detail:{title:'Arm is not Record',text:'Arm chooses a recording track; Clip Record starts a take. Hold Cmd (Mac) or Ctrl (Windows) while arming to keep other tracks armed.',source:manual+'recording-new-clips/#arming-record-enabling-tracks'},
      help:{title:'No sound when you play',text:'Check MIDI From, Monitor Auto, a loaded instrument, and the track’s output. If MIDI arrives but the audio meter stays still, check the instrument. If audio meters move, check the output device and speakers.',source:manual+'routing-and-i-o/#monitoring'},
      source:manual+'recording-new-clips/#arming-record-enabling-tracks',sourceLabel:'Arming tracks'},
    {id:'record',label:'Record',title:'Record into an empty slot',
      action:'In Session View, click the circle in an empty slot on the armed track. Play a phrase.',
      result:'A new clip appears with a red launch indicator while recording.',images:['pilotSlotsOn'],
      keys:[{label:'Session / Arrangement',mac:'Tab',win:'Tab'}],
      keyNote:'With “Use Tab to Move Focus” off.',
      detail:{title:'When recording begins',text:'Launch timing follows Global Quantization and any count-in. Use the slot’s circle—not Arrangement Record.',source:manual+'recording-new-clips/#recording-into-session-slots'},
      help:{title:'Only squares in the empty slots',text:'The track is not armed. Return to Arm.',entry:'arm',source:manual+'recording-new-clips/#recording-into-session-slots'},
      source:manual+'recording-new-clips/#recording-into-session-slots',sourceLabel:'Recording into Session slots'},
    {id:'listen',label:'Listen',title:'Finish the take and listen',
      action:'Click the recording clip’s launch button to finish recording and loop it. Press Space to stop playback.',
      result:'Double-click the clip to open its notes.',images:['midiSample'],
      imageNote:'Example clip · C3, E3, G3, E3. Your recorded notes will differ.',
      keys:[{label:'Stop playback',mac:'Space',win:'Space'},{label:'Clip / Device View',mac:'⇧ Tab',win:'Shift Tab'}],
      detail:{title:'The clip and its instrument',text:'The recorded notes remain editable independently of the sound. Open the clip to work on notes; select the track’s Device View to work on its instrument.',source:manual+'live-concepts/#clip-and-device-view'},
      help:{title:'I want to change the notes',text:'Open the MIDI Clip View reference.',link:'edit-notes',source:manual+'editing-midi/'},
      source:manual+'recording-new-clips/#recording-into-session-slots',sourceLabel:'Recording into Session slots'}
  ];
  let selected='instrument',state='after',ctx,host;
  const stepById=id=>steps.find(s=>s.id===id);
  const videoLength=video=>`${video.seconds} sec${video.loop?' loop':''}`;
  const link=(href,label)=>`<a href="${href}" target="_blank" rel="noreferrer">${ctx.esc(label)} ↗</a>`;
  function disclosure(item){
    return `<section class="pilot-detail"><h4>${ctx.esc(item.title)}</h4>${item.rows?`<dl>${item.rows.map(([term,text])=>`<div><dt>${ctx.esc(term)}</dt><dd>${ctx.esc(text)}</dd></div>`).join('')}</dl>`:`<p>${ctx.esc(item.text)}</p>`}${item.image?ctx.captureFigure(item.image):''}${item.entry?`<button class="pilot-text-button" data-pilot-step="${item.entry}">Arm ↗</button>`:''}${item.link?`<button class="pilot-text-button" data-entry="${item.link}">${ctx.esc(ctx.entries.get(item.link).title)} ↗</button>`:''}${link(item.source,'Manual')}</section>`;
  }
  function stop(){host?.querySelectorAll('video').forEach(v=>v.pause());}
  function panel(){
    const s=stepById(selected),e=ctx.esc;
    return `<div class="pilot-action"><h4>${e(s.title)}</h4><p>${e(s.action)}</p></div>
      ${s.keys?`<div class="pilot-keys" aria-label="Shortcuts in Live">${s.keys.map(k=>`<span><kbd>${e(k[ctx.platform()])}</kbd><small>${e(k.label)}</small></span>`).join('')}</div>`:''}
      ${s.keyNote?`<p class="pilot-caption">${e(s.keyNote)}</p>`:''}
      ${s.states?`<div class="pilot-compare" role="group" aria-label="Arm screenshot state"><button data-pilot-state="before" aria-pressed="${state==='before'}">Before</button><button data-pilot-state="after" aria-pressed="${state==='after'}">Armed</button></div>`:''}
      <div class="pilot-media ${s.states?'pilot-pair':''}">${(s.states?s.states[state]:s.images).map(ctx.captureFigure).join('')}</div>
      ${s.imageNote?`<p class="pilot-caption">${e(s.imageNote)}</p>`:''}
      <p class="pilot-result"><span aria-hidden="true">↳</span> ${e(s.result)}</p>
      ${s.video?`<section class="pilot-watch"><h4>${e(s.video.label)} <span>· ${videoLength(s.video)} · silent</span></h4><div class="pilot-video-frame"><video ${s.video.loop?'loop':''} muted playsinline preload="metadata" width="468" height="320" aria-label="${e(s.video.label)} demonstration" aria-describedby="pilot-video-description"><source src="${s.video.file}" type="video/mp4"></video></div><button class="pilot-video-run" data-pilot-video aria-label="Play Arm demonstration">Play · ${videoLength(s.video)}</button><p id="pilot-video-description">${e(s.video.description)}</p><p class="pilot-video-error" role="status" hidden>Video unavailable. The Before and Armed screenshots show the same change.</p></section>`:''}
      <div class="pilot-depth">${disclosure(s.detail)}${disclosure(s.help)}</div>
      <div class="pilot-source">${link(s.source,s.sourceLabel)}</div>`;
  }
  function update(){
    stop();
    host.querySelectorAll('[role="tab"]').forEach(b=>{const active=b.dataset.pilotStep===selected;b.setAttribute('aria-selected',active);b.tabIndex=active?0:-1;});
    const content=host.querySelector('#pilot-panel');
    content.setAttribute('aria-labelledby','pilot-tab-'+selected);
    content.innerHTML=panel();
    const watch=host.querySelector('.pilot-watch');
    watch?.addEventListener('toggle',()=>{if(!watch.open)stop();});
    const video=host.querySelector('video');
    const clip=stepById(selected).video;
    const error=host.querySelector('.pilot-video-error'),run=host.querySelector('[data-pilot-video]');
    const showError=()=>{error.hidden=false;};
    video?.addEventListener('error',showError);
    video?.querySelector('source').addEventListener('error',showError);
    for(const event of ['play','pause','ended'])video?.addEventListener(event,()=>{
      const label=video.ended?'Replay':video.paused?'Play':'Pause';
      run.textContent=label+(video.paused?' · '+videoLength(clip):'');run.setAttribute('aria-label',label+' Arm demonstration');
    });
  }
  function select(id,focus=true){
    if(!stepById(id))return;
    selected=id;state='after';update();
    if(focus)host.querySelector('#pilot-tab-'+id).focus({preventScroll:true});
    host.scrollTop=0;
  }
  function mount(container,context){
    stop();host=container;ctx=context;
    host.innerHTML=`<div class="pilot-heading"><div><div class="insp-eyebrow">Session clip</div><h3 class="insp-title">Record MIDI</h3></div><label class="platform-label">Keys <select data-pilot-platform aria-label="Pilot shortcut platform"><option value="mac">Mac</option><option value="win">Windows</option></select></label></div>
      <div class="pilot-tabs" role="tablist" aria-label="Record MIDI actions">${steps.map((s,i)=>`<button id="pilot-tab-${s.id}" role="tab" aria-controls="pilot-panel" data-pilot-step="${s.id}"><span aria-hidden="true">${i+1}</span>${ctx.esc(s.label)}</button>`).join('')}</div>
      <section id="pilot-panel" role="tabpanel" tabindex="0"></section><div class="pilot-footer">${ctx.flagHTML('record-midi')}</div>`;
    host.querySelector('[data-pilot-platform]').value=ctx.platform();
    update();host.scrollTop=0;
  }
  function click(event){
    if(!event.target.closest('#insp-clips .pilot-tabs,#pilot-panel'))return false;
    const step=event.target.closest('[data-pilot-step]');
    if(step){select(step.dataset.pilotStep);return true;}
    const choice=event.target.closest('[data-pilot-state]');
    if(choice){state=choice.dataset.pilotState;update();host.querySelector(`[data-pilot-state="${state}"]`).focus({preventScroll:true});return true;}
    if(event.target.closest('[data-pilot-video]')){
      const video=host.querySelector('video');
      if(video.paused){if(video.ended)video.currentTime=0;const error=host.querySelector('.pilot-video-error');video.play().catch(()=>{error.hidden=false;});}else video.pause();
      return true;
    }
    return false;
  }
  function keydown(event){
    if(!event.target.matches('.pilot-tabs [role="tab"]'))return;
    const i=steps.findIndex(s=>s.id===selected);
    const next={ArrowRight:(i+1)%steps.length,ArrowLeft:(i+steps.length-1)%steps.length,Home:0,End:steps.length-1}[event.key];
    if(next!==undefined){event.preventDefault();select(steps[next].id);}
  }
  function setPlatform(){
    if(!host?.querySelector('#pilot-panel'))return;
    host.querySelector('[data-pilot-platform]').value=ctx.platform();update();
  }
  return {steps,stepById,mount,click,keydown,stop,setPlatform};
})();
