# Ableton Live, Mapped

Local working draft · September 25, 2026

## Current focus · Review and refinement

Scope is fixed: no export, curriculum, student collections or accounts. The text
review against the Live 12 manual finished September 25 (`MANUAL_CONTENT_REVIEW.md`,
`TEXT_REVIEW_LEDGER.md`), and the image review followed the same day
(`MANUAL_IMAGES.md`, `IMAGE_REVIEW_LEDGER.md`). What's left is refining what's
already here.

**Publishing.** The atlas is a static page; `serve.mjs` is only a local preview.
`node build-pages.mjs` copies exactly what the page loads (index, CSS, 40 scripts,
1,137 credited images, about 153 MB) into `../site`, which is its own git
repository for GitHub Pages. It never copies `manual-research`, tests, docs,
snapshots or unused media. After editing here: rebuild, then commit and push in
`../site`. Flags and the trace live in each browser's localStorage under
`ableton-live-atlas.*` keys.

The main working tabs are Workspace, Clips and Devices; Overview and Live’s History
remain separate. There is no Sets tab. Workspace has eight fixed families above
one filtered place list, then the existing action bar. Navigation and operations
for Session, Arrangement, tracks, routing and files are together in those places.
Nothing expands in the sidebar or inside a selected explanation. See
`WORKSPACE_MAP.md`, `DEVICES_MAP.md` and `CLIPS_MAP.md` for the current shape.

This is a design-stage reorganization, not a compatibility migration. The missing
manual-card queue is now closed. The active illustrations are official manual
figures; the custom stills and pilot video remain on disk but are not used by the
atlas. Source-home coverage is not exhaustive text or parameter conversion.

`MANUAL_CARD_AUDIT.md` is the current placement inventory (recheck with
`node manual-card-audit.cjs`). It loads the actual action-map modules, unlike the
older guide-count report. Read `COMPLETION_PLAN.md` for the agreed order:
complete and review all manual text/cards, place every manual figure, then
research and expand Live’s History. `MANUAL_IMAGES.md` records the completed
image placements and one upstream 404. `MANUAL_CONTENT_REVIEW.md` records repairs
made while placing images and the remaining semantic review—not a claim that
every device parameter is already explained. No history expansion has started.
Top navigation has the same alignment and padding on every tab.

Run `node --test devices.test.cjs clips.test.cjs workspace.test.cjs
workspace-media.test.cjs shortcut-explorer.test.cjs atlas.test.cjs manual.test.cjs
reference.test.cjs record-midi.test.cjs manual-card-audit.test.cjs
manual-images.test.cjs device-control-details.test.cjs manual-content-audit.test.cjs`, then `node serve.test.cjs` against the
local preview.

## Vocabulary

`vocabulary.js` underlines the first mention of each core Live term on a card, skipping the term's own card. Tapping a term shows a one-line meaning, any shortcut taken verbatim from the manual's shortcut table, and a link to the term's card. `node vocabulary.test.cjs` checks that every home card and shortcut exists. The meanings are original wording and still need a review pass.

## Earlier Workspace pilot notes (historical)

Bulk section writing is paused. The section inventory below is research
coverage, **not a measure of a completed atlas**. The current build starts with
Workspace, before moving through Clips, Devices and Sets in order.

Workspace now has six local areas: Views, Browser, Control bar, Settings,
Editing and Controllers. Each area keeps its action controls visible while a
single example or explanation changes beneath them. Named controls expand
individually; more specific topics open inside the same area, with a route back.
For example: Browser → Filters → Tags → Tag editor. Find uses that atlas location
and opens it directly, rather than switching to a parallel manual chapter tree.

`workspace-atlas.js` integrates the original Workspace entries, First Steps and
Browser references, plus selected navigation, timing and controller references.
Old routes and flags remain valid. The screenshot viewer, original image files,
Mac/Windows keys and other territories are preserved. No new captures, videos,
lesson Sets, learner data or changes inside Live were made.

This is the **first structural pass**, not a claim that Workspace is finished:
filters/tags, Info View, additional Settings pages and controller ports still
need matching native stills. The broader Push, accessibility, performance and
shortcut references remain searchable but have not all been given this local
action/control treatment. Finish those placements and examples before treating
Workspace as complete; do not resume bulk chapter counts as the progress metric.

