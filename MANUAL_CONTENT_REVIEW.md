# Manual content review

September 25, 2026 · Live 12 manual snapshot

## What is complete in this pass

The previous missing-placement queue is closed. Video, Link/Link Audio,
Tempo Follower, external synchronization, controller mappings, separate Push 1
and Push 2 areas, performance strategy, audio/MIDI behavior and accessibility
now have authored local action/control explanations. Shared Live Concepts
are attached to the relevant existing places. About and credits are accessible
from Sources & scope, not disguised as actions. The sources for those additions
were read in full; their original wording was not imported as atlas prose.

All cached headings have a local destination. This is verified separately by
`manual-card-audit.cjs`; it does **not** certify every parameter explanation.

The image pass replaced active custom media with the official manual figures.
See `MANUAL_IMAGES.md` for the upstream missing image and provenance.

## Content repairs found during the image pass

The older device cards were too thin to explain some of their new figures.
Existing action bars were retained; named controls and behavior were added
inside the final cards, without additional disclosures:

| Device | Repairs checked against the source |
| --- | --- |
| Saturator | Curve choices, Bass Shaper threshold, current Post Clip/Color controls, all six Waveshaper controls, quality/DC options. |
| Compressor | Transfer/detector/envelope modes, lookahead, displays, gain compensation, external detector mix and EQ. |
| EQ Eight | Filter types, multiselection, Q gestures, Adaptive Q, Scale, channel editing, audition and oversampling. |
| EQ Three | Crossover slopes, band ranges, LEDs and coloration at flat gain. |
| Utility | Mid/side limits, disabled width behavior, Bass Mono audition, DC filtering and mute placement. |
| Limiter | Current ceiling/routing modes, lookahead values, Maximize transformations and linked reduction. |
| Auto Filter | Every current filter type, circuit scope, LFO/envelope quantization, stereo modulation and sidechain controls. |
| Sampler | Layer menus, zone fades and round robin, per-layer/global scope, sustain/release loops, oscillator and pitch modes, filter/shaper order, envelope stages, LFO/MIDI routing and import qualifications. |

## Text review · September 24–25

Scope is fixed: the atlas stays an atlas. No export, curriculum, student
collections or accounts are planned. The work left is reviewing and refining the
text and images already here.

Every card flagged by the audit below, plus the device families and the MIDI tools
it can't see, was read against its cached manual sections and repaired where it was
thin or wrong. `TEXT_REVIEW_LEDGER.md` lists all 159 changes by file. The
pre-review copy is `../_snapshots/live-atlas-2026-09-24-pre-text-review/`.

- **Workspace:** export selection, rendering, encoding, video and real-time
  render options; projects, missing-file repair and collect-on-export; Browser,
  library labels, tags, Cloud and Splice; Control Bar and transport terms; mixer,
  sends, routing, monitoring, sync, remote mappings, accessibility, and the audio
  and MIDI fact sheets.
- **Clips:** transients and auto-warp commands (all Warp From Here variants),
  loop lengths, Beats/Tones/Complex, reverse and fades, tuning systems and
  keyboard layouts, bounce/paste-bounced audio, stem separation, clip envelopes
  and transposition range.
- **Devices:** the shared MIDI Tools template was replaced with a per-tool entry
  for all 17 tools. Four new modules add reviewed controls inside the existing
  device cards, with no new disclosures:
  - `device-review-instruments.js`: Drift, Simpler, Operator, Wavetable, Analog,
    Electric, Collision, Tension, Meld, Impulse, Drum Sampler, External Instrument.
  - `device-review-effects.js`: the 35 audio effects not repaired in the image
    pass, Amp through Vocoder, including Roar, Looper and the spectral devices.
  - `device-review-midi.js`: all eight MIDI effects and nine Max for Live
    devices (LFO, Envelope Follower, Shaper, MPE Control, Align Delay, etc.).
  - `device-review-racks.js`: Instrument, Audio, MIDI and Drum Racks, chains,
    presets, plug-ins and Max for Live.
  `device-control-details.js` now finds Rack areas by exact id first, so the MIDI
  Rack (which shares a manual anchor with the Audio Rack) is addressable.

Audit before → after (`node manual-content-audit.cjs --json`, sections with
un-matched emphasized names): **162 → 88** (Workspace 85 → 43, Clips 24 → 13,
Devices 53 → 32). What's left was inspected: mostly emphasized ordinary words
("hear", "any", "every", "However") and abbreviations the card already covers
under the full name. It is triage, not a completion score.

Button names follow function where the manual shows only an icon; no glyphs were
guessed.

## What remains open

- The image review is done (see `MANUAL_IMAGES.md`, `IMAGE_REVIEW_LEDGER.md`).
- Anything that turns up while the atlas is in use: fix it in place and add a
  ledger line.

## Checks

`node --test` runs the local model suites; the local-server suite needs access to
the preview port. `manual-images.test.cjs` checks each figure's real render target,
dimensions, local file, provenance and absence of active custom stills/videos.
`device-control-details.test.cjs` checks every reviewed control family above (each
control explained in more than 20 characters and cited to its chapter).
These tests supplement, but do not replace, editorial review.
