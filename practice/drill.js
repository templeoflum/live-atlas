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
  const effects = [
    {targets:['session','arrangement'], toggle:['session','arrangement']},
    {targets:['clip','device'], toggle:['clip','device']},
    {targets:['browser'], visibility:'browser'},
    {targets:['clip'], visibility:'clip'},
    {targets:['device'], visibility:'device'},
    ...['session','arrangement','clip','device','browser'].map(focus => ({targets:[focus], focus}))
  ];
  function initialState() {
    return {visible:{browser:true, session:true, arrangement:false, clip:true, device:false}, focus:null};
  }
  function apply(state, effect) {
    if (effect.toggle) effect.toggle.forEach(id => {state.visible[id] = !state.visible[id];});
    if (effect.visibility) {
      const id = effect.visibility;
      state.visible[id] = !state.visible[id];
      if (state.visible[id] && id === 'clip') state.visible.device = false;
      if (state.visible[id] && id === 'device') state.visible.clip = false;
    }
    if (effect.focus) {
      state.focus = effect.focus; state.visible[effect.focus] = true;
      if (effect.focus === 'session') state.visible.arrangement = false;
      if (effect.focus === 'arrangement') state.visible.session = false;
      if (effect.focus === 'clip') state.visible.device = false;
      if (effect.focus === 'device') state.visible.clip = false;
    }
    return state;
  }
  function matches(event, item) {
    return item.combinations.some(combo =>
      (event.code ? event.code === combo.code : event.key.toLowerCase() === combo.key.toLowerCase()) &&
      !!event.metaKey === combo.meta && !!event.altKey === combo.alt &&
      !!event.shiftKey === combo.shift && !!event.ctrlKey === combo.ctrl);
  }
  function mount() {
    let index = 0, state = initialState(), spoken = false;
    const action = document.getElementById('action'), link = document.getElementById('card');
    const keys = document.getElementById('keys'), feedback = document.getElementById('feedback');
    const next = document.getElementById('next'), effectText = document.getElementById('effect');
    const audio = document.getElementById('audio');
    const names = {browser:'Browser', session:'Session', arrangement:'Arrangement', clip:'Clip', device:'Device'};
    function speak(text) {
      if (!spoken) return;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new window.SpeechSynthesisUtterance(text));
    }
    function renderMap(applied) {
      const effect = effects[index];
      Object.keys(names).forEach(id => {
        const region = document.getElementById('region-' + id);
        region.dataset.target = String(effect.targets.includes(id));
        region.dataset.active = String(applied && (state.focus ? state.focus === id : effect.targets.includes(id) && state.visible[id]));
        region.dataset.hidden = String(!state.visible[id]);
        region.querySelector('.state').textContent = state.focus === id ? 'Focused' : state.visible[id] ? 'Visible' : 'Hidden';
      });
      if (!applied) {effectText.textContent = ''; return;}
      effectText.textContent = effect.targets.map(id => names[id] + ': ' + (state.focus === id ? 'focused' : state.visible[id] ? 'visible' : 'hidden')).join(' · ');
    }
    function advance(direction) {
      index = (index + items.length + direction) % items.length; show(); keys.focus();
    }
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      audio.disabled = true; audio.textContent = 'Spoken cues unavailable';
    }
    audio.addEventListener('click', () => {
      spoken = !spoken; audio.setAttribute('aria-pressed', String(spoken));
      audio.textContent = 'Spoken cues: ' + (spoken ? 'on' : 'off');
      if (spoken) speak(items[index].row.action); else window.speechSynthesis.cancel();
      keys.focus();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && window.speechSynthesis) window.speechSynthesis.cancel();
    });
    function show() {
      const item = items[index];
      action.textContent = item.row.action;
      link.href = item.href;
      link.textContent = shortcutExplorer.locations.get(item.card).label + ' ↗';
      feedback.textContent = '';
      state = initialState(); renderMap(false); speak(item.row.action);
    }
    keys.addEventListener('click', () => keys.focus());
    keys.addEventListener('keydown', event => {
      if (event.isComposing) return;
      if (event.key === 'Escape') { event.preventDefault(); next.focus(); return; }
      if (event.key === 'Enter') {event.preventDefault(); if (!event.repeat) advance(1); return;}
      if (event.repeat || ['Meta', 'Alt', 'Control', 'Shift'].includes(event.key)) return;
      event.preventDefault();
      const item = items[index];
      const correct = matches(event, item);
      feedback.textContent = (correct ? 'yes · ' : '') + item.row.mac;
      if (correct) {
        apply(state, effects[index]); renderMap(true); speak(effectText.textContent);
      }
    });
    document.getElementById('previous').addEventListener('click', () => {
      advance(-1);
    });
    next.addEventListener('click', () => advance(1));
    show();
  }
  return {items, effects, initialState, apply, matches, mount};
})();
if (typeof document !== 'undefined') navigationDrill.mount();
