// Action homes, not a second manual tree. Sources can share one action; every
// section in an action is visible. Old source URLs and flag IDs remain valid.
const clipsAtlas=(()=>{
  const C='clip-view',N='editing-midi',W='audio-clips-tempo-and-warping',R='recording-new-clips',G='using-grooves',L='launching-clips',E='clip-envelopes',T='midi-tools',P='comping',M='editing-mpe',U='using-tuning-systems',A='converting-audio-to-midi',S='stem-separation';
  const sources=(chapter,anchors)=>anchors.split(' ').map(a=>chapter+'#'+a);
  const part=(chapter,anchor,label)=>({key:chapter+'#'+anchor,label});
  const action=(id,label,chapter,anchors,extra={})=>({id,label,parts:sources(chapter,anchors).map(key=>({key})),...extra});
  const custom=(label,body,steps,terms=[],note='')=>({label,guide:{body,steps,terms,note,images:[]}});
  const areas=[
    {label:'Clip View',home:'clips',items:[
      action('clips','Open',C,'clip-view editor-view-modes clip-panels',{images:['midiSample'],aliases:sources('live-concepts','audio-and-midi'),intro:'Double-click a clip to open its contents.',links:['midi-clip','audio-source'],parts:[
        custom('Open a clip','MIDI clips hold notes; audio clips point to recordings.', ['Double-click the clip body—not its launch triangle. Its editor opens below.','Use Shift + Tab to switch between the clip and its track’s devices.'],[['Notes','Pitch runs vertically; time runs horizontally. The track’s instrument supplies the sound.'],['Audio','The waveform shows the recording. Its clip settings determine what plays.']]),
        part(C,'editor-view-modes','Switch editors'),part(C,'clip-panels','Make room')
      ],covered:sources(C,'clip-view'),keys:[['Clip / Device','⇧ Tab','Shift Tab']]}),
      action('midi-clip','Make a clip',N,'creating-a-midi-clip',{images:['midiSample'],links:['ca-draw','record-midi']}),
      action('ca-zoom','Zoom / move',N,'zooming-and-navigating-in-the-midi-note-editor playback-options',{extraParts:[part(C,'zooming-and-scrolling-in-the-clip-views-editor'),part(C,'playing-and-scrubbing-clips')],images:['midiSample']}),
      action('ca-name','Name / color',C,'clip-title-bar clip-color',{extraParts:[part(C,'clip-name')],images:['rename']}),
      action('ca-active','Switch off / on',C,'clip-activator-toggle',{images:['midiSample']}),
      action('ca-multi','Select several',C,'editing-clip-properties-for-multiple-clips',{extraParts:sources(N,'multi-clip-editing focus-mode multi-clip-editing-in-the-session-view multi-clip-editing-in-the-arrangement-view').map(key=>({key}))}),
      action('ca-defaults','Keep settings',C,'clip-defaults-and-update-rate saving-default-audio-clip-settings-with-the-sample',{extraParts:[part(W,'saving-warp-markers-with-a-sample-file')],links:['collect']})
    ]},
    {label:'Recording',home:'record-midi',items:[
      action('ca-input','Choose input',R,'choosing-an-input',{images:['pilotInput'],links:['settings','mapping']}),
      action('ca-arm','Arm',R,'arming-record-enabling-tracks',{images:['pilotArmOff','pilotArmOn'],imageLabels:['Off','Armed'],video:true,
        parts:[custom('Arm','Click the track’s Arm button. Red means ready; recording has not started.', ['Choose the input and use Monitor Auto. On a MIDI track, load an instrument.','Click Arm. Empty Session slots gain record circles.'],[['Arm','Selects a recording destination.'],['Clip Record','Starts a take in an empty slot.'],['More than one track','Hold Cmd on Mac or Ctrl on Windows while arming.']])],covered:sources(R,'arming-record-enabling-tracks')}),
      action('record-midi','Record MIDI',R,'recording-into-session-slots',{images:['pilotSlotsOn','midiSample'],aliases:sources(R,'recording-new-clips'),parts:[
        custom('Record MIDI','Play notes into a new Session clip.', ['Load an instrument on a MIDI track. Choose the keyboard under MIDI From, set Monitor to Auto, and arm the track.','In Session View, click the circle in an empty slot. Play after any count-in.','Click the clip’s launch button to finish the take and loop it. Press Space to stop. Double-click the body to edit the notes.'],[['No keyboard','Press M outside a text field to enable the Computer MIDI Keyboard. The A–L row plays notes.'],['No sound','Check the input, instrument, monitoring and audio output.'],['Only squares in empty slots','The track is not armed.']])
      ],covered:sources(R,'recording-into-session-slots'),keys:[['Session / Arrangement','Tab','Tab'],['Stop','Space','Space']],links:['ca-arm','edit-notes']}),
      action('record-audio','Record audio',R,'recording',{parts:[{reference:'record-audio'},part(R,'setting-up-file-types'),part(R,'where-are-the-recorded-samples')],covered:sources(R,'recording'),images:['audioInput'],links:['collect']}),
      action('capture','Capture',R,'capturing-midi starting-a-new-live-set adding-material-to-an-existing-live-set',{images:['transport']}),
      action('ca-overdub','Add notes',R,'overdub-recording-midi-patterns',{images:['midiSample']}),
      action('ca-step','Step forward',R,'midi-step-recording',{images:['midiSample']}),
      action('ca-count','Count in / sync',R,'recording-in-sync metronome-settings recording-with-count-in recording-quantized-midi-notes using-remote-control-for-recording',{images:['timing'],links:['mapping']})
    ]},
    {label:'Notes',home:'edit-notes',items:[
      action('edit-notes','Select',N,'selecting-notes-and-timespan find-and-select-notes non-destructive-editing',{images:['wsSelectedNote'],aliases:sources(N,'editing-midi the-midi-note-editor-layout editing-midi-notes editing-midi-clips')}),
      action('ca-draw','Draw / erase',N,'adding-midi-notes draw-mode previewing-notes',{images:['midiSample']}),
      action('ca-move','Move',N,'moving-notes transpose',{images:['wsSelectedNote']}),
      action('ca-length','Drag an edge',N,'changing-note-length note-duration legato',{images:['midiSample'],lead:{steps:['Drag the note’s right edge sideways to lengthen or shorten it. Drag its left edge to move the start.','For the same edit by keyboard, select the note and hold Shift while pressing the left or right arrow.']}}),
      action('ca-split-notes','Split / join',N,'split chop join',{aliases:sources(N,'note-operations')}),
      action('ca-velocity','Raise / lower',N,'editing-velocities drawing-velocities note-off-velocity',{images:['wsNoteStatus']}),
      action('ca-probability','Skip / vary',N,'deactivating-notes editing-probabilities probability-groups'),
      action('ca-scale','Fold / fit',N,'folding-and-scales fit-to-scale',{extraParts:[part(C,'clip-scale')]}),
      action('ca-pitches','Flip / add pitches',N,'invert intervals reverse',{aliases:sources(N,'pitch-and-time-utilities'),extraParts:[part(C,'pitch-tools')],covered:sources(C,'pitch-and-time-utilities-panel')})
    ]},
    {label:'Time & groove',home:'loop',items:[
      action('loop','Loop / trim',C,'clip-and-loop-region-settings looping-clips',{extraParts:[part(N,'looping'),part(C,'main-clip-properties-panel'),part(C,'clip-time-signature')],images:['midiSample']}),
      action('ca-crop','Crop',C,'cropping-clips',{extraParts:[part(N,'cropping-midi-clips')]}),
      action('ca-stretch','Stretch',N,'midi-note-stretch stretch',{extraParts:[part(C,'time-tools')]}),
      action('ca-time','Insert / remove time',N,'the-time-commands-in-the-midi-note-editor'),
      action('quantize','Snap to grid',N,'grid-snapping quantizing-notes humanize',{extraParts:[part(T,'quantize')],images:['quantize']}),
      action('ca-groove','Apply a groove',G,'using-grooves groove-pool adjusting-groove-parameters committing-grooves',{extraParts:[part(C,'clip-groove')]}),
      action('ca-extract','Extract / edit groove',G,'extracting-grooves editing-grooves'),
      action('ca-vary','Vary the feel',G,'grooving-a-single-voice non-destructive-quantization creating-texture-with-randomization',{aliases:sources(G,'groove-tips')})
    ]},
    {label:'Audio',home:'audio-source',items:[
      action('audio-source','Drop a sample',W,'importing-samples',{extraParts:[part(C,'clip-view-sample-details'),part(C,'audio-utilities-panel')],images:['audioClip']}),
      action('ca-audio-pitch','Raise / lower',C,'clip-gain-and-pitch',{images:['audioClip']}),
      action('ca-reverse','Reverse / fade',C,'reversing-samples clip-start-and-end-fades',{images:['audioClip']}),
      action('ca-replace','Replace / edit file',C,'replacing-and-editing-the-sample destructive-sample-editing',{extraParts:[part(E,'using-clips-as-templates')],links:['collect']}),
      action('ca-ram','Load into RAM',C,'clip-ram-mode high-quality-interpolation'),
      action('ca-slice','Slice / resequence',A,'slice-to-new-midi-track resequencing-slices using-effects-on-slices',{links:['drum-rack']}),
      action('ca-convert','Extract notes',A,'convert-melody-to-new-midi-track convert-harmony-to-new-midi-track convert-drums-to-new-midi-track optimizing-for-better-conversion-quality',{aliases:sources(A,'converting-audio-to-midi')}),
      action('ca-stems','Separate stems',S,'stem-separation how-stem-separation-works-in-live separating-audio-files-and-clips separation-speed-vs-quality')
    ]},
    {label:'Warp',home:'warp',items:[
      action('warp','Pin / move a beat',W,'warp-markers transients-and-pseudo-warp-markers',{images:['warp'],aliases:sources(W,'audio-clips-tempo-and-warping warping'),extraParts:[part(C,'warp-controls')]}),
      action('ca-warp-loop','Fit a loop',W,'warping-short-samples even-length-loops odd-length-loops uneven-length-loops',{images:['warp']}),
      action('ca-warp-long','Align a recording',W,'auto-warping-long-samples adjusting-auto-warp-results multi-clip-warping'),
      action('ca-warp-snap','Snap / loosen beats',W,'quantizing-audio manipulating-grooves'),
      action('ca-warp-mode','Change the stretch',W,'warp-modes beats-mode tones-mode texture-mode re-pitch-mode complex-and-complex-pro-mode',{images:['warp']}),
      action('ca-tempo','Follow / lead tempo',W,'clip-tempo-followers-and-leaders tempo setting-the-tempo tapping-the-tempo nudging-the-tempo',{links:['ws-tempo']}),
      action('ca-warp-default','Set import behavior',W,'warping-options-in-settings',{links:['ca-defaults']})
    ]},
    {label:'MIDI tools',home:'ca-tools',items:[
      action('ca-tools','Apply / undo',T,'midi-tools',{aliases:sources(T,'using-midi-tools transformation-tools generative-tools'),extraParts:[part(C,'transform-and-generate-panels')],parts:[custom('Apply / undo','Transform changes existing notes. Generate creates notes in the selected time or clip loop.',[
        'Open Transform or Generate in Clip View and choose a tool. Make a note or time selection first to limit the edit.',
        'Turn Auto Apply off to set parameters before applying. Press Apply, or Cmd + Enter on Mac / Ctrl + Enter on Windows.',
        'Undo restores the note edit. Reset restores the tool’s parameters—not the notes.'
      ],[['Auto Apply','Changes notes as you adjust the tool; switching it off restores the original notes.'],['Generate','New notes can replace overlapping existing content. Duplicate the clip before experimenting.'],['Scale','Pitch controls can use scale degrees when the clip’s scale is enabled.']])],covered:sources(T,'midi-tools').concat(sources(N,'midi-tools'))}),
      action('ca-tool-repeat','Repeat / divide',T,'arpeggiate chop ornament'),
      action('ca-tool-connect','Fill / spread',T,'connect span strum'),
      action('ca-tool-reshape','Reshape',T,'recombine time-warp velocity-shaper'),
      action('ca-tool-expression','Bend / oscillate',T,'glissando lfo'),
      action('ca-generate','Generate',T,'rhythm seed shape stacks euclidean'),
      action('ca-max-tools','Add a tool',T,'using-max-for-live-midi-tools',{parts:[custom('Add a tool','Max for Live MIDI Tools run in Clip View, not in the track’s device chain.',[
        'Put the tool’s .amxd file in a folder under Browser Places, or User Library → MIDI Tools → Max Transformations / Max Generators.',
        'Open the matching Transform or Generate chooser in a MIDI clip and select the tool.'
      ],[['Built in','Velocity Shaper and Euclidean are included in Standard and Suite.'],['Custom tools','Editing, building or using third-party tools requires Suite or the Max for Live add-on.']])],covered:sources(T,'using-max-for-live-midi-tools')})
    ]},
    {label:'Expression',home:'ca-envelope',items:[
      action('ca-envelope','Open / draw',E,'the-clip-envelope-editor clip-envelopes-are-non-destructive mixer-and-device-clip-envelopes',{images:[],aliases:sources(E,'clip-envelopes audio-clip-envelopes'),extraParts:[part('automation-and-editing-envelopes','drawing-envelopes','Draw steps'),part('automation-and-editing-envelopes','editing-breakpoints','Place / bend points')]}),
      action('ca-env-level','Lower / pan / send',E,'muting-or-attenuating-notes-in-a-sample modulating-mixer-volumes-and-sends modulating-pan'),
      action('ca-env-shape','Shift / sweep',E,'changing-pitch-and-tuning-per-note scrambling-beats modulating-device-controls'),
      action('ca-pedal','Edit pedal / controllers',E,'midi-controller-clip-envelopes',{extraParts:[part(C,'midi-clip-bank-and-program-change-controls')]}),
      action('ca-unlink','Unlink the loop',E,'unlinking-clip-envelopes-from-clips programming-a-fade-out-for-a-live-set creating-long-loops-from-short-loops imposing-rhythm-patterns-onto-samples clip-envelopes-as-lfos warping-linked-envelopes'),
      action('ca-mpe','Bend one note',M,'editing-mpe',{parts:[custom('Bend one note','Open the clip’s MPE / Note Expression editor. Select a note.',[
        'Show Pitch, Slide or Pressure. Click the line to add a point; drag it to change the curve.',
        'Press B to draw. Hold Shift for finer values; Option-drag (Mac) or Alt-drag (Windows) curves a segment.'
      ],[['Per note','Expression travels with the note.'],['Sound','Use an MPE-capable instrument or preset; its assignments determine what Slide and Pressure do.'],['Velocity / release','These are note-on and note-off values rather than continuous curves.']])],covered:sources(M,'editing-mpe viewing-mpe-data editing-mpe-data drawing-envelopes mpe-in-lives-devices-and-on-push-2 mpe-in-external-plug-ins')}),
      action('ca-mpe-route','Send expression',M,'mpemulti-channel-settings',{parts:[custom('Send expression','For external instruments, choose the output under MIDI To, select MPE, then reopen that chooser for MPE Settings.',[
        'For an MPE-enabled plug-in, use its title-bar context menu.',
        'Match the receiving device’s zone and note-channel range.'
      ],[['Lower zone','Global channel 1.'],['Upper zone','Global channel 16.'],['Two zones','Use two tracks; one track sends to one zone.'],['Multi-channel','Sets a channel range for compatible multi-timbral destinations.']])],covered:sources(M,'mpemulti-channel-settings accessing-the-mpemulti-channel-settings-dialog the-mpemulti-channel-settings-dialog')}),
      action('ca-tuning','Load / adjust tuning',U,'using-tuning-systems',{parts:[custom('Load / adjust tuning','A tuning changes the pitches represented by the note rows.',[
        'Open Tunings in the Browser. Select a tuning and press Enter, or drag an .scl / .ascl file into the Tuning section.',
        'Expand that section to adjust Ref. Pitch/Freq and the lowest / highest notes. Save a variation with its disk button.',
        'Select the tuning file and Delete to return to 12-tone equal temperament.'
      ],[['Octave / Note','Choose the reference note. These alone make no audible change; only Ref. Pitch/Freq moves the pitch of every note.'],['Lowest / Highest Note','Set what the lowest or highest note plays; changing one moves the other, keeping the count between them.'],['Retune Set On Loading Tuning Systems','Options menu setting: moves existing notes toward their original pitches when changing tuning. Overlapping remapped notes can be shortened or lost—save a copy first.'],['Without Retune','Note positions stay put but may sound at different pitches.'],['Compatibility','Live instruments support tuning. Compatible MPE plug-ins / external Max instruments need a 48-semitone pitch-bend range.'],['Scale controls','Scale Mode choosers in Clip View and the Control Bar disappear while a tuning is loaded, and scale-aware devices lose Use Current Scale.'],['Your own files','Put .scl or .ascl files in any Places folder; they appear under Tunings with the User tag. Info View describes a tuning, including its notes per octave.'],['In the editor','Note rows show the tuning’s notes; hover a note to read its pitch and frequency in the Status Bar. A loaded tuning is saved with the Set.'],['Learn / edit','The arrow beside Save opens Ableton’s tuning page when a page is available.']])],covered:sources(U,'using-tuning-systems loading-a-tuning-system the-tuning-section learn-more-about-tuning-systems')}),
      action('ca-tuning-keys','Map keys / bypass',U,'midi-track-options-for-tuning-systems',{parts:[custom('Map keys / bypass','With a tuning loaded, the MIDI track’s I/O section gains tuning controls.',[
        'Enable Bypass Tuning on a track that should retain ordinary note pitches. Drum Rack tracks bypass automatically.',
        'Choose a controller layout: All Keys, Black Keys Only (centred on C#3), White Keys Only (centred on C3), Closest in Pitch to Keyboard, or Custom Controller Layout.',
        'For Custom, open the … dialog to define the mapping. The layout is saved with the Set.'
      ],[['Bypass','Applies to this track; its clips show ordinary 12-TET notes in the MIDI Note Editor.'],['Layout','Maps your physical keys to the tuning; it does not change the tuning itself. Useful when a keyboard no longer lines up with the piano roll.']])],covered:sources(U,'midi-track-options-for-tuning-systems bypass-tuning midi-controller-layouts')})
    ]},
    {label:'Launching',home:'ca-launch',items:[
      action('ca-launch','Press / release',L,'launch-modes',{extraParts:[part(L,'the-launch-controls'),part(L,'clip-launch-quantization')],aliases:sources(L,'launching-clips'),covered:sources(C,'extended-clip-properties follow-action-and-launch-controls'),links:['session','launch']}),
      action('ca-legato','Switch in place',L,'legato-mode adding-variations-in-sync'),
      action('ca-nudge','Nudge the start',L,'clip-offset-and-nudging'),
      action('ca-launch-velocity','Play harder / softer',L,'velocity'),
      action('ca-follow','Follow / repeat',L,'follow-actions looping-parts-of-a-clip creating-cycles temporarily-looping-clips'),
      action('ca-launch-vary','Jump / vary',L,'mixing-up-melodies-and-beats creating-nonrepetitive-structures')
    ]},
    {label:'Takes',home:'ca-takes',items:[
      action('ca-takes','Record passes',P,'recording-takes',{extraParts:[part(R,'recording-into-the-arrangement')],aliases:sources(P,'comping'),images:['arrangement']}),
      action('ca-take-lanes','Open / add lanes',P,'take-lanes inserting-and-managing-take-lanes inserting-samples'),
      action('ca-audition','Listen across takes',P,'auditioning-take-lanes'),
      action('ca-comp','Pick / join',P,'creating-a-comp source-highlights')
    ]}
  ];
  const locations=new Map(),sourceHomes=new Map();let model,ctx,host,current;
  function install(m){
    model=m;
    for(const area of areas)for(const item of area.items){
      item.parts=[...item.parts,...(item.extraParts||[])];
      const loc={area,item};locations.set(item.id,loc);
      for(const p of item.parts){
        if(p.reference){p.guide=atlasReference.items[p.reference];p.url=p.guide.source;}
        if(p.key){
          const n=m.manual.nodes.get(p.key);if(!n)throw Error('Unknown Clips source: '+p.key);
          p.guide=n.guide||atlasReference.items[n.id];p.url=n.url;
          if(!p.guide)throw Error('Missing Clips content: '+p.key);
          p.label=p.label||p.guide.title||n.title;
        }
      }
      if(item.lead)item.parts[0].guide={...item.parts[0].guide,...item.lead};
      const keys=[...item.parts.map(p=>p.key).filter(Boolean),...(item.covered||[]),...(item.aliases||[])];
      item.url=item.parts.find(p=>p.url)?.url||m.manual.nodes.get(keys[0])?.url;
      if(!item.url)throw Error('Missing Clips citation: '+item.id);
      for(const key of keys){
        const node=m.manual.nodes.get(key);if(!node)throw Error('Unknown Clips coverage: '+key);
        if(sourceHomes.has(key))throw Error('Two Clips homes for '+key);
        sourceHomes.set(key,loc);
        // A shared source can be useful here without moving its Workspace/Set home.
        if(node.view==='clips'&&!locations.has(node.id))locations.set(node.id,loc);
      }
      const old=m.entries.get(item.id);
      const body=item.intro||item.parts[0].guide.body||old?.body||'';
      if(old){Object.assign(old,{atlasContext:area.label,body});}
      else m.entries.set(item.id,{id:item.id,view:'clips',title:item.label,body,group:area.label,source:'manual',atlasContext:area.label});
      item.images=item.images||[...new Set(item.parts.flatMap(p=>p.guide.images||[]))];
    }
    for(const [id,loc] of locations)m.entries.get(id).atlasContext=loc.area.label+' › '+loc.item.label;
    m.topicGroups.clips=[{name:'Clips',ids:areas.map(a=>a.home)}];
  }
  const owned=id=>locations.has(id),mainId=id=>locations.get(id)?.area.home||id;
  const label=id=>areas.find(a=>a.home===id)?.label||model.entries.get(id).title;
  const e=s=>ctx.esc(s);
  const text=s=>String(s||'').split(/(\{[A-Za-z]+\})/g).map(p=>{
    const key=atlasReference.keys[p.slice(1,-1)];return /^\{[A-Za-z]+\}$/.test(p)&&key?`<kbd>${e(key[ctx.platform()==='mac'?0:1])}</kbd>`:e(p);
  }).join('');
  function index(esc){return `<nav class="workspace-places" aria-label="Clip actions">${areas.map(a=>`<button class="topic-item clip-place" data-entry="${a.home}"><span>${esc(a.label)}</span></button>`).join('')}</nav>`;}
  function content(loc,flagId){
    const {item}=loc;
    const keys=[...(item.keys||[]),...item.parts.flatMap(p=>(p.guide.keys||[]).map(k=>[k.action,k.mac,k.win]))];
    const uniqueKeys=[...new Map(keys.map(k=>[k.join('|'),k])).values()];
    return `<h4 class="workspace-action-title" tabindex="-1">${e(item.label)}</h4>
      ${uniqueKeys.length?`<div class="pilot-keys" aria-label="Keys in Live">${uniqueKeys.map(([label,mac,win])=>`<span><small>${e(label)}</small><kbd>${e(ctx.platform()==='mac'?mac:win)}</kbd></span>`).join('')}</div>`:''}
      ${item.images.map((id,i)=>`${item.imageLabels?`<p class="workspace-variant-caption">${e(item.imageLabels[i])}</p>`:''}${ctx.captureFigure(id)}`).join('')}
      <div class="clip-sections">${item.parts.map((p,i)=>{
        const d=p.guide;return `<section class="clip-section" ${p.key?`data-clip-source="${e(p.key)}"`:''}>
          ${i?`<h5>${e(p.label||d.title||item.label)}</h5>`:''}
          ${d.body?`<p class="workspace-description">${text(d.body)}</p>`:''}
          ${(p.images||[]).map(ctx.captureFigure).join('')}
          ${d.steps.length?`<ol class="reference-steps workspace-steps">${d.steps.map(s=>`<li>${text(s)}</li>`).join('')}</ol>`:''}
          ${d.terms.length?`<dl class="reference-terms">${d.terms.map(([label,value])=>`<div><dt>${e(label)}</dt><dd>${text(value)}</dd></div>`).join('')}</dl>`:''}
          ${d.note?`<p class="clip-note">${text(d.note)}</p>`:''}
          ${p.url?`<a class="clip-source" href="${e(p.url)}" target="_blank" rel="noreferrer">Manual ↗</a>`:''}</section>`;
      }).join('')}</div>
      ${item.video?'<section class="clip-section"><h5>Arm / disarm · 2 sec</h5><video class="clip-arm-video" controls loop muted playsinline preload="none" width="468" height="320" aria-label="Arm and disarm one track"><source src="assets/arm-toggle.mp4" type="video/mp4"></video></section>':''}
      ${item.links?.length?`<div class="detail-links">${item.links.map(id=>`<button data-entry="${id}">${e(model.entries.get(id).title)} ↗</button>`).join('')}</div>`:''}
      <div class="workspace-source"><a href="${e(item.url)}" target="_blank" rel="noreferrer">Ableton manual ↗</a>${ctx.flagHTML(flagId)}</div>`;
  }
  function mount(target,entry,context){
    ctx=context;host=target;current={loc:locations.get(entry.id),flagId:entry.id};const {area,item}=current.loc;
    host.innerHTML=`<div class="workspace-shell"><header class="workspace-local-nav"><h3 class="insp-title">${e(area.label)}</h3><nav class="workspace-actions" aria-label="${e(area.label)} actions">${area.items.map(a=>`<button data-entry="${a.id}" ${a===item?'aria-current="page"':''}>${e(a.label)}</button>`).join('')}</nav></header><div class="workspace-reading" tabindex="0" role="region" aria-label="${e(item.label)} explanation">${content(current.loc,entry.id)}</div></div>`;
    host.scrollTop=0;
    const key=entry.manualNode;
    if(key)host.querySelector?.(`[data-clip-source="${key}"]`)?.scrollIntoView({block:'start'});
  }
  function stop(){host?.querySelectorAll?.('video').forEach(v=>v.pause());}
  function setPlatform(){
    if(!host||!current)return;const panel=host.querySelector('.workspace-reading'),scroll=panel.scrollTop;
    stop();
    panel.innerHTML=content(current.loc,current.flagId);panel.scrollTop=scroll;
  }
  return {areas,locations,sourceHomes,install,owned,mainId,label,index,mount,setPlatform,stop};
})();