Checks: `node workspace.test.cjs` covers the contextual routes, local navigation,
source links, existing images, both key platforms and unchanged other territory
groups. The core, reference, manual, recording-pilot and local-server suites also
pass. Browser review covered nested Browser navigation, contextual Find, Back,
image enlargement, retained open controls on platform switching, keyboard focus,
and the 420px layout without horizontal overflow. Mac labels and the normal
viewport were restored; learner flags were not changed.

## Earlier writing pass · retained research

Added 124 original section guides across Arrangement, Session, clip launching,
routing, mixing, automation, clip envelopes, and file management. Every indexed
section in chapters 5, 6, 7, 16, 17, 18, 25 and 26 now has an original guide or
an existing pilot entry. Current coverage: **519 authored section entries,
24 shortcut-table sections, and 508 remaining source-only references**.
These are section-entry counts, not exhaustive parameter or screenshot coverage.

The four new guide modules use the existing compact reader and closed detail
layers. Action-specific keys retain Mac/Windows labels. New explanations keep
selection scope, Session/Arrangement overrides, automation versus modulation,
monitoring versus recording, routing tap points, file dependencies and cleanup
scope explicit. The original 80 entries, learner flags and territory order are
unchanged. No native captures, videos, lesson Sets or Live-session changes were
made. Approved images are reused only for the relevant subject; the 59 missing
device panels and additional workflow stills remain outstanding.

All reference, core-entry, pilot and local-server tests pass. The manual test
renders every registered reference, verifies official source anchors, checks
both shortcut platforms, and asserts complete section-entry coverage for this
batch. Browser review checked Session-to-Arrangement recording and its image,
search, routing detail, automation recovery, retained open instructions during
platform switching, and a long file-reference title at 420px without horizontal
overflow. The normal viewport and Mac labels were restored; flags stayed at zero.

The earlier proposed next writing group was device workflows, Racks and deeper
instrument/effect controls; that sequence is superseded by the Workspace pilot.
The generated `MANUAL_COVERAGE.md` and `manual-coverage.json` remain the exact
pending-guide and native-device-image queues. `../manual-research/read-chapter.cjs`
is a private, section-bounded reader for the cached official HTML; neither it nor
the source cache is served by the local preview.

## Previous writing pass

Added 165 original section guides across First Steps, Browser, Clip View,
audio timing/Warp, MIDI editing, and recording. Every indexed section in those
six chapters now has an original guide or an existing pilot entry. Coverage is
now 395 authored section entries, 24 shortcut-table sections, and 632 remaining
source-only references. This is not a claim of exhaustive parameter coverage
or completed new screenshot coverage.

Relevant operation keys now appear beside the new guides with Mac/Windows
labels. The approved Arm stills form a compact Unarmed/Armed pair; original
media are unchanged. Existing captures are reused only for matching subject
matter. No new videos, native captures, lesson Sets or Live-session changes.

Checks cover all new reference rendering, source anchors, both platform labels,
complete section-entry coverage for the six chapters and valid image references.
Browser review checked step recording, note-length keys, retained open details
during platform switching, Arm image loading/enlargement and 420px layout.
The normal viewport and Mac labels were restored.

That pass queued Session/Arrangement, routing, mixing, automation and files;
the current writing pass above covers those chapter entries.

## Manual source-map integration

Latest pass: the entire Live 12 manual **source map** is integrated: 42 chapters,
1,051 headings, 292 shortcut-table mappings, and the 85-device/Rack catalog.
Global Find searches topics, device controls and keys. The original five
territories and all approved pilot entries remain in place.

The full **content conversion is not complete**. See `MANUAL_COVERAGE.md` for
the current authored/reference-only split and the native-image queue. New
task-sized guides cover missing device introductions, MIDI tools, Drift’s
controls, comping, conversion, grooves, bouncing and stem separation. The
remaining fine-grained headings are explicitly official-source references,
not empty pages counted as finished explanations. No new videos or Live
session changes were made in this integration pass.

Run `node manual.test.cjs` for the expanded map and rendering checks, and
`node manual-coverage.cjs` to regenerate the exact pending-work list.
The earlier 80-entry pilot and capture notes below are retained as history.

