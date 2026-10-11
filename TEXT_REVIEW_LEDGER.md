# Text review ledger

September 24–25, 2026 · Live 12 manual snapshot

Every change made in the text review, grouped by file, in the order it was made.
Each entry was checked against the cached manual section it cites. The untouched
pre-review copy is `../_snapshots/live-atlas-2026-09-24-pre-text-review/`; diff
against it to see the exact wording before and after.

159 entries across 21 files.

## `manual-file-guides.js`

- selection-options: exact chooser names, returns/MIDI tracks included, (single tracks), Render Start/Length
- rendering-options: added Convert to Mono, Create Analysis File, sample-rate two-step behaviour
- encoding-options: dither modes (Triangular/Rectangular/Pow-r) and Pow-r final-only warning, MP3 320 CBR, disabled Export
- video-rendering-options: Video Encoder chooser and Settings button, render order, same folder
- real-time-rendering: trigger condition, 10 s wait and Skip, Restart, attempt count
- live-projects: added File Manager and what a Project holds
- projects-and-live-sets: action title matched its steps (branching, not versioning)
- projects-and-live-sets: default Save As location, title bar, subfolders, older-version Save As rule, Finder moves
- locating-missing-files: exact route behind the Status Bar shortcut
- locating-missing-files: Offline marking, applies to clips/presets
- automatic-repair: Go/options triangle, Search Folder/Project/Library, Hot-Swap for several candidates
- collect-files-on-export: Always is default, Ask dialog Copy/Don’t Copy/Cancel, move limits, Save Preset button
- aggregated: route to File Manager
- finding-unused-files: route, grouping by sample type, preview/Delete in Browser, User Library variant
- packing: Create Pack route, compression, three install methods, restores all Sets
- packing: restored tested phrasing

## `entry-reference.js`

- collect: which locations, Samples/Presets destinations, File Manager External Files route with Show / Collect Into Project
- browser/search: all-terms matching, #tag search, Esc behaviour, × vs Clear
- arrangement-loop: Loop Start/Length fields, whole-arrangement default, brace keys, dragging, Set Song Start Time Here
- browser: fitted to the 4-term limit
- arrangement-loop: fitted to the 4-term limit
- arrangement-loop: key token moved from term name into description
- sends: Pre/Post, Insert Return Track, hide returns, return sends disabled (feedback), Main track role
- warp markers: Cmd I, arrow keys, Shift-drag waveform, deleting

## `manual-workspace-guides.js`

- library: all 14 labels (added Drums, Audio/MIDI Effects, Modulators, Max for Live, Grooves, Tunings, All, Sounds) and Edit mode
- places: Packs, User Folder, Add Folder…, what Splice/Cloud/Push each show
- user-folders: drag from Finder, scanning indicator, Locate Folder, external drive at launch
- using-ableton-cloud: Sign In route, eight-Set limit, Collect All and Save, Show Cloud option
- filter-groups: Cmd-click, right-click hide, Reset Filter Groups to Default, Results bar count/Add Label, Filter View key
- tags: factory/third-party tagging, Enable Auto Tags, 60 s limit, VST3 metadata
- tag-editor: Shift multi-select, Add Tag…, Add Group…, Add Subtag in…, Creator exception, default groups locked
- quick-tags: Create new tag… flow, remove ×, Status Bar group, Open Quick Tags toggle
- learn-view: modules, resume, Complete Lesson, picture-in-picture behaviour, Reload
- other-learning-resources: named Live Concepts, Learning Music, Learning Synths, YouTube
- splice: what works without login, Home page parts, how to hide the label
- splice login: Try free
- splice search: browse buttons, sorting, Included filter and free-account limit, Search with Sound detail
- splice samples: 1x BPM/Timestretch/1 BAR, load targets, Complex warp, storage options, auto-licensing

## `manual-completion.js`

