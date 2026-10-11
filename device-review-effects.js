// Control-level review of Live 12 audio effects, 2026-09-24.
// Original summaries checked against the cached manual (chapter 28). Each block attaches to an
// existing device action through deviceControlDetails; manual sections keep their source links.
(()=>{
  const add=(device,action,anchor,terms,note='')=>deviceControlDetails.add(device,action,anchor,terms,note,'live-audio-effect-reference');

  // Reverb
  add('reverb','space','input-filter',[
    ['Input filter','Low and high cuts before the reverb. The X-Y pad sets the band’s centre (horizontal) and width (vertical); sliders do the same. Switch either cut off to save CPU.']
  ]);
  add('reverb','space','early-reflections',[
    ['Early reflections','The first echoes off the walls, before the diffuse tail; they carry the room’s character.'],
    ['Spin: Amount / Rate','Modulates the reflections. More Amount gives a more neutral tail; too high a Rate causes Doppler pitch shifts and odd panning. Can be switched off.'],
    ['Shape','Low: reflections fade slowly and overlap an early tail (smoother). High: they fade fast and the tail starts later (can help intelligibility).']
  ]);
  add('reverb','tail','diffusion-network',[
    ['High / low shelves','Frequency-dependent decay: the high shelf models absorption by air, walls, people and furnishings; the low shelf thins the tail. Either can be switched off.'],
    ['Diffusion / Scale','Density and coarseness of the tail; with very small rooms they colour the sound strongly.']
  ]);
  add('reverb','tail','chorus',[
    ['Chorus','Adds gentle motion to the tail, with Amount and Rate, or switch it off.']
  ]);
  add('reverb','tail','global-settings',[
    ['Predelay','Time before the first reflection, in ms; natural sounds typically use 1–25 ms. It shapes the sense of room size.'],
    ['Size / Smooth','Room volume: very large gives a shifting, delay-like wash; very small a metallic colour. Smooth (None, Slow, Fast) sets how Size changes glide instead of jumping with artifacts.'],
    ['Decay','Time for the tail to fall by 60 dB.'],
    ['Freeze / Flat / Cut','Freeze sustains the tail almost forever. Flat bypasses the shelves so it doesn’t lose energy. Cut stops new input adding to the frozen sound.'],
    ['Stereo','Output width: 120° gives each ear an independent tail; the minimum is mono.'],
    ['Density','Sparse (least CPU) to High (richest).']
  ]);
  add('reverb','tail','output-1',[
    ['Reflect / Diffuse / Dry/Wet','Levels of the early reflections and the tail, and the overall mix (100% wet on a return track).']
  ]);

  // Delay
  add('delay','time','delay',[
    ['Sync / Time','Delay in sixteenth notes (4 = one beat) or 1 ms to 5 s, per channel.'],
    ['Offset','Nudges each synced time earlier or later by a fraction, for swing; independent per channel even when linked.'],
    ['Stereo Link','Applies one channel’s time to both.'],
    ['Feedback','Output fed back into each channel’s own delay line; left and right loops stay separate.'],
    ['Freeze','Loops whatever is in the buffer endlessly, ignoring new input until released.'],
    ['Filter','Band-pass before the repeats: drag horizontally for centre and vertically for width, or use Freq and Width.'],
    ['LFO','Delay and Filter sliders set modulation of time and cutoff (chorus to glitches). Expand LFO Controls for Rate mode (Rate, Time, Synced, Triplet, Dotted, Sixteenth), Wave (Sine, Triangle, Ramp Up/Down, Square, S&H, Wander) and Morph.'],
    ['Repitch / Fade / Jump','How time changes sound: pitch bends like tape (default), a crossfade (grainy), or an instant switch that may click.'],
    ['Ping Pong / Dry/Wet','Bounce repeats between channels; mix (100% on a return track).']
  ]);
  add('delay','feedback','context-menu-options-for-delay',[
    ['Hi-Quality','Better interpolation in Repitch and Fade, plus tape-style smoothing of time changes in Repitch.'],
    ['Dry/Wet - Equal-Loudness','Keeps perceived loudness steady across the mix range, so 50/50 sounds balanced.']
  ]);
  add('delay','feedback','glitch-effect',[
    ['Glitch recipe','Linked, Sync 6, Feedback 50%, band-pass at 2.86 kHz and Width 2.50, S&H LFO at 0.93 Hz with Delay 66% and Filter 19%, Fade mode, Ping Pong off, 50–80% wet.']
  ]);
  add('delay','feedback','chorus-effect',[
    ['Chorus recipe','Unlinked, 12 ms left and 30 ms right, no feedback, band-pass at 2.56 kHz and Width 8.50, Triangle LFO at 0.65 Hz with Delay 58%, Repitch, Ping Pong on, 45–65% wet.']
  ]);
  // Echo
  add('echo','space','echo',[
    ['Channel Mode','Stereo, Ping Pong or Mid/Side (the time knobs become Mid and Side).'],
    ['Delay time / Sync Mode','Beat divisions or ms per line; synced modes are Notes, Triplet, Dotted and 16th (heard only with Sync on).'],
    ['Stereo Link / Delay Offset','Link applies time, sync and mode to both sides; Offset shortens or stretches each for swing, even when linked.'],
    ['Input / D','Gain on the incoming signal; D adds distortion to it.'],
    ['Feedback / Ø','Amount fed back; Ø inverts the fed-back signal.']
  ]);
  add('echo','space','echo-tab',[
    ['Echo Tunnel','Rings are repeats, moving inward; spacing shows the time between them, and white dots mark an eighth-note grid. Drag to set the times.'],
    ['Filter','High-pass and low-pass, each with its own Res; drag the dots in the Filter Display (shown with the triangle).']
  ]);
  add('echo','move','modulation-tab',[
    ['Waveform / rate','Sine, triangle, saw up, saw down, square or noise; synced Rate or free Freq, or drag the display.'],
    ['Phase','Offset between left and right; 180° is fully out of phase.'],
    ['Mod Delay / x4 / Mod Filter','Modulation depth on delay time (x4 multiplies it, for deep flanging at short times) and on the filter.'],
    ['Env Mix','Blend from LFO (0%) to an envelope follower (100%).']
  ]);
  add('echo','move','character-tab',[
    ['Gate','Mutes input below Threshold; Release sets how fast it closes.'],
    ['Ducking','Lowers the echoes while input is above Threshold, releasing after it drops.'],
    ['Noise / Wobble','Vintage noise, and irregular tape-style time modulation, each with Amount and Morph.'],
    ['Repitch','Time changes bend pitch like hardware; off, they crossfade.'],
    ['Auto-off','Echo sleeps at least eight seconds after input goes silent, unless both Noise and Gate are on.']
  ]);
  add('echo','spaceout','global-controls-1',[
    ['Reverb / location / Decay','Reverb amount, placed pre-delay, post-delay or inside the feedback loop, with its own decay.'],
    ['Stereo','Width of the echoes: 0% mono, above 100% extra wide.'],
    ['Output / Dry/Wet','Wet level and mix (100% on a return). Right-click Dry/Wet for Equal-Loudness.']
  ]);
  // Chorus-Ensemble
  add('chorus-ensemble','thicken','chorus-ensemble',[
    ['Chorus','Two time-modulated delays added to the input: light motion and thickening.'],
    ['Ensemble','Three delays with evenly spread phase offsets, after a ’70s pedal: richer and smoother.'],
    ['Vibrato','Stronger pitch modulation with no delayed layer; Shape morphs sine to triangle (“siren”), Offset sets left/right phase (180° is opposite). Feedback and Dry/Wet are disabled.'],
    ['High-pass','Keeps the effect off content below its frequency, 20 Hz to 2 kHz.'],
    ['Width','Chorus and Ensemble: stereo width of the wet signal, 0% mono, 100% balanced, 200% sides twice the middle.'],
    ['Delay Time / Taps','Chorus only: Auto scales delay with modulation; a fixed time gives a steadier chorus (good on bass or guitar). One tap gives a simpler, broader pedal-like texture.'],
    ['Rate / Amount','Modulation speed (knob or drag the display) and depth of the time deviation.'],
    ['Feedback / invert','More feedback is more extreme and brighter, and leaves audible delays after stopping; inverting gives a hollow tone.'],
    ['Output / Warmth / Dry/Wet','Wet gain; light distortion and filtering; mix (100% on a return).']
  ]);
  add('chorus-ensemble','shape','chorus-ensemble-tips',[
    ['Surf guitar','Ensemble at 1–1.8 Hz with 100% Amount on a dry guitar.'],
    ['Oscillating bursts','Automate the Feedback invert toggle with Feedback above 90%.']
  ]);

  // Phaser-Flanger
  add('phaser-flanger','choose','phaser-flanger',[
    ['Phaser','Modulated all-pass filters create moving notches. Notches (how many), Center, Spread (distance, via Q) and Blend (modulation aimed at Center at 0.0, Spread at 1.0).'],
    ['Flanger','A modulated short delay with feedback makes a moving comb filter; Time sets the delay, and the display shows the time shrinking as it moves right.'],
    ['Doubler','Modulated delays imitate stacked takes; modulation is bipolar (right is longer), with Time.'],
    ['Amount / Feedback / Ø','Modulation depth (both LFOs); feedback strengthens the comb effect (Doubler also echoes after stopping); Ø inverts for a hollow sound. High feedback can jump in volume.'],
    ['Output / Warmth / Dry/Wet','Wet gain, gentle distortion and filtering, and mix (100% on a return).']
  ]);
  add('phaser-flanger','move','phaser-flanger',[
    ['Unfolded view','The title-bar button reveals the main LFO display, LFO 2, an envelope follower and Safe Bass.'],
    ['Freq / Rate','Main LFO speed, free in Hz or tempo-synced.'],
    ['Waveforms','Sine, Triangle (default), Saw Up, Saw Down, Rectangle, Random, Random S&H, Triangle Analog (changes shape with rate), Triangle 8 and Triangle 16 (stepped).'],
    ['Phase / Spin','Stereo mode: offset the two sides (180° is inverted) or detune their LFO rates.'],
    ['Duty Cycle','Squeezes the waveform toward the start (+100%) or end (−100%) of the cycle, like pulse width; not for the random shapes.'],
    ['LFO 2 Mix / Freq / Rate','A second, triangle LFO blended in (0% main only, 100% LFO 2 only), free or synced.'],
    ['Env Fol','Uses input level as modulation: Envelope Amount (negative inverts), Attack and Release.'],
    ['Safe Bass','A 5–3000 Hz high-pass that keeps the effect off the low end.']
  ]);

  // Auto Pan-Tremolo
  add('auto-pan-tremolo','move','auto-pan-tremolo',[
    ['Panning / Tremolo','Two LFOs move the signal between left and right, or one LFO varies the level; the display shows the live position or level.'],
    ['Waveform','Sine, Triangle, Shark Tooth, Saw Up, Saw Down, Square, Random, Wander or S&H.'],
    ['Invert','Flips the waveform; on ramps, inverted gives ducking and upright gives gating.'],
    ['Harmonic','Tremolo only: highs and lows (split at 600 Hz) pulse alternately instead of together.'],
    ['Vintage','Tremolo only: adds a non-linear curve for warmth and grit.'],
    ['Amount','Modulation depth; shared by both modes, like the rate.'],
    ['Shape','Panning: positive values make the handover between sides more abrupt. Tremolo: positive rounds the peaks, negative sharpens them; extremes make gating (Invert off) or pumping (Invert on).'],
    ['Attack Time','Delay before full modulation after a transient, keeping attacks centred or punchy.'],
    ['Dynamic Frequency Modulation','Input level changes the rate: positive speeds it up for louder signals, negative slows it.']
  ]);
  add('auto-pan-tremolo','sync','auto-pan-tremolo',[
    ['Time modes','Rate (Hz), Time (100 ms to 200 s per cycle), or Synced, Dotted, Triplet and 16th divisions.'],
    ['Phase / Spin','Offset left and right LFOs by degrees (180° is opposite), or let them drift apart progressively. Random, Wander and S&H allow only Phase.'],
    ['Phase Offset','In synced modes, shifts each channel’s start against the beat grid; with Random, Wander or S&H it acts as a stereo width control.']
  ]);
  // Glue Compressor
  add('glue-compressor','compress','glue-compressor',[
    ['Purpose','Modelled with Cytomic on a classic ’80s console bus compressor; mainly for the Main track or Group Tracks, to glue sources together.'],
    ['Threshold / Ratio','Where compression starts and how strongly. There is no Knee control: the knee gets sharper as Ratio rises.'],
    ['Attack / Release / A','Attack in ms; Release in seconds. Auto uses a slow base time plus a fast one for transients: gentle, though it can lag sudden changes.'],
    ['Range','Caps the gain reduction: −60 to −70 dB behaves like the hardware; −40 to −15 dB is an alternative to Dry/Wet; 0 dB means none.'],
    ['Makeup','Gain after compression; matching roughly the needle reading restores the level.'],
    ['Soft','A fixed waveshaper capping output at −0.5 dB to tame big transients. It distorts, so treat it as colour rather than a clean limiter.'],
    ['Display / Clip LED','The needle shows gain reduction. The LED goes red above 0 dB, yellow when Soft is clipping.'],
    ['Dry/Wet','Blend for parallel compression; 0% is effectively bypassed.']
  ]);
  add('glue-compressor','compress','context-menu-options-for-glue-compressor',[
    ['Oversampling','Processes at twice the sample rate to reduce aliasing and harsh transients, for a little more CPU; peaks can then exceed 0 dB even with Soft on.']
  ]);
  add('glue-compressor','sidechain','sidechain-parameters-3',[
    ['Sidechain','Unfold the device. Choose any internal routing point as the trigger instead of the compressed signal.'],
    ['Gain / Dry/Wet','Trigger level, and the blend of sidechain and own signal as trigger. The sidechain is never heard in the mix.'],
    ['Sidechain EQ','Triggers from one frequency band, of this track or the external source.'],
    ['Headphones','Listen to the trigger signal alone while setting it up.']
  ]);
  // Channel EQ
  add('channel-eq','tone','channel-eq',[
    ['HP 80 Hz','A high-pass switch for removing rumble.'],
    ['Low','Shelf at 100 Hz, ±15 dB; its curve adapts to the amount of gain.'],
    ['Mid / frequency','Sweepable peak, ±12 dB, centred anywhere from 120 Hz to 7.5 kHz.'],
    ['High','Boosting: a high shelf up to +15 dB. Cutting toward −15 dB also brings in a low-pass that falls from 20 kHz to 8 kHz.'],
    ['Display / Output','Live spectrum with the EQ curve; Output compensates for level changes.']
  ]);
  add('channel-eq','compare','channel-eq',[
    ['Comparing','Switch the device off and on, or move Output, to judge the EQ at a matched level.']
  ]);
  add('channel-eq','tone','channel-eq-tips',[
    ['Uses','Shape a reverb’s output, or single drums or whole kits on Drum Rack pads. Follow it with Saturator for a console-like strip where big low boosts also add distortion.']
  ]);

  // Gate
  add('gate','open','gate',[
    ['Purpose','Passes only signal above the threshold: removes hiss or hum between sounds, or cuts reverb tails and natural decays.'],
    ['Display','Input in light grey, output in dark grey outlined in white; drag the blue threshold line.'],
    ['Threshold / Return','Opening level, and hysteresis (orange line): how far below it the signal must fall to close. More Return reduces chatter.'],
    ['Flip','Reverses the gate: only signal below the threshold passes.'],
    ['Lookahead','0, 1 or 10 ms of delay so the gate can open in time; each sounds different.'],
    ['Attack / Hold / Release','Opening time (very short can click), time held open after the signal drops, then closing time.'],
    ['Floor','Attenuation when closed: −inf dB mutes, 0 dB does nothing, values between reduce.']
  ]);
  add('gate','trigger','gate',[
    ['Sidechain','Unfold the device and choose another track as the trigger, such as a drum loop to chop a held pad rhythmically.'],
    ['Gain / Dry/Wet','Trigger level and blend of sidechain with the gated signal; the sidechain itself is never heard.'],
    ['Sidechain EQ','Triggers from a frequency band of either signal.'],
    ['Headphones','Listen to the trigger alone; the display then shows it in green.']
  ]);

  // Overdrive
  add('overdrive','filter','overdrive',[
    ['Band-pass','Before the distortion: drag vertically for width and horizontally for position, or use the sliders.'],
    ['Drive','Amount of distortion; 0% still distorts somewhat.'],
    ['Tone','Post-distortion EQ: higher is brighter.']
  ]);
  add('overdrive','blend','overdrive',[
    ['Dynamics','Low: more internal compression and makeup gain as drive rises. High: less compression, keeping dynamics even at heavy drive.'],
    ['Dry/Wet','Mix; 100% on a return track.']
  ]);

  // Dynamic Tube
  add('dynamic-tube','bias','dynamic-tube',[
    ['Tube A / B / C','A stays clean at low Bias until the input crosses a threshold, then adds bright harmonics; C always distorts, like a poor amp; B is between.'],
    ['Tone','Pushes the distortion toward highs or through the mids and lows.'],
    ['Drive / Bias','How much signal reaches the tube, and how far into nonlinearity; very high Bias breaks the sound up.'],
    ['Output / Hi-Quality','Final level; Hi-Quality (context menu) reduces aliasing, mainly on high frequencies, for slightly more CPU.']
  ]);
  add('dynamic-tube','follow','dynamic-tube',[
    ['Envelope','An envelope follower moves Bias with input level: positive makes loud parts dirtier, negative cleans them up (expansion).'],
    ['Attack / Release','How quickly the follower reacts; no effect with Envelope at zero.']
  ]);
  // Amp
  add('amp','drive','amp',[
    ['Models','With Softube: Clean and Boost (two channels of a ’60s British Invasion amp), Blues (bright ’70s amp), Rock (classic 45 W ’60s amp), Lead and Heavy (two channels of a high-gain metal amp) and Bass (a rare ’70s PA with strong lows and fuzz).'],
    ['Gain / Volume','Preamp input (the main distortion control) and power-amp output; high Volume also distorts on Blues, Heavy and Bass.'],
    ['Bass / Middle / Treble','EQ that interacts non-linearly, as on real amps; boosts can add distortion.'],
    ['Presence','Upper-mid edge in the power stage; its effect varies by model.'],
    ['Output: Mono / Dual','Dual processes stereo at twice the CPU.'],
    ['Dry/Wet','Blend of processed and dry signal.']
  ]);
  add('amp','drive','electricity',[
    ['Shared energy','Amp circuits share a fixed amount of power, so raising one control (e.g. Treble) can reduce others (bass and mids). Expect to adjust several controls together.']
  ]);
  add('amp','drive','more-than-guitars',[
    ['Other sources','Drums, synths and more: try Amp after Operator or Analog for analog grit.']
  ]);
  add('amp','cabinet','amps-and-cabinets',[
    ['Pairing','Real amps drive speaker cabinets, so put Cabinet after Amp for authenticity, or use each alone for unusual results.']
  ]);

  // Cabinet
  add('cabinet','choose','cabinet',[
    ['Speaker','Speaker count and size, e.g. 4x12 is four 12-inch speakers; more and larger generally means louder.'],
    ['Output: Mono / Dual','Dual processes stereo at twice the CPU.'],
    ['Dry/Wet','Blend of processed and dry signal.']
  ]);
  add('cabinet','position','multiple-mics',[
    ['Microphone','Near On-Axis is bright and focused; Near Off-Axis more resonant and less bright; Far is balanced with some room.'],
    ['Dynamic / Condenser','Dynamic is grittier, typical for loud close miking; condenser more accurate, typical at a distance.'],
    ['Several mics','Put Cabinet in an Audio Effect Rack, duplicate the chain, change the mic in each copy, and balance the chains in the Rack mixer.']
  ]);

  // Pedal
  add('pedal','drive','pedal',[
    ['Gain','Distortion amount; 0% is not clean. Start at 0% and raise it; Utility’s Gain before Pedal can lower the input further.'],
    ['Type','Overdrive (warm, smooth), Distortion (tight, aggressive) or Fuzz (unstable, “broken amp”).'],
    ['Bass','Peak EQ at 100 Hz, for punch or for thinning guitars. The EQ is adaptive: Q narrows as boost rises.'],
    ['Mid / Mid Frequency','Switchable centre at 500 Hz (narrow), 1 kHz or 2 kHz (wider).'],
    ['Treble','Shelf at 3.3 kHz, for taming or adding harshness.'],
    ['Sub','Low shelf boosting below 250 Hz; combine with Bass (Sub on and Bass −100%, or Sub off and Bass +100%).'],
    ['Output / Dry/Wet / Hi-Quality','Overall gain, blend, and reduced aliasing from the context menu for slightly more CPU.']
  ]);
  add('pedal','place','positioning-pedal-in-the-device-chain',[
    ['Before Pedal','A Compressor gives a more even result; a resonant EQ or filter boost gives a screaming distortion.']
  ]);
  add('pedal','place','techno-kick',[
    ['Techno kick','A long-decay kick into Distortion with Sub on; right-most Mid Frequency and more Mid for whack, Bass for thump, less Treble for less air.']
  ]);
  add('pedal','place','drum-group-fizzle',[
    ['Drum fizzle','Fuzz, Gain 50%, Sub off, Bass and Mid −100%, Treble 100%, Output −20 dB, then raise Dry/Wet from 0% to taste.']
  ]);
  add('pedal','place','broken-speaker',[
    ['Broken speaker','Fuzz, Sub off, Bass fully down, Treble 25%, Mid 100% at the right-most frequency, Gain 100%.']
  ]);
  add('pedal','place','sub-warmer',[
    ['Sub warmer','Overdrive with Sub on and Bass up; raise Gain slowly for harmonics, then shape the mids.']
  ]);
  // Drum Buss
  add('drum-buss','shape','drum-buss',[
    ['Trim','Lowers the input before processing.'],
    ['Comp','A fixed compressor before the distortion, tuned for drum groups: fast attack, medium release, moderate ratio, generous makeup.'],
    ['Soft / Medium / Hard','Waveshaping, limiting, or clipping with bass boost; each progressively stronger.'],
    ['Drive','How hard the input hits the distortion.']
  ]);
  add('drum-buss','shape','mid-high-frequency-shaping',[
    ['Crunch','Sine-shaped distortion on the mid-highs, for snares and hats.'],
    ['Damp','A low-pass to remove harsh highs added by distortion.'],
    ['Transients','Above 100 Hz. Positive adds attack and sustain (punchy); negative adds attack but shortens sustain (tight, less room).']
  ]);
  add('drum-buss','boom','low-end-enhancement',[
    ['Boom','Amount of low end from a resonant filter; the Bass Meter shows it even when hard to hear.'],
    ['Freq / Force To Note','Filter frequency, or snap it to the nearest note to tune it.'],
    ['Decay','Low-frequency decay: with Boom at 0% only the incoming signal, otherwise the processed low end too.'],
    ['Boom Audition','The headphones button solos the enhancer’s output.']
  ]);
  add('drum-buss','shape','output',[
    ['Dry/Wet / Output Gain','Blend and final level.']
  ]);

  // Redux
  add('redux','rate','downsampling',[
    ['Rate','Target sample rate; lower adds more imaging and inharmonic tones, depending on the material.'],
    ['Jitter','Noise on the downsampling clock: noisier and wider.'],
    ['Pre filter','Limits bandwidth before downsampling (and narrows Jitter’s width).'],
    ['Post filter / Octave','Low-pass after downsampling to reduce imaging; Octave sets it in octaves around half the Rate.']
  ]);
  add('redux','bits','bit-reduction',[
    ['Bits','Output resolution; fewer bits add noise and distortion and shrink dynamics, down to square-wave-like sound.'],
    ['Shape','Quantizer curve: higher values keep quiet detail finer, crushing loud parts more.'],
    ['DC Shift','Offsets the signal before quantizing: louder and crunchier, especially at low Bits.'],
    ['Dry/Wet','Blend; 100% on a return track.']
  ]);

  // Erosion
  add('erosion','noise','erosion',[
    ['How it works','Modulates a very short delay with a sine and filtered noise, from noisy artifacts to downsampling-like distortion. Sets made before 12.4 load Erosion Legacy.'],
    ['Noise Blend','0% sine only, 100% noise only; icons brighten to show which dominates.'],
    ['Filter Width','Noise band width; greyed out at 0% blend.'],
    ['Stereo Width','From mono (0%) to stereo (100%) modulation.']
  ]);
  add('erosion','move','erosion',[
    ['X-Y display','Horizontal sets the sine frequency and noise centre (Freq); vertical sets Amount. ⌥/Alt-drag vertically adjusts noise width instead.'],
    ['Display lines','A solid vertical line shows the sine, dotted horizontal lines the noise, over the live spectrum.']
  ]);

  // Vinyl Distortion
  add('vinyl-distortion','distort','vinyl-distortion',[
    ['Tracing Model','Even-harmonic distortion. Drive, or drag vertically; drag horizontally (or type Freq) for colour; ⌥/Alt-drag vertically for bandwidth.'],
    ['Pinch Effect','Odd harmonics, typically 180° out of phase for a richer stereo image; same controls, different sound.'],
    ['Global Drive','Scales both distortions.'],
    ['Soft / Hard','Dub plate or standard vinyl character.'],
    ['Stereo / Mono','Where Pinch happens; stereo is the realistic choice.']
  ]);
  add('vinyl-distortion','crackle','vinyl-distortion',[
    ['Crackle: Density / Volume','How often crackles occur and how loud they are.']
  ]);
  // Multiband Dynamics
  add('multiband-dynamics','split','dynamics-processing-theory',[
    ['Four kinds','Downward compression: loud gets quieter (common). Upward compression: quiet gets louder. Downward expansion: quiet gets quieter (like a gate). Upward expansion: loud gets louder.'],
    ['Six at once','Three bands, each with an Above and a Below threshold, can apply six kinds of processing together.']
  ]);
  add('multiband-dynamics','split','interface-and-controls',[
    ['High / Low bands','Switch bands on and set the two crossovers (e.g. 500 Hz and 2 kHz make three ranges). With both off, only Mid works, as a single band.'],
    ['Band activator / solo','Bypass a band’s processing and gain, or hear it alone.'],
    ['Input / Output per band','Gain before and after processing.'],
    ['Display','Large bars show output, small bars input. Drag a block’s edge to set Below or Above thresholds; drag its middle up or down to set the ratio. ⌘/Ctrl affects all bands, ⌥/Alt both thresholds of one band, Shift is finer; double-click resets.'],
    ['What dragging does','Lowering the Above block compresses downward; raising it expands upward. Lowering the Below block expands downward; raising it compresses upward.'],
    ['T / B / A','Show Time (attack and release), Below or Above values as numbers.'],
    ['Soft Knee / RMS / Peak','Gradual onset near the threshold; RMS ignores very short peaks, Peak reacts to them.'],
    ['Output / Time / Amount','Overall gain; scales every attack and release together; overall intensity (0% means no processing).']
  ]);
  add('multiband-dynamics','sidechain','sidechain-parameters-4',[
    ['Sidechain','Unfold the device and pick an internal routing point as the trigger; Gain and Dry/Wet set its level and blend. It is never heard.'],
    ['Headphones','Listen to the trigger alone.']
  ]);
  add('multiband-dynamics','shape','basic-multiband-compression',[
    ['Downward compression','Use only the Above thresholds: set crossovers, then drag the upper blocks down (ratios above 1).']
  ]);
  add('multiband-dynamics','shape','de-essing',[
    ['De-essing','Only the high band, crossover near 5 kHz, gentle downward compression with fast times; solo the band while setting it.']
  ]);
  add('multiband-dynamics','shape','uncompression',[
    ['Restoring punch','Lower Input for headroom, set Above thresholds just under the peaks, add a little upward expansion per band. Here fast attacks increase transient impact and slow ones sound muffled. Don’t crush the result again with a limiter.']
  ]);

  // Roar
  add('roar','route','input-section-2',[
    ['Drive','Input level into the gain stages: more or less distortion without touching each stage.'],
    ['Tone Amount / Frequency','Tilt before the stages: positive brightens and thins lows (avoids mud), negative darkens; Frequency sets the shelf.'],
    ['Color Compensation','Applies the opposite tone after the stages, e.g. negative Tone saturates drums without changing low-end impact.'],
    ['Routing modes','Single; Serial (Blend: stage 1 vs 1+2); Parallel (Blend between stages); Multi Band (Low/Mid/High with two crossovers); Mid Side; Feedback (signal and feedback processed separately, delay-like); Delay (stage 2 processes stage 1’s delayed signal).']
  ]);
  add('roar','route','gain-stage-section',[
    ['Stage toggles','Each routing mode has its own stages, switched independently.'],
    ['Shaper Amount / Bias / Level','Saturation amount (or drag the curve); asymmetric offset, broken-circuit sounds, silence at extremes; level compensation.'],
    ['Warm curves','Soft Sine (smooth analog), Diode Clipper (warm with fewer highs), Tube Preamp (keeps transients).'],
    ['Hard curves','Digital Clip (harsh higher harmonics), Bit Crusher (with a compander; strong on quiet parts), Half Wave Rectifier (asymmetric crunch), Full Wave Rectifier (an octave up).'],
    ['Complex curves','Polynomial (metallic, good to modulate), Fractal and Tri Fold (heavy high harmonics), Noise Injection (stereo noise then smooth distortion), Shards (rhythmically breaking the signal).'],
    ['Filter / Pre','Cutoff for the stage’s filter; Pre puts it before the shaper so it doesn’t touch the new harmonics.'],
    ['Filter types','LP, BP, HP, Notch, Peak (Peak Gain), Morph (LP↔HP via BP), Comb (flanger-like when moved), Resampling (Redux-style, no resonance) and Dispersion (time-shifts frequencies: metallic, spring-like).']
  ]);
  add('roar','move','modulation-section',[
    ['LFO 1 / 2','Sine, triangle, square, up or down; Free, Synced, Triplet, Dotted or Sixteenth; Morph and Smooth.'],
    ['Env','Follows the input: Attack, Release, Envelope Hold, Threshold, Gain, and a Frequency/Width band; Input Listen to hear it. E.g. follow the snare to move Dry/Wet.'],
    ['Noise','Simplex and Wander (smooth random, Simplex less regular), S & H (stepped), Brown (filtered noise floor); rate and smoothing.'],
    ['Matrix','Click a parameter to make it a target; drag cells. Global Modulation Amount scales everything; X clears. LEDs in the modulation column show active sources.'],
    ['Expanded view','The header toggle shows every stage and all sources and targets together.']
  ]);
  add('roar','feedback','feedback-section',[
    ['Feedback Mode','Time or synced (Synced, Triplet, Dotted) for delays; Note tunes the ringing to a pitch.'],
    ['Amount','Signal fed back; a compressor in the loop reduces feedback on loud input.'],
    ['Invert / Gate','Invert phase for cancellation effects; Gate fades feedback when input stops (off lets it run forever).'],
    ['Filter Frequency / Width','Band-pass on the feedback path.']
  ]);
  add('roar','feedback','global-section',[
    ['Compression Amount','Compresses the output, and so the feedback.'],
    ['Sidechain HP Filter','Keeps low frequencies from driving that compressor.'],
    ['Output Gain / Dry/Wet','Wet level, followed by a hard clipper, then the mix.']
  ]);
  add('roar','feedback','sidechain-parameters-5',[
    ['External SC','An external source (Post FX or Post Mixer) drives the envelope follower; Mix blends with internal; SC Gain sets its level; never heard.'],
    ['MIDI > FB Note','MIDI from another track (Pre or Post FX) sets the Note feedback pitch; Feedback Mode and Amount are then inactive.'],
    ['Sidechain Listen','Hear the sidechain input while setting up.']
  ]);
  // Filter Delay
  add('filter-delay','paths','filter-delay',[
    ['Three delays','Delay 1 takes the left input, delay 2 both, delay 3 the right; each switches on separately and outputs on its own side unless Pan overrides it.'],
    ['Filters','Each delay has linked low- and high-pass filters before it (feedback passes through them too), with its own On switch. X-Y pad: horizontal for frequency, vertical for bandwidth.']
  ]);
  add('filter-delay','repeat','filter-delay',[
    ['Sync / Delay Time','Sixteenth-note buttons (4 = one beat), with a percentage for swing; unsynced, milliseconds.'],
    ['Feedback','Output returned to the input; very high values run away into loud oscillation.'],
    ['Volume / Pan / Dry','Per-delay level up to +6 dB (to make up for heavy filtering) and position; Dry level (minimum on a return).']
  ]);

  // Grain Delay
  add('grain-delay','grain','grain-delay',[
    ['Grains','Slices input into tiny grains, each delayed and pitched separately.'],
    ['X-Y pad','Assign any parameter to the horizontal axis (row below) or vertical axis (row at left).'],
    ['Frequency','Grain size and duration; it strongly shapes how Pitch and Spray sound.'],
    ['Pitch / Random Pitch','A crude pitch shift, plus random per-grain pitch: mutant chorus at low values, unrecognizable at high.']
  ]);
  add('grain-delay','repeat','grain-delay',[
    ['Sync / Delay Time','Sixteenths with swing percentage, or milliseconds; can sit on the X axis.'],
    ['Spray','Random delay-time changes: smearing and noise at low values, rhythmic chaos at high.'],
    ['Feedback / Dry/Wet','Feedback can run away loudly; Dry/Wet can sit on the Y axis.']
  ]);

  // Beat Repeat
  add('beat-repeat','capture','beat-repeat',[
    ['Interval / Offset','How often new material is captured (1/32 to 4 bars) and where: Interval 1 Bar with Offset 8/16 captures on beat three.'],
    ['Chance','Likelihood that a scheduled repeat actually happens (0–100%).'],
    ['Gate','Total length of the repeats, in sixteenths.'],
    ['Repeat','Captures and repeats immediately, ignoring the above, until switched off.'],
    ['Grid / No Triplets','Slice size: large values loop rhythmically, tiny ones make artifacts; No Triplets keeps divisions binary.']
  ]);
  add('beat-repeat','vary','beat-repeat',[
    ['Variation / mode','Random grid changes: Trigger (per repeat), 1/4, 1/8, 1/16 (at regular intervals) or Auto (after every repeat).'],
    ['Pitch / Pitch Decay','Resampled pitch-down that lengthens slices; Pitch Decay makes each repeat lower than the last.'],
    ['Filter','Combined low- and high-pass band: on/off, centre and width.'],
    ['Mix / Insert / Gate','Original plus repeats; original muted during repeats; or repeats only (useful on a return).'],
    ['Volume / Decay','Output level and progressively fading repeats.']
  ]);

  // Looper
  add('looper','record','looper',[
    ['Display','Turns red while recording; afterwards shows position and loop length.'],
    ['Record / Overdub / Play / Stop','Record overwrites the buffer; Overdub layers passes of the same length; Play plays without recording.'],
    ['Quantization','With Live playing, Looper follows launch quantization like a clip; stopped, it reacts immediately.'],
    ['Clear','In Overdub while playing, empties the buffer but keeps tempo and length; otherwise resets both.'],
    ['Undo / Redo','Removes everything overdubbed since Overdub was last enabled, and restores it.'],
    ['Multi-Purpose Transport Button','Empty: record. Recording, overdubbing or stopped: play. Playing: toggles overdub. Double-press stops; hold two seconds for Undo/Redo (playing) or Clear (stopped). Map it to a footswitch in MIDI Map Mode.'],
    ['Tempo Control','None (independent), Follow song tempo, or Set & Follow song tempo (Live adopts the loop’s tempo).'],
    ['Record Length','With the song running, x bars records until you press another button; a fixed length then switches to Play or Overdub. Stopped, x bars guesses the tempo (maybe double or half); a fixed length sets the tempo to fit.'],
    ['Song Control','None, Start Song, or Start & Stop Song, which ties Live’s transport to Looper (and keeps Link apps in position).'],
    ['Input -> Output','Always (single track), Never (return tracks), Rec/OVR (hear input only while recording), Rec/OVR/Stop (hear it except during playback).']
  ]);
  add('looper','transform','looper',[
    ['×2 / ÷2','Double the buffer by duplicating it, or keep only the currently playing half.'],
    ['Drag me!','Drag the loop out as an audio clip (Warp Mode Re-Pitch) or into the Browser; drop a file in to replace the buffer as a bed for overdubs.'],
    ['Speed / octave arrows','Playback speed and pitch; the arrows double or halve it, quantized.'],
    ['Reverse','Plays existing material backwards; new overdubs play forward, and switching back swaps them.'],
    ['Feedback','How much of the loop survives each overdub pass: 100% never fades, 50% halves each time. No effect in Play.']
  ]);
  add('looper','route','feedback-routing',[
    ['Processing overdubs','Record into Looper; on a new audio track set top Audio From/To to Looper’s track and bottom choosers to Insert-Looper; Monitor In; add effects; overdub. Each pass returns through those effects.']
  ]);
  // Hybrid Reverb
  add('hybrid-reverb','route','signal-flow',[
    ['Signal flow','Input → the two engines (as routed) → EQ → output. Convolution controls are yellow, algorithmic ones blue.']
  ]);
  add('hybrid-reverb','route','input-section-1',[
    ['Send','Gain into the reverb only; the dry signal passes unchanged.'],
    ['Predelay / sync / Feedback','Time before the first reflection (1–25 ms is natural), in ms or beats, with feedback set separately for each.'],
    ['Routing','Serial: convolution feeds the algorithm (Blend sets how much). Parallel: both side by side (Blend balances them). Algorithm or Convolution alone greys out the other engine, and Blend does nothing.']
  ]);
  add('hybrid-reverb','convolve','convolution-reverb-engine',[
    ['Impulse responses','Recordings of real spaces, or of anything. Category then IR, or step with arrows across categories: Early Reflections, Real Places, Chambers and Large Rooms, Made for Drums, Halls, Plates, Springs, Bigger Spaces, Textures, User.'],
    ['Your own IRs','Drop an audio file on the waveform; every file in its folder is added to User. They disappear if the device is removed and re-added; drop them again.'],
    ['Attack / Decay / Size','An envelope on the IR and its relative size, shown in the waveform.']
  ]);
  add('hybrid-reverb','tail','algorithmic-reverb-engine',[
    ['Shared controls','Decay (time to −60 dB), Size (room), Delay (extra predelay) for every algorithm.'],
    ['Freeze / Freeze In','Freeze blocks new input and sustains the tail forever; Freeze In lets input keep building it up.']
  ]);
  add('hybrid-reverb','tail','dark-hall',[
    ['Dark Hall','Smooth medium-to-long halls. Damping darkens; Mod adds chorusing movement; Shape goes from small and resonant to large and diffuse; Bass X and Bass Mult set and scale the low-end decay. Long Decay with a tiny Size gives gong-like tones.']
  ]);
  add('hybrid-reverb','tail','quartz',[
    ['Quartz','Hall with audible echoes and clear early reflections, good on voices, drums and transients. Damping, Lo Damp (brightens), Mod, Diffusion (sparse to dense) and Distance (near and dense to far and spaced).']
  ]);
  add('hybrid-reverb','tail','shimmer',[
    ['Shimmer','Stacked diffuse delays with a pitch shifter in the feedback, so tails climb or fall. Damping, Mod, Pitch (semitones), Diffusion (below 10% for dub delays on drums) and Shimmer (0% no pitch, 100% harmonizes melodic material). Size spaces the echoes.']
  ]);
  add('hybrid-reverb','tail','tides',[
    ['Tides','Smooth reverb with a moving multiband filter for rippling bands. Damping, Wave (noise → sine → square), Tide (intensity), Phase (left/right offset) and Rate (synced, with triplet, 16th and dotted).']
  ]);
  add('hybrid-reverb','tail','prism',[
    ['Prism','Bright, artificial velvet-noise reverb: a “ghost” reverb that adds depth unobtrusively, good for short non-linear drum decays. Low Mult and High Mult scale low and high decay; X over sets the split. Small Decay and Size give an ’80s gated snare.']
  ]);
  add('hybrid-reverb','tail','eq-section',[
    ['EQ','Second tab, with its own switch; after both engines, or before the algorithm with Pre Algo.'],
    ['Bands','Low and high bands switch between shelves and pass filters (6 to 96 dB/octave); two full-range peak bands.']
  ]);
  add('hybrid-reverb','tail','output-section',[
    ['Stereo','Wet width: 0% mono, above 100% extra wide.'],
    ['Vintage','Emulates older, lower-resolution digital reverbs: Subtle, Old, Older, Extreme.'],
    ['Bass Mono / Dry/Wet','Mono below 180 Hz for tighter lows; mix (100% on a return).']
  ]);
  // Shifter
  add('shifter','shift','tuning-and-delay-section',[
    ['Coarse / Fine','The shift amount, in semitones and cents (Pitch) or Hertz (Freq, Ring).'],
    ['Wide','Inverts the Spread value on the right channel, so one side shifts up while the other shifts down; needs a non-zero Spread.'],
    ['Window','Pitch mode: analysis window size; longer tends to suit low sounds, shorter high ones.'],
    ['Delay / Feedback / Tone','An optional delay (Hz or synced) with feedback; Tone cuts highs in the feedback path.']
  ]);
  add('shifter','shift','shifter-mode-section',[
    ['Pitch','Transposes by semitones and cents.'],
    ['Freq','Moves every frequency by a fixed number of Hz: small shifts give tremolo or phasing, large ones dissonant metal.'],
    ['Ring','Adds and subtracts a frequency (ring modulation); Drive adds distortion, in Ring mode only.'],
    ['Dry/Wet','Balance of dry and processed signal.']
  ]);
  add('shifter','move','lfo-section-1',[
    ['Waveforms','Sine, Triangle, Triangle Analog, Triangle 8, Triangle 16, Saw Up, Saw Down, Rectangle, Random, Random S&H.'],
    ['Duty Cycle / Phase / Spin / Width','Phase offsets left and right (180° opposite); Spin detunes their rates; Random uses Phase and Random S&H uses Width (0% identical, 100% mirrored).'],
    ['Offset','With synced rates, shifts each LFO’s starting point.'],
    ['Rate / Amount','Hz or tempo divisions; depth.']
  ]);
  add('shifter','move','envelope-follower-section',[
    ['Env Fol','Input level becomes modulation: Amount in semitones (Pitch) or Hz (Freq, Ring), with Attack and Release.']
  ]);
  add('shifter','move','sidechain-parameters-6',[
    ['Pitch Mode: Internal / MIDI','Unfold with the title-bar triangle. MIDI sets the shift from notes on another track, with Glide (ms) and PB range (0–24 st).']
  ]);
  add('shifter','move','pitch-shifted-drum-layers',[
    ['Drum layers','On a duplicate drum track, Pitch mode with Delay on: high shifts give crisp metallic echoes, low ones drawn-out delays; keep it low in the mix.']
  ]);
  add('shifter','move','phasing-effects',[
    ['Phasing','Freq mode, Fine within about 2 Hz, Mix near 50% so dry and shifted interact.']
  ]);
  add('shifter','move','tremolo-effects',[
    ['Tremolo','Ring mode below about 20 Hz; Wide with a small Spread adds stereo movement.']
  ]);
  // Auto Shift
  add('auto-shift','correct','input-section',[
    ['Input Pitch','The detected note and cents of the incoming audio (monophonic sources such as voice).'],
    ['Pitch Range: High / Mid / Bass','Optimizes detection for the source’s register; each LED flashes when input falls in its range, and each changes latency.'],
    ['Input Gain','Level of the incoming signal, −24 to +24 dB.'],
    ['Latency / Live Mode','The readout shows latency in ms. Live Mode (title bar) lowers it for performance, at the risk of small glitches on note starts and fast changes.']
  ]);
  add('auto-shift','correct','quantizer-tab',[
    ['Pitch Correction Meter','Shows how many cents the input is being moved, and the target note below.'],
    ['Correction Strength / Smooth / Smoothing Time','How firmly pitch is pulled to target; smoothing (0–200 ms) keeps natural transitions and vibrato. Together they range from subtle to hard-quantized.'],
    ['Scale','Click notes to build a custom scale, or use Root and Scale. Pitch Shift transposes in scale degrees after correction.'],
    ['Use Current Scale','Follows the clip’s scale (shown in purple); Root and Scale are then inactive.']
  ]);
  add('auto-shift','play','midi-input',[
    ['MIDI In / MIDI On','Show the panel and switch MIDI correction on; the Quantizer tab becomes the MIDI tab. Sound only when notes arrive.'],
    ['External Source / Tapping Point','The track sending notes, taken Pre FX (skipping its MIDI effects) or Post FX / Post Mixer.'],
    ['Mono / Glide','One target note at a time, with slide time between overlapping notes.'],
    ['Poly / Voice Count','2, 4 or 8 voices, for harmonies.']
  ]);
  add('auto-shift','play','midi-tab',[
    ['Piano display','Shows incoming notes. For a scale, put the Scale MIDI effect on the source track and tap Post FX.'],
    ['Attack / Release Time','Per-note envelope: 0–1,000 ms and 0–5 s.'],
    ['Note Latch / Pitch Bend Range','Hold notes until the next Note On; bend range 0–48 st.'],
    ['Mod Routing','Pitch, Formant, Volume and Pan, each from Velocity, Pressure, Mod Wheel, Pitch Bend, Note PB or Slide, with a Mod Depth.']
  ]);
  add('auto-shift','shape','lfo-tab',[
    ['LFO Reset / Onset Indicator','Restart the LFO at note onsets: after unpitched audio when quantizing, or on new MIDI notes.'],
    ['Delay / Attack','Wait up to 1.5 s, then fade in over up to 2 s.'],
    ['Waveform / Rate','Sine, Triangle, Triangle 8, Triangle 16, Saw Up, Saw Down, Rectangle, Random, Random S&H; rate in ms or synced.'],
    ['Mod Routing','Depth to Pitch, Formant, Volume and Pan; works whether or not correction is on.']
  ]);
  add('auto-shift','shape','pitch-section',[
    ['Pitch Shift / Fine','Transposition in semitones and cents.'],
    ['Formant Shift','±100%: higher sounds brighter and more resonant, lower darker and thinner, without changing pitch.'],
    ['Formant Follow','How much formants move with the pitch shift; higher sounds more natural. Works with or without correction.']
  ]);
  add('auto-shift','shape','vibrato-section',[
    ['Amount / Rate / Fade In','Depth up to 200 cents, 2–15 Hz, fade-in time.'],
    ['Natural Vibrato','Varies speed and depth for realism. Works with or without correction.'],
    ['Dry/Wet','0% uncorrected, 100% corrected only; 50% gives a doubler.']
  ]);
  // Corpus
  add('corpus','resonate','resonator-parameters',[
    ['Resonance Type','Beam, Marimba, String, Membrane, Plate, Pipe (open one end, adjustable Opening) or Tube (open both ends); physically modelled with Applied Acoustics Systems.'],
    ['Quality','Eco to High, fewer or more calculated overtones (not for Pipe or Tube).'],
    ['Decay / Material / Radius','Damping and ring time; Material sets whether lows (wood, nylon, rubber) or highs (glass, metal) ring longer; Pipe and Tube use Radius instead. Both also on the X-Y pad.'],
    ['Bright / Inharm / Ratio / Opening','Level of higher components; compressed or stretched partials; Membrane and Plate proportions; Pipe openness.'],
    ['Hit / Pos. L / Pos. R','Strike point and listening points, centre to edge (not Pipe or Tube).'],
    ['Width','0% sends both resonators to each side (mono); 100% one per side.'],
    ['Tune / Fine / Spread','Frequency in Hz (or coarse offset under MIDI control); fine offset in cents; Spread detunes left up and right down, or the reverse.']
  ]);
  add('corpus','move','lfo-section',[
    ['LFO','Modulates the resonant frequency by Amount, at Rate in Hz or synced; sine, square, triangle, saw up, saw down, stepped or smooth noise.'],
    ['Phase / Spin / Offset','Two LFOs, one per channel: Phase offsets them (180° opposite), Spin detunes them (Hz mode), Offset shifts the start (synced). Noise ignores these.']
  ]);
  add('corpus','resonate','filter-section',[
    ['Filter','Band-pass on the processed signal, with Freq and Bdwidth.']
  ]);
  add('corpus','resonate','global-parameters',[
    ['Bleed','Mixes in unprocessed signal to restore highs (not for Pipe or Tube).'],
    ['Gain / limiter LED','Processed level; a built-in limiter engages when too loud, shown by the LED.'],
    ['Dry/Wet','Balance into the processing; lowering it stops new input rather than cutting ringing resonances.']
  ]);
  add('corpus','move','sidechain-parameters-2',[
    ['MIDI From','A MIDI track and tapping point supply notes; the title-bar button lights when active.'],
    ['Frequency / Last / Low','Notes tune the resonance; with several held, the last or lowest wins. Transpose, Fine and PB Range offset it.'],
    ['Off Decay','Note-offs mute the resonance by the slider amount: 0% rings on like a marimba, 100% stops at release.']
  ]);

  // Resonators
  add('resonators','tune','resonators',[
    ['Five resonators','Tuned in parallel, from plucked-string colours to vocoder-like tones. Resonator I takes both channels, II and IV the left, III and V the right.'],
    ['Note','Root pitch for all (C-1 to C5), or scale degrees with scale awareness, or tuning-system note indices; Resonator I Fine in cents.'],
    ['Pitch II–V','Each transposes from the root by ±24 semitones (±21 scale degrees when scale-aware), with fine tuning.'],
    ['On / Gain','Per resonator; a switched-off one uses no CPU, and turning off I leaves the others running.']
  ]);
  add('resonators','shape','resonators',[
    ['Input filter','Low-pass, band-pass, high-pass or notch before the resonators, with Frequency.'],
    ['Mode A / B','A is more realistic; B is especially interesting with a low root Note.'],
    ['Decay / Const','Ring time; low notes normally ring longer, like strings. Const makes decay equal across pitch.'],
    ['Color','Brightness of the resonance.'],
    ['Width / Gain / Dry/Wet','Width narrows II–V toward mono at 0%; Gain sets the resonated level (unless fully dry); mix.']
  ]);
  // Spectral Resonator
  add('spectral-resonator','pitch','pitch-mode-section',[
    ['Internal / MIDI','A single fixed pitch, or tuned by notes from another MIDI track (choose it in External Source, Pre or Post FX); a hardware keyboard reaches it through a MIDI track.'],
    ['Mono / Poly / Polyphony','One voice or chords, 2–16 voices.'],
    ['MIDI Gate','On: resonates only while notes play, like an instrument. Off: still responds to audio without notes. Always on in Poly.'],
    ['Glide / PB','Slide time (Mono only) and pitch-bend range 0–24 st; MPE is supported.']
  ]);
  add('spectral-resonator','pitch','frequency-section',[
    ['Freq','Internal pitch in Hz or as a note; with Use Current Scale it becomes SD Shift (scale degrees; chromatic if no scale is set).'],
    ['Transp.','MIDI mode: ±48 semitones, or ±28 scale degrees as SD Shift. Tuning systems switch these to note indices.'],
    ['Stretch','Spacing of the harmonics: negative compresses, positive expands; 100% leaves only odd harmonics (square-like).'],
    ['Shift','Transposes the incoming spectrum ±48 st before resonating.'],
    ['Decay / HF Damp / LF Damp','Resonance length; damping of high and low partials, which follows the current pitch.']
  ]);
  add('spectral-resonator','partials','modulation-section-1',[
    ['Modes','None; Chorus (triangle per partial; amplitude only at Mod Rate 0); Wander (random saws per partial); Granular (random decaying bursts; Mod Rate sets density).'],
    ['Mod Rate / Pch. Mod','Modulation speed and pitch range in semitones (bipolar except in Granular).']
  ]);
  add('spectral-resonator','partials','spectrogram',[
    ['Display','Dry in yellow, wet in blue; hide with the toggle.'],
    ['Harmonics','How many resonant harmonics: more is brighter and heavier on CPU; in Poly they are shared among voices.'],
    ['Quantize','Snaps each harmonic to the scale or tuning system (chromatic if none).']
  ]);
  add('spectral-resonator','partials','global-parameters-1',[
    ['Input Send / limiter','Gain into the processing, with a limiter LED.'],
    ['Unison / Uni. Amt','Detuned copies of the partials, and their detune; independently modulated in Wander and Granular.'],
    ['Dry/Wet','Mix, also reflected in the display (100% on a return).']
  ]);
  add('spectral-resonator','partials','spectral-resonator-tips',[
    ['Ideas','Tune drums to the bassline with MIDI; follow a melody via Convert Melody/Harmony to New MIDI Track; low Freq with Unison and slow Wander for reverb-like washes; vocoder-style on vocals; two in series with different MIDI.']
  ]);

  // Spectral Time
  add('spectral-time','freeze','spectral-time',[
    ['Freezer and Delay','Usable alone or together (freezer feeding delay), each with its own On button; the spectrogram shows dry in yellow and wet in blue.'],
    ['Zero Dry Signal Latency','Context menu: dry signal without delay, for playing live through the device.']
  ]);
  add('spectral-time','freeze','freezer-section',[
    ['Freeze','Needed in both modes for anything to freeze.'],
    ['Manual','Freeze on click, with Fade In and Fade Out in ms.'],
    ['Retrigger: Onsets / Sync','Freeze at each detected transient (Sensitivity 0–100%) or at a regular Interval in ms or beats.'],
    ['Crossfade / Envelope','New freezes crossfade from the old over X-Fade (a share of the interval), or fade in and out by their own times with up to eight stacked.']
  ]);
  add('spectral-time','delay','delay-section',[
    ['Time / Mode','Time (ms), Notes, or counts of 16th, 16th Triplet or 16th Dotted notes.'],
    ['Feedback / Shift','More audible echoes; each repeat moves up or down in frequency.'],
    ['Tilt / Spray / Mask','Delay highs more than lows (positive) or the reverse; scatter delay times randomly; limit both to highs (positive) or lows (negative).'],
    ['Stereo / Dry/Wet','Width of Tilt and Spray; delay-section mix only.']
  ]);
  add('spectral-time','delay','resolution-section',[
    ['Resolution','Analysis resolution: lower reduces latency (useful while tracking) at the cost of fidelity.']
  ]);
  add('spectral-time','delay','global-controls-2',[
    ['Input Send / order / Dry/Wet','Input gain; Frz > Dly or Dly > Frz order; overall mix (100% on a return).']
  ]);
  // Vocoder
  add('vocoder','carrier','vocoder',[
    ['Availability','Not in the Intro and Lite editions.'],
    ['How it works','The carrier’s frequencies take on the modulator’s level contour through matched banks of band-pass filters. Put Vocoder on the modulator’s track (usually voice or drums).'],
    ['Carrier: Noise','Internal noise; X-Y pad sets downsampling (left lowers the rate) and density (down is sparser).'],
    ['Carrier: External','Any internal routing point, e.g. a synth: the classic robot voice.'],
    ['Carrier: Modulator','The modulator resynthesized through the vocoder’s shaping.'],
    ['Carrier: Pitch Tracking','A mono oscillator following the modulator’s pitch within High/Low limits: saw or three pulse shapes, with Pitch for coarse tuning. It holds the last clear pitch, so resets can surprise; unpredictable on chords or drums.'],
    ['Enhance / Unvoiced / Sens. / Fast-Slow','Brighter carrier by normalizing it; noise for pitchless sounds like “f” and “s”; how readily that noise engages; how fast it switches.'],
    ['Filterbank display / Bands','Click to lower individual bands; more bands are more accurate but cost CPU.'],
    ['Range / BW / Precise-Retro','Frequency span of the filters; bandwidth (100% most accurate); equal bands, or narrower and louder toward the top (Retro).'],
    ['Gate / Level / Depth','Silence bands below a threshold; output level; envelope depth (100% classic, 0% ignores it, 200% only peaks).'],
    ['Attack / Release','Response speed; very fast keeps transients but can distort.'],
    ['Mono / Stereo / L/R','Both mono; mono modulator with stereo carrier; or both stereo.'],
    ['Formant / Dry/Wet','Shifts the carrier filterbank up or down (small moves change apparent vocal gender); mix.']
  ]);
  add('vocoder','shape','singing-synthesizer',[
    ['Singing synth','Vocoder on the vocal track, a bright synth (sawtooth works well) on another; Carrier External, Audio From that synth track, Post FX; arm both if live; solo the voice track to hear only the vocoder. Unvoiced or Enhance improve clarity.']
  ]);
  add('vocoder','shape','formant-shifter',[
    ['Formant shifter','Carrier Modulator, Depth 100%, Enhance on, then move Formant and the filterbank controls.']
  ]);

  // External Audio Effect
  add('external-audio-effect','route','external-audio-effect',[
    ['What it is','Puts a hardware effect inside the device chain: Audio To sends to interface outputs, Audio From returns from inputs (Configure… opens Audio Settings).'],
    ['Peak indicators','Highest level on each side; click to reset.'],
    ['Gain / Dry/Wet / Invert','Send and return levels (avoid clipping on both); mix (100% on a return); phase invert of the return.']
  ]);
  add('external-audio-effect','align','external-audio-effect',[
    ['Hardware Latency','Compensates delay Live can’t detect; disabled when Options → Delay Compensation is off. See the Driver Error Compensation article in Ableton’s Knowledge Base for measuring it.'],
    ['ms or samples','Samples for digital connections, milliseconds for analog; samples are finer, but switch back to ms before changing sample rate.']
  ]);

  // Spectrum
  add('spectrum','inspect','spectrum',[
    ['Measurement only','Shows level against frequency or pitch; changes nothing. Peaks are held until the song restarts.'],
    ['Graph / Max','Line or discrete bins; show accumulated maxima (click to reset).'],
    ['Scale X','Linear (detail in the highs), logarithmic or semitone (same scale, Hz or note labels).'],
    ['Pointer readout','Amplitude, frequency and note name under the mouse.'],
    ['Range / Auto','Manual amplitude range (drag the legend: vertical scrolls, horizontal zooms; or use sliders), or automatic scaling.'],
    ['Bigger view','Title-bar button or double-click moves the display into Live’s main window.']
  ]);
  add('spectrum','resolve','spectrum',[
    ['Block','Samples per measurement: more is accurate, heavier on CPU.'],
    ['Channel','Which channel is analysed: left, right or both.'],
    ['Refresh','How often it measures: faster is more accurate, more CPU.'],
    ['Avg','Blocks averaged per update: 1 shows short peaks; higher is smoother and closer to how we hear.']
  ]);

  // Tuner
  add('tuner','tune','tuner',[
    ['Measurement only','For clean monophonic sources; chords, noise or very rich tones may read wrongly.']
  ]);
  add('tuner','tune','classic-view',[
    ['Classic View','A ball on a curve and the nearest note; arrows show whether to tune up or down; green is in tune, red out.'],
    ['Target / Strobe','A circle marks the target (sharp sits right, flat left); or a rotating band: right is sharp, left flat, faster the further off.'],
    ['Hertz / Cents','Show absolute frequency or distance from the target.']
  ]);
  add('tuner','tune','reference-slider',[
    ['Reference','Concert pitch, 440 Hz by default, from 410 to 480 Hz.']
  ]);
  add('tuner','trace','view-switches',[
    ['Views','Classic or Histogram, switched at lower left; both colour-code accuracy.']
  ]);
  add('tuner','trace','histogram-view',[
    ['Histogram View','Pitch over time; grey bars mark each note’s centre, with sharp above and flat below. Drag vertically to scroll, horizontally to zoom; Auto keeps the pitch centred.']
  ]);
  add('tuner','trace','note-spellings',[
    ['Note spellings','Right-click the display: Sharps, Flats, or both.']
  ]);
})();
