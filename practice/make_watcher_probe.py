#!/usr/bin/env python3
"""Build practice/watcher-probe.amxd, a Max for Live audio effect, from atlas data.

Run from anywhere:  python3 practice/make_watcher_probe.py
Needs node, to load manual-data.js through the atlas's own model loader (as
make_exercise_1.py does). Nothing outside practice/ is written: not the User
Library, not Live's preferences.

The device shows one cue at a time taken from the manual's shortcut table, reads
Live's starting state (view, selected track, Browser), and says "seen" when the
change the cue asks for happens. Show keys, Next and Stop; no score, no log.

LOM members used (Cycling '74 LOM reference):
  live_app view  focused_document_view   observed ('Session' or 'Arranger')
  live_app view  is_view_visible Browser  called every 200 ms (not observable)
  live_set view  selected_track           observed (id of a Track)
  <track id>     name                     read for the display

After building, the script reads the file back, parses the JSON and checks that
every patch cord joins existing boxes at existing inlets and outlets.
"""
import json, os, struct, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ATLAS = os.path.dirname(HERE)
OUT = os.path.join(HERE, 'watcher-probe.amxd')

# kind: what Live change answers the cue. action: exact shortcut-table action name.
CUES = [
    dict(kind='view', action='Toggle Session/Arrangement View',
         cue='Switch to the other main view (Session or Arrangement).'),
    dict(kind='browser', action='Hide/Show Browser',
         cue='Hide the Browser. If it is hidden then show it.'),
    dict(kind='track', action='Select Neighboring Clip/Slot',
         cue='Select the track next to this one.',
         note='left or right arrow key in Session View with a clip slot selected'),
]


def atlas_rows():
    js = ("const m=require(process.argv[1])();"
          "process.stdout.write(JSON.stringify(m.manualData.shortcuts));")
    out = subprocess.run(['node', '-e', js, os.path.join(ATLAS, 'atlas-model.cjs')],
                         check=True, capture_output=True, text=True).stdout
    rows = {}
    for r in json.loads(out):
        rows.setdefault(r['action'], r)  # first row wins, as in vocabulary.js
    missing = [c['action'] for c in CUES if c['action'] not in rows]
    if missing:
        sys.exit('No shortcut row for: ' + ', '.join(missing))
    for c in CUES:
        c['row'] = rows[c['action']]


def max_text(s):
    """Max message boxes split on commas and semicolons and expand $; keep text plain."""
    bad = [ch for ch in ',;$\\"' if ch in s]
    if bad or not s.isascii():
        sys.exit(f'Text not safe for a Max message box: {s!r}')
    return s


def keys_line(c):
    r = c['row']
    line = f"{c['action']} = Mac: {r['mac']} / Win: {r['win']}"
    if c.get('note'):
        line += f" ({c['note']})"
    return max_text(line)


class Patch:
    def __init__(self):
        self.boxes, self.lines, self.params = [], [], {}

    def box(self, maxclass, ins, outs, x, y, w=100, h=20, text=None, outtype=None, **extra):
        bid = f'obj-{len(self.boxes) + 1}'
        b = dict(id=bid, maxclass=maxclass, numinlets=ins, numoutlets=outs,
                 patching_rect=[float(x), float(y), float(w), float(h)])
        if maxclass in ('newobj', 'message'):
            b.update(fontname='Arial Bold', fontsize=10.0)
        if text is not None:
            b['text'] = text
        if outs:
            b['outlettype'] = outtype or [''] * outs
        b.update(extra)
        self.boxes.append(b)
        return bid

    def obj(self, text, ins, outs, x, y, w=None, outtype=None):
        return self.box('newobj', ins, outs, x, y, w or 8 + 6 * len(text), 20, text, outtype)

    def msg(self, text, x, y, w=None):
        return self.box('message', 2, 1, x, y, w or 14 + 6 * len(text), 20, max_text(text))

    def show(self, maxclass, rect, prect, **extra):
        return self.box(maxclass, 1, 0, *rect, presentation=1,
                        presentation_rect=[float(v) for v in prect], **extra)

    def button(self, name, mode, rect, prect, texton=None):
        extra = dict(presentation=1, presentation_rect=[float(v) for v in prect],
                     mode=mode, text=name, varname=name, parameter_enable=1,
                     saved_attribute_attributes=dict(valueof=dict(
                         parameter_enum=['off', 'on'], parameter_longname=name,
                         parameter_mmax=1, parameter_shortname=name,
                         parameter_type=2, parameter_invisible=2)))
        if texton:
            extra['texton'] = texton
        bid = self.box('live.text', 1, 2, *rect, outtype=['', ''], **extra)
        self.params[bid] = [name, name, 0]
        return bid

    def wire(self, src, dst, outlet=0, inlet=0):
        self.lines.append(dict(patchline=dict(source=[src, outlet], destination=[dst, inlet])))


