# Workspace pictures

Native window captures taken on 22 September 2026, from the open Live 12 installation. Original 2× PNGs are retained. No resampling, compositing, generated UI or altered control labels. Source rectangles are presentation crops; every picture opens at actual size with its full source window/menu available.

The six Workspace areas retain their existing structure. Pictures follow the selected action and its deeper topics. Multiple views use named image tabs with one picture rendered at a time. Before/after states illustrate Duplicate and Undo. All primary actions now have pictures.

## Capture state

- Settings were inspected, not changed. Device paths and configuration values are this machine’s examples, not recommended settings.
- A temporary copy of the empty MIDI track was undone. The original four tracks were restored, stopped and unarmed. No Set was saved, no music recorded, and no devices loaded for this pass.
- Browser preview was restored to on; Info View and Learn View were closed, and the original Utility search and empty second-track slot were restored.
- Cloud shows only its sign-in entry point. Push shows no connected unit. The MIDI-port picture shows no connected port rows. Those limitations are labeled in the atlas.

## Remaining pictures

These are genuine gaps, not counted as completed pictures. Exact source-topic keys and reasons live in `workspaceMedia.pending` and are checked by the tests.

- Splice: the existing session is signed in. Further inspection was stopped by the safety check because it could expose private account/library content. No signed-in Splice image is in the app or its server allowlist. Approval is required before further account capture.
- MIDI Track / Remote / Sync switches: need a connected MIDI device with visible port rows. Push transfer and Cloud content also need appropriate connections and permission to show content; only their entry screens are pictured.
- Pack Info: still needs its actual information panel, not the Pack list.
- User Library dependencies: needs a deliberately prepared, non-private file-reference example. No dependencies were broken for a screenshot.
- Chord Banks: no matching folder in this installed library.
- macOS menu-bar navigation: unavailable to the approved window-only capture method. Actual Live context menus are pictured separately.
- Tap / hold shortcuts: remain text-only until the deferred motion-demonstration pass.

## Workspace gesture additions — 22 September 2026

All six gaps from the Workspace audit now have action-based homes within the existing areas:

- Views → Make room: panel edges, folding devices/tracks, zooming, moving across the ruler and fitting the Arrangement.
- Editing → Select / Drag a control: selection, fine dragging, typing, cancelling and resetting values.
- Control bar → Read the feedback: Status Bar, CPU meter and disk-overload landmark.
- Control bar → Tempo: tapping and temporary nudging.
- Controllers → Assign a key / Revise a mapping / Pick up the value: keyboard assignments, limits, inversion, removal and takeover modes.
- Editing → Write a note, also linked from Info View: object-specific lesson notes.

Five additional original native PNGs illustrate the selected-note readout, folded device, typed value, keyboard mapping and original lesson note. Existing captures provide the other exact controls. CPU/disk pictures show their idle location; no overload was manufactured. The mapping example shows untouched default bounds, explicitly not recommended limits. No videos added.

Temporary keyboard mappings and note text were removed, Utility Gain restored to 0 dB, Drift unfolded, Browser returned to All with the Utility search, and the empty second-track clip selection restored. The Set remained stopped and unarmed; no music or preferences changed and nothing was saved. The extra `ws-editor-tall.png` attempt is not used or served: the native capture did not retain the enlarged editor state. The resize entry illustrates the actual divider instead of presenting a false before/after pair.

## Checks

`workspace-media.test.cjs` checks coverage, source PNG sizes, 2× metadata, valid crop bounds, image variants and explicit gaps. `workspace.test.cjs` checks both shortcut platforms and preserved routes. `serve.test.cjs` checks all served pictures and excludes research, tests and private capture paths.
