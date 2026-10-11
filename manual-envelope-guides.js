// Original automation and modulation operations; Live 12 chapters 25–26.
(() => {
  const key=(action,mac,win=mac.replace(/⇧/g,'Shift'))=>({action,mac,win});
  const add=(chapter,rows)=>rows.forEach(([anchor,body,title,steps,terms=[],note='',images=[],keys=[]])=>{
    manualGuides.put(chapter,anchor,body,title,steps,terms,note,images);
    manualGuides.items[chapter+'#'+anchor].keys=keys;
  });
  add('automation-and-editing-envelopes',[
    ['recording-automation-in-arrangement-view','Record a control movement along the Set timeline.','Record one volume move',[
      'Choose an Arrangement region and enable Automation Arm.',
      'Enable Arrangement Record, start playback and move the track volume.',
      'Stop recording, show the volume envelope and replay the region.'
    ],[['Automation Arm','Allows manual control changes to be written during direct Arrangement recording.'],['Automation indicator','Marks a control with stored changes.']], 'Recording a Session performance into Arrangement also transfers its clip automation and records manual changes on the Session-recorded tracks.',['automation']],
    ['recording-automation-in-session-view','Session automation belongs to the playing clip rather than a fixed song position.','Add a control move to a clip',[
      'Enable Automation Arm, arm the intended track and play its Session clip.',
      'Enable Session Record and move a control, then turn Session Record off.',
      'Open that control’s automation envelope in the clip to inspect the result.'
    ],[['All Tracks mode','The Session Automation Recording preference can include playing clips on unarmed tracks.'],['Notes','Use an unarmed track with that preference when you want to avoid overdubbing notes.']], 'When transferred to Arrangement, Session automation becomes track automation.'],
    ['session-automation-recording-modes','Mouse and hardware gestures finish writing at different times during Session automation recording.','Check where writing stops',[
      'Record a short mouse move and release the button before the loop ends.',
      'Compare a mapped hardware-knob move, then inspect the envelope through the loop boundary.'
    ],[['Mouse: touch','Writing stops when the mouse button is released.'],['Hardware: latch','After the controller stops moving, writing continues to the loop end.']], 'Stop Session Record when the pass is finished.'],
    ['deleting-automation','Deleting a control’s automation is broader than removing a few selected breakpoints.','Remove only the intended range',[
      'Select time in the specific automation lane and delete that selection if only a passage should change.',
      'Use Delete Automation on the control itself only when you intend to clear its automation throughout the Set.'
    ],[['Control-level deletion','Removes that parameter’s Arrangement and Session automation.'],['Lane selection','Limits the edit to selected envelope material.']], 'Use Undo immediately if the scope was larger than intended.'],
    ['overriding-automation','Moving an automated control while not recording temporarily replaces its stored movement with your manual value.','Try a value without rewriting the envelope',[
      'With recording off, move the automated control and listen.',
      'Use Re-Enable Automation on that control to restore its stored behavior.'
    ],[['Top-bar Re-Enable Automation','Restores all overridden parameters.'],['Relaunch Session clip','Can restore automation stored in that clip.'],['Back to Arrangement','A different control: restores Arrangement playback after Session overrides.']], 'Override does not erase the envelope.'],
    ['drawing-envelopes','Draw Mode writes stepped values across the visible grid.','Draw a short change',[
      'Show the intended automation lane and enable Draw Mode.',
      'Choose the grid division and drag through a short region; leave Draw Mode to edit individual points.'
    ],[['Freehand','Draw with the grid off, or temporarily bypass snapping.'],['Fine values','Hold Shift for finer vertical adjustment.']], 'Check the parameter and selected lane before drawing over existing automation.',['automation'],[key('Draw Mode','B'),key('Grid on / off','⌘ 4','Ctrl 4'),key('Temporary freehand','⌘ while drawing','Alt while drawing')]],
    ['editing-breakpoints','Breakpoints set values at times; the segments between them determine the transition.','Make a precise ramp',[
      'With Draw Mode off, click the envelope line to add two points.',
      'Drag the points into position; use Edit Value from a point’s context menu for a precise value.',
      'Curve the connecting segment if a straight ramp is not the desired movement.'
    ],[['Click a point','Deletes it.'],['Selected points','Move together when a selected point is dragged.'],['Shift','Constrains movement or gives finer vertical adjustment.']], 'Dragging over a neighboring point can remove it.',['automation'],[key('Curve segment','⌥ + drag','Alt + drag'),key('Bypass time snap','⌘ + drag','Alt + drag')]],
    ['stretching-and-skewing-envelopes','Selection handles reshape several breakpoints together.','Lengthen a recorded gesture',[
      'Select the envelope’s time span and locate the side-center handles.',
      'Drag a side handle to stretch time; inspect both ends and the neighboring automation.'
    ],[['Top / bottom handles','Scale values vertically.'],['Corners','Skew the shape.'],['Mirrored handles','Option-drag on Mac or Alt-drag on Windows moves opposite handles together.']], 'Horizontal stretching can erase points outside the selection; Shift changes that behavior to move those points proportionally. Vertical stretching can clip at the parameter limits.'],
    ['simplifying-envelopes','Simplify reduces unnecessary points in a selected envelope passage.','Clean up a recorded move',[
      'Select the busy part of the envelope and choose Simplify Envelope from its context menu.',
      'Compare playback with Undo and Redo before keeping the simpler curve.'
    ],[['Scope','The selected time region.'],['Result','Fewer points and fitted straight or curved segments.']], 'Fewer points are useful only if the motion still does what you intend.'],
    ['inserting-automation-shapes','Preset shapes fill a selected time region with editable breakpoints.','Insert a slow rise',[
      'Select time in the intended envelope lane.',
      'Choose a ramp from the context menu, then adjust its range and boundary points.'
    ],[['Waveforms','Scale to the parameter range and selected duration.'],['Ramps / ADSR','Connect to neighboring values as indicated by the menu preview.'],['No selection','Uses the current grid size.']], 'Full-range shapes can create very large changes. Inspect values before playback.'],
    ['locking-envelopes','Lock Envelopes keeps Arrangement automation at its song position while clips move.','Move a clip without its automation',[
      'Enable Lock Envelopes, then move a clip to a different timeline position.',
      'Check that the envelope stayed behind; undo the move or turn the lock off when finished.'
    ],[['Unlocked','Automation normally follows clip edits.'],['Locked','The envelope stays attached to timeline time.']], 'Locking is not the same as hiding an automation lane.'],
    ['edit-menu-commands','The selection’s location determines whether an edit affects only automation or clips as well.','Copy just an envelope gesture',[
      'Select time inside the intended automation lane, not the main clip lane.',
      'Copy, place the destination in that envelope and paste.'
    ],[['Automation-lane selection','Edits its envelope without editing the clip.'],['Clip-lane selection, unlocked','Edits clips and their associated automation.'],['Different parameter','Can accept a pasted shape, but values may produce an unexpected result.']], 'Check the selected lanes before Delete or Duplicate.',[],[key('Copy','⌘ C','Ctrl C'),key('Paste','⌘ V','Ctrl V')]],
    ['editing-the-tempo-automation','Song Tempo automation lives on the Main track in Arrangement.','Draw a tempo transition',[
      'Unfold Main, enable Automation Mode and choose Mixer → Song Tempo.',
      'Set a useful displayed BPM range, then draw or edit the transition.'
    ],[['Range fields','Set the visible tempo scale and the range for a mapped tempo controller.'],['Warp','Audio must be set up appropriately to follow changing Set tempo.']], 'Changing the display range is not itself a tempo ramp.',[],[key('Automation Mode','A')]]
  ]);
  add('clip-envelopes',[
    ['the-clip-envelope-editor','The Envelopes tab selects a category and then one control within it.','Find the right envelope',[
      'Open the clip’s Envelopes tab and choose the device, Mixer, Clip or MIDI Ctrl category.',
      'Select the control; for Session mixer/device envelopes, check Automation versus Modulation before editing.'
    ],[['Device chooser','Audio clips: Clip (sample controls), each effect, Mixer. MIDI clips: MIDI Ctrl (controller data), each device, Mixer.'],['Adjusted-envelope indicators','LEDs mark controls with envelope data: red for automation, blue for modulation.'],['Only show adjusted envelopes','Narrows the choosers.'],['Clear Envelope','Right-click the Envelope Editor, or press ⌘ Delete / Ctrl Backspace, to reset the selected envelope.'],['MIDI Envelope Auto-Reset','Options or Sample Editor context menu: resets certain MIDI controllers at the start of each clip.']], 'Arrangement control automation is edited on track lanes; Arrangement Clip View provides modulation instead.'],
    ['audio-clip-envelopes','An audio clip can vary its gain, pitch and other available sample controls over its own timeline.','Shape one clip copy',[
      'Duplicate the clip and open the copy’s Envelopes tab.',
      'Choose Clip and a supported control, then edit a short region and compare with the original.'
    ],[['Clip category','Sample-related controls.'],['Mixer / device categories','Controls later in the track’s signal path.']], 'Some controls depend on Warp being enabled and on the chosen Warp mode.'],
    ['clip-envelopes-are-non-destructive','Clip-envelope changes do not rewrite the sample file on disk.','Keep two versions of one sample',[
      'Duplicate an audio clip and change an envelope in the copy.',
      'Switch between the clips; both can still refer to the same source audio.'
    ],[['Render / resample','Creates audio containing the resulting sound.'],['Consolidate','Can create new audio containing clip processing, but not the track’s later device effects.']], 'Deleting a source file still breaks clips that depend on it; non-destructive editing is not file duplication.'],
    ['changing-pitch-and-tuning-per-note','A Transposition envelope adds pitch offsets over time within an audio clip.','Shift one short region',[
      'Enable Warp with a mode that allows pitch changes, then select Clip → Transposition.',
      'Draw an offset across the intended region and return the envelope to zero outside it.'
    ],[['Offset','Additive: added to the clip’s Transpose value, and the total is clipped to −48…+48 semitones.'],['Fine adjustment','Hold Shift while drawing or moving a point; ⌘ ⌥ / Ctrl Alt drag scrolls.'],['Warp mode','Sets how closely pitch follows the envelope: for a quicker response, lower Grain Size in Tones or Texture, or the granulation resolution in Beats.']], 'This edits an audio envelope; it does not detect or create MIDI notes.'],
    ['muting-or-attenuating-notes-in-a-sample','Clip Gain modulation can reduce selected moments without changing the source file.','Lower one event',[
      'Choose Clip → Gain in the Envelopes tab.',
      'Place boundary points around the event, reduce the value between them and check the transitions.'
    ],[['100%','Uses the base Clip Gain setting.'],['0%','Silence.'],['Before devices','Changing clip gain also changes what reaches the track’s effects.']], 'The modulation envelope cannot raise the signal beyond the base Clip Gain value.'],
    ['scrambling-beats','Sample Offset changes which nearby part of an audio sample is read at each moment.','Test one offset step',[
      'Use Beats Warp mode and select Clip → Sample Offset.',
      'Draw one non-zero step, listen to which material it selects, then return it to zero.'
    ],[['Positive','Reads later source material.'],['Negative','Reads earlier material.'],['Units','Sixteenth-note offsets rather than milliseconds.']], 'For an exact cut-and-reorder edit, split clips in Arrangement instead.'],
    ['using-clips-as-templates','Replacing a clip’s sample can retain its settings and envelopes.','Try the same envelope on different audio',[
      'Duplicate the clip first and display that copy in Clip View.',
      'Drag the replacement sample onto Clip View, then check its start, loop, Warp and envelope behavior.'
    ],[['Drop destination','Clip View replaces the source; dropping elsewhere can create a separate clip instead.'],['Retained settings','May need adjustment for a different sample length or tempo.']], 'Keep the original clip if you want to compare or return to it.'],
    ['mixer-and-device-clip-envelopes','Automation sets a parameter’s value. Modulation changes it relative to its current or automated value.','Inspect both layers',[
      'In a Session clip, select a mixer or device parameter.',
      'Switch between Automation and Modulation and check whether either already contains data.'
    ],[['Red','Automation; the control’s absolute position moves.'],['Blue','Modulation; a knob ring can show the relative change.'],['Arrangement','Automation lives on track lanes; modulation can remain inside clips.']], 'A control can have both layers. Editing one does not clear the other. For example, a four-bar automated fade-out with a rising modulation first swells, then fades once the falling automation limit meets the modulation.'],
    ['modulating-mixer-volumes-and-sends','Mixer volume and send modulation reduce their base settings by a relative amount.','Reduce one send during part of a clip',[
      'Set an audible send amount, then select that send’s clip Modulation envelope.',
      'Reduce the envelope over the desired span and compare it with the untouched portion.'
    ],[['Track Volume','Acts after the track’s device chain.'],['Clip Gain','Acts before it.'],['Send modulation','Cannot open the send beyond its base knob value.']], 'If the base send is closed, a modulation envelope cannot open it.'],
    ['modulating-pan','Pan modulation works around the base pan position; its available movement shrinks near the extremes.','Check the available movement',[
      'Center the track’s pan and draw a pan modulation curve in the clip.',
      'Move the base pan toward one side and compare the resulting movement.'
    ],[['Centered base','Allows movement across the stereo field.'],['Hard-panned base','Leaves no effective pan modulation range.']], 'This does not change the source file’s channel content.'],
    ['modulating-device-controls','A device modulation envelope changes a control relative to its base value.','Add a repeatable filter movement',[
      'Select the filter device and frequency control in the clip’s envelope choosers.',
      'Choose Modulation, edit a small range, then move the base cutoff to hear how the relationship changes.'
    ],[['Not a preset','The modulation shape does not fully specify the device’s settings.'],['Range limits','Can restrict the audible result at extreme base values.']], 'Inspect both automation and modulation if the knob’s visible position does not explain what you hear.'],
    ['midi-controller-clip-envelopes','MIDI Ctrl envelopes store messages such as sustain, modulation wheel and pitch bend.','Inspect recorded pedal data',[
      'Open a MIDI clip’s Envelopes tab and choose MIDI Ctrl.',
      'Select the relevant controller, inspect its recorded points and adjust the intended region.'
    ],[['Destination behavior','The receiving instrument decides what a controller message does.'],['Existing data','Marked in the controller chooser.'],['MIDI Envelope Auto-Reset','Can reset certain controller messages at the start of another clip.']], 'Sustain and other held states can carry on when no reset is sent. Check the receiving instrument rather than relying on a controller’s label.'],
    ['unlinking-clip-envelopes-from-clips','An unlinked envelope has timing and loop settings independent of the clip’s notes or sample.','Give one control a different period',[
      'Select the envelope and switch its region from Linked to Unlinked.',
      'Set its start and loop length, then compare them with the clip’s own loop controls.'
    ],[['Independent loop','Turning the envelope loop off does not stop the sample loop.'],['Start marker','Sets where that envelope begins when the clip launches.']], 'Unlinking timing does not detach the envelope from its clip or turn modulation into automation.'],
    ['programming-a-fade-out-for-a-live-set','A one-shot envelope can fade a repeating clip across several repeats.','Fade one repeating track',[
      'Choose its Clip Gain or Track Volume modulation envelope and unlink the timing.',
      'Turn the envelope loop off, set the fade duration and draw a move from full level to silence.'
    ],[['Clip loop','Can keep running underneath the one-shot envelope.'],['Scope','Affects this clip/track, not every track in the Set.']], 'For a whole-mix fade, use the appropriate Main-track automation rather than assuming one clip controls the entire Set.'],
    ['creating-long-loops-from-short-loops','An envelope can repeat more slowly than the clip it shapes.','Make a multi-repeat control cycle',[
      'Unlink a device or mixer modulation envelope and enable its loop.',
      'Set a longer loop than the clip’s loop, draw a change and watch where the two cycles meet.'
    ],[['Independent periods','Other envelopes can have different lengths too.'],['Launch reference','The start markers establish their initial relationship.']], 'Keep the lengths visible while diagnosing an unexpected cycle.'],
    ['imposing-rhythm-patterns-onto-samples','A short looping gain envelope can repeatedly shape audio that is much longer.','Repeat a level pattern over a long clip',[
      'Unlink the Clip Gain envelope and give it a short loop.',
      'Draw alternating high and low regions, then let the longer sample continue underneath.'
    ],[['Envelope period','Determines how often the level pattern repeats.'],['Audio region','Need not share that loop length.']], 'Abrupt gain changes can click; shape the transitions if needed.'],
    ['clip-envelopes-as-lfos','A looping envelope can act as a custom repeating modulation shape.','Build a repeating curve',[
      'Unlink a modulation envelope, enable its loop and choose a duration.',
      'Insert or draw a shape and adjust its depth against the control’s base value.'
    ],[['Tempo-related','Timing is expressed on the clip’s musical-time ruler.'],['Off-grid length','Can drift against bar boundaries without being independent of Set tempo.']], 'An envelope with an unusual loop length is not the same as a free-running oscillator in hertz.'],
    ['warping-linked-envelopes','Linked envelopes stretch with their audio clip’s Warp Marker edits.','Keep a change aligned with an event',[
      'Place a linked envelope change beside the audio event.',
      'Move the event’s Warp Marker and check that the envelope timing follows.'
    ],[['Linked','Follows the clip’s warp timing.'],['Unlinked','Uses its independent region instead.']], 'Check envelope timing after significant Warp edits rather than assuming the old timeline positions remain.']
  ]);
})();
