# Live’s History — research ledger

Research cutoff: 23 September 2026. Original summaries, not copied articles.

## Coverage

The History tab now has 52 historical entries and 8 people/team entries, arranged into nine periods plus People. Every major Live version is represented, alongside instrument design, controllers, collaborations, teaching, accessibility, platform transitions and a documented reliability setback. This is a substantial first research pass, not an exhaustive account of every employee, artist, release-note item or company event.

The source registry in `history-data.js` contains 58 documents with title, direct URL, publication date where known, evidence type, research date and relevant caveats. Each card links to the records used for that card. Later recollections are labeled separately from contemporary announcements and release notes.

## Editorial decisions

- Start with the musical and technical circumstances of the late 1990s, not an unrelated general history of synthesis.
- Give people credit for particular work. Do not collapse musical inspiration, company formation, engineering, interface design and business into a two-person founder legend.
- Describe design motives only where a participant discusses them. A feature’s existence alone does not prove a designer’s intent.
- Distinguish proposed features, beta availability, launch announcements and actual availability. An announcement is evidence of what was announced, not evidence of adoption or success.
- Keep original summaries short and distribute the depth through specific sources. Do not transcribe interviews or reproduce press releases.
- Use authentic, version-matched source images: historical manuals, contemporary documentation, creator archives and photography. Never substitute a newer software interface for an earlier version, even with a disclaimer. Leave a documented gap when a suitable source is missing. Do not make replacement diagrams or imagined interfaces.
- Related links identify actual projects and collaborators; they do not invent a chain in which every development caused the next.
- Periods now open the shared neighborhood choice card, like the other territories. No additional accordion hides the article text or its citations.
- The initial research pass added no media. The later visual pass below adds local historical illustrations; no external embeds, tracking or public deployment.

## Dates and attribution requiring care

- **Live 1:** the contemporary Live 2 announcement explicitly dates the original commercial release to October 2001. Internal screenshots and later recollections are not used as release-date evidence.
- **Company formation:** Henke’s creator archive describes roles differently from simplified accounts that treat every central musician as an identically situated founder. The card follows that account and names its source.
- **Live 3:** announcement and availability are different October dates.
- **Live 4:** the contemporary archive contains differing day-level metadata; the card uses July 2004.
- **Live 6 / Sampler:** the archive path/index and press-release body differ by a day; the card uses September 2006.
- **64-bit Live:** the 2012 entry is explicitly a beta milestone, not the stable 8.4 release date.
- **Push 1:** the hardware retrospective’s year conflicts with the contemporary commercial-release announcement. The discrepancy remains visible in the source note; the card uses the contemporary record for availability.
- **Live 8 quality statement:** the primary statement is available as a contemporary reproduction at CDM. The original forum post could not be retrieved in this pass. This is not presented as an independent audit of the eventual fixes.
- **Learning Music:** the September 2017 announcement documents the product and language availability; the card does not claim this is its initial launch day.
- **Present:** stable release status and Extensions SDK beta status are separate. The date is fixed, not a live-feed claim.

## Strong primary-source entry points

