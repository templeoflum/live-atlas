# Full-manual integration coverage

Historical guide-count report. For current **card placement**, use
`MANUAL_CARD_AUDIT.md` and `manual-card-audit.cjs`; the older report below predates
the action-map and Workspace-family passes. The current completion order is in
`COMPLETION_PLAN.md`. Neither report certifies full parameter/text coverage.

Source: [Ableton Live 12 manual](https://www.ableton.com/en/live-manual/12/welcome-to-live/), retrieved 2026-09-22.

**Status: the full source map is integrated; the original explanation and image conversion is not complete.**

- 42 chapters and 1051 headings are indexed, routed, searchable and linked to their official sections.
- 519 source sections currently have an original atlas guide or an existing pilot entry. This is section-entry coverage, not a claim that every parameter in those sections is explained.
- 292 factual shortcut rows are available across 24 table sections. Prose-only keyboard-context sections have separate original guides.
- 508 sections remain source references without original guides. They are not counted as converted.
- 85 devices/Racks have introductory entries. 59 still need their own native panel capture. Existing approved media are unchanged.

## Remaining work

1. Write and fact-check the remaining original task/control explanations, grouped by the existing manual tree.
2. Capture relevant native stills for the new controls and workflows, beginning with the missing device panels. No synthetic placeholders or unrelated images.
3. Verify each new explanation against the installed Live release; preserve edition and point-release qualifications.
4. Review the completed image/reference layer before any further video work.

The exact pending section keys and device-image queue are in `manual-coverage.json`. Regenerate both reports with `node manual-coverage.cjs` after content changes.

## Chapter coverage

| Chapter | Atlas view | Headings | Original guide/entry | Shortcut tables | Reference only |
| --- | --- | ---: | ---: | ---: | ---: |
| 1. Welcome to Live | origins | 2 | 1 | 0 | 1 |
| 2. First Steps | workspace | 17 | 17 | 0 | 0 |
| 3. Live Concepts | workspace | 22 | 3 | 0 | 19 |
| 4. Working with the Browser | workspace | 38 | 38 | 0 | 0 |
| 5. Managing Files and Sets | sets | 38 | 38 | 0 | 0 |
| 6. Arrangement View | sets | 18 | 18 | 0 | 0 |
| 7. Session View | sets | 11 | 11 | 0 | 0 |
| 8. Clip View | clips | 37 | 37 | 0 | 0 |
| 9. Audio Clips, Tempo, and Warping | clips | 27 | 27 | 0 | 0 |
| 10. Editing MIDI | clips | 47 | 47 | 0 | 0 |
| 11. MIDI Tools | clips | 22 | 18 | 0 | 4 |
| 12. Editing MPE | clips | 9 | 1 | 0 | 8 |
| 13. Converting Audio to MIDI | clips | 8 | 8 | 0 | 0 |
| 14. Using Grooves | clips | 10 | 10 | 0 | 0 |
| 15. Using Tuning Systems | clips | 7 | 1 | 0 | 6 |
| 16. Launching Clips | clips | 14 | 14 | 0 | 0 |
| 17. Routing and I/O | sets | 25 | 25 | 0 | 0 |
| 18. Mixing | sets | 11 | 11 | 0 | 0 |
| 19. Recording New Clips | clips | 18 | 18 | 0 | 0 |
| 20. Bounce to Audio | sets | 4 | 4 | 0 | 0 |
| 21. Comping | clips | 8 | 8 | 0 | 0 |
| 22. Stem Separation | clips | 4 | 4 | 0 | 0 |
| 23. Working with Instruments and Effects | devices | 20 | 3 | 0 | 17 |
| 24. Instrument, Drum and Effect Racks | devices | 23 | 4 | 0 | 19 |
| 25. Automation and Editing Envelopes | sets | 15 | 15 | 0 | 0 |
| 26. Clip Envelopes | clips | 19 | 19 | 0 | 0 |
| 27. Working with Video | sets | 10 | 1 | 0 | 9 |
| 28. Live Audio Effect Reference | devices | 158 | 43 | 0 | 115 |
| 29. Live MIDI Effect Reference | devices | 9 | 9 | 0 | 0 |
| 30. Live Instrument Reference | devices | 153 | 28 | 0 | 125 |
| 31. Max for Live | devices | 7 | 1 | 0 | 6 |
| 32. Max for Live Devices | devices | 25 | 19 | 0 | 6 |
| 33. MIDI and Key Remote Control | workspace | 14 | 2 | 0 | 12 |
| 34. Using Push 1 | workspace | 46 | 1 | 0 | 45 |
| 35. Using Push 2 | workspace | 48 | 1 | 0 | 47 |
| 36. Synchronizing with Link, Tempo Follower, and MIDI | sets | 12 | 1 | 0 | 11 |
| 37. Computer Audio Resources and Strategies | workspace | 7 | 1 | 0 | 6 |
| 38. Audio Fact Sheet | sets | 26 | 1 | 0 | 25 |
| 39. MIDI Fact Sheet | workspace | 7 | 1 | 0 | 6 |
| 40. Accessibility and Keyboard Navigation | workspace | 22 | 1 | 0 | 21 |
| 41. Live Keyboard Shortcuts | workspace | 32 | 8 | 24 | 0 |
| 42. Credits | origins | 1 | 1 | 0 | 0 |

## Source handling

`import-manual.mjs` generates headings, section URLs and factual key mappings only. Raw HTML remains in the private sibling `manual-research` cache, outside the preview allowlist. The atlas does not ship manual prose or third-party images. Source-only entries retain direct official links.

The main Live manual covers Push 1 and Push 2. It is not a conversion of the separate Push 3 manual. No learner accounts, shared collections or new videos were added.
