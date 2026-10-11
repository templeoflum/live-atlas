# Manual figures

September 25, 2026 · official Live 12 manual snapshot

The active capture registry now contains only manual imagery. Custom stills and
the Record MIDI loop are removed from the active atlas, but their original files
are retained for recovery and later custom-media work. They were not deleted.

- 1,146 occurrences across the 42 cached manual chapters: 1,097 figures and
  49 standalone inline images/icons.
- 1,094 distinct source assets, of which 1,093 downloaded successfully.
- Every occurrence has an explicit local card/source-section placement; repeated
  figures retain their separate contexts. One occurrence is unavailable upstream.
- Original-resolution assets are kept as supplied, with no cropping, stretch or
  re-encoding. Each figure displays at the width the manual's own page uses for it
  (`layoutWidth` from its `sizes` attribute), never enlarged. Larger views retain
  the whole figure and can show native size.
- Local image paths, native dimensions, byte sizes, original URLs, source headings
  and captions are in `manual-images.json`. `manual-images-data.js` is the browser
  copy; `manual-images.js` attaches figures to real action renderers.
- `import-manual-images.mjs --download` validates or refreshes these assets from
  the official host. The private manual cache and audit files are not served.

## Upstream exception

[The VST Plug-In Folder, §23.4.1](https://www.ableton.com/en/live-manual/12/working-with-instruments-and-effects/#the-vst-plug-in-folder)
references `VstPluginFolderWinL12.png`, which returned HTTP 404 at both original
and supplied responsive URLs. The current public page still references that
filename. Its local card identifies the unavailable figure and links to the
source instead of showing a broken image or substituting the macOS controls.

## Rights and release gate

Figures and original captions are Ableton material, © Ableton AG. They are
credited in the atlas and are not represented as original artwork. Attribution
does not confer permission: check applicable terms or obtain permission before
publicly distributing these images. This pass is a local prototype update;
nothing was published or deployed.

## Image review · September 25

Every figure was checked against the repaired text on its card. Changes are listed
in `IMAGE_REVIEW_LEDGER.md`.

- **Line art on a dark frame.** 68 figures were drawn for a white page: black lines
  or labels on a transparent ground (Analog's signal flow, the compression and
  crossfader diagrams, the MIDI test rigs, Push overviews). The importer flags them
  (`matte: "light"`, from interior transparency only) and they now sit on a light
  backing. Device panels with transparent rounded corners keep the dark frame.
- **Inline icons.** The 49 small icons from the manual's sentences were shown as
  full figures captioned with their section heading (a fold arrow labelled
  "Gate"). Each now has its own label from the sentence it came from (e.g. "Gate
  unfold button (Sidechain)", "Follow Action · Previous", "Release Loop ·
  forward"), is listed as a small labelled row rather than an enlargeable figure,
  and is shown at least 18px tall. Four exact repeats (the same icon in the next
  sentence) are shown once.
- **Figures beside the wrong action.** Simpler's Classic-mode Sample tab now sits
  with the Classic controls (Loop / sustain), and MIDI Monitor's Flow and MPE
  displays with the Freeze / inspect action.
- **Figures with no text beside them.** Drift's Waveform Display and the device
  chain's two browser figures now have a line of explanation.
- **Captions.** One caption showed a literal `&gt;`; the importer now decodes it.
- Stacked figures (up to nine on a card) were checked: each is captioned and in
  manual order, so they were left as they are.
- The upstream 404 below could not be rechecked: this environment has no route to
  Ableton's image host.

## Verification

`manual-images.test.cjs` checks all occurrences against actual rendered action
cards (repeated icons once), that every inline icon has its own label, the
figure-home overrides, local dimensions and complete files. `serve.test.cjs` checks every available
asset returns its exact byte length, with no private source/audit files exposed.
Browser checks covered desktop/narrow layout, enlargement/actual size and
uncropped figures. Assets below the viewport are loaded lazily.

Image placement and the image review are complete except for the upstream
exception. The text review is recorded in `MANUAL_CONTENT_REVIEW.md`.
