// Original native 2× PNGs; rectangles affect presentation only.
// Document rectangles were measured in a 1989×1248 preview, not the older
// 1225×769 captures. Settings/menu rectangles are in original source pixels.
const workspaceMedia=(()=>{
  const captures={},items={},pending={};
  const B='working-with-the-browser#',S='first-steps#',K='live-keyboard-shortcuts#';
  function frame(id,file,title,caption,rect,width=4112,height=2580,extra={}){
    captures[id]={file:`native/${file}.png`,title,caption,alt:`${title} in Ableton Live. ${caption}`,width,height,pixelRatio:2,...(rect?{crop:rect}:{}),...extra};
  }
  const doc=(id,file,title,caption,rect,extra={})=>frame(id,file,title,caption,rect.map((n,i)=>Math.round(n*(i%2?2580/1248:4112/1989))),4112,2580,extra);
  const settings=(id,file,title,caption,rect)=>frame(id,file,title,caption,rect,1450,1576,{contextLabel:'Settings window'});
  const menu=(id,file,title,caption,width,height,rect)=>frame(id,file,title,caption,rect,width,height,{contextLabel:'Full menu'});
  const image=(key,...ids)=>items[key]={images:ids};
  const variants=(key,list)=>items[key]={images:[],variants:list.map(([label,image,text=''])=>({label,image,text}))};
  const defer=(key,reason)=>{pending[key]=reason;items[key]={images:[]};};

  doc('wsSelection','ws-selection','Selected track','The light title bar selects track 2 MIDI.',[540,66,358,120]);
  doc('wsDuplicate','ws-duplicate','Duplicated track','The copied track is selected and named 3 MIDI.',[540,66,358,120]);
  doc('wsRestored','ws-restored','After Undo','The extra MIDI track is gone; the audio tracks follow 2 MIDI again.',[540,66,358,120]);
  doc('wsInfo','ws-info-view','Info View','Help for Clip View appears at the lower left of Live.',[9,883,293,120]);
  doc('wsLearn','ws-learn-view','Learn View','Topic filters and the first lesson.',[1615,409,360,477],{previewHeight:500});
  doc('wsFilters','ws-browser-filters','Browser filters','Sounds is selected; Piano & Keys narrows the results.',[9,66,405,370],{previewHeight:390});
  doc('wsFilterTags','ws-browser-filters','Sounds tags','Piano & Keys is selected. More specific tags appear beneath it.',[138,98,276,160]);
  doc('wsResults','ws-browser-filters','Filtered results','The results bar shows the active filter and the Clear and Add Label controls.',[138,256,276,180]);
  doc('wsHistory','ws-browser-filters','Browser history','Back and forward arrows beside the search field.',[9,66,405,30]);
  doc('wsCollections','ws-browser-filters','Collections','Colored Collection labels in the Browser sidebar.',[9,97,129,120]);
  doc('wsPlaces','ws-user-library','Places','Packs, connected services and local folders.',[9,617,129,217]);
  doc('wsContentTypes','ws-user-library','Content types','Live’s built-in Library labels.',[9,242,129,354],{previewHeight:380});
  doc('wsFolderButton','ws-user-library','Add Folder','The folder shortcut at the bottom of Places.',[9,736,129,99]);
  doc('wsProject','ws-current-project','Current Project contents','The Samples folder in the currently open, unsaved Set.',[138,97,276,64]);
  doc('wsProjectLocation','ws-current-project','Current Project location','Current Project selected in Places.',[9,735,129,100]);
  doc('wsLibrary','ws-user-library','User Library folders','Clips, Defaults, Grooves, Presets, Samples and Templates.',[138,273,276,240]);
  for(const [id,title,y] of [['Clips','Clips',297],['Defaults','Defaults',322],['Grooves','Grooves',345],['Presets','Presets',393],['Samples','Samples',441],['Templates','Templates',465]])
    doc('wsFolder'+id,'ws-user-library',title+' folder',title+' in the User Library.',[138,y,276,32]);
  doc('wsPacks','ws-packs','Installed Packs','Installed Pack folders; Grand Piano is selected.',[138,448,276,364],{previewHeight:380});
  doc('wsCloud','ws-cloud','Enable Ableton Cloud','The sign-in entry point. No Cloud library is connected.',[138,98,276,106]);
  doc('wsPush','ws-push','Push transfer','Connection instructions; no Push is connected.',[138,99,276,139]);
  doc('wsQuickTags','ws-quick-tags','Quick tags','Tags for the selected piano preset.',[138,793,276,54]);
  doc('wsPreview','ws-quick-tags','Browser preview','Preview switch, waveform and Raw control beneath the selected preset.',[138,846,276,25]);
  doc('wsTagEditor','ws-tag-editor','Tag editor','The selected preset’s Sounds tags in the Tag Editor.',[414,68,155,379],{previewHeight:400});
  doc('wsFollow','ws-restored','Follow','The Follow switch beside the song position display.',[704,25,138,31]);
  doc('wsTypingKeys','ws-restored','Computer MIDI Keyboard','The keyboard icon is orange when enabled.',[1609,25,69,31]);
  doc('wsTempo','ws-restored','Tempo','Tap and the tempo field in the Control Bar.',[139,25,89,31]);
  doc('wsTempoLane','ws-tempo-lane','Tempo automation lane','Main → Mixer → Song Tempo. No automation points have been added.',[1229,712,511,134]);
  menu('wsContextMenu','ws-track-menu','Track context menu','Commands for the selected track, with their Mac shortcuts.',650,986,[0,0,650,626]);
  menu('wsFilterMenu','ws-filter-menu','Filter menu','Show or hide filter groups and open the tag editors.',434,682);
  menu('wsMetronomeMenu','ws-metronome-menu','Metronome menu','Count-in, sound and rhythm.',542,454);
  menu('wsCountIn','ws-metronome-menu','Count-in','One bar is selected.',542,454,[0,0,542,101]);
  menu('wsTempoMenu','ws-tempo-menu','Tempo context menu','Show Automation opens the tempo envelope.',436,190);
  settings('wsDisplay','ws-display','Display','Language, interface zoom, focus outlines and label visibility.',[388,82,1034,452]);
  settings('wsKeyboard','ws-display','Keyboard behavior','Tab focus navigation and other keyboard preferences.',[388,552,818,226]);
  settings('wsMouse','ws-display','Mouse behavior','Mouse and pen-input preferences.',[388,798,818,230]);
  settings('wsTheme','ws-theme','Theme & contrast','Appearance, tone, contrast and brightness.',[388,82,1034,566]);
  settings('wsTrackColors','ws-theme','Track colors','Track color preferences.',[388,666,1034,274]);
  settings('wsLibrarySettings','ws-library-settings','Browser preferences','File collection and Places visibility.',[388,82,1034,336]);
  settings('wsContentPaths','ws-library-settings','Content locations','User Library and Pack locations on this computer.',[388,438,1034,282]);
  settings('wsStorage','ws-storage','File handling','Temporary files and analysis-file preferences.',[388,82,1034,350]);
  settings('wsMaxPath','ws-storage','Max application','The configured Max application location.',[388,456,1034,146]);
  settings('wsDecoding','ws-storage','Decoding cache','Cache location, capacity and cleanup controls.',[388,626,1034,266]);
  settings('wsPlugins','ws-plugins','Plug-in sources','Audio Units and VST locations and scanning. These are this computer’s settings.',[388,82,1034,638]);
  settings('wsPluginWindows','ws-plugins','Plug-in windows','Opening, hiding and resizing plug-in windows.',[388,738,1034,232]);
  settings('wsRecordDefaults','ws-record-defaults','Recording defaults','Recording and file-format preferences, not recommended values.',[388,82,1034,450]);
  settings('wsWarpDefaults','ws-record-defaults','Warp defaults','Default Warp behavior for imported audio.',[388,550,1034,282]);
  settings('wsLaunchDefaults','ws-record-defaults','Launch defaults','Default clip launch behavior.',[388,846,1034,340]);
  settings('wsTapDefault','ws-record-defaults','Tap Tempo default','Playback behavior when tapping a tempo.',[388,1186,1034,144]);
  settings('wsInstallation','ws-installation','Authorization','Edition and authorization controls; no account credentials shown.',[388,82,1034,424]);
  settings('wsUpdates','ws-installation','Maintenance','Updates and usage-data preferences on this installation.',[388,552,1034,310]);
  settings('wsMidiPorts','ws-midi-ports','MIDI ports','Input and Output Ports headings. No MIDI port rows are connected.',[388,740,1034,228]);
  settings('wsControlSurfaces','ws-midi-ports','Control surfaces','Control Surface, Input and Output selectors.',[388,376,1034,354]);
  settings('wsLink','ws-link','Link','Link and Link Audio settings. No session has been joined.',[388,82,1034,460]);

  // Workspace gestures: small crops of original native captures, never redrawn UI.
  doc('wsEditorEdge','ws-note-status','Clip View divider','The horizontal gap above the turquoise Clip title is the resize edge.',[9,848,531,107]);
  doc('wsBrowserEdge','ws-restored','Browser divider','The vertical gap between the Browser and the tracks is its resize edge.',[280,66,265,216]);
  doc('wsFolded','ws-device-folded','Folded Drift','Drift’s narrow title strip sits beside the unfolded Utility.',[9,966,220,237]);
  doc('wsTrackFold','arrangement','Track fold control','The round disclosure beside 1 Drift folds or unfolds its Arrangement lane.',[1555,141,180,110]);
  doc('wsRuler','arrangement','Arrangement ruler','The overview at the top, numbered beat-time ruler, then the scrub area above the tracks.',[423,66,597,130]);
  doc('wsFit','arrangement','Fit height / width','H and W at the lower-right of Arrangement.',[1580,907,171,49]);
  doc('wsNoteStatus','ws-note-status','Selected-note readout','Time, pitch, velocity and probability appear along the bottom of Live.',[50,1210,589,29]);
  doc('wsSelectedNote','ws-note-status','Selected MIDI note','The E3 note has a light outline; adjacent notes are not selected.',[855,1028,406,48]);
  doc('wsCpu','ws-restored','CPU and overload indicators','The percentage meter and the dark indicator area to its right. Both are idle here.',[1730,25,180,30]);
  doc('wsNudge','ws-restored','Tempo nudge buttons','The two striped buttons immediately to the right of the BPM field.',[138,25,138,31]);
  doc('wsGainDefault','ws-device-folded','Utility Gain: 0 dB','Gain is at its default. Drag the knob vertically or select it and type.',[137,996,79,99]);
  doc('wsGainTyped','ws-value-typed','Utility Gain: −6 dB','A typed value; the control remains selected.',[137,996,79,99]);
  doc('wsInfoNote','ws-info-note','A note on a track','An original lesson note entered in the selected track’s Info View.',[9,883,293,100]);
  doc('wsKeyTarget','ws-key-map','Mapped tempo control','The example key j appears on the selected tempo target in Key Map Mode.',[136,25,140,31]);
  doc('wsKeySwitch','ws-key-map','Key Map Mode','The KEY switch is lit while assignments are being edited.',[1620,25,107,31]);
  doc('wsMappingRow','ws-key-map','Mapping Browser','A temporary key assignment with its destination and editable Min / Max fields.',[9,68,567,77]);
  settings('wsTakeover','ws-midi-ports','Takeover Mode','The chooser below the Control Surface rows. None is this installation’s current value.',[450,734,514,68]);

  variants('ws-make-room',[['Editor edge','wsEditorEdge'],['Browser edge','wsBrowserEdge']]);
  variants('ws-fold',[['Folded','wsFolded'],['Unfolded','chain']]);
  image('ws-fold-tracks','wsTrackFold');image('ws-zoom','wsRuler');image('ws-pan','wsRuler');image('ws-fit','wsFit');
  variants('ws-read-feedback',[['Readout','wsNoteStatus'],['Selected note','wsSelectedNote']]);
  image('ws-cpu','wsCpu');image('ws-disk','wsCpu');image('ws-tap-tempo','wsTempo');image('ws-nudge-tempo','wsNudge');
  variants('ws-select',[['Track title','wsSelection'],['Note','wsSelectedNote']]);
  image('ws-adjust','wsGainDefault');
  variants('ws-type-value',[['Typed','wsGainTyped'],['Default','wsGainDefault']]);
  variants('ws-reset-value',[['Before reset','wsGainTyped'],['After reset','wsGainDefault']]);
  variants('ws-write-note',[['Write','wsInfoNote'],['Open the field','wsContextMenu']]);
  variants('ws-key-map',[['Target','wsKeyTarget'],['KEY switch','wsKeySwitch'],['Assignment','wsMappingRow']]);
  for(const id of ['revise-map','range','invert-range','remove-map'])image('ws-'+id,'wsMappingRow');
  items['ws-range'].mediaNote='The capture shows untouched default limits, not recommended tempo limits.';
  image('ws-takeover','wsTakeover');

  image(K+'general-keyboard-navigation-and-workflow','wsSelection');
  image(K+'using-lives-context-menu','wsContextMenu');
  image(K+'using-tab-for-navigation','wsKeyboard');
  image(S+'info-view','wsInfo');image(S+'learn-view','wsLearn');image(S+'other-learning-resources','wsLearn');
  image(B+'content-pane','wsResults');image(B+'browser-history','wsHistory');image(B+'saving-search-results-as-custom-labels','wsResults');
  variants(B+'previewing-files',[['Preview bar','wsPreview'],['Cue volume','main']]);
  variants(B+'adding-content-from-the-browser-to-a-live-set',[['Find','browser'],['Loaded','chain']]);
  image(B+'filters-and-tags','wsFilters');image(B+'filter-groups','wsFilterMenu');image(B+'tags','wsFilterTags');
  image(B+'tag-editor','wsTagEditor');image(B+'quick-tags','wsQuickTags');image(B+'collections','wsCollections');
  image(B+'places','wsPlaces');image(B+'library','wsContentTypes');image(B+'user-folders','wsFolderButton');
  variants(B+'current-project',[['Location','wsProjectLocation'],['Contents','wsProject']]);
  image(B+'user-library','wsLibrary');
  for(const [key,id] of [['presets','Presets'],['clips','Clips'],['samples','Samples'],['defaults','Defaults'],['templates','Templates'],['grooves','Grooves']])image(B+key+'-folder','wsFolder'+id);
  image(B+'downloading-and-installing-packs-in-the-browser','wsPacks');
  image(B+'using-ableton-cloud','wsCloud');items[B+'using-ableton-cloud'].mediaNote='Sign-in screen; no Cloud content shown.';
  image(B+'transferring-files-from-push-3-in-standalone-mode','wsPush');items[B+'transferring-files-from-push-3-in-standalone-mode'].mediaNote='No Push connected in this capture.';
  image('arrangement-view#navigation-and-zooming','wsFollow');image('ws-tempo','wsTempo');
  variants('automation-and-editing-envelopes#editing-the-tempo-automation',[['Open the lane','wsTempoMenu'],['Tempo lane','wsTempoLane']]);
  variants('recording-new-clips#metronome-settings',[['Control bar','timing'],['Menu','wsMetronomeMenu']]);
  image('recording-new-clips#recording-with-count-in','wsCountIn');
  variants('ws-record-controls',[['Track arm','pilotArmOff'],['Record controls','transport']]);
  image(S+'audio','settings');
  variants(S+'display--input',[['Display','wsDisplay'],['Keyboard','wsKeyboard'],['Mouse','wsMouse']]);
  variants(S+'theme--colors',[['Theme','wsTheme'],['Track colors','wsTrackColors']]);
  variants(S+'library',[['Browser','wsLibrarySettings'],['Locations','wsContentPaths']]);
  variants(S+'file--folder',[['Files','wsStorage'],['Decoding cache','wsDecoding'],['Max','wsMaxPath']]);
  variants(S+'plug-ins',[['Sources','wsPlugins'],['Windows','wsPluginWindows']]);
  variants(S+'record-warp--launch',[['Record','wsRecordDefaults'],['Warp','wsWarpDefaults'],['Launch','wsLaunchDefaults'],['Tap Tempo','wsTapDefault']]);
  variants(S+'licenses--updates',[['Authorization','wsInstallation'],['Updates','wsUpdates']]);
  image(S+'installation-and-authorization','wsInstallation');
  variants('duplicate',[['Selected','wsSelection'],['Duplicated','wsDuplicate']]);
  variants('undo',[['Before Undo','wsDuplicate'],['After Undo','wsRestored']]);
  variants(S+'tempo--midi',[['Ports','wsMidiPorts'],['Control surfaces','wsControlSurfaces']]);
  items[S+'tempo--midi'].mediaNote='Port rows appear when a MIDI device is connected.';
  image(S+'link','wsLink');image('routing-and-i-o#playing-midi-with-the-computer-keyboard','wsTypingKeys');

  // These are capture gaps, not completed illustrations or substitute pictures.
  defer(K+'momentary-latching-shortcuts','Tap versus hold needs a time-based demonstration; videos are deferred.');
  defer(K+'accessing-menus','The macOS menu bar was not available to the approved window-only capture method.');
  defer(B+'chord-banks','No Chord Banks folder is present in this installed User Library.');
  defer(B+'managing-files-in-the-user-library','Needs a prepared, non-private dependency example.');
  defer(B+'pack-info','Pack Info has not yet been captured; the installed Pack list is not a substitute.');
  defer(B+'abl-assets','Requires a connected Cloud library and permission to show its content.');
  for(const key of ['splice','logging-into-splice','searching-for-splice-samples','working-with-splice-samples','splice-library','splice-settings'])
    defer(B+key,'Signed-in Splice screens may expose private library or account content; capture requires approval.');
  for(const key of ['track','remote','sync'])defer('routing-and-i-o#'+key,'A connected MIDI device is needed to show actual port switches.');
  return {captures,items,pending};
})();
