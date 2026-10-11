// Authored action cards. The manual supplies the technical reference, not the
// navigation or prose. A card is the last disclosure level.
const deviceActions=(()=>{
  const I='live-instrument-reference',A='live-audio-effect-reference',M='live-midi-effect-reference',R='instrument-drum-and-effect-racks',D='working-with-instruments-and-effects',X='max-for-live-devices',F='max-for-live';
  const catalog=[];
  const act=(slug,label,anchors,body,steps,terms=[],note='')=>({slug,label,anchors:anchors.split(' ').filter(Boolean),body,steps,terms,note});
  const add=(chapter,anchor,items,extra={})=>catalog.push({chapter,anchor,items,...extra});
  add(D,'device-view',[
    act('load','Load','device-view using-devices working-with-instruments-and-effects','Put a device on the selected track.',[
      'Press {search}, type the device’s name, select a result and press Enter. Or drag the result to the track’s Device View.',
      'Place MIDI effects before the instrument; place audio effects after it. An audio track takes audio effects, not a MIDI instrument.'
    ],[['MIDI → audio','The instrument turns incoming notes into sound.'],['Left → right','Each device receives the output of the one before it.'],['A sample','Dropping a sample into a MIDI track’s empty Device View loads it in Simpler.']]),
    act('move','Move / copy','using-devices','Rearrange the chain by its title bars.',[
      'Drag a device’s title bar left or right. Drop at the insertion line, or onto another track to move it there.',
      'Select a title bar and copy, cut or duplicate it. Paste before a selected device, or select the empty end of the chain to append.',
      'Select several device titles to move them together. Delete removes the selected devices; Undo restores them.'
    ],[['Order','A filter before a distortion changes what enters it; a filter after it changes what comes out.']]),
    act('bypass','Switch off / fold','device-title-bar','Bypass the sound processing, or just put the panel away.',[
      'Click the round Device Activator in the title bar to switch processing off or on.',
      'Double-click the title bar to fold the panel. Double-click it again to unfold.'
    ],[['Fold','Only changes the view. The device still processes sound.'],['Bypass','Compare at similar output levels; a louder setting can hide what actually changed.']]),
    act('compare','Compare A / B','device-ab-comparison','Keep two settings inside one native Live device.',[
      'Open the device’s context menu and use Compare → Copy A to B before experimenting.',
      'Change the sound. Select the device and press P, or use Compare → Switch A/B, to switch settings.'
    ],[['Supported','Native devices; not Racks, Max for Live devices or plug-ins.'],['Save / copy','Only the currently selected state is saved or copied.']], 'Switching can disable parameter automation. Returning to the first state does not re-enable it; use Re-Enable Automation.')
  ],{id:'chain',label:'Device chain',aliases:['midi-effects','instrument','audio-effects']});
  add(D,'live-device-presets',[
    act('choose','Load / replace','live-device-presets hot-swapping-presets hot-swapping-samples','Swap a sound without rebuilding the track.',[
      'Open a device’s preset folder in the Browser. Use arrows to select a preset and Enter to load it.',
      'Select a device and press Q to hot-swap. Choose a compatible result and press Enter; press Q or Escape to leave.',
      'Use the hot-swap button in a sample display to replace only that sample. The title-bar button replaces the device or its preset.'
    ]),
    act('save','Save','saving-presets','Keep this device’s settings as a reusable preset.',[
      'Click the disk button in the device title bar. Type a name in the Browser and press Enter.',
      'To choose a folder, drag the device title bar into a writable Browser folder. Keep samples with the preset when Live asks to collect them.'
    ],[['Rack preset','Stores the Rack’s devices, routing and mappings together.'],['Live Set','Saving a Set stores its device settings too; a preset makes them reusable elsewhere.']]),
    act('default','Set defaults','default-presets','Choose the starting settings for future devices and tracks.',[
      'Adjust a device, open its title-bar context menu and choose Save as Default Preset.',
      'For a whole starting chain, use Save as Default Audio Track or Save as Default MIDI Track from the track context menu.'
    ],[['Existing devices','Do not change when a new default is saved.'],['Sample drops','User Library → Defaults can store separate starting setups for samples dropped into Device View or Drum Rack pads.'],['Slicing / conversion','The Defaults folders also hold custom slicing and Audio-to-MIDI setups.'],['Plug-ins','A default stores the configured parameter selection, not a new default set of plug-in parameter values.']])
  ],{id:'da-presets',label:'Presets'});
  add(D,'using-plug-ins',[
    act('load','Load / open','using-plug-ins plug-ins-in-the-device-view showing-plug-in-panels-in-separate-windows vst-plug-ins the-vst-plug-in-folder audio-units-plug-ins','Use an installed instrument or effect through Live’s device chain.',[
      'Enable its format and folder in Settings → Plug-Ins. Rescan if a newly installed plug-in is missing.',
      'Find it in the Browser and load it like a Live device. Click its window button to open the plug-in’s own panel.'
    ],[['Formats','VST2 and VST3; Audio Units on macOS. The plug-in must be compatible with the installed Live version and operating system.'],['Windows','Cmd + Option + P / Ctrl + Alt + P hides or shows plug-in windows that have already been opened.']]),
    act('configure','Expose controls','plug-in-configure-mode','Bring a plug-in parameter into Live for automation or mapping.',[
      'Unfold the plug-in device and turn Configure on. Click or move the required parameter in the plug-in’s own window.',
      'Turn Configure off. Adjust the exposed control in Live, automate it, or map it to a Rack Macro.'
    ],[['X / Y','Choose two exposed parameters for the device’s X/Y pad.'],['Not appearing','The plug-in may not expose that parameter to its host.']], 'Deleting a configured parameter can also remove its automation and mappings.'),
    act('sidechain','Feed a sidechain','sidechain-parameters','Give a compatible plug-in a separate detector signal.',[
      'Show Live’s sidechain section for the plug-in. Choose the source track and the point to tap its signal.',
      'Set the sidechain Gain and Mix. Enable the plug-in’s own external-sidechain mode if it requires one.'
    ],[['Detector','Usually controls processing without becoming an audible input.'],['Routing','Avoid feeding the plug-in’s output back into its own input.']]),
    act('keep','Keep / recall','vst-presets-and-banks','Store the setup in a Set or Rack.',[
      'Save the Set to retain the current plug-in state.',
      'Group the plug-in in a Rack and save a Rack preset to reuse the plug-in, exposed controls and Macro mappings together.'
    ],[['Preset browser','Some plug-ins use their own preset managers; older VST devices may expose programs and banks to Live.'],['Other computers','A Set does not include the plug-in installation or its license.']]),
    act('delay','Align / monitor','device-delay-compensation','Keep latency-producing device paths in time.',[
      'Leave Delay Compensation enabled for normal playback.',
      'When playing through Live, compare Reduced Latency When Monitoring. It can reduce the wait on monitored tracks, but their timing can differ from compensated paths.'
    ],[['Audio buffer','Reducing the buffer can reduce monitoring delay but raises processing demands.'],['Recording','Latency compensation does not remove the physical delay of listening through hardware and software.']])
  ],{id:'da-plugins',label:'Plug-ins'});

  add(I,'simpler',[
    act('play','Load / play','simpler playback-modes classic-playback-mode one-shot-playback-mode','Play a sample from the keyboard.',[
      'Drop a sample onto the waveform. Play notes through this MIDI track.',
      'Choose Classic for a sustained, polyphonic instrument, or One-Shot for a single hit.',
      'In One-Shot, compare Trigger with Gate: Trigger runs through the sample; Gate starts the fade-out when you release the key.'
    ],[['Sample / Controls','Switch between the waveform and the sound-shaping controls.'],['Pitch','Without Warp, higher notes play the sample faster as well as higher.']]),
    act('loop','Trim / loop','classic-playback-mode','Set the part of the recording each note plays.',[
      'Drag the sample’s start and end flags around the region you want.',
      'In Classic mode, adjust Start and Length within that region. Enable Loop and set the repeating portion.',
      'Use Snap to find a zero crossing. With Warp off, raise Fade to soften the loop seam.'
    ],[['Gain','Changes the sample level before filtering. Volume changes the output.'],['Loop','Repeats while the amplitude envelope remains open; it is not the MIDI clip’s loop.']]),
    act('slice','Slice','slicing-playback-mode','Put different pieces of one recording on different keys.',[
      'Choose Slice. Pick Transient, Beat or Region to place boundaries automatically, or Manual to place them yourself.',
      'Double-click to add or remove a marker; drag a marker to move the boundary.',
      'Play the mapped notes. Choose Mono to cut off the previous slice, Poly to overlap, or Thru to continue from a slice through the remaining sample.'
    ],[['Sensitivity','In Transient mode, changes how many attacks become boundaries.'],['Slices','The file stays intact; boundaries change playback.']]),
    act('warp','Stretch','warp-controls','Keep duration tied to tempo while changing pitch.',[
      'Enable Warp. Check the inferred beat length with Warp As, then halve or double it if needed.',
      'Choose a Warp mode suited to the sample and listen while changing tempo or playing other notes.'
    ],[['Warp off','Pitch and playback speed change together.'],['Warp on','Duration follows tempo independently of played pitch.'],['Complex modes','Can cost more processing; compare the sound as well as CPU load.']]),
    act('shape','Filter / shape','filter-1 envelopes-2','Shape the brightness and the beginning and end of each note.',[
      'Enable the filter; choose a type and move Frequency. Raise Resonance to emphasize its cutoff.',
      'Adjust the amplitude envelope’s Attack and Release while holding and releasing a note.',
      'Give the filter or pitch envelope a nonzero Amount, then adjust its times to hear the movement.'
    ],[['Sustain','A level held while the note is held—not a time.'],['Drive','Available on modeled filter circuits; changes the sound entering the filter.']]),
    act('move','Modulate / tune','lfo global-parameters-1 context-menu-options-for-simpler strategies-for-saving-cpu-power-1','Add movement and set how notes overlap.',[
      'Choose an LFO waveform and Rate, then raise its amount for Pitch, Pan, Volume or Filter.',
      'Set Voices and Retrig to control overlapping notes. Compare Glide with Portamento for sliding pitches.',
      'Use Transpose for semitones and Detune for smaller offsets. Lower Volume when layering voices or widening with Spread.'
    ],[['Retriggered LFO','Restarts its cycle for each note.'],['Crop / reverse','Available in the sample context menu; Live creates derived sample files.'],['Convert to Sampler','Available in the context menu, but does not preserve every Simpler Warp or Slice behavior.']])
  ]);
  add(I,'sampler',[
    act('load','Load / layer','sampler getting-started-with-sampler multisampling title-bar-options samplers-tabs the-sample-layer-list importing-third-party-multisamples','Build an instrument from one or several recordings.',[
      'Drop samples into Sampler. Open Zone to see the sample layer list.',
      'Select a layer before editing its Sample settings. Check its zones to see which notes reach it.',
      'Set each sample’s root note so the keyboard can transpose it from the recorded pitch.'
    ],[['Multisample','Several recordings can cover different keys, velocities or articulations.'],['Import','Supported third-party multisamples can be imported through the Browser; the resulting preset may contain several Samplers in a Rack.']]),
    act('zone','Split / crossfade','the-zone-tab key-zones velocity-zones sample-select-zones round-robin-sample-playback','Choose which sample responds to a note.',[
      'In Zone, select Key or Vel. Drag a zone’s edges to limit its key or velocity range; drag the upper fade handles to blend overlapping layers.',
      'Use Sel zones and Sample Selector to switch among articulations with a control.',
      'Enable round robin for matching layers to alternate samples; choose the ordering and reset interval.'
    ],[['Auto Select','Follows the layers reached by played notes.'],['Sample Selector','Chooses samples at note-on; moving it does not replace an already sounding sample.'],['Root note','Changes the sample’s pitch reference, not its zone boundaries.']]),
    act('loop','Trim / sustain','the-sample-tab sample-playback','Give a sample separate behavior while held and after release.',[
      'Choose the layer and set Sample Start and End.',
      'Set a sustain loop and its direction. Adjust loop boundaries and crossfade while holding a note.',
      'Set the release behavior and release loop if needed; test by releasing the key rather than only holding it.'
    ],[['Link','Ties loop start to sample start.'],['RAM','Loads sample data into memory; large multisamples can consume substantial RAM.'],['Interpolation','Trades processing cost against playback quality.']]),
    act('pitch','Bend / modulate pitch','the-pitchosc-tab the-modulation-oscillator-osc the-pitch-envelope','Change pitch directly or move it with an envelope or oscillator.',[
      'Use Transpose and Detune for fixed offsets. Raise Pitch Envelope Amount to hear the envelope’s pitch contour.',
      'Enable the modulation oscillator and compare FM with AM. Start with a small amount, then change the oscillator ratio or fixed frequency.'
    ],[['Modulation oscillator','Changes the sample; it is not a separate audible layer.'],['Zone Shift','Changes which mapped sample is used while preserving the played pitch.'],['Spread','Uses extra voices for width.']]),
    act('shape','Filter / envelope','the-filterglobal-tab the-filter the-volume-envelope-and-global-controls','Shape each voice after sample playback.',[
      'Choose a filter type, move Frequency and set its envelope Amount.',
      'Adjust the amplitude envelope while playing held and released notes. Set the voice count and retrigger behavior.',
      'Enable the Shaper and compare its position before or after the filter.'
    ],[['Global Time','Scales envelope times together.'],['Key scaling','Lets higher and lower notes use different envelope times.']]),
    act('map','Move / respond','the-modulation-tab the-auxiliary-envelope lfos-1-2-and-3 the-midi-tab','Connect envelopes, repeating motion or playing gestures to sound controls.',[
      'Choose an auxiliary-envelope or LFO destination and give it a small amount. Set its time or rate.',
      'In MIDI, choose destinations for Velocity, Aftertouch, Mod Wheel or other incoming controls.',
      'Play softly and strongly, or move the selected controller, to check both ends of the range.'
    ],[['Two destinations','Many sources can move two parameters with separate amounts.'],['Stereo LFOs','LFOs 2 and 3 include phase/spin behavior for different left and right motion.']])
  ]);
  add(I,'drift',[
    act('mix','Mix sources','drift subtractive-synthesis oscillator-section oscillator-1 oscillator-2 waveform-display oscillator-mixer','Blend oscillators and noise before the filter.',[
      'Turn down Oscillator 2 and Noise to hear Oscillator 1 alone. Choose a waveform and move Shape.',
      'Raise Oscillator 2; change its octave or Detune. Add Noise as a separate layer.'
    ],[['Drift','Introduces variation between voices rather than a fixed pitch offset.']]),
    act('filter','Filter','filter-section','Move the boundary between the frequencies that pass and those that are reduced.',[
      'Move the main filter’s Frequency while holding a note. Compare its two types.',
      'Raise Resonance cautiously and change the high-pass frequency to reduce the low end.'
    ],[['Source routing','Check which oscillator and noise sources are routed through the filter.']]),
    act('shape','Shape / release','envelopes-section envelope-1 envelope-2','Set the shape of each note and its modulation.',[
      'Adjust Envelope 1’s Attack, Sustain and Release; play a held note, then let go.',
      'Assign Envelope 2 to a destination with a nonzero amount. Compare its ordinary envelope behavior with Cycling.'
    ],[['Envelope 1','Shapes amplitude and can also serve as a modulation source.'],['Envelope 2','Can repeat its contour in Cycling mode.']]),
    act('modulate','Connect / move','pitch-mod lfo-section mod-section','Send a source of movement to a sound control.',[
      'Choose a destination in the modulation section, choose its source, then raise the amount from zero.',
      'For repeating movement, set the LFO waveform and Rate. For played movement, choose Velocity, Pressure or another controller.'
    ],[['Bipolar amount','Negative values reverse the direction.'],['Pitch Mod','Has separate pitch destinations and amounts for the oscillators.']]),
    act('voices','Stack / glide','global-section','Set how Drift responds to overlapping notes.',[
      'Compare Mono and Poly. Use the voice mode and voice count to change how notes are allocated.',
      'Raise Glide and play overlapping pitches. Adjust Volume after adding layers or voices.'
    ],[['Stereo / unison behavior','Changes the relationship between voices; listen in mono as well as stereo.']])
  ]);
  add(I,'wavetable',[
    act('scan','Choose / scan','wavetable wavetable-synthesis oscillators-2 sub-oscillator','Move through a table of wave shapes.',[
      'Select Oscillator 1’s category and wavetable. Drag Position through the displayed waves while holding a note.',
      'Enable Oscillator 2 and blend its level. Add the Sub oscillator for a separate low layer.',
      'Choose an oscillator effect and move its controls to reshape the selected wave.'
    ],[['Imported audio','Drop audio into the oscillator display to create a wavetable.'],['Pitch','Semitone and cent offsets tune the oscillator; Position changes its spectrum.']]),
    act('filter','Route / filter','filters-2','Send the oscillators through two filters.',[
      'Enable a filter, choose its type and move Frequency and Resonance.',
      'Compare the filter routing options. In serial routing, the second filter processes the first filter’s output.'
    ],[['Parallel','Splits processing between the filters before mixing.'],['Drive','Available with modeled circuits.']]),
    act('shape','Shape / repeat','mod-sources-tab lfos-1','Set note envelopes and repeating movement.',[
      'Edit the Amp envelope’s points; release the key to hear the release stage.',
      'Set Envelope 2 or 3, or an LFO’s shape and rate, then assign it in the Matrix.'
    ],[['No movement','An unused modulation source does not change a sound parameter by itself.']]),
    act('map','Connect','matrix-tab-1 midi-tab','Join a modulation source to a parameter.',[
      'Click a sound parameter to make its row appear in the Matrix.',
      'Drag the cell beneath the desired source up or down. Use MIDI sources for velocity, wheel or other playing controls.'
    ],[['Amount','Zero disconnects the movement; a negative amount reverses it.']]),
    act('voices','Stack / spread','global-and-unison-controls hi-quality-mode','Thicken each played note or keep the voice count low.',[
      'Choose a Unison mode, raise its voice count and adjust Amount.',
      'Compare Mono and Poly, adjust Glide, and match the output level.',
      'If CPU use is high, reduce Unison voices or compare the Hi-Quality setting in the context menu.'
    ])
  ]);
  add(I,'operator',[
    act('connect','Connect oscillators','operator general-overview-1 oscillator-section-1 global-shell-and-display','Choose which oscillators you hear and which modulate others.',[
      'Select an algorithm in the global display. Start with one audible oscillator and a low output level.',
      'Raise the level of an oscillator feeding another oscillator. Its level now changes modulation depth rather than simply adding another audible layer.'
    ],[['Algorithm','The small diagram shows the oscillator connections.'],['Ratio / Fixed','Tune relative to played notes, or set an oscillator to a fixed frequency.']]),
    act('wave','Draw / tune','built-in-waveforms user-waveforms more-oscillator-parameters aliasing oscillators-a-d-shell-and-display','Choose a wave or draw its harmonics.',[
      'Select oscillator A–D, choose a waveform and adjust Coarse and Fine.',
      'Open its harmonic editor and draw partial levels for a custom wave.',
      'Compare Feedback and phase/retrigger settings, then test both high and low notes.'
    ],[['Aliasing','Bright waves and strong modulation can produce extra frequencies at high pitches.']]),
    act('shape','Shape each stage','envelopes-1 envelope-display pitch-shell-and-display','Give the carriers and modulators different time shapes.',[
      'Select an oscillator and adjust its envelope. A carrier’s envelope changes level; a modulator’s envelope changes timbre.',
      'Set a pitch-envelope amount and edit the pitch envelope to add a bend at the start or end.'
    ],[['Loop modes','Can repeat envelope segments instead of making a single contour.']]),
    act('filter','Filter / move','filter-section-2 filter-shell-and-display lfo-section-1 lfo-shell-and-display modulation-targets','Filter the combined sound and add modulation.',[
      'Enable the filter, choose its type and move Frequency. Add filter-envelope amount to hear its contour.',
      'Enable the LFO, choose its destinations and set Rate and Amount.'
    ]),
    act('voices','Glide / spread','global-controls-2 glide-and-spread strategies-for-saving-cpu-power finally the-complete-parameter-list context-menu-options-for-operator','Set voice behavior and output.',[
      'Set the available voices and compare Retrigger behavior while playing overlapping notes.',
      'Raise Glide for pitch slides or Spread for width. Match the output with Volume.',
      'Reduce unused oscillators, voices or quality settings when processing becomes heavy.'
    ],[['Parameter reference','The manual lists the remaining per-section controls and modulation targets in detail.']])
  ]);
  add(I,'analog',[
    act('mix','Mix / route','analog architecture-and-interface oscillators noise-generator','Mix two oscillators and noise into two filter paths.',[
      'Enable one oscillator, select a wave and tune its octave or semitone offset.',
      'Blend the second oscillator and Noise. Adjust each source’s routing balance between Filter 1 and Filter 2.'
    ],[['Routing','The two filter/amplifier paths can receive different mixtures of the sources.']]),
    act('filter','Filter / amplify','filters amplifiers','Shape and position the two signal paths.',[
      'Select a filter, choose its type and move Frequency and Resonance.',
      'Select an amplifier to adjust its level and pan. Balance the two paths while listening to their combined output.'
    ]),
    act('shape','Shape / cycle','envelopes lfos','Change a note over time.',[
      'Click a filter or amplifier to expose its envelope. Adjust Attack, Sustain and Release.',
      'Enable an LFO, choose its rate and waveform, then raise its amount at a destination.'
    ],[['Envelope loops','Repeat portions of the envelope.'],['LFO sync','Locks movement to the Set tempo instead of a free-running frequency.']]),
    act('respond','Glide / respond','global-parameters mpe-sources','Set voice behavior and playing expression.',[
      'Choose the voice and unison settings, then adjust Glide while playing overlapping notes.',
      'Open MPE sources and assign pressure, slide or per-note bend to supported destinations.'
    ])
  ]);
  add(I,'electric',[
    act('strike','Strike / damp','electric architecture-and-interface-2 hammer-section fork-section damper-parameters','Change the modeled hammer, tine and tone bar.',[
      'Play the same note repeatedly while adjusting hammer Stiffness and Force.',
      'Balance the tine and tone-bar contributions in Fork. Adjust their decay.',
      'Adjust the damper and release the keys to hear what happens when the note ends.'
    ]),
    act('pickup','Move the pickup','damperpickup-section pickup-parameters','Change where the vibrating model is picked up.',[
      'Move the pickup position while playing the same phrase.',
      'Adjust its distance or symmetry controls and match the output level before comparing.'
    ],[['Pickup','Changes the captured tone, not the piano notes.']]),
    act('voices','Tune / bend','global-section-2','Set tuning, polyphony and pitch-bend response.',[
      'Use Semi and Detune for coarse and fine tuning. Move Stretch to compare equal temperament with stretched tuning.',
      'Set Voices while checking the decay of sustained chords. Set Pitch Bend and Note PB for global and per-note bend ranges.',
      'Use Volume to match the output level.'
    ],[['Stretch','Positive values sharpen upper notes and flatten lower notes. It changes tuning across the keyboard, not duration.']])
  ]);
  add(I,'collision',[
    act('excite','Strike / sustain','collision architecture-and-interface-1 mallet-section noise-section','Excite a modeled object with a hit, noise, or both.',[
      'Listen to the Mallet by itself; adjust its stiffness, noise and level.',
      'Enable Noise and shape its envelope to feed a longer excitation into the resonators.'
    ]),
    act('resonate','Tune / resize','resonator-tabs tuning-section mixer-section the-global-section sound-design-tips','Choose the objects that ring after the excitation.',[
      'Choose a model for Resonator 1, then adjust its tuning, material and decay controls.',
      'Enable Resonator 2 and compare the available coupling/routing choices.',
      'Balance the resonators’ levels and pan; match the overall output.'
    ],[['Coupling','One resonator can excite another instead of simply being layered with it.']]),
    act('move','Modulate / respond','lfo-tab midimpe-tab','Move the physical model with an LFO or a playing gesture.',[
      'Choose an LFO destination and raise its amount from zero. Set Rate and waveform.',
      'Assign Velocity, wheel or MPE sources in MIDI/MPE, then play the gesture that drives the destination.'
    ])
  ]);
  add(I,'drum-sampler',[
    act('trim','Load / trim','drum-sampler sample-controls-section','Place a single hit and choose what plays.',[
      'Drop a sample on the waveform. Move Start and Length; hold Shift while moving Start for finer adjustment.',
      'Set Attack, Hold and Decay. Compare Trigger with Gate by releasing a note early.',
      'Use Transpose, Detune and sample Gain to tune and balance the hit.'
    ],[['Trigger','Plays through the Hold time after key release.'],['Gate','Release starts the Decay; Hold is unavailable.'],['Swap','The waveform’s hot-swap button replaces the sample; the title-bar button replaces the device.']]),
    act('bend','Stretch / reshape','playback-effects-section','Apply one playback effect to the sample.',[
      'Enable Playback Effect and select a type. Drag the X/Y pad or use its two controls.',
      'Compare Stretch, Loop or Pitch Env for timing and pitch changes; compare FM, Ring Mod, 8-Bit or Punch for texture.',
      'Use Sub Osc or Noise to layer an extra source under the sample.'
    ],[['X/Y','Vertical motion changes the first parameter; horizontal motion changes the second.'],['Pitch tracking','Several effect times and frequencies follow the played note and global transposition.']]),
    act('shape','Filter / respond','filter-section-1 global-section-1 context-menu-options-for-drum-sampler','Set the tone, output and response to playing.',[
      'Enable the filter; choose low-pass, high-pass or peak and adjust Frequency.',
      'Set Velocity to Volume. Choose Velocity or Slide as a modulation source and assign its destination and amount.',
      'Adjust output Volume and Pan. In a Drum Rack, use Save as Default Pad if this should be the starting device for new samples.'
    ],[['Envelope Follows Pitch','Context-menu option that scales the envelope with sample pitch.']])
  ]);
  add(I,'impulse',[
    act('load','Drop / trigger','impulse sample-slots start-transpose-and-stretch','Put up to eight samples on eight note triggers.',[
      'Drag a sample into a slot and click it to show that slot’s controls.',
      'Play its note. Adjust Start, Transpose and Stretch; repeat for the other slots.'
    ],[['Eight slots','Each keeps its own sample and processing settings.']]),
    act('shape','Filter / shorten','filter saturator-and-envelope pan-and-volume global-controls','Shape a selected hit without changing the other slots.',[
      'Select a slot, enable its filter and adjust Frequency and Resonance.',
      'Adjust Saturation and the envelope decay. Compare Trigger and Gate with short and held notes.',
      'Set the slot’s Pan and Volume, then use the global controls to adjust the whole instrument.'
    ]),
    act('route','Separate outputs','individual-outputs','Process one slot on its own audio track.',[
      'Create an audio track and choose the Impulse track under Audio From.',
      'Choose the required Impulse output in the lower chooser. Set monitoring so that track can pass the signal.'
    ],[['Routing','Check whether the selected slot still reaches the main Impulse mix, so the same hit is not unintentionally doubled.']])
  ]);
  add(I,'external-instrument',[
    act('connect','Send / return','external-instrument','Send notes to hardware and bring its audio back into the chain.',[
      'Connect the instrument’s MIDI input and audio output to the computer’s interfaces. Keep the return level low while setting up.',
      'Choose MIDI To and its channel, then choose the instrument’s return under Audio From.',
      'Play a note and set return Gain. Route the track to a listening output, not back to the same hardware input.'
    ],[['Instrument required','This device routes signals; it does not create a hardware sound on its own.']]),
    act('align','Align / record','external-instrument','Account for the hardware round trip.',[
      'With the hardware routed, compare a recorded hit against the timing reference. Adjust Hardware Latency to compensate for the remaining offset.',
      'Record the return onto an audio track when you need an audio copy that can play without the hardware.'
    ],[['Hardware state','Save the hardware preset separately if it is not recalled by MIDI program messages.']])
  ]);
  add(I,'meld',[
    act('mix','Choose / blend','meld general-overview oscillators-1 oscillator-macros mix-section','Blend two engines, each with its own oscillator and filter.',[
      'Turn off Engine B while choosing Engine A’s oscillator type. Move its two macros while holding a note.',
      'Enable B, choose a contrasting oscillator and balance the two engine volumes and pans.',
      'Use each engine’s Tone control to reduce lows in one direction or highs in the other.'
    ],[['Oscillator macros','Their jobs change with the oscillator type; read the labels after switching types.']]),
    act('filter','Filter','filters-1','Shape each engine separately.',[
      'Choose Filter A’s type and move Frequency. Adjust the two filter macros shown for that type.',
      'Repeat for B. Switch a filter off to compare without switching off its engine.'
    ],[['Beyond low-pass','The menu also includes formant, comb, resonator and reduction models.'],['Scale awareness','Supported oscillator/filter types can follow the selected scale.']]),
    act('shape','Shape / repeat','envelopes-tab lfos-tab','Draw envelopes and set repeating modulation.',[
      'Drag the amplitude-envelope points to set Attack, Decay, Sustain and Release. Drag the diamonds to change the curves.',
      'Choose a loop mode for a repeated envelope, or set an LFO’s shape and rate.',
      'Assign the modulation in Matrix; an LFO needs a destination to change the sound.'
    ],[['Link Envelopes','Links the corresponding envelopes across engines.'],['LFO 1 FX','Two serial effects can reshape LFO 1 before it reaches the matrix.']]),
    act('map','Connect / cross-modulate','matrix-tab midi-and-mpe-tabs','Connect a source to a destination through a matrix cell.',[
      'Click a parameter to add its row to the selected engine’s Matrix. Drag the cell beneath a source up or down.',
      'Use MIDI/MPE tabs for velocity, pressure, slide and bend. Play that gesture to check the range.',
      'Expand Meld to see both engines’ sources and destinations, including cross-engine modulation.'
    ],[['Zero','Removes the modulation amount.'],['Spread source','Does nothing until it is assigned to a destination.']]),
    act('voices','Glide / stack','settings-tab global-controls-1','Set key tracking, voice allocation and note transitions.',[
      'Choose Mono or Poly. In Mono, compare Legato to hear whether overlapping notes restart the envelope.',
      'In Settings, set Glide Time and choose continuous Portamento or stepped Glissando.',
      'Raise Stacked Voices and assign Spread to a destination for differences between copies. Adjust Drive, Limit and Volume afterward.'
    ],[['CPU','Stacked voices duplicate both engines and their processing.'],['Key tracking off','Makes an oscillator play a fixed pitch rather than follow each note.']])
  ]);
  add(I,'tension',[
    act('excite','Pluck / bow / strike','tension architecture-and-interface-3 string-tab the-exciter-section exciter-types exciter-parameters','Choose how the modeled string starts vibrating.',[
      'Choose an exciter type, then play repeated and held notes.',
      'Adjust the exciter’s position, force and available physical controls. Compare at a similar output level.'
    ],[['Exciter type','Changes the available controls as well as the sound.']]),
    act('damp','Damp / pick up','the-damper-section the-termination-section the-pickup-section','Change the string’s boundaries and where it is heard.',[
      'Move the damper position and change its physical settings; release the key to hear the effect.',
      'Change the string termination, then move the pickup position along the string.'
    ],[['Pickup','Samples a different point on the vibration; it does not move the MIDI note.']]),
    act('shape','Filter / shape','filterglobal-tab sound-design-tips-1','Shape the model’s output and response.',[
      'Open Filter/Global, enable the filter and adjust Frequency and its envelope.',
      'Set voice, envelope and modulation controls while testing both short and sustained notes.',
      'Match the output Volume when comparing physical-model settings.'
    ])
  ]);
  return {catalog,act,add,I,A,M,R,D,X,F};
})();
