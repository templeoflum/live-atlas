#!/usr/bin/env python3
"""Build practice/navigation-exercise-1.als and practice/EXERCISE_1.md from atlas data.

Run from anywhere:  python3 practice/make_exercise_1.py
Needs node (to load the atlas the way its own tests do) and Ableton Live 12 installed,
because the Set starts from Live's built-in default MIDI track Set and borrows the
shape of an empty MIDI clip from Live's built-in Quick Start Beat template.
Nothing in the app bundle is changed; no samples or devices are referenced.

Every step names an atlas card id and the manual shortcut-table action(s) it uses.
The script stops if a card or action is missing from the atlas, so rerunning it after
atlas edits either reproduces the exercise from current data or says what broke.
"""
import copy, gzip, json, os, subprocess, sys
import xml.etree.ElementTree as ET

HERE = os.path.dirname(os.path.abspath(__file__))
ATLAS = os.path.dirname(HERE)
LIVE = os.environ.get('LIVE_APP', '/Applications/Ableton Live 12 Suite.app')
CORE = os.path.join(LIVE, 'Contents/App-Resources/Core Library')
BASE = os.path.join(CORE, 'Defaults/Creating Tracks/MIDI Track/Default MIDI Track.als')
CLIP_SHAPE = os.path.join(CORE, 'Templates/Quick Start Beat.als')
VIEW_SHAPE = os.path.join(CORE, 'Templates/8-Track Template.als')
OUT_ALS = os.path.join(HERE, 'navigation-exercise-1.als')
OUT_MD = os.path.join(HERE, 'EXERCISE_1.md')

# where: 'session' steps become scenes (read top to bottom in Session View);
# 'arrangement' steps become locators (read left to right in Arrangement View).
# keys: exact action names from the manual's shortcut table (manualData.shortcuts).
STEPS = [
    dict(where='session', card='ref-first-steps--info-view', keys=['Hide/Show Info View'],
         label='Info View',
         do='Show Info View, the help area at the bottom left. From now on, hover over a scene name to read that step in full there.'),
    dict(where='session', card='session', keys=['Toggle Session/Arrangement View'],
         label='Switch views',
         do='Go to Arrangement View, then back here to Session View. If Tab moves focus instead, Use Tab to Move Focus is on in Settings.'),
    dict(where='session', card='clips', keys=[], click='Click the clip name',
         label='Select the clip',
         do='Click the name of the clip "Select me" in this row. Click the name, not the triangle: the triangle launches it.'),
    dict(where='session', card='clip-view', keys=['Toggle Between Device/Clip View'],
         label='Clip View',
         do='Make the bottom panel show Clip View: the selected clip\'s (empty) notes and settings. If it already does, press the keys twice to see them switch.'),
    dict(where='session', card='device-view', keys=['Toggle Between Device/Clip View'],
         label='Device View',
         do='Swap the bottom panel to Device View: this track\'s devices, empty for now.'),
    dict(where='session', card='hide-browser', keys=['Hide/Show Browser'],
         label='Browser',
         do='Show the Browser on the left, if it is hidden.'),
    dict(where='session', card='browser', keys=['Search in Browser', 'Jump to Search Results'],
         label='Search Drift',
         do='Search the Browser for Drift, then jump down to the results.'),
    dict(where='session', card='instrument', keys=['Add Device from Browser'],
         label='Load Drift',
         do='With Drift highlighted, load it. It appears in Device View on this track.'),
    dict(where='arrangement', card='arrangement', keys=['Toggle Session/Arrangement View'],
         label='Arrangement',
         do='Go to Arrangement View. The rest of the steps are these locators, left to right.'),
    dict(where='arrangement', card='ca-arm', keys=['Arm Selected Tracks'],
         label='Arm',
         do='Arm the selected track. Arm it before step 11: with the computer keyboard on, C changes velocity instead.'),
    dict(where='arrangement', card='keys-typing', keys=['Computer MIDI Keyboard'],
         label='Computer keyboard',
         do='Turn on the Computer MIDI Keyboard, then press A, S, D and F to hear Drift.'),
    dict(where='arrangement', card='ca-record-arrangement', keys=['Record', 'Play from Start Marker/Stop'],
         label='Record',
         do='Record into the Arrangement, play a few keys, then stop. A new clip appears on the track.'),
]