- browser concept: sidebar sections, resizing, Full-Height Browser
- control bar concept: all nine named sections with their contents
- session clips / scenes / tracks: added detail cards for grid handling, scene organization, track creation and naming
- routing concept: patchbay, internal sources, group-track submix
- automation: choosers, lane buttons and modifiers, lane header menu, arrow-key folding, Draw Mode hold, breakpoint creation/Add Value, segment dragging
- automation lanes: named buttons by function rather than guessed glyphs; fold toggle
- remote control overview: the five mappable control types, Key Map Mode scope
- make the assignment: Mapping Browser, MIDI indicators
- instant mappings: arm-to-lock default
- manual surface: merged Remote ports
- tempo follower: exact setting name
- sync overview: host/device terms, Clock and Timecode roles
- timecode: exact Offset name
- audio fact sheet: meaning of neutral, full neutral / non-neutral inventories, in-context caveat
- undithered rendering: test method and three results
- dithering: gain change makes 32-bit, render 32-bit unless mastering
- sound quality tips: the six recommendations spelled out
- panning: Utility Width suggestion
- summing: where mix points are, multi-point caveat
- clip fades: sources of fades incl. Session Clip Fade button
- freeze: Beats mode stated as non-neutral, random parameters named
- midi fact sheet: scan time, test rig named
- midi fact sheet: repaired bracket from previous patch
- accessibility: Use Tab Key to Move Focus prerequisite
- accessibility session: Next/Previous Neighbor names and Shift variant, return slots, hidden mixer elements
- accessibility arrangement: grid keys, mixer navigation, content editing keys, locator Tab navigation, Main default, fades unsupported
- accessibility clip view: default editors, open key, MPE unsupported
- audio clips: compressed samples, Browser File Preview, Import Audio File… formats/placement, first-import analysis
- recording concept: overdub + Record Quantization pattern-building

## `workspace-atlas.js`

- transport: insert marker return keys, Arrangement Position fields, scrub area behaviour, Chase MIDI Notes
- follow playback: added the zoom/pan keys from the same manual section
- arrangement layout: Overview, ruler double-click, time ruler; new "Parts of the Arrangement" card for locators, Automation Mode, Lock Envelopes, lanes, track controls, drop area, waveform zoom, mixer

## `manual-set-guides.js`

- time-signature-changes: valid values, Control Bar fields and LED, marker editing keys, both fragmentary-bar commands, MIDI import
- fades: named handles, Create Fade In/Out and Create Crossfade commands, dotted limit line, Create Fades on Clip Edges 4 ms
- time commands: all five commands named individually
- editing grid: context-menu and Options menu routes, modifier behaviour with the grid off
- recording sessions into arrangement: what is recorded (incl. scene-name tempo/meter), Stop All Clips, moving material, Second Window, Consolidate Time to New Scene

## `manual-routing-guides.js`

- monitoring: In/Out show routes and Type/Channel choosers, blue Activator, Keep Monitoring Latency, multi-track, reset defaults
- mono/stereo: always-stereo chain, 6 dB attenuation stated
- midi ports: Inputs/Outputs lists named
- sync: input Sync incl. Timecode, MIDI Clock Sync Delay, Clock Type Song/Pattern exact, Resync External Hardware options
- remote: input Remote also triggers clips
- internal routing: exact solo behaviour per tap point
- rack routing points: chooser naming, Pre/Post FX meaning, solo behaviour
- post-effects recording: source Monitor In, several recording tracks

## `manual-workflow-guides.js`

- bounce track: Cmd B, per-track results, Session/Arrangement asymmetry, Bounce Track in Place location and Freeze/Flatten, naming/color/file location
- group bounce: command locations and key
- group bounce: Bounce Group in Place, sends included
- stems overview: music source separation model, local, four stems
- separating: exact commands (incl. Separate Stems for Time Selection), Merge to Single Track, group/colors, reactivate with 0, automation routing, browser behaviour, file location and format
- stems speed/quality: pass structure, SDR, crop commands and key, CPU/GPU note, bleed examples, where unrequested stems go
- paste bounced audio: what can be copied, destinations incl. MIDI→audio conversion and take lanes, Cmd Opt V, uses

## `push-atlas.js`

- push 2 samples: three playback modes described, length defaults, Browse route

