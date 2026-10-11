# Navigation, lesson traces and shortcut practice

**24 September 2026:** the trace is now simple and belongs to whoever is using the browser. Recording happens only between **Start session** and **End session**. That button sits in the header on every page and shows a red dot while a session runs; the Flags tab repeats the controls. A running session survives a reload. Ending a session clears the trace but keeps flags. During a session, opening a working card records it once (neighborhood choice cards are skipped). The Flags tab lists every traced card by territory in atlas order, with a ⚑ toggle on each row and an All visited / Flagged filter. Flags are the path. Flags on individual actions also appear, under their card's name. There is no teacher record or export yet. Where the sections below conflict with this, they are superseded.

23 September 2026 · Shared navigation implemented across all four territories; lesson trace/path and training remain proposals.

## Current implementation

- Workspace, Clips, Devices and Live’s History use fixed neighborhood selectors and choice cards. The lower scrolling lists are no longer part of the active layout.
- Workspace maps places within its existing families; Devices maps its full catalog within existing sonic families; History maps articles within periods/people. Clips maps directly to actions within its existing topics, without adding another category layer.
- Working cards retain their action bars/content and have a neighborhood return link. Manual references, historical articles, shortcuts, flags and exact action routes remain accessible.
- Previous/Next follows each section’s full card sequence, crossing neighborhood boundaries in sidebar order. Only the section’s first and last cards stop. History’s header and footer use the same sequence; the neighborhood return link still takes you to the current neighborhood.
- Back follows actual card visits, skipping Overview and Flags, and restores the card's reading position. Native browser back/forward is supported within the current visit.
- Hold keeps up to three exact cards/actions with independent reading positions. Each short tab (for example, **Simpler**) toggles a reader over the current card; a second click or Escape closes it. Selecting another held tab switches the overlay. The current card, URL and Back history stay untouched. Tabs remain reachable across territories, Overview and Flags. Each has its own release button. A fourth hold is disabled until one is released; the same exact card cannot be held twice.
- This navigation memory lasts only until reload/closing the page. Nothing becomes a lesson record or student assignment; existing flags are untouched.
- Max for Live/VST feasibility is recorded in [Shortcut trainer R&D](SHORTCUT_TRAINER_RND.md). No device or plug-in has been built.

## Observations that prompted the pilot

- Selecting a device neighborhood changes the sidebar list but leaves the previous card open. The inspected view had Distortion selected while Simpler remained in the reader.
- The shortcut explorer already makes choices inside the card: Move around opens Switch views, Make room, Move focus and other concrete actions.
- The application had browser history and persistent local flags, but no held-card slot. It still has no lesson trace, curated lesson package or student collections.
- Earlier specifications disallowed silent persistent activity tracking. The requested lesson trace is a new, explicit teacher-started workflow, not permission to collect all browsing or infer learning.

## Original pilot rationale

Keep the top territories and fixed neighborhood controls. Replace the lower place/device list in one test area with a neighborhood landing card, using the shortcut explorer's choice-card pattern.

Selecting a neighborhood opens its landing card immediately. It contains one short description of its territory and a small set of named destinations, with a brief distinguishing phrase where needed. It is not an introductory essay, a recommended route, or an automatically selected first device.

Example: Samplers → “Play recorded sound from notes.” Destinations: Simpler — one sample; Sampler — map samples across keys and velocities. These lead to the existing device cards and action bars. The controls and explanations inside those working cards remain visible as they are now.

Keep a clickable neighborhood label on the working card. That returns to the neighborhood; Back returns to the actual previous card. Those can be different destinations.

The initial Samplers and Distortion pilot was accepted and then extended to all views at the user's request. Keep testing whether moving choices into the card improves orientation without making switching between related cards laborious; do not restore a second full catalog by default.

## Four separate meanings

| Control / record | Meaning | Persistence / sharing proposal |
| --- | --- | --- |
| Back | Return to the last visited card, including its action and reading position | Ordinary navigation, available without a lesson |
| Hold | Peek at up to three chosen cards over the current card without navigating | Short tabs toggle one overlay at a time; release individually; reload clears them |
| Trace | Every working card opened, once each | Implemented 24 Sep 2026: recorded only during a started session, cleared by End session, listed on the Flags tab in atlas order |
| Path | The cards you chose | Implemented as flags: the Flags tab's toggle, or the card's own flag button |

Opening a held card does not release it or add a visit to Back. Closing its overlay reveals the untouched current card. Reading positions are independent. Following an actual destination within the held card closes the overlay and navigates normally; merely toggling the tab never does. Holding is not flagging, teaching, or assigning practice. The limit is three, with no automatic replacement.