def atlas_data():
    """Load shortcut rows and card titles with the atlas's own model loader."""
    js = ("const m=require(process.argv[1])();"
          "const cards={};for(const [id,e] of m.entries)cards[id]=e.title;"
          "process.stdout.write(JSON.stringify({rows:m.manualData.shortcuts,cards}));")
    out = subprocess.run(['node', '-e', js, os.path.join(ATLAS, 'atlas-model.cjs')],
                         check=True, capture_output=True, text=True).stdout
    return json.loads(out)


def resolve(data):
    rows, problems = {}, []
    for r in data['rows']:
        rows.setdefault(r['action'], r)  # first row wins, as in vocabulary.js
    for n, s in enumerate(STEPS, 1):
        s['n'] = n
        if s['card'] not in data['cards']:
            problems.append(f"step {n}: no atlas card '{s['card']}'")
        s['card_title'] = data['cards'].get(s['card'], '?')
        s['rows'] = []
        for a in s['keys']:
            if a not in rows:
                problems.append(f"step {n}: no shortcut row '{a}'")
            else:
                s['rows'].append(rows[a])
    if problems:
        sys.exit('Atlas data does not match the exercise:\n  ' + '\n  '.join(problems))


def mac(row):
    return row['mac'].split(' or ')[0]


def keys_text(s):
    return ', then '.join(mac(r) for r in s['rows']) if s['rows'] else s['click']


def short_name(s):
    return f"{s['n']} {s['label']} · {keys_text(s)}"


def info_text(s):
    keys = '; '.join(f"{r['action']}: {mac(r)} (Windows {r['win'].split(' or ')[0]})" for r in s['rows'])
    return (f"Step {s['n']} of {len(STEPS)}. {s['do']} "
            f"Keys: {keys or s['click'] + ' (no shortcut)'}. "
            f"Atlas card: {s['card_title']} ({s['card']}).")


def load(path):
    with gzip.open(path, 'rb') as f:
        return ET.fromstring(f.read())


def set_value(el, path, value):
    el.find(path).set('Value', value)


def build():
    root = load(BASE)
    ls = root.find('LiveSet')
    track = ls.find('Tracks/MidiTrack')
    main = ls.find('MainTrack')
    session = [s for s in STEPS if s['where'] == 'session']
    arrangement = [s for s in STEPS if s['where'] == 'arrangement']

    # Real view-state values from a full built-in template; the track default leaves them unset.
    vs = load(VIEW_SHAPE).find('LiveSet/ViewStates')
    old = ls.find('ViewStates')
    at = list(ls).index(old)
    ls.remove(old)
    ls.insert(at, vs)

    # Scenes: one per Session step, named so the list reads as the exercise.
    scenes = ls.find('Scenes')
    proto = scenes[0]
    for c in list(scenes):
        scenes.remove(c)
    for i, s in enumerate(session):
        sc = copy.deepcopy(proto)
        sc.set('Id', str(i))
        set_value(sc, 'Name', short_name(s))
        set_value(sc, 'Annotation', info_text(s))
        scenes.append(sc)

    # Every clip-slot list (track main + freeze sequencer, Main track freeze sequencer) needs one slot per scene.
    for owner in (track, main):
        for lst in owner.iter('ClipSlotList'):
            slot = lst[0]
            for c in list(lst):
                lst.remove(c)
            for i in range(len(session)):
                cs = copy.deepcopy(slot)
                cs.set('Id', str(i))
                lst.append(cs)

    # One empty one-bar MIDI clip, "Select me", in the scene for the select-a-clip step.
    clip_root = load(CLIP_SHAPE)
    clip = copy.deepcopy(next(clip_root.iter('MidiClip')))
    clip.set('Id', '0')
    for path, v in [('CurrentEnd', '4'), ('Loop/LoopEnd', '4'), ('Loop/OutMarker', '4'),
                    ('Loop/HiddenLoopEnd', '4'), ('ScrollerTimePreserver/RightTime', '4'),
                    ('TimeSelection/AnchorTime', '0'), ('TimeSelection/OtherTime', '0'),
                    ('Name', 'Select me'), ('Color', '13'),
                    ('Notes/NoteIdGenerator/NextId', '1')]:
        set_value(clip, path, v)
    kts = clip.find('Notes/KeyTracks')
    for c in list(kts):
        kts.remove(c)
    pick = next(i for i, s in enumerate(session) if s['card'] == 'clips')
    set_value(clip, 'Annotation', info_text(session[pick]) + ' ' + info_text(session[pick + 1]))
    slot = track.find('DeviceChain/MainSequencer/ClipSlotList')[pick].find('ClipSlot')
    value = slot.find('Value')
    value.append(clip)

    # Locators: a pointer to Session View at bar 1, then one per Arrangement step every two bars.
    locs = ls.find('Locators/Locators')
    first = session[0]['n'], session[-1]['n']
    entries = [(0, f"Steps {first[0]}-{first[1]} are in Session View · Tab",
                f"This Set is exercise 1 from the atlas. Steps {first[0]} to {first[1]} are the scene names in Session View (press Tab). Steps {arrangement[0]['n']} to {arrangement[-1]['n']} are the locators here.")]
    entries += [(8 * (i + 1), short_name(s), info_text(s)) for i, s in enumerate(arrangement)]
    for i, (t, name, note) in enumerate(entries):
        loc = ET.SubElement(locs, 'Locator', Id=str(i))
        for tag, v in [('LomId', '0'), ('Time', str(t)), ('Name', name), ('Annotation', note), ('IsSongStart', 'false')]:
            ET.SubElement(loc, tag, Value=v)

    # Track and Set info text.
    set_value(track, 'Name/UserName', 'Exercise 1')
    set_value(track, 'Name/EffectiveName', 'Exercise 1')
    summary = ('Navigation exercise 1 from Ableton Live, Mapped: move between views, open Clip and Device View, '
               'load a device by searching the Browser, and record from the computer keyboard into Arrangement. '
               'Each scene name and locator is one step with its keys; hover it with Info View open for the full step and its atlas card.')
    set_value(track, 'Name/Annotation', summary)
    set_value(ls, 'Annotation', summary)
    set_value(ls, 'SelectedDocumentViewInMainWindow', '0')

    xml = ET.tostring(root, encoding='unicode')
    data = ('<?xml version="1.0" encoding="UTF-8"?>\n' + xml + '\n').encode('utf-8')
    with open(OUT_ALS, 'wb') as f:
        with gzip.GzipFile(filename='', mode='wb', fileobj=f, mtime=0) as gz:
            gz.write(data)