## `manual-clip-guides.js`

- transients: display, create/delete keys, Reset Transients, Pseudo-Warp Marker modifiers, Insert Warp Markers on a selection
- auto-warp long samples: setting name/default, metronome
- adjusting auto-warp: downbeat fixes (Set 1.1.1 Here), Warp Sample as…, Warp Selection as…, all four Warp From Here variants exact, multi-select
- warping short samples: setting name/default
- even-length loops: assumed bar counts, BPM field editing, Shift-drag edge, ×2/÷2
- odd-length loops: why (even-bar assumption), dragging end marker to reveal hidden bar
- uneven loops: manual’s method (marker before trailing silence), Set 1.1.1 Here defined
- beats mode: Preserve options, Loop Forward and Loop Back-and-Forth separately, Transient Envelope scale
- tones mode: grain size behaviour, suitable material
- complex modes: Envelope default and direction, CPU tip
- reverse: warp marker example, region flip, Temporary Folder, Reverse Clip(s)/R in Arrangement, Session one at a time, caching
- clip fades: 0–4 ms signal-dependent, default via Create Fades on Clip Edges

## `clips-atlas.js`

- tuning: Octave/Note vs Ref. Pitch audibility, Lowest/Highest linkage, exact Retune option name
- tuning: Use Current Scale, own files/User tag, Info View description, Status Bar pitch, saved with Set
- tuning keys: exact layout names and centre notes
- tuning keys: bypass display, layout purpose

## `manual-device-guides.js`

- MIDI tools: replaced the shared template with per-tool controls for all 17 Transform/Generate tools (Arpeggiate, Chop, Connect, Glissando, LFO, Ornament, Quantize, Recombine, Span, Strum, Time Warp, Velocity Shaper, Rhythm, Seed, Shape, Stacks, Euclidean); transformation vs generator note corrected

## `manual-editing-guides.js`

- recording in sync: tempo change during recording, Warp Markers for later fixes
- metronome: menu location, tick sound, Rhythm fallback behaviour, exact option name

## `manual-envelope-guides.js`

- clip envelope editor: Device chooser per clip type, LED colors, Clear Envelope key, MIDI Envelope Auto-Reset
- mixer/device envelopes: worked example of automation and modulation interacting
- transposition envelope: additive with ±48 clip, scroll modifier, grain/resolution response tip

## `device-review-instruments.js`

- drift mod amount wording (length rule)
- NEW module: Drift — every oscillator, mixer, filter, envelope, LFO, Mod and global control explained (7 sections)
- Simpler — all modes, region/loop, slicing, warp, filter circuits, envelopes, LFO, global, context menu and CPU controls (12 sections)
- Operator — algorithms, shell/global, modulation target list, waveforms incl. user harmonics editor, oscillator params, aliasing, all seven envelopes and loop modes, pitch envelope, filter + shaper, LFO, voices, glide/spread, CPU, context menu (14 sections)
- Wavetable — oscillators and effects, sub, filters and routing, matrix additive/multiplicative rules, envelopes, LFOs, MIDI tab, unison modes, Hi-Quality (11 sections)
- Analog — architecture, oscillators incl. key scaling/sub/sync, noise, filters incl. Follow/Drive types, amps, envelope loop modes, LFOs, global incl. Quick Routing/stretch/priority, MPE (9 sections)
- Electric — model, mechanism, hammer, fork, damper, pickup, global incl. stretch tuning (6 sections)
- Collision — architecture, mallet, noise, full resonator parameters, tuning, mixer, global structure, tips/caution, LFO, MIDI/MPE (10 sections)
- Tension — architecture, exciter types and parameters, damper/string/vibrato, termination, pickup/body, filter/global incl. MPE, keyboard, portamento, unison, tips (8 sections)
- Meld — engines, all 24 oscillator types and macros, mix, all 17 filter types, envelopes, LFOs incl. LFO FX, matrix, MIDI/MPE, settings, global (11 sections)
- meld poly voices wording (length rule)
- Impulse (7 sections) and Drum Sampler (6 sections) — every slot, envelope, playback effect, modulation and context option
- length rule
- length rule
- External Instrument — routing and latency compensation
- drum sampler: exact Noise Osc name

