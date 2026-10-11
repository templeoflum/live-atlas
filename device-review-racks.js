// Control-level review of Racks (chapter 24) and the device chain, presets and plug-ins (chapter 23),
// 2026-09-24. Original summaries checked against the cached manual; attached to existing actions.
(()=>{
  const R='instrument-drum-and-effect-racks',W='working-with-instruments-and-effects';
  // Racks are registered under their manual anchors rather than their card ids.
  const add=(device,action,anchor,terms,chapter=R)=>deviceControlDetails.add(device,action,anchor,terms,'',chapter);
  const both=(action,anchor,terms,devices=['instrument-rack','audio-rack'])=>devices.forEach(d=>add(d,action,anchor,terms));

  const overview=[
    ['Parallel chains','Inside a Rack, each chain gets the same input, processes it through its own devices in series, and the chains are mixed together. A whole Rack acts as one device, and Racks can nest.'],
    ['Drum Racks differ','Each drum chain receives only the MIDI note assigned to it.'],
    ['Macro Controls','Knobs that can each control any number of parameters inside the Rack; map them to hardware for expressive control.']
  ];
  const creating=[
    ['Four kinds','MIDI Effect Racks (MIDI effects, MIDI tracks only); Audio Effect Racks (audio effects; on MIDI tracks only after an instrument); Instrument Racks (MIDI effects, then an instrument, then audio effects); Drum Racks (same order, plus up to six return chains).'],
    ['Creating','Drag an empty Rack preset from the Browser, or select device title bars and choose Group (⌘ G / Ctrl G) or Group to Drum Rack. Grouping again nests a Rack; brackets show the nesting.'],
    ['Ungroup','Select the Rack’s title bar and use Ungroup from the Edit or context menu.']
  ];
  const looking=[
    ['View column','Selectors for Macro Controls, Chain List, Devices (and Pad View in Drum Racks). Rounded brackets enclose a Rack’s contents.'],
    ['Whole Rack','Select its own title bar to move, copy, delete, Rename or Edit Info Text. With every view hidden, or double-clicking the title bar, it folds slim.'],
    ['Finding a device','Right-click the Device View selector for a list of every device in the track and jump to it.']
  ];
  const all=['instrument-rack','audio-rack','midi-rack'];
  both('group','an-overview-of-racks',overview,all);
  both('group','creating-racks',creating,all);
  both('group','looking-at-racks',looking,all);

  const chainList=[
    ['Chain List','Where incoming signal branches: one entry per chain. Drop presets, devices or chains in the area below to add chains; drag chains between Racks and tracks.'],
    ['Navigating','The selected chain shows in the Devices view; ↑ ↓ step through them. Multi-select for copying and regrouping.'],
    ['Per chain','Activator, Solo, Hot-Swap; volume and pan (not in MIDI Effect Racks); Rename, Edit Info Text, color. Chains save as Browser presets.']
  ];
  const autoSelect=[
    ['Auto Select','Selects whichever chains are currently processing: in Drum Racks those receiving their note, elsewhere those whose zones pass the signal. Handy for troubleshooting.']
  ];
  const mixing=[
    ['In the mixer','A track with a multi-chain Instrument or Drum Rack gets a fold button; chains appear like tracks without clip slots, mirroring the chain list. Clicking a chain’s mixer title shows only its devices.'],
    ['Several chains','Multi-selected in the Session mixer, one fader moves all (not from the chain list).']
  ];
  both('chains','chain-list',chainList);
  both('chains','auto-select',autoSelect);
  both('chains','mixing-with-racks',mixing);

  add('instrument-rack','zones','zones',[
    ['Zones','Filters at each chain’s input deciding which notes or values get through: Key, Velocity and Chain Select, shown with the buttons above the Chain List (Hide hides them). Audio Effect Racks have only Chain Select; Drum Racks have none.'],
    ['Editing','The lower bar moves and resizes the zone; the thin upper bar sets fade ranges. Drag edges to resize, the middle to move.']
  ]);
  add('instrument-rack','zones','signal-flow-through-zones',[
    ['Every zone must pass','A note reaches a chain’s devices only if it lies inside that chain’s key, velocity and chain select zones; all passing chains are then mixed.']
  ]);
  add('instrument-rack','zones','key-zones',[
    ['Key zones','The note range (nearly 11 octaves) each chain answers, for keyboard splits; fades lower velocity toward the edges.']
  ]);
  add('instrument-rack','zones','velocity-zones',[
    ['Velocity zones','The Note On velocity range (1–127) each chain answers, for velocity layers; fades lower velocity toward the edges.']
  ]);
  const chainSelect=[
    ['Chain selector','A draggable value (0–127); only chains whose zone covers it produce output. By default it filters notes only; Chain Selector Filters MIDI Ctrl (ruler context menu) makes it filter all MIDI.'],
    ['Fades','In audio-output Racks, fades lower each chain’s output volume. Moving away from a zone with a fade silences it; without a fade, tails such as reverb ring out.']
  ];
  const presetBanks=[
    ['Preset banks','Chain select zones default to length 1 at value 0. Give each chain its own value (0, 1, 2, 3) and map the selector to an encoder to switch between setups.']
  ];
  const crossfade=[
    ['Crossfading','Lengthen the zones and add fade ranges so neighbouring setups blend, keeping one point where each plays alone.']
  ];
  add('instrument-rack','zones','chain-select-zones',chainSelect);
  add('instrument-rack','zones','making-preset-banks-using-chain-select',presetBanks);
  add('instrument-rack','zones','crossfading-preset-banks-using-fade-ranges',crossfade);
  // MIDI Effect Rack: same chain list and zones; fades there lower note velocity rather than output volume.
  add('midi-rack','chains','chain-list',chainList);
  add('midi-rack','chains','auto-select',autoSelect);
  ['zones','signal-flow-through-zones','key-zones','velocity-zones'].forEach(a=>{
    const src={zones:[['Zones','Key, Velocity and Chain Select filters at each chain’s input decide which notes get through; the lower bar moves and resizes a zone, the upper bar sets fades.']],
      'signal-flow-through-zones':[['Every zone must pass','A note reaches a chain only if it lies inside its key, velocity and chain select zones; the chains’ MIDI outputs are then combined.']],
      'key-zones':[['Key zones','The note range each chain answers, for splits; fades lower velocity toward the edges.']],
      'velocity-zones':[['Velocity zones','The Note On velocity range each chain answers; fades lower velocity toward the edges.']]}[a];
    add('midi-rack','zones',a,src);
  });
  add('midi-rack','zones','chain-select-zones',[['Chain selector','Only chains whose zone covers the selector value (0–127) pass notes; in MIDI Effect Racks fades lower note velocity. Chain Selector Filters MIDI Ctrl extends it to all MIDI.']]);
  add('midi-rack','zones','making-preset-banks-using-chain-select',presetBanks);
  add('midi-rack','zones','crossfading-preset-banks-using-fade-ranges',crossfade);
  add('audio-rack','select','chain-select-zones',chainSelect);
  add('audio-rack','select','making-preset-banks-using-chain-select',presetBanks);
  add('audio-rack','select','crossfading-preset-banks-using-fade-ranges',crossfade);

  const macros=[
    ['Up to 16','Eight show by default; the view buttons add or remove visible knobs (saved with the Set).']
  ];
  const map=[
    ['Map mode','Click Map: mappable parameters get a coloured overlay, Map buttons appear under each Macro, and the Mapping Browser opens. Click a parameter, then a Macro’s Map button.'],
    ['Min / Max / Invert Range','Limit the range in the Mapping Browser; Min above Max inverts it, as does Invert Range in its context menu.'],
    ['Mapped parameters','Appear disabled because the Macro now controls them (clip envelopes can still modulate them).'],
    ['Several targets','The Macro reverts to a generic name and a 0–127 scale unless all targets share units. Rename, color and Edit Info Text from the menus.']
  ];
  const randomize=[
    ['Rand','The Rack title-bar button randomizes all mapped Macros. Exclude Macro from Randomization protects one; Volume Macros in Instrument Rack presets are excluded by default.']
  ];
  const variations=[
    ['Variations','Show Macro Variations; New stores the current Macro settings (Variation 1, 2…). Launch recalls one; Overwrite replaces it; rename, duplicate or delete from menus.'],
    ['Exclude Macro From Variations','Keeps a Macro fixed when variations are launched.']
  ];
  ['instrument-rack','audio-rack','drum-rack','midi-rack'].forEach(d=>{
    add(d,'map','macro-controls',macros.concat([['Uses','Convenient access to key parameters, multi-parameter morphs, or one custom front panel for a big setup.']]));
    add(d,'map','using-the-macro-controls',macros);
    add(d,'map','map-mode',map);
    add(d,'vary','randomizing-macro-controls',randomize);
    add(d,'vary','macro-control-variations',variations);
  });

  // Drum Rack
  add('drum-rack','pads','drum-racks',[
    ['View column extras','Toggles for Input/Output, Send and Return sections, plus Auto Select.'],
    ['Receive / Play','The incoming note (with GM drum names) a chain answers, and the note sent to its devices. All Notes passes everything and disables Play and Choke.'],
    ['Preview','Fires the chain’s note without a controller.']
  ]);
  add('drum-rack','route','drum-racks',[
    ['Choke','Sixteen choke groups: pads in the same group cut each other off, e.g. closed hi-hat silencing open.'],
    ['Sends / return chains','Up to six return chains at the bottom of the chain list, fed by post-fader send sliders on each drum chain.'],
    ['Return Audio To','Send a return chain’s output to the Rack’s main output or straight to the Set’s return tracks.']
  ]);
  add('drum-rack','pads','pad-view',[
    ['Pads','128 pads, one per MIDI note. Drag the overview, or use ↑ ↓, to scroll in groups of 16; add ⌘ (Mac) / Alt (Windows) to move by single rows.'],
    ['Dropping','A sample on an empty pad makes a chain with Simpler; an effect on the same pad goes after it; a new sample replaces only Simpler and its sample.'],
    ['Several samples','Map upward chromatically from the pad; ⌘-drag (Mac) / Alt-drag (Windows) layers them on one pad in a nested Instrument Rack.'],
    ['Pad to pad','Dragging swaps note mappings (clips then trigger different sounds); ⌘/Alt-dragging layers the chains.'],
    ['Hot-Swap / D','In Hot-Swap mode, D switches the target between the Drum Rack and the last selected pad.'],
    ['What a pad shows','Empty: its note and suggested GM instrument. One chain: its name, with mute, solo, preview, Hot-Swap, rename, delete. Several chains: Multi.'],
    ['Pad controllers','A natively supported pad controller plays the pads visible on screen and follows scrolling.']
  ]);
  add('drum-rack','extract','mixing-with-racks',mixing);
  add('drum-rack','extract','extracting-chains',[
    ['Extracting','Drag chains out to other tracks or Racks; return chains dragged to the mixer become return tracks.'],
    ['Taking the notes','Dragging a drum chain from the mixer to the drop area makes a new track with its devices and its MIDI notes; drag from the chain list for devices only.']
  ]);
  // Device chain, presets and plug-ins (chapter 23)
  const w=(device,action,anchor,terms)=>add(device,action,anchor,terms,W);
  deviceControlDetails.add('chain','load','devices',[
    ['Where devices are','Built-in audio effects, MIDI effects and instruments are in the browser; VST and Audio Units (macOS only) plug-ins are under its Plug-Ins label.']
  ],'','live-concepts');
  w('chain','load','working-with-instruments-and-effects',[
    ['Three kinds of device','MIDI effects (MIDI tracks only), instruments (MIDI in, audio out; MIDI tracks), audio effects (audio, return and Main tracks, or after an instrument).']
  ]);
  w('chain','load','device-view',[
    ['Opening it','Double-click a track title bar. Clip and Device View normally alternate; the toggles by their selectors (bottom right) stack both. ⌘ ⌥ 3 / 4 (Ctrl Alt 3 / 4) show or hide them.'],
    ['Folding','Double-click a device title bar, or choose Fold, to collapse it.']
  ]);
  w('chain','load','using-devices',[
    ['Adding','Double-click in the Browser (adds to the selected track, or makes one), select a track and press Enter, or drag into a track, drop area or Device View. A sample dragged onto a MIDI track’s Device View makes a Simpler.'],
    ['Order','Signal runs left to right: MIDI effects, then the instrument, then audio effects. Effect order changes the sound.'],
    ['Hearing live input','With Monitor on Auto the track must be armed (MIDI tracks usually arm when you add an instrument).'],
    ['Meters / headroom','Input and output meters on each device show where signal drops out. Between devices there is practically unlimited headroom; clipping only happens at a hardware output or when writing a file.']
  ]);
  w('chain','move','using-devices',[
    ['Moving / removing','Drag a title bar to reorder, or into another track in Session or Arrangement; select and press Delete to remove.'],
    ['Cut / copy / paste / duplicate','Pasted devices go before the selected one; click after the last device (or → to it) to paste at the end. Changes rarely interrupt audio.']
  ]);
  w('chain','bypass','device-title-bar',[
    ['Activator','Off behaves like temporarily deleting the device: signal passes unprocessed and it uses no CPU.'],
    ['View toggles','An arrow beside the Activator opens a view above Device View (Roar’s matrix, EQ Eight’s display); a triangle expands sections inside the device (Phaser-Flanger’s LFO).'],
    ['Other title-bar controls','Save and hot-swap presets, scale awareness or Learn on some devices, and the context menu (right-click or Show Options) with Cut, Copy, Rename and device-specific options.']
  ]);
  w('chain','compare','device-ab-comparison',[
    ['A and B','Every built-in device has two states. After the first change, B keeps the starting values and edits go to A.'],
    ['Compare commands','Compare: Copy A to B, and Compare: Switch to B (or P), from the Edit or context menu; “(B)” marks the title. Not for Racks, Max for Live devices or plug-ins.'],
    ['Automation','Is specific to each state: switching disables it; use Re-Enable Automation in the state you want.'],
    ['Copying / saving','A copied device or saved preset takes only the currently selected state, for both A and B.']
  ]);
  w('live-device-presets','choose','live-device-presets',[
    ['Device folders','Each device is a folder in the Browser: the folder loads the default (factory or your own), the items inside are presets.'],
    ['Keys','↑ ↓ to move, ← → to close and open folders, Enter to load; or double-click, or drag onto a title bar or chain. Drop a preset over an existing one to replace it.'],
    ['Files','.adg, .adv and .amxd files can also be dragged in from Finder or Explorer.']
  ]);
  w('live-device-presets','choose','hot-swapping-presets',[
    ['Q or Hot-Swap','Links the device to the Browser; without a selection, it targets the first audio effect or the instrument.'],
    ['Swapping','Same device type only; ↑ ↓ and Enter or double-click. Load the parent folder for default settings.'],
    ['-EnableHotSwapOnSelection','An Options.txt entry that loads presets as soon as they are selected.'],
    ['Leaving','Q, Esc, the X in the Hot-Swap bar or title bar, or moving to another view.']
  ]);
  w('live-device-presets','choose','hot-swapping-samples',[
    ['Where','Hot-Swap Sample buttons in Drum Rack pads, Drum Sampler’s waveform, Impulse slots, Simpler’s display (on hover) and Sampler’s Zone Editor (always visible).'],
    ['Using it','Opens the sample’s folder; Enter or double-click loads another. Leave with the button, the X, Esc, Q or another view.']
  ]);
  w('live-device-presets','save','saving-presets',[
    ['Save Preset','Saves the settings (and info text) to the User Library; press Enter for the suggested name or type one; Esc cancels.'],
    ['Elsewhere','Drag the title bar to any Places folder, such as Current Project.']
  ]);
  w('live-device-presets','default','default-presets',[
    ['Save as Default Preset','Device context menu: used instead of generic settings for any Live device or Rack; Live asks before overwriting.'],
    ['Plug-in defaults','After Configure Mode, the track header’s Save as Default Configuration stores which parameters appear (not their values), separately for VST and AU.'],
    ['Default tracks','Track header → Save as Default Audio/MIDI Track, with or without devices.'],
    ['Dropping samples','Save an edited empty Simpler or Sampler into Defaults/Dropping Samples/On Drum Rack or On Device View (pads also offer a context option).'],
    ['Slicing / Audio to MIDI','A Drum Rack with one Simpler or Sampler chain in Defaults/Slicing (choose among several when slicing); a Rack in Defaults/Audio to MIDI for Drums (must hold a Drum Rack), Harmony or Melody.'],
    ['Project-specific','Recreate a Defaults folder inside a Project; its Sets use those instead. The context-menu commands always save to the User Library.']
  ]);
  w('using-plug-ins','load','using-plug-ins',[
    ['Formats','VST2, VST3, and on macOS Audio Units 2 and 3. Instruments go on MIDI tracks; effects on audio tracks or after instruments.'],
    ['Plug-Ins label','Keyboard icons mark instruments. Presets appear in the Browser only for Audio Units (some after Hot-Swap is pressed).'],
    ['Activating sources','Nothing appears until you activate plug-in sources (Browser button or Plug-Ins Settings).'],
    ['Rescan','Detects plug-ins installed while Live runs; ⌥/Alt-Rescan deletes the database and scans clean. Hold ⌥/Alt at launch to skip scanning when troubleshooting crashes.'],
    ['Intel Macs','Only Universal or Intel plug-ins run, not PowerPC ones.']
  ]);
  w('using-plug-ins','load','plug-ins-in-the-device-view',[
    ['Live panel','Up to 64 parameters appear as sliders; more than that opens an empty panel to configure. The title-bar button shows or hides them.'],
    ['X-Y field','Controls two chosen parameters at once, handy live.']
  ]);
  w('using-plug-ins','load','showing-plug-in-panels-in-separate-windows',[
    ['Plug-in window','Opens the original interface; it and the Live panel stay in sync, and its title shows the track.'],
    ['Settings','Auto-Open Plug-In Windows; Multiple Plug-In Windows (or ⌘/Ctrl while opening); Auto-Hide Plug-In Windows (show only the selected track’s).'],
    ['⌘ ⌥ P / Ctrl Alt P','Hides and shows open plug-in windows (once they have been opened, or with Auto-Open on).']
  ]);
  w('using-plug-ins','load','vst-plug-ins',[
    ['VST sources','Activate in the Browser or Plug-Ins Settings (⌘ , / Ctrl ,), under Plug-In Sources.']
  ]);
  w('using-plug-ins','load','the-vst-plug-in-folder',[
    ['Windows','Choose the VST Plug-In Custom Folder (Live may find it in the registry) and set Use VST Plug-In Custom Folder to On.'],
    ['macOS','Use VST plug-ins in System Folders covers /Library/Audio/Plug-Ins/VST; a Custom Folder can add or replace it.'],
    ['Other folders','Put an alias to them inside the custom (or macOS system) folder; aliases can point to other drives.'],
    ['Crashing plug-ins','After a crash during scanning, Live names the plug-in and offers to rescan or disable it; a second crash disables it until reinstalled.']
  ]);
  w('using-plug-ins','load','audio-units-plug-ins',[
    ['Use Audio Units','Turn on in Plug-In Sources (macOS only).'],
    ['Modes and presets','Some quality modes are only in the plug-in’s own window. AU presets behave like Live presets (some read-only) and live in ~/Library/Audio/Presets/(Manufacturer)/(Plug-in).']
  ]);
  w('using-plug-ins','configure','plug-in-configure-mode',[
    ['Configure','Press Configure, then click (or change) parameters in the plug-in window to add them; some plug-ins don’t publish every parameter. Drag to reorder, Delete to remove (Live warns if automation or mappings exist).'],
    ['Saved with','Each instance, in the Set. Keep a setup by saving the plug-in inside a Rack, or as a default configuration.'],
    ['Without Configure','Touching a parameter makes a temporary entry in the automation, envelope and X-Y choosers; editing or selecting it makes it permanent. Recording or mapping mode also adds touched parameters.'],
    ['Then','Map, move, automate, envelope, route multiple outputs and add info text, as with Live devices.']
  ]);
  w('using-plug-ins','sidechain','sidechain-parameters',[
    ['Sidechain','For plug-ins that support it, on the device’s left: choose any internal routing point as the trigger. Gain and Mix set its level and blend; it is never heard.'],
    ['Mute','Listen to the plug-in output without the sidechain input.']
  ]);
  w('using-plug-ins','keep','vst-presets-and-banks',[
    ['Instance banks','Each VST instance owns a fixed-size bank; the chooser below the title bar picks a preset, and edits go into it. Unlike Live presets, these belong to that instance.'],
    ['Rename Plug-In Preset','Edit menu, with the title bar selected.'],
    ['Load / save','Buttons open file dialogs for VST Preset or VST Bank files (on Windows choose the file type).']
  ]);
  w('using-plug-ins','delay','device-delay-compensation',[
    ['Automatic','Live compensates processing delay of devices and plug-ins, including on returns. Toggle with Options → Delay Compensation (on by default).'],
    ['Reduced Latency When Monitoring','Options: monitored tracks get minimum latency but may drift from compensated tracks such as returns; off keeps everything in sync.'],
    ['Caveats','Tempo-synced devices after delaying devices can sound late. Very high latencies can feel sluggish; turning compensation off is rarely advisable, and Track Delay controls then disappear. Compensation can add CPU load.']
  ]);
  // Max for Live (chapter 31)
  const x=(action,anchor,terms)=>add('da-max',action,anchor,terms,'max-for-live');
  x('load','max-for-live',[
    ['What it is','Build or customize instruments, effects and MIDI Tools with Max (co-developed with Cycling ’74), and reach the Live Set or control surfaces through the Live API.']
  ]);
  x('load','setting-up-max-for-live',[
    ['Included','Bundled with Suite, and with Standard plus the Max for Live add-on; nothing separate to install.'],
    ['Your own Max','Set a different Max application in File & Folder Settings, then restart Live.']
  ]);
  x('load','using-max-for-live-devices',[
    ['Where they are','Core Library devices sit under Instruments, Audio Effects, MIDI Effects and Modulators (devices that control other parameters). The Max for Live label lists all of them, including Pack and your own devices and MIDI Tools.'],
    ['Presets','Many have their own, which work like Live device presets.']
  ]);
  x('edit','editing-max-for-live-devices',[
    ['Patches','Objects connected by virtual cables; the default Max Audio Effect passes audio from plugin~ to plugout~. Start from Max Instrument, Max MIDI Effect or Max Audio Effect in the Browser.'],
    ['Edit in Max','Context menu or Show Options opens the patcher. Before 12.2 there was an Edit button; -MaxForLiveDeveloperMode in Options.txt restores it.'],
    ['Save / Save As','Save updates every instance in the Set; Save As asks whether to apply to one or all.'],
    ['Where files go','Devices are separate .amxd files in the User Library folder for their type; keep that default, since moving or renaming breaks references (File Manager can relink).']
  ]);
  x('tools','building-max-for-live-midi-tools',[
    ['Starting points','The Max MIDI Transformation or Generator template in Clip View’s tools, or an existing tool; Edit opens the patcher.'],
    ['Saving','Defaults: User Library/MIDI Tools/Max Transformations and Max Generators, or any Places folder. Elsewhere, Live’s indexer won’t list them in Clip View.'],
    ['Guide','Max’s Help → Reference → Max for Live → Guides has a MIDI Tools walkthrough.']
  ]);
  x('edit','max-dependencies',[
    ['Freezing a device','Packs its samples, images and sub-patches into the device so it travels complete. Not the same as Live’s Freeze Track.']
  ]);
  x('edit','learning-max-programming',[
    ['Learning','Max’s built-in Reference (Help menu) with a Max for Live section, the Max for Live Production Guidelines on GitHub, the Building Max Devices Pack, and Cycling ’74’s Learn Max page.']
  ]);
})();