- [Behles and Henke’s retrospective interview](https://roberthenke.com/interviews/ableton.html)
- [Henke’s Live development archive](https://roberthenke.com/technology/ableton_live.html)
- [Operator’s design and implementation](https://roberthenke.com/technology/operator.html)
- [Monodeck’s hardware and software contributors](https://www.roberthenke.com/technology/monodeck.html)
- [Ableton’s dated press archive](https://www.ableton.com/en/press/)
- [Jesse Terry’s Push retrospective](https://www.ableton.com/en/blog/the-evolution-of-push/)
- [Cycling ’74’s first-person acquisition announcement](https://cycling74.com/articles/cycling-%E2%80%9974-ableton)
- [Wavetable’s design team](https://www.ableton.com/en/blog/new-wave-depth-look-wavetable/)
- [Meld’s design team](https://www.ableton.com/en/blog/meld-a-look-at-live-12s-new-bi-timbral-synth/)
- [Live’s current stable release notes](https://www.ableton.com/en/release-notes/live-12/)

## Further research, not asserted history

- The original interface and interaction vocabulary: obtain more direct designer accounts beyond the Operator material.
- Recover contemporary launch artifacts for Live 1, including the NAMM demonstration, before treating remembered anecdotes as settled chronology.
- Follow abandoned initiatives such as Share from announcement to documented outcome; do not silently count an announced service as a released one.
- Expand independent device-maker histories using first-person accounts and actual devices, not generic lists of famous Live users.
- More engineering accounts of Push’s standalone architecture and later extension platforms. Alpha/beta projects need explicit status and dates.
- Continue locating contemporary screenshots for Live 1.5–8 and the early collaborations. Do not substitute Live 12 manual figures for missing historical material.

## Historical image pass — 23 September 2026

33 source images now illustrate 38 historical articles and all ten period/people opening cards. Early interfaces, the musicians and founders, Monodeck, Onyx/Operator, APC40, Push concepts and generations, teaching resources, Wavetable, Note, Meld, Move and recent releases are represented. Second images sit between article sections, rather than pushing all the text below a gallery. Period illustrations stay small and do not replace the existing navigation choices.

`history-images-data.js` records the source page, exact image URL, date/context, descriptive alternative text, caption, credit, local path, byte length and measured dimensions for each asset. `import-history-images.cjs` downloads only those curated files. All originals were visually inspected. Some source URLs end in PNG but return JPEG; local extensions match the actual bytes. No image was generated, retouched, upscaled or newly cropped. Some source-published images already have editorial crops.

Captions distinguish the tentative c. 2000 prototype from commercial Live 1, the later Operator illustration from the 2004 Onyx prototype, the uncertain NAMM date, and 12.4 release photography from the later 12.4.6 patch. Named people follow the archive’s captions, not guessed identities. Henke’s interview credits photographers collectively without assigning each photograph; those entries say the individual credit is unspecified.

Images are served locally and open in the existing image viewer, including from held-card overlays. Clicking a source credit opens the original article. The preview’s image policy still allows only local/data images; no remote image tracking was introduced. File-based use needs no new request or module loader.

### Reuse and remaining gaps

Public accessibility is **not** a reuse licence. This is a local teaching/design prototype, not a rights-cleared publication. No blanket redistribution permission was found or claimed. Credits are provenance, not permission: obtain appropriate permissions or replace assets before public distribution, including review of the pre-existing manual images.

At the end of the first image pass, 22 articles remained text-only. The full-card pass below closes those gaps with sourced images and original diagrams rather than unrelated fallback pictures.

### Visual-pass verification

The new image test checks original file dimensions, byte lengths/formats, captions and provenance, all placements, shared enlargement registration and every period opening. Device tests still require manual-only figures inside device cards. Server checks include all historical assets with matching MIME types and deny access to private research/import/test files.

Browser checks cover a period card, the company article, Push’s two illustrations, the enlarged early interface, and a held historical card over another article without changing its route. Source images load at their recorded proportions; no browser warnings/errors appeared. All seventeen local test files and the preview-server test passed. No new narrow-viewport browser test is claimed in this pass.

## Earlier full-card visual pass — superseded

The user rejected the homemade diagrams. The source-only replacement pass below is the active implementation; the following records the earlier experiment only.

All **60 historical articles and people cards** now have an intentional visual at the opening, in addition to the ten period/people landing illustrations. The collection contains 39 externally sourced images and 19 original vector diagrams. This coverage statement refers to the historical collection, not the separate manual credits/reference pages.

Six additional source images cover David Zicarelli and Gerhard Behles in the 2017 interview, Max for Live’s editable environment, The Bridge’s archived product artwork, the combined Delay in the 10.1 beta announcement, CV Instrument documentation and the 11.1 release photograph. The interview identifies the people left/right and credits its photographs to Ableton. Each original was inspected; alternative text follows the actual image, not a guessed filename meaning.

`history-diagrams-data.js` authors source-linked, static vector illustrations for Live 1.5–8, Sampler, partner contributions, Certified Training, reliability, community device-making, memory addressing and keyboard accessibility. Four further drawings explain the Bridge’s two directions, CV connections, native application execution and user-wavetable import. These are schematic explanations, **not historical UI reconstructions or factory presets**. The drawing captions and registry distinguish them from source photography. There is no animation, extra disclosure level or required exercise.

The memory diagram shows a 32-bit process boundary and continuation beyond it, not an asserted 64-bit maximum or a sound-quality improvement. The training icons are not a literal trainer count. Groove offsets, sample zones and Macro mappings are illustrative. The 2017 Max image is not attributed to the 2009 launch; current CV documentation is not presented as a 2019 screenshot. The Bridge remains a historical integration, separate from Link.

Drawings are generated locally as self-contained SVGs by `import-history-images.cjs`, alongside the byte-preserved source images. They use the existing image viewer and held-card behavior. Credits and factual-source links remain on the card; source-image permissions still need review before public distribution. Original atlas drawings do not inherit an implied licence from their factual sources.

Visual review covered all 19 diagrams and all six new source images. SVG labels were checked against their canvas bounds; all SVG files pass XML validation. Automated coverage now requires a leading visual for every historical article, verifies all visible placements, original bytes/dimensions and source metadata, and rejects scripting or external references inside diagram assets. Temporary visual-review pages are removed from the preview after checking.

All 17 local test files and the preview-server test pass. Browser checks confirm the memory illustration renders and enlarges, remains available in a held-card overlay without changing the current route, and the new interview photograph loads at its recorded dimensions. No warnings/errors appeared in the atlas QA tab. No additional narrow-viewport test is claimed.

## Source-only replacement and continuous navigation — superseded imagery

The modern manual substitutions recorded in this section were rejected and removed from History. The continuous navigation change remains active.

Removed all 19 homemade diagrams from the active registry, page load and preview allowlist. Their earlier authoring files remain recoverable locally but are not served or regenerated by the source-image importer. All 60 historical articles/people still have an opening visual: 42 externally sourced photographs/screenshots and 11 existing official manual figures, reused without modifying their original files.

New source images: Live’s ReWire output selector from Ableton’s archived Logic/ReWire guide, the current Certified Training page’s photograph, and Robert Henke’s Granulator II interface. The manual supplies crossfader assignments, clip envelopes, the MIDI editor, freezing, Racks, Sampler zones, Drum Rack, Tension, Looper, clip RAM mode and keyboard envelope navigation. These are labeled as Live 12 illustrations, not launch-era captures. The reliability article uses the existing dated photograph of Roggendorf and Henke. The other existing source photographs remain intact. Source credits and enlargement remain available; reuse permission still needs review before distribution.

Previous/Next now follows the full sequence inside each of the four atlas sections, crossing neighborhood boundaries in sidebar order. Neighborhood return links remain local, and Back remains the actual visit history. History’s header and footer share the same destinations; only section endpoints disable a direction.

All 17 local test files and the preview-server test passed. Every new image and reused manual figure was visually inspected. Browser checks confirmed the training photograph, forward and reverse stepping between Training and Live 8 with the period selection following, and manual-image enlargement. No additional narrow-viewport test is claimed.

### Distinct opening images

The repeated Monolake photograph on “Audio enters the laptop” is replaced with a real PowerBook G3 Bronze Keyboard/Lombard photograph. LiamTheGuy’s 2023 photograph is CC0; the source crop by RickyCourtney is served in Wikimedia Commons’ correctly oriented 960px version, without further editing. The caption identifies the photograph date; it is an example of the hardware generation, not a claim that this is Behles or Henke’s own machine. The performance photo remains on Monolake and the prototype remains on the company card. The active image collection now contains 43 external source images and 11 reused manual figures. A regression check keeps these first three card images distinct.

Source: <https://commons.wikimedia.org/wiki/File:PowerBook_G3_(Bronze_Keyboard).jpg> · CC0: <https://creativecommons.org/publicdomain/zero/1.0/>.

## Version-correct correction — 23 September 2026

Removed all Live 12 manual substitutions from History, along with later Operator, Max for Live, CV, ReWire, training and Granulator II stand-ins and the unrelated NAMM photo on the reliability card. Original files remain recoverable; active placement controls the History asset allowlist. Other atlas sections still use the current manual correctly.

Seven replacement figures are extracted at native embedded resolution from the Live 3.0, 4.1, 5.2, 6.0, 7.0.9 and 8.0.2 manuals. Exact editions and page links are visible. Live 3 uses an archived copy of Ableton's manual at Manuals.plus; the other PDFs come from Ableton's downloads. Registry entries record PDF hashes, page/image indices and dimensions; the importer verifies hashes before extracting. These are historical source figures, not launch-day captures unless their source establishes that.

At the September 23 handoff, Live 7 Drum Rack's raw bitmap was vertically inverted and inactive; browser and full regression checks were pending. These bounded checks were completed on September 28 under T-0002: the PDF display transform was applied, the result inspected before activation, all eight figures observed inline and enlarged, and all 19 test files passed. See `IMAGE_REVIEW_LEDGER.md` for the exact evidence and limits. Other visual gaps remain in `historyImagesData.gaps`; coverage still requires a suitable image or a specific gap, never filler.

## Verification

`history.test.cjs` checks navigation homes, source and cross-link integrity, all major versions, compact period lists, visible card text, search and dated status. It is a structural/editorial check, not a substitute for judging the evidence. Existing atlas, manual, media and server tests also remain in place.

Initial research-pass results: all fourteen then-current local test files and the preview-server test passed. Desktop and 390px-wide browser checks covered the then-current filter, people-to-project navigation, browser Back and the current-release endpoint. Fifty-seven source URLs responded successfully to a direct link check; the accessibility help article denied that automated request but was separately retrieved and verified through the web research tool. No broken source URL was established by those checks. The shared neighborhood navigation and visual pass have their own later checks above and in their respective tests.
