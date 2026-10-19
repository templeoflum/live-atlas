Diagnosis · T-0127 · 12 October 2026

# Why the atlas can fail on an older laptop

---

The atlas asks older browsers to run JavaScript they do not support. A confirmed failure stops the atlas before its navigation is ready. Small replacements repair that failure without removing content, but her browser version determines whether they are enough.

**For the next lesson:** compare her browser and OS with the table below. The student’s actual failure remains unconfirmed because neither version nor her error message is known. Splice failing inside Live does not establish the atlas’s cause.

The published site and atlas source were not edited. All experiments used scratch copies or changed responses from a local server.

## First failure

There are three relevant age ranges. Files and line numbers refer to the published copy, verified against `../site`.

| Browser capability | First breaking file and line | Result |
|---|---|---|
| **No optional chaining** | `record-midi.js:51`, `host?.querySelectorAll(...)` | Entire script fails to parse. This is the first script in HTML order. |
| **Optional chaining, no logical assignment** | `manual-completion.js:22`, `(parent.details||=[])` | Entire script fails to parse. Later scripts have the same problem. |
| **Modern syntax, no Array.at** | `history-images-data.js:20`, `figures.at(-1)` | First observed runtime error in both tested engines with this feature removed. |

**Observed runtime sequence:**

```text
TypeError: figures.at is not a function
  history-images-data.js:20:25
ReferenceError: historyImagesData is not defined
  history-images.js:4:25
TypeError: u.pathname.split(...).filter(...).at is not a function
  manual-atlas.js:8:87
  Object.install at manual-atlas.js:17:79
  atlas.js:322:49
```

The first failed initializer leaves History image data unavailable. Independently, the second `Array.at()` call stops manual installation inside `atlas.js`. That happens before navigation initialization at `atlas.js:597–605`.

Replacing only `history-images-data.js:20` removed the History errors but left manual installation broken. Replacing all four shipped `Array.at()` calls restored initialization.

**Syntax evidence:** Acorn’s ES2019 grammar rejected the first script at `record-midi.js:51:23`. ES2020 grammar rejected four files, starting with `manual-completion.js:22:78`. All 40 scripts parsed with ES2021 grammar. These are grammar checks, not runs of historical browsers.

## Browser and OS comparison

These are **source-derived minimum versions**, not certified runs of those historical versions. No historical browser was installed or downloaded. Actual execution used Chromium 151.0.7922.34 and Playwright WebKit 26.5; Firefox was not run.

“Starts” means JavaScript can initialize. “Lesson surface” also requires native Find/image dialogs and the existing viewport-height layout. Neither column guarantees every historical rendering detail.

| Desktop browser | Starts, inferred | Lesson surface, inferred | OS that can run those versions |
|---|---|---|---|
| **Safari** | 15.4 | 15.4 | macOS Catalina 10.15, Big Sur 11; included with Monterey 12.3. No supported Windows Safari at this level. |
| **Chrome** | 92 | 108 | Chrome 92: OS X 10.11+ or Windows 7+. Chrome 108: macOS 10.13+ or Windows 7+. |
| **Firefox** | 90 | 101 | macOS 10.12+ or Windows 7+ for both. Firefox 90–97 lacks the native dialogs used here. |

An OS version alone does not identify the browser version. For example, Catalina with an older Safari can fail even though Catalina can run Safari 15.4.

These are historical compatibility limits, not recommendations to install obsolete browsers. A browser already compatible with her OS may avoid a site change entirely.

**Feature limits from MDN’s browser compatibility records:**

| Feature | Safari | Chrome | Firefox |
|---|---:|---:|---:|
| **Optional chaining** | 13.1 | 80 | 74 |
| **Logical assignment** (`||=`, `??=`) | 14 | 85 | 79 |
| **Array.at** | 15.4 | 92 | 90 |
| **Native showModal** | 15.4 | 37 | 98 |
| **Dynamic viewport units** (`dvh`) | 15.4 | 108 | 101 |
| **Color mixing** (`color-mix`) | 16.2 | 111 | 113 |

