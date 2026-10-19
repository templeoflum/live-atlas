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

Focus **Press keys** to check a combination. **Enter** advances to the next
prompt and retains key capture; held Enter does not skip prompts. **Escape**
returns focus to Next. Tab navigates page controls outside the key button.
Previous and Next cycle through the same ten actions without recording results.
A matching key shows `yes` and the source combination; another key shows only
the source combination.

The workspace map connects each action to its named place. A dashed outline
marks the target before answering. A correct key changes the schematic's
visibility or focus, with text labels and border shapes as well as color.
Repeated correct keys reverse a toggle. Each new prompt resets the schematic;
it is an illustration, not an observation of Live. The Browser, the two main
views and the two detail views stay in fixed slots. Narrow windows stack the
Browser above the view pairs.

**Spoken cues** is off by default. Turning it on speaks the current action;
correct keys speak the resulting map state, and advancing speaks the next
action. Turning it off or hiding the page cancels speech. The control is disabled
when the browser lacks speech synthesis. There is no automatic advance or
persistent state.

This checks recall only. It cannot test Live's response, focus or view state.
The Tab behavior depends on Live's Use Tab to Move Focus setting. macOS or a
browser may intercept a combination before the page receives it, especially F12.
The probe needs only a local browser; it does not require Live Suite or Max for Live.

Check source integrity and exact modifier handling with `node practice/drill.test.cjs`.
ES2020 parsing and absence of Array.at check the requested syntax floor;
they do not substitute for a run on the student's Safari 13.1.

## T-0667 revision checks · 14 October 2026

Changed only this drill's visual feedback, optional spoken cues and keyboard
advance, plus its test and these usage notes. No atlas source keys or card homes
were changed.

- `node practice/drill.test.cjs` exited 0: source integrity, exact modifiers,
  alternate combinations, ES2020 parsing and mounted-interface assertions.
  The mounted test uses DOM and speech stubs, not a browser: all ten Enter
  transitions and wrap, retained focus, wrong/right feedback, reversible map,
  Escape, previous/next, silent default and speech dispatch/cancellation passed.
- `node --test shortcut-explorer.test.cjs` exited 0: one test passed; zero failures.
- The README's full 13-file `node --test` command exited 0: `# pass 13`,
  `# fail 0`.
- `node serve.test.cjs` initially exited 1 with `ECONNREFUSED` at port 54868.
  After starting a loopback atlas preview, it exited 0: `Passed: every available
  official image served with its exact byte length; active modules, archived
  pilot assets, byte ranges and private-file exclusion.` The extra atlas preview
  was then stopped; the existing practice preview was left running.
- `node --check practice/drill.js` and `git diff --check` exited 0 with no output.
- Local-preview HTML and JavaScript fetched with `curl -fsS` matched the final
  files with `cmp` (exit 0). Starting another preview returned `EADDRINUSE` on
  port 54869; the existing preview served the changed files.

Live rendering, physical browser shortcuts, audible speech, narrow-screen
layout and the student's Safari 13.1 were not verified in this run. The browser
connection was unavailable (`Browser is not available: iab`); Safari inspection
showed the board as the active page. The earlier Safari checks below are
historical, not checks of this revision. Whether the map and spoken naming help
recall remains Hedawn's hands-on judgment.

Commit and push are deferred to board installation: this board work run cannot
write git metadata. Unrelated pre-existing changes were left alone.

## Earlier probe checks · before T-0667

The previous probe record says Safari accepted all ten primary combinations,
showed only `Tab` on a wrong letter, moved focus to Next with Escape, and opened
the Jump to a view atlas card in another tab. Its screenshots were recorded at
`tmp/drill-tab-yes.png`, `tmp/drill-browser-yes.png` and `tmp/drill-focus-yes.png`.
