# Manual-to-card audit

Audit of the current app against the cached [Live 12 manual](https://www.ableton.com/en/live-manual/12/welcome-to-live/), retrieved 2026-09-22.

**This measures local card placement, not completeness of the explanations.**

0 source headings have no local atlas action-card home. Of these, 0 have an older reference-pane guide and 0 only have the source link. Searchability does not count as a card.

A single well-placed card may cover several manual headings. Mapped device parameters, chapter introductions and shared concepts still need a text-depth review; a route or citation is not proof that every control and behavior is explained.

## Placement result

All 42 cached chapters have local destinations: 1,048 action/context/shortcut headings and three source-information headings. Welcome and credits are available from Sources & scope. Push 1 and Push 2 have separate places under Settings & controllers.

The missing-placement queue is closed. The parameter-level text-depth review remains open; see `MANUAL_CONTENT_REVIEW.md`.

## Recheck

`node manual-card-audit.cjs` prints this audit; add `--json` for every heading’s status and card path. The script loads the same content modules as the app. No manual media is downloaded or changed.
