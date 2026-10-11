// Manual territories become fixed families, then places and their actions.
// Navigation and work within a place stay together. Source guides are shared.
const workspaceAtlas=(()=>{
  const B='working-with-the-browser#',S='first-steps#',K='live-keyboard-shortcuts#';
  const ref=(key,label,extra={})=>({key,label,...extra});
  const core=(id,label,extra={})=>({id,label,...extra});
  const action=(id,label,source,body,steps,extra={})=>core('ws-'+id,label,{source,body,steps,terms:[],note:'',images:[],keys:[],...extra});
  const R='midi-and-key-remote-control#',T='audio-clips-tempo-and-warping#';
  const areas=[
    {id:'views',label:'Views',home:'switch-views',items:[
      core('switch-views','Main views',{
        body:'The same Set: a clip grid or a timeline.',
        steps:['Press Tab to switch between Session and Arrangement.'],
        images:[],keys:[['Switch views','Tab','Tab']],
        variants:[{label:'Session',image:'session',text:'Launch clips by track or scene.',entry:'session'},{label:'Arrangement',image:'arrangement',text:'Place clips along the song timeline.',entry:'arrangement'}],
        terms:[['Shared tracks','Both views use the same tracks, devices and mixer.'],['Playback','Changing the visible view does not change which clips are playing.']],
        note:'Tab switches views when Use Tab to Move Focus is off.',
        details:[ref(K+'using-tab-for-navigation','Tab behavior')]
      }),
      core('clip-view','Clip View',{images:['midiSample'],keys:[['Clip / Device','⇧ Tab','Shift Tab']],links:['midi-clip','audio-source']}),
      core('device-view','Device View',{images:['chain'],keys:[['Clip / Device','⇧ Tab','Shift Tab']],links:['chain']}),
      action('make-room','Make room','clip-view#clip-view-layout','Grab an edge to give an editor more space.',[
        'Open a clip. Drag the divider above Clip View upward; drag it down to shrink the editor.',
        'Drag the Browser’s right edge sideways to change its width.'
      ],{links:['hide-browser','keys-space'],details:[
        action('fold','Fold / unfold','working-with-instruments-and-effects#device-title-bar','Fold a device without switching it off.',[
          'Double-click the device title. Its controls collapse into a narrow strip.',
          'Double-click the strip to unfold it.'
        ],{links:['device-view'],details:[action('fold-tracks','Fold tracks',K+'arrangement-view','Collapse a track’s display in Arrangement.',[
          'Select a track title in Arrangement and press U. Press U again to unfold it.'
        ],{keys:[['Fold / unfold','U','U']],note:'Turn the Computer MIDI Keyboard off before using single-letter shortcuts.',links:['keys-arrange-fit']})]}),
        action('zoom','Zoom in / out','arrangement-view#navigation-and-zooming','Move closer to a passage, then pull back.',[
          'In Arrangement, select a passage and press Z to fill the view. Press X to return.',
          'For gradual zoom, use + and − with the editor focused.'
        ],{keys:[['Zoom to selection','Z','Z'],['Go back','X','X']],note:'Turn the Computer MIDI Keyboard off for Z / X. Zoom changes the view, not the music.',links:['keys-zoom'],details:[
          action('pan','Move across','arrangement-view#layout','Move the view along the timeline.',[
            'Drag left or right in the beat-time ruler above the clips.',
            'Drag vertically in the same ruler to change the zoom.'
          ],{terms:[['Ruler / scrub area','The scrub area below the ruler starts playback. The ruler navigates the view.'],['Overview','The strip showing the whole Arrangement; its black outline is what you see. Drag it like the ruler; double-click inside the outline to show everything.'],['Double-click the ruler','Zooms to the current selection, or out to the whole Arrangement when nothing is selected.'],['Time ruler','The lower ruler, in minutes-seconds-milliseconds; drag it to scroll.']],links:['keys-arrange-move']}),
          action('layout','Parts of the Arrangement','arrangement-view#layout','Where the Arrangement’s other controls sit.',[
            'Tracks stack vertically; drag a track up or down to reorder it.',
            'Drop an instrument or MIDI effect below the tracks to create a MIDI track, or an audio effect to create an audio track.'
          ],{terms:[['Locators','Markers in the scrub area that launch playback from sections. Set Locator adds one (also while playing or recording); with a locator selected it becomes Delete Locator. Previous/Next Locator jump between them, quantized.'],['Automation Mode','Shows or hides automation lanes.'],['Lock Envelopes','Ties automation to song time instead of clips, so clips can move without their automation.'],['Main lane','Where a track’s clips play; comping adds take lanes that feed it.'],['Arrangement Track Controls','Volume, pan, I/O and more beside each track; choose which via View → Arrangement Track Controls.'],['Mixer Drop Area','The empty space under the tracks that accepts devices.'],['Optimize Height / Width','Toggles for fitting every track (H / W).'],['Waveform Vertical Zoom','Enlarges all audio waveforms for viewing without changing clip gain.'],['Mixer','View → Mixer or the Mixer View toggle at bottom right opens the mixer here.']]}),
          action('fit','Fit the view',K+'arrangement-view','Bring the Arrangement back into view.',[
            'With Arrangement focused, press W to fit the width or H to fit the track heights.'
          ],{keys:[['Fit width','W','W'],['Fit height','H','H']],note:'Turn the Computer MIDI Keyboard off; leave text fields first.',links:['keys-arrange-fit']})
        ]})
      ]}),
      ref(K+'general-keyboard-navigation-and-workflow','Focus',{
        body:'A shortcut acts on the view or control that currently has keyboard focus.',
        steps:['Click the editor or control you want to use, then apply the shortcut.'],
        terms:[['Text field','Typing edits text until you leave the field.'],['Selected object','The highlighted note, clip, track or device can become the edit target.']],
        details:[ref(K+'momentary-latching-shortcuts','Tap / hold'),ref(K+'accessing-menus','Menus'),ref(K+'using-lives-context-menu','Context menu')]
      }),
      ref(S+'info-view','Info View',{
        body:'Hover over a control to see its name and help text in Live.',
        keys:[['Info View','?','?']],
        steps:['Press ? to show Info View, then hover over the unfamiliar control.'],
        links:['ws-write-note'],details:[ref(S+'learn-view','Learn View'),ref(S+'other-learning-resources','Help resources')]
      })
    ]},
    {id:'browser',label:'Browser',home:'browser',items:[
      core('browser','Search',{
        body:'Find a device, preset or file by name.',images:['browser'],
        keys:[['Search','⌘ F','Ctrl F'],['Results','↓','↓'],['Load','Enter','Enter']],
        steps:['Select the destination track. Press {search} and type Drift.','Choose the instrument result with the arrow keys; press Enter to load it.'],
        details:[ref(B+'content-pane','Results'),ref(B+'browser-history','Back / forward'),ref(B+'saving-search-results-as-custom-labels','Save a search')]
      }),
      ref(B+'previewing-files','Preview',{
        steps:['Select a sample in the Browser and press Shift + Enter to preview it.','Use the arrow keys to select another result. Adjust Preview/Cue Volume if needed.']
      }),
      ref(B+'adding-content-from-the-browser-to-a-live-set','Load',{
        steps:['Select the destination track, search the device name and choose the result.','Press Enter to load it. The device appears in that track’s Device View.'],
        links:['device-view','clip-view']
      }),
      ref(B+'filters-and-tags','Filters',{
        steps:['Choose a Browser label and open Filter View with its show / hide toggle.','Select a tag to narrow the results. Use Results Clear to remove the search and active filters.'],
        noteLabel:'A result is missing',
        details:[ref(B+'filter-groups','Filter groups'),ref(B+'tags','Tags',{details:[ref(B+'tag-editor','Tag editor'),ref(B+'quick-tags','Quick tags')]})]
      }),
      ref(B+'collections','Collections'),
      ref(B+'places','Places',{
        details:[ref(B+'library','Content types'),ref(B+'current-project','Current Project'),ref(B+'user-folders','Add a folder'),ref(B+'user-library','User Library',{
          details:[ref(B+'presets-folder','Presets'),ref(B+'clips-folder','Live Clips'),ref(B+'samples-folder','Samples'),ref(B+'defaults-folder','Defaults'),ref(B+'templates-folder','Templates'),ref(B+'grooves-folder','Grooves'),ref(B+'chord-banks','Chord banks'),ref(B+'managing-files-in-the-user-library','File dependencies')]
        }),ref(B+'downloading-and-installing-packs-in-the-browser','Packs',{details:[ref(B+'pack-info','Pack info')]}),ref(B+'using-ableton-cloud','Ableton Cloud',{details:[ref(B+'abl-assets','Cloud samples')]}),ref(B+'transferring-files-from-push-3-in-standalone-mode','Push transfer'),ref(B+'splice','Splice',{
          details:[ref(B+'logging-into-splice','Connect account'),ref(B+'searching-for-splice-samples','Search'),ref(B+'working-with-splice-samples','Load a sample'),ref(B+'splice-library','Splice library'),ref(B+'splice-settings','Splice settings')]
        })]
      }),
      core('hide-browser','Show / hide',{images:['browserHidden'],keys:[['Browser','⌘ ⌥ B','Ctrl Alt B'],['Search','⌘ F','Ctrl F']]})
    ]},
    {id:'transport',label:'Control bar',home:'transport',items:[
      core('transport','Play / stop',{
        images:['transport'],keys:[['Play / stop','Space','Space'],['Continue from stop','⇧ Space','Shift Space']],
        steps:['Press Space to start or stop.','Use Shift + Space to continue from where playback stopped; double-click Stop to return to the start.'],
        terms:[['Insert marker','The flashing marker where playback starts; click in a track to move it. Double-click Stop, or press Home (Windows) / Fn ← (Mac), to return it to the start.'],['Arrangement Position','Control Bar fields showing the play position in bars-beats-sixteenths. Drag, type and press Enter, or use the arrow keys; changing them moves the insert marker.'],['Scrub area','Click above the tracks to play from that point (with Permanent Scrub Areas on in Display & Input). Jumps follow the Control Bar quantization; holding the mouse loops a quantized portion. With it off, Shift-click still scrubs.'],['Chase MIDI Notes','On by default (Options menu): a note already in progress sounds even when playback starts partway through it.']],
        details:[ref('arrangement-view#navigation-and-zooming','Follow playback',{
          body:'Follow keeps the playing position in view as the Arrangement moves.',
          steps:['Turn on Follow in the Control Bar, or choose Follow from the Options menu.','Start playback. The Arrangement scrolls with the play position.'],
          terms:[['Manual navigation','Editing, horizontal scrolling or clicking the beat-time ruler pauses Follow.'],['Resume','Stop or restart playback, or click an Arrangement or clip scrub area.'],['Zooming','+ and −, or ⌘/Ctrl with the scroll wheel, zoom around the selection. Z zooms fully to a time selection; X steps back. ⌘ ⌥ / Ctrl Alt drag pans. ⌥ / Alt with the scroll wheel zooms a track vertically.']],
          keys:[],images:[],note:''
        })]
      }),
      {id:'ws-tempo',label:'Tempo',source:T+'setting-the-tempo',body:'The tempo field sets the Set’s speed in beats per minute.',images:['timing'],steps:['Select the tempo value, type the BPM and press Enter.'],terms:[['MIDI','Note events follow musical time.'],['Audio','Warp determines how an audio clip follows Set tempo.']],links:['warp'],details:[
        action('tap-tempo','Tap the tempo',T+'tapping-the-tempo','Set the pulse by tapping it.',[
          'Click Tap once per beat. Live estimates the tempo from your taps.'
        ],{note:'Tapping can start playback when Start Playback with Tap Tempo is enabled in Recording Settings.',links:['ws-key-map']}),
        action('nudge-tempo','Nudge the tempo',T+'nudging-the-tempo','Briefly slow down or speed up to meet another pulse.',[
          'During playback, hold Phase Nudge Down to fall back, or Phase Nudge Up to catch up.',
          'Release to return to the Set’s tempo.'
        ],{terms:[['Nudge / set tempo','Nudge is temporary. Type a BPM to make a lasting tempo change.']]}),
        ref('automation-and-editing-envelopes#editing-the-tempo-automation','Tempo changes')
      ]},
      ref('recording-new-clips#metronome-settings','Metronome',{
        body:'A click that follows the Set’s tempo.',
        images:['timing'],keys:[['Metronome','O','O']],
        steps:['Press O to turn the metronome on; press Space to start playback.','Open the menu beside the metronome for rhythm, click sound and count-in settings.'],
        details:[ref('recording-new-clips#recording-with-count-in','Count-in')]
      }),
      {id:'ws-record-controls',label:'Recording',source:'recording-new-clips#recording',body:'Arm prepares a track. The record control chooses where the performance goes.',images:['transport'],steps:[],terms:[['Arrangement Record','Writes to the timeline.'],['Session Record','Records into Session clips.'],['Capture MIDI','Recovers recent playing without a started recording.']],links:['record-midi','record-audio','capture']},
      action('read-feedback','Read the feedback','live-concepts#the-status-bar','Look along the bottom of Live for the current selection or a message.',[
        'Select a MIDI note, then read its time, pitch, velocity and probability in the Status Bar.',
        'Hover over an insert marker to read its position.'
      ],{terms:[['Info View / Status Bar','Info View explains a hovered control. The Status Bar reports selection details and current activity.'],['Messages','Errors, updates and background activity can appear here instead of selection details.']],details:[
        action('cpu','Check CPU load','computer-audio-resources-and-strategies#the-cpu-load-meter','Look at the CPU meter near the top-right corner.',[
          'Read the percentage while the Set plays. It measures audio-processing time against the time available.',
          'Open the meter’s menu to choose its display.'
        ],{terms:[['Near 100%','Live is running out of time to finish each audio buffer; dropouts can occur.'],['Average / Current','Average smooths the reading; Current exposes brief peaks.']],links:['settings']}),
          action('disk','Check disk load','computer-audio-resources-and-strategies#managing-the-disk-load','The overload indicator can show Disk when audio cannot be read or written fast enough.',[
            'If playback breaks up, check the indicator beside the CPU display. Disk and CPU point to different bottlenecks.'
          ],{terms:[['Disk','Storage is not keeping up with audio streaming.'],['CPU','Audio processing cannot finish in time.']]})
      ]})
    ]},
    {id:'settings',label:'Settings',home:'settings',items:[
      core('settings','Audio',{body:'Choose where sound enters and leaves Live.',images:['settings'],keys:[['Settings','⌘ ,','Ctrl ,']],noteLabel:'Your audio hardware',details:[ref(S+'audio','Channels & buffer')]}),
      ref(S+'display--input','Display',{details:[ref(S+'theme--colors','Theme & contrast')]}),
      ref(S+'library','Library',{details:[ref(S+'file--folder','Storage paths')]}),
      ref(S+'plug-ins','Plug-ins'),
      ref(S+'record-warp--launch','Recording defaults'),
      ref(S+'licenses--updates','Installation',{note:'Check device and plug-in compatibility before updating a working installation.',noteLabel:'Before updating',details:[ref(S+'installation-and-authorization','Authorization')]})
    ]},
    {id:'editing',label:'Editing',home:'undo',items:[
      core('undo','Undo / redo',{keys:[['Undo','⌘ Z','Ctrl Z'],['Redo','⌘ ⇧ Z','Ctrl Y']],terms:[['Undo history','Edits since opening the Set; it is not retained after closing.'],['Saved version','A separate .als file you can reopen later.']],links:['save-set']}),
      core('rename','Rename',{images:['rename'],keys:[['Rename','⌘ R','Ctrl R']],terms:[['Track / clip / device','Select the object before renaming.'],['Next name','Tab moves between track or scene names while renaming.'],['Cancel','Esc discards the current name edit.']]}),
      core('duplicate','Duplicate',{
        images:[],keys:[['Duplicate','⌘ D','Ctrl D']],body:'Duplicate acts on the current selection.',
        steps:['Select a clip, note, track or device. Press {duplicate}.','Check what was copied; Undo if a different editor had focus.'],
        terms:[['Note','A note selected inside the MIDI editor.'],['Clip','A clip selected in Session or Arrangement.'],['Track / device','Its title bar must be selected.']]
      }),
      action('select','Select',K+'editing','Choose what the next edit will act on.',[
        'Click an object: a note, clip body, track title or device title.',
        'Shift-click to extend a range; use the modifier below for separate tracks or clips.'
      ],{keys:[['Separate items','⌘ click','Ctrl click']],terms:[['Clip body / launch button','Click the body to select. The triangle starts playback.'],['Selection / focus','The highlighted object is the selection; the focused editor receives keyboard commands.']],links:['keys-select']}),
      action('adjust','Drag a control',K+'adjusting-values','Grab a knob or numeric value and move up or down.',[
        'Click and drag Utility’s Gain knob upward or downward.',
        'Hold Shift while dragging for smaller changes.'
      ],{keys:[['Fine movement','⇧ drag','Shift drag']],links:['keys-values'],details:[
        action('type-value','Type a value',K+'adjusting-values','Replace a control’s value directly.',[
          'Click the control, type the value, then press Enter. Utility Gain accepts −6 for −6 dB.',
          'Press Esc before Enter to cancel typing.'
        ],{terms:[['Position fields','A period or comma advances between bar, beat and sixteenth fields.']]}),
        action('reset-value','Reset a value',K+'adjusting-values','Return a selected control to its default.',[
          'Select Utility Gain and press Delete. Its default is 0 dB.'
        ],{keys:[['Reset selected control','Delete','Delete']],terms:[['Reset / Undo','Reset chooses the default. Undo restores the previous edit.']],note:'Check focus first: Delete on a selected device removes the device, not just its value.',links:['undo']})
      ]}),
      action('write-note','Write a note',S+'info-view','Attach a note to a track, clip or device.',[
        'Right-click its title or body and choose Edit Info Text.',
        'Write in Info View, then click outside the field. Save the Set to retain the note.',
        'Show Info View and hover over the same object to read it again.'
      ],{terms:[['Edit again','Open Edit Info Text on the same object.'],['Lesson notes','The note belongs to this object in this Set, not every instance of the device.']]})
    ]},
    {id:'controllers',label:'Controllers',home:'mapping',items:[
      core('mapping','Map a control',{images:['mapping'],keys:[['MIDI Map Mode','⌘ M','Ctrl M']],details:[ref('routing-and-i-o#remote','Remote input')],links:['ws-key-map','ws-revise-map','ws-takeover']}),
      action('key-map','Assign a key',R+'computer-keyboard-remote-control','Make a computer key operate a Live control.',[
        'Enter Key Map Mode. Click a highlighted control; press your chosen key.',
        'Leave Key Map Mode before using the assignment.'
      ],{keys:[['Key Map Mode','⌘ K','Ctrl K']],terms:[['Typing notes','Computer MIDI Keyboard plays notes; Key Map Mode assigns controls.']],links:['ws-revise-map']}),
      action('revise-map','Revise a mapping',R+'the-mapping-browser','Open KEY or MIDI to see that mode’s assignments.',[
        'Select the assignment in the Mapping Browser on the left.'
      ],{keys:[['Key Map Mode','⌘ K','Ctrl K'],['MIDI Map Mode','⌘ M','Ctrl M']],details:[
        action('range','Limit the range',R+'the-mapping-browser','Set the endpoints of a mapped control.',[
          'Edit Min and Max in its row; for example, limit a tempo assignment to 80–140 BPM.'
        ],{details:[action('invert-range','Reverse the range',R+'the-mapping-browser','Reverse which end is high.',[
          'Right-click the mapping and invert its range.'
        ])]}),
        action('remove-map','Remove an assignment',R+'the-mapping-browser','Remove the mapping, not its destination.',[
          'Select its Mapping Browser row and press the removal key. Leave mapping mode.'
        ],{keys:[['Remove selected mapping','Delete','Backspace']]})
      ]}),
      action('takeover','Pick up the value',R+'takeover-mode','Choose what happens when a physical knob and Live disagree.',[
        'Open Settings → Tempo & MIDI → Takeover Mode.'
      ],{terms:[['None','Jump immediately to the hardware value.'],['Pick-Up','Wait until the knob reaches Live’s value.'],['Value Scaling','Converge gradually as the knob moves.']]}),
      ref(S+'tempo--midi','MIDI ports',{
        details:[ref('routing-and-i-o#track','Track'),ref('routing-and-i-o#remote','Remote'),ref('routing-and-i-o#sync','Sync'),ref(S+'link','Link')]
      }),
      ref('routing-and-i-o#playing-midi-with-the-computer-keyboard','Typing keyboard',{keys:[['Computer MIDI Keyboard','M','M']]})
    ]}
  ];
  const neighborhoods=[
    {id:'navigation',name:'Navigation'}, {id:'browser',name:'Browser'},
    {id:'session',name:'Session'}, {id:'arrangement',name:'Arrangement'},
    {id:'mixer',name:'Mixer'}, {id:'routing',name:'Routing'},
    {id:'files',name:'Files'}, {id:'settings',name:'Settings & controllers'}
  ];
  const locations=new Map(),sourceHomes=new Map(),neighborhoodByPlace=new Map(),listScroll=new Map();
  let model,ctx,host,current,indexEsc,selectedNeighborhood='navigation',selectedEntry='switch-views';const variants=new Map();
  function organize(m){
    const old=new Map(areas.map(a=>[a.id,a]));
    const section=(chapter,anchor,label,children=true)=>{
      const key=chapter+'#'+anchor,node=m.manual.nodes.get(key);
      if(!node)throw Error('Unknown Workspace section: '+key);
      const extra={details:children?node.children.filter(n=>n.guide||n.existing).map(n=>section(chapter,n.anchor,n.title)):[]};
      return node.existing?core(node.id,label||node.title,{source:key,...extra}):ref(key,label||node.title,extra);
    };
    const group=(family,id,label,items)=>({family,id,label,items});
    const c=(id,label,details=[],extra={})=>core(id,label,{details,...extra});
    const f=(anchor,label,children=true)=>section('managing-files-and-sets',anchor,label,children);
    const a=(anchor,label,children=true)=>section('arrangement-view',anchor,label,children);
    const s=(anchor,label,children=true)=>section('session-view',anchor,label,children);
    const r=(anchor,label,children=true)=>section('routing-and-i-o',anchor,label,children);
    const mix=(anchor,label,children=true)=>section('mixing',anchor,label,children);
    const env=(anchor,label,children=true)=>section('automation-and-editing-envelopes',anchor,label,children);
    const browser=old.get('browser').items,places=browser[5],contents=places.details;
    places.details=[];
    const makeRoom=old.get('views').items.find(i=>i.id==='ws-make-room');
    const zoom=makeRoom.details.find(i=>i.id==='ws-zoom');
    const fold=makeRoom.details.find(i=>i.id==='ws-fold');
    const foldTracks=fold.details.shift();
    makeRoom.details=[fold];
    // Each lower-list place retains a small action bar. No chapter accordion.
    areas.splice(0,areas.length,
      ...['views','transport','editing'].map(id=>({...old.get(id),family:'navigation'})),
      group('browser','browser-search','Search & load',[browser[0],browser[1],browser[2],browser[6]]),
      group('browser','browser-filter','Filters & collections',[browser[3],browser[4]]),
      group('browser','browser-library','Library & folders',[places,...contents.slice(0,4)]),
      group('browser','browser-online','Packs & connections',contents.slice(4)),
      group('session','session-clips','Clip grid',[
        c('session','Open',[],{source:'session-view#session-view',steps:['Switch to Session View with Tab when Tab focus navigation is off, or use the Session View selector.','Click a clip’s body to select it. Its triangle launches playback; an empty slot is a place for another clip.']}),c('launch','Launch'),s('the-track-status-fields','Read playback'),
        s('select-on-launch','Select'),s('removing-clip-stop-buttons','Stop / keep playing')
      ]),
      group('session','session-scenes','Scenes',[
        c('scenes','Launch a row'),s('editing-scenes','Insert / collect'),
        s('editing-scene-tempo-and-time-signature-values','Set tempo / meter'),s('scene-view','Open Scene View')
      ]),
      group('session','session-record','Record a performance',[
        s('recording-sessions-into-the-arrangement','Record into Arrangement'),
        env('recording-automation-in-session-view','Record control changes')
      ]),
      group('arrangement','arrangement-timeline','Timeline',[
        c('arrangement','Open',[],{source:'arrangement-view#arrangement-view',steps:['Switch to Arrangement with Tab when Tab focus navigation is off, or use the Arrangement View selector.','Find the track on the vertical axis and the bar on the horizontal ruler. Click the background to place an insert marker; press Space to play.']}),zoom,a('navigation-and-zooming','Follow / overview'),
        a('launching-the-arrangement-with-locators','Place locators'),a('time-signature-changes','Change meter')
      ]),
      group('arrangement','arrangement-clips','Clips on the timeline',[
        a('selecting-clips-and-time','Select'),{...a('moving-and-resizing-clips','Move / trim'),steps:['Drag the clip’s title bar sideways to change its position, or vertically to another compatible track.','Drag a clip edge to change the portion that plays. The source recording remains unchanged.']},
        a('using-the-editing-grid','Snap'),c('split','Split'),c('consolidate','Join'),a('audio-clip-fades-and-crossfades','Fade')
      ]),
      group('arrangement','arrangement-time','Time & tracks',[
        c('arrangement-loop','Loop'),a('using-the-time-commands','Insert / remove time'),a('linked-track-editing','Link tracks')
      ]),
      group('arrangement','arrangement-automation','Automation',[
        c('automation','Draw / move points',[env('drawing-envelopes','Draw'),env('editing-breakpoints','Move / bend')]),
        env('recording-automation-in-arrangement-view','Record'),
        env('stretching-and-skewing-envelopes','Stretch'),
        env('inserting-automation-shapes','Insert a shape'),
        env('overriding-automation','Override / return'),env('deleting-automation','Delete')
      ]),
      group('arrangement','arrangement-envelopes','Envelope editing',[
        env('simplifying-envelopes','Simplify'),env('locking-envelopes','Lock'),
        env('edit-menu-commands','Copy / cut / paste'),env('editing-the-tempo-automation','Change tempo')
      ]),
      group('arrangement','arrangement-video','Video',[section('working-with-video','working-with-video','Place video')]),
      group('mixer','mixer-tracks','Tracks',[
        c('tracks','Select / move',[foldTracks],{steps:['Click a track’s title bar to select the track—not a clip inside it.','Drag the title bar to reorder the track. Drag its edge to change its width in Session or height in Arrangement.'],links:['rename','ws-write-note']}),c('new-midi','Add MIDI'),c('new-audio','Add audio'),mix('group-tracks','Group / unfold')
      ]),
      group('mixer','mixer-levels','Levels & pan',[
        c('mixer','Open',[],{steps:['Click the Mixer view control at the bottom right to show the mixer in Session or Arrangement.','Open the menu beside that control to show the sections you need, such as sends or inputs and outputs.']}),c('levels','Raise / lower'),c('track-mixer','Follow the signal'),
        mix('additional-mixer-features','Read meters'),a('the-mixer-in-arrangement-view','Show in Arrangement')
      ]),
      group('mixer','mixer-returns','Returns & Main',[c('sends','Send to a return'),c('main','Set the output')]),
      group('mixer','mixer-cue','Solo & cue',[mix('soloing-and-cueing','Solo / preview'),mix('using-lives-crossfader','Crossfade')]),
      group('mixer','mixer-timing','Timing & load',[
        mix('track-delays','Offset a track'),mix('keep-monitoring-latency-in-recording-track-toggles','Keep / remove latency'),mix('performance-impact-track-indicators','Check track load')
      ]),
      group('mixer','mixer-bounce','Bounce to audio',[
        section('bounce-to-audio','bouncing-individual-tracks','Bounce a track'),
        section('bounce-to-audio','bouncing-group-tracks','Bounce a group'),section('bounce-to-audio','pasting-bounced-audio','Paste audio')
      ]),
      group('routing','routing-audio','Audio connections',[
        {...r('external-audio-inout','Connect'),body:'Choose the hardware channel that feeds a track, and where its sound leaves Live.',steps:['Show the mixer’s In/Out section. On an audio track, choose Ext. In under Audio From, then the input channel.','Use the output choosers to select a destination. If a channel is missing, choose Configure and enable it in Audio Settings.'],terms:[['Input meter','Activity beside a channel helps identify the incoming signal.'],['Mono / stereo','Choose a single input or a pair to suit the source.']],images:['audioInput'],links:['settings']},r('monitoring','Listen to input'),r('resampling','Record the mix')
      ]),
      group('routing','routing-midi','MIDI connections',[
        r('external-midi-inout','Send / receive',false),r('midi-port-inputs-and-outputs','Enable ports'),
        r('connecting-external-synthesizers','Connect a synth'),r('midi-inout-indicators','Check activity')
      ]),
      group('routing','routing-internal','Between tracks',[
        r('internal-routings','Connect tracks',false),r('internal-routing-points','Choose a tap point'),
        r('post-effects-recording','Record after effects'),r('recording-midi-as-audio','Print an instrument'),r('creating-submixes','Combine outputs')
      ]),
      group('routing','routing-instruments','Shared instruments',[
        r('several-midi-tracks-playing-the-same-instrument','Share an instrument'),r('tapping-individual-outs-from-an-instrument','Separate outputs'),
        r('using-multi-timbral-plug-in-instruments','Address a part'),r('layering-instruments','Layer sounds'),r('feeding-sidechain-inputs','Feed a sidechain')
      ]),
      group('routing','routing-sync','Synchronization',[
        section('synchronizing-with-link-tempo-follower-and-midi','synchronizing-with-link-tempo-follower-and-midi','Connect clocks')
      ]),
      group('files','files-sets','Live Sets',[
        c('set','Open / new',[],{source:'managing-files-and-sets#creating-opening-and-saving-sets',steps:['Choose File → Open Live Set or Open Recent Set to open a saved document. In Live’s Browser, select a Set and press Enter, or double-click it.','Choose File → New Live Set for a fresh document. Save any work you want to keep before replacing the current Set.']}),c('save-set','Save / save as'),f('merging-sets','Bring in tracks'),f('template-sets','Save a template')
      ]),
      group('files','files-projects','Projects',[
        f('live-projects','Open the folder',false),f('projects-and-live-sets','Save another version'),f('projects-and-presets','Save a preset'),
        f('managing-files-in-a-project','Inspect dependencies'),f('packing-projects-into-packs','Pack')
      ]),
      group('files','files-samples','Samples & dependencies',[
        f('sample-files','Locate a source',false),f('viewing-and-changing-a-live-sets-file-references','Inspect references'),
        c('collect','Collect',[f('collect-files-on-export','Collect reusable items'),f('aggregated-locating-and-collecting','Collect several Sets')]),
        f('locating-missing-files','Relink'),f('finding-unused-files','Find unused files')
      ]),
      group('files','files-reuse','Reusable material',[
        f('live-clips','Save a Live Clip'),f('exporting-session-clips-as-new-sets','Save several clips'),
        f('midi-files','Import / export MIDI'),f('analysis-files-asd','Keep sample settings'),f('the-decoding-cache','Inspect the cache')
      ]),
      group('files','files-folders','Folders & versions',[
        f('how-do-i-create-a-project','Create a project'),f('how-can-i-save-presets-into-my-current-project','Store presets'),
        f('can-i-work-on-multiple-versions-of-a-set','Keep versions'),f('where-should-i-save-my-live-sets','Choose a folder'),
        f('can-i-use-my-own-folder-structure-within-a-project-folder','Organize folders')
      ]),
      group('files','files-export','Export',[
        c('export','Render'),f('selection-options','Choose tracks / range'),f('rendering-options','Set rendering'),
        f('encoding-options','Choose a format'),f('video-rendering-options','Include video'),f('real-time-rendering','Render hardware')
      ]),
      group('files','files-quality','Audio quality',[section('audio-fact-sheet','audio-fact-sheet','Check the signal path')]),
      ...['settings','controllers'].map(id=>({...old.get(id),family:'settings'}))
    );
    // Assign homes only after source IDs have been resolved by install().
    if(typeof manualCompletion!=='undefined')manualCompletion.extend(areas);
    if(typeof pushAtlas!=='undefined')areas.push(...pushAtlas.areas());
  }
  const owned=(id)=>locations.has(id);
  const chapterHomes={5:'set',6:'arrangement',7:'session',18:'mixer',20:'ref-bounce-to-audio--bouncing-individual-tracks',25:'automation',27:'ref-working-with-video--working-with-video',36:'ref-synchronizing-with-link-tempo-follower-and-midi--synchronizing-with-link-tempo-follower-and-midi',38:'ref-audio-fact-sheet--audio-fact-sheet'};
  const mainId=id=>typeof shortcutExplorer!=='undefined'&&shortcutExplorer.owned(id)?'shortcuts':locations.get(id)?.area.home||chapterHomes[model?.manual.nodes.get(model.entries.get(id)?.manualNode)?.chapterNumber]||id;
  const label=id=>areas.find(a=>a.home===id)?.label||(id==='shortcuts'?'Shortcuts':model.entries.get(id).title);
  function install(m){
    model=m;
    organize(m);
    const visit=(item,area,action,parents=[])=>{
      const node=item.key?m.manual.nodes.get(item.key):null;
      if(item.key&&!node)throw Error('Unknown Workspace source: '+item.key);
      const existing=item.id?m.entries.get(item.id):null;
      const original=existing&&atlasReference.items[item.id];
      const guide=node?.guide||(node?.existing?atlasReference.items[node.id]:null);
      const base=original||guide||{};
      item.data={body:existing?.body||guide?.body||'',steps:base.steps||[],terms:base.terms||[],note:base.note||'',images:m.entryCaptures?.[item.id]||guide?.images||[],keys:guide?.keys?.map(k=>[k.action,k.mac,k.win])||(existing?.key?[[existing.keyLabel||item.label,...existing.key]]:[]),...item};
      if(typeof workspaceMedia!=='undefined')Object.assign(item.data,workspaceMedia.items[item.key||item.id]||{});
      item.url=(item.source?m.manual.nodes.get(item.source)?.url:null)||original?.source||node?.url;
      if(!item.url)throw Error('Missing Workspace citation: '+item.label);
      if(!item.id)item.id=node.view==='workspace'&&!locations.has(node.id)?node.id:'ws-'+area.id+'-'+item.key.split('#')[1];
      // A control used in two local contexts gets a contextual route, not a stolen home.
      if(locations.has(item.id))item.id+='-'+action.label.toLowerCase().replace(/[^a-z]+/g,'-');
      if(!m.entries.has(item.id))m.entries.set(item.id,{id:item.id,view:'workspace',title:item.label,body:item.data.body,source:'manual',group:area.label});
      const loc={area,action,item,parents};locations.set(item.id,loc);
      if(node?.view==='workspace'&&!locations.has(node.id))locations.set(node.id,loc);
      const sourceKey=item.key||item.source||existing?.manualKey;
      if(sourceKey&&!sourceHomes.has(sourceKey))sourceHomes.set(sourceKey,loc);
      (item.details||[]).forEach(child=>visit(child,area,action,[...parents,item]));
    };
    areas.forEach(area=>{area.items.forEach(item=>visit(item,area,item));area.home=area.home||area.items[0].id;});
    // A Workspace source search should open its action, not a parallel prose page.
    // Other territories and shortcut-explorer routes keep their own homes.
    for(const loc of [...locations.values()]){
      const key=loc.item.source,node=key&&m.manual.nodes.get(key);
      if(node?.view==='workspace'&&!key.startsWith(K)&&!locations.has(node.id))locations.set(node.id,loc);
    }
    // Source roots and reference-only search results have a natural local landing.
    for(const [key,id] of [[B+'working-with-the-browser','browser'],[B+'search-bar','browser'],[B+'navigating-in-the-browser','hide-browser'],[S+'first-steps','settings'],[S+'lives-settings','settings'],[S+'learning-about-live',sourceHomes.get(S+'info-view').item.id]]){
      const node=m.manual.nodes.get(key);if(node&&!locations.has(node.id))locations.set(node.id,locations.get(id));
    }
    const landings={
      'managing-files-and-sets#managing-files-and-sets':'set',
      'managing-files-and-sets#file-management-faqs':sourceHomes.get('managing-files-and-sets#how-do-i-create-a-project').item.id,
      'arrangement-view#arrangement-view':'arrangement',
      'session-view#session-view':'session',
      'session-view#setting-up-the-session-view-grid':'session',
      'mixing#mixing':'mixer',
      'routing-and-i-o#routing-and-io':sourceHomes.get('routing-and-i-o#monitoring').item.id,
      'routing-and-i-o#making-use-of-internal-routing':sourceHomes.get('routing-and-i-o#post-effects-recording').item.id,
      'bounce-to-audio#bounce-to-audio':sourceHomes.get('bounce-to-audio#bouncing-individual-tracks').item.id,
      'automation-and-editing-envelopes#automation-and-editing-envelopes':'automation'
    };
    for(const [key,id] of Object.entries(landings)){
      const node=m.manual.nodes.get(key),loc=locations.get(id);
      if(!node||!loc)throw Error('Missing Workspace landing: '+key);
      sourceHomes.set(key,loc);if(!locations.has(node.id))locations.set(node.id,loc);
    }
    chapterHomes[17]=sourceHomes.get('routing-and-i-o#monitoring').area.home;
    for(const [id,loc] of locations)m.entries.get(id).atlasContext=[loc.area.label,...loc.parents.map(p=>p.label)].join(' › ');
    for(const group of neighborhoods){
      group.ids=areas.filter(a=>a.family===group.id).map(a=>a.home);
      if(group.id==='navigation')group.ids.push('shortcuts');
      for(const id of group.ids)neighborhoodByPlace.set(id,group);
    }
    m.topicGroups.workspace=neighborhoods;
  }
  const e=s=>ctx.esc(s);
  const text=s=>String(s||'').split(/(\{[A-Za-z]+\})/g).map(p=>{
    const k=atlasReference.keys[p.slice(1,-1)];return /^\{[A-Za-z]+\}$/.test(p)&&k?`<kbd>${e(k[ctx.platform()==='mac'?0:1])}</kbd>`:e(p);
  }).join('');
  const neighborhoodOf=id=>neighborhoodByPlace.get(mainId(id));
  const activeNeighborhood=()=>neighborhoods.find(g=>g.id===selectedNeighborhood);
  function listHTML(esc){
    return activeNeighborhood().ids.map(id=>`<button class="topic-item workspace-place${id===mainId(selectedEntry)?' selected':''}" data-entry="${id}" aria-pressed="${id===mainId(selectedEntry)}" aria-controls="insp-workspace"><span>${esc(label(id))}</span></button>`).join('');
  }
  function index(esc){
    indexEsc=esc;
    return `<div class="device-neighborhoods"><h3>Families</h3><nav class="device-neighborhood-grid" aria-label="Workspace families">${neighborhoods.map(g=>`<button data-workspace-neighborhood="${g.id}" aria-pressed="${g.id===selectedNeighborhood}" aria-controls="workspaceNeighborhoodList">${esc(g.name)}</button>`).join('')}</nav></div><h3 class="device-list-heading" id="workspaceNeighborhoodHeading">${esc(activeNeighborhood().name)}</h3><nav id="workspaceNeighborhoodList" class="workspace-places device-neighborhood-list" aria-labelledby="workspaceNeighborhoodHeading" tabindex="0">${listHTML(esc)}</nav>`;
  }
  function placeOptions(esc){
    const selected=mainId(selectedEntry),group=activeNeighborhood();
    return `<option value="" disabled ${group.ids.includes(selected)?'':'selected'}>Choose a place</option>`+group.ids.map(id=>`<option value="${id}" ${id===selected?'selected':''}>${esc(label(id))}</option>`).join('');
  }
  function picker(esc){return `<div class="topic-picker device-pickers workspace-pickers"><label>Family<select data-workspace-neighborhood-select aria-label="Workspace family">${neighborhoods.map(g=>`<option value="${g.id}" ${g.id===selectedNeighborhood?'selected':''}>${esc(g.name)}</option>`).join('')}</select></label><label>Place<select data-topic-picker="workspace" aria-label="Workspace place">${placeOptions(esc)}</select></label></div>`;}
  function selectNeighborhood(id){
    if(!neighborhoods.some(g=>g.id===id)||selectedNeighborhood===id)return;
    const list=document.querySelector('#workspaceNeighborhoodList');
    if(list)listScroll.set(selectedNeighborhood,list.scrollTop);
    selectedNeighborhood=id;
    document.querySelector('#workspaceIndex')?.querySelectorAll('[data-workspace-neighborhood]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.workspaceNeighborhood===id));
    const heading=document.querySelector('#workspaceNeighborhoodHeading');if(heading)heading.textContent=activeNeighborhood().name;
    if(list){list.innerHTML=listHTML(indexEsc);list.scrollTop=listScroll.get(id)||0;}
    const family=document.querySelector('[data-workspace-neighborhood-select]');if(family)family.value=id;
    const place=document.querySelector('[data-topic-picker="workspace"]');if(place)place.innerHTML=placeOptions(indexEsc);
  }
  function revealSelection(id){
    selectedEntry=id;
    const group=neighborhoodOf(id);if(!group)return;
    selectNeighborhood(group.id);
    const list=document.querySelector('#workspaceNeighborhoodList'),button=list?.querySelector(`[data-entry="${mainId(id)}"]`);
    if(button){const item=button.getBoundingClientRect(),bounds=list.getBoundingClientRect();if(item.top<bounds.top)list.scrollTop+=item.top-bounds.top;else if(item.bottom>bounds.bottom)list.scrollTop+=item.bottom-bounds.bottom;}
  }
  function body(loc){
    const {item,action,area,parents}=loc,d=item.data;
    const shownVariant=variants.get(item.id)||0;
    const variant=d.variants?.[shownVariant%d.variants.length];
    return `${parents.length?`<nav class="workspace-crumb" aria-label="Within ${e(area.label)}">${parents.map(p=>`<button data-entry="${p.id}">${e(p.label)}</button>`).join('<span aria-hidden="true">/</span>')}</nav>`:''}
      <h4 class="workspace-action-title" tabindex="-1">${e(item.label)}</h4>
      ${d.body?`<p class="workspace-description">${text(d.body)}</p>`:''}
      ${d.keys.length?`<div class="pilot-keys" aria-label="Keys in Live">${d.keys.map(([label,mac,win])=>`<span><small>${e(label)}</small><kbd>${e(ctx.platform()==='mac'?mac:win)}</kbd></span>`).join('')}</div>`:''}
      ${variant?`<div class="workspace-comparison" role="group" aria-label="Image examples">${d.variants.map((v,i)=>`<button data-workspace-image-entry="${item.id}" data-workspace-variant="${i}" aria-pressed="${i===shownVariant}">${e(v.label)}</button>`).join('')}</div>${ctx.captureFigure(variant.image)}${variant.text||variant.entry?`<p class="workspace-variant-caption">${e(variant.text||'')}${variant.entry?` <button data-entry="${variant.entry}">Explore ${e(variant.label)} ↗</button>`:''}</p>`:''}`:d.images.map(ctx.captureFigure).join('')}
      ${d.mediaNote?`<p class="workspace-variant-caption">${e(d.mediaNote)}</p>`:''}
      ${d.steps.length?`<ol class="reference-steps workspace-steps">${d.steps.map(s=>`<li>${text(s)}</li>`).join('')}</ol>`:''}
      ${d.terms.length?`<dl class="reference-terms workspace-controls" aria-label="Controls and behavior">${d.terms.map(([label,value])=>`<div><dt>${e(label)}</dt><dd>${text(value)}</dd></div>`).join('')}</dl>`:''}
      ${d.note?`<p class="clip-note">${text(d.note)}</p>`:''}
      ${d.links?.length?`<div class="detail-links">${d.links.map(id=>`<button data-entry="${id}">${id.startsWith('keys-')?'Keys · ':''}${e(model.entries.get(id).title)} ↗</button>`).join('')}</div>`:''}
      <div class="workspace-source"><a href="${e(item.url)}" target="_blank" rel="noreferrer">Ableton manual ↗</a>${ctx.flagHTML(item.id)}</div>
      ${(item.details||[]).map(child=>`<section class="workspace-inline" data-inline-entry="${child.id}">${body({...loc,item:child,parents:[]})}</section>`).join('')}`;
  }
  function mount(target,entry,context){
    ctx=context;host=target;const loc=locations.get(entry.id);if(!loc)return;
    if(current?.action!==loc.action)variants.clear();
    current={...loc,item:loc.action,parents:[]};
    host.innerHTML=`<div class="workspace-shell"><header class="workspace-local-nav"><h3 class="insp-title">${e(loc.area.label)}</h3><nav class="workspace-actions" aria-label="${e(loc.area.label)} topics">${loc.area.items.map(item=>`<button data-entry="${item.id}" ${item===loc.action?'aria-current="page"':''}>${e(item.label)}</button>`).join('')}</nav></header><div class="workspace-reading" tabindex="0" role="region" aria-label="${e(loc.action.label)} explanation">${body(current)}</div></div>`;
    host.scrollTop=0;
    if(loc.item!==loc.action)host.querySelector?.(`[data-inline-entry="${loc.item.id}"]`)?.scrollIntoView({block:'start'});
  }
  function click(ev){
    const family=ev.target.closest('[data-workspace-neighborhood]');
    if(family){selectNeighborhood(family.dataset.workspaceNeighborhood);return true;}
    const button=ev.target.closest('[data-workspace-variant]');if(!button)return false;
    const itemId=button.dataset.workspaceImageEntry||current.item.id;
    const shownVariant=Number(button.dataset.workspaceVariant);variants.set(itemId,shownVariant);
    const panel=host.querySelector('.workspace-reading'),scroll=panel.scrollTop;
    panel.innerHTML=body(current);panel.scrollTop=scroll;
    host.querySelector(`[data-workspace-image-entry="${itemId}"][data-workspace-variant="${shownVariant}"]`).focus({preventScroll:true});
    return true;
  }
  function setPlatform(){
    if(!host||!current)return;
    const panel=host.querySelector('.workspace-reading'),scroll=panel.scrollTop;
    const opened=Array.from(panel.querySelectorAll('details'),d=>d.open);
    panel.innerHTML=body(current);
    panel.querySelectorAll('details').forEach((d,i)=>d.open=Boolean(opened[i]));panel.scrollTop=scroll;
  }
  return {areas,locations,sourceHomes,neighborhoods,neighborhoodOf,activeNeighborhood,selectNeighborhood,revealSelection,picker,install,index,mount,owned,mainId,label,click,setPlatform};
})();
