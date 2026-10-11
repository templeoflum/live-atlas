# Shortcuts: an intention map

Replaces the standalone lookup form and manual-group dropdown. The entry points are Move around, Find & load, Edit, Play & record, Shape & mix, and Manage a Set.

Each intention leads to a small set of actions. Notes, audio, Arrangement and other context-dependent gestures have their own branches. A final stop contains at most nine source rows, with duplicate gestures combined on screen. Tab / Shift Tab are the first view-switching gestures; Browser search starts with Cmd/Ctrl F.

The intention bar stays visible. Breadcrumbs lead back up; nearby actions lead sideways. Original screenshots sit behind “In Live,” rather than increasing the default page height. No quizzes, completion gates, keyboard interception or compulsory practice.

`manualData.shortcuts` remains the only key-binding database. `shortcut-explorer.js` maps every source row to an intention/context/action group. New locations have normal atlas routes, browser history and flags. Old shortcut chapter/group links still open; global Find can jump to the exact gesture’s context. The ordinary Workspace controls and other territories are unchanged.

The Mac/Windows switch preserves the current path and scroll position. Context notes distinguish view switching from Tab focus navigation and mark important selection or keyboard-mode conditions.

`shortcut-explorer.test.cjs` checks all rows, a source-table fingerprint, small branches, bounded depth, both platforms, legacy flags, image/route references and exact global Find destinations. If the manual table changes, review the editorial mapping before updating the fingerprint.