def build():
    p = Patch()
    # Audio passes straight through, so the device can sit on any track.
    pin = p.obj('plugin~', 2, 2, 20, 20, outtype=['signal', 'signal'])
    pout = p.obj('plugout~', 2, 2, 20, 60, outtype=['signal', 'signal'])
    p.wire(pin, pout, 0, 0)
    p.wire(pin, pout, 1, 1)

    # --- What the device shows (presentation view) ---
    p.show('live.comment', (200, 20, 200, 18), (6, 2, 300, 16), text='Watcher probe - Ableton Live Mapped',
           textjustification=0)
    cue = p.show('live.comment', (200, 420, 300, 40), (6, 20, 330, 40), text='Press Next for the first cue.',
                 fontsize=14.0, textjustification=0, linecount=2)
    keys = p.show('live.comment', (200, 470, 300, 36), (6, 62, 330, 34), text='',
                  fontsize=10.0, textjustification=0, linecount=2)
    status = p.show('live.comment', (200, 510, 120, 22), (6, 98, 200, 22), text='',
                    fontsize=16.0, textjustification=0)
    sview = p.show('live.comment', (200, 540, 130, 18), (6, 126, 110, 16), text='View: ?', textjustification=0)
    strack = p.show('live.comment', (340, 540, 160, 18), (118, 126, 140, 16), text='Track: ?', textjustification=0)
    sbrow = p.show('live.comment', (510, 540, 120, 18), (260, 126, 110, 16), text='Browser: ?', textjustification=0)
    p.show('live.comment', (200, 560, 300, 18), (6, 146, 360, 16),
           text='Starting state above is read from Live. Nothing is saved.', textjustification=0)
    showkeys = p.button('Show keys', 1, (420, 60, 70, 20), (344, 22, 76, 22), texton='Hide keys')
    nxt = p.button('Next', 0, (500, 60, 50, 20), (344, 50, 76, 22))
    stop = p.button('Stop', 0, (560, 60, 50, 20), (344, 78, 76, 22))

    # --- Start: read Live's state once the device is ready ---
    dev = p.obj('live.thisdevice', 1, 3, 600, 120, outtype=['bang', 'int', 'int'])
    init = p.obj('t b b b b', 1, 4, 600, 150)
    p.wire(dev, init)

    # Application.View: focused_document_view, observed.
    app_path = p.msg('path live_app view', 20, 120)
    app_lp = p.obj('live.path', 1, 3, 20, 150, outtype=['', '', ''])
    view_prop = p.msg('property focused_document_view', 140, 150)
    view_obs = p.obj('live.observer', 2, 2, 20, 180, outtype=['', ''])
    p.wire(init, app_path, 3)
    p.wire(init, view_prop, 2)
    p.wire(app_path, app_lp)
    p.wire(app_lp, view_obs, 0, 1)
    p.wire(view_prop, view_obs)
    view_chg = p.obj('zl change', 2, 2, 20, 210)
    p.wire(view_obs, view_chg)
    view_t = p.obj('t l l', 1, 2, 20, 240)
    p.wire(view_chg, view_t)
    view_set = p.obj('prepend set View:', 1, 1, 80, 270)
    p.wire(view_t, view_set, 1)
    p.wire(view_set, sview)

    # Application.View: is_view_visible Browser, polled (it is a function, not a property).
    brow_obj = p.obj('live.object', 2, 1, 20, 330)
    p.wire(app_lp, brow_obj, 0, 1)
    metro = p.obj('metro 200', 2, 1, 140, 270)
    on = p.msg('1', 140, 240)
    p.wire(init, on, 1)
    p.wire(on, metro)
    ask = p.msg('call is_view_visible Browser', 140, 300)
    p.wire(metro, ask)
    p.wire(ask, brow_obj)
    brow_route = p.obj('route is_view_visible', 2, 2, 20, 360)
    p.wire(brow_obj, brow_route)
    brow_chg = p.obj('change -1', 1, 3, 20, 390)
    p.wire(brow_route, brow_chg)
    brow_t = p.obj('t i i', 1, 2, 20, 420)
    p.wire(brow_chg, brow_t)
    brow_sel = p.obj('sel 0 1', 1, 3, 80, 450)
    p.wire(brow_t, brow_sel, 1)
    hidden = p.msg('set Browser: hidden', 80, 480)
    shown = p.msg('set Browser: shown', 200, 480)
    p.wire(brow_sel, hidden, 0)
    p.wire(brow_sel, shown, 1)
    p.wire(hidden, sbrow)
    p.wire(shown, sbrow)

    # Song.View: selected_track, observed; its name read for the display.
    set_path = p.msg('path live_set view', 340, 120)
    set_lp = p.obj('live.path', 1, 3, 340, 150, outtype=['', '', ''])
    track_prop = p.msg('property selected_track', 460, 150)
    track_obs = p.obj('live.observer', 2, 2, 340, 180, outtype=['', ''])
    p.wire(init, set_path, 3)
    p.wire(init, track_prop, 2)
    p.wire(set_path, set_lp)
    p.wire(set_lp, track_obs, 0, 1)
    p.wire(track_prop, track_obs)
    track_chg = p.obj('zl change', 2, 2, 340, 210)
    p.wire(track_obs, track_chg)
    track_t = p.obj('t l b l', 1, 3, 340, 240)
    p.wire(track_chg, track_t)
    name_obj = p.obj('live.object', 2, 1, 400, 300)
    get_name = p.msg('get name', 400, 270)
    p.wire(track_t, name_obj, 2, 1)
    p.wire(track_t, get_name, 1)
    p.wire(get_name, name_obj)
    name_route = p.obj('route name', 2, 2, 400, 330)
    p.wire(name_obj, name_route)
    name_set = p.obj('prepend set Track:', 1, 1, 400, 360)
    p.wire(name_route, name_set)
    p.wire(name_set, strack)

    # --- Seen: one gate per kind of change, opened only for the cue on show ---
    gates = {}
    seen = p.msg('set seen', 640, 430)
    p.wire(seen, status)
    for i, (kind, src, outlet) in enumerate([('view', view_t, 0), ('browser', brow_t, 0), ('track', track_t, 0)]):
        g = p.obj('gate 1', 2, 1, 640 + 70 * i, 380)
        p.wire(src, g, outlet, 1)
        gb = p.obj('t b', 1, 1, 640 + 70 * i, 400)
        p.wire(g, gb)
        p.wire(gb, seen)
        gates[kind] = g
    mask = p.obj('unpack 0 0 0', 1, 3, 640, 350)
    for i, kind in enumerate(['view', 'browser', 'track']):
        p.wire(mask, gates[kind], i, 0)

    # --- Keys: stored per cue, shown only while Show keys is on ---
    keys_reg = p.obj('zl reg', 2, 2, 900, 300)
    refresh = p.obj('t b', 1, 1, 900, 240)
    keys_gate = p.obj('gate 2', 2, 2, 900, 270)
    p.wire(refresh, keys_gate, 0, 1)
    plus = p.obj('+ 1', 2, 1, 960, 210)
    sk_t = p.obj('t b i', 1, 2, 960, 180)
    p.wire(showkeys, sk_t)
    p.wire(sk_t, plus, 1)
    p.wire(plus, keys_gate, 0, 0)
    p.wire(sk_t, refresh, 0)
    hint = p.msg('set Show keys to see the keys', 900, 330)
    p.wire(keys_gate, hint, 0)
    p.wire(keys_gate, keys_reg, 1, 0)
    p.wire(hint, keys)
    keys_set = p.obj('prepend set', 1, 1, 960, 360)
    p.wire(keys_reg, keys_set)
    p.wire(keys_set, keys)
    zero = p.msg('0', 960, 150)  # Show keys always starts off
    p.wire(init, zero, 0)
    p.wire(zero, showkeys)

    # --- Next: step through the cues ---
    nb = p.obj('t b', 1, 1, 640, 120)
    p.wire(nxt, nb)
    counter = p.obj(f'counter 0 {len(CUES) - 1}', 5, 4, 640, 150)
    p.wire(nb, counter)
    step = p.obj('t b b i', 1, 3, 640, 180)
    p.wire(counter, step)
    watching = p.msg('set watching', 760, 300)
    p.wire(step, watching, 0)
    p.wire(watching, status)
    p.wire(step, refresh, 1)
    pick = p.obj('sel ' + ' '.join(str(i) for i in range(len(CUES))), 1, len(CUES) + 1, 640, 210)
    p.wire(step, pick, 2)
    order = ['view', 'browser', 'track']
    for i, c in enumerate(CUES):
        x = 640 + 220 * i
        m = p.msg(f"set {c['cue']}", x, 240)
        p.wire(pick, m, i)
        p.wire(m, cue)
        k = p.msg(keys_line(c), x, 270)
        p.wire(pick, k, i)
        p.wire(k, keys_reg, 0, 1)
        g = p.msg(' '.join('1' if kind == c['kind'] else '0' for kind in order), x, 300)
        p.wire(pick, g, i)
        p.wire(g, mask)

    # --- Stop: close the gates and clear the cue; Live's state keeps updating ---
    sb = p.obj('t b b b', 1, 3, 1200, 120)
    p.wire(stop, sb)
    closed = p.msg('0 0 0', 1200, 150)
    stopped = p.msg('set Stopped. Next starts again.', 1260, 180)
    blank = p.msg('set', 1320, 210)
    p.wire(sb, closed, 2)
    p.wire(closed, mask)
    p.wire(sb, stopped, 1)
    p.wire(stopped, cue)
    p.wire(sb, blank, 0)
    p.wire(blank, keys)
    p.wire(blank, status)
    return p