Integration checks: all 1,051 official section anchors verified against the
cached source; the 988 newly registered reference views render without missing
targets. The existing pilot, media and server tests pass. Browser checks covered
cross-territory Find, exact-key ranking, shortcut-platform switching, Drift’s
nested controls, keyboard-only search, prose-only keyboard references, and the
420px panel without horizontal overflow. The viewport was restored, flags remain
unchanged, and the browser reported no warnings or errors.

## Current screenshot coverage · September 21

The authorized native-resolution rollout is complete. This supersedes the earlier single-image review and low-resolution capture notes below, which remain as history.

- 37 new, unmodified native macOS PNGs plus the approved user-supplied MIDI PNG; 55 focused/context frames across 68 entries.
- All 26 currently listed devices have their own actual Live panel. Navigation, routing, recording controls, MIDI/audio clips, Warp, Quantize, split/consolidate, automation, mapping, Audio Settings, and Export now have appropriate references.
- Origins (9 entries), Undo, Save a Set, and Collect All and Save are deliberately text-only. `captureExceptions` records why; a coverage test fails if any other entry has neither an image nor an explicit exception.
- No active capture references the old JPEGs. The old files are retained for recovery, not displayed. The approved MIDI image is unchanged, with Fold and Highlight Scale off and the playhead at the start.
- Each image declares its real dimensions and 2× density. CSS crops preserve the unmodified source. Inline previews are bounded in both dimensions without stretching; enlargement offers Fit, Actual size, and full-window/full-clip context. Wide controls can be read at actual UI size with scrolling confined to the viewer.

Capture procedure and original waveform provenance: `../capture-tests/README.md`. Two temporary capture tracks and one Browser shortcut were removed after use. The original four tracks, Drift/Utility chain, and MIDI clip remain. No music was played or recorded; no `.als`, default preset, audio settings, or update was saved/applied.

Validation: JavaScript syntax and `node atlas.test.cjs` pass, including all 80 entries, 26 device assignments, actual PNG dimensions, crop boundaries, source links, legacy routes, and flag migration. Browser checks visited all 71 non-history entries: all 68 illustrated entries loaded without failures. Every device crop and the new working-view crops were visually reviewed. Corrected Consolidate's shifted crop and tightened Return/export references. Fit/Actual size/full context, 420px viewing, contained scrolling, accessible Close, and unchanged zero flags were checked; the viewport was restored and browser warnings/errors were empty. `../capture-tests/atlas-native-preview.png` records a final browser view.

This replaces the previous workbench sketch as the active design direction. The old files are preserved, not incorporated. The scope is Ableton Live as an unfamiliar instrument—not a general music-production atlas. This draft does not inherit the earlier six-view framework or the Session/Arrangement research blueprint as its architecture.

## Basis

At the user's request, this is a direct reworking of their [Piano Atlas](https://templeoflum.github.io/piano-atlas/), using [index.html](https://github.com/templeoflum/piano-atlas/blob/main/index.html), blob `d27c4f7c4e5cc50623020382c72c8f042024c090`, retrieved from GitHub on September 21, 2026.

The original shell, typography/color tokens, overview cards, territory switching, inspector pattern, timeline styling, and local flag concept were retained/adapted. Piano datasets, genealogy, theory toys, historical arguments, audio generation, and instructional narration were removed. Unlike earlier independent sketches, this draft intentionally derives code and design from the user-designated source. No third-party coursework assets were copied.

The five territories are **Workspace, Clips, Devices, Sets, and Origins**; Overview is the home page. The order moves from orientation, to working with clips, to shaping their sound, to managing a larger project. Origins remains a separate historical view. Session and Arrangement are prominent groups within Sets. The former System relationships now live with Sets and Devices, and the former Working actions live with the objects they affect. Shortcuts stay close to relevant actions. No forced sequence or mastery score is implied.

## Current slice

- Workspace: 11 entries for navigation, Browser/setup, and everyday keys. Tab and Shift+Tab remain upfront. No imitation Live interface.
- Clips: 10 entries for audio/MIDI, recording, note editing, and timing. Clip loops and Arrangement loops now have separate entries and link to one another.
- Devices: 26 representative devices plus four signal-flow/processing entries. Device chain retains the signal map and the actual Drift → Utility screenshot.
- Sets: 20 entries grouped into Session, Arrangement, Set & tracks, Mixing & routing, and Files. The Live Set detail contains the nesting map; Tracks contains the MIDI/audio signal map.
- Five origins entries and four people entries, grounded in primary accounts. The Operator date refers to prototyping; Push is a development topic rather than an asserted release date.
- Per-entry flags stored locally under a separate key from previous projects. Storage failure falls back to the current visit.

