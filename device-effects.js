(() => {
  const {add,act:a,A,M}=deviceActions;
  add(A,'utility',[
    a('level','Raise / lower','utility','Change level without moving the track fader.', ['Move Gain to raise or lower the signal. Use Mute to silence it.','Compare with bypass at matched levels; use Utility before another effect to change the level entering that effect.'],[['Input channel','Choose Stereo, Left or Right; selecting one side sends it to both output channels.'],['Phase switches','Invert the polarity of the left or right channel. They do not time-align recordings.']]),
    a('width','Narrow / widen','utility','Change the relationship between the stereo channels.', ['Lower Width toward 0% to collapse the stereo image. Use Mono to check the sum.','Enable Bass Mono and set its frequency to narrow only the low end.','Use Balance to shift the output balance; use the context menu to switch the Width control to Mid/Side mode when that is the intended operation.'],[['Mono check','If something nearly disappears, investigate phase relationships rather than simply turning it up.']])
  ]);
  add(A,'eq-eight',[
    a('move','Place / move','eq-eight','Shape a frequency range with a filter band.', ['Enable a band and choose its filter shape. Drag its numbered point sideways for Frequency and vertically for Gain where the shape supports it.','Adjust Q to widen or narrow the band. Use the band’s on/off switch to compare the change.'],[['Cut filters','Their point controls frequency, not a boost or cut amount.'],['Output Gain','Match the processed level to the bypassed level.']]),
    a('listen','Listen / separate','context-menu-options-for-eq-eight','Inspect a band or process different parts of the stereo signal.', ['Use Audition while adjusting a band to hear the affected frequency region; switch it off for the whole sound.','Choose Stereo, L/R or M/S. In L/R or M/S, select the channel you want to edit before moving its bands.','Expand the display for a larger analyzer. Use the context menu for quality and analyzer options.'],[['Analyzer','Shows the spectrum; it does not decide which frequencies need changing.'],['M/S','Mid is the shared component; Side is the difference between the channels.']])
  ]);
  add(A,'channel-eq',[
    a('tone','Raise / lower','channel-eq channel-eq-tips','Adjust broad low, middle and high regions.', ['Move Low, Mid or High while playing the same passage. Move the frequency slider above Mid to choose where the middle control acts.','Switch on HP 80 Hz to reduce sub-bass. Match the level with Output.']),
    a('compare','Switch / compare','channel-eq','Hear the tone change at a comparable level.', ['Bypass the device, then enable it again. Adjust Output if the processed version is much louder.','Compare broad moves here with a narrower band in EQ Eight when you need more precise placement.'])
  ]);
  add(A,'eq-three',[
    a('split','Split / mute','eq-three','Divide audio into low, middle and high bands.', ['Set the low and high crossover frequencies. Switch one band off to hear what remains.','Move each band’s Gain to reduce or raise it. Turn all bands back on when finished.'],[['Crossover','Sets the boundary between neighboring bands.'],['Filter slope','Changes how sharply they separate; it can also alter the combined signal.']]),
    a('sweep','Move boundaries','eq-three','Move a crossover while the sound plays.', ['Keep the monitoring level moderate and move a crossover slowly.','Listen with all bands enabled as well as with one muted; restoring the gains is not the same as bypassing the filters.'])
  ]);
  add(A,'auto-filter',[
    a('sweep','Choose / sweep','auto-filter filter-types filter-display filter-drive-and-circuits global-controls','Move a filter through the sound.', ['Choose a filter type and drag the display point. For the usual filter types, horizontal motion changes Frequency and vertical motion changes Resonance.','Compare available circuits and add Drive gradually. Set Output and Dry/Wet after shaping.'],[['More types','Morph, DJ, Comb, Resampling and Vowel have different controls; the display follows the chosen type.'],['Resonance','Can sharply increase level near the cutoff.']]),
    a('cycle','Repeat movement','lfo-controls','Move the filter with an LFO.', ['Raise LFO Amount, choose a waveform and set Rate. Compare free timing with tempo sync.','Adjust stereo Phase or Spin for different motion in the left and right channels.'],[['Quantized movement','Stepped options hold the modulation at discrete values.']]),
    a('follow','Follow a signal','envelope-follower-controls sidechain-parameters mono-sidechain','Let the incoming level move the filter.', ['Raise the envelope amount and set Attack, Hold and Release. Use a negative amount to reverse the movement.','To follow another track, enable the external sidechain and choose its source and tap point. Adjust SC Gain and Mix.','Use Listen only to check the detector, then switch it off.'],[['Sidechain','Controls the movement without replacing the audio being filtered.']])
  ]);
  add(A,'auto-pan-tremolo',[
    a('move','Pan / pulse','auto-pan-tremolo','Move audio across stereo or pulse its level.', ['Choose Panning for left/right motion or Tremolo for amplitude changes.','Raise Amount and set Rate. Select a waveform and adjust its shape.']),
    a('sync','Sync / offset','auto-pan-tremolo','Set the speed and position of the cycle.', ['Compare time-based Rate with a tempo-synced division.','Adjust the phase/offset controls available in the selected mode. Listen in mono as well as stereo.'],[['Mono','Stereo motion can become a level change when the channels are summed.']])
  ]);
  add(A,'compressor',[
    a('reduce','Lower the threshold','compressor compressor-tips','Reduce gain when the detector crosses a threshold.', ['Play a passage and lower Threshold until the gain-reduction meter responds. Set Ratio to control how strongly it reduces the excess.','Adjust Attack and Release while watching the meter and listening to the beginning and tail of notes.','Match the bypass level with output gain; compare before increasing compression.'],[['Knee','Softens or sharpens the transition into compression.'],['Peak / RMS','Changes the detector’s response to fast peaks or average energy.'],['Dry/Wet','Blends the processed signal with the original.']]),
    a('duck','Follow another track','sidechain-parameters-1 mixing-a-voiceover sidechaining-in-dance-music','Use one track to turn down another.', ['Open Sidechain, enable External and choose the source track and tap point.','Use the sidechain EQ or Gain to shape what the detector hears. Turn Listen off after checking it.','Lower Threshold on the track being compressed and set Attack/Release for the return to normal level.'],[['Voice over music','Put Compressor on the music and choose the voice as detector.'],['Rhythmic ducking','Put it on the sustained sound and choose the kick as detector.']])
  ]);
  add(A,'glue-compressor',[
    a('compress','Compress / blend','glue-compressor context-menu-options-for-glue-compressor','Apply linked compression to a source or group.', ['Set Ratio, Attack and Release, then lower Threshold until the meter shows the intended reduction.','Set Range to limit how much gain reduction can occur. Match the level with Makeup and compare.','Use Dry/Wet for a parallel blend; compare Soft Clip separately.'],[['Soft Clip','Adds coloration and is not a transparent final-output safety limiter.']]),
    a('sidechain','Feed the detector','sidechain-parameters-3','Control compression with a separate signal.', ['Open the Sidechain section, choose External and select the source.','Filter the detector if needed, listen briefly to check it, then return to the processed output and adjust Threshold.'])
  ]);
  add(A,'gate',[
    a('open','Open / close','gate','Turn the signal down when it falls below a threshold.', ['Raise Threshold until the wanted events open the gate and the gaps close it.','Adjust Attack, Hold and Release so beginnings and tails are not cut unintentionally.'],[['Return','Sets how far the level must fall before the gate closes again.'],['Floor','Sets the attenuation when closed; it need not be total silence.']]),
    a('trigger','Trigger externally','gate','Let another track decide when this signal passes.', ['Enable External in the sidechain section and select a source.','Filter or raise the detector signal if needed, then set Threshold. Switch detector listening off when done.'],[['Flip','Reverses the gate behavior; check the result at a low listening level.']])
  ]);
  add(A,'limiter',[
    a('catch','Catch peaks','limiter','Hold the output below a ceiling.', ['Set Ceiling and play the loudest passage. Raise Input Gain only as far as the required reduction.','Set Release, or enable Auto. Compare Lookahead values while listening for distortion or softened attacks.','Choose Standard, Soft Clip or True Peak according to the output behavior you need.'],[['Lookahead','Adds latency so the processor can respond to upcoming peaks.'],['After Limiter','Later devices and fader gain can still raise the signal above its ceiling.']]),
    a('maximize','Raise / link','limiter','Adjust loudness and the relationship between channels.', ['Enable Maximize to use Threshold for loudness and Output for the target output level.','Choose L/R or M/S routing and set Link. Compare stereo stability as limiting occurs.'],[['Link 100%','Both channels share reduction when either needs it.'],['Link 0%','The channels can receive different reduction.'],['Version','Older Live releases show fewer Limiter modes and controls.']])
  ]);
  add(A,'multiband-dynamics',[
    a('split','Split / listen','multiband-dynamics dynamics-processing-theory interface-and-controls','Divide dynamics processing into three frequency regions.', ['Set the two crossover frequencies. Solo each band briefly to hear its range.','Select a band and adjust its input level and its above/below thresholds.'],[['Above threshold','Controls louder material in that band.'],['Below threshold','Controls quieter material; expansion or compression can change noise as well as detail.']]),
    a('shape','Compress / expand','multiband-dynamics-tips basic-multiband-compression de-essing uncompression','Set how a band responds on either side of its thresholds.', ['Drag the above- or below-threshold ratio control and watch the transfer display.','Adjust Attack and Release for that band. Use global Time to scale timing and Amount to reduce the overall processing strength.','Unsolo the band and match output levels before comparing.'],[['De-essing','Reduce only the high region when sibilance crosses its threshold.'],['Upward processing','Can make low-level room sound and noise much more audible.']]),
    a('sidechain','Follow a detector','sidechain-parameters-4','Drive the band processing from a separate track.', ['Enable the external sidechain and select its source.','Adjust the source gain and band thresholds while watching reduction, then compare the unprocessed signal.'])
  ]);
  add(A,'saturator',[
    a('drive','Drive / match','saturator context-menu-options-for-saturator','Push the signal through a nonlinear curve.', ['Choose a curve and raise Drive gradually. Lower Output to keep the comparison at a similar level.','Use the Color section to shape what enters the nonlinear processing; compare Soft Clip separately.'],[['Dry/Wet','Blends the unprocessed signal back in.'],['Quality','Context-menu quality options change processing cost as well as the result.']]),
    a('curve','Reshape the curve','saturators-waveshaper-controls','Draw out a different saturation character.', ['Choose Waveshaper to expose its additional controls.','Move one curve control at a time while watching the transfer curve and listening to a steady phrase. Keep the output low while exploring.'],[['Curve','Shows how input amplitude becomes output amplitude; it is not a waveform timeline.']])
  ]);
  add(A,'roar',[
    a('route','Split / drive','roar input-section-2 gain-stage-section','Choose where the distortion stages sit in the path.', ['Begin in Single routing. Choose a Shaper, raise its Amount and adjust Bias; match the output with the stage Level.','Compare Serial, Parallel, Multi Band or Mid Side. Adjust Blend or the crossover boundaries for the chosen routing.','Choose a stage filter and switch Pre to compare filtering before or after the shaper.'],[['Drive','Changes the level entering all stages.'],['Tone / compensation','Changes the input balance; compensation applies an opposing tone curve after processing.']]),
    a('move','Connect modulation','modulation-section','Move a shaper or filter from an LFO, envelope or noise source.', ['Open Mod Sources, set a source’s shape or response, then open Matrix.','Click a target parameter and drag its matrix cell under the chosen source.','Use Global Modulation Amount to reduce or increase all assigned movement together.'],[['Envelope','Follows signal level; Attack and Release set its response.']]),
    a('feedback','Feed back / gate','feedback-section global-section sidechain-parameters-5','Return processed signal through the device.', ['Keep the output low. Choose a feedback mode and raise Feedback Amount slowly.', 'Filter the feedback and enable Feedback Gate if the tail should fade when input stops. Set Compression, Output and Dry/Wet.', 'Use External SC for an outside envelope trigger, or MIDI → FB Note to control feedback pitch from a MIDI track.'],[['Sustaining feedback','Can continue after the input stops when the gate is off.'],['Note mode','Tunes the feedback loop; it is not the same as a clean oscillator.']])
  ]);
  add(A,'amp',[
    a('drive','Choose / drive','amp amp-tips electricity more-than-guitars','Run audio through an amplifier model.', ['Choose a model at low Gain. Raise Gain while compensating with Volume.','Adjust Bass, Middle, Treble and Presence to shape the amplified tone.'],[['Model','Changes the circuit behavior, not just an EQ curve.']]),
    a('cabinet','Add a cabinet','amps-and-cabinets','Place speaker coloration after the amplifier.', ['Load Cabinet after Amp in the chain. Choose a cabinet and microphone setup.','Compare Amp alone with the pair, then set Amp’s Dry/Wet and output mode as needed.'])
  ]);
  add(A,'cabinet',[
    a('choose','Choose a speaker','cabinet cabinet-tips amps-and-cabinets-1','Model the sound of a speaker cabinet.', ['Place Cabinet after an amplifier or another sound source.','Choose a cabinet and microphone, then set Output and Dry/Wet.']),
    a('position','Move the microphone','multiple-mics','Change the modeled pickup position.', ['Compare Near-On, Near-Off and Far positions with the same phrase.','For more than one virtual mic, put separate Cabinets in parallel Rack chains and balance their levels.'],[['Parallel','Two mic perspectives mixed together; not two Cabinets placed in series.']])
  ]);
  add(A,'pedal',[
    a('drive','Choose / drive','pedal pedal-tips','Choose an overdrive, distortion or fuzz circuit.', ['Choose OD, Distort or Fuzz. Raise Gain from a low setting and match the output.', 'Use Bass, Mid and Treble to shape the result; compare Sub separately.']),
    a('place','Place / blend','positioning-pedal-in-the-device-chain techno-kick drum-group-fizzle broken-speaker sub-warmer','Change what the pedal receives.', ['Move Pedal before or after another effect by dragging its title.','Use Dry/Wet for parallel coloration. Listen for changes to the original attack and low end as well as the added distortion.'])
  ]);
  add(A,'overdrive',[
    a('filter','Focus / drive','overdrive','Filter the input before distorting it.', ['Move the input filter’s display to choose the frequency region and width.','Raise Drive gradually and adjust Tone to shape the resulting brightness.']),
    a('blend','Preserve / blend','overdrive','Control dynamics and wet balance.', ['Adjust Dynamics while listening to the beginning of each note.','Set Dry/Wet and compare with bypass at a similar output level.'])
  ]);
  add(A,'dynamic-tube',[
    a('bias','Drive / bias','dynamic-tube','Change a tube model’s operating point.', ['Choose a tube type and raise Drive gradually.','Move Bias and Tone, then compensate with Output.']),
    a('follow','Follow the envelope','dynamic-tube','Let signal level move the tube bias.', ['Raise the envelope amount from zero and adjust Attack and Release.','Compare short hits and sustained sounds; use a negative envelope amount to reverse the bias movement.'])
  ]);
  add(A,'drum-buss',[
    a('shape','Drive / shape','drum-buss mid-high-frequency-shaping output','Change drum attacks and distortion together.', ['Choose a distortion type, raise Drive and compare Crunch.','Move Transients positive to add attack and sustain, or negative to add attack while shortening sustain. Use Damp to soften the high end.','Set Dry/Wet and Output Gain so bypass is not a large level jump.'],[['Trim','Reduces level before processing; Output Gain adjusts the processed result.']]),
    a('boom','Tune / decay','low-end-enhancement','Add a resonant low-frequency component.', ['Raise Boom and move its Frequency while listening to the kick.','Adjust Decay and use the audition control to hear the low-end section on its own; turn audition off afterward.'],[['Low end','Check the combined bass and kick, not just the solo drum.']])
  ]);
  add(A,'redux',[
    a('rate','Lower the rate','redux downsampling','Reduce how often the signal is sampled.', ['Lower Rate from its highest value. Compare filtering and Jitter as the tone changes.','Adjust Dry/Wet to mix the reduced signal with the original.']),
    a('bits','Reduce resolution','bit-reduction','Reduce the amplitude values available to the signal.', ['Lower Bits gradually. Listen to quiet tails as well as loud notes.','Compare the DC Shift and shaping options, then match the final level.'],[['Rate versus Bits','Rate changes time resolution; Bits changes amplitude resolution.']])
  ]);
  add(A,'erosion',[
    a('noise','Add / tune','erosion','Degrade the sound using noise or a sine wave.', ['Choose Noise, Wide Noise or Sine. Raise Amount from zero.','Move Frequency; in a noise mode, adjust Width to change the noise band.']),
    a('move','Move the band','erosion','Place the degradation in a different frequency region.', ['Drag the display control while the same phrase repeats.','Compare the mode and amount with bypass; automate Frequency for a moving texture if wanted.'])
  ]);
  add(A,'vinyl-distortion',[
    a('distort','Place / drive','vinyl-distortion','Shape record-style tracking distortion.', ['Enable Tracing Model or Pinch and move its point: sideways changes Frequency, vertically changes Drive.','Hold Option on Mac or Alt on Windows while moving vertically to adjust the band’s width. Compare Soft and Hard processing.']),
    a('crackle','Add crackle','vinyl-distortion','Mix surface noise separately from distortion.', ['Raise Crackle Volume from silence and set Density.','Compare the crackle by itself, then balance it against the signal and the distortion sections.'])
  ]);
  add(A,'delay',[
    a('time','Space repeats','delay','Set separate left and right delay times.', ['Choose Sync for beat divisions or turn it off for time in milliseconds.','Link the channels for matching times, or unlink them and set each side. Raise Dry/Wet to hear the repeats.'],[['Ping Pong','Alternates repeats across the stereo field.']]),
    a('feedback','Repeat / filter','context-menu-options-for-delay delay-tips glitch-effect chorus-effect','Shape what returns through the delay.', ['Raise Feedback cautiously, then move the filter’s frequency and width.','Compare the time-change modes when moving delay time. Use modulation for changing timing or filter motion.','Use Freeze to hold the delay contents; reduce the listening level before experimenting with sustained feedback.'],[['Return track','Use 100% wet when the original already reaches the mix through its track.']])
  ]);
  add(A,'echo',[
    a('space','Space / filter','echo echo-tab','Set the rhythm and tone of the repeats.', ['Set the left and right delay times, linked or separate. Compare sync divisions with time mode.','Adjust Feedback and the echo filter, then set Dry/Wet.'],[['Display','Shows repeat spacing; the filter display shapes what recirculates.']]),
    a('move','Modulate / color','modulation-tab character-tab','Move the repeats and add imperfections.', ['Set modulation Rate and raise its delay or filter amount.','In Character, compare Noise, Wobble, Gate and Duck one at a time.'],[['Duck','Reduces the echo while input is present, allowing the tail to emerge afterward.']]),
    a('spaceout','Spread / reverberate','global-controls-1','Place the delay and reverb in the stereo field.', ['Compare Stereo, Ping Pong and Mid/Side modes.','Raise Reverb and compare its routing positions. Set the stereo and output controls after balancing the wet signal.'])
  ]);
  add(A,'filter-delay',[
    a('paths','Open / filter paths','filter-delay','Combine three independently filtered delay paths.', ['Enable one path at a time: left, combined left/right, or right input.','Move that path’s filter frequency and width before adding the other paths.']),
    a('repeat','Time / balance','filter-delay','Give each path its own repeat pattern.', ['Set each path’s time and Feedback, then balance its level and pan.','Set the Dry level separately. On a return track, silence the dry contribution so the original is not doubled.'])
  ]);
  add(A,'grain-delay',[
    a('grain','Break / shift','grain-delay','Split incoming sound into delayed grains.', ['Set Dry/Wet low, then change Frequency to alter grain size and density.','Move Pitch and Random Pitch. Use Spray to scatter timing.']),
    a('repeat','Delay / feed back','grain-delay','Repeat the granular result.', ['Set the delay time or sync division, then raise Feedback cautiously.','Assign parameters to the X/Y display and drag to move them together.'])
  ]);
  add(A,'beat-repeat',[
    a('capture','Catch / repeat','beat-repeat','Repeat a small portion of incoming sound.', ['Set Interval and Offset for when capture occurs. Set Grid for the repeated slice length.','Raise Chance to allow automatic repeats, or hold Repeat to capture manually. Set Gate for the overall repeat duration.']),
    a('vary','Vary / blend','beat-repeat','Change the repeats while controlling the original signal.', ['Adjust Variation, Pitch and their decay settings to change successive repeats.','Compare Mix, Insert and Gate output modes. Adjust the repeat Volume and filter.'],[['Mix','Combines original and repeats.'],['Insert','Lets the repeat interrupt the original.'],['Gate','Outputs the repeats without the original.']])
  ]);
  add(A,'looper',[
    a('record','Record / overdub','looper','Build a repeating audio layer inside the device.', ['Choose Record Length and Tempo Control, then press the large button to record.','Press again to enter playback. Press during playback to overdub; press again to return to playback.', 'Use Undo to remove the most recent overdub pass. Double-press the large button to stop.'],[['Record','Starting a new recording replaces the stored loop.'],['Feedback','Below 100%, older material fades with each overdub pass; it does not fade in ordinary playback.']]),
    a('transform','Double / reverse / drag','looper','Change the loop and take it into the Set.', ['Use ×2 to repeat the buffer at twice its length. ÷2 keeps the currently playing half and discards the other.', 'Adjust Speed or Reverse, then drag from Drag me! into a track to make an audio clip.'],[['Clear','Erases the buffer. Holding the large button while stopped clears it too.'],['Input → Output','Sets when the live input is audible independently of loop playback.']]),
    a('route','Route feedback','feedback-routing','Process the loop again on each overdub pass.', ['Create a separate audio track. Choose the Looper track for both Audio From and Audio To, and Insert-Looper in both lower choosers.','Set the new track to Monitor In and add effects there. Enter Overdub in Looper with low feedback and output levels.'],[], 'This is a deliberate feedback route. Stop or reduce it promptly if the level rises unexpectedly.')
  ]);
  add(A,'reverb',[
    a('space','Size / reflect','reverb input-filter early-reflections','Set what enters the room and how its first reflections behave.', ['Shape the input with its filters, then set Pre-Delay to separate the source from the reflections.','Adjust the early-reflection controls and Size while listening to a short sound.']),
    a('tail','Lengthen / color','diffusion-network chorus global-settings output-1','Shape the diffuse tail.', ['Set Decay Time and the high/low decay behavior. Add Chorus if movement is wanted.','Balance early reflections and diffuse tail, then set Dry/Wet. Compare Freeze only after lowering the listening level.'],[['Return track','Usually 100% wet; the source is already present through its own track.'],['Quality','Higher quality uses more processing.']])
  ]);
  add(A,'hybrid-reverb',[
    a('route','Choose / route','hybrid-reverb signal-flow input-section-1','Combine a recorded space with a generated reverb.', ['Choose Serial, Parallel, Algorithm or Convolution routing.','Set the input level and pre-delay, then balance the engines where the routing allows.'],[['Serial','Feeds one engine into the other.'],['Parallel','Mixes their independent outputs.']]),
    a('convolve','Load a space','convolution-reverb-engine','Use an impulse response to supply the space’s signature.', ['Choose an impulse-response category and file, or drop a suitable audio file into the convolution display.','Adjust its envelope and Size, then listen to a short source followed by silence.']),
    a('tail','Shape the tail','algorithmic-reverb-engine dark-hall quartz shimmer tides prism eq-section output-section','Choose a generated tail and shape the output.', ['Select an algorithm and adjust its Decay and its algorithm-specific controls.','Use the EQ to shape the result, then set Stereo, output character and Dry/Wet.', 'Compare Freeze or pitch-shifted tails at a low listening level.'],[['Shimmer','Adds pitch-shifted recirculation; it is not simply a longer room.']])
  ]);
  add(A,'chorus-ensemble',[
    a('thicken','Thicken / double','chorus-ensemble','Blend short modulated delays with the source.', ['Choose Chorus, Ensemble or Vibrato. Set Amount and Rate.','In Chorus or Ensemble, adjust Width and Dry/Wet while comparing with the original signal.'],[['Vibrato','Applies pitch motion without the dry-signal blend; Width and Dry/Wet are unavailable.'],['Version','The Chorus mode is called Classic in some earlier releases.']]),
    a('shape','Filter / feed back','chorus-ensemble-tips','Change the tone and strength of the modulation.', ['Use the high-pass filter to keep low frequencies out of the effect.','Adjust Feedback where the selected mode offers it. Check the sound summed to mono.'])
  ]);
  add(A,'phaser-flanger',[
    a('choose','Sweep / double','phaser-flanger','Choose a moving phase, delay or doubling effect.', ['Select Phaser, Flanger or Doubler. Start with a modest Dry/Wet setting.','Move the mode’s frequency/time and amount controls while holding a sound.']),
    a('move','Repeat / spread','phaser-flanger','Set how the movement evolves.', ['Set the modulation Rate and stereo relationship. Compare synced movement with a free rate.','Raise Feedback cautiously, then shape the wet signal’s tone.'])
  ]);
  add(A,'shifter',[
    a('shift','Shift / tune','shifter tuning-and-delay-section shifter-mode-section','Change pitch or shift the frequency components.', ['Choose Pitch, Frequency or Ring mode. Move the shift control slowly with Dry/Wet low.','In Pitch mode, compare semitone transposition with fine tuning. Set the delay and feedback if repeated shifts are wanted.'],[['Frequency shift','Adds an offset to frequency components instead of preserving their harmonic ratios.'],['Ring','Uses modulation sidebands rather than a simple pitch transposition.']]),
    a('move','Modulate / follow','lfo-section-1 envelope-follower-section sidechain-parameters-6 shifter-tips pitch-shifted-drum-layers phasing-effects tremolo-effects','Move the shifting amount over time.', ['Set an LFO rate and amount, or use the envelope follower to react to signal level.','For an external detector, enable the sidechain and select the source. Check it with Listen, then return to the output.','Compare small shifts blended with the original against a fully wet shift.'])
  ]);
  add(A,'auto-shift',[
    a('correct','Track / correct','auto-shift input-section quantizer-tab','Correct a single clear pitch toward selected notes.', ['Feed a monophonic recording and choose the input range that fits it.','In Quantizer, choose the root, scale or allowed notes. Raise Correction Strength and adjust Smooth Time.'],[['Live Mode','Reduces latency, with a possible quality tradeoff.'],['Polyphonic input','Chords or overlapping voices can confuse pitch tracking.']]),
    a('play','Play target notes','midi-input midi-tab','Supply the target pitches from a MIDI track.', ['Enable MIDI input and choose its source and tap point. Choose Post FX when MIDI effects should shape the incoming notes.','Play or sequence the target notes; set Attack, Release, Latch and bend behavior in the MIDI controls.'],[['Routing','The vocal remains the audio source; MIDI supplies the pitches.']]),
    a('shape','Shift / vibrate','lfo-tab pitch-section vibrato-section','Move pitch, formants or modulation independently.', ['Adjust Pitch Shift and Formant Shift separately. Compare Formant Follow as you transpose.','Set Vibrato Amount, Rate and Fade, or use the LFO for a wider repeating movement.','Blend with the original using Dry/Wet.'],[['Formants','Change vocal-like resonances without being the same control as note pitch.']])
  ]);
  add(A,'corpus',[
    a('resonate','Excite / tune','corpus resonator-parameters filter-section global-parameters','Use incoming audio to excite a modeled object.', ['Choose a resonator model. Play short hits into it and change Tune and Decay.','Adjust the model-specific material and geometry controls. Filter the result and set Dry/Wet.']),
    a('move','Modulate / play','lfo-section sidechain-parameters-2','Move the resonance or tune it with MIDI.', ['Set the LFO rate and amount for repeating pitch movement.','Open the sidechain section and select a MIDI source to tune the resonator from notes. Set note-off behavior to control the tail.'])
  ]);
  add(A,'resonators',[
    a('tune','Tune / layer','resonators','Ring five pitched resonators from incoming audio.', ['Enable the first resonator and set its pitch and Decay.','Enable additional resonators, set their pitch offsets and balance their gains.']),
    a('shape','Filter / spread','resonators','Shape how the resonances sit around the source.', ['Move the input filter to choose what excites the resonators.','Compare the resonator modes and stereo spread, then set Dry/Wet.'])
  ]);
  add(A,'spectral-resonator',[
    a('pitch','Tune / play','spectral-resonator pitch-mode-section frequency-section','Resonate at a fixed pitch or at incoming MIDI notes.', ['Choose Internal and set Frequency, or choose MIDI and select a note source.','Set Decay and compare Mono or Poly behavior in MIDI mode. Use MIDI Gate if note release should end the resonant tail.']),
    a('partials','Stretch / move','modulation-section-1 spectrogram global-parameters-1 spectral-resonator-tips','Reshape and animate the resonant partials.', ['Move Stretch and Shift, then adjust Harmonics while watching the spectrogram.','Choose a modulation mode such as Chorus, Wander or Granular and set its rate and depth.','Balance Input, Unison and Dry/Wet; use fewer partials or voices if processing is heavy.'],[['Spectrogram','Separates the source and resonated spectrum visually.'],['Harmonics / voices','The partial budget is shared across polyphonic voices.']])
  ]);
  add(A,'spectral-time',[
    a('freeze','Catch / hold','spectral-time freezer-section','Hold the spectrum of a moment.', ['Choose Manual and press Freeze while audio plays. Press again to release.','For repeated captures, choose Retrigger and set an onset sensitivity or a synchronized interval. Adjust the fades.']),
    a('delay','Scatter / repeat','delay-section resolution-section global-controls-2','Delay different spectral components.', ['Enable Delay, set Time and Feedback, then move Shift, Tilt or Spray.','Compare Freezer → Delay with Delay → Freezer routing. Set Dry/Wet.','Adjust Resolution for detail versus latency; use the dry-latency context option only when its timing tradeoff fits the task.'],[['Feedback','Can build a long, dense tail. Keep the listening level low while exploring.']])
  ]);
  add(A,'vocoder',[
    a('carrier','Choose a carrier','vocoder','Shape a carrier with the spectrum of the incoming signal.', ['Put Vocoder on the modulator track, such as a voice recording. Choose Noise to hear it without external routing.','For a synthesizer carrier, choose External and select its audio track and tap point. Play the synth while the voice plays.'],[['Modulator','Supplies the changing spectral shape.'],['Carrier','Supplies the sound being shaped. Both need signal for an external-carrier result.']]),
    a('shape','Shape / shift','vocoder-tips singing-synthesizer formant-shifter','Change the band response and articulation.', ['Set the number of Bands and adjust their levels. Change Attack and Release to soften or sharpen the response.','Move Formant and adjust the unvoiced/noise contribution for consonants. Set Dry/Wet.', 'To use the incoming sound as its own carrier, compare the Modulator carrier mode.'])
  ]);
  add(A,'external-audio-effect',[
    a('route','Send / return','external-audio-effect','Insert hardware into an audio chain.', ['Connect a dedicated interface output to the hardware input, and its output to an interface input. Start with low levels.','Choose Audio To and Audio From, then set send/return gains.','Set Dry/Wet for the intended insert or parallel routing.'],[], 'Do not send the return back to the same hardware input through another route; that can create feedback.'),
    a('align','Align the return','external-audio-effect','Compensate for the round-trip delay.', ['Compare a short recorded hit with the source and adjust Hardware Latency for the remaining offset.','Check timing again if the hardware or interface setup changes.'],[['Export / freeze','External processing needs the hardware present and runs in real time.']])
  ]);
  add(A,'spectrum',[
    a('inspect','Inspect / zoom','spectrum','See the frequency distribution without changing the sound.', ['Load Spectrum after the point you want to inspect. Play audio and hover over the display to read frequency and level.','Expand the display and choose the channel and frequency/pitch scale.']),
    a('resolve','Resolve / smooth','spectrum','Change the detail and stability of the display.', ['Raise Block size for finer frequency resolution; compare the added processing cost.','Adjust Refresh and Avg to trade responsiveness for a steadier trace.'],[['Analyzer only','Spectrum does not remove or boost anything. Use an EQ to change the signal.']])
  ]);
  add(A,'tuner',[
    a('tune','Play / center','tuner classic-view reference-slider','Read the pitch of one sustained note.', ['Play a single clear note. In Classic view, raise or lower the instrument’s tuning until the indicator centers.','Set the reference frequency if the session is not using A = 440 Hz.'],[['Sharp / flat','The indicator shows deviation from the detected target note.'],['Read-only','Tuner measures pitch; it does not retune audio.']]),
    a('trace','Watch the trace','view-switches histogram-view note-spellings','Inspect how a note’s pitch changes over time.', ['Switch to Histogram and play a sustained note or slide.','Drag to move through the pitch range and adjust the view. Choose sharp/flat spelling in the context menu.'])
  ]);

  add(M,'arpeggiator',[
    a('pattern','Order / repeat','arpeggiator','Turn held notes into a repeated sequence.', ['Place Arpeggiator before an instrument. Hold a chord and choose Style.','Set Rate and Gate; choose tempo sync or free timing. Use Pattern Offset to rotate the starting point.'],[['Hold','Keeps the pattern running after key release; playing held notes again can remove them.'],['Gate','Sets each generated note’s length relative to Rate.']]),
    a('transpose','Step / restart','arpeggiator','Move and restart the pattern.', ['Set Distance and Steps to repeat at transposed pitches. Enable Use Current Scale when the interval should follow scale degrees.','Choose Retrigger Off, Note or Beat, then set Repeats.','Enable Velocity and set Target and Decay for a changing velocity contour.'],[['Groove','Select a groove and use the global Groove Amount for its strength.']])
  ]);
  add(M,'chord',[
    a('stack','Add pitches','chord','Add up to six pitches to each incoming note.', ['Place Chord before an instrument. Set Shift controls for the desired intervals.','Alternatively enable Learn, hold a chord on a controller, then turn Learn off. The first held note supplies the reference pitch.'],[['Scale awareness','Changes Shift values from semitones to scale degrees.'],['Duplicates','A pitch already assigned to one Shift control is not added again by another.']]),
    a('spread','Strum / vary','chord','Spread generated notes in time and dynamics.', ['Set Velocity or Chance for each added pitch.','Move Strum positive or negative to change timing and order. Shape it with Tension and Crescendo.'],[['MPE','The context menu can pass per-note expression to generated notes.']])
  ]);
  add(M,'pitch',[
    a('transpose','Raise / lower','pitch','Transpose incoming MIDI without editing the clip.', ['Place Pitch before the instrument. Move Pitch in semitones, or enable Use Current Scale for scale degrees.','Set Step Width and use Step Up/Down for repeatable jumps.']),
    a('range','Block / fold / limit','pitch','Control what happens outside a pitch range.', ['Set Lowest and Range.','Choose Block to stop out-of-range notes, Fold to move them into range, or Limit to clamp them to the nearest boundary.'],[['MIDI only','Does not pitch-shift a recording; it changes notes before sound is made.']])
  ]);
  add(M,'note-length',[
    a('length','Shorten / hold','note-length','Replace incoming note lengths.', ['Set Trigger Source to Note On, then choose a synced or millisecond Length.','Adjust Gate as a percentage of Length. Compare short and overlapping notes.','Enable Latch to hold until the next triggering note instead of using a fixed Length.']),
    a('release','Trigger on release','note-length','Make the outgoing note start when the key is released.', ['Choose Note Off. Hold a key and release it to trigger the instrument.','Set Release Velocity, Decay Time and Key Scale to change the note produced by that release.'],[['Latch','Changes when release-triggered notes are held and replaced; the fixed-length controls are disabled.']])
  ]);
  add(M,'velocity',[
    a('reshape','Raise / compress','velocity','Reshape note velocity before it reaches the instrument.', ['Adjust the output range and the response curve while playing softly and strongly.','Compare the operation modes to process note-on, note-off or both kinds of velocity.'],[['Velocity','Can change timbre as well as loudness, depending on the instrument.']]),
    a('range','Limit / vary','velocity','Constrain or randomize incoming dynamics.', ['Set the input range and choose how out-of-range values are handled.','Raise Random gradually and compare repeated notes. Turn it back to zero for consistent output.'])
  ]);
  add(M,'random',[
    a('chance','Scatter pitches','random','Change some incoming notes by a bounded interval.', ['Set Chance, Choices and Interval. Choose Add, Sub or Bi for the direction.','For occasional octave jumps, use one Choice and an Interval of 12, then raise Chance.'],[['Use Current Scale','Constrains the output to the clip’s scale.']]),
    a('cycle','Cycle pitches','random','Alternate through a fixed set instead of choosing randomly.', ['Choose Alt mode and set Chance to 100%.','Repeat one incoming note and adjust Choices and Interval to set the cycle.'],[['Lower Chance','Allows more incoming notes to pass unchanged.']])
  ]);
  add(M,'scale',[
    a('map','Move a note mapping','scale','Choose which pitch class each input produces.', ['Choose a scale, or select User to edit the matrix yourself.','Find the input column and move its highlighted square to the desired output row. Click to remove a mapping and block that note.'],[['Use Current Scale','Takes root and scale from the clip instead of the device’s choosers.']]),
    a('range','Transpose / restrict','scale','Apply the mapping only where it is needed.', ['Set Lowest and Range to limit the notes affected.','Move Transpose to shift the affected notes. In User mode, compare Fold for mappings more than six semitones away.'],[['Outside the range','Notes pass without the scale remapping.']])
  ]);
  add(M,'cc-control',[
    a('send','Choose / send','cc-control','Send controller values to a receiving MIDI device.', ['Choose a CC number for a Custom control and name it for the destination parameter.','Move the control, or automate it in Live. Click Send to transmit the current values together.'],[['Fixed controls','Mod Wheel, Pitch Bend and Pressure have dedicated controls.'],['Custom A','Sends two states; useful for a sustain pedal or another on/off destination.']]),
    a('learn','Learn / keep','cc-control','Learn which messages an external controller sends.', ['Enable Learn, then send the controller message to a customizable control.','Disable Learn and check the resulting assignment. Save a device preset to reuse the names and assignments.'],[['Existing CC data','Controller automation already in the stream is merged, so conflicting messages can affect the result.']])
  ]);
})();