## Lesson trace → selected path → student collection

1. Teacher explicitly starts a lesson record. Show its active state and provide pause/end controls. Ordinary browsing outside a lesson is not logged persistently.
2. Record card arrivals in order, including the exact device action or shortcut branch. Repeated visits may remain visible; ignore refreshes, scrolling, platform switches and other actions that do not open a different card. Do not turn dwell time into an importance or mastery score.
3. During or after the lesson, the teacher can mark a visited card **Keep for student**. The trace is a review surface, not a required constant sidebar.
4. Review the kept cards as a separate path. Remove, reorder and optionally annotate them with short student-readable notes. Repeated visits do not produce repeated copies in the package. Preserve the original trace separately.
5. Preview the handoff. Include only the selected cards and explicitly student-facing notes, never incidental browsing, private preparation or other students' records.
6. Add the path to the student's collection without replacing earlier paths or notes. Each lesson keeps its context while the collection accumulates unique concepts. A readable recap must remain available even if the student does not import or open anything.

The path's order recalls or organizes the lesson; it is not a locked sequence or required homework. Selecting one device action should not silently assign every action for that device. Necessary navigation/context may be available without being marked as taught.

Reuse the flag visual language, but label lesson selection explicitly. Existing curiosity flags must not be silently reinterpreted or exported. Exact treatment of the current Flags screen remains a design decision.

Initial handoff experiment: a local export/import with a readable recap, using stable entry identifiers and a content revision. Preview additions and merge without duplicates; never overwrite student notes. No accounts, cloud syncing, messaging, publication or real student data are part of the prototype. Delivery medium and retention/backup policy must be settled before real lessons depend on it.

## Shortcuts: shared access, separate practice experiment

Proposal: make **Keys** a consistently reachable utility across territories, with the relevant action nearby on each working card. Keep the current full action explorer as its reference view. Practice could be a second view inside Keys rather than a fifth content territory. Reference and practice use the same checked shortcut records.

Explore two small modes before choosing a training design:

- **Rehearse here:** an explicitly entered practice area asks for a concrete movement; optional hints reveal the keys. Test key conflicts, focus, layout and accessibility. Do not intercept shortcuts globally throughout the atlas or trap Tab/Escape. This rehearses a gesture, not the complete Live workflow.
- **Do it in Live:** a small cue stays available while the learner performs the actual operation. Start with switching views, showing/hiding the Browser and finding/loading a sound. The teacher or learner confirms the result; the atlas does not claim to observe Live.

Prefer the actual-Live experiment first, given the learner's goal of software fluency and the existing rejection of imitation Live interfaces. Try a handful of movements inside a short musical task, not a quiz on every shortcut. No countdowns, streaks, completion gates or assumed between-lesson practice.

### Verified constraints

Keyboard events in a webpage target its focused element. Ordinary page listeners are not evidence that a command was performed in another application. Keyboard Lock has limited browser availability and operating-system constraints; it is not a universal solution to shortcut interception. [MDN: keydown](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event), [MDN: Keyboard Lock](https://developer.mozilla.org/en-US/docs/Web/API/Keyboard/lock).

Live's shortcut behavior depends on platform, focus and settings. Tab navigation and the Computer MIDI Keyboard change the meaning or availability of some gestures. Practice must teach the relevant starting state, not only a key combination. [Live keyboard shortcuts](https://www.ableton.com/en/manual/live-keyboard-shortcuts/), [Accessibility and keyboard navigation](https://www.ableton.com/en/live-manual/12/accessibility-and-keyboard-navigation/).

These are interaction hypotheses, not evidence of improved retention or muscle memory. Observe actual use before making that claim.

## Small, ordered experiments

1. **Orientation — now extended:** shared neighborhood cards, Back with position restoration, and three Hold slots. Review the full navigation before starting lesson records. Check that a learner can identify where they arrived, switch between related cards and return after several detours.
2. **Lesson handoff:** use a fictional lesson trace; keep only a few actions, add a short note, preview/export, and merge into a blank then an existing test collection. Verify that discarded visits and private notes stay out and importing twice creates no duplicate concepts.
3. **Shortcut practice:** rehearse a small navigation sequence in Live, then compare a browser rehearsal if useful. Record teacher observations of friction and recovery, not automatic claims of mastery.

Do not simultaneously rebuild the whole atlas, introduce student accounts and launch a training system. Evaluate the shared card-navigation pattern first; the trace and path can then refer to the same stable destinations.