Sources are linked in the detail panels and listed in `atlas.js`. This is not an exhaustive device/shortcut inventory. The signal diagram omits optional routing branches, returns, and external instruments; it is a basic native-instrument/audio-track example. Device availability and shortcuts must be checked against the learner's installation before lessons. No audio was auditioned.

## Territory consolidation · September 21

The approved split replaces System and Working without discarding their material. There are 80 entries: the previous 79, plus a navigation-specific Session/Arrangement entry and a separate Arrangement loop, minus the duplicate Save shortcut entry merged into Save a Set. Old territory URLs follow their entry's new home. The old `save-key` URL and saved flag resolve to `save-set`; the flag storage key is unchanged. Desktop and narrow-screen navigation derive from the same grouped registry, with exactly one home per entry.

This pass changes organization, not the library's completeness. The proposed shared master and individual student collections remain a separate, unimplemented feature; there are still no accounts or shared lesson notes.

Validation: `node --check atlas.js` and `node atlas.test.cjs` cover entry coverage, unique homes, source/asset links, old routes, and Save flag migration. Browser checks cover the five sections, all 80 desktop/mobile choices, Mac/Windows shortcut labels, Session/Arrangement history, the old System → Device chain route, screenshot enlargement, and 420px/640px/normal-panel layouts. The responsive override was restored afterward.

## Screenshot review · September 21

### Single MIDI sample, awaiting review

The MIDI entry under Clips now uses the user's final uploaded PNG (`codex-clipboard-9d0090ce-4b22-425b-b3a9-85ad504143a5.png`), copied unaltered to `assets/live-midi-clip-sample.png`. It is 4112×694, with the playhead at the start, Fold off, and Highlight Scale off. The full image keeps its aspect ratio; its 2× capture density is respected in Actual size (2056×347 CSS pixels), rather than doubling the UI's apparent size. The earlier two uploads were not incorporated. All other entry images and original assets remain unchanged pending agreement on this sample.

Live's temporary zoom change was restored to 106% after native capture stopped responding. No new native capture was obtained; this sample is user-supplied. The earlier review below describes the preceding state.

Sample checks passed: exact match to the final uploaded file, PNG dimensions, one-entry-only assignment, unchanged sizing for the old captures, and the existing atlas tests. In the 863px preview, the complete image fits without cropping; Actual size renders at 2056px with horizontal scrolling confined to the viewer. Labels are readable in that mode, not at the small whole-frame preview size. No browser warnings/errors were reported. This is a review candidate, not approval to roll it out elsewhere.

The preview process had stopped while the page remained open, so new image loads could fail even though the atlas interface was still visible. The local preview was restarted on the same port.

All six original JPEG files were reviewed. The remaining image-quality limit is in those source files: full Live windows are only 1224–1225 pixels wide, leaving very few pixels per control label. No replacement captures have been claimed. Permission to temporarily enlarge Live's interface for a sharper capture pass was requested and remains pending; no zoom preference was changed.

Display repairs completed:

- Replaced the height-constrained SVG crops with proportional HTML image frames. Neighboring portions of the window cannot spill into a narrow crop, and images are not automatically stretched past their source size.
- Replaced the thin, nearly full-width transport strip with two separate frames: timing controls, and playback/recording controls.
- Added a complete Clip View frame, including properties and velocity, while retaining the separate four-note detail.
- Fit mode preserves the whole frame within the viewer. Actual size scrolls inside the viewer, leaving Close accessible. Both modes retain the untouched full-window source.
- Failed images show a retry state instead of an unexplained blank crop.

There are now eleven screenshot views across the six source files. Each was opened and checked for a successful image load, correct proportions, and accessible viewer controls. Full-window and actual-size scrolling were also checked at 420px; the responsive override was restored. No browser warnings/errors were reported in the final review. The crop-boundary tests and the existing 80-entry checks pass. Source-quality recapture is still outstanding, not solved by CSS.

## Native captures · September 21

Six unaltered JPEG screenshots were captured directly from the user's running Ableton Live on macOS. Images are 1224×768 or 1225×769, as returned by native capture. Originally displayed with SVG view-box crops, they now use the proportional HTML framing described above, without redrawing or altering the original UI. The viewer offers detail/full-window context and fit/actual-size viewing. No coursework images or synthetic Live interface images were used.

