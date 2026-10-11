# Take stock · what the atlas is today

11 October 2026 · written by claude for T-0129 · a proposal for Hedawn to agree or correct

How this was checked: the live page at templeoflum.github.io/ableton-atlas was
downloaded and compared byte for byte with `../site` (all 41 scripts and styles
match; 12 sampled images load). `../site` was compared with this folder. The
content counts come from loading `atlas-model.cjs`, the same model the page uses.
Topic checks searched the card text in the scripts. I did not click through the
page in a browser and did not run the test suite.

## 1. What the atlas covers today

The live page has four tabs plus Overview. It matches `../site`, last pushed
28 Sep ("Rename Live's History to History").

| Territory | What is there |
| --- | --- |
| Workspace | 8 families (Navigation, Browser, Session, Arrangement, Mixer, Routing, Files, Settings & controllers), 41 places, 188 action cards. Push 1 and Push 2, video, sync, accessibility, and audio/MIDI behaviour have their own places. |
| Clips | 10 areas (Clip View, Recording, Notes, Time & groove, Audio, Warp, MIDI tools, Expression, Launching, Takes), 73 action cards. |
| Devices | 14 groups, 89 device or topic places, 232 action cards. The whole Live 12 catalogue is covered: 13 instruments, 42 audio effects, 8 MIDI effects, 4 Racks and 18 Max devices. |
| History | 9 periods plus People, 60 cards, from Monolake (before 2001) to 2026. Images are version-matched, from old manuals and archives. |
| Across all tabs | Find (topics, devices, shortcuts). Mac/Windows keys. Underlined vocabulary. Flags, and a "trace" kept while a session is on. 1,137 credited images, all official manual figures or history sources. None are Hedawn's own screenshots. |

All 1,051 headings in the Live 12 manual have a card in the atlas. I re-ran
`manual-card-audit.cjs` today and it reports 0 headings without one. That
counts where topics live, not how deep the text goes.

## 2. What is unfinished

- **Live page is behind this folder.** The 28 Sep Live 7 Drum Rack history image is in `history-images-data.js` here but not on the live page. The live image file returns 404.
- **Vocabulary meanings were never reviewed.** README › Vocabulary: "still need a review pass".
- **9 history cards have no image**: Live 1.5, Live 2, training, Max, the Live 8 quality issue, community devices, 64-bit, CV, accessibility. Source: `historyImagesData.gaps`.
- **History research list is open**: Live 1 launch artifacts, Share's outcome, Push engineering and more. Source: HISTORY_RESEARCH › Further research.
- **One manual figure is missing.** The Windows VST folder figure returns 404 at Ableton. Source: MANUAL_IMAGES › Upstream exception.
- **Image rights are not cleared, but the atlas is public.** MANUAL_IMAGES and HISTORY_RESEARCH both say to check permissions "before public distribution". The site is now public.
- **No action-specific images or loops.** Your own stills and the Arm loop were removed. Many cards reuse a general manual figure. Source: CLIPS_MAP › Remaining image work, MANUAL_IMAGES.
- **The content review was a triage, not a full check.** 88 flagged sections are left, judged mostly harmless. Source: MANUAL_CONTENT_REVIEW › Text review.
- **Status docs disagree with each other and with the page.**
  - README says nothing was published (Local preview section), still describes a Sets tab and 80 entries, and says "No history expansion has started".
  - WORKSPACE_MAP says Push, video and sync are still source-only.
  - MANUAL_COVERAGE still lists 508 reference-only sections.
  - Newer files (MANUAL_CARD_AUDIT, MANUAL_CONTENT_REVIEW) supersede all of these.

## 3. Lesson 1 against the atlas

| Lesson 1 topic | In the atlas? | Where | What is missing |
| --- | --- | --- | --- |
| Interface basics | Yes | Workspace › Navigation (Views, Control bar, Editing, Shortcuts) | No single "first look at the whole window" card |
| Session vs Arrangement | Yes | Workspace › Navigation › Views; Session and Arrangement families; vocabulary | Nothing obvious |
| Clips vs devices | Partly | Split into the Clips and Devices tabs; Clip View and Device View cards (Shift+Tab); vocabulary meanings | No card that sets the two side by side |
| Operator, and what an oscillator is | Partly | Devices › Synths › Operator: 5 action cards (algorithms, waves, envelopes, filter, voices) | Operator assumes you know what an oscillator is. The only definition I found is the two words "Sound sources." There is no vocabulary entry. |
| Using Spectrum | Yes | Devices › Spectrum: Inspect/zoom and Resolve/smooth | Nothing obvious |
| Recording MIDI from the computer keyboard, in Session | Yes | Clips › Recording › Record MIDI (press M, the A–L row, Z/X for octaves) | Nothing obvious |
| …and in Arrangement | Partly | Clips › Takes › Record passes; Arrangement Record text in the recording guides | The computer-keyboard steps sit only in the Session card. No card walks through an Arrangement MIDI take start to finish. |
| Searching for and placing devices with shortcuts | Yes | Workspace › Browser › Search and Load (Cmd/Ctrl F, arrows, Enter); Devices › Presets (Q hot-swap); show/hide Browser | Nothing obvious |
| History of Live | Yes | History tab | See section 2 |

## 4. Where the older drafts disagree with the atlas as built

These are agent drafts from 20 Sep. Keep or drop each line.

- SPEC: the teacher writes lesson notes, and the student sees them through the atlas. **Built:** no lesson notes at all.
- SPEC/ATLAS_OUTLINE: six views (Studio, Actions, Devices, Sound & Form, Approaches, Lineages). **Built:** Workspace, Clips, Devices, History.
- SPEC/ATLAS_OUTLINE: a map is the main surface, with labelled connections and personal routes. **Built:** lists and cards, with Find and links between cards.
- SPEC: the history is anchored on *Headlock* and *Lost Weekend*. **Built:** a history of Live itself, with neither anchor.
- SPEC/CURRICULUM: musical topics such as listening, form, space, balance, "make room". **Built:** Live's controls only, plus History.
- SPEC: original audio comparisons, demo Sets, and your own screenshots. **Built:** none. Only manual and history figures.
- SPEC: "every device within a declared supported Live/edition/Pack inventory". **Built:** the Live 12 manual catalogue. No edition or Pack list is declared.
- CURRICULUM: 42 concept IDs, three lesson guides and sample entries. **Built:** none of these. The non-goals say no curriculum.
- SPEC: no persistent activity tracking. **Built:** a trace of opened cards, saved in the browser while a session is on.
- BUILD_PLAN: an "unpublished prototype" until release checks pass (phase 6). **Built:** published, with the rights checks still open.

## Is this done already?

1. Should the 28 Sep Drum Rack history image be on the live page? The live page doesn't have it yet.
2. Have the image rights been settled in some way these files don't record?
3. Has anyone reviewed the vocabulary meanings since 24 Sep?
4. Is the session trace a tool you use in lessons? If so, it doesn't count as "activity tracking".
5. Did lesson 1 use the atlas on screen? If it did, did a missing oscillator explanation or Arrangement recording card come up?
6. Do you write lesson notes anywhere? If so, SPEC's lesson-notes idea is settled outside the atlas.
