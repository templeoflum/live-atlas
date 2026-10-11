// Control-level review of Live 12 MIDI effects (chapter 29) and Max for Live devices (chapter 32),
// 2026-09-24. Original summaries checked against the cached manual; attached to existing actions.
(()=>{
  const add=(device,action,anchor,terms,note='',chapter='live-midi-effect-reference')=>deviceControlDetails.add(device,action,anchor,terms,note,chapter);

  // Arpeggiator
  add('arpeggiator','pattern','arpeggiator',[
    ['Style','The note order, shown in the display (step through with the arrows): Up, Down, Converge, Diverge and more, plus Play Order (order you played), Chord Trigger (repeated block chord), Random, Random Other (no repeats until all used) and Random Once (one random pattern, kept until the input changes).'],
    ['Rate','Speed in ms (Free) or synced divisions (Sync).'],
    ['Gate','Note length as a percentage of the rate; above 100% overlaps for legato.'],
    ['Hold','Keeps the pattern playing after release. Add keys while holding; play a note again to remove it.'],
    ['Pattern Offset','Rotates where the pattern starts: 1 starts on the second note and ends on the first.'],
    ['Groove','Applies a groove, scaled by the Global Groove Amount.'],
    ['Velocity / Decay / Target','Ramps velocity toward Target over Decay (e.g. Target 0 fades out); with Retrigger on, the ramp restarts with the pattern.']
  ]);
  add('arpeggiator','transpose','arpeggiator',[
    ['Distance / Steps','Transposition per repeat (semitones or scale degrees) and how many repeats: +12 st with 2 steps plays C3, then C4, then C5.'],
    ['Root / Scale','Transpose within a chosen scale, or follow the clip with Use Current Scale (the choosers then switch off).'],
    ['Retrigger','Off; Note (restart on a new note); or Beat (restart at the Interval). The LED flashes on each restart.'],
    ['Repeats','How many times the pattern plays (∞ by default); 1 or 2 imitates a strum, and with Retrigger it creates patterns with gaps.']
  ]);

  // CC Control
  add('cc-control','send','cc-control',[
    ['Fixed controls','Mod Wheel, Pitch Bend (negative bends down) and Pressure (channel aftertouch) sent to hardware.'],
    ['Custom A','A button sending on/off (or min/max); meant for sustain (CC 64), but assignable to any CC.'],
    ['Custom B–M','Twelve renameable dials, each assigned to a CC; names show on Push and save with presets. Automate them or turn them live.'],
    ['Pages / Send','Title-bar toggles switch controls 1–8 and 9–16; Send transmits all current values.']
  ]);
  add('cc-control','learn','cc-control',[
    ['Learn','Assign a custom control by sending CC from a controller; also reveals which CC a controller sends.'],
    ['Merging','Existing CC automation for the same message is merged with CC Control’s output.']
  ]);

  // Chord
  add('chord','stack','chord',[
    ['Shift 1–6','Up to six extra pitches, ±36 semitones from the played note, in any order: +4 and +7 make a major chord. LEDs flash as each plays. The same pitch can’t be used twice.'],
    ['Learn','Hold a chord on a controller: the first key is the root, the rest fill the Shift controls in order; hold more keys to add. Turn Learn off when done.'],
    ['Use Current Scale','Shifts in scale degrees instead of semitones.'],
    ['Send Per Note Events to Generated Notes','Context menu: passes MPE data to the added notes; with scale awareness, bends stay in the scale.']
  ]);
  add('chord','spread','chord',[
    ['Velocity','Per added note, 1–200% relative to the played velocity.'],
    ['Chance','Per added note, the probability it sounds.'],
    ['Strum','Up to 400 ms between notes: positive starts from the played note up through Shift 1–6, negative reverses. Play Duplicate Notes When Strumming (context menu) allows repeats.'],
    ['Tension / Crescendo','Strum speeding up (positive) or slowing down (negative); a velocity ramp up or down across the strum.']
  ]);

  // Note Length
  add('note-length','length','note-length',[
    ['Note On trigger','Output length comes from Length (ms or synced) scaled by Gate: 100% as set, 200% double, 50% half.'],
    ['Latch','Note On: each note plays until the next Note On. Note Off: notes trigger once all keys (or the sustain pedal) are released. Gate and Length then switch off.']
  ]);
  add('note-length','release','note-length',[
    ['Note Off trigger','Notes start when you release the key, i.e. delayed by their played length, then Gate and Length apply.'],
    ['Release Velocity','Blend of Note On and Note Off velocity for the output; leave at 0% if your keyboard lacks release velocity.'],
    ['Decay Time','Velocity decays from note-on; its value at release becomes the output velocity.'],
    ['Key Scale','Positive makes notes below C3 longer and above shorter; negative the reverse.']
  ]);

  // Pitch
  add('pitch','transpose','pitch',[
    ['Pitch','Transposes by ±128 semitones, or ±30 scale degrees with Use Current Scale.'],
    ['Step Up / Step Down / Step Width','Jump by 1–48 semitones (1–30 degrees); all can be key- or MIDI-mapped for live changes.']
  ]);
  add('pitch','range','pitch',[
    ['Lowest / Range','The window of notes allowed through.'],
    ['Block / Fold / Limit','Outside notes are blocked (LED flashes), transposed to fit inside, or pinned to the lowest or highest note.']
  ]);

  // Random
  add('random','chance','random',[
    ['Chance','How likely a note’s pitch is changed: a dry/wet for randomness.'],
    ['Choices × Interval','Number of possible pitches times their spacing. Chance 50%, Choices 1, Interval 12: half the C3s become C4. Choices 12, Interval 1: half become any note C#3–C4.'],
    ['Sign','Add (above), Sub (below) or Bi (either way); + / 0 / − LEDs show what happened.'],
    ['Use Current Scale','Keeps random pitches in the clip’s scale.']
  ]);
  add('random','cycle','random',[
    ['Alt mode','Cycles through the choices in order instead of randomly. Chance 100% always advances; 0% always passes the played note.'],
    ['Examples','Choices 12, Interval 1 climbs a semitone per repeat up to C4, then restarts; Choices and Interval 2 alternates C3 and D3, like up/down bows or left/right hand samples. With a scale it acts as a simple step sequencer.']
  ]);

  // Scale
  add('scale','map','scale',[
    ['Note Matrix','13×13: columns are incoming notes, rows outgoing ones, starting from the root at lower left; black squares match black keys.'],
    ['Base / Scale Name','Root and scale, or follow the clip with Use Current Scale.'],
    ['User','Move highlighted squares, or click to remove them; removed notes are never output.'],
    ['Fold','User scales: fold any mapping more than six semitones away (C3 → A3 becomes C3 → A2).']
  ]);
  add('scale','range','scale',[
    ['Transpose','±36 semitones: +7 moves C major to G major.'],
    ['Lowest / Range','Only notes in this window are remapped or transposed, e.g. C2 to B4, leaving the rest alone.']
  ]);

  // Velocity
  add('velocity','reshape','velocity',[
    ['Velocity Curve','Maps incoming velocities in the Lowest–Range window (horizontal) to the Out Low–Out Hi range (vertical). Out Low 80, Out Hi 127 makes everything louder. Full ranges bypass it.'],
    ['Operation','Apply to Note On velocity, release velocity (Rel. Vel.), or both.'],
    ['Drive','Pushes values toward loud (positive) or soft (negative).'],
    ['Compand','Positive spreads values toward the extremes; negative squeezes them to the middle.']
  ]);
  add('velocity','range','velocity',[
    ['Clip / Gate / Fixed','Out-of-window velocities are clipped into range, removed (LED flashes), or every note uses Out Hi.'],
    ['Random','Random variation within the output range (e.g. ±50 within 60–127), shown as a grey band.']
  ]);
  // Max for Live modulators and utilities (chapter 32)
  const M='max-for-live-devices';
  const mapping=[
    ['Map / Multimap / Unmap','Click Map, then any automatable parameter. Show/Hide Multimap reveals more slots, up to eight targets; Unmap removes one.'],
    ['Modulation (Mod)','Default: you can still move the target; the device moves it around that base value. Bipolar swings both ways, Unipolar one way; Modulation Amount sets the range.'],
    ['Remote Control','The device alone sets the value (you can’t move it by hand); Min and Max scale the range.']
  ];
  add('lfo','map','lfo',mapping,'',M);
  add('lfo','cycle','lfo',[
    ['Waveform','Sine, Up, Down, Triangle, Square, Random, Bin, Stray or Glider.'],
    ['Shape / Steps','Bend or skew the wave (not for Random, Bin, Stray, Glider); quantize into up to 24 steps (not for Random, Bin, Square).'],
    ['Jitter / Smooth','Add randomness; soften sudden changes, including the jitter.'],
    ['Rate / ×10','Hz or synced; ×10 multiplies Hz values.'],
    ['Depth / Offset / Phase','Overall amount; shift the centre up or down (the display line marks it); start position in the cycle.'],
    ['Hold / R','Freeze the output (resumes from there); Retrigger restarts from Phase.']
  ],'',M);
  add('envelope-follower','map','envelope-follower',mapping.concat([
    ['Gain / Rise / Fall','Input gain; smoothing of the envelope’s attack and release.'],
    ['Delay','Delays the envelope, in time or synced divisions. A classic use is auto-wah on a filter.']
  ]),'',M);
  add('envelope-follower','route','envelope-follower',[
    ['Sidechain','Expand Audio Routing with the triangle, enable Sidechain, pick a track and Pre FX, Post FX or Post Mixer (or a Rack’s channel), e.g. a Drum Rack for rhythmic ducking.'],
    ['Direct / S.C. meters','Levels of the track input and the external signal.'],
    ['Sidechain Mix','0% follows the track input only, 100% the external signal only.']
  ],'',M);
  add('shaper','draw','shaper',mapping.concat([
    ['Breakpoints','Click to add; ⌥/Alt-drag between points to curve; Shift-click to delete. Clear empties the envelope; six presets start new shapes.'],
    ['Grid / Snap','Grid divisions, and snapping points to them.']
  ]),'',M);
  add('shaper','play','shaper',[
    ['Loop / 1-Shot / Manual','Cycle continuously at Rate; run once when the mappable T button is pressed; or scrub with the Manual control.'],
    ['Rate / Depth','Hz or synced; overall amount.'],
    ['Jitter / Smooth / Offset','Randomness, softening, and centre shift; the small oscilloscope shows the output.'],
    ['Phase / R','Start position; Retrigger restarts there (unavailable in Sync).']
  ],'',M);
  add('envelope-midi','map','envelope-midi',mapping.concat([
    ['Attack / Decay / Sustain / Release','ADSR with slopes for A, D and R; drag handles in the display.'],
    ['Velocity','Scales the peak by note velocity.'],
    ['Sustain toggle','On holds while the note is held; off makes a one-shot that releases after Decay regardless.']
  ]),'',M);
  add('envelope-midi','trigger','envelope-midi',[
    ['Loop Mode','Free (each note), Sync (retrigger at Sync Rate), Loop (cycle at Global Time), Echo (repeats at Env Echo Time, sustained by Env Feedback). An LED flashes on each trigger.'],
    ['Global Time / Amount','Stretches (above 1.00) or compresses the envelope; overall modulation amount.']
  ],'',M);
  add('shaper-midi','draw','shaper-midi',mapping.concat([
    ['Breakpoints','Click to add; ⌘/Ctrl-click makes the single, larger sustain point held while the note is down; ⌥/Alt-drag curves; Shift-click deletes. Clear and six presets.'],
    ['Grid / Snap / Velocity','Grid and snapping; how much velocity scales the depth (0% ignores it).']
  ]),'',M);
  add('shaper-midi','repeat','shaper-midi',[
    ['Triggering','Each MIDI note restarts the envelope (unlike audio Shaper); the display LED flashes.'],
    ['Loop / Rate','Repeat while a note is held (the sustain point is then bypassed), at Hz or synced Rate.'],
    ['Echo / Time','Echoes of the output: feedback amount and spacing.'],
    ['Jitter / Smooth / Offset / Depth','Randomness, softening, centre shift and overall amount.']
  ],'',M);
  add('expression-control','connect','expression-control',[
    ['Five Mod Source tabs','Each takes Velocity, Modwheel, Pitchbend, Pressure, Keytrack, Expression, Random, Increment, Slide or Sustain, and maps it with Map.'],
    ['Modulate / Remote Control','Modulate merges with your own moves (Bipolar or Unipolar, with Output Range Max); Remote Control takes over, with Output Range Min and Max.'],
    ['Increment Steps','For Increment: notes needed to cycle the full range (1–32); stopping the transport resets it.'],
    ['Random Amount','For Random: deviation per note.']
  ],'',M);
  add('expression-control','curve','expression-control',[
    ['Curve Type','Linear (two points, Curve A shapes it) or S-shaped (three points: Curve A upper, Curve B lower; Curve Link ties them inversely).'],
    ['Min / Max / X-Y','Curve end values, and the S-curve’s middle point; or drag in the display.'],
    ['Smoothing','Linear or logarithmic, with Rise and Fall times up to 1000 ms.']
  ],'',M);
  add('mpe-control','press','mpe-control',[
    ['Purpose','Reshapes incoming MPE (per-note) data with curves before it reaches mapped parameters, or converts it to ordinary MIDI for non-MPE instruments.'],
    ['Sources','Press, Slide and NotePB, each switchable; the selected one is editable in front.'],
    ['Linear / S-shaped','Linear compresses or expands the response (Curve knob, Min, Max). S-shaped adds a movable middle point (X-Y) and, with Curve Link off, two Curve dials.'],
    ['Advanced / Smooth','The triangle opens per-source options, including smoothing with Rise and Fall.']
  ],'',M);
  add('mpe-control','press','press',[
    ['Default','A value for notes that carry no MPE data.'],
    ['Swap to Slide','Sends pressure to Slide, for controllers with only polyphonic aftertouch.'],
    ['Press to AT','Converts to channel aftertouch for non-MPE instruments.']
  ],'',M);
  add('mpe-control','slide','slide',[
    ['Slide','Vertical finger position (CC 74), with a Default for non-MPE notes.'],
    ['Centered','For pads: zero at the centre, rising as the finger moves away.'],
    ['Abs / Rel / Ons','Absolute position; relative from mid-range as you move; or only the value at note-on (smoothing off).'],
    ['Slide to Mod','Converts to Mod Wheel (CC 1) for non-MPE instruments.']
  ],'',M);
  add('mpe-control','bend','notepb',[
    ['Pitch Range','Scales per-note bend when controller and instrument ranges differ: 2x maps ±48 to ±24 st, or widens other mappings.'],
    ['NotePB to PB','Converts per-note bend to ordinary pitch bend.']
  ],'',M);
  add('note-echo','repeat','note-echo',[
    ['Sync / Delay Time','Sixteenth-note buttons with a swing percentage, or ms.'],
    ['Thru / Mute','Play the original plus echoes, or echoes only.'],
    ['Pitch','Transposition added at each repeat.'],
    ['Delay / Fback','Echo velocity and feedback (how long echoes continue).']
  ],'',M);
  add('note-echo','expression','note-echo',[
    ['MPE','Echo MPE data with the notes (otherwise filtered out).'],
    ['Press / Slide / Note PB','Feedback for each; below 100% they fade with each repeat.']
  ],'',M);
  add('align-delay','delay','align-delay',[
    ['Time','Milliseconds: align with A/V gear or add subtle stereo width.'],
    ['Samples','Compensate for another device’s latency.'],
    ['Link L/R','The left setting drives both channels; Delay Right greys out.']
  ],'',M);
  add('align-delay','distance','align-delay',[
    ['Distance','Metres or feet, to correct timing between speakers in a PA.'],
    ['Temperature','°C or °F and a value: sound speed depends on air temperature, so matching the room improves accuracy.']
  ],'',M);
})();
