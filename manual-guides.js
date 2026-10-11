// Original atlas summaries and examples. The section tree comes from the manual;
// these guides do not reproduce its narrative or claim parameter-complete coverage.
const manualGuides = (() => {
  const items={};
  const put=(chapter,anchor,body,title,steps,terms=[],note='',images=[])=>{
    items[chapter+'#'+anchor]={body,title,steps,terms,note,images};
  };
  const chapter=(slug,body,title,steps,terms,note,images)=>put(slug,slug,body,title,steps,terms,note,images);
  chapter('welcome-to-live','Live combines a playable clip grid, a timeline, instruments and audio processing in one Set.','Two ways into the same Set',[
    'Open Session to work with launchable clips. Open Arrangement to place material in time.',
    'Use the Workspace references for navigation, or follow a familiar control into its technical reference.'
  ],[['Atlas','Original explanations, examples and your flags.'],['Manual','The complete official source, linked by section.']], 'These references describe Live 12. Edition, installed Packs and point release affect availability.');
  chapter('first-steps','Setup, audio devices, interface preferences and Live’s built-in help.','Check a new installation',[
    'Open Settings and choose the audio output you are actually listening through.',
    'Check the MIDI input for a connected keyboard. Use Info View to identify an unfamiliar control.'
  ],[['Audio','Input/output devices and latency.'],['Tempo & MIDI','MIDI ports and controller configuration.'],['Info View','Help for the item under the pointer.']], 'Do not copy another computer’s device names or buffer size blindly.',['settings']);
  chapter('live-concepts','The objects in a Live Set and how sound passes between them.','Follow one sound',[
    'Open a MIDI clip, then the track’s instrument.',
    'Follow its device chain to the track mixer and onward to Main.'
  ],[['Clip','Notes or an audio-file reference.'],['Track','Clips, devices and routing.'],['Set','The complete editable document.']], 'Session and Arrangement share tracks, not independent mixers.',['chain']);
  chapter('working-with-the-browser','Find, preview and load devices, presets, samples and project files.','Find something by name',[
    'Use Live’s search shortcut, type a name, then inspect the matching result type.',
    'Select the destination track before loading a device. Clear filters if an expected result is missing.'
  ],[['Collections','Your color-tagged shortcuts.'],['Places','Libraries, Packs and folders.'],['Filters','Constraints on the current results.']], 'Previewing a sample is separate from putting it in a track.',['browser']);
  chapter('managing-files-and-sets','Set documents, media dependencies, project folders and export.','Prepare a project to move',[
    'Save the Set into its project, then use Collect All and Save for referenced media.',
    'Move the entire project folder and verify it opens at the destination.'
  ],[['.als','Editable Set.'],['.asd','Analysis and sample-related information.'],['Export','Rendered audio or video rather than a Set.']], 'Collecting audio does not install plug-ins or transfer their licenses.');
  chapter('arrangement-view','Place, edit and automate material along a timeline.','Make a small arrangement',[
    'Place two clips on the timeline, then trim or split one at a clear boundary.',
    'Loop the working span and listen to the join before editing more tracks.'
  ],[['Clip selection','An object to move or copy.'],['Time selection','A span that can include silence.'],['Locator','A named timeline position.']], 'Check Back to Arrangement when Session clips have taken over playback.',['arrangement']);
  chapter('session-view','A performance grid: clips run by track, scenes launch across tracks.','Combine two clips',[
    'Launch clips on separate tracks.',
    'Launch a new clip on one track while leaving the other running.'
  ],[['Track','One Session clip plays at a time.'],['Scene','A row of slots launched together.'],['Stop button','Stops a track’s current Session clip.']], 'An empty slot with a Stop button can stop a playing track when its scene launches.',['session']);
  chapter('clip-view','The selected clip’s content and its playback properties.','Inspect without launching',[
    'Double-click the clip body to open Clip View.',
    'Locate its Start and Loop controls, then its notes or waveform.'
  ],[['Clip panels','Timing, pitch and clip-level settings.'],['Editor','Notes, waveform or envelopes.'],['Selection','Determines which clip is being edited.']], 'The clip editor does not show the entire Set.',['midiSample']);
  chapter('audio-clips-tempo-and-warping','Map recorded audio onto bars and beats without committing an edit to the source file.','Check a loop’s timing',[
    'Open the audio clip and inspect Warp, the first beat and the loop length.',
    'Listen against the metronome before moving individual Warp Markers.'
  ],[['Warp','Relates sample time to musical time.'],['Marker','An anchor between the two.'],['Mode','The method used to stretch audio.']], 'Re-Pitch couples speed and pitch; other modes offer different material-dependent tradeoffs.',['warp']);
  chapter('editing-midi','Create and edit note events: pitch, timing, length, velocity and probability.','Edit a small selection',[
    'Open a MIDI clip and select only the notes you intend to change.',
    'Move or resize them, then compare with Undo.'
  ],[['Grid','Editing time divisions.'],['Velocity','A note’s playing-strength value.'],['Probability','How often a note is allowed to play.']], 'Fold, scales and multi-clip editing are optional layers, not prerequisites for entering notes.',['midiSample']);
  chapter('midi-tools','Transform existing notes or generate new note patterns inside a MIDI clip.','Preview a transformation deliberately',[
    'Duplicate the clip, select notes and choose a tool in the Transform panel.',
    'Turn Auto off while choosing settings; apply the transformation when ready.'
  ],[['Transform','Changes selected material.'],['Generate','Creates notes in the target region.'],['Auto','Applies changes as settings move.']], 'Generators can replace existing notes in their target region. Keep a copy when comparing alternatives.',['quantize']);
  chapter('editing-mpe','Per-note pitch, pressure and slide, rather than one shared expression curve for every note.','Inspect one expressive note',[
    'Open a MIDI clip’s MPE/Note Expression editor and select a note.',
    'Choose an expression lane and edit its envelope; audition with an MPE-capable sound.'
  ],[['Pitch','A bend belonging to one note.'],['Pressure','Per-note pressure data.'],['Slide','An additional per-note expressive dimension.']], 'The controller, input configuration and instrument all need compatible MPE handling.');
  chapter('converting-audio-to-midi','Extract note or rhythm estimates from audio, or map audio slices to MIDI notes.','Choose what should survive conversion',[
    'Select an audio clip and open its conversion commands.',
    'Use Slice to keep pieces of the original sound; use Melody, Harmony or Drums to estimate events for a new instrument.'
  ],[['Slice','MIDI triggers chunks of the original audio.'],['Convert','MIDI plays a newly loaded sound.']], 'Conversion is an estimate. Inspect wrong pitches, missing notes and extra attacks.');
  chapter('using-grooves','Apply a reusable timing and velocity pattern to clips.','Compare a groove without committing it',[
    'Drag a groove from the Browser onto a clip.',
    'Adjust its contribution in the Groove Pool, then compare with the clip’s groove set to None.'
  ],[['Timing','How much the groove moves events.'],['Velocity','How much its accents affect notes.'],['Commit','Writes the groove’s result into the clip.']], 'Audio clips need Warp for groove timing. Keep a copy before committing.');
  chapter('using-tuning-systems','Set-wide pitch layouts beyond standard twelve-tone equal temperament.','Inspect an alternate tuning',[
    'Save an alternate Set, then load a tuning from the Browser’s Tunings label.',
    'Look at the changed note labels and check the instrument’s tuning support.'
  ],[['Scala / ASCL','Tuning-file formats.'],['Reference pitch','The frequency reference.'],['Track options','How individual MIDI tracks and controllers use the tuning.']], 'Changing a tuning affects pitch interpretation; it is not just changing the clip’s scale highlight.');
  chapter('launching-clips','Choose when a clip starts, how it responds to a trigger and what happens afterward.','Change the response of one clip',[
    'Open a Session clip’s launch controls.',
    'Compare Trigger and Gate with the same clip, then return to the intended mode.'
  ],[['Launch mode','Response to press, hold and release.'],['Quantization','The launch-time boundary.'],['Follow Action','A subsequent action after a chosen interval.']], 'A clip’s launch quantization can override the global setting.');
  put('routing-and-i-o','routing-and-io','Choose where signals enter, how they are monitored and where they leave.','Trace a silent track',[
    'Read the track’s input source and channel. Check Monitor and Arm.',
    'Follow its output destination to Main and the hardware output.'
  ],[['In','Monitor incoming signal continuously.'],['Auto','Monitoring follows arming and clip playback.'],['Off','No software monitoring of the input.']], 'Avoid feeding an output back into its own input. Check hardware cabling before enabling a new return path.',['midiInput']);
  chapter('mixing','Track balance, groups, returns, cueing and the final output.','Balance two tracks',[
    'Play both tracks together and adjust their faders.',
    'Use Solo briefly to inspect a sound, then return to the combined mix.'
  ],[['Activator','Mutes or enables a track.'],['Solo','Isolates a listening selection.'],['Return','A shared effect path.']], 'Record Arm and Solo are different controls.',['mixer']);
  chapter('recording-new-clips','Select an input, prepare the track, then record into Session or Arrangement.','Choose the recording destination',[
    'Check input, monitoring and Arm before recording.',
    'Use an empty Session slot for a clip take, or Arrangement Record for a timeline take.'
  ],[['Count-in','A lead-in before recording begins.'],['Overdub','Adds MIDI to existing material.'],['Capture MIDI','Recovers recent MIDI playing without a started take.']], 'Arming does not start recording. Use headphones when monitoring a microphone.',['pilotArmOn']);
  chapter('bounce-to-audio','Render processing into audio while working inside the Set.','Keep the editable source',[
    'Save a version of the Set before replacing a track.',
    'Choose the appropriate Bounce command and inspect what is rendered and what remains editable.'
  ],[['Bounce','Creates audio from the source and its processing.'],['New track','Keeps a separate destination where supported.'],['Tail','Sound that continues after the played events.']], 'Bounce options vary across Live 12 releases. Confirm the command available in your installation before replacing the source.');
  chapter('comping','Assemble a main performance from portions of alternate takes.','Choose one passage from a take',[
    'Show Take Lanes on an Arrangement track and audition the alternatives.',
    'Choose a time region from a take for the main lane; listen across both boundaries.'
  ],[['Take lane','An alternate recording or source region.'],['Main lane','The assembled performance.'],['Source highlight','The part of a take currently used above.']], 'A smooth join can need adjusted boundaries or fades even when the selected notes are right.');
  chapter('stem-separation','Estimate separate vocals, drums, bass and other material from a mixed audio source.','Separate a short source first',[
    'Select an audio clip and choose Separate Stems to New Audio Tracks when available.',
    'Choose the parts and quality setting, then inspect each resulting track.'
  ],[['Vocals / Drums / Bass','Detected source categories.'],['Others','Material outside those categories.'],['Quality mode','Processing-time and result-quality tradeoff.']], 'Separation is not recovery of the original multitrack. Bleed and artifacts can remain; availability depends on your Live version and edition.');
  chapter('working-with-instruments-and-effects','Load, arrange, bypass, save and replace devices in a track.','Compare processing in context',[
    'Select a track already making sound and load an appropriate device.',
    'Adjust one parameter, then bypass the device to compare at a similar level.'
  ],[['MIDI effect','Before the instrument.'],['Instrument','MIDI becomes audio.'],['Audio effect','After the sound source.']], 'Replacing an instrument is different from adding an audio effect after it.',['chain']);
  chapter('instrument-drum-and-effect-racks','Containers for device chains, layers, splits and mapped Macro controls.','Group a device',[
    'Select a device title and use Group.',
    'Open the new Rack’s chain list and Macro panel to inspect its structure.'
  ],[['Chain','One signal path inside a Rack.'],['Zone','A range deciding which events reach a chain.'],['Macro','A mapped control for one or more parameters.']], 'Parallel audio chains can add level; parallel MIDI chains can create duplicate notes.');
  chapter('automation-and-editing-envelopes','Parameter changes that follow the timeline or a recorded performance.','Draw and compare a change',[
    'Show Arrangement automation and select a parameter.',
    'Add an envelope change, play through it, then compare with your original setting.'
  ],[['Breakpoint','Value at a time position.'],['Override','Manual control temporarily supersedes automation.'],['Re-enable','Returns control to the envelope.']], 'Track automation and a clip’s modulation envelope are not interchangeable.',['automation']);
  chapter('clip-envelopes','Parameter motion attached to a clip, including loops independent of the clip’s note pattern.','Inspect a clip envelope',[
    'Open the clip’s Envelopes editor and choose a device or mixer parameter.',
    'Draw a small change and play the clip. Check whether the lane is automation or modulation.'
  ],[['Automation','Specifies parameter values.'],['Modulation','Changes a parameter relative to its current setting.'],['Unlinked loop','An envelope cycle with its own length.']], 'An unlinked envelope can evolve across several repetitions of a shorter note loop.');
  chapter('working-with-video','Put picture on the Arrangement timeline while editing its accompanying music.','Load a picture reference',[
    'Import a supported movie into Arrangement.',
    'Check the video window and align the intended start before composing against it.'
  ],[['Arrangement','The video playback location.'],['Session','Movie files behave as audio clips here.'],['Export','Check both picture and sound options.']], 'Video support depends on the file format and platform. A codec problem is not necessarily a timeline problem.');
  chapter('live-audio-effect-reference','Processors for sound: filtering, dynamics, space, movement, distortion and analysis.','Choose an effect by its job',[
    'Select a device below to inspect its role and controls.',
    'Load it after an instrument or on an audio track; compare with bypass.'
  ],[['Dynamics','Level-dependent processing.'],['Time / space','Delays and reverberation.'],['Analysis','Meters and displays that help inspect sound.']], 'Device availability and panel versions differ across Live editions and releases.');
  chapter('live-midi-effect-reference','Processors for notes and control messages before an instrument.','Compare the outgoing notes',[
    'Place a MIDI effect before an instrument.',
    'Play the same clip with the effect active and bypassed.'
  ],[['Pitch','Which notes reach the instrument.'],['Timing / length','When notes begin or end.'],['Velocity / CC','How the receiving device is played or controlled.']], 'The source clip is not rewritten by a track’s MIDI-effect chain.');
  chapter('live-instrument-reference','Live’s native sound generators and sample-playing instruments.','Choose a sound source',[
    'Select an instrument below, then find it by name in Live’s Browser.',
    'Load it on a MIDI track; sample instruments also need suitable sample content.'
  ],[['Synthesis','Generate sound from an oscillator or model.'],['Sampling','Play or manipulate a recording.'],['External Instrument','Route MIDI out and audio back from another instrument.']], 'These are device references, not a required sequence for learning synthesis.');
  chapter('max-for-live','An environment for using and building custom instruments, effects and MIDI tools.','Use a Max device before editing it',[
    'Load a Max for Live device from the Browser and use its exposed controls.',
    'Save your own preset. Open Edit in Max only when you intend to work on the patch itself.'
  ],[['Device','The playable interface inside Live.'],['Patch','The objects and connections that implement it.'],['Dependencies','Other files required by that patch.']], 'Freezing a Max device bundles dependencies; it is different from freezing a Live track.');
  chapter('max-for-live-devices','Bundled Max instruments, processors, modulators and MIDI utilities.','Choose a modulator',[
    'Select a device below and inspect what generates its control signal.',
    'Map it to a parameter with a small range before widening the movement.'
  ],[['LFO','Repeating control motion.'],['Envelope Follower','Motion derived from incoming audio level.'],['Expression Control','Motion derived from playing gestures.']], 'Mappings can control parameters on other devices; inspect their destinations before reusing a preset.');
  chapter('midi-and-key-remote-control','Assign hardware controls or computer keys to Live parameters and actions.','Make a small mapping',[
    'Enable the appropriate Remote input, then enter MIDI Map Mode.',
    'Select a parameter, move the hardware control, and leave Map Mode to test it.'
  ],[['Control surface','A scripted integration.'],['Manual mapping','Your explicit assignment.'],['Takeover','How a hardware position meets an existing software value.']], 'A mapped keyboard note may stop acting as a musical note on that key.',['mapping']);
  chapter('using-push-1','Push 1’s pads, encoders and modes for playing, sequencing and controlling Live.','Identify the active mode',[
    'Confirm the connected hardware is Push 1.',
    'Choose Note for playing or Session for launching, then follow the relevant section below.'
  ],[['Pads','Their meaning follows the current mode.'],['Encoders','Their assignments follow the selected device or mixer page.']], 'This chapter documents Push 1, not Push 2 or Push 3. No connected Push hardware is assumed.');
  chapter('using-push-2','Push 2’s display-led browsing, sampling, sequencing and mixing controls.','Work from the selected track',[
    'Select a track and inspect the display’s current mode.',
    'Choose a playing, clip, device or mixer operation from the sections below.'
  ],[['Note / Session','Playing and clip-launching surfaces.'],['Display','Context for the current encoder assignments.']], 'This chapter documents Push 2. Current Push hardware has its own separate manual.');
  chapter('synchronizing-with-link-tempo-follower-and-midi','Coordinate Live with another app, performer or hardware clock.','Choose the kind of synchronization',[
    'Use Link for compatible peers, Tempo Follower for an audio-led tempo, or MIDI Sync for a MIDI clock connection.',
    'Check who controls tempo and transport before recording a synchronized take.'
  ],[['Link','Shared tempo and beat phase.'],['Tempo Follower','Tempo inferred from an audio input.'],['MIDI Sync','Clock or timecode from an external timing source.']], 'Timing synchronization is separate from sending notes. Link Audio is a separate capability in supported versions.');
  chapter('computer-audio-resources-and-strategies','Diagnose CPU pressure, disk overloads and dropouts in a real-time Set.','Find the limiting resource',[
    'Watch CPU and disk indicators while reproducing the problem.',
    'Save a version, then simplify one demanding track or increase the audio buffer and compare.'
  ],[['CPU','Processing must finish before the next audio buffer.'],['Disk','Media must be read or written in time.'],['Buffer','Trades monitoring delay for processing headroom.']], 'Change one variable at a time; lowering a buffer is not a cure for CPU overload.');
  chapter('audio-fact-sheet','Technical distinctions between operations that preserve samples and operations that change them.','Check the signal path before comparing',[
    'Compare sources at matched levels with processing and routing accounted for.',
    'Inspect the exact operation below when sample-rate conversion, rendering or gain behavior matters.'
  ],[['Neutral operation','Preserves samples under the stated conditions.'],['Non-neutral operation','Intentionally transforms the signal.']], 'Neutral does not mean musically preferable; the conditions of the comparison matter.');
  chapter('midi-fact-sheet','Timing behavior, latency and the limits of MIDI across software and hardware.','Separate timing problems',[
    'Compare internal clip playback with the external instrument or controller path.',
    'Inspect monitoring delay, MIDI transport and the receiving device separately.'
  ],[['Latency','Delay in a path.'],['Jitter','Variation in event timing.'],['Timestamp','Timing information associated with an event.']], 'Not every external timing problem can be corrected by one global delay value.');
  chapter('accessibility-and-keyboard-navigation','Move focus, identify controls and edit without depending on pointer navigation.','Choose how Tab behaves',[
    'Inspect Use Tab to Move Focus in Live’s navigation settings.',
    'When enabled, use Tab and Shift + Tab for focus travel; use the documented focus shortcuts for specific views.'
  ],[['Focus','The control receiving keyboard input.'],['Selection','The object selected for an operation.'],['Context menu','Commands associated with that object.']], 'The familiar Tab view-switch shortcut assumes Tab focus navigation is off.');
  chapter('live-keyboard-shortcuts','Action-to-key mappings for macOS and Windows.','Look up, then use the key',[
    'Choose the relevant group or search for the action.',
    'Return to the intended place in Live before pressing the shortcut.'
  ],[['Platform','Some mappings differ, including Redo.'],['Context','Editor focus and keyboard modes determine what a key does.']], 'Single-letter shortcuts can conflict with the Computer MIDI Keyboard or a text field.');
  chapter('credits','The people and organizations credited in the Live manual.','',[],[], 'Credits remain in the official source; no present-day UI capture would represent them.');
  return {items,put};
})();
