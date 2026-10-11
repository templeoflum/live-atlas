# Shortcut practice inside Live

23 September 2026 · Feasibility research, not a working device. Documentation checked; no in-Live API/focus tests run yet.

## Direction

Try Max for Live first. A small guide could present an action, offer the keys when requested, and notice selected changes in the real Live interface. That is closer to the intended skill than typing answers in the atlas. Keep the atlas as the map and reference; do the movement in Live.

This is a recommendation based on documented capabilities, not a claim that every Live shortcut can be monitored. Detecting an outcome does not establish whether it came from the keyboard, a mouse, a controller or another device.

## Observable candidates

| Exercise | Documented signal | Boundary to test |
| --- | --- | --- |
| Switch Session / Arrangement | `Application.View.focused_document_view`, observable | Which Live window is focused; second-window setups |
| Hide / reveal the Browser | Query `Application.View.is_view_visible("Browser")` | Requires querying, not a documented change observer; does not detect search focus |
| Select another track | `Song.View.selected_track`, observable | Selection changes, not which navigation key caused them |
| Arm / disarm the chosen track | `Track.arm`, observable; check `can_be_armed` | Observe an explicitly chosen eligible track, not an assumed track number |
| Find and load a device | `Track.devices`, observable | Confirms a device was added, not that search was used; identify the expected device and baseline |

Primary references: [Application.View](https://docs.cycling74.com/apiref/lom/application_view/), [Song.View](https://docs.cycling74.com/apiref/lom/song_view/), [Track](https://docs.cycling74.com/apiref/lom/track/).

Do not use `browse_mode` as Browser visibility: it means Hot-Swap Mode. The documented view list includes Clip and Device Chain, but visibility is not proof of focus or of a Shift–Tab gesture. Cmd–F/search-field focus and arbitrary keystroke detection remain unverified. Let the learner confirm these steps until a real test establishes a reliable signal.

## Why not start with VST?

VST3 supplies a plug-in view and host-delivered keyboard callbacks; those callbacks are not documented as a global stream of Live's shortcuts. Steinberg explicitly warns that incorrect event handling can block host commands. A portable VST trainer would need additional host-specific integration to offer the Live-state checks above. M4L already provides the relevant Live Object Model. [VST3 IPlugView](https://steinbergmedia.github.io/vst3_doc/base/classSteinberg_1_1IPlugView.html).

Max's `key` object reports keyboard input, but its reference does not establish reliable detection of all Live shortcuts while focus remains in Live. Do not promise that, intercept commands, or introduce OS-level keyboard monitoring as a workaround. [Max key reference](https://docs.cycling74.com/reference/key/).

## First device experiment, if approved

1. Use an empty practice Set and a non-processing M4L device. Begin with switching views, hiding/revealing the Browser, and selecting tracks. Keep arming/loading for a second test.
2. Display one concrete cue with optional **Show keys**, **Again**, **Next** and **Stop**. No timer or score. Read the initial state before watching for a new change; do not count an already-correct state as a performed action.
3. Test whether a small cue window can stay visible while keyboard focus remains in Live. A device panel may disappear during Clip View work; a floating window may take focus. Resolve this before designing a larger exercise library.
4. Observe results only. Never execute the target command on the learner's behalf, start recording, delete material, or silently change routing/monitoring.
5. Include manual confirmation and unsupported-state messages. Label feedback as an observed result, not proof of shortcut use or mastery. Stop observation when practice stops; no background keystroke logs.
6. Try the same three exercises with the student and teacher. Check whether looking up forgotten keys then repeating the actual action helps the lesson flow. Do not claim retention benefits without observing them.

Future exercises can reference the atlas's stable card IDs and checked platform-specific shortcut records. Lesson paths could eventually choose the practice set, but no export/import, live link or training tab is implemented in this pilot.

## Prerequisite

Confirm the student's edition first. Custom Max for Live devices require Suite or Standard with the Max for Live add-on; Intro and Lite do not support that add-on. No purchase or license change is part of this work. [Ableton: Buying Max for Live](https://help.ableton.com/hc/en-us/articles/206407124-Buying-Max-for-Live).