- `live-session.jpg`: original empty Session View, with two MIDI tracks, two audio tracks, Returns, and Main; also supplies the mixer and transport crops.
- `live-arrangement.jpg`: the same empty Set in Arrangement View.
- `live-search.jpg`: Browser search for Drift with the native instrument at the top of the results.
- `live-drift.jpg`: Drift loaded on the first MIDI track.
- `live-device-chain.jpg`: Drift followed by Utility, also supplying Utility's close-up.
- `live-midi-clip.jpg`: an original one-bar clip, C3–E3–G3–E3 as quarter notes, with Fold enabled.

The initial frozen-capture issue resolved when the user asked to retry. The new screenshots were visually verified against the accessible controls. The first track now contains Drift, Utility, and the original four-note Session clip; it is unarmed and stopped. These additions remain in the unsaved Untitled Set. No existing music was overwritten, no audio was recorded or played, no preferences were changed, and no `.als` file was saved. Live's pending update was not applied.

The MIDI example was made in Live with double-click note insertion, arrow-key pitch movement, Shift+Right length changes, and Cmd+D duplication; selected pitches and timings were checked in the accessibility state. Search and editing examples are small optional reference snippets, not assigned homework. Windows labels come from the manual mapping and were not tested in this macOS session.

Capture UI checks passed for image loading, detail/full-window context, fit/actual-size, Close, Escape and focus return. At 420px the updated viewer fit within the viewport and the full page had no horizontal overflow; actual-size scrolling remained inside the viewer. Browser errors/warnings were empty and the viewport was restored. JavaScript syntax checks passed.

No `.als` files, required homework, shared notes backend, or progress scoring was made. Those are not prerequisites for judging this fresh structure.

## Navigation pass · September 21

The earlier selector-above-detail layout is replaced. At widths of 640px and above, a compact topic index and a larger reading pane share the available window height. Each scrolls independently. Choosing a topic resets only the reading pane, retains keyboard focus on its selector, and does not scroll the page. On narrower screens, a grouped native topic picker stays above the reading pane. All 79 entries at the time remained reachable; the consolidation above now provides 80. Overview cards are smaller and no longer use decorative selector diagrams; the Origins chronology and software relationships are retained in compact form.

Workspace uses text selectors and real screenshots, not the earlier schematic/faux-DAW controls. Source links, flags, screenshot enlargement, and Mac/Windows labels remain. Topic URLs include the selected entry so back/forward can restore it.

Checks: side-by-side panes at the normal 863px panel and the 640px boundary; persistent picker at 420px; no page overflow at those sizes; no page jump when selecting the bottom Workspace item or changing mobile topics; selected-entry back/forward restored the correct detail; all five territories opened. No Live session changes were made in this UX pass.

## Earlier draft checks

Before the navigation rework, all five territories, Mac/Windows labels, keyboard activation, entry details, and adding/reloading/removing a test flag were checked. The test flag was removed. JavaScript syntax and the 79-entry source/link registry passed static checks. The old workspace schematic and horizontally scrolling signal drawing have since been replaced as described above.

## Arm loop revision · September 21

Replaced the slow one-click demonstration with a **two-second on/off loop**, using a new real native capture. The 1.5-second action segment (6.05–7.55 seconds in `../capture-tests/arm-toggle-source.mov`) is cropped and retimed to two seconds by `prepare-arm-loop.swift`. The exported `assets/arm-toggle.mp4` includes both actual clicks, not a reversed click or simulated button state. Off/on/off frames were checked before export. Earlier source footage is retained.

The player still requires Play and still pauses when closed or left; once playing, it now repeats. Its labels and description match the shorter clip. Live was returned to stopped, all tracks unarmed, and the original empty-slot selection. No notes, devices, preferences, or Sets were changed. Static tests and local-server media/range checks pass; browser playback reports exactly 2 seconds and looping enabled.

## Record MIDI pilot · September 21

The `#clips/record-midi` entry now has a small, original action reference for recording a Session MIDI clip: Instrument, Input, Arm, Record, Listen. It is deliberately one route, not a conversion of the whole manual. The existing atlas shell, 80 entry IDs, saved flags, and every other entry remain in place.

