// Shared navigation: fixed neighborhoods → choice card → existing working card.
// Content stays in its original modules; this layer only maps their destinations.
const neighborhoodCards=(()=>{
  const groups={workspace:[],clips:[],devices:[],history:[]},homes=new Map(),members=new Map();
  const selected={};let model,ctx;
  const descriptions={
    workspace:{navigation:'Move between views, focus controls and edit.',browser:'Find, preview and load sounds and devices.',session:'Launch clips and scenes in the grid.',arrangement:'Place clips and automation along a timeline.',mixer:'Add tracks, balance levels and combine signals.',routing:'Connect inputs, outputs, tracks and clocks.',files:'Save, collect, reuse and export.',settings:'Connect hardware and adjust Live’s setup.'},
    devices:{basics:'Load, connect and control devices.',samplers:'Play recorded sound from notes.',synths:'Generate and shape sound from notes.',drums:'Play and shape individual drum sounds.',filters:'Cut, boost and filter frequencies.',dynamics:'Control level changes.',distortion:'Change the waveform: drive it, clip it, break it up.',delays:'Repeat, delay and loop sound.',reverbs:'Place sound in a space.',pitch:'Shift pitch and shape pitched resonances.',motion:'Move sound and parameters over time.',midi:'Change notes before they reach an instrument.',racks:'Combine devices, split chains and map controls.',utilities:'Measure, tune, route and adjust signals.'},
    clips:{clips:'Open, name and navigate clips.','record-midi':'Record audio and MIDI into clips.','edit-notes':'Draw, move and reshape MIDI notes.',loop:'Place loop edges and move events in time.','audio-source':'Work with recorded sound.',warp:'Align a recording with Live’s beat grid.','ca-tools':'Transform notes or generate new patterns.','ca-envelope':'Shape changes within a clip or a single note.','ca-launch':'Start, stop and switch between clips.','ca-takes':'Record passes and choose parts from each take.'}
  };
  const heading=view=>view==='history'?'Periods & people':'Neighborhoods';
  const areaHint=a=>a?.items.slice(0,3).map(i=>i.label).join(' · ')||'';
  function add(view,id,name,body,choices,home='neighborhood-'+view+'-'+id){
    const group={view,id,name,body,choices,home};groups[view].push(group);homes.set(home,group);
    for(const choice of choices)members.set(view+'/'+choice.id,group);
    model.entries.set(home,{id:home,view,title:name,body,group:'Neighborhoods',source:'manual'});
    return group;
  }
  function install(m){
    model=m;
    for(const g of m.workspace.neighborhoods)add('workspace',g.id,g.name,descriptions.workspace[g.id],g.ids.map(id=>({id,label:m.workspace.label(id),hint:id==='shortcuts'?'Move · Find · Edit':areaHint(m.workspace.areas.find(a=>a.home===id))})));
    for(const a of m.clips.areas)add('clips',a.home,a.label,descriptions.clips[a.home],a.items.map(i=>({id:i.id,label:i.label,hint:''})));
    for(const g of m.devices.neighborhoods){
      const pilot=m.devices.landings[g.id];
      add('devices',g.id,g.name,descriptions.devices[g.id],g.ids.map(id=>{
        const a=m.devices.areas.find(a=>a.home===id);
        return {id,label:m.devices.label(id),hint:pilot?.hints[a?.anchor]||pilot?.hints[id]||areaHint(a)};
      }),pilot?.id);
    }
    for(const p of m.history.periods)add('history',p.id,p.label,p.title,p.ids.map(id=>({id,label:m.entries.get(id).title,hint:m.history.cards.get(id).when})));
    const references=m.topicGroups.history.flatMap(g=>g.ids).filter(id=>!m.history.owned(id));
    if(references.length)add('history','references','Credits & reference','Credits and introductory material from the manual.',references.map(id=>({id,label:m.entries.get(id).title,hint:''})));
    for(const view of Object.keys(groups))selected[view]=groups[view][0].id;
    // Each destination shows its card's first full manual figure; none means no picture.
    if(typeof manualImages!=='undefined'&&typeof manualImagesData!=='undefined'){
      const files=new Map(manualImagesData.figures.map(f=>[f.id,f.file]));
      for(const p of manualImages.placements){
        if(p.inline||!p.available||p.view==='history')continue;
        const choice=adjacent(p.view,p.card)?.current;
        if(choice&&!choice.image&&files.get(p.id))choice.image='assets/'+files.get(p.id);
      }
    }
  }
  const owned=id=>homes.has(id);
  function choiceId(view,id){
    if(view==='workspace')id=model.shortcuts.owned(id)?'shortcuts':model.workspace.mainId(id);
    if(view==='devices')id=model.devices.mainId(id);
    if(view==='clips')id=model.clips.locations.get(id)?.item.id||id;
    if(view==='history'&&model.entries.get(id)?.manualNode){
      let node=model.manual.nodes.get(model.entries.get(id).manualNode);
      while(node&&!members.has(view+'/'+node.id))node=node.parent;
      id=node?.id||id;
    }
    return id;
  }
  function groupOf(view,id){
    return homes.get(id)||members.get(view+'/'+choiceId(view,id));
  }
  function adjacent(view,id){
    if(owned(id))return null;
    const group=groupOf(view,id);if(!group)return null;
    // Neighborhoods are places to jump into the sequence, not stopping points.
    const sequence=groups[view].flatMap(g=>g.choices);
    const position=sequence.findIndex(c=>c.id===choiceId(view,id));
    if(position<0)return null;
    return {group,current:sequence[position],previous:sequence[position-1]||null,next:sequence[position+1]||null};
  }
  function breadcrumb(entry,esc){
    const route=adjacent(entry.view,entry.id);if(!route)return '';
    const {group,previous,next}=route;
    const section=entry.view==='history'?'History':entry.view[0].toUpperCase()+entry.view.slice(1);
    const step=(choice,direction)=>{
      const label=direction==='previous'?'Previous':'Next';
      const title=choice?`${label} card: ${choice.label}`:`${direction==='previous'?'First':'Last'} card in ${section}`;
      return `<button ${choice?`data-entry="${esc(choice.id)}"`:'disabled'} aria-label="${esc(choice?title:label+' card')}" title="${esc(title)}">${direction==='previous'?'<span aria-hidden="true">‹</span> Prev':'Next <span aria-hidden="true">›</span>'}</button>`;
    };
    return `<div class="workspace-crumb neighborhood-return"><button data-entry="${esc(group.home)}">← ${esc(group.name)}</button><nav class="card-steps" aria-label="Cards in ${esc(section)}">${step(previous,'previous')}${step(next,'next')}</nav></div>`;
  }
  function index(view,esc){return `<div class="device-neighborhoods"><h3>${heading(view)}</h3><nav class="device-neighborhood-grid" aria-label="${view==='history'?'History periods and people':view[0].toUpperCase()+view.slice(1)+' neighborhoods'}">${groups[view].map(g=>`<button data-neighborhood="${g.home}" aria-pressed="${selected[view]===g.id}" aria-controls="insp-${view}">${esc(g.name)}</button>`).join('')}</nav></div>`;}
  function picker(view,esc){return `<div class="topic-picker device-pickers"><label>${view==='history'?'Period / people':'Neighborhood'}<select data-neighborhood-select="${view}" aria-label="${view[0].toUpperCase()+view.slice(1)} neighborhood">${groups[view].map(g=>`<option value="${g.home}" ${selected[view]===g.id?'selected':''}>${esc(g.name)}</option>`).join('')}</select></label></div>`;}
  function reveal(view,id){
    const g=groupOf(view,id);if(!g)return;selected[view]=g.id;
    document.querySelectorAll(`[data-neighborhood][aria-controls="insp-${view}"]`).forEach(b=>b.setAttribute('aria-pressed',b.dataset.neighborhood===g.home));
    const picker=document.querySelector(`[data-neighborhood-select="${view}"]`);if(picker)picker.value=g.home;
  }
  function render(id,context){
    const g=homes.get(id),esc=context.esc;
    return `<div class="workspace-shell"><header class="workspace-local-nav"><h3 class="insp-title neighborhood-title" tabindex="-1">${esc(g.name)}</h3><p class="neighborhood-description">${esc(g.body)}</p></header><div class="workspace-reading" role="region" aria-label="${esc(g.name)} destinations" tabindex="0">${g.view==='history'?historyImages.forPeriod(g.id,context):''}<nav class="shortcut-branches neighborhood-choices" aria-label="${esc(g.name)} destinations">${g.choices.map(c=>`<button data-entry="${c.id}">${c.image?`<span class="choice-thumb"><img src="${esc(c.image)}" alt="" loading="lazy" decoding="async"></span>`:''}<span>${esc(c.label)} <i aria-hidden="true">↗</i></span>${c.hint?`<small>${esc(c.hint)}</small>`:''}</button>`).join('')}</nav></div></div>`;
  }
  function mount(host,entry,context){host.innerHTML=render(entry.id,context);host.scrollTop=0;}
  function decorate(host,entry,esc){
    const html=breadcrumb(entry,esc);if(!html)return;
    const group=groupOf(entry.view,entry.id);
    // Upgrade the device pilot's existing breadcrumb rather than duplicating it.
    const existing=host.querySelector('.neighborhood-return')||host.querySelector(`.workspace-crumb [data-entry="${group.home}"]`)?.closest('.workspace-crumb');
    if(existing){existing.outerHTML=html;return;}
    const header=host.querySelector('.workspace-local-nav,.history-card-header,.reference-heading')||host;
    header.insertAdjacentHTML('afterbegin',html);
  }
  function bind(context){ctx=context;}
  function click(ev){const b=ev.target.closest('[data-neighborhood]');if(!b)return false;ctx.selectEntry(b.dataset.neighborhood);return true;}
  return {install,groups,homes,owned,groupOf,adjacent,breadcrumb,index,picker,reveal,render,mount,decorate,bind,click};
})();
