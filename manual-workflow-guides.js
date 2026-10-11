// Original task-sized guides checked against the locally cached official chapters.
// A verified source heading is required; empty/generated filler is not a guide.
(() => {
  const add=(chapter,rows)=>rows.forEach(([anchor,body,title,steps,terms=[],note=''])=>manualGuides.put(chapter,anchor,body,title,steps,terms,note));
  add('live-keyboard-shortcuts',[
    ['momentary-latching-shortcuts','Some mode keys can act temporarily while held, instead of staying toggled.','Compare a tap with a hold',[
      'With a MIDI editor focused and no text field active, briefly press B to toggle Draw Mode.',
      'Compare holding B for more than half a second, then releasing it; the previous mode returns.'
    ],[['Supported keys','A, B, S, Z, F1–F8 and Tab have momentary behavior.'],['Context','Their ordinary actions and keyboard modes still apply.']], 'Tab’s view toggle assumes Use Tab to Move Focus is off.'],
    ['general-keyboard-navigation-and-workflow','Keyboard focus determines which control receives your next key.','Move to a known view',[
      'Use Live’s Navigate menu to choose the area you want to control.',
      'Check focus before using arrows or a single-letter command.'
    ],[['Focus','Where keyboard input goes.'],['Selection','Which object an operation targets.']], 'Changing focus does not necessarily change the selected clip or track.'],
    ['using-tab-for-navigation','Tab either travels between controls or switches the main views, depending on the navigation setting.','Choose one behavior',[
      'Inspect Use Tab to Move Focus in Navigate or Display & Input settings.',
      'When enabled, Tab moves forward and Shift + Tab moves backward through controls.'
    ],[['Setting off','Tab switches Session and Arrangement.'],['Wrap Tab Navigation','Continues from the last control to the first.'],['Same mixer row','Option + Tab on Mac; Ctrl + Tab on Windows. Add Shift to reverse.']], 'Move Clips with Arrow Keys is a separate setting that changes Arrangement arrow-key behavior.'],
    ['navigating-between-controls-in-the-settings-menu','Settings supports Tab navigation independently of the main Tab-focus preference.','Change a setting by keyboard',[
      'Open Settings and use Tab or Shift + Tab to focus its controls.',
      'Use arrows to change a value or choice; Enter can change a toggle.'
    ],[['Page chooser','Use arrows when it has focus to change the Settings page.'],['Return to chooser','Shift + Tab from the page’s first control.']], 'Only change a setting when you intend to keep that change. Navigation and editing use some of the same keys.'],
    ['editing-automation-and-modulation-envelopes-with-the-keyboard','Envelope breakpoints can be navigated and edited without dragging with the pointer.','Identify the envelope first',[
      'Open the intended automation or modulation envelope and check its parameter name.',
      'Use the linked accessibility reference for breakpoint selection and editing commands.'
    ],[['Breakpoint','A value at a specific time.'],['Envelope type','Automation and modulation affect the parameter differently.']], 'The detailed keyboard procedure is in manual section 40.5.'],
    ['accessing-menus','Menu search on Mac and menu access keys on Windows provide a keyboard route to commands.','Find a menu command',[
      'On Mac, use Cmd + ? to search menu commands. On Windows, use Alt plus the menu’s access letter.',
      'Use arrows to select the command and Enter to invoke it.'
    ],[['Mac search','Lists matching menu entries.'],['Windows menus','Left and right move between neighboring menus.']], 'Read the selected command before pressing Enter, especially for deletion or replacement operations.'],
    ['using-lives-context-menu','The context menu contains commands for the object or region under the pointer or focus.','Inspect an object’s commands',[
      'Right-click the relevant object, or Control-click on Mac.',
      'Inspect the available commands and dismiss the menu if you only needed to identify an action.'
    ],[['Windows keyboard','Menu key or Shift + F10.'],['Mac accessibility','VoiceOver modifier + Shift + M.']], 'Some context-menu items change global Settings, not just the selected object.']
  ]);
  add('comping',[
    ['take-lanes','Alternate material sits beneath a track’s main lane. Only the main lane normally plays.','Show the alternatives',[
      'In Arrangement, open the track header’s context menu and choose Show Take Lanes.',
      'Compare the main lane with the takes beneath it; showing a lane does not make it audible.'
    ],[['Main lane','The assembled result.'],['Take lane','An alternate source on the same track.']], 'Showing take lanes exits Automation Mode.'],
    ['inserting-and-managing-take-lanes','Take lanes can hold recordings or manually placed alternatives.','Keep an alternate phrase',[
      'Select an Arrangement track and choose Insert Take Lane from Create or the track context menu.',
      'Rename the lane for the performance or variation it holds.'
    ],[['Duplicate lane','Copies its clips as well as the lane.'],['Delete unused lanes','A cleanup operation, not a way to hide takes.']], 'Keep alternatives until the comp is settled; deleting lanes removes their available source material.'],
    ['recording-takes','Recording passes in Arrangement produces take lanes. The newest pass appears in the main lane.','Record alternatives',[
      'Choose a short Arrangement loop, check the input, then arm the track.',
      'Start Arrangement recording and perform several passes; stop and show the take lanes.'
    ],[['Pass','One traversal of the recording region.'],['Last take','The initial main-lane result, not an automatic quality judgment.']], 'Existing empty space in a take lane can be reused. A separate lane is not guaranteed for every recording gesture.'],
    ['inserting-samples','Take lanes can hold imported audio or MIDI, not only recordings made in this Set.','Compare two source files',[
      'Show the track’s take lanes and drag a compatible file from the Browser into a lane.',
      'Align the passage with the main lane before auditioning or copying it into the comp.'
    ],[['Audio track','Use audio material.'],['MIDI track','Use note material.']], 'Imported alternatives still need compatible timing and pitch; placement alone does not align performances.'],
    ['auditioning-take-lanes','A take lane’s speaker button temporarily makes that alternative audible.','Hear one take',[
      'Play the passage and enable the speaker in one take-lane header.',
      'Compare another take, then disable auditioning to hear the main-lane comp again.'
    ],[['One per track','Only one take lane on a given track can be auditioned at a time.']], 'T toggles take auditioning in the relevant context; leave text fields and check the selected lane first.'],
    ['creating-a-comp','Copy chosen regions from take lanes into the main lane. The source takes remain independently editable.','Replace one phrase',[
      'Drag a time selection across the desired phrase in a take lane.',
      'Press Enter to copy it to the main lane; play through the two joins.'
    ],[['Copy, not move','The take remains available below.'],['Draw Mode','Dragging across a take can choose material in one gesture.'],['Crossfade','Softens a join between adjacent audio clips.']], 'The main-lane copy and source take do not keep mirroring each other’s later edits.'],
    ['source-highlights','Colored regions in the takes identify source material used in the current comp.','Adjust a join',[
      'Locate the boundary between adjacent source highlights beneath the comp.',
      'Drag the highlight edge and listen across the revised transition.'
    ],[['Colored region','Material used in the main lane.'],['Dim region','Material not currently used.']], 'Highlights rely on matching clip positions and properties. An independently edited copy may no longer show the expected source highlight.']
  ]);
  add('converting-audio-to-midi',[
    ['slice-to-new-midi-track','Split a recording into playable pieces. MIDI notes trigger the original sound rather than a pitch transcription.','Slice a short loop',[
      'Select an audio clip and choose Slice to New MIDI Track.',
      'Choose a beat division, transients or Warp Markers; confirm, then play the resulting MIDI clip.'
    ],[['Drum Rack','Holds a separate chain for each slice.'],['Simpler','Plays the slice in each chain.'],['Preserve warped timing','Keeps the source clip’s warped timing in the result.']], 'The Rack limit is 128 slices. Use a shorter selection or coarser division if the command exceeds it.'],
    ['resequencing-slices','Changing the sliced clip’s MIDI notes changes which pieces play, and when.','Swap two events',[
      'Duplicate the generated MIDI clip and inspect its ascending note pattern.',
      'Move one note to another slice pitch or time position and compare the two clips.'
    ],[['Pitch row','Selects a slice; it is not necessarily the musical pitch of that slice.']], 'Moving a Rack pad changes its note mapping, which can also change other clips that play that Rack.'],
    ['using-effects-on-slices','A slice can have its own processing inside its Drum Rack chain.','Process one piece',[
      'Select the slice’s pad and locate its Simpler in the Rack chain.',
      'Place an audio effect after that Simpler, then trigger this slice and a neighboring slice.'
    ],[['Inside the chain','Affects that slice.'],['After the Rack','Affects the combined Rack output.']], 'Check the insertion location before loading the effect.'],
    ['convert-harmony-to-new-midi-track','Estimate simultaneous pitches from audio as an editable MIDI clip.','Transcribe a short chord passage',[
      'Select a clear recording of the chordal instrument and choose Convert Harmony to New MIDI Track.',
      'Compare the generated notes with the recording and correct obvious missing or extra pitches.'
    ],[['Result','Notes played by a new instrument, not pieces of the original recording.']], 'An isolated piano or guitar passage is a more useful first check than a dense finished mix.'],
    ['convert-melody-to-new-midi-track','Estimate a single melodic line as MIDI notes.','Capture a sung idea as notes',[
      'Select a short, exposed vocal or solo-instrument phrase and choose Convert Melody to New MIDI Track.',
      'Check pitch, starts and lengths in the resulting MIDI clip before replacing its instrument.'
    ],[['Monophonic source','One intended pitch at a time.']], 'Breaths, slides and soft attacks can become unexpected notes or timing errors.'],
    ['convert-drums-to-new-midi-track','Estimate percussion events and place them in a new Drum Rack clip.','Inspect a detected rhythm',[
      'Choose Convert Drums to New MIDI Track on a short percussion clip.',
      'Compare kick, snare and hi-hat rows with the source; remove extra events or move misclassified ones.'
    ],[['Detected event','An estimate, not the original drum audio.']], 'A mixed recording can produce events from non-drum sounds too.'],
    ['optimizing-for-better-conversion-quality','Clear attacks and isolated sources make note detection easier to inspect.','Improve a troublesome conversion',[
      'Work on a short exposed passage in a high-quality source file.',
      'Review its transient markers, correct obvious attack boundaries, then run the conversion again.'
    ],[['Transient markers','Influence the detected note divisions.']], 'A different conversion command may make an interesting variation, but that is different from an accurate transcription.']
  ]);
  add('using-grooves',[
    ['groove-pool','The Set’s groove patterns and their shared amounts live in one list.','Compare one pattern',[
      'Drag a groove from the Browser onto a clip, then open the Groove Pool.',
      'Move Timing while the clip plays and compare with its Groove chooser set to None.'
    ],[['Shared groove','Changing its pool settings affects every clip using it.'],['Inactive row','The groove is loaded but not assigned to a clip.']], 'Audio clips need Warp enabled for groove timing.'],
    ['adjusting-groove-parameters','Separate straightening, timing deviation and accents instead of changing them all at once.','Isolate the timing contribution',[
      'Choose the relevant Base resolution; set Random and Velocity to zero for the comparison.',
      'Compare Quantize and Timing separately, then restore any desired accents.'
    ],[['Base','Grid division used to measure timing offsets.'],['Quantize','Moves events toward the straight grid before groove timing.'],['Timing','Applies the pattern’s offsets.'],['Velocity','Applies or, with negative amounts, reverses its accent pattern.'],['Random','Adds independent timing variation.'],['Global Amount','Scales Timing, Random and Velocity across the pool.']], 'Global Amount is shared; adjusting it can alter clips beyond the selected one.'],
    ['committing-grooves','Commit turns a live groove assignment into edits inside the clip.','Keep a before-and-after pair',[
      'Duplicate the clip, then press Commit Groove on the copy.',
      'Inspect the moved MIDI notes or new audio Warp Markers; the copy’s groove assignment becomes None.'
    ],[['Before commit','Groove remains adjustable in the pool.'],['After commit','Its effect is represented by clip edits.']], 'Save a source copy if you may want to change the groove later.'],
    ['editing-grooves','A groove can be opened as MIDI, edited, and extracted as a new pattern.','Make a small variation',[
      'Drag the groove from the Browser or Groove Pool onto a MIDI track.',
      'Edit a note’s timing or velocity, then extract a groove from the edited clip.'
    ],[['MIDI representation','The note timing and strengths used by the groove.']], 'Save the result under a distinct name to retain the original pattern.'],
    ['extracting-grooves','A clip’s timing and accents can become a reusable groove.','Capture a timing pattern',[
      'Set the source clip’s playing region to the passage you want.',
      'Choose Extract Groove in its context menu, then assign the new pool entry to another clip.'
    ],[['Playing region','The portion used for extraction.']], 'Audio and MIDI can both supply a groove; inspect the receiving clip’s result rather than assuming a perfect transfer.'],
    ['groove-tips','Groove settings can be isolated by voice, used for adjustable quantization, or used to offset doubled parts.','Choose the operation',[
      'Use the references below for the particular change you want.',
      'Keep a source clip for comparison before committing the result.'
    ]],
    ['grooving-a-single-voice','A groove affects the whole clip. Separate one voice when it needs independent timing.','Separate a snare part',[
      'In a Drum Rack, extract the snare chain to its own track.',
      'Assign a groove to its resulting clip and compare it with the remaining kit.'
    ],[['Separate clip','Allows a separate groove assignment.']], 'Check the extracted track’s routing and effects before comparing its timing.'],
    ['non-destructive-quantization','A groove can straighten events without rewriting their stored note positions.','Make quantization adjustable',[
      'Assign a groove, then set Timing, Random and Velocity to zero in the pool.',
      'Choose Base and raise Quantize; compare with the clip’s groove set to None.'
    ],[['Commit','Only needed when you want the result written into the clip.']]],
    ['creating-texture-with-randomization','Independent timing offsets make doubled clips less perfectly aligned.','Compare a loose double',[
      'Duplicate a track with a short phrase and assign a groove to the duplicate.',
      'Raise Random a little, then compare both tracks playing together.'
    ],[['Random timing','Notes in a chord can move independently.']], 'Doubling raises level. Match the listening level before judging the timing change.']
  ]);
  add('bounce-to-audio',[
    ['bouncing-individual-tracks','Render an individual track after its devices, before its mixer. Mixer settings carry over separately.','Keep the source editable',[
      'Select the desired clips or time range and choose Bounce to New Track from its context menu, or press ⌘ B / Ctrl B.',
      'Compare the new audio track with the muted source; inspect any effect tails before continuing.'
    ],[['Bounce to New Track','Keeps the original track and mutes the bounced clips or selection. A selection across several Arrangement tracks gives one new track per track. Used in Session, it also creates the track in Arrangement, but empty there.'],['Bounce Track in Place','Track title bar or clip context menu: replaces the source track, bouncing both its Session and Arrangement clips. It supersedes Freeze and Flatten from earlier Live versions.'],['Post-FX / pre-mixer','Device processing is printed; volume, pan and sends are copied to the new track instead.'],['Naming and files','New tracks and clips take the source name plus “(Bounce)” and the source color. Files go to the Current Project’s Samples/Processed/Bounce folder.']], 'Save a version before an in-place bounce.'],
    ['bouncing-group-tracks','A group bounce combines the group’s routed output, including mixer behavior, into audio.','Print a group separately',[
      'Select the group material and choose Bounce Group to New Track (group slot or Group Track main-lane context menu, or ⌘ B / Ctrl B).',
      'Compare the audio with the original group, checking return effects and any tracks routed outside the group.'
    ],[['Bounce Group in Place','Replaces the whole Group Track with one audio track; from the Group Track title bar, a group slot or its main-lane context menu.'],['Group versus track','Group bouncing is post-mixer, including the effects and sends used inside the group; individual-track bouncing is pre-mixer.'],['Main processing','Not printed as part of the group bounce.']], 'Routing determines inclusion. Material sent outside the group may be absent; returns must reach Main to be included.'],
    ['pasting-bounced-audio','Copy a source once, then paste an audio rendering of its current state.','Print two sound variations',[
      'Copy the source material. In an audio destination, choose Paste Bounced Audio.',
      'Change a source device setting and use Paste Bounced Audio at a new destination position.'
    ],[['Current state','The source is rendered when you paste, not when you initially copy.'],['What can be copied','Clips in one Session track; a time selection or clips in Arrangement; or a time selection in a Group Track’s main lane.'],['Where it can go','An audio track, an empty MIDI track (which becomes an audio track) or a take lane, via the main-lane context menu or ⌘ ⌥ V / Ctrl Alt V.'],['Uses','Quick variations with different effects, or gathering selections from several tracks onto one.']], 'Deleting the copied source disables this operation until new source material is copied.']
  ]);
  add('stem-separation',[
    ['how-stem-separation-works-in-live','Local analysis estimates vocals, drums, bass and the remaining material from a mono or stereo recording.','Check the kind of result',[
      'Separate a short known recording rather than a whole song for the first comparison.',
      'Solo the results, then listen to the combination and check for bleed or missing detail.'
    ],[['Music source separation','A deep-learning model trained for the task analyses spectral and time patterns. It runs locally: no internet or extra tools.'],['Four stems','Any mono or stereo audio: Vocals, Drums, Bass and Others.'],['Others','Material not classified in the other three parts.'],['Estimated stems','Not the original studio multitracks.']], 'Live’s built-in analysis runs locally. Availability depends on the installed Live release and edition.'],
    ['separating-audio-files-and-clips','Choose the source region and parts, then create new audio tracks from the estimated stems.','Separate a short passage',[
      'Right-click a clip or a Browser file (or use the Create menu) and choose Separate Stems to New Audio Tracks. For part of an Arrangement clip, select time in it and choose Separate Stems for Time Selection, which splits the clip at the selection edges.',
      'Choose the parts and quality mode, then press Separate. Check the result with the source clip deactivated.'
    ],[['Merge to Single Track','Combines two or three selected parts into one track in the source track’s color; not available with one or all four.'],['Result','Each stem gets its own track inside a new Group Track (one stem alone gets a plain track), colored to match the dialog.'],['Source clip','Deactivated after separation to prevent doubled playback; select it and press 0 to reactivate.'],['Effects and automation','Source track effects and automation go to the Group Track, not into the stem audio; clip envelopes go to each stem clip.'],['From the Browser','Stems land in the focused view. In an empty Set, the project tempo matches the source when warping is on for samples.'],['Files','Current Project → Samples → Processed → Stems, in the Record, Warp & Launch file type, at 44.1 kHz and the source bit depth. Merging also keeps the individual stems.']], 'Separation stops playback. Clip start/end markers, and the loop of a warped clip, limit the processed region.'],
    ['separation-speed-vs-quality','High Speed makes a quick estimate; High Quality uses more processing for a more detailed result.','Compare the same passage',[
      'Separate a short passage in High Speed mode and note the audible artifacts.',
      'Repeat in High Quality mode and compare at the same level.'
    ],[['High Speed','All stems in one pass; can still take minutes on older computers.'],['High Quality','A dedicated pass each for Vocals, Drums and Bass, then Others from what remains; measurably more accurate (higher Signal-to-Distortion Ratio).'],['Shorter source','Crop first: Crop Clip Sample to Time Selection in the Sample Editor, or Crop Clip on an Arrangement selection (⌘ ⇧ J / Ctrl Shift J for both).'],['Fewer requested parts','Reduce High Quality time, unless Others is included.'],['Hardware','Older Windows computers and Intel Macs use only the CPU; Apple silicon Macs also use the GPU.'],['Bleed','Hi-hats can land in Others, or chorused synths in Vocals. Try both modes and compare.']], 'Others requires estimating the other parts first. With Others selected, the unrequested stems are made anyway and kept in the Stems folder.']
  ]);
})();