`color-mix()` affects fills and borders, not initialization. Exact color rendering therefore has a higher floor than loading. Unsupported declarations are ignored.

`atlas.css:251` sets `body.exploring{height:100dvh;overflow:hidden;...}` without a `vh` fallback. Its absence affects containment, rather than JavaScript startup.

In a 900px viewport, removing all five `dvh` declarations changed the body height from 900px to 957.42px. The inspector’s bottom moved from 848.61px to 906.03px. Adding `body.exploring{height:100vh}` restored both measurements. This isolates one CSS limitation; it does not reproduce an entire old browser.

## Smallest exact proposed change

**For a browser that understands ES2021 syntax but lacks Array.at:** replace these four expressions in the working atlas, then rebuild only after separate authorization.

| File and line | Replace | With |
|---|---|---|
| **history-images-data.js:20** | `figures.at(-1)` | `figures[figures.length-1]` |
| **manual-atlas.js:8** | `u.pathname.split('/').filter(Boolean).at(-1)` | `u.pathname.split('/').filter(Boolean).slice(-1)[0]` |
| **shortcut-explorer.js:159** | `node.parents.at(-1)` | `node.parents[node.parents.length-1]` |
| **card-navigation.js:139** | `trail.held().at(-1)` | `trail.held().slice(-1)[0]` |

**Cost:** four expression changes, no dependency, no global polyfill, and no lost text, images or features. Empty-array results remain `undefined`. The two `slice()` expressions create small temporary arrays.

This is the smallest complete repair of the reproduced `Array.at()` failure. Both tested engines initialized with `Array.at` absent after these replacements. Find, shortcut leaf navigation and Hold also worked without page errors.

**For a browser without dvh:** immediately precede each declaration below with its `vh` equivalent, keeping the `dvh` declaration second.

```css
/* atlas.css:220, .capture-dialog */
max-height:92vh;max-height:92dvh;
/* atlas.css:251, body.exploring */
height:100vh;height:100dvh;
/* atlas.css:263, body.exploring footer */
max-height:25vh;max-height:25dvh;
/* atlas.css:401, .atlas-find-dialog */
max-height:min(740px,88vh);max-height:min(740px,88dvh);
/* atlas.css:556, body .inspector.held-preview-away */
height:min(70vh,650px);height:min(70dvh,650px);
```

There are five `dvh` declarations across these five rules.

**Cost:** five extra declarations, no desktop content loss. Old mobile browsers use their legacy viewport height when browser controls move. Modern browsers retain dynamic sizing. The body-height fallback was tested; the complete five-declaration patch was not applied or tested.

**Limits:** neither proposal repairs older syntax. Safari below 14, Chrome below 85, and Firefox below 79 still face logical assignment. Still older versions face optional chaining and other features. Safari 14–15.3 also needs a dialog fallback for Find and image enlargement. Choose that additional work only after T-0187 establishes her versions.

## What was run and seen

Scratch evidence is under `tmp/laptop-diagnosis/`. Commands ran from `live-atlas`; all successful commands below returned exit code **0**.

1. **Published-copy check and runtime reproduction**

   `TMPDIR="$PWD/tmp/laptop-diagnosis" node --expose-internals tmp/laptop-diagnosis/check.cjs`

   Output: `PUBLISHED HTTP 200 files=42 equal-to-site=42 mismatches=[]`.

   The 42 files are HTML, CSS and all 40 scripts. SHA-256 values are in `manifest.json`. The script scanned their grammar and served their fetched bytes locally. Image files came from the read-only site copy; image bytes were not compared online.

   Both engines: baseline `errors:[]`; disabling `Array.at` produced the three errors above. Fixing only the first call left the manual error. Fixing all four yielded `errors:[]` and nonempty Workspace navigation.

   Workspace navigation and Find were exercised through clicks. Each engine reported `findOpen:true`, `findResults:40`, and `overflow:false` at 1280×900. Baseline and fixed screenshots were saved.

