#!/bin/zsh
cd "${0:A:h:h}" || exit 1
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
# Reuse a running practice preview, otherwise keep it alive in this window.
if curl -fsS http://127.0.0.1:54869/practice/drill.html >/dev/null 2>&1; then
  open http://127.0.0.1:54869/practice/drill.html
  exit
fi
node practice/preview.mjs &
drill_pid=$!
trap 'kill "$drill_pid" 2>/dev/null' EXIT
for attempt in {1..50}; do
  if curl -fsS http://127.0.0.1:54869/practice/drill.html >/dev/null 2>&1; then
    open http://127.0.0.1:54869/practice/drill.html
    wait "$drill_pid"
    exit
  fi
  sleep 0.1
done
print 'Practice preview did not start.'
exit 1
