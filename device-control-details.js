// Control-level repairs from a source-to-card review (2026-09-22).
// Each block belongs to an existing action, with its exact manual section.
// This is not a claim that the rest of the device reference has been reviewed.
const deviceControlDetails=(()=>{
  const chapter='live-audio-effect-reference',blocks=[];
  const add=(device,action,anchor,terms,note='',sourceChapter=chapter)=>blocks.push({device,action,key:sourceChapter+'#'+anchor,terms,note});
  add('saturator','drive','saturator',[
    ['Curve Type','Analog Clip bends into clipping; Digital Clip cuts off sharply. Soft Sine, Medium Curve and Hard Curve give different nonlinear responses. Sinoid Fold folds the signal back on itself. Bass Shaper targets heavily driven lows; Waveshaper exposes a custom curve.'],
    ['Bass Shaper Threshold','Moves the onset of clipping from 0 to −50 dB. Lower values soften the transition; pair with Drive to bring the signal into that part of the curve.'],
    ['Drive / Output','Drive changes the signal before shaping. Output sets the level after processing; match it when comparing curves.'],
    ['Post Clip Mode','Soft Clip or Hard Clip catches the processed output at the Output setting. Soft Clip uses an additional Analog Clip stage. This is separate from the main Curve Type.'],
    ['Color','Applies an EQ before the shaper and its inverse afterward. This changes which frequencies are distorted, rather than simply adding an output EQ.'],
    ['Amt Lo / Amt Hi','Negative amounts reduce saturation in the affected region; positive amounts increase it. Frequency centers the high color region; Width sets its span.'],
    ['Color Curve','Expand the device to see the curve. Drag the first handle for Amt Lo and the second for Frequency / Amt Hi.'],
    ['Dry/Wet','Blends original and processed audio. A return used only for the effect normally needs 100% wet.']
  ],'The current manual uses Post Clip Mode and the expanded Color controls; earlier releases have a different panel.');
  add('saturator','curve','saturators-waveshaper-controls',[
    ['Drive (%)','Sets how strongly these six Waveshaper controls alter its curve. At 0% their contribution disappears. This is not the input Drive gain.'],
    ['Curve','Introduces mainly third-order harmonics.'],
    ['Depth','Sets the amplitude of ripples superimposed on the transfer curve. Zero removes those ripples.'],
    ['Period','Changes the density of those ripples; hear it with Depth above zero.'],
    ['Linear','Changes the curve’s linear region together with Curve and Depth.'],
    ['Damp','Flattens the waveform near its center, producing gate-like behavior on very small signal values.']
  ]);
  add('saturator','drive','context-menu-options-for-saturator',[
    ['Hi-Quality','Reduces aliasing at some additional CPU cost.'],
    ['Pre-DC Filter','Removes DC offset before the shaping stage.']
  ]);
  add('compressor','reduce','compressor',[
    ['Threshold / Ratio','Threshold sets the reference level. At 3:1, an extra 3 dB above it produces an extra 1 dB at the output. At 1:1 there is no compression.'],
    ['Knee','Zero makes an abrupt transition at Threshold. A wider knee begins compression below the threshold and reaches the full ratio above it.'],
    ['Attack / Release / Auto','Attack sets how quickly reduction builds; Release sets recovery. Auto adapts release to the incoming signal. Very short times can reshape transients or create distortion.'],
    ['Lookahead','0, 1 or 10 ms. Delaying the audio gives the detector time to react; the delay also adds latency.'],
    ['Peak / RMS / Expand','Peak follows short peaks; RMS follows sustained energy more closely. Expand increases differences above Threshold instead of compressing them.'],
    ['Lin / Log','Lin follows the set timing directly. Log releases strongly compressed peaks faster than less-compressed material. Unfold the display to see this switch.'],
    ['Out / Makeup','Out is manual output gain. Makeup compensates for Threshold and Ratio changes, but is unavailable with an external sidechain.'],
    ['Dry/Wet','Mixes compressed and original audio for parallel compression.'],
    ['Display','Collapsed shows essentials; Transfer Curve plots input against output. Activity plots change over time, with GR or Output traces. The orange gain-reduction meter shows attenuation, not output loudness.']
  ]);
  add('compressor','duck','sidechain-parameters-1',[
    ['External source / tap point','Choose the track and the stage of that track which should trigger compression. The device stays on the track whose level must change.'],
    ['Sidechain Gain / Dry/Wet','Gain changes detector sensitivity, not the audible source level. Sidechain Dry/Wet blends external and internal detector signals; it is separate from the output Dry/Wet.'],
    ['Sidechain EQ','Restricts what the detector hears. It can filter either the internal or external trigger without equalizing the audible output.'],
    ['Listen','Replaces the processed output with the detector signal temporarily. Turn it off after checking the source and filter.']
  ]);
  add('eq-eight','move','eq-eight',[
    ['Filter shapes','Low cut and high cut offer 12 or 48 dB/octave slopes. Low shelf, peak, notch and high shelf cover the other shapes. Low cut, notch and high cut have no Gain adjustment.'],
    ['Freq / Gain / Q','Select the band number, then drag its point or type values below the dials. For cuts and notch, dragging vertically changes Q instead of Gain. Option-drag (Mac) / Alt-drag (Windows) adjusts Q.'],
    ['Several bands','Drag a rectangle around points to select them together, then drag or use the arrow keys. Disable unused bands with their activators.'],
    ['Adaptive Q','Narrows the response as boost or cut grows.'],
    ['Scale','Scales gain changes across bands that support Gain; it does not move cut or notch filters.'],
    ['Global Gain','Adjusts overall output independently of the individual bands.']
  ]);
  add('eq-eight','listen','eq-eight',[
    ['Stereo / L/R / M/S','Stereo uses one EQ curve for both channels. L/R separates left and right; M/S separates the shared and difference components. Choose the editable channel with Edit.'],
    ['Analyze','Shows the output spectrum behind the curves. Switch it off to hide the analyzer without disabling the EQ.'],
    ['Audition','Enable the headphones button, then hold a band’s point to hear its affected region.'],
    ['Expanded view','The title-bar expand button opens a larger graph while retaining the eight-band controls below.']
  ]);
  add('eq-eight','listen','context-menu-options-for-eq-eight',[
    ['Oversampling','Processes internally at twice the sample rate for smoother high-frequency filter behavior, using a little more CPU.']
  ]);
  add('eq-three','split','eq-three',[
    ['Gain / band switches','Each band ranges from full attenuation to +6 dB. Its switch mutes it independently of the gain setting.'],
    ['FreqLo / FreqHi','Set the two boundaries: low below FreqLo, middle between them, high above FreqHi.'],
    ['24 / 48 dB','Changes crossover steepness. 48 dB uses more processing and can color the signal even with all gains at zero.'],
    ['Signal LEDs','Light when a band has signal above −24 dB, including when that band is muted.']
  ]);
  add('utility','level','utility',[
    ['Gain','Runs from silence to +35 dB. Automate it here to keep the track fader available for mix adjustments.'],
    ['Mute placement','Placed before a delay or reverb, Utility’s Mute can stop new input while leaving the effect’s existing tail audible.'],
    ['DC','Filters DC offset and extremely low frequencies before subsequent processing.']
  ]);
  add('utility','width','utility',[
    ['Width / Mid-Side','Width at 0% sums to mono; above 100% emphasizes width. In Mid/Side mode, 100M isolates the mono sum and 100S isolates the side difference.'],
    ['Left / Right input','Selecting just one channel disables Width and Mid/Side: there is no stereo pair left to manipulate.'],
    ['Mono / Bass Mono','Mono sums the whole signal. Bass Mono sums only the low region below its 50–500 Hz cutoff.'],
    ['Bass Mono Audition','Solo the low region while setting the cutoff, then disengage Audition to hear the whole output.'],
    ['Balance / polarity','Balance changes channel balance. The separate left/right polarity switches flip signal sign; they do not shift timing.']
  ]);
  add('limiter','catch','limiter',[
    ['Ceiling / Gain Reduction','Ceiling sets the maximum output of this device. Gain Reduction shows how much is being removed to meet it.'],
    ['Release / Auto','Release controls recovery after peaks. Auto continuously chooses the recovery time and disables the manual Release knob.'],
    ['Lookahead','1.5, 3 or 6 ms. Longer times give more warning of a peak but add latency; shorter settings can distort bass more readily.'],
    ['Standard / Soft Clip / True Peak','Standard limits peaks. Soft Clip adds a nonlinear transition and indicates clipping with an LED. True Peak also controls reconstructed peaks between samples.']
  ]);
  add('limiter','maximize','limiter',[
    ['Maximize','Changes Ceiling into Threshold and Input Gain into Output. Lowering Threshold adds corresponding makeup gain; Output sets the destination level.'],
    ['L/R / M/S','L/R processes left and right channels. M/S encodes to mid/side before limiting and decodes afterward, adding latency.'],
    ['Link','100% shares gain reduction; 0% permits independent reduction. Intermediate values partially link the selected channel pair.']
  ],'Later processing and the Main fader can still raise the level. Check the final signal path, not only Limiter’s meter.');
  add('auto-filter','sweep','filter-types',[
    ['Low-pass / High-pass','Remove highs or lows beyond Freq. Both offer 12 and 24 dB/octave slopes.'],
    ['Band-pass / Notch','Keep or reject a region around Freq. Both offer 12 and 24 dB/octave slopes.'],
    ['Morph','Moves low-pass → band-pass → high-pass; offers 6, 12, 24 and 48 dB/octave slopes.'],
    ['DJ','Replaces Freq with a bipolar Control: negative filters highs, positive filters lows. Resonance increases toward the extremes.'],
    ['Comb','Repeats peaks or notches across the spectrum. Morph changes between the two.'],
    ['Notch + LP','Combines a notch with a low-pass. Morph moves the notch toward the cutoff; at 100% they coincide.'],
    ['Resampling','Lowers the resampling rate with Freq, introducing aliasing. Res is unavailable.'],
    ['Vowel','Pitch transposes the formants, Formant moves through vowel shapes, and Morph increasingly normalizes their gain.']
  ]);
  add('auto-filter','sweep','filter-display',[
    ['Drag the handle','Horizontal / vertical changes Freq / Res, or Pitch / Formant in Vowel mode. The display also shows left/right modulated curves and the output spectrum.'],
    ['LFO / Envelope selection','Selecting either modulation section reveals its additional controls along the bottom of the display.']
  ]);
  add('auto-filter','sweep','filter-drive-and-circuits',[
    ['Drive','Adds gain/nonlinear drive before filtering. Zero avoids that added drive.'],
    ['SVF / DFM','SVF starts clean and can distort with Drive. DFM feeds distortion back internally for a different response.'],
    ['MS2 / PRD','MS2 uses a Sallen-Key model with soft-clipped resonance. PRD uses a ladder model without explicit resonance limiting.'],
    ['Circuit scope','Circuit selection affects Low-pass, High-pass, Band-pass, Notch and Morph—not every filter type.']
  ]);
  add('auto-filter','sweep','global-controls',[
    ['Clip','Soft-clips output peaks; the adjacent LED indicates clipping.'],
    ['Output / Dry-Wet','Output adjusts processed level. Dry/Wet blends that result with the original signal.']
  ]);
  add('auto-filter','cycle','lfo-controls',[
    ['Amt / Rate / Mode','Amt sets movement depth. Mode selects Hertz, seconds, beat divisions or sixteenths. In seconds mode Rate is named Time.'],
    ['Wave / Morph','Choose Sine, Triangle, Saw, Square, Ramp Up, Ramp Down, Wander or S&H. Morph reshapes the waveform; S&H replaces it with Smooth.'],
    ['Phase / Spin','Phase offsets equal-rate left/right oscillators; 180° makes their extremes opposite. Spin detunes their rates. Zero matches both channels; Spin is unavailable for Wander and S&H.'],
    ['Phase Offset','Moves the start point of both oscillators together, only in tempo-synced modes.'],
    ['Quantization','Steps divides each cycle into held steps. S&H updates on the selected rhythmic interval. These are separate from choosing the S&H waveform.']
  ]);
  add('auto-filter','follow','envelope-follower-controls',[
    ['Envelope','Sets amount and direction: positive and negative values move the filter in opposite directions.'],
    ['Attack / Hold / Release','Attack follows rises; Release follows falls. Hold forces completion of the attack before release begins.'],
    ['Envelope S&H / Rate','Quantizes envelope updates to the selected beat interval.']
  ]);
  add('auto-filter','follow','sidechain-parameters',[
    ['External / source / tap point','Choose a separate trigger and its Pre FX, Post FX or Post Mixer signal.'],
    ['Mix / SC Gain','Mix blends internal and external triggers. SC Gain changes external detector sensitivity, not that track’s audible level.'],
    ['SC Filter','Filters the detector separately. Select its type, Frequency and Q; shelf or peak types also provide Gain.'],
    ['Listen','Temporarily hear the detector instead of the filter output; disengage it after checking the trigger.']
  ]);
  add('auto-filter','follow','mono-sidechain',[
    ['Mono Sidechain','On by default: both channels share the envelope movement. Disable it in the device context menu for separate stereo detection.']
  ]);
  function install({devices,manual}){
    for(const block of blocks){
      const area=devices.areas.find(a=>a.id===block.device)||devices.areas.find(a=>a.anchor===block.device||a.id==='da-'+block.device||a.home==='da-'+block.device);
      const item=area?.items.find(i=>i.slug===block.action);
      const node=manual.nodes.get(block.key);
      if(!item||!node)throw Error('Invalid reviewed control destination: '+block.device+'/'+block.action+' '+block.key);
      if(!item.sources.some(n=>n.key===node.key))item.sources.push(node);
      let section=(item.manualSections||=[]).find(s=>s.key===block.key);
      if(!section){section={key:block.key,label:node.title,url:node.url,images:[]};item.manualSections.push(section);}
      section.controls=block.terms;section.note=block.note;
    }
    const order=new Map([...manual.nodes.keys()].map((key,i)=>[key,i]));
    for(const area of devices.areas)for(const item of area.items)(item.manualSections||[]).sort((a,b)=>order.get(a.key)-order.get(b.key));
  }
  return {install,blocks,add};
})();