2. **All four expressions, including later interactions**

   `TMPDIR="$PWD/tmp/laptop-diagnosis" node --expose-internals tmp/laptop-diagnosis/deep-check.cjs`

   Final output in each engine: `shortcutGestures:3`, `hash:"#workspace/keys-views"`, and `FINAL_ERRORS []`.

   Clicks traversed Shortcuts to a leaf and pressed Hold. Held-card release controls appeared. Both startup and later-use expressions were exercised with `Array.at` absent. The WebKit deep screenshot was visually inspected.

   An earlier attempt used the wrong scope for Hold and timed out with `Timeout 30000ms exceeded`. It was stopped, returning **130**. The selector was corrected; the final rerun returned **0**. That timeout was a harness defect, not an atlas failure.

3. **CSS feature removal and fallback**

   `TMPDIR="$PWD/tmp/laptop-diagnosis" node tmp/laptop-diagnosis/css-check.cjs`

   Final output: `baseline bodyHeight:900`; `no-dvh bodyHeight:957.421875`; `vh-fallback bodyHeight:900`. The no-`dvh` screenshot was inspected. An initial removal pattern missed numeric units; it was corrected before these measurements.

4. **Compatibility records**

   `node tmp/laptop-diagnosis/features.cjs`

   Final requests returned **200** for all seven JSON sources. Their version records were saved in `bcd-*.json`; output is in `features.log`. Initial capitalized operator paths returned **404**; lowercase paths succeeded. Browser/OS sources were also opened with the web tool.

**Other scan results:** shipped scripts use `flat`, `flatMap`, `Object.fromEntries`, Unicode property escapes, object spread and optional catch binding. Their support predates the current startup floor. No class fields or top-level await were found by ES2021 parsing. No shipped `structuredClone`, `Array.at` alternatives such as `findLast`, CSS nesting, `:has()`, or container-query dependency was found in the targeted scan. `build-pages.mjs` uses newer Node features but is not loaded by the browser. Storage reads and writes are caught; unavailable localStorage alone does not explain this startup failure. Fonts have local fallbacks.

## Sources and remaining check

- [MDN Array compatibility data](https://github.com/mdn/browser-compat-data/blob/main/javascript/builtins/Array.json), [operator data](https://github.com/mdn/browser-compat-data/tree/main/javascript/operators), [dialog data](https://github.com/mdn/browser-compat-data/blob/main/api/HTMLDialogElement.json).
- [MDN length data](https://github.com/mdn/browser-compat-data/blob/main/css/types/length.json), [color data](https://github.com/mdn/browser-compat-data/blob/main/css/types/color.json).
- [Apple: Safari 15.4 on Catalina and Big Sur](https://support.apple.com/en-us/103193), [WebKit: Safari 15.4 features and Monterey 12.3](https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/).
- [Google: Chrome 104 ends 10.11 and 10.12 support](https://storage.googleapis.com/support-kms-prod/eGoq7jJxnttyFJWFbKvzhJ06aQIOc6btUdI4), [Chrome historical OS limits](https://support.google.com/chrome/a/answer/7100626). Chrome 92’s OS mapping is inferred from the historical support sequence.
- [Mozilla: Firefox 90 OS requirements](https://www.firefox.com/en-US/firefox/90.0.1/system-requirements/), [Firefox 101 OS requirements](https://www.firefox.com/en-US/firefox/101.0.1/system-requirements/).

**T-0187 needs:** her exact OS version, browser name and version, whether any page content appears, and any visible error. If the browser meets these floors, investigate her actual network, certificate, extension or resource failure instead. None of those alternatives was observed here.

**Completion check:** published bytes, first runtime failure, grammar failures, version/OS comparison, exact replacements and their costs are recorded above. Runtime and rendered-output checks passed for the isolated replacement experiment. Historical-version loading and the student’s actual cause remain unverified. A final SHA-256 comparison returned `FINAL_SITE_MANIFEST files=42 changed=[]`; the site git status was clean. No commit, push, build-pages run, publication, installation or student contact occurred.