- Only the selected action is shown. Action tabs remain available while the detail pane scrolls. Mouse, Tab, arrow keys, Home and End work; selecting an action is not tracked as lesson progress.
- Actions have a short instruction and observable result, relevant Mac/Windows shortcuts, native screenshots, and two optional in-place disclosures. Sources link to the pertinent official manual sections. No manual prose, diagrams, or screenshots were reproduced.
- Arm includes matched Before/Armed views and one real, silent recording (now the two-second loop described above). Player controls stay outside the picture so they cannot cover the Arm button. A visible description supplies the video's full informational equivalent. Nothing autoplays. Closing the recording, choosing another action, leaving the entry, or hiding the page pauses it.
- The other four actions currently use still images, not videos. The Listen image is explicitly labeled as the existing example clip, not a recording made during this pilot. Arrangement recording, external controller setup, overdubbing, and further devices are not new completed coverage.
- Sources checked: Live 12 manual, Recording New Clips; Routing and I/O; Working with Instruments and Effects; Live Keyboard Shortcuts; Live Concepts; Editing MIDI. The Arm instruction accommodates a track already armed by instrument loading. Windows labels are documented mappings, not a Windows UI test.

New media: `assets/native/record-unarmed.png` and `record-armed.png` are unaltered 4112×2580 native PNGs. Their five detail frames are CSS crops. `assets/arm-track.mp4` is a 468×320 crop of an actual native window recording, approximately 250 KB, displayed near its original UI size. The source recording and reproducible crop script are retained privately in `../capture-tests/`. No microphone or system audio was recorded. The original Live track was briefly armed and then disarmed; playback never started, notes/devices were not edited, and no Set or preference was saved.

Checks: `node atlas.test.cjs`, `node record-midi.test.cjs`, and `node serve.test.cjs` pass (the server test uses the running local preview). Syntax checks pass. Browser checks covered all five actions, disclosures, Mac/Windows switching, keyboard tabs, matched before/after states, image enlargement, actual video decode/playback, close/leave pause, browser history, the help link back to Arm, and the 420px layout without horizontal overflow. Normal viewport restored, flags still zero, no browser warnings/errors. The local server explicitly allowlists the new media and supports video byte ranges; private research and capture sources are not served.

Review the pilot before extending this model to the rest of the manual.

## Local preview

Run `LIVE_ATLAS_PORT=54868 node serve.mjs` from this directory. The server binds to `127.0.0.1` and serves only the atlas HTML, styles, scripts, and explicitly allowlisted media. It does not expose this README or the private research library. Preview: <http://127.0.0.1:54868/>.

For a lesson on the same Wi-Fi, run `node serve.mjs --lan` instead. It listens on the local network on port 80, so no port number is needed, and prints addresses the other laptop can open, such as `http://atlas.local/`. That name is advertised only while the server runs; the Mac's own name is unchanged. Public Wi-Fi usually blocks device-to-device connections, so use Tailscale there. If port 80 is busy, it falls back to 54868. The allowlist is unchanged, so private notes and research files still return 404. If macOS asks whether Node may accept incoming connections, choose Allow. Stop the server after the lesson.

This is plain HTML/CSS/JavaScript. No Sites workflow, site registration, hosting configuration, deployment, dependency installation, or public publishing was used. Fonts use the same Google Fonts families as the Piano Atlas, with local fallbacks.
# Existing-entry reference expansion — September 22, 2026

The next manual-backed pilot now covers all **71 current software entries**:
70 compact new reference layers in `entry-reference.js`, plus the existing
five-action Record MIDI pilot. The nine Origins entries retain historical
sources, bringing the unchanged atlas total to 80.

Each new layer contains a short original operation, expandable control/concept
details, a context/troubleshooting note, and a specific official manual section.
All three disclosures start closed. Mac/Windows switching is available inside
non-Workspace inspectors and preserves open sections. No new routes, required
exercises, student-state fields or videos were introduced.

The Arm images, MIDI Input image and existing Arm loop now show only one track.
Original captures and video media remain unmodified; framing is presentation-only.

Run `node reference.test.cjs` for complete current-entry coverage, and add
`--online` to check official section anchors. See `REFERENCE_COVERAGE.md` for
coverage boundaries and remaining work. This is not a claim of full-manual or
exhaustive device-parameter coverage.
