/* Existing-territory pilot. Original worked examples, not a manual transcription.
   Source fragments are checked by reference.test.cjs --online.
   Record MIDI has its own action renderer; Origins keeps its historical sources. */
'use strict';
const atlasReference = (() => {
  const base='https://www.ableton.com/en/manual/';
  const keys={
    search:['⌘ F','Ctrl F'],views:['Tab','Tab'],detail:['⇧ Tab','Shift Tab'],
    browser:['⌘ ⌥ B','Ctrl Alt B'],settings:['⌘ ,','Ctrl ,'],
    undo:['⌘ Z','Ctrl Z'],redo:['⌘ ⇧ Z','Ctrl Y'],duplicate:['⌘ D','Ctrl D'],
    rename:['⌘ R','Ctrl R'],newMidi:['⌘ ⇧ T','Ctrl Shift T'],newAudio:['⌘ T','Ctrl T'],
    group:['⌘ G','Ctrl G'],save:['⌘ S','Ctrl S'],saveAs:['⌘ ⇧ S','Ctrl Shift S'],
    split:['⌘ E','Ctrl E'],consolidate:['⌘ J','Ctrl J'],export:['⌘ ⇧ R','Ctrl Shift R'],
    quantize:['⌘ U','Ctrl U'],quantizeSettings:['⌘ ⇧ U','Ctrl Shift U'],
    map:['⌘ M','Ctrl M'],io:['⌘ ⌥ I','Ctrl Alt I'],loop:['⌘ L','Ctrl L']
  };
  const items={};
  const add=(id,path,title,steps,terms,note,extra={})=>{
    items[id]={source:base+path,title,steps,terms,note,...extra};
  };
  // Workspace: finding, selecting and moving between real Live surfaces.
  add('browser','working-with-the-browser/#search-bar','Find and load a device',[
    'Select the destination track. Press {search} and type Drift.',
    'Choose the instrument result with the arrow keys; press Enter.',
    'Close the Browser with {browser} when you want the space back.'
  ],[['Search','Every word must match: “electric bass” finds items containing both. {search} also switches to the All label; type # and a name to search by tag.'],['Esc','Clears the search field and any selected tags. The field’s × clears only the text.'],['Filters','Narrow the results; an active filter can hide a match.'],['Preset','A saved device setup, rather than the device’s initial state.']],
  'Missing a result? Clear restrictive filters and check that the device is included in your Live edition.');
  add('switch-views','live-concepts/#arrangement-and-session','Switch views',[
    'Press {views} to move between Session and Arrangement.',
    'Find the same track by its name in the other view.'
  ],[['Session','Choose which clips play.'],['Arrangement','Place clips at positions on a timeline.']],
  'Tab changes views when Use Tab to Move Focus is off. Otherwise use the view selectors.',{noteTitle:'Tab moves focus instead'});
  add('device-view','working-with-instruments-and-effects/#device-view','Open a track’s devices',[
    'Double-click a track title to open its Device View.',
    'Click a device title to select that device. Drag its title to reorder it.'
  ],[['Track selection','Determines which chain is shown.'],['Activator','Turns the device’s processing on or off.'],['Fold','Double-click a device title to collapse its panel.']],
  'Shift + Tab swaps Clip and Device View when Tab focus navigation is off.');
  add('clip-view','clip-view/#clip-view-layout','Open a clip',[
    'Double-click a clip body, not its launch button.',
    'Drag the top edge of Clip View upward if you need more editing space.'
  ],[['Left panels','The selected clip’s playback and editing settings.'],['Editor','Notes for MIDI; a waveform for audio.']],
  'A blank clip panel can simply mean that no clip is selected. Select a clip before looking for its notes.');
  add('hide-browser','working-with-the-browser/#navigating-in-the-browser','Make room, then search again',[
    'Press {browser} to close the Browser.',
    'Press {search} when you need another sound or device.'
  ],[['Hidden Browser','The Set and loaded devices remain in place.'],['Search focus','Typing goes to the search field, not the musical keyboard.']],
  'Finish typing or leave the text field before using single-letter musical shortcuts.');
  add('transport','arrangement-view/#transport-and-playback','Start and stop playback',[
    'Click a position in Arrangement, then press Space.',
    'Press Space again to stop. Double-click Stop to return to the beginning.'
  ],[['Play / Stop','Move or stop the transport.'],['Tempo','The Set’s beat speed.'],['Arrangement Record','Writes to the timeline; it is not a Session slot’s Record button.']],
  'Changing views does not stop a launched Session clip. Check the active clip and the transport separately.');
  add('settings','first-steps/#lives-settings','Choose the audio output',[
    'Open Settings with {settings} and select Audio.',
    'Choose the output device connected to your headphones or speakers.',
    'Close Settings and play a sound at a comfortable listening level.'
  ],[['Input device','Where microphone or instrument audio enters.'],['Output device','Where Live sends sound.'],['Buffer size','Lower values reduce monitoring delay but demand more from the computer.']],
  'The screenshot shows this computer’s setup, not settings to copy. Device names and available choices vary.');
  add('mapping','midi-and-key-remote-control/#midi-remote-control','Map one hardware knob',[
    'Enable Remote for the controller’s input port in Settings.',
    'Enter MIDI Map Mode with {map}. Click a highlighted control and move the hardware knob.',
    'Leave Map Mode with {map}, then test the knob.'
  ],[['Track','Receives notes and other musical MIDI input.'],['Remote','Allows incoming MIDI to control mapped parameters.'],['Min / Max','Limits the mapped parameter’s travel.']],
  'No assignment appears? Check the input port’s Remote switch. A control-surface script may already handle the hardware.');
  add('undo','managing-files-and-sets/#accessing-a-sets-undo-history','Undo and redo an edit',[
    'After an unwanted edit, press {undo}.',
    'To restore the undone edit, press {redo}.'
  ],[['Undo','Steps back through edits.'],['Redo','Restores undone edits until a new edit changes that branch.']],
  'Undo is not a backup. Save a separate version before a large experiment.');
  add('duplicate','editing-midi/#editing-midi-notes','Duplicate a note',[
    'Open a MIDI clip and select one note.',
    'Press {duplicate}; move the selected copy with the arrow keys.'
  ],[['Selection','A note, clip, track or device can be the target.'],['Focus','The active editor determines which selection receives the command.']],
  'If a whole clip duplicates, the clip—not a note inside its editor—had focus.');
  add('rename','clip-view/#clip-name','Name a track or clip',[
    'Select the track title or clip you want to name.',
    'Press {rename}, type the name, then press Enter.'
  ],[['Track name','Identifies the track in both Session and Arrangement.'],['Audio clip name','Does not rename the source audio file.']],
  'Press Esc to cancel while the name is still being edited.');

  // Sets: separate playback, document structure, mixing and file operations.
  add('session','session-view/#session-view-clips','Play from the grid',[
    'Load two clips into different slots of one track.',
    'Launch one, then the other. Listen for the handover.'
  ],[['Column','One track; one Session clip can play in it at a time.'],['Row','A scene spanning several tracks.'],['Empty slot','May contain a Stop button, or a Record button when armed.']],
  'Moving to Arrangement View does not return playback to the Arrangement. Use Back to Arrangement when Session has taken over.');
  add('launch','launching-clips/#clip-launch-quantization','Launch a clip',[
    'Click the triangle beside a Session clip.',
    'To stop that track’s clip, click a square Stop button in its column.'
  ],[['Launch Quantization','When a requested launch takes effect.'],['Global','Uses the Control Bar’s quantization setting.']],
  'A flashing launch indicator can mean the clip is waiting for its quantized start, not that the click failed.');
  add('scenes','session-view/#tracks-and-scenes','Launch a row',[
    'Place clips on the same row of different tracks.',
    'Click that row’s Scene Launch triangle in the Main column.'
  ],[['Scene','Launches a row of slots together.'],['Empty slot with Stop','Stops that track’s currently playing Session clip.']],
  'Remove a slot’s Stop button when that scene should leave the track’s current clip running.',{noteTitle:'Keep a clip playing across scenes'});
  add('arrangement','arrangement-view/#moving-and-resizing-clips','Place a clip in time',[
    'Drag a clip’s title bar to the desired bar in Arrangement.',
    'Click before the clip and press Space to hear its entrance.'
  ],[['Horizontal','Time in bars and beats.'],['Vertical','Separate tracks.'],['Clip edge','Changes the visible playback region, not the track position.']],
  'If the timeline is not what you hear, check whether Session playback has overridden that track.');
  add('split','arrangement-view/#splitting-clips','Cut at one position',[
    'Click inside an Arrangement clip at the intended cut.',
    'Press {split}. Select either new clip to move it independently.'
  ],[['Insert marker','A single cut position.'],['Time selection','Cuts at both boundaries.']],
  'Splitting an audio clip does not cut the source file on disk.');
  add('consolidate','arrangement-view/#consolidating-clips','Make one clip from a span',[
    'Drag a time selection across the intended Arrangement material.',
    'Press {consolidate}. Check the new clip’s start and length.'
  ],[['Selection','Can include silence between clips.'],['Audio','Creates a new sample; track devices are not baked into it.'],['MIDI','Collects the selected notes into a new MIDI clip.']],
  'Consolidate is not a mix export. Use Export Audio when you need the processed sound.');
  add('arrangement-loop','arrangement-view/#the-arrangement-loop','Loop a time selection',[
    'Select a span of time in Arrangement.',
    'Press {loop}, then Space. Turn the Control Bar’s Loop switch off to continue beyond it.'
  ],[['Loop Start / Loop Length','Control Bar fields for typing the loop exactly. With nothing selected, the loop covers the whole Arrangement.'],['Loop Selection','{loop} turns the loop on and fits it to the selection; pressed again with a selection, it toggles the loop.'],['Moving the brace','← → nudge by the grid; ↑ ↓ jump by the loop’s length; ⌘/Ctrl ← → shorten or lengthen; ⌘/Ctrl ↑ ↓ double or halve. Drag an edge to move start or end, or the bar to move the whole loop.'],['Set Song Start Time Here','Brace context-menu option that makes playback start at the loop instead of the insert marker.']],
  'This loop repeats the timeline. A clip’s own Loop switch is separate.');
  add('automation','automation-and-editing-envelopes/#drawing-and-editing-automation','Draw a volume change',[
    'In Arrangement, turn off the Computer MIDI Keyboard if needed; press A for Automation Mode.',
    'Click a track’s volume control to select its envelope.',
    'Add breakpoints on the envelope and move one to make a change over time.'
  ],[['Breakpoint','A value at a time position.'],['Envelope','The parameter’s changing value.'],['Re-enable Automation','Restores envelope control after a manual override.']],
  'If a control stops following its envelope after you move it, check Re-enable Automation.');
  add('set','managing-files-and-sets/#live-sets','Save a named Set',[
    'Press {save}. Choose a name and a location for this piece.',
    'Before a major alternate version, use {saveAs} with a distinct name.'
  ],[['.als','The editable Set document.'],['Project folder','The surrounding files used by one or more related Sets.'],['Audio export','A rendered sound file, not an editable Set.']],
  'An .als alone may still depend on audio stored elsewhere. Collect the referenced media before moving a project.');
  add('tracks','mixing/#audio-and-midi-tracks','Choose a track type',[
    'For notes played through an instrument, insert a MIDI track with {newMidi}.',
    'For a microphone, recorded audio or an audio file, insert an audio track with {newAudio}.'
  ],[['MIDI track','Note input, MIDI clips and an instrument.'],['Audio track','Audio input and audio clips.'],['Return track','Receives audio from sends.']],
  'The same track’s mixer and device chain serve its Session and Arrangement material.');
  add('new-midi','mixing/#audio-and-midi-tracks','Add a playable MIDI track',[
    'Press {newMidi}.',
    'Search for Drift with {search} and load the instrument result.',
    'Check MIDI From, Monitor Auto and Arm before playing your keyboard.'
  ],[['MIDI From','Which controller or track supplies notes.'],['Instrument','Produces sound from those notes.']],
  'An empty MIDI track can receive notes without producing audio. Load an instrument first.');
  add('new-audio','mixing/#audio-and-midi-tracks','Add an audio track',[
    'Press {newAudio}.',
    'Drag an audio file into an empty slot or onto that track’s Arrangement lane.'
  ],[['Audio clip','Plays an audio file.'],['Audio From','Selects an input when recording or monitoring.']],
  'Do not load an instrument onto this track. Instruments belong on MIDI tracks.');
  add('mixer','mixing/#the-live-mixer','Find a track in the mix',[
    'Play a clip and locate its moving meter.',
    'Lower its volume fader, then return it to the intended level.'
  ],[['Meter','Shows signal level.'],['Volume','Adjusts the track’s level.'],['Solo','Isolates a track for listening; it is not record arm.']],
  'Solo can make other tracks seem silent. Check lit Solo buttons before changing routing.');
  add('track-mixer','routing-and-i-o/#internal-routings','Follow a track’s output',[
    'Show In/Out with {io}.',
    'Read Audio To on the track. Follow that destination to its output meter.'
  ],[['Audio To','Where this track sends audio.'],['Main','The usual destination for the final mix.'],['Group','Can be an intermediate destination for grouped tracks.']],
  'A moving track meter does not guarantee sound at the speakers. Check every destination through to the audio output device.');
  add('levels','mixing/#the-live-mixer','Adjust level and position',[
    'Play two tracks together. Lower the louder track with its volume fader.',
    'Move one Pan control left or right and listen in stereo.'
  ],[['0 dB','Unity gain, not silence.'],['−∞ dB','No output from the fader.'],['Pan','Default stereo-track panning behaves as a balance control.']],
  'A centered pan value does not make a stereo signal mono. Utility’s Mono switch is a different operation.');
  add('sends','mixing/#return-tracks-and-the-main-track','Use a shared reverb',[
    'Select a Return track containing Reverb; set that effect fully wet.',
    'Raise the matching Send on a source track a little.',
    'Use the Return’s fader to balance the shared effect.'
  ],[['Send','Amount fed into the return. Pre/Post on each return chooses whether sends are tapped before or after the source’s pan, volume and Activator; Pre makes an independent monitor mix.'],['Return','The effect path shared by source tracks. Add one with Create → Insert Return Track; hide them via View → Mixer Controls → Return Tracks.'],['Return sends','Disabled by default, because routing a return to itself creates feedback. Right-click a return’s Send → Enable Send.'],['Main track','Where every track goes by default; its effects (often compression or EQ, for mastering) process the whole mix. There is only one.']],
  'On a return, a dry component can duplicate the original signal. For this parallel reverb example, use Dry/Wet at 100%.');
  add('main','routing-and-i-o/#external-audio-inout','Check the final output',[
    'Play the Set and watch the Main meter.',
    'Check Main Out’s channel pair and the Audio Output Device in Settings.'
  ],[['Main meter','The final mix level before the selected hardware output.'],['Cue','A separate listening path when configured.']],
  'Keep the final output below clipping. If Main moves but nothing is audible, inspect the hardware destination and its volume.');
  add('save-set','managing-files-and-sets/#creating-opening-and-saving-sets','Save the editable work',[
    'Press {save}; name the Set when saving it for the first time.',
    'Use {saveAs} for an alternate version you want to keep alongside this one.'
  ],[['Save','Updates the Set document.'],['Collect','Copies referenced media into its project.'],['Export','Makes a rendered audio file.']],
  'For a new piece, save outside another piece’s existing Project folder to create a separate project.');
  add('collect','managing-files-and-sets/#collecting-external-files','Gather referenced audio',[
    'Save the Set, then choose File → Collect All and Save.',
    'Choose which external locations to collect from and confirm.',
    'Move or share the whole Project folder, not just its .als file.'
  ],[['Which locations','Anything outside the Project folder counts as external: Packs, the User Library, other Projects, elsewhere on disk. Skipping Packs and the User Library keeps the Project smaller, if you will not move or uninstall them.'],['Where files go','Audio into the Project’s Samples folder, devices into its Presets folder.'],['File Manager route','Manage Files → Manage Set → External Files lists files by location with a count and size. Show reveals them in the Browser; turn on Collect Into Project per location, then Collect and Save.'],['Not included','Plug-in software and its licenses.']],
  'Collecting media does not make a Set compatible with every Live edition or replace missing plug-ins.');
  add('export','managing-files-and-sets/#exporting-audio-and-video','Render a listening copy',[
    'Select the intended time range in Arrangement and press {export}.',
    'Check Rendered Track, Render Start and Render Length. Choose the required format.',
    'Export, then listen to the saved file from start to finish.'
  ],[['Rendered Track','Which output is written.'],['Range','The time span; leave room for a reverb or delay tail.'],['Format','The file type and encoding settings.']],
  'A silent or wrong export can come from the selected range or playback state. Confirm you hear the intended Arrangement before rendering.');

  // Clips: concrete editing examples, with the current stills explicitly retained.
  add('clips','live-concepts/#audio-and-midi','Inspect a clip’s contents',[
    'Double-click a clip to open Clip View.',
    'Look for note rectangles or an audio waveform.'
  ],[['MIDI','Events sent to an instrument.'],['Audio','A region of recorded sound.']],
  'An audio waveform is not editable as individual MIDI notes. MIDI notes do not contain the instrument’s sound.');
  add('midi-clip','editing-midi/#creating-a-midi-clip','Create an empty MIDI clip',[
    'Select a MIDI track containing an instrument.',
    'Double-click an empty Session slot. Double-click in the Note Editor to add a note.'
  ],[['Vertical position','Pitch.'],['Horizontal position','When a note starts.'],['Width','Note duration.'],['Velocity lane','How strongly each note is triggered.']],
  'The example is one bar of C3, E3, G3, E3. Fold and Highlight Scale are off; no scale workflow is required.');
  add('audio-source','audio-clips-tempo-and-warping/#importing-samples','Load recorded sound',[
    'Drag an audio file onto an audio track.',
    'Double-click the clip to inspect its waveform and playback region.'
  ],[['Waveform','A view of the recorded amplitude over time.'],['Clip','Playback settings plus a reference to that file.']],
  'If the file plays at an unexpected speed, inspect Warp and the Set tempo before editing the waveform.');
  add('record-audio','recording-new-clips/#recording-into-session-slots','Record into an empty slot',[
    'Choose Audio From → Ext. In and the microphone or instrument channel. Use headphones when monitoring a microphone.',
    'Choose Monitor Auto and arm the audio track. Check its input meter.',
    'Click a circle in an empty Session slot. Click the clip’s launch button to finish the take; Space stops playback.'
  ],[['Mono input','One channel, such as a single microphone.'],['Stereo input','A pair, such as 1/2.'],['Monitor Off','Use when hearing the input directly through your interface.']],
  'Hearing two copies or an echo? Avoid monitoring the same input through both Live and the interface.',{detailSource:base+'routing-and-i-o/#monitoring'});
  add('capture','recording-new-clips/#capturing-midi','Keep a phrase you just played',[
    'Play on an armed or monitored MIDI track with an instrument.',
    'Click Capture MIDI after playing. Open the resulting clip and inspect its notes.'
  ],[['Capture','Recovers buffered MIDI playing without starting a take first.'],['Record','A deliberately started recording.']],
  'Capture MIDI does not recover microphone audio. The track must have been receiving MIDI while you played.');
  add('edit-notes','editing-midi/#editing-midi-notes','Change one note',[
    'Open a MIDI clip and click a note.',
    'Use ↑ / ↓ to change pitch; drag its right edge to change length.',
    'Duplicate it with {duplicate}, or press Delete to remove it.'
  ],[['B','Turns Draw Mode on or off outside a text field.'],['Grid','The time divisions edits snap to.'],['Velocity','A note property; its audible effect depends on the instrument.']],
  'If clicking keeps drawing notes, turn Draw Mode off before selecting and dragging.');
  add('quantize','editing-midi/#quantizing-notes','Move notes toward a grid',[
    'Select the notes to change. Open Quantize Settings with {quantizeSettings}; turn Auto off before changing settings.',
    'Choose a grid, Start and/or End, and an Amount. Click Transform.',
    'Listen. Use {undo} to compare with the original timing.'
  ],[['Grid','Target time division.'],['Start / End','Which note boundary moves.'],['Amount','How far notes move toward the target.'],['Auto','Applies changes as you adjust settings. With Auto off, use Transform.']],
  'Use {quantize} to repeat the last quantize settings; open settings first when you need to know what will change.',{detailSource:base+'midi-tools/#using-midi-tools'});
  add('loop','clip-view/#clip-and-loop-region-settings','Set a clip’s repeating region',[
    'Open the clip and enable Loop.',
    'Adjust the loop brace or its Position and Length fields. Launch the clip.'
  ],[['Start','Where playback initially begins.'],['Position / Length','The region repeated by the clip loop.']],
  'Audio clip looping requires Warp. The Arrangement Loop switch does not turn a clip’s own loop on.');
  add('warp','audio-clips-tempo-and-warping/#warp-markers','Align one event',[
    'Open an audio clip and turn Warp on.',
    'Double-click above a clear transient in the Sample Editor to make a Warp Marker.',
    'Drag the marker onto the intended beat. Listen before adding more markers.'
  ],[['Transient','A detected event in the audio.'],['Warp Marker','Pins an audio position to musical time. ⌘ I / Ctrl I adds one at the insert marker; the arrow keys move a selected one.'],['Moving and deleting','Shift-drag from a selected marker to slide the waveform beneath it. Double-click a marker, or select its time and press Delete, to remove it.'],['Warp Mode','The stretching method, chosen for the material.']],
  'Moving one marker can stretch surrounding audio. Add deliberate anchors where neighboring events should stay fixed.');

  // Signal flow: short operations, not a substitute for the instrument catalog.
  add('chain','working-with-instruments-and-effects/#using-devices','Build a small chain',[
    'On a MIDI track, load Drift, then load Utility.',
    'Play a note. Switch Utility off and on using its activator to compare.'
  ],[['Before the instrument','MIDI processing.'],['After the instrument','Audio processing.'],['Left → right','Processing order.']],
  'An audio effect cannot turn an empty MIDI track into a sound source.');
  add('midi-effects','working-with-instruments-and-effects/#using-devices','Put an effect before the sound',[
    'Drag Arpeggiator from the Browser to the left of an instrument.',
    'Hold several notes and compare with Arpeggiator switched off.'
  ],[['Input','Note and controller messages.'],['Output','Changed MIDI messages, still not audio.']],
  'The source clip still shows its original notes. The device changes what reaches the instrument during playback.');
  add('instrument','working-with-instruments-and-effects/#using-devices','Load a sound source',[
    'Select a MIDI track, search with {search}, and load an instrument result.',
    'Arm the track with Monitor Auto, then play your keyboard.'
  ],[['MIDI in','The played or sequenced events.'],['Audio out','The sound generated by the instrument.']],
  'A sample instrument may also need a sample loaded. For the first test, Drift provides a self-contained sound.');
  add('audio-effects','working-with-instruments-and-effects/#using-devices','Process a playing sound',[
    'Select a track already making sound. Load Utility after its instrument, or onto an audio track.',
    'Adjust Gain, then bypass Utility to compare at a comfortable level.'
  ],[['Audio in','An existing sound.'],['Audio out','The processed result.']],
  'No input sound means there is nothing for this effect to process.');

  // Device examples use the actual captured panel and a deliberately small gesture.
  const device=(id,chapter,anchor,title,steps,terms,note)=>add(id,chapter+'/#'+anchor,title,steps,terms,note,{termsTitle:'Controls'});
  const inst='live-instrument-reference',fx='live-audio-effect-reference',midi='live-midi-effect-reference',racks='instrument-drum-and-effect-racks';
  device('simpler',inst,'simpler','Play one sample',[
    'Load Simpler on a MIDI track. Drop your own short recording onto its waveform area.',
    'Choose Classic and play two different keys. Compare with One-Shot.'
  ],[['Classic','Pitched playing with an amplitude envelope.'],['One-Shot','Trigger or gate a single sample.'],['Slicing','Different notes address different slices.']],
  'An empty waveform means there is no sample loaded.');
  device('sampler',inst,'sampler','Inspect a sample’s range',[
    'Load a Sampler preset and open its Zone editor.',
    'Play low and high notes while watching which sample zones respond.'
  ],[['Key zone','Note range for a sample.'],['Velocity zone','Playing-strength range.'],['Root key','The sample’s original pitch reference.']],
  'Sampler availability depends on your edition or license. Simpler is a separate device, not the same panel.');
  device('drift',inst,'drift','Change a held tone',[
    'Load Drift on a MIDI track and hold a note.',
    'Move Filter Frequency down, then back up. Release the note.'
  ],[['Oscillators','Sound sources.'],['Filter','Removes or emphasizes frequency regions.'],['Envelope','A time-varying shape triggered by playing.']],
  'Keep the initial sound simple while identifying one control.');
  device('operator',inst,'operator','Hear one oscillator modulate another',[
    'Load Operator’s default state and hold a note.',
    'Raise oscillator B’s Level gradually, then return it to its starting level.'
  ],[['Algorithm','Oscillator connections.'],['Level','An oscillator’s output or modulation amount, depending on its connection.'],['Envelope','How that oscillator changes over a note.']],
  'A different algorithm changes what raising B does. Start from the default for this example.');
  device('wavetable',inst,'wavetable','Scan through a wavetable',[
    'Load Wavetable and hold a note.',
    'Move oscillator 1’s Position slowly through its range.'
  ],[['Table','A collection of waveforms.'],['Position','The current place within that collection.'],['Matrix','Connections from modulation sources to destinations.']],
  'Position is not pitch. Compare the changing tone while holding the same key.');
  device('analog',inst,'analog','Open a synth section',[
    'Load Analog and click the Osc 1 section.',
    'Compare waveform choices while repeating the same note; then select Fil 1.'
  ],[['Osc','Oscillator.'],['Fil','Filter.'],['Amp','Amplifier and its envelope.']],
  'The central display changes with the selected section; it is not a separate device.');
  device('electric',inst,'electric','Change the electric-piano mechanism',[
    'Load Electric and play a repeated chord.',
    'Adjust Mallet Stiffness a little, then compare at the original setting.'
  ],[['Mallet','Excites the modeled fork.'],['Fork','The resonating components.'],['Pickup','Converts their movement into the output tone.']],
  'These are model parameters, not controls for an external electric piano.');
  device('collision',inst,'collision','Change the resonating object',[
    'Load Collision and repeat a short note.',
    'Compare Resonator 1’s available object types with the same phrase.'
  ],[['Mallet / Noise','Excitation sources.'],['Resonators','The modeled objects that respond.'],['Decay','How long the resonance persists.']],
  'Different models can vary greatly in level. Keep playback low while comparing.');
  device('utility',fx,'utility','Check a sound in mono',[
    'Load Utility on a playing stereo track.',
    'Turn Mono on, listen, then turn it off.'
  ],[['Gain','Level adjustment.'],['Width','Stereo spread.'],['Mono','Combines left and right.']],
  'A centered Balance control does not sum stereo to mono.');
  device('eq-eight',fx,'eq-eight','Adjust one frequency band',[
    'Load EQ Eight and select an enabled bell-shaped band.',
    'Move its dot slightly up or down; bypass the device to compare.'
  ],[['Frequency','Center or cutoff position.'],['Gain','Boost or cut where the chosen filter supports it.'],['Q','Band width or resonance.']],
  'A disabled band will not change the sound.');
  device('auto-filter',fx,'auto-filter','Move a filter cutoff',[
    'Load Auto Filter on a sustained sound; choose a low-pass filter.',
    'Lower Frequency, then bring it back up. Keep Resonance modest.'
  ],[['Frequency','Cutoff.'],['Resonance','Emphasis around the cutoff.'],['LFO / Envelope','Sources of cutoff movement.']],
  'If cutoff moves without your hand, inspect its modulation amounts.');
  device('compressor',fx,'compressor','See gain reduction',[
    'Loop a sound and load Compressor.',
    'Lower Threshold until the gain-reduction meter responds. Compare with the device bypassed.'
  ],[['Threshold','Level where compression begins.'],['Ratio','Strength of level reduction above threshold.'],['Attack / Release','Response timing.']],
  'Louder is not necessarily better. Match listening levels when comparing.');
  device('saturator',fx,'saturator','Compare a little drive',[
    'Load Saturator and raise Drive slightly.',
    'Reduce Output to keep the comparison close in loudness; bypass and listen.'
  ],[['Drive','Level into the nonlinear stage.'],['Curve','The shaping behavior.'],['Output','Level after processing.']],
  'Start quietly; extra drive can raise the output level.');
  device('delay',fx,'delay','Hear a timed repeat',[
    'Load Delay after a short sound. Use synced timing and a modest Dry/Wet setting.',
    'Play one note, then compare two delay-time divisions.'
  ],[['Time','Space between repeats.'],['Feedback','Amount returned for further repeats.'],['Dry/Wet','Original/effect balance.']],
  'Keep Feedback low while exploring; high feedback can build up.');
  device('echo',fx,'echo','Change the repeat’s character',[
    'Load Echo after a short sound with modest Feedback and Dry/Wet.',
    'Compare two filter settings while the repeats fade.'
  ],[['Echo','Delay time and filtering.'],['Modulation','Movement of the delay.'],['Character','Additional behavior such as noise or wobble.']],
  'Begin with little feedback and a low listening level.');
  device('reverb',fx,'reverb','Hear the tail',[
    'Load Reverb after an instrument and play a short chord.',
    'Compare short and long Decay Time values; release the keys between tests.'
  ],[['Decay Time','How long reverberation persists.'],['Size','The modeled space.'],['Dry/Wet','Original/reverberant balance.']],
  'On a shared Return track, use fully wet Reverb and adjust the source Send.');
  device('chorus',fx,'chorus-ensemble','Compare moving layers',[
    'Load Chorus-Ensemble after a sustained tone.',
    'Increase Amount a little and compare with the device bypassed.'
  ],[['Mode','Chorus, Ensemble or Vibrato behavior.'],['Rate','Modulation speed.'],['Amount','Modulation depth.']],
  'Check the result in mono as well as stereo if width is important.');
  device('arpeggiator',midi,'arpeggiator','Turn held notes into a pattern',[
    'Place Arpeggiator before an instrument and hold three notes.',
    'Compare Rate divisions, then shorten Gate.'
  ],[['Style','Note order.'],['Rate','Pattern speed.'],['Gate','Note length relative to Rate.']],
  'If notes continue after release, inspect Hold.');
  device('chord',midi,'chord','Add one interval',[
    'Place Chord before an instrument; keep Use Current Scale off for semitone values.',
    'Set one Shift to +12 st and play a single note.'
  ],[['Shift','Added pitch relative to the incoming note.'],['Scale awareness','Can change pitch controls from semitones to scale degrees.']],
  'The input note is still present; Chord adds notes rather than replacing it.');
  device('pitch',midi,'pitch','Transpose without editing the clip',[
    'Place Pitch before an instrument. With Use Current Scale off, set Pitch to +12 st.',
    'Play the clip, then bypass Pitch.'
  ],[['Pitch','Transposition amount.'],['Range / Lowest','The input-note range affected.']],
  'The original note positions in the clip stay unchanged.');
  device('velocity',midi,'velocity','Change the playing response',[
    'Put Velocity before a velocity-sensitive instrument.',
    'Repeat the same phrase while making a small change to Drive.'
  ],[['Drive / Compand','Reshape the velocity response.'],['Random','Adds variation to output velocity.']],
  'The instrument determines whether velocity changes volume, tone, or something else.');
  device('note-length',midi,'note-length','Change outgoing note duration',[
    'Place Note Length before an instrument with a sustained sound.',
    'Use note-on triggering; compare short and long Length settings.'
  ],[['Length','Outgoing note duration.'],['Gate','Scales that duration.'],['Trigger','Whether processing is triggered by note-on or note-off.']],
  'A one-shot sample may ignore note length. Use a sustained patch for this comparison.');
  device('instrument-rack',racks,'creating-racks','Put an instrument in a Rack',[
    'Select an instrument’s title bar and press {group}.',
    'Show the Rack’s chain list and Macro controls. Rename the chain after its sound.'
  ],[['Chains','Parallel instrument paths.'],['Key zones','Which keys reach each chain.'],['Macros','Named controls mapped to parameters inside.']],
  'Grouping an instrument creates a Rack around it; it does not automatically add a second layer.');
  device('drum-rack',racks,'drum-racks','Put a sample on one pad',[
    'Load an empty Drum Rack and drag a short sample onto one pad.',
    'Play that pad’s MIDI note. Select the pad to see its devices.'
  ],[['Pad','A note-addressed chain.'],['Chain','The instrument and effects for that pad.'],['Returns','Shared effects inside the Rack.']],
  'An empty pad is silent. Select a populated pad when looking for its sample controls.');
  device('audio-rack',racks,'signal-flow-and-parallel-device-chains','Make two effect paths',[
    'Select an audio effect and press {group}. Show the chain list.',
    'Create another chain from the list’s context menu; leave it empty for a dry path.',
    'Balance the two chains at low levels.'
  ],[['Series','Devices along one chain.'],['Parallel','Separate chains receiving the input together.'],['Chain volume','Contribution from each path.']],
  'An empty audio chain passes dry audio. Adding one can increase the combined level.');
  device('midi-rack',racks,'signal-flow-and-parallel-device-chains','Group MIDI processing',[
    'Select a MIDI effect before an instrument and press {group}.',
    'Show the Rack’s chain list. Keep the instrument after the Rack.'
  ],[['Chains','Parallel MIDI processing paths.'],['Macros','Control mapped parameters inside the Rack.']],
  'Parallel MIDI chains can emit duplicate notes. This Rack still needs an instrument downstream.');

  function text(value,esc,platform){
    return String(value).split(/(\{[A-Za-z]+\})/g).map(part=>{
      const key=keys[part.slice(1,-1)];
      return /^\{[A-Za-z]+\}$/.test(part)&&key?`<kbd>${esc(key[platform==='mac'?0:1])}</kbd>`:esc(part);
    }).join('');
  }
  function render(id,{esc,platform}){
    const r=items[id];if(!r)return '';
    const t=value=>text(value,esc,platform);
    const source=(url,label)=>`<a class="reference-source" href="${esc(url)}" target="_blank" rel="noreferrer">${esc(label)} ↗</a>`;
    return `<div class="reference-depth" aria-label="${esc(id)} reference">
      <section class="reference-section"><h4>${esc(r.title)}</h4><ol class="reference-steps">${r.steps.map(s=>`<li>${t(s)}</li>`).join('')}</ol>${source(r.source,'Manual · this action')}</section>
      <section class="reference-section"><h4>${esc(r.termsTitle||'Controls')}</h4><dl class="reference-terms">${r.terms.map(([term,description])=>`<div><dt>${esc(term)}</dt><dd>${t(description)}</dd></div>`).join('')}</dl>${source(r.detailSource||r.source,'Manual · reference')}</section>
      <section class="reference-section"><h4>${esc(r.noteTitle||'Notes')}</h4><p>${t(r.note)}</p></section>
    </div>`;
  }
  return {items,keys,render};
})();
