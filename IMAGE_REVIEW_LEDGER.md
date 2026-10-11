# Image review ledger

## September 28, 2026 · T-0002 History image checks

Worker: codex; session: t0002-sep28. This is implementation evidence and a proposal for independent verification, not board acceptance or creator approval.

Current-state inspection found the seven September 23 replacements still active and Live 7 Drum Rack still inactive. The September 25 review below concerned current-manual imagery and did not close these History checks.

### Source correction observed

Rendered local `tmp/pdfs/live-7.pdf` physical page 229 (printed 227) with Poppler and visually inspected it. Verified the PDF SHA256 against registry value `525fc265b3d1135cf58409853e39abeabc40b9c07829474fd89a6390c8f32fed`. Nested form `/Im284` places embedded image 0 (`/Im0`) with matrix `[831 0 0 -194 43.5 196.75]`. Applied its vertical reversal at the original 831 × 194 pixels, without recreation, resampling or crop. Every corrected RGB pixel was compared with the vertically reversed source bitmap and matched.

Inspected `assets/history/live-7-drum-rack-oriented.png` against the rendered page before registering it on `live-seven`: title and chain headers at top, return chains below, pads upright. Raw prior extraction remains untouched. The embedded bitmap excludes the PDF's surrounding vector callout numbers; this is an extracted screenshot, not a full rendered annotated figure. Extractor and importer now support the explicit `pdfDisplayTransform: 'flip-vertical'` metadata so re-import preserves the correction. Removed only the resolved Live 7 gap.

### Browser observations

Used the actual Atlas at `http://127.0.0.1:54868/` in Codex's in-app browser. Opened each route, visually observed its inline screenshot and caption, clicked Enlarge, and visually observed the image and edition credit in the shared dialog. All eight rendered upright, at their recorded proportions, without visible image errors:

| History route | Figure | Inline | Enlarge dialog |
| --- | --- | --- | --- |
| `#history/live-three` | Live 3.0 pitch envelopes | observed | observed |
| `#history/live-four` | Live 4.1 MIDI editor | observed | observed |
| `#history/live-five` | Live 5.2 Auto-Warp | observed | observed |
| `#history/live-six` | Live 6.0 Audio Effect Rack | observed | observed |
| `#history/sampler-history` | Live 6.0 Sampler key zones | observed | observed |
| `#history/instrument-partners` | Live 7.0.9 Tension | observed | observed |
| `#history/live-eight` | Live 8.0.2 Looper | observed | observed |
| `#history/live-seven` | Live 7.0.9 Drum Rack chain list | observed | observed |

Screenshots were inspected in the tool results. Initial Live 3 inline observation was at 1170 × 722; remaining observations used the browser's changing native pane width, primarily 490 × 941. No fixed desktop/mobile breakpoint matrix is claimed. All seven other replacements were checked for the same inversion defect; none was visibly inverted.

### Automated checks and limits

`node --test *.test.cjs`: all 19 test files passed with loopback permission (0 failed/skipped); final log: `tmp/t0002-tests-loopback.log`. Initial sandbox run passed 18/19; server test required loopback access. Regression assertions retain the active Drum Rack, physical page/image index and display-transform metadata; existing checks cover dimensions, byte sizes, version matching, placements and shared viewer registration.

Not checked in this pass: Actual size toggle/panning, every viewport, keyboard or screen-reader behavior, other History figures, external source-link availability, a renewed edition audit for the seven unchanged PDFs, or redistribution rights. No external upload/publication, new source research, or replacement of remaining gaps. Independent verification and creator judgment about lesson suitability remain separate.

---

September 25, 2026 · Live 12 manual snapshot

Every change made in the image review, grouped by file, in the order it was made.
Before-copies: the first six importer entries were made before
`../_snapshots/live-atlas-2026-09-25-pre-image-review/` was taken, so their
before-state (importer, `manual-images.json`, `manual-images-data.js`) is in
`../_snapshots/live-atlas-2026-09-24-pre-text-review/`. Everything after them
diffs against the 09-25 snapshot. No image file was changed.

27 entries across 11 files.

## `import-manual-images.mjs`

- importer: zlib for PNG alpha analysis
- importer: record the manual's own layout width from each figure's sizes attribute
- importer: --offline regenerates metadata from local assets without fetching
- importer: interior-transparency detector marks figures that need a light matte
- importer: offline mode carries the recorded upstream error instead of fetching
- importer: pixelRatio/displayWidth follow the manual's layout (was a blanket 2x); matte recorded
- importer: decode &gt; / &lt; in captions (one caption showed a literal '&gt;')

## `manual-images.js`

- Inline icons: per-occurrence labels, repeat map, and figure-home overrides
- Icon captions and alt text use the icon's meaning, not the section name
- Repeated icons recorded against the first occurrence; overrides applied
- Shortcut illustrations never fall back to a bare inline icon

## `atlas.js`

- Inline icons render as a small labelled chip, not an enlargeable figure
- Icons load immediately (a few hundred bytes each)
- Tiny icons (loop-mode glyphs rendered ~6px tall) are shown at least 18px tall
- Icons aren't clickable enlargement targets
- Frames use the importer's matte flag

## `atlas.css`

- Figures sit on a light backing (the manual's own page colour) so transparent line diagrams stay legible; icon chip styles
- Icons list as one labelled row each, like a legend
- Light backing only for figures the importer marks as drawn for a white page (68); panels with rounded transparent corners keep the dark frame

## `device-review-instruments.js`

- Drift: text beside the Waveform Display figure, which had none

## `device-review-racks.js`

- Device chain: text beside the two browser figures, which had none

## `manual-images.test.cjs`

- Test: repeats shown once, every icon labelled, figure-home overrides
- Test pass message

## `manual-images.json / manual-images-data.js`

- regenerated offline: only change is the decoded Resonators caption

## `MANUAL_IMAGES.md`

- image-review section; sizing and matte notes

## `IMAGE_REVIEW_LEDGER.md`

- new: readable change ledger

## `MANUAL_CONTENT_REVIEW.md / COMPLETION_PLAN.md / README.md`

- status: image review done
