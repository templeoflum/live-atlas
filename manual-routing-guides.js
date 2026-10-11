// Original routing and mixer operations; Live 12 chapters 17–18.
(() => {
  const key=(action,mac,win=mac)=>({action,mac,win});
  const add=(chapter,rows)=>rows.forEach(([anchor,body,title,steps,terms=[],note='',images=[],keys=[]])=>{
    manualGuides.put(chapter,anchor,body,title,steps,terms,note,images);
    manualGuides.items[chapter+'#'+anchor].keys=keys;
  });
  add('routing-and-i-o',[
    ['monitoring','Monitor decides whether a track passes its live input through its devices to the output. Arm decides whether it can record.','Choose what you hear',[
      'Select the correct input and inspect Monitor before arming.',
      'Use Auto for armed input monitoring, In for continuous input, or Off when listening through an external/direct-monitor path.'
    ],[['In/Out section','Show it with ⌘ ⌥ I / Ctrl Alt I, the mixer view menu at bottom right, or View → Mixer Controls → In/Out. Each chooser pair has a Type chooser (such as Ext.) above a Channel chooser.'],['Auto','Monitors an armed track’s input unless clip playback takes precedence.'],['In','Always monitors input and suppresses clip playback, like an Aux. The track’s Activator turns blue so you can spot it with In/Out hidden.'],['Off','Does not pass live input to the output, but can still record it. Suits acoustic sound heard in the room, an external console or interface direct monitoring; consider Audio Settings’ Overall Latency adjustment.'],['Keep Monitoring Latency in Recorded Audio','On by default with In or Auto: aligns the recording with what you heard. Leave on for software instruments and effects; turn off for acoustic instruments or external monitoring (right-click In or Auto).'],['Several tracks / reset','A Monitor button applies to all selected tracks. Delete with In/Out shown (or Edit → Return to Default) resets: Off for audio tracks, Auto for MIDI tracks.']], 'Hearing both interface direct monitoring and Live monitoring can double the signal. Check both paths.',['audioInput']],
    ['monostereo-conversions','Choosing a mono input records one channel; choosing a stereo pair records two. The device chain itself carries stereo audio.','Record a single input',[
      'Choose the individual interface channel in Audio From rather than a stereo pair.',
      'Check the meter and record a short test; inspect the resulting waveform channels.'
    ],[['Mono into a chain','The same signal feeds left and right; the chain is always stereo, even for mono samples.'],['Mono output','Adds left and right together and lowers the sum by 6 dB to avoid clipping.']], 'Summing can reveal phase cancellation; do not assume stereo effects will sound identical in mono.'],
    ['external-midi-inout','A MIDI track can receive one port/channel or merge several available inputs.','Listen to one keyboard',[
      'Choose the keyboard’s port in MIDI From, then its channel or All Channels.',
      'Arm the track with Monitor Auto and check that notes reach its instrument.'
    ],[['All Ins','Combines enabled input ports.'],['All Channels','Combines the channels of the chosen input.']], 'MIDI carries performance messages, not the keyboard’s audio.',['pilotInput']],
    ['midi-port-inputs-and-outputs','Track, Sync and Remote enable different uses of a MIDI port. They are not three required setup switches.','Enable only the needed input',[
      'Find the keyboard input in Link, Tempo & MIDI Settings.',
      'Enable Track for notes. Add Remote only for manual mappings, or Sync only for a clock relationship.'
    ],[['Inputs / Outputs','The MIDI section of Link, Tempo & MIDI Settings lists every available input and output port.'],['Input / output','Each direction has independent switches; any number of ports can be used.'],['Track chooser','Selects the enabled port on a particular track.']], 'Avoid enabling both directions of a virtual MIDI route without checking for a loop.'],
    ['track','Track enables notes and controller messages for track recording and playback.','Receive played notes',[
      'Enable Track on the controller’s input port in Settings.',
      'Choose that port on a MIDI track, arm it and test an instrument.'
    ],[['Output Track','Needed to send notes/CC to external instruments or another app.']], 'A keyboard controller with no sound generator does not need output Track merely to play a Live instrument.',['pilotInput']],
    ['sync','Sync carries timing messages for equipment that must share a clock.','Send Live’s clock to a sequencer',[
      'Enable Sync for the sequencer’s output port and set the hardware to receive external clock.',
      'Start playback and compare timing; expand the port’s options if clock delay needs adjustment.'
    ],[['Input Sync','Receives MIDI Clock or MIDI Timecode, to follow a sequencer, groovebox or another DAW.'],['MIDI Clock Sync Delay','Output option (triangle beside the port): delays outgoing clock in milliseconds to line timing up.'],['MIDI Clock Type','Song sends Song Position Pointer and Continue whenever the play position changes; Pattern sends only Start, at the next bar, for devices that ignore SPP.'],['Resync External Hardware','When enabled, a Control Bar button that resends sync to drifting gear. Hardware Resync chooses the message: Stop and Start (default, suits most), Start Only, or Don’t Resync.']], 'A keyboard used only for notes needs no Sync unless it has its own sequencer or arpeggiator. Decide which device leads; avoid circular clock routing.'],
    ['remote','Remote enables manual control mappings and, in the output direction, controller feedback.','Map one control',[
      'Enable Remote for the controller’s input port.',
      'Enter MIDI Map Mode, select a Live control and move the hardware control; leave Map Mode to test it.'
    ],[['Input Remote','For custom mappings, and for triggering clips from a MIDI keyboard.'],['Output Remote','For feedback such as mapped LEDs or motorized faders.'],['Track','Separate permission for notes and CC used as musical data.']], 'A message consumed by a remote mapping will not also arrive as ordinary track MIDI.',['mapping'],[key('MIDI Map Mode','⌘ M','Ctrl M')]],
    ['playing-midi-with-the-computer-keyboard','The typing keyboard can play notes, but it takes over some single-letter shortcuts.','Play and return to editing',[
      'Load an instrument, arm its MIDI track and enable the Computer MIDI Keyboard.',
      'Play with the letter keys, then disable it before using ordinary single-letter editing shortcuts.'
    ],[['Z / X','Move the playable octave range.'],['C / V','Change note-entry velocity.'],['Keyboard layout','The familiar A–L white-key layout is based on a US-English keyboard.']], 'While it is enabled, adding Shift can access otherwise intercepted letter shortcuts.',[],[key('Computer MIDI Keyboard','M')]],
    ['connecting-external-synthesizers','External instruments need a MIDI path to the hardware and an audio path back from it.','Hear the hardware through Live',[
      'Send MIDI to the synth’s port and receive channel.',
      'Bring its audio outputs into the interface and select those inputs on an audio track, or use External Instrument to hold both routes.',
      'Check monitoring and levels before recording.'
    ],[['Local control','A keyboard synth may trigger itself as well as receive returned MIDI. Local Off can prevent double triggering.'],['USB MIDI','Does not imply that USB audio is available.']], 'Check the particular synth’s audio and Local Control setup; MIDI routing alone cannot return its sound.'],
    ['midi-inout-indicators','The top-bar indicators distinguish timing, remote-control and track MIDI activity.','Find where a note went',[
      'Play one key and watch whether the track-MIDI or remote indicator flashes.',
      'If only Remote responds, inspect MIDI mappings before changing the instrument.'
    ],[['Upper / lower','Received / sent messages within each indicator pair.'],['Clock indicators','Appear when external synchronization is configured.']], 'A flashing MIDI indicator confirms messages, not an audible audio output.'],
    ['resampling','Resampling records the Main mix into a new audio clip.','Print a short mix passage',[
      'Create an audio track, set Audio From to Resampling and Monitor to Off.',
      'Check the Main level, arm the destination and record into an empty slot or an unused Arrangement region.',
      'Stop, then audition the recorded clip with the source mix stopped.'
    ],[['Included','The sound reaching Main, including its processing.'],['Destination','Its own output is excluded while resampling.'],['File','Stored under Samples/Recorded after the Set is saved.']], 'Auditioning the print alongside the original doubles the material; it is not a louder-versus-quieter comparison.'],
    ['internal-routing-points','Pre FX, Post FX and Post Mixer choose where another track’s audio is tapped.','Choose what the recording includes',[
      'On a destination audio track, select the source track in Audio From.',
      'Choose the tap point below it, then check the result while changing a source effect or fader.'
    ],[['Pre FX','Before source devices and mixer: changing the source’s devices or fader does not affect it.'],['Post FX','After source devices, before its pan and fader.'],['Post Mixer','After both devices and mixer.']], 'Solo differs by tap point: soloing the destination still lets you hear a Pre FX or Post FX source, but not a Post Mixer one.'],
    ['routing-points-in-racks','Rack chains expose their own taps in addition to the parent track’s output.','Take one chain into another track',[
      'On an audio destination, choose the Rack’s track as the source.',
      'Choose the named chain and Pre FX, Post FX or Post Mixer point in the lower input chooser.'
    ],[['Chooser entries','Listed as (Rack Name) | (Chain Name) | Pre FX, Post FX or Post Mixer.'],['Chain Pre FX / Post FX','Where the signal enters the chain, or the end of its devices before the chain mixer.'],['Chain Post Mixer','After that chain’s level/pan but before the Rack combines chains.'],['Drum Rack returns','Drum Rack return chains offer the same taps.'],['Solo','Soloing the destination still lets you hear a chain tap at any of these points.']], 'Read the full Rack and chain name; a track-level tap and a chain-level tap can carry different material.'],
    ['making-use-of-internal-routing','An output route sends a track onward; an input tap can copy a source while leaving its original destination intact.','Choose between send and tap',[
      'For a submix, point each source’s output at the shared destination.',
      'For a separate print or parallel path, choose the source from the destination’s input instead.'
    ],[['Many to one','Several source outputs feed one receiving track.'],['One to many','Several receiving tracks tap the same source.']], 'Check Monitor on the receiving track and avoid duplicate audible paths or feedback loops.'],
    ['post-effects-recording','Record a processed source onto another track when you want the effect printed into the audio.','Print a device chain',[
      'Put the effects on a source track that receives the instrument and set its Monitor to In, so you always hear it.',
      'Set one or more recording tracks’ input to the source, Post FX; set their Monitor to Off, arm and record.'
    ],[['Post FX','Includes devices, not the source mixer level/pan.'],['Post Mixer','Also includes the source’s mixer settings.']], 'Keep the unprocessed recording if you may need to change the effects later.'],
    ['recording-midi-as-audio','A MIDI instrument’s output can be recorded as a waveform on a separate audio track.','Record the instrument’s sound',[
      'On a new audio track, choose the instrument track as Audio From and select Post FX.',
      'Set the destination Monitor to Off, arm it and record while the MIDI part plays.',
      'Stop the source before auditioning the print.'
    ],[['Original MIDI','Remains available for note and sound changes.'],['Audio print','Stores this performance of the instrument and effects.']], 'This is an audio recording, not Export MIDI.'],
    ['creating-submixes','A submix collects several track outputs behind one level and processing chain.','Collect two tracks',[
      'Select their headers and create a Group Track.',
      'Check each child’s Audio To destination, then adjust the group level or add an effect.'
    ],[['Manual bus','An audio track with Monitor In can receive several track outputs.'],['Sends Only','Can build a return-based mix without the direct Main route.']], 'Tracks with custom routing may keep it when grouped. Verify the route rather than assuming every child reaches the group.'],
    ['several-midi-tracks-playing-the-same-instrument','Separate MIDI clips can feed one shared instrument without duplicating the instrument.','Send another part to one instrument',[
      'Create a MIDI track without an instrument and put the additional part there.',
      'Set MIDI To to the instrument’s track, then choose the instrument itself in the lower chooser.'
    ],[['Direct instrument destination','Bypasses the receiving track’s recording/monitoring input.'],['Track In','Feeds its input stage instead.']], 'Muting the instrument’s audio track silences every part feeding it. Separate MIDI parts do not create separate audio faders.'],
    ['tapping-individual-outs-from-an-instrument','A multi-output instrument can expose separate audio parts to other tracks.','Process one output separately',[
      'Create an audio track and select the instrument’s track in Audio From.',
      'Choose its named individual output and set Monitor In for live playback.'
    ],[['Instrument support','Only exposed outputs appear in the chooser.'],['Impulse','Tapping a slot removes it from Impulse’s internal mix.']], 'Other plug-ins may keep the same signal in their main mix. Check for double playback.'],
    ['using-multi-timbral-plug-in-instruments','One plug-in can host parts addressed on different MIDI channels, with separate audio returns.','Address one part',[
      'Assign a part’s MIDI channel and output inside the plug-in.',
      'Route a separate MIDI track to that plug-in/channel and receive its audio on the intended output.'
    ],[['Separate audio tracks','Can monitor each exposed output.'],['External Instrument','Can pair a MIDI destination with a plug-in’s secondary audio output in one device.']], 'The plug-in’s main output stays on its host track; External Instrument can tap the secondary outputs.'],
    ['feeding-sidechain-inputs','A sidechain supplies a device with a separate signal to analyze or process.','Choose a detector source',[
      'Open the receiving device’s sidechain controls and enable its external input.',
      'Choose the source track and tap point, then inspect the device response while that source plays.'
    ],[['Built-in chooser','Available in many Live devices.'],['Output routing','Some devices or plug-ins expose the sidechain as a destination on another track.']], 'A sidechain input is not automatically mixed into the audible output. Its role depends on the device.'],
    ['layering-instruments','A second instrument can receive the same MIDI while retaining its own audio track.','Share a note source',[
      'Load the second instrument on another MIDI track.',
      'Set MIDI From to the source track, choose Post FX and use Monitor In on the receiving track.'
    ],[['MIDI Post FX','Taps after MIDI effects but before the source instrument converts notes to audio.'],['Separate mixer','Balances and processes the layer independently.']], 'An Instrument Rack provides another way to layer within one track.']
  ]);
  add('mixing',[
    ['additional-mixer-features','A taller mixer reveals finer meter markings, numeric levels and peak readouts.','Read a peak',[
      'Drag the mixer’s upper edge upward and widen the track if needed.',
      'Play the passage, inspect its peak readout and reset the readout before comparing another pass.'
    ],[['Peak','Brief maximum level.'],['RMS','A view of average signal energy.'],['Headroom','Internal floating-point headroom does not protect hardware inputs, outputs or every device.']], 'Keep final outputs and fixed-bit-depth exports below clipping; do not use internal headroom as a target level.',['mixer']],
    ['group-tracks','A Group Track holds tracks and can process their combined audio.','Group without losing individual tracks',[
      'Select the track headers and choose Group Tracks.',
      'Check their output routes; fold the group when you need less on screen.'
    ],[['Ungroup','Removes the container while retaining its tracks.'],['Delete group','Deletes the contained tracks as well.'],['Nested groups','Allow smaller groups inside larger ones.']], 'Existing custom output routes are preserved rather than automatically redirected to the group.',[],[key('Group tracks','⌘ G','Ctrl G'),key('Ungroup','⌘ ⇧ G','Ctrl Shift G')]],
    ['using-lives-crossfader','The crossfader changes the levels of tracks assigned to A or B without changing their routing.','Fade between two tracks',[
      'Show Crossfader in Mixer Controls and assign one track to A, another to B.',
      'Move the crossfader between its endpoints; choose a curve from its context menu if needed.'
    ],[['Unassigned','Unaffected by crossfader movement.'],['A / B','Multiple tracks and returns can share either side.'],['Automation','The crossfader is a Main-track mixer parameter.']], 'Assignment does not send a track to a new output bus.'],
    ['soloing-and-cueing','Solo changes the audible mix. Cue sends a preview to a separate output.','Check a cue path',[
      'With suitable interface outputs, assign Main Out and Cue Out to different output pairs.',
      'Switch Solo/Cue Mode to Cue and use a track’s headphone button.',
      'Check its Track Activator too: cueing does not itself remove the track from Main.'
    ],[['Cue Volume','Sets the preview output level.'],['Browser preview','Uses Cue Out when cueing is configured.'],['Solo in Place','Keeps a soloed track’s return processing audible.']], 'A private stereo cue requires a separate stereo hardware output from the Main mix.',['main']],
    ['track-delays','Track Delay offsets a track’s output in milliseconds without moving its clips.','Compare a small timing offset',[
      'Show Track Options in the mixer and note the original delay.',
      'Adjust a small value while stopped, play the passage, then restore the original to compare.'
    ],[['Positive / negative','Later / earlier relative output timing.'],['Device compensation','Separate from the intentional track offset.']], 'Large offsets can add sluggishness. Avoid changing track delay during a performance; changes can click.'],
    ['keep-monitoring-latency-in-recording-track-toggles','This setting controls whether a recording retains the timing offset associated with Live’s monitored sound.','Match the listening path',[
      'Decide whether you are listening through Live or directly through hardware.',
      'Inspect Keep Monitoring Latency in Recording from the track options or the In/Auto monitor context menu.',
      'Make a short timing test before a full take.'
    ],[['Live-monitored playing','Keeping latency can preserve the timing you performed against.'],['External/direct monitoring','Usually calls for removing that monitoring offset.']], 'This changes recorded timing, not the physical delay you hear. It does not replace checking buffer size and the monitoring route.'],
    ['performance-impact-track-indicators','Per-track CPU indicators help locate a demanding processing chain.','Find the heavy track',[
      'Show Performance Impact in Mixer Controls and play the demanding passage.',
      'Compare the indicators, then inspect devices on the highest-impact track.'
    ],[['Six segments','Relative impact within the current Set, not a precise CPU percentage.'],['Freeze','Can reduce processing while preserving an editable source for later thawing.']], 'Use an editable saved version before replacing a chain with a permanent audio print.']
  ]);
})();
