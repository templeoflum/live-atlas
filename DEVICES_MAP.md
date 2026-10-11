# Devices — content pass

Top territory → neighborhood → device → action in its card. Devices is the deliberate fourth-navigation-level exception. The sidebar has a fixed neighborhood-button section and a separate bounded device list below; nothing expands or collapses. Choosing a neighborhood only filters that list, leaving the card untouched. Choosing a device changes the card. The action bar and all visible card content are unchanged.

Neighborhoods contain 2–11 entries each. Max devices live with their functional neighbors: DS voices under Drums, modulators under Modulation, and MIDI processors under MIDI notes. The original manual catalog and source IDs remain intact.

Only the device list can scroll; its position is remembered per neighborhood. Saved/action/source links select the correct neighborhood and reveal the device within that lower list without scrolling the sidebar or page. On narrow screens, separate Neighborhood and Device pickers use the same filtering.

## Landmarks

- Working with devices: Device chain, Presets, Plug-ins, Max for Live.
- All existing catalog entries: 13 instruments, 42 audio effects, 8 MIDI effects, 4 Racks, 18 Max devices.
- Instruments: source/sample selection, shaping, modulation and voice behavior grouped by the controls actually available in that device.
- Effects: concrete operations such as moving a band, catching peaks, spacing repeats, feeding a detector and freezing a spectrum.
- Racks: group, add chains, split or crossfade, map, store variations; Drum Rack routing and extraction remain distinct.

## Sources and depth

Original instructional summaries were written against the cached official Live 12 manual in `../manual-research`, especially chapters 23, 24 and 28–32. Cards link to their underlying manual sections. Legacy source URLs resolve into the related action card; requested legacy flags retain their original identities.

There are 232 action cards. This is a navigation/content inventory, **not** a claim that every parameter, range, example and technical caveat in the manual has been transcribed. Source-home coverage likewise measures where a source lands, not how much of its prose has been rewritten. More detailed per-control treatment can extend these already-open cards without introducing another disclosure level.

## Media

No screenshots or videos were created or changed in this pass. Existing device images remain on each illustrated device's opening card. New actions deliberately have no generic repeated image. The later media pass should capture the actual control/action described by each card; preserve readable native scale, tight context, and unambiguous state.

## Verification

`devices.test.cjs` checks the full catalog, every device-source route, real cached manual anchors, bounded action bars, both platform renders, legacy flags, visible steps, all capture references, and isolation from other territories. Serving tests cover new public modules and keep research, tests and private captures unserved.