## `index.html`

- loads device-review-instruments.js after sampler-control-details.js

## `serve.mjs`

- allowlists device-review-instruments.js

## `device-review-effects.js`

- NEW module (loaded after instruments; allowlisted in serve.mjs): Reverb (6 sections) and Delay (4 sections incl. smoothing modes, LFO, recipes)
- Echo — channel modes, sync, tunnel, filter, modulation, character (gate, ducking, noise, wobble, repitch, auto-off), global (5 sections)
- Chorus-Ensemble (modes, width, taps, feedback, tips), Phaser-Flanger (three modes, LFO shapes, duty cycle, LFO2, envelope follower, Safe Bass), Auto Pan-Tremolo (modes, waveforms, Harmonic/Vintage, shape, attack, dynamic rate, time modes, stereo offset)
- Glue Compressor — all controls, Soft clip caveat, display, oversampling, sidechain (3 sections)
- Channel EQ, Gate (incl. sidechain), Overdrive, Dynamic Tube — every control
- Amp (models, controls, interaction, cabinet pairing), Cabinet (speaker, mic position/type, multi-mic rack), Pedal (types, adaptive EQ, Sub, placement, four recipes)
- Drum Buss, Redux, Erosion (12.4 version), Vinyl Distortion — every control
- Multiband Dynamics (theory, full display gestures, tips) and Roar (input, all routing modes, 12 shaper curves, 9 filters, modulation, feedback, global, sidechain incl. MIDI)
- Filter Delay, Grain Delay, Beat Repeat, Looper (transport, multi-purpose button, tempo/length/song control, monitoring, transforms, feedback routing)
- Hybrid Reverb — input, routing, IR categories and user IRs, all five algorithms with their controls, EQ, output (11 sections)
- Shifter — tuning/delay, modes, LFO, envelope follower, MIDI pitch mode, three tips (8 sections)
- Auto Shift — input, quantizer, MIDI input and tab, LFO, pitch/formant, vibrato (7 sections)
- length rule
- Corpus (resonator, LFO, filter, global, MIDI sidechain) and Resonators (tuning incl. scale/tuning systems, modes, decay, output)
- Spectral Resonator (6 sections) and Spectral Time (5 sections) — all modes, controls and tips
- Vocoder (all carriers and filterbank controls, two setups), External Audio Effect, Spectrum, Tuner — every control
- length rule

## `device-review-midi.js`

- NEW module (loaded after effects; allowlisted): all eight MIDI effects — Arpeggiator, CC Control, Chord, Note Length, Pitch, Random, Scale, Velocity
- Max for Live devices: LFO, Envelope Follower, Shaper, Envelope MIDI, Shaper MIDI, Expression Control, MPE Control (incl. Press/Slide/NotePB), Note Echo, Align Delay — shared mapping/modulation explanation plus every device-specific control

## `device-review-racks.js`

- drum rack pads: fixed garbled modifier text
- racks: use area ids directly
- macro sections also for MIDI Effect Rack
- rack overview sections for MIDI Effect Rack
- MIDI Effect Rack chains and zones; Instrument Rack crossfade section
- NEW module (loaded after MIDI; allowlisted): Instrument, Audio Effect, MIDI Effect and Drum Racks — overview, creating, views, chain list, auto select, zones and chain select, macros, map mode, randomize, variations, mixing, Drum Rack I/O, choke, returns, Pad View, extracting
- Device chain, A/B compare, presets and hot-swapping, default presets (all Defaults folders), plug-ins (formats, sources, windows, Configure Mode, sidechain, VST banks, AU), delay compensation — chapter 23
- Max for Live chapter — setup, using, editing/saving and .amxd locations, MIDI Tool building, dependencies/freezing, learning (7 sections)

## `device-control-details.js`

- install(): an exact area id now takes precedence, so areas sharing a manual anchor (MIDI Effect Rack) can be addressed
