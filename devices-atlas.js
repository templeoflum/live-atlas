// Samplers and Distortion pilot: neighborhood card → device → existing actions.
// Other neighborhoods retain the bounded list for comparison during the pilot.
const devicesAtlas=(()=>{
  const areas=deviceActions.catalog,locations=new Map(),sourceHomes=new Map();
  const neighborhoods=[],neighborhoodByDevice=new Map(),listScroll=new Map();
  const landings={
    samplers:{id:'neighborhood-samplers',body:'Play recorded sound from notes.',hints:{simpler:'Play, loop or slice one sample.',sampler:'Map samples across keys and velocities.'}},
    distortion:{id:'neighborhood-distortion',body:'Change the waveform: drive it, clip it, break it up.',hints:{saturator:'Shape the waveform with a drive curve.',roar:'Route distortion through bands and feedback.',overdrive:'Drive a filtered band.',pedal:'Overdrive, distortion and fuzz.',amp:'Amplifier models.',cabinet:'Speaker and microphone models.', 'dynamic-tube':'Tube saturation.', 'drum-buss':'Drive, compress and shape drum transients.',redux:'Reduce bit depth and sample rate.',erosion:'Modulate a short delay with noise or a sine wave.', 'vinyl-distortion':'Add record-like distortion and crackle.'}}
  };
  const landingOf=id=>Object.entries(landings).find(([,p])=>p.id===id)?.[0];
  let model,ctx,host,current,indexEsc,selectedNeighborhood='basics';
  function install(m){
    model=m;
    for(const area of areas){
      const root=m.manual.nodes.get(area.chapter+'#'+area.anchor);
      if(!root)throw Error('Unknown device: '+area.anchor);
      area.home=area.id||root.id;
      area.label=area.label||m.entries.get(area.home)?.title||root.title;
      area.body=m.entries.get(area.home)?.body||'';
      area.items.forEach((item,i)=>{
        item.id=i?(area.home.startsWith('da-')?'':'da-')+area.home.replace(/^ref-/,'')+'--'+item.slug:area.home;
        item.sources=item.anchors.map(anchor=>{
          const node=m.manual.nodes.get(area.chapter+'#'+anchor);
          if(!node)throw Error('Unknown device source: '+area.chapter+'#'+anchor);
          return node;
        });
        item.url=item.sources[0].url;
        item.images=i?[]:(m.entryCaptures[area.home]||[]);
        const loc={area,item};
        if(locations.has(item.id))throw Error('Duplicate device action: '+item.id);
        locations.set(item.id,loc);
        const old=m.entries.get(item.id);
        if(old){if(old.view!=='devices')throw Error('Device would move another territory: '+item.id);}
        else m.entries.set(item.id,{id:item.id,view:'devices',title:item.label,body:item.body,group:area.label,source:'manual'});
        for(const node of item.sources)if(!sourceHomes.has(node.key))sourceHomes.set(node.key,loc);
      });
    }
    for(const area of areas)for(const id of area.aliases||[]){
      if(!m.entries.has(id))throw Error('Unknown legacy device route: '+id);
      locations.set(id,locations.get(area.home));
    }
    // Chapter/category landing pages belong at the start of the corresponding
    // catalog, not in a parallel tree of manual headings.
    const chapterHomes={
      'live-instrument-reference#live-instrument-reference':'simpler',
      'live-audio-effect-reference#live-audio-effect-reference':'utility',
      'live-midi-effect-reference#live-midi-effect-reference':'arpeggiator',
      'max-for-live-devices#max-for-live-devices':'da-max',
      'max-for-live-devices#max-for-live-instruments':'ref-max-for-live-devices--ds-clang',
      'max-for-live-devices#max-for-live-audio-effects':'ref-max-for-live-devices--align-delay',
      'max-for-live-devices#max-for-live-midi-effects':'ref-max-for-live-devices--envelope-midi'
    };
    for(const [key,id] of Object.entries(chapterHomes))sourceHomes.set(key,locations.get(id));
    for(const [key,loc] of sourceHomes){
      if(!loc)throw Error('Missing device action home: '+key);
      const node=m.manual.nodes.get(key);
      if(node.view==='devices'&&!locations.has(node.id))locations.set(node.id,loc);
    }
    for(const [id,loc] of locations)m.entries.get(id).atlasContext=loc.area.label+' › '+loc.item.label;
    // Short names here resolve to the catalog's permanent IDs. No duplicate
    // homes, and no separate Max bucket: implementation isn't a sonic purpose.
    const byAnchor=new Map(areas.map(area=>[area.anchor,area.home]));
    const group=(id,name,names)=>({id,name,ids:names.split(' ').map(name=>locations.has(name)?name:byAnchor.get(name))});
    neighborhoods.push(
      group('basics','Device basics','chain da-presets da-plugins da-max'),
      group('samplers','Samplers','simpler sampler'),
      group('synths','Synths','drift analog operator wavetable meld electric collision tension'),
      group('drums','Drums','drum-sampler impulse ds-kick ds-snare ds-hh ds-clap ds-tom ds-cymbal ds-clang ds-fm'),
      group('filters','EQ & filters','eq-eight channel-eq eq-three auto-filter'),
      group('dynamics','Dynamics','compressor glue-compressor gate limiter multiband-dynamics'),
      group('distortion','Distortion','saturator roar overdrive pedal amp cabinet dynamic-tube drum-buss redux erosion vinyl-distortion'),
      group('delays','Delays & loops','delay echo filter-delay grain-delay beat-repeat looper spectral-time'),
      group('reverbs','Reverbs','reverb hybrid-reverb'),
      group('pitch','Pitch & tone','auto-shift shifter vocoder corpus resonators spectral-resonator'),
      group('motion','Modulation','chorus auto-pan-tremolo phaser-flanger lfo envelope-follower shaper envelope-midi expression-control shaper-midi'),
      group('midi','MIDI notes','arpeggiator chord pitch scale velocity note-length random note-echo mpe-control cc-control midi-monitor'),
      group('racks','Racks','instrument-rack drum-rack audio-rack midi-rack'),
      group('utilities','Utilities','utility spectrum tuner align-delay external-instrument external-audio-effect')
    );
    for(const group of neighborhoods)for(const id of group.ids){
      if(!locations.has(id))throw Error('Missing device neighborhood member: '+group.name+' / '+id);
      if(neighborhoodByDevice.has(id))throw Error('Two device neighborhoods: '+id);
      neighborhoodByDevice.set(id,group);
    }
    for(const area of areas)if(!neighborhoodByDevice.has(area.home))throw Error('Device without neighborhood: '+area.home);
    m.topicGroups.devices=neighborhoods;
    for(const [groupId,p] of Object.entries(landings)){
      const group=neighborhoods.find(g=>g.id===groupId);group.home=p.id;
      m.entries.set(p.id,{id:p.id,view:'devices',title:group.name,body:p.body,group:'Neighborhoods',source:groupId==='samplers'?'instruments':'audiofx'});
    }
  }
  const owned=id=>locations.has(id)||Boolean(landingOf(id)),mainId=id=>locations.get(id)?.area.home||id;
  const label=id=>locations.get(id)?.area.label||model.entries.get(id)?.title;
  const e=s=>ctx.esc(s);
  const text=s=>String(s||'').split(/(\{[A-Za-z]+\})/g).map(p=>{
    const key=atlasReference.keys[p.slice(1,-1)];return /^\{[A-Za-z]+\}$/.test(p)&&key?`<kbd>${e(key[ctx.platform()==='mac'?0:1])}</kbd>`:e(p);
  }).join('');
  const neighborhoodOf=id=>neighborhoodByDevice.get(mainId(id))||neighborhoods.find(g=>g.id===landingOf(id));
  const activeNeighborhood=()=>neighborhoods.find(g=>g.id===selectedNeighborhood);
  function listHTML(esc){
    if(landings[selectedNeighborhood])return '';
    const selected=current?.loc?.area.home;
    return activeNeighborhood().ids.map(id=>`<button class="topic-item device-place${id===selected?' selected':''}" data-entry="${id}" aria-pressed="${id===selected}" aria-controls="insp-devices"><span>${esc(label(id))}</span></button>`).join('');
  }
  function index(esc){
    indexEsc=esc;
    const pilot=Boolean(landings[selectedNeighborhood]);
    return `<div class="device-neighborhoods"><h3>Neighborhoods</h3><nav class="device-neighborhood-grid" aria-label="Device neighborhoods">${neighborhoods.map(g=>`<button data-device-neighborhood="${g.id}" aria-pressed="${g.id===selectedNeighborhood}" aria-controls="${landings[g.id]?'insp-devices':'deviceNeighborhoodList'}">${esc(g.name)}</button>`).join('')}</nav></div><h3 class="device-list-heading" id="deviceNeighborhoodHeading" ${pilot?'hidden':''}>${esc(activeNeighborhood().name)}</h3><nav id="deviceNeighborhoodList" class="workspace-places device-neighborhood-list" aria-labelledby="deviceNeighborhoodHeading" tabindex="0" ${pilot?'hidden':''}>${listHTML(esc)}</nav>`;
  }
  function deviceOptions(esc){
    const selected=current?.loc?.area.home,group=activeNeighborhood();
    return `<option value="" disabled ${group.ids.includes(selected)?'':'selected'}>Choose a device</option>`+group.ids.map(id=>`<option value="${id}" ${id===selected?'selected':''}>${esc(label(id))}</option>`).join('');
  }
  function picker(esc){return `<div class="topic-picker device-pickers"><label>Neighborhood<select data-device-neighborhood-select aria-label="Device neighborhood">${neighborhoods.map(g=>`<option value="${g.id}" ${g.id===selectedNeighborhood?'selected':''}>${esc(g.name)}</option>`).join('')}</select></label><label data-device-picker-label ${landings[selectedNeighborhood]?'hidden':''}>Device<select data-topic-picker="devices" aria-label="Devices topic">${deviceOptions(esc)}</select></label></div>`;}
  function selectNeighborhood(id){
    if(!neighborhoods.some(g=>g.id===id)||selectedNeighborhood===id)return;
    const list=document.querySelector('#deviceNeighborhoodList');
    if(list)listScroll.set(selectedNeighborhood,list.scrollTop);
    selectedNeighborhood=id;
    const root=document.querySelector('#deviceGroups');
    root?.querySelectorAll('[data-device-neighborhood]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.deviceNeighborhood===id));
    const heading=document.querySelector('#deviceNeighborhoodHeading');
    if(heading){heading.textContent=activeNeighborhood().name;heading.hidden=Boolean(landings[id]);}
    if(list){list.hidden=Boolean(landings[id]);list.innerHTML=listHTML(indexEsc);list.scrollTop=listScroll.get(id)||0;}
    const familyPicker=document.querySelector('[data-device-neighborhood-select]');
    if(familyPicker)familyPicker.value=id;
    const devicePicker=document.querySelector('[data-topic-picker="devices"]');
    if(devicePicker)devicePicker.innerHTML=deviceOptions(indexEsc);
    const pickerLabel=document.querySelector('[data-device-picker-label]');if(pickerLabel)pickerLabel.hidden=Boolean(landings[id]);
  }
  function chooseNeighborhood(id){
    if(landings[id])ctx.selectEntry(landings[id].id);
    else selectNeighborhood(id);
  }
  function revealSelection(id){
    const group=neighborhoodOf(id);if(!group)return;
    selectNeighborhood(group.id);
    const list=document.querySelector('#deviceNeighborhoodList');
    const button=list?.querySelector(`[data-entry="${mainId(id)}"]`);
    if(button){
      // Scroll only the lower list when a deep link lands outside its viewport.
      // The family controls, sidebar and page never scroll to chase an action.
      const item=button.getBoundingClientRect(),bounds=list.getBoundingClientRect();
      if(item.top<bounds.top)list.scrollTop+=item.top-bounds.top;
      else if(item.bottom>bounds.bottom)list.scrollTop+=item.bottom-bounds.bottom;
    }
  }
  function click(ev){
    const button=ev.target.closest('[data-device-neighborhood]');
    if(!button)return false;
    chooseNeighborhood(button.dataset.deviceNeighborhood);return true;
  }
  function content(loc,flagId){
    const {item}=loc,source=model.entries.get(flagId).manualNode;
    const requestedSource=source&&model.manual.nodes.get(source);
    return `<h4 class="workspace-action-title" tabindex="-1">${e(item.label)}</h4>
      <p class="workspace-description">${text(item.body)}</p>
      ${item.images.map(ctx.captureFigure).join('')}
      ${item.leadImage?ctx.captureFigure(item.leadImage):''}
      <ol class="reference-steps workspace-steps">${item.steps.map(s=>`<li>${text(s)}</li>`).join('')}</ol>
      ${item.terms.length?`<dl class="reference-terms">${item.terms.map(([label,value])=>`<div><dt>${e(label)}</dt><dd>${text(value)}</dd></div>`).join('')}</dl>`:''}
      ${item.note?`<p class="clip-note">${text(item.note)}</p>`:''}
      ${(item.manualSections||[]).filter(p=>p.images.some(id=>id!==item.leadImage)||p.controls?.length||p.note).map(p=>`<section class="workspace-inline manual-illustrated-section" data-device-source="${e(p.key)}"><h5>${e(p.label)}</h5>${p.images.filter(id=>id!==item.leadImage).map(ctx.captureFigure).join('')}${p.controls?.length?`<dl class="reference-terms">${p.controls.map(([k,v])=>`<div><dt>${e(k)}</dt><dd>${text(v)}</dd></div>`).join('')}</dl>`:''}${p.note?`<p class="clip-note">${text(p.note)}</p>`:''}</section>`).join('')}
      ${(item.contexts||[]).map(p=>`<section class="workspace-inline" data-device-source="${e(p.key)}"><h5>${e(p.guide.label)}</h5><p>${text(p.guide.body)}</p>${p.guide.terms.length?`<dl class="reference-terms">${p.guide.terms.map(([k,v])=>`<div><dt>${e(k)}</dt><dd>${text(v)}</dd></div>`).join('')}</dl>`:''}<a class="clip-source" href="${e(p.url)}" target="_blank" rel="noreferrer">Manual ↗</a></section>`).join('')}
      <div class="workspace-source"><a href="${e(requestedSource?.url||item.url)}" target="_blank" rel="noreferrer">Ableton manual ↗</a>${ctx.flagHTML(flagId)}</div>`;
  }
  function mount(target,entry,context){
    ctx=context;host=target;current={loc:locations.get(entry.id),flagId:entry.id};
    const groupId=landingOf(entry.id);
    if(groupId){
      const group=neighborhoodOf(entry.id),p=landings[groupId];
      host.innerHTML=`<div class="workspace-shell"><header class="workspace-local-nav"><h3 class="insp-title neighborhood-title" tabindex="-1">${e(group.name)}</h3><p class="neighborhood-description">${e(p.body)}</p></header><div class="workspace-reading" role="region" aria-label="${e(group.name)} devices" tabindex="0"><nav class="shortcut-branches neighborhood-choices" aria-label="${e(group.name)} devices">${group.ids.map(id=>`<button data-entry="${id}"><span>${e(label(id))} <i aria-hidden="true">↗</i></span><small>${e(p.hints[areas.find(a=>a.home===id)?.anchor]||p.hints[id]||'')}</small></button>`).join('')}</nav></div></div>`;
      host.scrollTop=0;return;
    }
    const {area,item}=current.loc;
    const group=neighborhoodOf(entry.id),parent=landings[group.id];
    host.innerHTML=`<div class="workspace-shell"><header class="workspace-local-nav">${parent?`<div class="workspace-crumb"><button data-entry="${parent.id}">← ${e(group.name)}</button></div>`:''}<h3 class="insp-title">${e(area.label)}</h3><nav class="workspace-actions" aria-label="${e(area.label)} actions">${area.items.map(a=>`<button data-entry="${a.id}" ${a===item?'aria-current="page"':''}>${e(a.label)}</button>`).join('')}</nav></header><div class="workspace-reading" tabindex="0" role="region" aria-label="${e(area.label+' · '+item.label)} explanation">${content(current.loc,entry.id)}</div></div>`;
    host.scrollTop=0;
  }
  function setPlatform(){
    if(!host||!current?.loc)return;const panel=host.querySelector('.workspace-reading'),scroll=panel.scrollTop;
    panel.innerHTML=content(current.loc,current.flagId);panel.scrollTop=scroll;
  }
  return {areas,locations,sourceHomes,neighborhoods,landings,landingOf,neighborhoodOf,activeNeighborhood,selectNeighborhood,chooseNeighborhood,revealSelection,click,picker,install,owned,mainId,label,index,mount,setPlatform};
})();