def write_md():
    lines = [
        '# Exercise 1 · Move around Live',
        '',
        'Generated by `make_exercise_1.py` from the atlas cards and the manual\'s shortcut table. Do not edit by hand; edit the step list in the script and rerun it.',
        '',
        'File: `practice/navigation-exercise-1.als` (Live 12 format, built from Live 12.4\'s own default MIDI track Set). One MIDI track, no devices, no samples. The learner loads Drift in step 8.',
        '',
        'Where the steps are in Live:',
        '',
        '- Steps 1-8 are the scene names in Session View, top to bottom. The clip "Select me" sits in the step 3 row.',
        '- Steps 9-12 are locators along the top of Arrangement View, left to right. The locator at bar 1 points back to Session View.',
        '- Each scene, locator and the clip carries the full step as info text. With Info View open (step 1), hover it to read it.',
        '',
        '| Step | Where | What to do | Mac keys | Windows keys | Shortcut-table action | Atlas card |',
        '|---|---|---|---|---|---|---|',
    ]
    for s in STEPS:
        where = 'Session (scene)' if s['where'] == 'session' else 'Arrangement (locator)'
        acts = '; '.join(r['action'] for r in s['rows']) or '—'
        win = ', then '.join(r['win'].split(' or ')[0] for r in s['rows']) or s['click']
        lines.append(f"| {s['n']} | {where} | {s['do']} | {keys_text(s)} | {win} | {acts} | {s['card_title']} (`{s['card']}`) |")
    lines += [
        '',
        'Notes',
        '',
        '- Keys are the first alternative in each manual row. Toggle Between Device/Clip View also has F12. Hide/Show Browser also has Cmd Option 5.',
        '- Drift is used because the atlas card Drift · a synth in every edition (`drift-history`) says every edition has it.',
        '- Step 3 has no shortcut. The atlas card for clips says to click or double-click them.',
        '- On a MacBook, F9 (step 12) may need the fn key, depending on the keyboard setting. This is from macOS, not the atlas.',
        '- The Set is saved in Live 12\'s format. Live 11 is not expected to open it (not checked).',
        '',
    ]
    with open(OUT_MD, 'w') as f:
        f.write('\n'.join(lines))


if __name__ == '__main__':
    resolve(atlas_data())
    build()
    write_md()
    print(f'wrote {OUT_ALS}\nwrote {OUT_MD}')
