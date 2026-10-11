// Intent → working context → a small set of gestures. Keys stay in manualData;
// this is an editorial map of that source, not a second shortcut database.
const shortcutExplorer=(()=>{
  const sections={views:'showing-and-hiding-views',focus:'keyboard-focus-and-navigation',files:'working-with-sets-and-the-program',devices:'working-with-devices-and-plug-ins',edit:'editing',values:'adjusting-values',envelopes:'commands-for-breakpoint-envelopes',loop:'loop-brace-and-startend-markers',zoom:'zooming-display-and-selections',tabs:'clip-view-editor-view-modes',audio:'clip-view-sample-editor',notes:'clip-view-midi-note-editor',grid:'grid-snapping-and-drawing',quant:'global-quantization',session:'session-view',arrange:'arrangement-view',comp:'comping',bounce:'bounce-to-audio',tracks:'commands-for-tracks',transport:'transport',engine:'audio-engine',browser:'browser',similar:'similar-sample-swapping',mapping:'keymidi-map-mode-and-the-computer-midi-keyboard'};
  const sourceGroups=new Map(Object.values(sections).map(section=>[section,manualData.shortcuts.filter(k=>k.section===section)]));
  const rows=(code,indices)=>indices.map(index=>{
    const row=sourceGroups.get(sections[code])[index];
    if(!row)throw Error(`Missing shortcut ${code}:${index}`);
    return {row,index:manualData.shortcuts.indexOf(row)};
  });
  const all=code=>rows(code,sourceGroups.get(sections[code]).map((_,i)=>i));
  const leaf=(id,label,keys,context,extra={})=>({id,label,keys,context,...extra});
  const branch=(id,label,children,hint='')=>({id,label,children,hint});
  const tree=[
    branch('move','Move around',[
      leaf('views','Switch views',rows('views',[2,3,4]),'Live window',{hint:'Tab · Shift Tab',note:'Tab and Shift Tab switch views when Use Tab to Move Focus is off.',image:'session',entry:'switch-views'}),
      leaf('space','Make room',rows('views',[9,14,15,11,12,13]),'Show / hide panels',{hint:'Browser · editors · mixer',entry:'hide-browser'}),
      leaf('windows','Open another view',rows('views',[0,1,8,10,16]),'Live window',{hint:'Full screen · second window · overview'}),
      branch('focus','Move focus',[
        leaf('focus-views','Jump to a view',rows('focus',[0,1,2,3,4,5,6,7,8]),'Keyboard focus',{note:'Focus chooses where the next key acts; it does not toggle the view.',image:'wsSelection'}),
        leaf('focus-controls','Move between controls',rows('focus',[9,10,11,12,13]),'Keyboard focus',{note:'The Tab gestures here require Use Tab to Move Focus to be on.',image:'wsKeyboard'})
      ],'Choose where the next key acts'),
      leaf('zoom','Zoom & scroll',rows('zoom',[0,1,2,3,4,5,6]),'Live window / time ruler',{hint:'Closer · farther · follow playback',entry:'ws-zoom'}),
      leaf('help','Get help & open Settings',rows('views',[7,17,18,19]),'Live window',{hint:'Info View · lessons · Settings',image:'wsInfo',entry:'settings'})
    ]),
    branch('find','Find & load',[
      leaf('search','Find a sound',rows('browser',[5,6,0,2,4,3]),'Browser',{hint:'Search → preview → load',image:'browser',entry:'browser'}),
      leaf('replace','Try another device',rows('devices',[6,7]).concat(rows('views',[5])),'Selected device / Browser',{hint:'Load · hot-swap',image:'chain',entry:'device-view'}),
      leaf('similar','Try similar samples',rows('browser',[9]).concat(all('similar')),'Browser / sample device',{hint:'Compare · keep a reference'}),
      leaf('tags','Filter & organize',rows('browser',[12,13,7,8]),'Browser selection',{hint:'Filters · tags · Collections',image:'wsFilters'}),
      leaf('browser-nav','Return to a result',rows('browser',[10,11,1]),'Browser',{hint:'Back · forward · show / hide',image:'wsHistory'})
    ]),
    branch('edit','Edit',[
      branch('selection','Select & change',[
        leaf('select','Select items',rows('edit',[8,9,10]).concat(rows('zoom',[7,8,9])),'The focused editor or selected objects',{image:'wsSelection',entry:'ws-select'}),
        leaf('copy','Copy, duplicate & remove',rows('edit',[0,1,2,3,4]),'Selected notes, clips, tracks or devices',{image:'wsDuplicate',entry:'duplicate'}),
        leaf('undo','Undo & rename',rows('edit',[5,6,7,11]),'The current edit / selected object',{image:'rename',entry:'undo'}),
        leaf('scope','Extend an edit',rows('edit',[12,13,14,15]),'Dragging / editing a selection',{note:'These are modifiers used with an edit or drag, not standalone commands.'})
      ],'Copy · duplicate · undo · rename'),
      branch('notes','Notes',[
        leaf('note-selection','Select & copy notes',rows('notes',[0,1,18,19,33]),'MIDI Note Editor',{entry:'edit-notes'}),
        leaf('note-time','Change timing',rows('notes',[2,5,6,7,10,11]),'Selected MIDI notes',{image:'quantize',entry:'quantize'}),
        leaf('note-chop','Chop in increments',rows('notes',[3,4]),'Selected MIDI notes'),
        leaf('note-expression','Change velocity & chance',rows('notes',[15,25,26,27,28]),'Selected MIDI notes',{entry:'edit-notes'}),
        leaf('note-tools','Use note tools',rows('notes',[30,31,32,34,36]),'MIDI Note Editor'),
        leaf('note-zoom','Fit & zoom the notes',rows('notes',[8,9,22,23,24,29]),'MIDI Note Editor',{image:'midiSample'}),
        leaf('note-navigation','Move through the clip',rows('notes',[12,13,14,16,17,20,21,35]),'MIDI Note Editor / Arrangement clip')
      ],'Timing · velocity · selection'),
      branch('audio','Audio',[
        leaf('warp','Edit Warp markers',rows('audio',[0,1,2,3,8,9]),'Sample Editor',{image:'warp',entry:'warp'}),
        leaf('transients','Edit transients',rows('audio',[10,11]),'Sample Editor'),
        leaf('audio-navigation','Move & zoom the waveform',rows('audio',[4,5,6,7,12,13]),'Sample Editor',{image:'audioClip',entry:'audio-source'})
      ],'Warp · transients · waveform'),
      leaf('grid','Draw & use the grid',all('grid'),'The focused clip or Arrangement editor',{hint:'Draw · snap · grid size',note:'Single-letter mode keys require the Computer MIDI Keyboard to be off; leave text fields first.'}),
      branch('loop','Loop & clip boundaries',[
        leaf('loop-markers','Set start & end points',rows('loop',[0,1,2,3,4,5]),'Clip markers / loop brace',{image:'clipLoop',entry:'loop'}),
        leaf('loop-size','Move & resize a loop',rows('loop',[6,7,8,9,10]),'Selected loop brace',{image:'clipLoop',entry:'loop'}),
        leaf('clip-tabs','Open notes, audio or envelopes',all('tabs'),'Clip View')
      ],'Start · end · loop length'),
      leaf('automation','Edit automation',all('envelopes'),'Envelope / Arrangement editor',{hint:'Breakpoints · curves · fades',image:'automation',entry:'automation',note:'Select the intended envelope. Single-letter mode keys require the Computer MIDI Keyboard to be off.'})
    ]),
    branch('play','Play & record',[
      leaf('playback','Start & stop',rows('transport',[0,1,2,3,4,8,10]),'Transport / selected Arrangement range',{hint:'Playback · return · metronome',image:'transport',entry:'transport'}),
      leaf('record','Record a performance',rows('tracks',[12]).concat(rows('transport',[5,6,7]),rows('session',[11])),'Selected track / recording destination',{hint:'Arm → record',image:'pilotArmOff',entry:'record-midi',note:'Arming a track and starting a recording are separate actions. For letter shortcuts, turn the Computer MIDI Keyboard off.'}),
      leaf('typing','Play with the computer keyboard',rows('mapping',[2,3,4]),'Computer MIDI Keyboard',{hint:'Enable · octave · velocity',image:'wsTypingKeys',note:'Leave text fields before playing. X/Z and C/V have these meanings while the Computer MIDI Keyboard is enabled.'}),
      branch('launch','Launch clips & scenes',[
        leaf('clip-launch','Launch & stop clips',rows('session',[0,4,5,12,13,17]),'Session clip or slot selection',{image:'launch',entry:'launch'}),
        leaf('launch-timing','Set launch timing',all('quant'),'Global launch quantization',{image:'timing',entry:'launch'}),
        leaf('scene-create','Create clips & scenes',rows('session',[3,6,7,8,16]),'Session View',{image:'scenes',entry:'scenes'}),
        leaf('scene-select','Move between slots & scenes',rows('session',[1,2,9,10,18,19,20,21]),'Session View'),
        leaf('scene-move','Move tracks & scenes',rows('session',[14,15]),'Session selection')
      ],'Clip grid · launch timing'),
      leaf('takes','Choose takes',all('comp'),'Arrangement track / take lanes',{hint:'Audition · choose · replace'})
    ]),
    branch('shape','Shape & mix',[
      leaf('devices','Organize devices',rows('devices',[0,1,2,3,4]).concat(rows('views',[6])),'Device View / selected devices',{hint:'Select · group · enable',image:'chain',entry:'chain'}),
      leaf('values','Adjust a control',all('values').concat(rows('devices',[5])),'Selected parameter or numeric field',{hint:'Type · fine-tune · reset',image:'utility',entry:'ws-adjust'}),
      leaf('plugins','Compare & open plug-ins',rows('devices',[8,9,10]),'Selected device / plug-in window',{hint:'Windows · A/B state'}),
      leaf('mix','Solo & activate',rows('tracks',[13,15]).concat(rows('transport',[9]),rows('session',[22])),'Selected tracks / Session chain',{hint:'Solo · mute · enable',image:'mixer',entry:'track-mixer',note:'Letter shortcuts depend on focus and the Computer MIDI Keyboard state.'}),
      leaf('mapping','Map a control',rows('mapping',[0,1]),'MIDI Map / Key Map Mode',{hint:'MIDI controller · custom key',image:'mapping',entry:'mapping'}),
      leaf('engine','Turn the audio engine on or off',all('engine'),'Audio engine',{hint:'Audio processing',note:'Turning the engine off interrupts Live’s audio output.'})
    ]),
    branch('set','Manage a Set',[
      leaf('save','Open & save',rows('files',[0,1,2,3,4,5]),'Live Set / application',{hint:'New · open · save a version',entry:'save-set'}),
      leaf('export','Export & bounce',rows('files',[6,7]).concat(all('bounce'),rows('tracks',[16])),'Selected material / export range',{hint:'Audio · MIDI · freeze',entry:'export'}),
      branch('tracks','Organize tracks',[
        leaf('new-tracks','Add & name tracks',rows('tracks',[0,1,2,3,4,14,17]),'Track title bar / Browser',{image:'wsSelection',entry:'tracks'}),
        leaf('group-tracks','Group & move tracks',rows('tracks',[5,6,7,8,9,10,11]),'Selected track titles',{entry:'tracks'})
      ],'Add · name · group'),
      branch('arrange','Work on the timeline',[
        leaf('arrange-clips','Cut & shape clips',rows('arrange',[0,1,2,3,4,5,6,26,28]),'Arrangement clip / time selection',{image:'split',entry:'split'}),
        leaf('fades','Edit fades',rows('arrange',[7,8,9]),'Arrangement audio clip edges'),
        leaf('arrange-loop','Loop a passage',rows('arrange',[10,11,12]),'Arrangement loop brace',{image:'arrangementLoop',entry:'arrangement-loop'}),
        leaf('song-time','Insert & rearrange time',rows('arrange',[13,14,15,16,17,18]),'Arrangement time selection',{note:'Time commands affect the selected time range across tracks, not just one clip.'}),
        leaf('arrange-fit','Fit tracks & the timeline',rows('arrange',[19,20,21,24,25,29,30]),'Arrangement View'),
        leaf('arrange-move','Move through the Arrangement',rows('arrange',[22,23,27,31,32,33,34]),'Arrangement View / selected range')
      ],'Clips · passages · whole song')
    ])
  ];
  const locations=new Map(),rowHomes=new Map(),aliases=new Map();
  let ctx,host,model,current,activeId;
  function visit(node,parents=[]){
    node.route='keys-'+node.id;node.parents=parents;
    locations.set(node.route,node);
    for(const key of node.keys||[]){if(rowHomes.has(key.index))throw Error('Shortcut has two homes: '+key.index);rowHomes.set(key.index,node);}
    node.children?.forEach(child=>visit(child,[...parents,node]));
  }
  tree.forEach(node=>visit(node));
  if(rowHomes.size!==manualData.shortcuts.length)throw Error('Unmapped shortcuts: '+manualData.shortcuts.map((_,i)=>i).filter(i=>!rowHomes.has(i)).join(','));
  function install(m){
    model=m;
    for(const node of locations.values())m.entries.set(node.route,{id:node.route,view:'workspace',title:node.label,body:node.context||node.hint||'',group:'Shortcuts',atlasContext:['Shortcuts',...node.parents.map(p=>p.label)].join(' › ')});
    m.entries.get('shortcuts').title='Shortcuts';
    for(const n of m.manual.nodes.values())if(n.chapterNumber===41){
      const index=manualData.shortcuts.findIndex(k=>k.section===n.anchor);
      if(index>=0)aliases.set(n.id,rowHomes.get(index));
    }
  }
  const owned=id=>id==='shortcuts'||locations.has(id)||aliases.has(id);
  const rowHome=row=>rowHomes.get(typeof row==='number'?row:manualData.shortcuts.indexOf(row))?.route;
  const e=s=>ctx.esc(s);
  function keyText(value){
    value=value.replace(/(?:up and down|down and up) arrow keys/g,'↑ / ↓')
      .replace(/(?:right and left|left and right) arrow keys/g,'← / →')
      .replace(/up arrow(?: key)?/g,'↑').replace(/down arrow(?: key)?/g,'↓')
      .replace(/left arrow(?: key)?/g,'←').replace(/right arrow(?: key)?/g,'→')
      .replace(/\bFunction\b/g,'Fn');
    return ctx.platform()==='mac'?value.replace(/\bCmd\b/g,'⌘').replace(/\bOption\b/g,'⌥').replace(/\bShift\b/g,'⇧').replace(/\bCtrl\b/g,'⌃'):value;
  }
  const actionLabels={
    'Toggle Session/Arrangement View':'Session ↔ Arrangement',
    'Toggle Between Device/Clip View':'Clip ↔ Device',
    'Toggle Device and Clip View':'Show both editors',
    'Hot-Swap Selected Device':'Hot-swap the selected device',
    'Toggle Hot-Swap Mode':'Hot-swap the selected device',
    'Search in Browser':'Search for a sound or device',
    'Jump to Search Results':'Move to the results',
    'Load Selected Item from Browser':'Load the selected result',
    'Preview Selected File':'Listen to the selected file',
    'Scroll Down/Up':'Move through results',
    'Close/Open Folders':'Open / close a folder',
    'Chop Selected Notes on Grid or Split Notes at Time Selection Start/End':'Chop / split selected notes',
    'Split Notes at Exact Location':'Split a note where you click',
    'Fit Notes to Time Range':'Fit notes into the selected time'
  };
  const actionLabel=row=>actionLabels[row.action]||row.action;
  const sameGesture=(a,b)=>actionLabel(a)===actionLabel(b)&&a.mac===b.mac&&a.win===b.win;
  const visibleKeys=node=>node.keys.filter((key,i,keys)=>keys.findIndex(other=>sameGesture(key.row,other.row))===i);
  function content(node){
    const path=[...node.parents,node];
    return `${node.parents.length?`<nav class="workspace-crumb" aria-label="Shortcut path">${path.slice(0,-1).map(p=>`<button data-entry="${p.route}">${e(p.label)}</button><span aria-hidden="true">/</span>`).join('')}<span aria-current="page">${e(node.label)}</span></nav>`:''}
      <h4 class="workspace-action-title" tabindex="-1">${e(node.label)}</h4>
      ${node.children?`<nav class="shortcut-branches" aria-label="${e(node.label)} actions">${node.children.map(child=>`<button data-entry="${child.route}"><span>${e(child.label)} <i aria-hidden="true">↗</i></span>${child.hint?`<small>${e(child.hint)}</small>`:''}</button>`).join('')}</nav>`:`
      <p class="shortcut-context">${e(node.context)}</p>
      ${node.note?`<p class="shortcut-condition">${e(node.note)}</p>`:''}
      <dl class="shortcut-gestures">${visibleKeys(node).map(({row,index})=>`<div id="shortcut-gesture-${index}" tabindex="-1"><dt>${e(actionLabel(row))}</dt><dd>${row[ctx.platform()]?`<kbd>${e(keyText(row[ctx.platform()]))}</kbd>`:'<span class="context-note">Not listed for Windows</span>'}</dd></div>`).join('')}</dl>
      ${node.image?`<section class="reference-section shortcut-in-live"><h4>In Live</h4>${ctx.captureFigure(node.image)}</section>`:''}
      ${node.entry?`<div class="detail-links"><button data-entry="${node.entry}">${e(model.entries.get(node.entry).title)} ↗</button></div>`:''}
      <div class="shortcut-neighbors" aria-label="Nearby actions">${node.parents.at(-1)?.children.filter(n=>n!==node).map(n=>`<button data-entry="${n.route}">${e(n.label)} ↗</button>`).join('')||''}</div>`}
      <div class="workspace-source">${node.keys?[...new Set(node.keys.map(k=>k.row.section))].map((section,i)=>`<a href="${e(model.manual.nodes.get('live-keyboard-shortcuts#'+section).url)}" target="_blank" rel="noreferrer">${i?'Related manual section':'Ableton manual'} ↗</a>`).join(''):''}${ctx.flagHTML(activeId)}</div>`;
  }
  function mount(target,entry,context){
    host=target;ctx=context;activeId=entry.id;current=locations.get(entry.id)||aliases.get(entry.id)||tree[0];
    const goal=current.parents[0]||current;
    host.innerHTML=`<div class="workspace-shell shortcut-shell"><header class="workspace-local-nav"><h3 class="insp-title">Shortcuts</h3><nav class="workspace-actions shortcut-intents" aria-label="Shortcut intentions">${tree.map(node=>`<button data-entry="${node.route}" ${node===goal?'aria-current="page"':''}>${e(node.label)}</button>`).join('')}</nav></header><div class="workspace-reading" tabindex="0" role="region" aria-label="${e(current.label)} shortcuts">${content(current)}</div></div>`;
    host.scrollTop=0;
  }
  function setPlatform(){
    if(!host||!current)return;
    const reader=host.querySelector('.workspace-reading'),scroll=reader.scrollTop,open=reader.querySelector('.shortcut-in-live')?.open;
    reader.innerHTML=content(current);if(open)reader.querySelector('.shortcut-in-live').open=true;reader.scrollTop=scroll;
  }
  function focusRow(index){
    const match=current?.keys?.find(k=>k.index===index);
    const shown=match&&visibleKeys(current).find(k=>sameGesture(k.row,match.row));
    const row=shown&&host?.querySelector('#shortcut-gesture-'+shown.index);if(!row)return;
    row.classList.add('shortcut-target');row.focus({preventScroll:true});row.scrollIntoView({block:'nearest'});
  }
  return {tree,locations,rowHomes,owned,rowHome,install,mount,setPlatform,focusRow};
})();
