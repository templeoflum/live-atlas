// Control-level review of Live 12 instruments, 2026-09-24.
// Original summaries checked against the cached manual (chapter 30). Each block attaches to an
// existing device action through deviceControlDetails; manual sections keep their source links.
(()=>{
  const add=(device,action,anchor,terms,note='')=>deviceControlDetails.add(device,action,anchor,terms,note,'live-instrument-reference');

  // Drift
  add('drift','mix','oscillator-1',[
    ['Osc 1 waveform','Sine, Triangle, Shark Tooth, Saturated, Saw, Pulse or Rectangle. Shark Tooth (after a classic Moog shape) and Saturated (good for bass) are unique to Drift.'],
    ['Oct','Transposes the oscillator in octaves.'],
    ['Shape','Changes the waveform’s harmonic content, similar to pulse-width modulation; each waveform responds differently. Watch the waveform display as you move it.'],
    ['Shape Mod source / amount','Env 1, Env 2/Cyc, LFO, Key, Velocity, Modwheel, Pressure or Slide, at −100…100%. Key gives more modulation to higher notes (or lower ones with a negative amount). Shape Mod works even with Shape at 0%.']
  ]);
  add('drift','mix','oscillator-2',[
    ['Osc 2 waveform','Sine, Triangle, Saturated, Saw or Rectangle.'],
    ['Oct / Detune','Octave transposition, and a finer offset in semitones.']
  ]);
  add('drift','mix','waveform-display',[
    ['Waveform display','Shows the combined output of Osc 1, Osc 2 and Noise (when on), and changes as you adjust them.']
  ]);
  add('drift','mix','oscillator-mixer',[
    ['On switches / gain','Enable Osc 1, Osc 2 and white Noise, and set each level.'],
    ['Filter headroom','The filter has two saturation points: raising a source above the default −6 dB drives the first, above 0 dB the second, for analog-style distortion.'],
    ['Filter arrows','Per source: route it through the filter, or bypass the filter completely.'],
    ['R (Retrigger)','On: both oscillators restart at the same phase with each note. Off: free-running.']
  ]);
  add('drift','filter','filter-section',[
    ['Freq / Type','Low-pass cutoff. Type I is a 12 dB/octave DFM-1 with more internal distortion; Type II is a 24 dB/octave Cytomic MS2 (Sallen-Key) with soft-clipped resonance.'],
    ['Key','0.00: notes don’t affect cutoff. 1.00: cutoff follows pitch, lower for low notes and higher for high ones.'],
    ['Res / HP','Low-pass resonance, and a separate high-pass cutoff.'],
    ['X-Y display','Click the Filter section to edit it in the Envelopes display: the left dot sets high-pass; the right dot sets low-pass (horizontal) and resonance (vertical).'],
    ['Freq Mod','Two sources for the low-pass cutoff, each −100…100%.']
  ]);
  add('drift','shape','envelope-1',[
    ['Attack / Decay / Sustain / Release','Time to peak, time down to the sustain level, the level held while the key is down, and time back to zero after release. Drag in the display or use the knobs.'],
    ['1 / 2','Choose which envelope the display edits.']
  ],'Envelope 1 shapes the amplitude of the whole oscillator section.');
  add('drift','shape','envelope-2',[
    ['Envelope 2','Also ADSR, but not tied to amplitude: use it as a modulation source anywhere in Drift.'],
    ['Cycling Envelope','The switch left of Attack turns it into an LFO-like shape that restarts with each note.'],
    ['Tilt / Hold','Tilt moves the envelope’s midpoint (and at extremes its slopes); Hold sets how long it stays at maximum.'],
    ['Rate / Ratio / Time / Sync','Time modes for the cycle: Hz, a ratio of the note pitch, milliseconds, or tempo-synced divisions.']
  ]);
  add('drift','modulate','pitch-mod',[
    ['Pitch Mod sources','Two slots, each Env 1, Env 2/Cyc, LFO, Key, Velocity, Modwheel, Pressure or Slide, at −100…100%. Affects both oscillators.'],
    ['FM','An LFO in Ratio mode modulating pitch can produce FM tones.']
  ]);
  add('drift','modulate','lfo-section',[
    ['Time mode','Rate, Ratio, Time or Sync, as for the Cycling Envelope.'],
    ['Waveform','Sine, Triangle, Saw Up, Saw Down, Square, Sample & Hold, Wander (a smoothed S-shaped sample-and-hold), Linear Envelope or Exponential Envelope (one-shot decays).'],
    ['R (Retrigger)','Restart the LFO at the same phase on every note, or leave it free-running.'],
    ['Amount / Mod','Overall LFO depth, plus a modulation source and amount acting on the LFO itself.']
  ]);
  add('drift','modulate','mod-section',[
    ['Three slots','Sources: Env 1, Env 2/Cyc, LFO, Key, Velocity, Modwheel, Pressure, Slide.'],
    ['Destinations','Osc 1 Gain, Osc 1 Shape, Osc 2 Gain, Osc 2 Detune, Noise Gain, LP Frequency, LP Resonance, HP Frequency, LFO Rate, Cyc Env Rate, Main Volume.'],
    ['Amount','Each slot’s depth, from −100% to 100%.']
  ]);
  add('drift','voices','global-section',[
    ['Poly','One voice per note, up to 32.'],
    ['Mono / Thickness','One note at a time, built from four voices; Thickness raises the three extra voices from silent (0) to audible. A new note cuts off a held one. Legato keeps envelopes running when pitch changes; Glide sets the slide time.'],
    ['Stereo / Spread','Two voices per note panned apart; Spread sets the width.'],
    ['Unison / Strength','Four voices per note, each detuned differently; Strength sets how much.'],
    ['Voices','Maximum voices. With 32: Poly plays 32 notes, Stereo 16, Unison 8.'],
    ['Drift','Adds per-voice random variation to oscillator pitch and filter cutoff; higher values sound more out of tune.'],
    ['Volume / Vel > Vol','Output level and how much velocity affects it.'],
    ['Transpose / Note PB / PB Range','Global pitch (±48 st); per-note pitch bend on or off (off lets an MPE controller play without finger-position pitch changes); pitch-bend range.']
  ]);
  // Simpler
  add('simpler','play','simpler',[
    ['Warp in Simpler','Warped samples play at the Set tempo whichever note you play. A warped clip dragged in keeps its Warp Markers and settings, and only the clip’s start/end or loop region is used.'],
    ['Sample / Controls tabs','Waveform and sound controls. The title-bar button moves the Sample view into Live’s main window so Controls fill the device.'],
    ['Replacing','Drag in another sample, or use the Hot-Swap button at the waveform’s lower right. ⌘/Ctrl-scroll zooms the waveform.']
  ]);
  add('simpler','play','playback-modes',[
    ['Classic','Default: pitched and polyphonic, full ADSR, loops while a note is held.'],
    ['One-Shot','Monophonic, for drum hits or short phrases; simplified envelope, no looping; plays the whole region regardless of note length.'],
    ['Slicing','Non-destructive slices played chromatically; suits drum breaks.']
  ]);
  add('simpler','play','one-shot-playback-mode',[
    ['Region flags','Set the playable region. No Loop, Length or Voices controls: One-Shot is strictly monophonic.'],
    ['Trigger / Gate','Trigger plays on after release. Gate starts fading as soon as the note is released.'],
    ['Fade In / Fade Out','Time to reach full volume; Fade Out starts that long before the region’s end (or after release, with Gate).'],
    ['Snap','Moves the start and end flags to zero crossings.']
  ]);
  add('simpler','loop','classic-playback-mode',[
    ['Flags / Start / Length','The flags set the available region; Start and Length are percentages of it (Length 50% plays half the region).'],
    ['Loop switch / Loop','Whether a held note loops, and how much of the available sample loops. Very short loops turn grainy or pitched and can use a lot of CPU, especially with Complex modes.'],
    ['Snap','Moves loop and region markers to zero crossings, judged on the left channel only, so stereo samples can still click.'],
    ['Fade','Crossfades loop end into loop start; good for long textures. Unavailable with Warp on.'],
    ['Gain','Sample level before the filter, separate from the output Volume. Present in all modes.'],
    ['Voices / Retrig','Maximum simultaneous voices; the oldest are stolen when exceeded. Retrig cuts off a repeated note; audible only with long releases and more than one voice.'],
    ['Zoom / pan','Drag vertically or ⌘/Ctrl-scroll to zoom; drag horizontally to pan.']
  ]);
  add('simpler','slice','slicing-playback-mode',[
    ['Slice By','Transient (Sensitivity sets how many, up to 64), Beat (a Division), Region (a number of equal slices) or Manual (double-click to add; none placed automatically).'],
    ['Playback','Mono plays one slice at a time; Poly overlaps them (with Voices and Retrig); Thru plays from the triggered slice through the rest of the region.'],
    ['Trigger / Gate / Fades','As in One-Shot. With Mono or Poly, fades span each slice; with Thru, from the slice to the region end.'],
    ['Editing slices','Automatic slices are blue, manual ones white. Double-click a slice to delete it; drag to move. In Transient mode, ⌥/Alt-click toggles manual vs automatic; manual slices survive Sensitivity changes.']
  ]);
  add('simpler','warp','warp-controls',[
    ['Warp off','A conventional sampler: higher notes play faster as well as higher.'],
    ['Warp on','Plays in sync with the Set tempo whatever the note; modes and settings work as for audio clips.'],
    ['Warp as… / ÷2 / ×2','Fits the sample into a number of bars or beats (Live’s guess from its length); halve or double if the guess is wrong.']
  ]);
  add('simpler','shape','filter-1',[
    ['Types / slopes','Low-pass, high-pass, band-pass, notch and Morph, each at 12 or 24 dB.'],
    ['Circuits','Clean (efficient, as in EQ Eight; all types), OSR (hard-clipped resonance; all types), MS2 (Sallen-Key soft clipping), SMP (between MS2 and PRD) and PRD (ladder, no resonance limit); the last three for low- and high-pass only.'],
    ['Frequency / Resonance','Where the filter acts, and the boost around that point. Drag the curve in the display, or use the knobs.'],
    ['Drive','Adds gain or distortion before the filter, for low-, high- or band-pass with any circuit except Clean.'],
    ['Morph','Sweeps continuously LP → BP → HP → notch → LP; the knob’s context menu snaps to each type.'],
    ['Cutoff modulation','Vel and Key in the filter display, the filter Envelope amount, and the LFO’s Filter slider. Frequency / Envelope buttons switch the display.']
  ]);
  add('simpler','shape','envelopes-2',[
    ['Three envelopes','Amplitude, filter and pitch, each ADSR; switch between them with their buttons. Drag handles or use the knobs.'],
    ['Amounts','The filter and pitch envelope amounts sit at the top right of their sections.'],
    ['Loop Mode','Loops the amplitude envelope. Loop and Trigger restart it after Decay if the note is still held (Time sets the return from Sustain); Beat and Sync restart it after the Rate time.']
  ]);
  add('simpler','move','lfo',[
    ['Waveforms / rate','Sine, square, triangle, saw down, saw up or random; 0.01–30 Hz or tempo-synced. Each note gets its own LFO.'],
    ['Attack','Time for the LFO to reach full depth.'],
    ['R / Offset','Retrigger restarts each note’s LFO at the Offset phase; Offset does nothing with Retrigger off.'],
    ['Key','Scales the LFO rate with note pitch; at zero every voice runs at the same rate.'],
    ['Volume / Pitch / Pan / Filter','How much the LFO moves each destination.']
  ]);
  add('simpler','move','global-parameters-1',[
    ['Pan / Random > Pan','Pan position, plus random variation per note.'],
    ['Spread','Two detuned voices per note, panned left and right, for a stereo chorus. Read at each note-on, so it can be switched per note.'],
    ['Volume / Velocity > Volume','Output level and velocity sensitivity; LFO on Volume gives tremolo.'],
    ['Transpose / Detune','C3 plays the original pitch; Transpose ±48 semitones, Detune ±50 cents. Pitch bend is fixed at ±5 semitones.'],
    ['Glide / Portamento / Time','Slide from the previous note’s pitch: Glide is monophonic, Portamento polyphonic; Time sets the speed.']
  ]);
  add('simpler','move','context-menu-options-for-simpler',[
    ['Use Constant Power Fade for Loops','On by default (title-bar menu); off gives linear crossfades.'],
    ['Simpler -> Sampler','Converts a preset for multisampling; warping and slicing don’t carry over, so such presets behave differently.'],
    ['Manage Sample / Show in Browser / Show in Finder','Reveal the sample in File Manager, the Browser or your file system (not for official Pack samples).'],
    ['Normalize Volumes','Raises the sample so its peak uses all the headroom.'],
    ['Crop / Reverse','Non-destructive: applied to a copy. Crop drops what is outside Start–End; Reverse plays backwards.'],
    ['Slice to Drum Rack / Slice to New MIDI Track','Slicing mode only: replace Simpler with a Drum Rack of the slices, or add a new track with that Drum Rack and a clip playing the slices in order.']
  ]);
  add('simpler','move','strategies-for-saving-cpu-power-1',[
    ['CPU savers','Avoid Complex and Complex Pro warping; turn off the Filter (24 dB costs more than 12 dB) and the LFO; prefer mono samples; lower Voices; set Spread to 0%.']
  ]);
  // Operator
  add('operator','connect','general-overview-1',[
    ['Shell / display','The shell shows the key controls of eight sections: oscillators A–D on the left; LFO, filter, pitch and global on the right. Touching a shell control shows that section’s details in the central display. The triangle at top left folds the device.'],
    ['Algorithm','Eleven fixed patterns set which oscillators are heard and which modulate others; signal flows top to bottom in each icon. Choose it in the global display; it can be mapped, automated or modulated.'],
    ['Waveforms','Beyond FM’s usual sine: classic shapes, two noises, and drawn waveforms. Try FM without the filter first.']
  ]);
  add('operator','connect','global-shell-and-display',[
    ['Time / Tone / Volume','Time scales every envelope rate. Tone limits high-frequency content (brighter settings alias more). Volume is the output level.'],
    ['Voices / R','Maximum notes (oldest are cut first). Retrigger reuses a voice for a repeated note instead of adding one.'],
    ['Interpolation / Antialias','Oscillator and LFO interpolation (off sounds rougher, saves CPU) and the high-quality antialias mode.'],
    ['Time < Key / PB Range','Higher notes run envelopes faster; pitch-bend range.'],
    ['Pan / Pan < Key / Pan < Rnd','Per-note pan; spread by pitch (low left, high right, piano-like) or at random.'],
    ['MIDI routing','Velocity, Key, Aftertouch, Pitch Bend and Mod Wheel each reach two destinations with their own Amounts. Time < Key and pitch-bend range are fixed, but those sources can still take one more target.'],
    ['Modulation targets','Osc Volume A–D, Osc Crossfade A/C and B/D, Osc Feedback, Osc Fixed Frequency, FM Drive (level of the modulating oscillators), Filter Frequency, Res, Q (Legacy), Morph, Drive and Envelope Amount, Shaper Drive, LFO Rate and Amount, Pitch Envelope Amount, Volume, Panorama, Tone and Time.']
  ]);
  add('operator','wave','built-in-waveforms',[
    ['Sine family','Sine (the usual FM choice), Sine 4 Bit and Sine 8 Bit for a retro 8-bit sound.'],
    ['Saw D / Square D','Digital shapes suited to digital basses.'],
    ['Numbered shapes','Square, triangle and saw are resynthesized: the number (e.g. Square 6) is how many harmonics. Lower numbers sound mellower and alias less on high notes.'],
    ['Noise Looped / Noise White','A looping noise sample, or truly random noise.']
  ]);
  add('operator','wave','user-waveforms',[
    ['User','Draw the amplitudes of the harmonics, from scratch or starting from a built-in wave. The small preview beside the chooser updates live; the Status Bar shows harmonic number and level. Shift-drag edits one harmonic.'],
    ['16 / 32 / 64','How many harmonics you can draw.'],
    ['Repeat','Continues the drawn pattern upward with a fade: low values are brighter, high values roll off more. Off truncates above the last harmonic.'],
    ['Context menu','Draw All, Even or Odd harmonics; Normalize keeps level steady as you add harmonics (off can get extremely loud); export as .ams to User Library/Samples/Waveforms. .ams files load back into Operator, Simpler or Sampler.'],
    ['Copy / paste','Waveforms copy between oscillators from the Osc Preview’s context menu.']
  ]);
  add('operator','wave','more-oscillator-parameters',[
    ['Coarse / Fine','Frequency ratio to the played note. The ratio between modulator and carrier, with the modulator’s level, defines the FM result.'],
    ['Fixed / Freq / Multi','Fixed frequency regardless of note (down to 0.1 Hz): only timbre changes across keys, handy for drums.'],
    ['Osc < Vel / Q','Velocity changes frequency; Q keeps it to whole-number ratios, off gives detuned or inharmonic results.'],
    ['Level / Vel / Key','Output level in the shell; the envelope can respond to velocity and pitch.'],
    ['Phase / R','Starting phase; with Retrigger each note restarts the wave there, otherwise free-running.'],
    ['Feedback','An oscillator that no other oscillator modulates can modulate itself.']
  ]);
  add('operator','wave','aliasing',[
    ['Aliasing','High harmonics fold back into unrelated pitches, especially with FM and rich waves like Saw 32. A little can be useful; too much makes high notes lose pitch.'],
    ['Antialias / Tone','Antialias (on for new patches, in the global section) reduces it. Lowering Tone also reduces it, sometimes like a low-pass filter, at the cost of brightness.']
  ]);
  add('operator','shape','envelopes-1',[
    ['Seven envelopes','One per oscillator, plus filter, pitch and LFO.'],
    ['Rates and levels','Oscillator envelopes have three rates and three levels: initial → peak (attack), → sustain (decay), → silence after release. Drag breakpoints; a selected one moves with the arrow keys.'],
    ['Slopes','Filter and pitch envelopes: drag the diamonds between points. Positive moves fast then slow; negative stays flat then speeds up; zero is linear.'],
    ['Loop / Loop Time','When sustain is reached with the note held, the envelope restarts (from its current level, avoiding clicks), at the Loop Time rate. Can loop very fast.'],
    ['Beat / Sync / Repeat','Restart after a Repeat time in song beats. Beat keeps your timing; Sync quantizes the first repeat to the nearest 16th (only while the song plays).'],
    ['Trigger','Ignores Note Off, so key length doesn’t matter: good for percussion.'],
    ['Time < Key / Time < Vel','Envelope rates follow pitch (global) or velocity (per envelope). Beat and Sync times ignore the global Time.'],
    ['Context menu','Copy an envelope between oscillators; set all levels to maximum, minimum or middle.']
  ]);
  add('operator','shape','pitch-shell-and-display',[
    ['Pitch Env on / Pitch Env','Switch the pitch envelope on (off saves CPU) and set its depth: 100% follows its levels exactly, −100% inverts them.'],
    ['Destination A–D / LFO','Which oscillators (and the LFO) it affects, with a Dest. A amount.'],
    ['Dest. B / Amt. B','One more modulation target.'],
    ['End','The level it moves to after release, at the release rate (filter envelope has it too).'],
    ['Looping trick','Looped and applied only to the LFO, it acts as a second LFO; the LFO’s own looped envelope can be a third.']
  ]);
  add('operator','filter','filter-section-2',[
    ['Types / circuits','Low-pass, high-pass, band-pass, notch and Morph at 12 or 24 dB, with Clean, OSR, MS2, SMP and PRD circuits (the last three for low- and high-pass).'],
    ['Frequency / Resonance / Drive','Cutoff and emphasis; Drive adds gain before low-, high- or band-pass with any non-Clean circuit.'],
    ['Morph','Sweeps LP → BP → HP → notch; its context menu snaps to each.'],
    ['Cutoff modulation','Freq < Vel, Freq < Key and Envelope in the filter display; the LFO via its FIL switch or Dest. B = Filter Freq.'],
    ['Play by Key','Frequency context menu: sets Freq < Key to 100% and cutoff to 466 Hz for even key tracking.'],
    ['Shaper / Shp. Drive / Dry/Wet','A waveshaper after the filter, its input level, and the mix; at 0% wet it is bypassed.']
  ]);
  add('operator','filter','lfo-section-1',[
    ['Audio-rate LFO','Almost a fifth oscillator: it modulates the oscillators’ frequency. Dest. A switches pick oscillators and the filter, with one depth; the LFO can be switched off.'],
    ['Dest. B','One extra target with its own amount.'],
    ['Waveforms','Classic shapes, S&H (random steps) and band-pass-filtered noise, which is useful for FM hi-hats and snares.'],
    ['Rate / Range / Rate < Key','Rate with Low, High or Sync ranges; Rate < Key makes it follow pitch, fixed, or in between.'],
    ['R / Amount / Amt < Vel','Retrigger per note; overall amount (scaling Dest. A and B), which velocity can modulate. The LFO also has its own envelope.']
  ]);
  add('operator','voices','global-controls-2',[
    ['Voices','Up to 32; 6–12 is a realistic CPU compromise. At 1, overlapping notes play legato: only pitch changes, envelopes don’t restart.'],
    ['Volume / Pan','Volume is in the shell, Pan in the display, with Pan < Key and Pan < Rnd.']
  ]);
  add('operator','voices','glide-and-spread',[
    ['Glide / Glide Time','Polyphonic glide from the previous note’s pitch, set in the pitch display.'],
    ['Spread','Two detuned voices per note panned apart, for a stereo chorus. Read at each note-on; CPU-intensive.'],
    ['Transpose','Global transposition in the pitch section.']
  ]);
  add('operator','voices','strategies-for-saving-cpu-power',[
    ['CPU savers','Turn off the filter or LFO when unused, keep Voices around 6–12, use Spread sparingly, and turn off Interpolation and Antialias if acceptable. Switching oscillators off saves nothing.']
  ]);
  add('operator','voices','context-menu-options-for-operator',[
    ['Enable Per-Note Pitch Bend','On by default in the title-bar menu; turn off to ignore per-note (MPE) bends.'],
    ['Other context commands','Copy oscillator parameters, set envelope levels, harmonics editing and export, and Play By Key.']
  ]);
  // Wavetable
  add('wavetable','scan','wavetable',[
    ['Layout','Oscillator tabs, two filters, and a modulation area with Matrix, Mod Sources and MIDI tabs. The title-bar button opens an expanded view.']
  ]);
  add('wavetable','scan','wavetable-synthesis',[
    ['Wavetable','A set of short looping waveforms. Holding one position gives a steady tone; moving through the table as the note plays changes the timbre.']
  ]);
  add('wavetable','scan','oscillators-2',[
    ['Quality','Unmodulated output is fully band-limited: no aliasing at any pitch.'],
    ['On / Gain / Pan / Semi / Detune','Per oscillator; tuning is relative to the global Transpose.'],
    ['Wavetable choosers / arrows','Category, then table; the arrows continue into the next category.'],
    ['Your own samples','Drop a WAV or AIFF on the display; the choosers then browse that folder. Raw skips Live’s clean-up processing, for prepared wavetables or deliberately glitchy results.'],
    ['Wave Position','Drag in the display or use the slider. Linear view stacks waves bottom to top; polar view draws them as rings.'],
    ['FM effect','Amt sets depth; Tune the modulator pitch: ±50% is an octave up/down, ±100% two octaves, and values between give inharmonic, noisy overtones.'],
    ['Classic effect','PW (pulse width, on any wavetable) and Sync (a hidden oscillator resetting the phase).'],
    ['Modern effect','Warp (pulse-width-like) and Fold (wavefolding). The two values stay put when switching effect types, for easy comparison.']
  ]);
  add('wavetable','scan','sub-oscillator',[
    ['Sub / Gain','Turns the sub on and sets its level.'],
    ['Tone','0% is a pure sine; higher adds harmonics.'],
    ['Octave','Follows the note and Transpose; drop one or two octaves.']
  ]);
  add('wavetable','filter','filters-2',[
    ['Types / circuits','Low-pass, high-pass, band-pass, notch and Morph at 12 or 24 dB; Clean and OSR for all types, MS2, SMP and PRD for low- and high-pass.'],
    ['Frequency / Resonance / Drive','Drag either filter dot or use the controls. Drive (non-Clean LP, HP, BP) adds gain or distortion before the filter.'],
    ['Morph','Sweeps LP → BP → HP → notch → LP.'],
    ['Serial','Everything into Filter 1, then Filter 2; the sub feeds both.'],
    ['Parallel','Both main oscillators feed each filter; the sub feeds both.'],
    ['Split','Osc 1 → Filter 1, Osc 2 → Filter 2, sub halved to both. A switched-off filter leaves its oscillator audible. Good for layered sounds, or treating the sub alone.']
  ]);
  add('wavetable','map','matrix-tab-1',[
    ['Grid','Sources (envelopes, LFOs) run across, targets down; drag in a cell to set depth.'],
    ['Additive targets','Sources are summed and added to the value. Neutral is 0; bipolar sources go both ways, unipolar only up.'],
    ['Multiplicative targets','Sources are multiplied, then multiply the value. Neutral is 1, minimum 0. Marked throughout, e.g. Volume, Sustain, Amount.'],
    ['Adding a row','Click any parameter: it appears in the matrix and stays if you give it modulation. Matrix and MIDI tabs share rows.'],
    ['Time / Amount','Time speeds up (negative) or slows down (positive) every modulator. Amount scales all matrix modulation.'],
    ['Source headers','Click to jump to that source in Mod Sources.']
  ]);
  add('wavetable','shape','mod-sources-tab',[
    ['Amp / Env 2 / Env 3','Attack, Decay, Sustain, Release, each with a Slope; drag in the display. Positive slopes start fast, negative start slow, zero is linear.'],
    ['Initial / Peak / Final','Env 2 and 3 only: start value, top of the attack, and end value after release.'],
    ['Loop modes','None holds Sustain until release; Trigger plays every stage once regardless; Loop cycles the whole envelope until the voice ends.']
  ]);
  add('wavetable','shape','lfos-1',[
    ['Waveform / Shape','Sine and Saw (slope), Triangle (symmetry from ramp to saw), Square (pulse width), Random (how often extremes occur).'],
    ['Sync / Rate','Hertz or tempo divisions; drag the display to change rate.'],
    ['Amount / Offset / Attack','Depth (multiplicative), start phase (not modulatable), and fade-in time.'],
    ['Retrigger','Restart the LFO each note; restarting mid-cycle gives hybrid shapes.']
  ]);
  add('wavetable','map','midi-tab',[
    ['Velocity / Note','Per-note values held for the note. Note is centred on C3: at 100% on Filter Frequency, the filter tracks the pitch exactly.'],
    ['Pitch Bend / Aftertouch / Mod Wheel','Controller sources; clip envelopes can stand in without hardware.'],
    ['Random','A new random value at every note.']
  ]);
  add('wavetable','voices','global-and-unison-controls',[
    ['Transpose / Volume','Pitch in semitones; output level (multiplicative).'],
    ['Poly / Mono','Mono is one voice with legato envelopes and Glide; Poly uses Poly Voices.'],
    ['Classic unison','Evenly detuned, alternately panned.'],
    ['Shimmer / Noise','Pitch jittered randomly (slowly, reverb-like; or fast, breathy), with a little wavetable offset.'],
    ['Phase Sync','Detuned like Classic, but phases reset at note start for a phaser-like sweep.'],
    ['Position Spread / Random Note','Spread each voice’s wavetable position (with slight detune), or randomize position and detune per note.'],
    ['Voices / Amount','Oscillators per main oscillator (more is thicker, fewer clearer) and unison intensity (multiplicative).']
  ]);
  add('wavetable','voices','hi-quality-mode',[
    ['Hi-Quality','Context menu. Off: modulation updates every 32 samples and lighter filters are used, saving up to about 25% CPU. Off by default for new instances since Live 11.1; older presets and Sets load with it on. Slight sound differences are possible.']
  ]);
  // Analog
  add('analog','mix','architecture-and-interface',[
    ['Signal flow','Two oscillators and a noise generator feed two multimode filters, each followed by an amplifier; filters can run in series or parallel. Two LFOs, per-filter and per-amp envelopes.'],
    ['Shell / display','The shell holds each section’s main controls; the display shows details for the selected section. Global adds volume, vibrato and polyphony; MPE adds pressure, slide and per-note bend.']
  ]);
  add('analog','mix','oscillators',[
    ['Modelled oscillators','Physically modelled, not wavetables, so they avoid aliasing.'],
    ['Osc switch / level / F1/F2','On, output level, and the balance sent to Filter 1 vs Filter 2 (centre = equal).'],
    ['Shape / Width','Sine, sawtooth, rectangular or white noise. Rectangular enables Pulse Width: narrow sounds thin, 100% is a square (odd harmonics only); an LFO can move it.'],
    ['Octave / Semi / Detune','Coarse to fine tuning; Detune in cents, up to ±300.'],
    ['Pitch Mod: LFO / Key','LFO pitch depth (only when that LFO is on). Key scaling: 100% is normal equal temperament, other values change the spacing; C3 always sounds the same.'],
    ['Pitch Env: Initial / Time','A pitch ramp from a starting offset over a set time; drag the breakpoints or use the sliders.'],
    ['Sub / Sync','Sub: an octave-down square (sine if the oscillator is sine; off with noise), at Level. Sync: an internal oscillator restarts the waveform; raising Ratio from 0% changes the harmonics.']
  ]);
  add('analog','mix','noise-generator',[
    ['Noise / level / F1/F2','White noise with its own switch, level and filter balance.'],
    ['Color','Its built-in −6 dB/octave low-pass: higher is brighter. Noise only has shell controls.']
  ]);
  add('analog','filter','filters',[
    ['Fil switch / type','2nd- and 4th-order low-pass, band-pass, notch, high-pass and formant filters.'],
    ['Freq / Reso','Cutoff and resonance; with a formant filter, Reso moves between vowel sounds.'],
    ['To F2','Filter 1 only: how much of its output feeds Filter 2 (series routing).'],
    ['Follow','Filter 2 only: its cutoff tracks Filter 1, and its own knob sets the offset; Filter 1’s modulation reaches it too.'],
    ['Freq Mod / Res Mod','Cutoff and resonance modulation from LFO, key and filter envelope, positive or negative.'],
    ['Drive','Output saturation: three symmetrical (Sym) and three asymmetrical (Asym) types, higher numbers stronger; or Off.']
  ]);
  add('analog','filter','amplifiers',[
    ['Amp switch / Level / Pan','Each amp’s on/off, output level and stereo position.'],
    ['Pan Mod / Level Mod','Modulation from LFO, key and amp envelope. With key on Level, middle C stays constant; positive values make higher notes louder.']
  ]);
  add('analog','shape','envelopes',[
    ['Four ADSRs','One per filter and amp, all in the display (the pitch envelopes are separate).'],
    ['Att < Vel / Env < Vel','Higher velocity shortens the attack; velocity scales the whole envelope.'],
    ['Sustain / S.Time','Full left: no sustain; full right: no decay. S.Time lets the sustain level sink while the key is held (lower is faster).'],
    ['Slope','Linear or exponential segments.'],
    ['Legato','A new note played while another is held continues the existing envelope.'],
    ['Free','Skips sustain for fixed-length, trigger-style notes; ideal for percussion.'],
    ['Loop','Off; AD-R repeats attack–decay until release; ADR-R includes release in the loop; ADS-R replays attack and release once at key-up (damper-like). With Free, AD-R and ADR-R behave as if the key is always held.']
  ]);
  add('analog','shape','lfos',[
    ['LFO switch / Rate / sync','On/off, speed, and Hertz or tempo divisions.'],
    ['Wave / Width','Sine, triangle, rectangle, stepped noise or smooth noise. Width reshapes Tri (toward up- or down-saw) and Rect (negative or positive pulses); 50% is symmetrical.'],
    ['Delay / Attack','Wait before the LFO starts, and fade-in time.'],
    ['Retrig / Offset','Restart phase with each note; starting phase.']
  ]);
  add('analog','respond','global-parameters',[
    ['Volume','Overall output, able to boost or cut the amp sections.'],
    ['Vib / Rate','A vibrato LFO fixed to both oscillators’ pitch. Delay, Attack, Error (random per-voice variation) and Amt < MW (mod-wheel control) appear in the display.'],
    ['Uni / Detune','Stacks voices per note with tuning spread; Voices (two or four) and Delay (staggered starts) in the display.'],
    ['Gli / Legato / Time','Glide between notes, only when overlapping with Legato; Const keeps the time fixed, Prop scales it with the interval.'],
    ['Quick Routing','Four buttons: each oscillator to its own filter and amp; both oscillators split to both filters; everything through Filter 1 and Amp 1; or serial Filter 1 → Filter 2 → Amp 2. Levels and tuning are left alone.'],
    ['Octave / Semi / Detune / PB Range','Whole-instrument tuning (Detune ±50 cents) and pitch-bend range.'],
    ['Stretch / Error','Stretch tuning: positive raises high notes and lowers low ones, like a piano, for a brighter sound; negative the opposite. Error adds random per-note tuning.'],
    ['Voices / Priority','Polyphony, and which notes are cut when exceeded: High keeps higher notes, Low lower ones, Last the newest.']
  ]);
  add('analog','respond','mpe-sources',[
    ['Pressure / Slide','Each routes to two destinations with its own amounts; LEDs show incoming MPE data.'],
    ['Note PB','Per-note pitch-bend range in semitones. Reveal these with the MPE switch in Global.']
  ]);
  // Electric
  add('electric','strike','architecture-and-interface-2',[
    ['Physical model','Built with Applied Acoustics Systems: the sound is calculated from equations for each part, not samples, so settings can go beyond real instruments.'],
    ['The mechanism','A key drives a hammer into a fork. The tine bar is struck; the tuned tone bar resonates. A magnetic pickup amplifies it, and releasing the key applies a damper.'],
    ['Sections','Hammer, Fork, Damper/Pickup and Global; click a section or its icon to show all its controls.']
  ]);
  add('electric','strike','hammer-section',[
    ['Stiffness','Hardness of the hammer’s striking surface: harder is brighter, softer more mellow. Vel and Key make it respond to velocity and pitch.'],
    ['Noise / Pitch / Decay / Key','Amount of impact noise, its centre pitch, how quickly it fades, and how much its level follows pitch.'],
    ['Force: Amount / Vel / Key','How hard the hammer hits, and how much velocity and pitch change that.']
  ]);
  add('electric','strike','fork-section',[
    ['Tine: Color','Balance of low and high partials in the struck tine.'],
    ['Tine: Decay / Key','How long the tine fades while held; level follows pitch via Key.'],
    ['Tone: Decay','The tone bar’s secondary resonance and how long it fades.'],
    ['Release','For both tine and tone: how quickly the fork dies after key release.']
  ]);
  add('electric','strike','damper-parameters',[
    ['Why dampers make noise','They lift from the fork on key-down and fall back on key-up, each making a little sound.'],
    ['Tone / Level','Damper hardness (soft is mellow, hard is brighter) and overall damper noise.'],
    ['Att/Rel','−100: noise only at the attack; +100: only at release; centre: both equally.']
  ]);
  add('electric','pickup','pickup-parameters',[
    ['Symmetry','Vertical pickup position: 50% is directly in front of the tine (brightest); lower moves it below, higher above.'],
    ['Distance','How far from the tine; closer sounds more overdriven.'],
    ['Type R / W','Electro-dynamic (R) or electro-static (W) pickup models.'],
    ['Input / Output / Key','Signal into the pickup (more input distorts more) and out of it; low input with high output is cleaner. Output can follow pitch.']
  ]);
  add('electric','voices','global-section-2',[
    ['Volume / Voices','Output level and polyphony; more voices cost more CPU.'],
    ['Semi / Detune','Transposition in semitones, and fine tuning up to ±50 cents.'],
    ['Stretch','Sharpens high notes and flattens low ones, as pianos are tuned, for a more brilliant sound; 0% is equal temperament, negative reverses it.'],
    ['Pitch Bend / Note PB','Global and per-note (MPE) pitch-bend ranges in semitones.']
  ]);
  // Collision
  add('collision','excite','architecture-and-interface-1',[
    ['Signal flow','Mallet and Noise oscillators excite two stereo resonators, which shape most of the character. With both exciters (or both resonators) off, there is no sound.'],
    ['Tabs','Mallet, Noise, Resonator 1 and 2, LFO and MIDI/MPE, plus global controls. Switching unused sections off saves CPU.']
  ]);
  add('collision','excite','mallet-section',[
    ['Mallet','Switches the section on or off.'],
    ['Volume / Stiffness','Mallet level and hardness: soft gives fewer highs and a longer, blurrier impact; hard is short and bright. Both respond to Key and Vel in the MIDI tab.'],
    ['Noise / Color','Impact noise, like a felt mallet’s “chiff”, and its frequency (higher removes lows; no effect at Noise 0).']
  ]);
  add('collision','excite','noise-section',[
    ['Noise','White noise through a filter with its own envelope, instead of or alongside the mallet.'],
    ['Filter type / Freq / Res','LP, HP, BP or LP+HP. Res is resonance, except in LP+HP where it sets bandwidth.'],
    ['Volume / Env Amt','Level (Key and Vel in the MIDI tab) and how much the envelope moves the filter.'],
    ['A / D / S / R','Envelope stages: S at 0 means no sustain, at 100 no decay.']
  ]);
  add('collision','resonate','resonator-tabs',[
    ['Resonance Type','Beam, Marimba (arch-cut bar tuning), String, Membrane, Plate, Pipe (open at one end, variable Opening at the other) or Tube (closed at both ends).'],
    ['Quality','Eco to High: fewer or more calculated overtones, trading realism against CPU (not for Pipe or Tube).'],
    ['1 → 2 / 2 → 1','Copy one resonator’s settings to the other.'],
    ['X-Y display / Decay','Horizontal sets decay (internal damping); vertical sets Material or Radius.'],
    ['Material','Low: lows ring longer (wood, rubber, nylon). High: highs ring longer (glass, metal).'],
    ['Radius','Pipe and Tube: larger lengthens decay and high sustain; very large shifts the pitch.'],
    ['Ratio / Brightness / Inharm','Ratio: shape of Membrane and Plate. Brightness: level of higher components. Inharm: negative compresses partials downward, positive stretches upward.'],
    ['Opening','Pipe only: 0% closed at one end, 100% open at both.'],
    ['Hit / Rnd','Where the object is struck, centre (0%) to edge, with random variation.'],
    ['Note Off','0%: releases are ignored, like a marimba; 100%: the resonance stops at release.'],
    ['Pos. L / Pos. R','Where vibration is picked up for each side, centre to edge (fixed for Pipe and Tube).']
  ]);
  add('collision','resonate','tuning-section',[
    ['Tune / Fine','Semitones, and cents up to ±50.'],
    ['Key','Pitch tracking: 100% is normal; 200% moves a whole step per key; negative falls as you play higher.'],
    ['Pitch Env / Time','A starting pitch offset gliding to normal over Time; velocity can scale the start.']
  ]);
  add('collision','resonate','mixer-section',[
    ['Gain / Pan','Each resonator’s level and stereo position (Pan can follow pitch).'],
    ['Bleed','Mixes in the unresonated exciter, restoring highs lost at low tuning or quality.']
  ]);
  add('collision','resonate','the-global-section',[
    ['Voices / Retrig.','Polyphony; Retrig. restarts a playing note instead of adding a voice, saving CPU.'],
    ['Structure 1 > 2','Serial: the exciters feed Resonator 1, whose mono sum also feeds Resonator 2.'],
    ['Structure 1 + 2','Parallel: the mixed exciters feed both resonators directly.'],
    ['Volume','Overall output level.']
  ]);
  add('collision','resonate','sound-design-tips',[
    ['A realistic marimba','Mallet striking a bar (Resonator 1) that a tube (Resonator 2) amplifies: serial 1 > 2.'],
    ['Unrealistic sounds','Long Noise envelopes for washy textures (or bowed vibraphone and glass effects), parallel resonators, and modulation from LFOs and MPE.'],
    ['Caution','These idealized models can jump sharply in volume. Keep output low while experimenting.']
  ]);
  add('collision','move','lfo-tab',[
    ['LFO 1 / 2 / waveform','Sine, square, triangle, saw up, saw down, stepped noise or smooth noise; the LFOs can modulate each other.'],
    ['Offs. / Retrigger','Starting phase used when a note restarts the LFO.'],
    ['Two destinations','Each with an amount relative to the LFO’s Amount.'],
    ['Rate / Amount','Hertz or synced; Rate can follow pitch and Amount velocity.']
  ]);
  add('collision','move','midimpe-tab',[
    ['Controllers','Pitch bend (including per-note), mod wheel, pressure and slide each reach two destinations with their own amounts.'],
    ['Key / Vel','Further mallet, noise, resonator and LFO parameters can follow pitch or velocity.']
  ]);
  // Tension
  add('tension','excite','architecture-and-interface-3',[
    ['Model','Physical modelling with Applied Acoustics Systems: an exciter (hammer, pick or bow) moves a string; finger and fret set its length; a damper shortens it; the vibration reaches a body, or a pickup. A filter sits between string and body.'],
    ['Tabs','String (Exciter, Damper, String, Vibrato, Termination, Pickup, Body) and Filter/Global (filter, MPE, keyboard, portamento, unison). Every section except String and Keyboard can be switched off to save CPU.']
  ]);
  add('tension','excite','exciter-types',[
    ['No sound?','With the Exciter off, only the damper can move the string; with both off nothing can.'],
    ['Bow','Stick-slip friction keeps the string sounding, like violin or cello; Damping is unavailable.'],
    ['Hammer','Strikes from below once and falls away, like a piano.'],
    ['Hammer (bouncing)','Dropped from above and can bounce, like a hammered dulcimer.'],
    ['Plectrum','An angled pick snapping the string, like guitar or harpsichord.']
  ]);
  add('tension','excite','exciter-parameters',[
    ['Bow: Force / Friction','Bow pressure (more is scratchier) and friction (more usually attacks faster).'],
    ['Hammer: Mass / Stiffness','Weight of the hammer and hardness of its surface.'],
    ['Plectrum: Protrusion / Stiffness','How much pick sits under the string (less is thinner) and its stiffness.'],
    ['Velocity / Position','Exciter speed, and contact point: 0% at the termination, 50% mid-string.'],
    ['Damping','How much impact force the exciter absorbs. For the bouncing hammer it sets the stiffness of its spring: more gives a shorter, louder, brighter hit.'],
    ['Fix. Pos','Keeps the contact point fixed whatever the string length, like a guitar pick; off keeps it proportional, like piano hammers at about 1/7 of the string.'],
    ['Vel / Key','Modulate by velocity or pitch. Some combinations produce no sound at all.']
  ]);
  add('tension','damp','the-damper-section',[
    ['Mass / Stiffness','Press force (more mutes faster) and material, from felt to metal. Very high values can shorten the string and change its tuning.'],
    ['Velocity / Gated','Speed of damper contact at release and lift-off at key-down. With Gated off the damper stays on the string and Velocity does nothing. Very high values can be very loud on release.'],
    ['Position / Fix. Pos','Where it touches, as for the exciter; each can follow pitch via Key.'],
    ['Damping','How much vibration it absorbs. Past 50% it gets so stiff it bounces, which can lengthen the decay again.'],
    ['String: Decay / < Key / Ratio','Ring time, its pitch tracking, and a shorter release than onset as Ratio rises.'],
    ['String: Inharm / Damping','Inharmonicity of upper partials, as in thicker real strings; high-frequency content (higher is brighter).'],
    ['Vibrato','Delay, Attack, Rate and Amount, plus < Mod (mod-wheel depth) and Error (random variation).']
  ]);
  add('tension','damp','the-termination-section',[
    ['Finger Mass / Finger Stiff / Fret Stiff','Finger force and stiffness, and fret stiffness, in the fret–finger–string interaction that sets pitch. Finger Mass follows Vel and Key.']
  ]);
  add('tension','damp','the-pickup-section',[
    ['Pickup Position','0% at the termination (brighter, thinner) to 50% mid-string (fuller).'],
    ['Body Type / Body Size','Bodies modelled on real instruments; XS to XL, where larger resonates lower.'],
    ['Decay / Str/Body','Body ring time; the balance between direct string and body-filtered sound (fully left bypasses the body).'],
    ['Low Cut / High Cut / Volume','Shape the body’s response; overall output (also on the Filter/Global tab).']
  ]);
  add('tension','shape','filterglobal-tab',[
    ['Filter','2nd/4th-order low-pass, band-pass, notch, high-pass or formant, between string and body; Freq and Res (vowels for formant), each moved by LFO, envelope or key.'],
    ['Filter Envelope','ADSR with its own switch; Vel shortens Attack and raises Sustain at higher velocity.'],
    ['Filter LFO','Sine, triangle, rectangle, stepped or smooth random; Rate in Hz or synced; Attack and Delay.'],
    ['MPE','Pressure and Slide to two destinations each; Pitch Bend and Note PB ranges; activity LEDs.'],
    ['Keyboard','Octave, Semi, Detune (±50 cents), Voices, Stretch (piano-style tuning), Error (random tuning) and Priority (High, Low or Last).'],
    ['Portamento','Time; Legato slides only between overlapping notes; Prop. scales time with interval.'],
    ['Unison','Two or four voices with Detune and staggered Delay.']
  ]);
  add('tension','shape','sound-design-tips-1',[
    ['Think physically','Sections interact like one object: a heavily damped string needs a faster bow. It is easy to get silence, or something extremely loud, so watch levels. The presets are good studies.']
  ]);
  // Meld
  add('meld','mix','general-overview',[
    ['Two engines','Engines A and B, each with its own filter, envelopes, LFOs and MIDI/MPE modulation matrix, plus two oscillator-specific macro knobs.'],
    ['Expanded view','The header button shows every modulation source and target. A / B switch engines; Copy to A / Copy to B copy modulation; X clears all modulation.']
  ]);
  add('meld','mix','oscillators-1',[
    ['Engine switches','Turning an engine off also turns off its filter; a filter can be switched off on its own.'],
    ['Octaves / Semitones / Cents','Per-engine pitch; with Use Current Scale, semitones become scale degrees (sd).'],
    ['Oscillator Type','24 types per engine (six marked ♭♯ are scale-aware), from sine to swarms, FM, noise loops and ambient generators; choose from the menu or step with the arrows.']
  ]);
  add('meld','mix','oscillator-macros',[
    ['Two macros per engine','They change with the oscillator type; map them to a controller, an LFO device, or the Modulation Matrix.'],
    ['Shapes family','Basic Shapes: Shape (sine→tri→saw→square) / Tone (pulse width). Dual Basic Shapes: Shape / Detune (a detuned copy). Noisy Shapes: Shape / Rough (noise distortion).'],
    ['Square family','Square Sync: Freq 1 / Freq 2 of two synced squares. Square 5th: 5th Amt (morph to a square a fifth up) / P Width. Sub: Tone (sine→square) / Aux (a lower subharmonic).'],
    ['Swarms','Swarm Sine, Triangle, Saw and Square: Motion (movement in the swarm) / Spacing (towards increasingly complex chords).'],
    ['FM family','Harmonic Fm and Simple Fm: Amount / Ratio. Fold Fm: Amount / Shape (carrier). Squelch: Amount / Feedback.'],
    ['Pitched oddities','Chip: Tone (pitch and pulse width) / Rate. Shepard’s Pi: Rate (below 50 falls, above rises, 50 still) / Width (octaves). Tarp: Decay / Tone. Extratone: Pitch / Env Amount. Bitgrunge: Freq / Mult (fewer sub-octaves as it rises).'],
    ['Noise and ambience','Noise Loop: Rate (fragment rate; high is plain noise) / Fade (grain). Filtered Noise: Freq / Width. Crackle: Density / Intensity. Rain: Tone (resonance, follows notes) / Rate. Bubble: Density / Spread (size randomness).'],
    ['Chord','Four saws: Shape (intervals) / Inversion. Uses the Set scale with Use Current Scale, otherwise a major scale on the played note.']
  ]);
  add('meld','mix','mix-section',[
    ['Volume / Pan','Per-engine level and stereo position.'],
    ['Tone Filter','Positive values thin the lows; negative values darken the highs.'],
    ['Limit','A per-voice limiter after the engines are mixed and Drive applied.']
  ]);
  add('meld','filter','filters-1',[
    ['Filter A / B','One per engine, each switchable; Frequency sets the cutoff. 17 types, each with two macros, most often Q (emphasis) and Drive (pre-filter saturation).'],
    ['SVF 12 / 24 dB','State-variable; L-B-H-N morphs low-pass, band-pass, high-pass, notch.'],
    ['MS2 / OSR','MS2 low- and high-pass (Sallen-Key, soft-clipped resonance); OSR band-pass (hard-clipped diode).'],
    ['LP Crunch 12dB / LP Switched Res / Filther','Crunch feeds its own distortion back; Switched Res adds downsampling artifacts (Lofi: crushed to smooth); Filther clips the input hard and saturates the output softly.'],
    ['Eq Peak / Eq Notch','Boost or cut around the cutoff.'],
    ['Phaser','Six-stage phaser: Feedback and Spread (notch spacing).'],
    ['Redux','Crush (bit depth) and Lofi (filtered vs raw downsampling artifacts).'],
    ['Vowel / Comb + / Comb −','Formant filter with Morph; feedforward and feedback combs with Feedback and Damp.'],
    ['Plate / Membrane Resonator','32 modes of a rectangular plate or circular membrane (size, resonance, ratio or damping); scale-aware with Filter Scale Awareness.']
  ]);
  add('meld','shape','envelopes-tab',[
    ['ADSR / slopes','Drag values, type them, or drag breakpoints; the red slope values bend Attack, Decay and Release.'],
    ['Loop modes','Trigger plays every stage once, ignoring Sustain; Loop cycles the whole envelope; AD Loop repeats Attack and Decay.'],
    ['Initial / Peak / Final','Modulation envelope only: its start, peak and release target values.'],
    ['Link Envelopes','Links each engine’s amplitude and modulation envelopes so both engines act as one instrument.']
  ]);
  add('meld','shape','lfos-tab',[
    ['Rate / Phase Offset / Retrigger','Hertz or synced; Retrigger restarts at the offset.'],
    ['LFO 1 types','Basic Shapes, Ramp, Wander, Alternate, Euclid or Pulsate, each with two macros.'],
    ['LFO 1 FX','FX1 and FX2 apply 18 effect types in series; LFO 1 and LFO 1 FX are separate matrix sources.'],
    ['LFO 2','Sine, Tri, Saw Up, Saw Down, Rectangle or Random S&H: a third source.']
  ]);
  add('meld','map','matrix-tab',[
    ['Grid','Sources across, targets down; drag a cell up or down. Some targets add modulation, others multiply it.'],
    ['Adding a target','Click a parameter; it joins the matrix of the engine selected in the display tab and leaves again if left unmodulated.']
  ]);
  add('meld','map','midi-and-mpe-tabs',[
    ['Velocity / Pitch / Random','Per-note values held for the note; Random is new at every note.'],
    ['Controllers','Pitch Bend, Press and Mod Wheel (MIDI); Note Pitch Bend, Slide and Press (MPE). Clip envelopes can stand in without hardware.']
  ]);
  add('meld','voices','settings-tab',[
    ['Osc Key Tracking','Off: the oscillator always plays C3 (or the scale root near C3), for drones or percussion.'],
    ['Phase Reset / Phase Spread','Restart phase each note; with Spread, start phases follow the Spread source, otherwise zero.'],
    ['Scale Awareness','Oscillator: Dual Basic Shapes, the four Swarms and Chip stay in scale. Filter: Plate and Membrane Resonators resonate in scale.'],
    ['Glide','Porta slides smoothly, Gliss in steps (scale degrees if scale-aware); Glide Time must be above zero. Works in Mono and Poly.']
  ]);
  add('meld','voices','global-controls-1',[
    ['Mono / Legato','One voice; with Legato, a new held-over note continues the current envelope.'],
    ['Poly voices','A menu sets the voice count, from 2 to 12.'],
    ['Spread / Stacked Voices','Stacking duplicates both engines per note (CPU-heavy); Spread then offsets each stacked voice, or with stacking Off spreads values across a chord. Spread needs a matrix target.'],
    ['Mixer Drive / Volume','Per-voice saturation before the limiter; output level.'],
    ['Use Current Scale','Follow Live’s Scale Mode; transpositions, including Pitch Quant, move in scale degrees.']
  ]);
  // Impulse
  add('impulse','load','sample-slots',[
    ['Loading','Drag samples from the Browser or from clips into the eight slots, or use each slot’s Hot-Swap button; Delete removes one.'],
    ['Key layout','C3 plays the leftmost slot, the rest follow up to C4; with Fold on, the MIDI editor labels the eight rows. A Pitch device transposes the layout; a Scale device rearranges it.'],
    ['When changes apply','Slot settings (and their automation) take effect only at the next note, not during one. Use Simpler for continuous change within a note.'],
    ['Link (slot 8)','Slot 7 and 8 silence each other, like closed and open hi-hats.'],
    ['Hover controls','Play, solo, mute or hot-swap each slot.']
  ]);
  add('impulse','load','start-transpose-and-stretch',[
    ['Start','Begin up to 100 ms into the sample.'],
    ['Transp','±48 semitones, modulated by velocity or a random amount.'],
    ['Stretch / Mode A / B','−100% shortens, +100% lengthens; A suits low sounds (toms, bass), B high ones (cymbals). Velocity can modulate it.']
  ]);
  add('impulse','shape','filter',[
    ['Filter','Several types; Frequency and Resonance, with cutoff modulated by velocity or a random amount.']
  ]);
  add('impulse','shape','saturator-and-envelope',[
    ['Saturator / Drive','A fatter, more analog sound; Drive also makes it louder, so lower the slot volume. Extreme Drive on low sounds gives classic overdriven analog drums.'],
    ['Decay','Envelope decay time, up to 10 seconds.'],
    ['Trigger / Gate','Trigger decays with the note regardless; Gate waits for note-off before decaying, for variable hi-hat lengths.']
  ]);
  add('impulse','shape','pan-and-volume',[
    ['Pan / Volume','Per slot; Pan responds to velocity and random, Volume to velocity.']
  ]);
  add('impulse','shape','global-controls',[
    ['Volume / Transp / Time','Whole-instrument level, transposition, and a Time control that scales every slot’s stretch and decay, short to long.']
  ]);
  add('impulse','route','individual-outputs',[
    ['Separate outputs','Take the whole of Impulse, or single slots, to their own tracks through internal routing (see Routing and I/O).']
  ]);

  // Drum Sampler
  add('drum-sampler','trim','drum-sampler',[
    ['Purpose','A one-shot player for Drum Racks: start and length, an AHD envelope, pitch, a filter, modulation and playback effects.']
  ]);
  add('drum-sampler','trim','sample-controls-section',[
    ['Loading','Double-click a Browser file, or drop it on the waveform.'],
    ['Sample Start / Length / Gain','Start and region length as percentages (Shift-drag Start for fine steps and zoom); gain from −70 to +24 dB.'],
    ['Attack / Hold / Decay','Envelope. Hold keeps the peak in Trigger mode (inf plays the whole sample); disabled in Gate.'],
    ['Trigger / Gate','Trigger plays through Hold after release; Gate fades by Decay as soon as the note ends.'],
    ['Transpose / Detune','±48 semitones and ±50 cents.'],
    ['Similar samples','Hover the waveform for next and previous similar sample; right-click for Show Similar Files, Return to Reference and Save as Similarity Reference.'],
    ['Hot-swap','The waveform’s button swaps the sample; the title-bar button swaps the instrument.']
  ]);
  add('drum-sampler','bend','playback-effects-section',[
    ['Choosing one','Turn the section on and pick one of nine; each has two parameters, on knobs or the X/Y pad (vertical first, horizontal second).'],
    ['Stretch / Loop','Stretch: Factor and Grain Size (length without pitch change, with lo-fi grain). Loop: Loop Offset and Loop Length (ms).'],
    ['Pitch Env / Punch','Pitch Env: Amount (±100%) and Decay back to the base pitch. Punch: ducking that emphasizes the transient, with Amount and Release.'],
    ['8-Bit','Sample Rate and the Decay of a built-in low-pass, for 8-bit chip sounds.'],
    ['FM / Ring Mod','Sine modulation of pitch or amplitude: Amount and Frequency. Low Ring Mod frequencies give tremolo.'],
    ['Sub Osc / Noise Osc','Layer a sub oscillator (30–120 Hz) or filtered noise (Noise Color), both following the device envelope.'],
    ['Pitch following','Time and frequency settings in most effects follow the played note and global pitch. FM and Ring Mod modulation decays with the global Decay.']
  ]);
  add('drum-sampler','shape','filter-section-1',[
    ['Filter types','12 dB or 24 dB low-pass, 24 dB high-pass (with Resonance), or a peak filter with Peak Filter Gain; each has Filter Frequency.']
  ]);
  add('drum-sampler','shape','global-section-1',[
    ['Volume / Pan / Velocity to Volume','Output from −36 to +36 dB, stereo position, and velocity sensitivity.'],
    ['Modulation','Source: Velocity or Slide (MPE). Destination: Filter, Attack, Hold, Decay, or FX1/FX2 (the current effect’s two controls), with an Amount.']
  ]);
  add('drum-sampler','shape','context-menu-options-for-drum-sampler',[
    ['Enable Per-Note Pitch Bend','On by default; lets it respond to per-note bends.'],
    ['Envelope Follows Pitch','Scales the envelope with pitch so it covers the same part of the sample when transposed.'],
    ['Drum Sampler > Simpler','Swaps in Simpler, keeping start and length.'],
    ['Save as Default Pad','In a Drum Rack pad’s menu: new samples dropped on empty pads load Drum Sampler.']
  ]);
  // External Instrument
  add('external-instrument','connect','external-instrument',[
    ['What it is','A routing utility, not a sound source: sends MIDI out and brings audio back, for hardware synths or multitimbral plug-ins.'],
    ['MIDI To','Top chooser: a MIDI port (then choose a channel) or a track holding a multitimbral plug-in (then choose its channel).'],
    ['Audio From','The interface inputs wired to the synth’s outputs (as set up in Audio Settings), or the plug-in’s auxiliary outputs; its main outputs stay on its own track.'],
    ['Gain','Level of the returning audio; set it to avoid clipping.']
  ]);
  add('external-instrument','align','external-instrument',[
    ['Hardware Latency','Compensates for delay Live cannot detect in external gear. Disabled for internal plug-in routing (compensated automatically) and when Options → Delay Compensation is off.'],
    ['ms or samples','Samples for digital connections (kept when the sample rate changes); milliseconds for analog ones. Samples allow finer tuning, but switch back to ms before changing sample rate.']
  ]);
})();
