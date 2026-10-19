# Practice routes

13 Oct 2026 · T-0405 · A map, not probe results: nothing was built or tried in Live.
**[seen]** checked on this Mac · **[doc]** a source says so · **[guess]** unchecked inference.

**Her Mac decides first.** Live 12 needs macOS 11 or later [doc 1; seen: the 12.4.6 app declares macOS 11]. Live 11 runs on Catalina on Intel Macs [doc 1]. Sets saved in a newer Live, even a newer point release, don't open in an older one [doc 2]. So a Set for Live 11 has to be made in Live 11.

| Route | What it can sense | Her Mac and edition | Atlas data | Effort |
|---|---|---|---|---|
| **Live Set** | Nothing. Cues sit in track and clip names and Info Text; Hedawn watches. | Any edition. Saved in her version or older [doc 2]. | Terms and keys copied from `vocabulary.js` (63 terms) and the shortcut table (292 rows) [seen]. | Small |
| **Max for Live** | Live's state as it changes: Session or Arrangement view, the selected track and the devices on a track. It can ask whether the Browser is showing [doc 3]. It can't tell which key caused a change. | Suite, or Standard with the add-on [doc 4]. | Cue list generated from the shortcut table [guess]. | Medium |
| **Extensions** | Started from a right-click menu. It can read the whole Set while it runs, then stops [doc 5]. Nobody has shown it watching her moves continuously. | Live 12 Suite 12.4.5 or later, in Ableton's beta [doc 5]. Not on Catalina. | Can open a web view, which could show an atlas card [seen in the binary; guess on use]. | Medium–large |
| **Separate trainer** | Key presses in its own browser window only; nothing in Live [doc 6]. | A browser. The atlas already has Safari 13.1 support for older Macs [seen]; untried on her laptop. | Reads the shortcut table and vocabulary directly [seen]. | Small–medium |

## Smallest probe each

- **Live Set:** 4 tracks whose names are cues ("Show the Browser"). Each clip's Info Text holds the key. Hedawn watches.
- **Max for Live:** one device shows a cue, notices the view or track change and says "seen". It has Show keys and Next, and no score.
- **Extensions:** one right-click action, "What is this called?", that opens the atlas card for that thing. It needs a beta sign-up, which is Hedawn's call.
- **Separate trainer:** an atlas page that names an action and listens for its keys, to count which shortcuts collide with browser ones.

## Recommended order

1. Find out her macOS version, Live version and edition.
2. Try the Live Set and the Max for Live device together, in her Live version. Only this route can tell she made the move.
3. Try the trainer if the keys turn out to be the sticking point.
4. Leave Extensions until last: it's beta and Suite-only, and it can't watch her.

## Sources

1. Ableton, [Live Minimum System Requirements](https://help.ableton.com/hc/articles/115001663530) and [Mac Compatibility](https://help.ableton.com/hc/articles/115001261150)
2. Ableton, [Backward Compatibility](https://help.ableton.com/hc/en-us/articles/360000841004-Backward-Compatibility)
3. Cycling '74, LOM [Application.View](https://docs.cycling74.com/apiref/lom/application_view/), [Song.View](https://docs.cycling74.com/apiref/lom/song_view/), [Track](https://docs.cycling74.com/apiref/lom/track/)
4. Ableton, [Buying Max for Live](https://help.ableton.com/hc/en-us/articles/206407124)
5. Ableton, [Extensions](https://www.ableton.com/en/live/extensions/) and [Extensions FAQ](https://help.ableton.com/hc/en-us/articles/27303428331420-Ableton-Extensions-FAQ)
6. MDN, [keydown](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event)
