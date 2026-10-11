// Original, selection-aware operations. Verified against Live 12 chapters 10 and 19.
(() => {
  const key=(action,mac,win=mac.replace(/⇧/g,'Shift'))=>({action,mac,win});
  const add=(chapter,rows)=>rows.forEach(([anchor,body,title,steps,terms=[],note='',images=[],keys=[]])=>{
    manualGuides.put(chapter,anchor,body,title,steps,terms,note,images);
    manualGuides.items[chapter+'#'+anchor].keys=keys;
  });
  add('editing-midi',[
    ['the-midi-note-editor-layout','Pitch runs vertically; clip time runs horizontally. Velocity and Chance occupy separate lanes below the notes.','Locate one note',[
      'Open a MIDI clip and choose the Notes tab.',
      'Select a note, then find its pitch row, time position and velocity marker.'
    ],[['Notes','The piano roll, not the Envelopes or MPE editor.'],['Lane selector','Shows or hides the expression lanes below.'],['Grid chooser','The editing time division at the top right.']], '',['midiSample']],
    ['zooming-and-navigating-in-the-midi-note-editor','Time zoom and pitch zoom are independent. Enlarge the region you are editing without changing the notes.','Frame a short passage',[
      'Select the passage and zoom to the selection.',
      'Zoom back to the full clip; drag horizontally in the note ruler if the pitch rows need more height.'
    ],[['Time ruler','Vertical dragging changes time zoom; horizontal dragging scrolls.'],['Note ruler','Horizontal dragging changes pitch-row height.']], 'Give the MIDI editor keyboard focus before using its zoom keys.',[],[key('Selection','Z'),key('Full clip','X'),key('Zoom','+ / −')]],
    ['grid-snapping','The grid constrains editing positions. Moving a note to the next grid line is different from quantizing a whole performance.','Compare snapped and free movement',[
      'Select one note and move it horizontally with the grid enabled.',
      'Toggle the grid off, try a small move, then undo and restore the grid.'
    ],[['Offset','A note can preserve its original offset while snapping between divisions.']], 'The temporary modifier reverses the current snap behavior, so its effect depends on whether the grid is already enabled.',[],[key('Toggle grid','⌘ 4','Ctrl 4'),key('Temporary snap toggle','⌘ while dragging','Alt while dragging')]],
    ['playback-options','Follow scrolls the editor with playback; scrubbing chooses a playback position.','Listen from a point',[
      'Use the scrub area below the clip’s time ruler to start playback from that region.',
      'Enable Follow if the playhead travels beyond the visible editor.'
    ],[['Chase MIDI Notes','Allows a held note to sound when playback begins after its start.'],['Follow pause','Editing can suspend follow scrolling.']], 'With Permanent Scrub Areas disabled, hold Shift when clicking to scrub. Launch quantization can delay the start.'],
    ['adding-midi-notes','Add a note at a chosen pitch and clip time, then adjust its duration.','Place one note',[
      'With Draw Mode off, double-click an empty place in the MIDI note grid.',
      'Drag the note’s right edge to set its duration; play the clip to check it.'
    ],[['Double-click','Adds a note in empty space; deletes an existing note when Draw Mode is off.']], 'A note event needs an instrument or external MIDI destination to produce sound.',['midiSample']],
    ['draw-mode','Draw Mode turns a drag through the piano roll into note entry. Clicking an existing note can erase it.','Draw repeated notes',[
      'Focus the MIDI editor, choose the grid division and enable Draw Mode.',
      'Drag through an empty region, then leave Draw Mode before selecting and moving those notes.'
    ],[['Pitch lock','Keeps drawing on one pitch row.'],['Melodic drawing','Follows the pointer vertically.']], 'Draw Mode with Pitch Lock in Settings chooses the default. Option on Mac or Alt on Windows temporarily switches between the two drawing behaviors.',[],[key('Draw Mode','B')]],
    ['previewing-notes','Preview sounds notes while you add, select or move them. It does not start clip playback.','Check a note by itself',[
      'Load an instrument on the MIDI track and enable Preview above the piano ruler.',
      'Click a piano key or move a note, then compare with Preview off.'
    ],[['Shared setting','Preview on/off applies across MIDI tracks in the Set.'],['Step recording','Preview also enables note entry with the transport stopped when the track is armed.']], 'Keep playback stopped if you want to hear only the previewed note.'],
    ['non-destructive-editing','Imported MIDI becomes editable Set data; changing the clip does not rewrite the original MIDI file.','Compare an edit',[
      'Change a note, then use Undo and Redo to compare.',
      'Duplicate the clip before trying a variation you want to keep alongside the original.'
    ],[['Undo','Reverses an edit in the current working history.'],['Clip copy','Keeps an accessible alternative beyond that comparison.']], 'Saving and exporting MIDI are separate operations.',[],[key('Undo','⌘ Z','Ctrl Z'),key('Redo','⌘ ⇧ Z','Ctrl Y')]],
    ['selecting-notes-and-timespan','A selected note and a selected timespan are different targets. Arrow keys act on whichever is active.','Check the selection before moving',[
      'Click one note and use an arrow key to move it; undo.',
      'Deselect, then drag across empty grid space to select time instead.'
    ],[['Note selection','Up/down changes pitch; left/right changes timing.'],['Insert marker','A point where pasted or entered material starts.'],['Time selection','A region that can contain notes and silence.']], 'Enter switches between a timespan and its enclosed notes. Escape clears the selection.',[],[key('Clear selection','Esc'),key('Select all notes','⌘ A','Ctrl A')]],
    ['find-and-select-notes','Select notes by properties instead of pointing at each one. Filters can be combined.','Select quiet notes',[
      'Open Find and Select Notes in the clip header and choose Velocity.',
      'Set the range, inspect the highlighted notes, then apply the intended edit.'
    ],[['Pitch / Scale','Pitch-class or scale membership.'],['Time / Count','A region, repeated span or every nth event.'],['Duration / Velocity / Chance','Numeric ranges.'],['Condition','Active notes, probability or velocity deviation.'],['Invert','Selects notes outside the criteria.']], 'Adjusting filters changes the selection immediately. Clicking the grid clears the filtered selection; Select reapplies it.'],
    ['moving-notes','Move a selected note horizontally for timing or vertically for pitch.','Nudge a note',[
      'Select the note with Draw Mode off.',
      'Use arrows for a small change; add the free-timing modifier only when you want to bypass the grid.'
    ],[['Copy by dragging','Option-drag on Mac; Ctrl-drag on Windows.'],['Overlap','Placing a note over another note at the same pitch can shorten or replace it.']], '',[],[key('Move','Arrow keys'),key('Free timing','⌘ ← / →','Alt ← / →')]],
    ['changing-note-length','Resize an edge to change when a note begins or ends.','Change only the end',[
      'Select a note and extend it using Shift plus the right arrow.',
      'Shorten it again and listen for how the instrument responds to note-off.'
    ],[['Left edge','Also changes the note start.'],['Right edge','Changes the end while retaining the start.'],['Fit to Time Range','Uses the selected time boundaries.']], 'The instrument’s release can continue after the MIDI note ends.',[],[key('Length','⇧ ← / →'),key('Free length','⌘ ⇧ ← / →','Alt Shift ← / →')]],
    ['midi-note-stretch','Stretch markers rescale a selected pattern’s timing proportionally.','Compress a copied phrase',[
      'Select several notes and locate the stretch markers above the grid.',
      'Drag an outer marker inward and compare the result with Undo.'
    ],[['Outer marker','Scales the selected material.'],['Inner marker','Redistributes timing inside the fixed outer boundaries.'],['Linked envelopes','Follow the timing change; unlinked envelopes do not.']], 'Dragging a marker past the other marker reverses the selected order.'],
    ['deactivating-notes','Mute a note without removing its event from the clip.','Compare a missing event',[
      'Select a note and deactivate it.',
      'Play the passage, then reactivate the same note.'
    ],[['Gray note','Still present but not played.']], '',[],[key('Deactivate / reactivate','0')]],
    ['note-operations','Split makes two events, Chop makes repeated subdivisions, and Join makes a longer event from matching pitches.','Choose the target',[
      'Select the notes or place an insert marker, depending on the operation.',
      'Use Split, Chop or Join below, then inspect the resulting boundaries.'
    ],[['Selection matters','The same editing key can split at a marker or chop selected notes.']]],
    ['split','Divide a sustained note at a chosen time without changing its pitch.','Split at the insert marker',[
      'Deselect notes and place the insert marker inside a note.',
      'Use Split Note(s), then inspect the two resulting note events.'
    ],[['E gesture','Hold E and draw across notes to choose split positions.']], 'With notes selected, the same shortcut can perform Chop instead.',[],[key('Split at marker','⌘ E','Ctrl E')]],
    ['chop','Divide selected notes into shorter repeated events using the grid.','Make four shorter notes',[
      'Choose the grid division and select a longer note.',
      'Use Chop Note(s) on Grid; inspect the new events and compare with Undo.'
    ],[['Grid','The initial chopping division.'],['After chopping','Keep the modifier held and use up/down to change the division count.']], 'This re-triggers the instrument; it is not just a visual division of one held note.',[],[key('Chop selection','⌘ E','Ctrl E')]],
    ['join','Combine selected events of the same pitch into one note, including their MPE data.','Join repeated notes',[
      'Select the intended notes on a single pitch row.',
      'Use Join Notes and compare the longer event with the original repeated attacks.'
    ],[['Same pitch','Different pitch rows do not become one new pitch.']], '',[],[key('Join','⌘ J','Ctrl J')]],
    ['pitch-and-time-utilities','Clip-side controls change selected notes or the whole clip when no selection is present.','Limit an operation',[
      'Select the notes you want to change.',
      'Choose the relevant pitch or time utility and inspect the result before moving on.'
    ],[['No selection','Many buttons apply to all notes.'],['Scale enabled','Some pitch operations use scale degrees rather than semitones.']], 'Keep a clip copy for larger variations.'],
    ['transpose','Move pitches together while retaining their timing.','Move a phrase by an octave',[
      'Select the phrase’s notes.',
      'Use Shift plus up or down, then compare with the original register.'
    ],[['Transpose slider','Shows the selected pitch range and accepts pitch offsets.'],['Scale mode','Can change pitch-step interpretation.']], '',[],[key('Pitch','↑ / ↓'),key('Octave','⇧ ↑ / ↓')]],
    ['fit-to-scale','Move selected pitches to nearby degrees of the clip’s active scale.','Inspect before accepting',[
      'Set the intended clip scale and select a small set of notes.',
      'Apply Fit to Scale and inspect which pitches changed.'
    ],[['Nearest degree','Equally near alternatives resolve downward.']], 'This changes notes; scale highlighting alone does not. The control is unavailable when the clip scale is inactive.'],
    ['invert','Reflect the selected pitch pattern vertically. Timing stays in place.','Invert a copied phrase',[
      'Select a phrase in a clip copy and press Invert.',
      'Compare the upper and lower pitch relationships with the original.'
    ],[['Scale active','The reflection follows scale-degree positions.']], 'Invert changes pitch. Invert Selection changes which notes are selected; it is a different command.'],
    ['intervals','Add new notes at a pitch offset from existing notes.','Add an octave layer',[
      'Select the source notes and set the Interval Size.',
      'Inspect the added notes before applying another interval.'
    ],[['Selected notes','Changing the interval value can add notes immediately.'],['No notes selected','Add Interval applies the chosen offset to the clip’s notes.']], 'Check whether the value is in semitones or scale degrees.'],
    ['stretch','Scale the selected note durations with Stretch, ×2 or /2.','Compare a shorter version',[
      'Select the notes and apply /2.',
      'Check the resulting timing and note ends, then undo if needed.'
    ],[['×2 / /2','Also act on an applicable time selection or loop region.'],['Stretch control','Does not change the loop-region length.']], 'These operations are different from changing the Set tempo.'],
    ['note-duration','Set a common duration rather than resizing each note separately.','Give notes equal lengths',[
      'Select the notes and choose a value in the Duration menu.',
      'Press Set Length and inspect their ends.'
    ],[['Grid','Uses the current grid division.'],['Fit to Time Range','Uses the selected span.']], 'With no notes selected, Set Length changes the whole clip.'],
    ['humanize','Apply a bounded random offset to note starts.','Compare a small timing variation',[
      'Select notes in a copied clip and choose a small Humanize Amount.',
      'Press Humanize, then compare the timing with Undo.'
    ],[['Amount','The maximum range is a quarter of a grid division either side of the original position.']], 'This edits timing. It does not detect the intended musical feel of the performance.'],
    ['reverse','Reflect event positions horizontally inside the selection.','Reverse a copied pattern',[
      'Select the intended notes and press Reverse.',
      'Inspect their new order and play the copy.'
    ],[['MIDI reverse','Reorders events; it does not reverse the audio waveform of the instrument.']], 'With no notes selected, the operation acts on the whole clip.'],
    ['legato','Extend or shorten note durations to meet the next note start.','Join the timing gaps',[
      'Select a monophonic passage and apply Legato.',
      'Inspect the final note as well as the transitions inside the phrase.'
    ],[['Final note','Extends to the loop end.']], 'The receiving instrument decides whether joined or overlapping notes produce a legato playing response.'],
    ['midi-tools','Transform edits existing notes; Generate creates patterns in the target region.','Try a tool on a copy',[
      'Duplicate the clip and select the intended notes or region.',
      'Open Transform or Generate, turn Auto off while choosing settings, then apply once.'
    ],[['Auto','Can update notes as tool settings move.']], 'Generators can replace notes in their target region.'],
    ['editing-velocities','Velocity is a per-note playing value. Its effect on sound depends on the instrument.','Change one accent',[
      'Select a note and find its marker in the Velocity lane.',
      'Raise or lower the marker, then play the phrase at the same track volume.'
    ],[['Ramp','Distributes values between a chosen start and end.'],['Randomize','Writes varied velocity values into the notes.'],['Deviation','Chooses a new value within the note’s range on each playback.']], 'Velocity may affect tone as well as loudness. Do not use the track fader when the goal is changing one note.',['midiSample']],
    ['drawing-velocities','Draw through the Velocity lane to set the strength of selected notes.','Shape a short rise',[
      'Select the relevant notes and enable Draw Mode.',
      'Draw a rising contour in the Velocity lane and compare the result.'
    ],[['Selected notes','Only the selection is affected.'],['No selection','All notes in the affected grid divisions can change.']], 'Turn off grid snapping to draw individual markers more freely.',[],[key('Draw Mode','B'),key('Toggle grid','⌘ 4','Ctrl 4')]],
    ['note-off-velocity','Release velocity describes the key-release gesture, separately from the note-on velocity.','Check a supporting sound',[
      'Show the Release Velocity lane and select one note.',
      'Change its value while using an instrument mapping that responds to release velocity.'
    ],[['Receiver support','A value only matters if the instrument uses it.']], 'Sampler can map release velocity. A sound without such a mapping may not change at all.'],
    ['editing-probabilities','Chance decides whether an event plays on a given pass, not how loudly it plays.','Make one note intermittent',[
      'Show the Chance lane and lower one note’s probability below 100%.',
      'Loop the clip for several passes and compare with 100%.'
    ],[['Probability','A likelihood, not a fixed every-other-pass schedule.'],['Randomize','Changes stored probability values, rather than merely rolling another playback result.']], 'A missing note can be intentional probability behavior; inspect Chance before troubleshooting the instrument.'],
    ['probability-groups','A group can trigger all its notes together or choose one member at random.','Keep a chord together',[
      'Select the chord notes and choose Play All in the Chance controls.',
      'Lower the group probability and listen across several loop passes.'
    ],[['Play All','The group succeeds or fails as one event.'],['Play One','Chooses one member when the group plays.'],['Ungroup','Restores independent note probabilities.']], 'The grouping shortcut repeats the last chosen group type; use the named button when that distinction matters.',[],[key('Group','⌘ G','Ctrl G'),key('Ungroup','⌘ ⇧ G','Ctrl Shift G')]],
    ['folding-and-scales','Folding hides pitch rows. Scale highlighting marks them. Neither is required for ordinary note entry.','Restore a plain piano roll',[
      'Turn Fold and Scale folding off to see the full pitch layout.',
      'Turn Highlight Scale off if you do not need colored scale rows.'
    ],[['Fold','Shows rows containing notes.'],['Fold to Scale','Shows scale rows and any existing out-of-scale notes.'],['Highlight Scale','Changes the visual reference, not the notes.']], 'Scale-aware editing commands can change notes, so distinguish them from these display controls.',[],[key('Fold','F'),key('Fold to Scale','G'),key('Highlight Scale','K')]],
    ['editing-midi-clips','Clip operations change the container or its timespan, rather than just selected notes.','Check the editing level',[
      'Choose the clip or a region in its editor.',
      'Inspect the loop boundaries before cropping, inserting time or duplicating a loop.'
    ],[['Clip','The container and playback region.'],['Notes','The events inside it.']]],
    ['cropping-midi-clips','Remove MIDI outside the loop or selected time region.','Keep only the intended phrase',[
      'Duplicate the clip and set its loop or time selection.',
      'Choose Crop Clip or Crop to Time Selection, then inspect the remaining notes.'
    ],[['MIDI crop','Edits clip data without creating a separate audio file.']], 'Material outside the crop is removed from that clip, not merely hidden.',[],[key('Crop','⌘ ⇧ J','Ctrl Shift J')]],
    ['the-time-commands-in-the-midi-note-editor','Time commands insert or remove a duration, shifting later notes along with it.','Repeat a region including its silence',[
      'Select the entire timespan, including any rests.',
      'Use Duplicate Time, then check the clip’s start, end and loop markers.'
    ],[['Delete Time','Closes the selected gap.'],['Insert Time','Creates empty time before the selection.'],['Duplicate Time','Repeats the span and its contents.']], 'These commands do not automatically adjust clip start/end or loop-brace settings.'],
    ['looping','The MIDI loop brace defines the repeating passage independently of the visible editor.','Double a loop',[
      'Select the loop brace rather than a note.',
      'Duplicate it; inspect the longer brace and copied notes.'
    ],[['Duplicate loop','Copies contained notes and doubles the loop length.']], 'Notes to the right move with the new loop end. Turning Loop off does not delete repeated source material.', ['clipLoop'],[key('Duplicate selected brace','⌘ D','Ctrl D')]],
    ['multi-clip-editing','View notes from several clips together while retaining separate clip identities.','Compare two parts',[
      'Select two MIDI clips and open the note editor.',
      'Use their colored loop bars to identify which clip is active before editing.'
    ],[['Focus Mode','Restricts note editing to the foreground clip.'],['Velocity / Chance','Still operate on one foreground clip at a time.']], 'Shared clip properties can affect all selected clips.'],
    ['focus-mode','Keep other clips visible while editing only one.','Protect the background parts',[
      'Select multiple MIDI clips and enable Focus Mode.',
      'Click the intended clip’s loop bar; verify its colored notes before editing.'
    ],[['Foreground','The editable clip.'],['Gray notes','Reference material from the other clips.']], 'With Focus Mode off, note selections and edits can span several clips.',[],[key('Focus Mode','N')]],
    ['multi-clip-editing-in-the-session-view','Session can show up to eight looped MIDI clips together. Different loop lengths may require several repeats to line up.','Compare two loops',[
      'Select the looped clips in Session and open their notes.',
      'Read each colored loop bar before changing notes or loop lengths.'
    ],[['Alignment','The display can extend until the selected loops meet again.']], 'Repeated notes visible outside a clip’s own loop area are not extra stored events.'],
    ['multi-clip-editing-in-the-arrangement-view','Arrangement can show MIDI clips across a time selection on up to eight tracks.','Edit in timeline context',[
      'Select the clips across the relevant Arrangement time range.',
      'Choose Focus Mode for one clip, or leave it off when the edit should span clips.'
    ],[['Horizontal placement','Follows timeline position.'],['Vertical loop bars','Distinguish the tracks and clips.']], 'With Focus Mode off, drawing can continue across clip boundaries.']
  ]);
  add('recording-new-clips',[
    ['choosing-an-input','A track records the signal named in its input chooser. Arming cannot correct the wrong source.','Verify the source',[
      'Show In/Out and choose the intended device or internal source.',
      'Choose its channel, then confirm incoming activity before recording.'
    ],[['Audio','A mono channel or stereo pair.'],['MIDI','A device and MIDI channel.']], 'Use the actual interface channel carrying the microphone or instrument. A MIDI port carries messages, not audio.',['pilotInput']],
    ['arming-record-enabling-tracks','Arm prepares a track to record. It does not begin a take.','Prepare one track',[
      'Click the intended track’s Arm button.',
      'Check its input and monitoring, then choose the recording destination.'
    ],[['Shared track','Arming in Session also arms that track in Arrangement.'],['Multiple tracks','Selected tracks can arm together; a modifier also allows additional armed tracks.']], 'Verify every armed track before recording, especially in an existing Arrangement.',['pilotArmOff','pilotArmOn']],
    ['recording','Session records into slots; Arrangement records onto the timeline. Both use the same track inputs.','Choose where the take belongs',[
      'Check input, monitoring and Arm.',
      'Use an empty Session slot for a clip, or Arrangement Record for a timeline performance.'
    ],[['Arrangement Record','Can also capture a Session performance into the timeline.']], 'Launching clips, recording input and recording a Session performance are related but distinct operations.'],
    ['recording-into-the-arrangement','Record armed tracks at the Arrangement playhead position.','Record a bounded take',[
      'Set the starting position, check armed tracks and enable Arrangement Record.',
      'Record the passage, stop, then inspect the new clips and take lanes.'
    ],[['Punch-In / Punch-Out','Use the Arrangement loop boundaries to limit recording.'],['MIDI Arrangement Overdub','Adds notes to MIDI instead of replacing that material.']], 'Start Playback with Record in Settings determines whether pressing Record starts transport immediately. Save a version before recording over an existing passage.',['transport']],
    ['overdub-recording-midi-patterns','Session recording can add notes on each pass of an existing MIDI loop.','Add a second part',[
      'Open a looping MIDI clip, arm its track and enable Session Record.',
      'Play the new notes; press Session Record again to return to playback without adding more.'
    ],[['Overdub','Adds events to the existing clip.'],['Playback only','The loop keeps running after overdubbing stops.']], 'Undo can remove the most recent overdub. Check Record Quantization before starting.'],
    ['midi-step-recording','Enter held notes a grid step at a time with transport stopped.','Enter a chord without a count-in',[
      'Arm the MIDI track, enable the clip editor’s Preview switch and place the insert marker.',
      'Hold the chord and press the right arrow; continue holding and advancing to lengthen it.'
    ],[['Grid','Determines each time step.'],['Right arrow without held notes','Advances past a rest.']], 'Keep the MIDI editor focused. Holding the entered notes and pressing left removes the just-entered steps.',[],[key('Advance / extend held notes','→'),key('Remove held-note step','←')]],
    ['recording-in-sync','The Set tempo and metronome provide the recording-time reference.','Check a short take against the grid',[
      'Set the tempo and enable the metronome.',
      'Record a short phrase, then listen back with the click before changing timing settings.'
    ],[['Metronome level','Uses Preview Volume in the mixer.'],['Tempo is flexible','You can change tempo before, during or after recording (slow down for a hard part, speed up afterwards) and takes stay in sync.'],['Fixing timing','Warp Markers can later correct timing or change the feel of audio and MIDI recordings.']], 'A synchronized clock does not by itself remove monitoring latency.'],
    ['metronome-settings','Count-in, tick sound, rhythm and recording-only behavior are separate metronome settings.','Choose a useful click',[
      'Open the menu beside the metronome and choose its rhythm and count-in.',
      'Start a short recording to check both the lead-in and ongoing click.'
    ],[['Where','The arrow beside the metronome switch, or its context menu. Also sets the tick sound.'],['Auto rhythm','Follows the time signature’s denominator. Divisions that don’t fit a bar are disabled; after a meter change the tick falls back to Auto, and returns once the division fits again.'],['Enable Only While Recording','The metronome stays lit while playing but only sounds while recording.']], 'With Punch-In enabled, a recording-only click can stay silent until the punch point.'],
    ['recording-quantized-midi-notes','Record Quantization aligns MIDI as it is recorded; it is separate from later note editing.','Keep a freely played take',[
      'Inspect Edit → Record Quantization before the take; choose no quantization if you want the original timing.',
      'Record, then apply ordinary note quantization afterward if needed.'
    ],[['Arrangement undo','Record quantization can be a separate undo step.'],['Loop overdub','Quantization changes do not have the same separate-undo behavior.']], 'Do not rely on changing this setting mid-take; ordinary Session and Arrangement recording lock it during recording.'],
    ['recording-with-count-in','A count-in delays the beginning of recording while the metronome gives the lead-in.','Leave time to reach the keyboard',[
      'Choose one or two bars of Count-In beside the metronome.',
      'Start recording and begin the phrase after the count completes.'
    ],[['Count-in display','Negative bar positions count up to the recording start.']], 'A count-in is not an extra blank clip before the take.'],
    ['setting-up-file-types','Recording settings determine the format and bit depth of newly recorded audio files.','Check the recording format',[
      'Open Record, Warp & Launch Settings and inspect File Type and Bit Depth.',
      'Choose the intended format before the recording session.'
    ],[['Recording format','For newly captured audio.'],['Export format','Chosen separately when rendering the Set.'],['Default Warp mode','An initial clip setting, not an irreversible format conversion.']], 'Changing these defaults does not convert previously recorded files.'],
    ['where-are-the-recorded-samples','Saved projects keep recorded audio under Samples/Recorded. Unsaved work uses Live’s temporary recording location.','Keep the take with the project',[
      'Save the Set into its intended project folder.',
      'Check the project’s Samples/Recorded folder and collect any external dependencies before moving the project.'
    ],[['Temporary folder','Needs adequate free space even before the first save.']], 'An .als file alone does not contain all recorded audio.'],
    ['using-remote-control-for-recording','Map recording controls to a keyboard key, controller button or pedal.','Free both hands',[
      'Enter the appropriate mapping mode and select the recording control.',
      'Assign the key or MIDI control, leave mapping mode and test it on an empty clip or safe area.'
    ],[['Arm','Chooses a recording track.'],['Session Record','Starts or ends recording/overdub in the selected scene.'],['New','Prepares another Session take through a mapped control.']], 'A mapped pedal may send different messages on press and release; verify the resulting behavior before the lesson.',['mapping']],
    ['starting-a-new-live-set','Capture MIDI can infer a tempo and loop from recent playing when an empty Set is stopped.','Recover an unrecorded phrase',[
      'Play on an armed or monitored MIDI track without starting a take.',
      'Press Capture MIDI, then check the detected tempo and clip boundaries.'
    ],[['Empty, stopped Set','Allows tempo detection.'],['Earlier playing','May remain before the detected clip start.']], 'Capture starts playback. Review the full clip before cropping away earlier material.'],
    ['adding-material-to-an-existing-live-set','In an established Set, Capture uses the current tempo. It can add recent playing to a running clip.','Recover a part played over a loop',[
      'Play along on the armed or monitored MIDI track.',
      'Press Capture MIDI and inspect the resulting clip and any added notes.'
    ],[['Existing tempo','Not re-detected from this phrase.'],['Playing clip on the same track','Can receive captured material as an overdub.']], 'Check which tracks are monitored before capturing; the result is not necessarily limited to one track.']
  ]);
  manualGuides.items['recording-new-clips#arming-record-enabling-tracks'].imageLabels=['Unarmed','Armed'];
})();
