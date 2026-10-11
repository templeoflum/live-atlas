# Clips action map

The navigation stops at territory → area → action. Steps, control meanings,
exceptions, and supporting examples inside the chosen action are visible without
another disclosure. The area and action selectors stay in place while its reader
scrolls. This rule also applies to Workspace and the other reference renderers.

## Homes

| Area | Reach for |
| --- | --- |
| Clip View | Open, make, frame, name, switch off, select several, retain defaults |
| Recording | Choose input, arm, record, capture, overdub, step, count in |
| Notes | Select, draw, move, resize, split, change velocity/chance, fold, transform pitch |
| Time & groove | Loop, crop, stretch, insert time, quantize, apply/extract a groove |
| Audio | Import, gain/pitch, reverse/fade, replace, RAM, slice, transcribe, separate |
| Warp | Anchor beats, align loops/recordings, quantize audio, choose stretching behavior |
| MIDI tools | Apply/undo, divide, fill, reshape, express, generate, add tools |
| Expression | Envelopes, controllers, independent loops, per-note expression, tuning |
| Launching | Press/release, launch timing, legato, offset, velocity, follow actions |
| Takes | Record passes, manage lanes, audition, assemble a comp |

`clips-atlas.js` is the editorial mapping. Source headings resolve into these
actions, not a parallel chapter navigator. Some source sections share one action;
the source map is not a measure of parameter-by-parameter completeness.

Existing entries, manual routes and flag identities remain valid. A direct source
link opens the appropriate action and scrolls to its inline passage when one
exists. Shared Workspace/Set sources retain their original territory.

## Sources and limits

Content reuses the project's original authored guides, with newly written entry,
recording, MIDI-tool, MPE and tuning instructions checked against the official
Live 12 chapters. The cached official chapters remain in `../manual-research`.
Source citations stay attached to individual passages. No manual illustrations
or prose were copied into this pass.

This is the Clips navigation/content pass, not a completed illustration pass.
Existing native screenshots remain unchanged. The existing two-second Arm loop
is available directly in Arm, paused until played. No new videos were made.

## Remaining image work

Capture the exact action/control, not a generic screenshot of a nearby view:

- Clip View: multi-clip selection, clip defaults and sample Save.
- Notes: splitting/joining, chance/groups, fold/scale, pitch utilities.
- Time/groove: crop, stretch handles, time commands, Groove Pool and extraction.
- Audio: source replacement, RAM/HiQ, slicing/conversion, stem separation.
- Warp: long-file alignment, multi-clip warp, audio quantization, import settings.
- MIDI tools: Transform/Generate controls and each tool family.
- Expression: clip-envelope editor and lanes, MIDI controllers, unlinked loops,
  MPE, output setup, tuning and keyboard layouts.
- Launching: launch controls, legato/offset/velocity, follow actions.
- Takes: lane controls, audition state, source highlights and comp boundaries.

Existing illustrative images on basic cards also need action-specific variants
eventually. Do not count a generic piano-roll image as a demonstrated resize.

## Verification

`clips.test.cjs` checks explicit homes for all current Clips source sections,
legacy routes/flags, all card renders in both shortcut platforms, real image
references, citations, links, one selected action, and absence of nested details.
Existing reference/Workspace/media tests now enforce visible in-card content.
`serve.test.cjs` checks the new module and preserves private-file exclusions.