def patcher(p):
    params = dict(p.params)
    params['inherited_shortname'] = 1
    return {'patcher': {
        'fileversion': 1,
        'appversion': {'major': 8, 'minor': 1, 'revision': 2, 'architecture': 'x64', 'modernui': 1},
        'classnamespace': 'box',
        'rect': [100.0, 100.0, 1500.0, 640.0],
        'openrect': [0.0, 0.0, 430.0, 169.0],
        'bglocked': 0, 'openinpresentation': 1,
        'default_fontsize': 10.0, 'default_fontface': 0, 'default_fontname': 'Arial Bold',
        'gridonopen': 1, 'gridsize': [8.0, 8.0], 'gridsnaponopen': 1, 'objectsnaponopen': 1,
        'statusbarvisible': 2, 'toolbarvisible': 1,
        'boxanimatetime': 500, 'enablehscroll': 1, 'enablevscroll': 1,
        'devicewidth': 430.0,
        'description': 'Atlas practice probe: one cue at a time, says seen when Live changes.',
        'digest': '', 'tags': '', 'style': '', 'subpatcher_template': '',
        'title': 'watcher-probe',
        'boxes': [{'box': b} for b in p.boxes],
        'lines': p.lines,
        'parameters': params,
        'dependency_cache': [], 'latency': 0,
        'project': {'version': 1, 'creationdate': 3590052493, 'modificationdate': 3590052493,
                    'viewrect': [0.0, 0.0, 300.0, 500.0], 'autoorganize': 1, 'hideprojectwindow': 1,
                    'showdependencies': 1, 'autolocalize': 0, 'contents': {'patchers': {}},
                    'layout': {}, 'searchpath': {}, 'detailsvisible': 0,
                    'amxdtype': 1633771873, 'readonly': 0, 'devpathtype': 0, 'devpath': '.',
                    'sortmode': 0, 'viewmode': 0},
        'autosave': 0}}


