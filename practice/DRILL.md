# Navigation shortcut probe

Open `practice/launch-drill.command` for the local preview, or run
`node practice/preview.mjs`, then open
<http://127.0.0.1:54869/practice/drill.html>.
`PRACTICE_PORT` changes the public preview port. The wrapper starts the existing
atlas preview on an ephemeral loopback port and forwards its allowlisted files.
Stop the wrapper to stop both servers. The atlas build and published site are unchanged.

Ten source-row selectors cover view switching, panel visibility and view focus.
Action text and Mac combinations are read from `manual-data.js`; card homes
come from `shortcut-explorer.js`, under Workspace → Navigation → Shortcuts → Move around.
The source's alternate combinations are also accepted. There is no copied key database.

Focus **Press keys** to check a combination. **Escape** returns focus to Next;
Tab navigates page controls outside the key button. Previous and Next cycle
through the actions without recording results. A matching key shows `yes` and
the source combination; another key shows only the source combination.
There is no automatic advance or persistent state.

This checks recall only. It cannot test Live's response, focus or view state.
The Tab behavior depends on Live's Use Tab to Move Focus setting. macOS or a
browser may intercept a combination before the page receives it, especially F12.
The probe needs only a local browser; it does not require Live Suite or Max for Live.

Check source integrity and exact modifier handling with `node practice/drill.test.cjs`.
ES2020 parsing and absence of Array.at check the requested syntax floor;
they do not substitute for a run on the student's Safari 13.1.

Checked on this Mac in Safari: all ten primary combinations displayed `yes`
with their atlas key. A wrong letter displayed only `Tab`. Escape moved focus
to Next. The linked Jump to a view card opened in another tab with Navigation
selected. Screenshots are in `tmp/drill-tab-yes.png`, `tmp/drill-browser-yes.png`
and `tmp/drill-focus-yes.png`.
