const navigationDrill = (() => {
  // Source section and row selectors only; names, keys and card homes come from the atlas.
  const selections = [
    ['showing-and-hiding-views', 2], ['showing-and-hiding-views', 3],
    ['showing-and-hiding-views', 9], ['showing-and-hiding-views', 14],
    ['showing-and-hiding-views', 15],
    ['keyboard-focus-and-navigation', 1], ['keyboard-focus-and-navigation', 2],
    ['keyboard-focus-and-navigation', 3], ['keyboard-focus-and-navigation', 4],
    ['keyboard-focus-and-navigation', 5]
  ];
  function combinations(text) {
    return text.split(' or ').map(value => {
      const tokens = value.split(' '), key = tokens[tokens.length - 1];
      const code = key.length === 1 ? (/\d/.test(key) ? 'Digit' : 'Key') + key.toUpperCase() : key;
      if (!/^(Key[A-Z]|Digit[0-9]|Tab|F12)$/.test(code)) throw Error('Unsupported drill key: ' + value);
      return {code, key, meta: tokens.includes('Cmd'), alt: tokens.includes('Option'),
        shift: tokens.includes('Shift'), ctrl: tokens.includes('Ctrl')};
    });
  }
  const items = selections.map(selection => {
    const row = manualData.shortcuts.filter(key => key.section === selection[0])[selection[1]];
    if (!row) throw Error('Missing atlas shortcut: ' + selection.join(':'));
    const card = shortcutExplorer.rowHome(row);
    if (!card) throw Error('Missing atlas card: ' + row.action);
    return {row, card, href: '../index.html#workspace/' + card, combinations: combinations(row.mac)};
  });
  function matches(event, item) {
    return item.combinations.some(combo =>
      (event.code ? event.code === combo.code : event.key.toLowerCase() === combo.key.toLowerCase()) &&
      !!event.metaKey === combo.meta && !!event.altKey === combo.alt &&
      !!event.shiftKey === combo.shift && !!event.ctrlKey === combo.ctrl);
  }
  function mount() {
    let index = 0;
    const action = document.getElementById('action'), link = document.getElementById('card');
    const keys = document.getElementById('keys'), feedback = document.getElementById('feedback');
    const next = document.getElementById('next');
    function show() {
      const item = items[index];
      action.textContent = item.row.action;
      link.href = item.href;
      link.textContent = shortcutExplorer.locations.get(item.card).label + ' ↗';
      feedback.textContent = '';
    }
    keys.addEventListener('click', () => keys.focus());
    keys.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); next.focus(); return; }
      if (event.repeat || event.isComposing || ['Meta', 'Alt', 'Control', 'Shift'].includes(event.key)) return;
      event.preventDefault();
      const item = items[index];
      feedback.textContent = (matches(event, item) ? 'yes · ' : '') + item.row.mac;
    });
    document.getElementById('previous').addEventListener('click', () => {
      index = (index + items.length - 1) % items.length; show(); keys.focus();
    });
    next.addEventListener('click', () => { index = (index + 1) % items.length; show(); keys.focus(); });
    show();
  }
  return {items, matches, mount};
})();
if (typeof document !== 'undefined') navigationDrill.mount();