def write_amxd(doc):
    # Same container as Live's own "Max Audio Effect.amxd": 'ampf', 'aaaa' (audio effect),
    # an empty 'meta' chunk, then 'ptch' with the JSON and a closing NUL.
    body = json.dumps(doc, indent=1).encode('utf-8') + b'\n\x00'
    head = (b'ampf' + struct.pack('<I', 4) + b'aaaa' + b'meta' + struct.pack('<I', 4)
            + struct.pack('<I', 0) + b'ptch' + struct.pack('<I', len(body)))
    with open(OUT, 'wb') as f:
        f.write(head + body)


def check():
    data = open(OUT, 'rb').read()
    assert data[:4] == b'ampf' and data[8:12] == b'aaaa' and data[24:28] == b'ptch', 'bad header'
    size = struct.unpack('<I', data[28:32])[0]
    assert size == len(data) - 32, f'ptch size {size} != {len(data) - 32}'
    doc = json.loads(data[32:].rstrip(b'\x00').decode('utf-8'))
    boxes = {b['box']['id']: b['box'] for b in doc['patcher']['boxes']}
    for l in doc['patcher']['lines']:
        (s, o), (d, i) = l['patchline']['source'], l['patchline']['destination']
        assert s in boxes and d in boxes, f'cord to a missing box: {l}'
        assert o < boxes[s]['numoutlets'], f'{boxes[s].get("text", boxes[s]["maxclass"])} has no outlet {o}'
        assert i < boxes[d]['numinlets'], f'{boxes[d].get("text", boxes[d]["maxclass"])} has no inlet {i}'
    shown = [b for b in boxes.values() if b.get('presentation')]
    print(f'{OUT}: {len(data)} bytes, JSON parses, {len(boxes)} boxes, '
          f'{len(doc["patcher"]["lines"])} cords checked, {len(shown)} shown on the device')
    for c in CUES:
        print(f"  cue: {c['cue']}  [{keys_line(c)}]  watches: {c['kind']}")


if __name__ == '__main__':
    atlas_rows()
    write_amxd(patcher(build()))
    check()
