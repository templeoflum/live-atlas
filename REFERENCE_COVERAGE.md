# Existing-entry reference pilot

Reviewed September 22, 2026 against the current official Live 12 manual.

This is an expansion of the existing atlas, **not a completed conversion of the
whole manual**. The 80 entry IDs and their navigation homes are unchanged.

## Coverage

| Territory | Existing entries | This pass |
| --- | ---: | --- |
| Workspace | 11 | Short operations, expandable details and notes, section links |
| Clips | 10 | Nine new reference layers; the five-action Record MIDI pilot retained |
| Devices | 30 | Four signal-flow entries and 26 individual devices/Racks |
| Sets | 20 | Short operations, expandable details and notes, section links |
| Origins | 9 | Historical sources retained and reviewed; no invented software workflows |

`entry-reference.js` is the entry-by-entry coverage index: each record names the
exact official section, the example operation, the terms explained, and a note
about context or a likely point of confusion. `record-midi.js` indexes the pilot’s
five actions independently. No content was imported verbatim from the manual.

The atlas keeps its own organization and original examples. A linked manual
section remains the authoritative reference for options outside each compact
entry. Device entries are introductory references, not exhaustive parameter
catalogs. Available devices and panel layouts vary between editions and Live 12
point releases.

## Interaction

- Existing entry overview and native screenshot remain visible first.
- A named operation opens two or three concrete steps in place.
- Details/Controls and Notes open independently and start closed.
- Mac/Windows switching changes key labels without closing opened details.
- Entry selection, routes, flags, local storage, image enlargement and the
  compact desktop/mobile topic selectors remain intact.
- No new videos, tracking, required exercises, prescribed routes or lesson files.

## Images

68 of 80 entries have native stills, including all 26 individual devices/Racks.
The 12 intentional text-only entries are Undo, Save a Set, Collect All and Save,
and the nine historical entries. Their rationale remains in `captureExceptions`
in `atlas.js` and is tested; these are not missing assets.

Arm and MIDI Input now display one channel only. The existing two-second Arm loop
is also visually cropped to that channel. Its original media file is preserved.
Before/Armed stills have matching framing. No new Live recording or edit was made.

The other existing stills illustrate the relevant panel or example; they are not
claimed to document a newly performed take. For example, the Record Audio still
shows an unarmed input strip, and the MIDI note example is the approved four-note
clip. Quantize instructions explicitly account for the pictured Auto control.

## Verification

```sh
node atlas.test.cjs
node record-midi.test.cjs
node reference.test.cjs
node reference.test.cjs --online
node serve.test.cjs
```

The online check verifies HTTP responses and actual fragment IDs, not just URL
syntax. It covers both reference modules. The server test requires the local
preview to be running and checks that internal reports/tests stay unserved.

Browser review covers all 70 new reference entries, the existing Record MIDI
pilot, native images on representative small and wide panels, disclosure keyboard
operation, platform switching, and narrow-screen behavior. Source verification
does not imply that every hardware-dependent operation was performed in Live.

## Next boundary

Review this existing-entry pilot before expanding the catalog. The eventual
whole-manual pass needs a section-level inventory that distinguishes mapped,
partially mapped, and not-yet-mapped material. Do not mark an entire chapter done
because one atlas entry links into it.

Later work includes the remaining devices and shortcuts, deeper parameter-level
reference, and the unmapped subjects such as comping, grooves, MPE, tuning,
advanced routing, synchronization, Max for Live, and Push. Exact-action stills
and 1–3 second video loops can then be produced against stable instructions.
