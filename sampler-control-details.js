// Original control summaries for the source's Sampler sections, kept inside the
// six existing actions. Images already assigned to these sections stay adjacent.
(()=>{
  const add=(action,anchor,terms,note='')=>deviceControlDetails.add('sampler',action,anchor,terms,note,'live-instrument-reference');
  add('load','samplers-tabs',[
    ['Zone','Opens the layer/range editor above Device View.'],
    ['Sample / Pitch-Osc / Filter-Global','Edit the selected recording, pitch/modulation oscillator, then filtering and voice articulation.'],
    ['Modulation / MIDI','Route envelopes and LFOs, or incoming performance controls. Tab LEDs indicate modulation activity in that area.']
  ]);
  add('load','title-bar-options',[
    ['Group / Fold','Group wraps Sampler in an Instrument Rack. Fold hides its panel without stopping sound; double-click the title to reopen it.'],
    ['Show Preset Name','Turn it off to label the device Sampler instead of using its preset/sample-derived name.'],
    ['Lock to Control Surface','Keeps a supported surface assigned even as selection changes; the hand icon indicates control.'],
    ['Save as Default Preset','Sets the starting state for future Sampler instances.'],
    ['Use Constant Power Fade for Loops','Switch off for linear loop crossfades. This is separate from the Zone Editor’s Lin/Pow fades.'],
    ['Sampler → Simpler','Converts the instrument to a Simpler preset for use in editions without Sampler. Keep an editable original if you may need Sampler’s deeper controls again.']
  ]);
  add('load','the-sample-layer-list',[
    ['Select / rename / duplicate / delete','Select a layer to inspect it in Sample. Its context menu edits that layer; check a multi-selection before deleting.'],
    ['Distribute Ranges Equally','Divides the current editor’s range evenly among selected layers.'],
    ['Distribute Ranges Around Root Key','Uses root keys to distribute keyboard coverage without overlap; layers sharing a root are distributed evenly.'],
    ['Small / Medium / Large','Changes the Zone Editor’s zoom, not the sound.'],
    ['Show in Browser / Manage Sample','Locates the source file or opens it in File Manager.'],
    ['Normalize Volume / Normalize Pan','Adjusts per-sample playback gain or stereo balance. Normalize Pan balances the channels; it does not necessarily center a stereo recording.'],
    ['Select All With Same Range','Selects matching zones in the currently displayed Key, Vel or Sel editor.'],
    ['Sort','Reorders the list alphabetically or by key, velocity or selector range, ascending or descending. Check round-robin order afterward.']
  ]);
  add('load','importing-third-party-multisamples',[
    ['Import','Drag a supported file from Live’s Browser into the Set. Converted presets appear in User Library → Sampler → Imports; some use several Samplers inside an Instrument Rack.'],
    ['Formats in this manual','REX (Standard/Suite), ACID Loops and Soundtrack Loops. ACID/Soundtrack metadata tags are not exposed in Live.']
  ]);
  add('zone','the-zone-tab',[
    ['Key / Vel / Sel','A layer must pass its key, note-on velocity and selector ranges to be available. Overlap can layer samples; fade handles blend their boundaries.'],
    ['Auto Select','Highlights the layers reached by incoming notes while those notes are held.'],
    ['Lin / Pow','Chooses linear or constant-power zone fades across all zones.'],
    ['RR','Enables round-robin selection among eligible layers instead of triggering the same layer every time.']
  ]);
  add('zone','key-zones',[
    ['Range / root key','The zone controls which MIDI notes trigger a layer; RootKey sets the recorded pitch from which it transposes. New samples initially span the keyboard.'],
    ['Edges / upper corners','Drag edges to resize and the zone to reposition. Drag upper corners inward to create fades over the boundary keys.']
  ]);
  add('zone','velocity-zones',[
    ['Velocity 1–127','Restricts each layer to a playing-strength range. Resize, move and crossfade these zones with the same gestures as key zones.']
  ]);
  add('zone','sample-select-zones',[
    ['Selector 0–127','Move the indicator above Sel zones to make different layers available. It is an independent control, not automatically the note’s velocity.'],
    ['Note-on selection','Moving the selector affects newly triggered notes; it does not replace a layer that is already sounding.']
  ]);
  add('zone','round-robin-sample-playback',[
    ['Forward / Backward','Cycle through the layer list top-to-bottom or bottom-to-top, then wrap.'],
    ['Other / Random','Other avoids an immediate repeat; Random can choose the same layer twice.'],
    ['Reset Interval','Restarts the cycle on the selected rhythmic boundary. Forward restarts at the top; Backward at the bottom; random modes restart from the cycle’s first sample.']
  ]);
  add('loop','the-sample-tab',[
    ['Sample','Selects which layer is being edited. Most Sample-tab settings belong only to that layer.'],
    ['RootKey / Detune','RootKey establishes original pitch; layer Detune offsets it by up to ±50 cents.'],
    ['Volume / Pan','Sets per-layer level (silence to +24 dB) and position, before the instrument’s global controls.'],
    ['Reverse','Reverses the entire multisample globally, beginning at Sample End. Unlike Clip View Reverse, it does not create a new audio file.'],
    ['Snap','Moves endpoints to zero crossings on the left channel. Stereo material may still need Crossfade; a loop-brace context menu can snap an individual marker.'],
    ['Zoom','⌘-scroll (Mac) / Ctrl-scroll (Windows) zooms the waveform. Vertical Zoom changes display height only; B/M/L/R selects Both, Mono, Left or Right for display.']
  ]);
  add('loop','sample-playback',[
    ['Sample Start / Sample End','Bound playback. End stops it even if the amplitude envelope has time left; a slow Attack can delay when its beginning becomes audible. Right-click time fields to choose samples or elapsed time.'],
    ['Sustain Mode','Off plays toward Sample End. Forward wraps Loop End → Loop Start; back-and-forth alternates direction between them.'],
    ['Link','Temporarily uses Loop Start as Sample Start, retaining the previous start value for when Link is disabled.'],
    ['Release Mode','With a sustain loop active: Off stays in that loop during envelope release; Release proceeds toward Sample End; forward or back-and-forth Release Loop repeats between Release Loop and Sample End until the envelope finishes.'],
    ['Crossfade / loop Detune','Crossfade smooths each loop seam. Detune corrects pitch changes caused by the sustain or release loop’s period.'],
    ['Interpol','Global interpolation quality for transposition. Good and Best use more CPU than Normal.'],
    ['RAM','Loads the whole multisample into memory. This can help endpoint modulation but can exhaust memory with a large library.']
  ]);
  add('pitch','the-modulation-oscillator-osc',[
    ['FM / AM','FM modulates sample frequency; AM modulates amplitude. The oscillator is a modulator, not a separate audible voice.'],
    ['Type / Volume / Vol < Vel','Choose among 21 waveforms, set modulation intensity, then how velocity changes that intensity. Its own envelope shapes the intensity over time.'],
    ['Fixed / Freq / Multi','Fixed ignores played pitch; frequency equals Freq multiplied by Multi.'],
    ['Coarse / Fine','With Fixed off, tune the oscillator relative to the played note. Coarse sets the ratio; Fine offsets it.']
  ]);
  add('pitch','the-pitch-envelope',[
    ['Amount','Scales the envelope in semitones, affecting sample pitch and the modulation oscillator when enabled. Drag envelope points or edit their values.'],
    ['Transpose / Detune','Global pitch offsets in semitones and cents, independent of the envelope.'],
    ['Zn Shft','Shifts which key zone is selected while retaining the played pitch.'],
    ['Spread','Uses two detuned voices per note, doubling the associated processing.'],
    ['Glide / Portamento / Time','Glide is monophonic; Portamento supports polyphonic movement. Time sets transition duration.']
  ]);
  add('shape','the-filter',[
    ['Type / slope','Low-pass, high-pass, band-pass, notch and Morph, with 12 or 24 dB slopes. Frequency sets the boundary; Resonance emphasizes it.'],
    ['Clean / OSR','Available for all filter types. Clean is a low-CPU clean design; OSR limits resonance through a diode-style clipping model.'],
    ['MS2 / SMP / PRD','Available for low-pass and high-pass. MS2 soft-clips resonance; SMP blends modeled behaviors; PRD has no explicit resonance limiter.'],
    ['Drive','Available on low-pass, high-pass and band-pass with non-Clean circuits. Adds gain/distortion before the filter.'],
    ['Morph','Travels low-pass → band-pass → high-pass → notch → low-pass. Its context menu snaps to a specific type.'],
    ['F. Env / Amount','Enable the envelope and give Amount a nonzero value to move cutoff.'],
    ['Shaper / Type / Amount','Choose Soft, Hard, Sine or 4bit. The routing triangle pointing up puts shaping before filtering; down puts it after.']
  ]);
  add('shape','the-volume-envelope-and-global-controls',[
    ['ADSR / levels','Attack moves Initial → Peak; Decay moves Peak → Sustain. After release, Release moves toward the ending level. Pitch, filter and LFO envelopes expose an End level.'],
    ['A. Slope / D. Slope / R. Slope','Zero is linear. Positive values move faster at the start; negative values keep the start flatter and accelerate later.'],
    ['Loop / Trigger / Beat / Sync','Loop repeats after decay; Trigger ignores Note Off. Beat and Sync repeat at a beat interval, with Sync aligned to song time. Time sets the return toward Initial; Repeat sets the beat interval.'],
    ['Time < Vel','Velocity changes segment timing, not the beat interval selected in Beat/Sync modes.'],
    ['Global Time / Time < Key','Scales all envelope lengths together, or scales them according to the incoming note’s pitch.'],
    ['Pan / Pan < Rnd','Sets global pan and its random variation, separate from each layer’s Pan.'],
    ['Voices / R','Up to 32 simultaneous voices. R retriggers an already sounding note instead of adding another voice, reducing buildup with long releases.']
  ]);
  add('map','the-auxiliary-envelope',[
    ['A / B destinations','Route the extra envelope to two of 29 available destinations, each with its own amount. It has the same multistage and looping controls as the pitch/filter envelopes.']
  ]);
  add('map','lfos-1-2-and-3',[
    ['Type','Sine, Square, Triangle, Sawtooth Down, Sawtooth Up or Sample and Hold. Enable each LFO separately.'],
    ['Freq / Beats','Free rates run from 0.01 to 30 Hz; synced rates run from 1/64 note to 8 bars.'],
    ['Attack / Retrig / Offset','Attack fades in depth. Retrig restarts on each note; Offset chooses where in the cycle it starts.'],
    ['Key','Changes LFO speed with note pitch.'],
    ['LFO 1','Dedicated Vol, Pan, Filter and Pitch amounts.'],
    ['LFO 2 / 3','Each has A/B destination routing. Stereo Phase offsets equal-rate channels; Spin makes the right channel run up to 50% faster.']
  ]);
  add('map','the-midi-tab',[
    ['Sources','Key, Velocity, Release Velocity, Aftertouch, Modulation Wheel, Foot Controller and Pitch Bend each offer two destinations.'],
    ['Amount A / B','Sets each source’s influence separately. For example, positive Velocity → Loop Length makes harder notes select a longer loop.'],
    ['Pitch Bend Range','Scales the wheel’s 14-bit range to as much as 24 semitones.'],
    ['Credits','Click the Sampler illustration to view the instrument’s credits.']
  ]);
})();
