// Visit-local navigation only. This is not the proposed lesson trace or export.
const cardNavigation=(()=>{
  function createTrail(prefix='cards-'+Date.now()+'-'+Math.random().toString(36).slice(2)){
    let visits=[],cursor=-1,serial=0,held=[];
    const current=()=>visits[cursor];
    const copy=p=>({...p});
    function arrive(view,id,key,traversal=false){
      const at=visits.findIndex(v=>v.key===key&&v.view===view&&v.id===id);
      if(at>=0){cursor=at;return current();}
      // A native history jump may reach an entry from before this page load.
      // Its browser offset is unknown: start a new safe boundary, retaining Hold.
      if(traversal){visits=[];cursor=-1;}
      visits=visits.slice(0,cursor+1);
      visits.push({key:prefix+'-'+serial++,view,id,position:{outer:0,inner:0}});
      cursor=visits.length-1;return current();
    }
    function remember(position){if(current())current().position=copy(position);}
    function previous(){
      for(let i=cursor-1;i>=0;i--)if(visits[i].id)return {visit:visits[i],delta:i-cursor};
      return null;
    }
    function hold(){
      const v=current();
      if(!v?.id||held.length>=3||held.some(h=>h.view===v.view&&h.id===v.id))return false;
      held.push({...v,position:copy(v.position)});return true;
    }
    const release=key=>{held=held.filter(h=>h.key!==key);};
    const isAt=(view,id,key)=>current()?.key===key&&current()?.view===view&&current()?.id===id;
    return {arrive,remember,previous,current,hold,release,isAt,held:()=>held};
  }
  const trail=createTrail();
  const snapshots=new Map();
  let ctx,pending=false,preview=null,previewBase=null,previewButton=null,previewKey=null;
  function toolbar(){return `<nav class="card-navigation" aria-label="Card navigation"><button data-card-back disabled>← Back</button><div class="held-cards" aria-label="Held cards" hidden></div><button data-card-hold title="Keep this card available during this visit">Hold</button></nav>`;}
  function bind(context){
    ctx=context;
    document.querySelectorAll('.inspector').forEach(host=>{
      const stage=document.createElement('div');stage.className='card-stage';
      host.before(stage);stage.innerHTML=toolbar()+'<div class="card-reader"></div>';stage.querySelector('.card-reader').append(host);
    });
    for(const id of ['overview','flags'])document.querySelector('#view-'+id).insertAdjacentHTML('afterbegin',`<div class="card-navigation-away" hidden>${toolbar()}</div>`);
  }
  function remember(){
    closePreview();
    const v=trail.current();if(!v?.id)return;
    const host=document.querySelector('#insp-'+v.view);
    trail.remember({outer:host?.scrollTop||0,inner:host?.querySelector('.workspace-reading')?.scrollTop||0});
  }
  function restore(position){
    const v=trail.current();if(!v?.id)return;
    const host=document.querySelector('#insp-'+v.view);if(!host)return;
    host.scrollTop=position.outer||0;
    const panel=host.querySelector('.workspace-reading');if(panel)panel.scrollTop=position.inner||0;
    trail.remember(position);
  }
  function title(v){
    if(!v?.id)return '';
    const entry=ctx.entries.get(v.id),label=entry?.title||v.id;
    return entry?.group&&entry.group!==label?entry.group+' · '+label:label;
  }
  function shortTitle(v){
    const entry=ctx.entries.get(v.id);
    return ctx.cardTitle?.(v.id)||entry?.title||v.id;
  }
  function closePreview(focus=false){
    if(!preview)return false;
    snapshots.get(previewKey).position={outer:preview.scrollTop,inner:preview.querySelector('.workspace-reading')?.scrollTop||0};
    preview.remove();preview=null;
    if(previewBase){previewBase.inert=false;previewBase.removeAttribute('aria-hidden');previewBase.classList.remove('behind-held-card');previewBase=null;}
    if(focus)previewButton?.focus({preventScroll:true});
    previewButton=null;previewKey=null;update();return true;
  }
  function togglePreview(button){
    const key=button.dataset.cardPeek,same=previewKey===key;
    closePreview();if(same)return;
    const held=trail.held().find(h=>h.key===key),snapshot=snapshots.get(key);if(!held||!snapshot)return;
    previewKey=key;preview=snapshot.node.cloneNode(true);preview.id='heldCardPreview';preview.classList.add('held-preview');
    preview.setAttribute('aria-label',shortTitle(held));preview.setAttribute('role','region');
    preview.removeAttribute('aria-hidden');preview.inert=false;preview.tabIndex=0;
    // A held card has its own reader. It never mounts over the live controllers
    // or changes the URL, selection, Back trail, or underlying reading position.
    const ids=new Map();preview.querySelectorAll('[id]').forEach(el=>{const old=el.id;el.id='held-'+old;ids.set(old,el.id);});
    preview.querySelectorAll('[aria-labelledby],[aria-describedby],[aria-controls],[for]').forEach(el=>{
      for(const attr of ['aria-labelledby','aria-describedby','aria-controls','for'])if(el.hasAttribute(attr))el.setAttribute(attr,el.getAttribute(attr).split(' ').map(id=>ids.get(id)||id).join(' '));
    });
    const stage=button.closest('.card-stage'),reader=stage?.querySelector('.card-reader');
    previewBase=reader?.querySelector('.inspector');
    if(previewBase){previewBase.inert=true;previewBase.setAttribute('aria-hidden','true');previewBase.classList.add('behind-held-card');}
    else preview.classList.add('held-preview-away');
    (reader||button.closest('.card-navigation-away')).append(preview);previewButton=button;
    const position=snapshot.position;
    preview.scrollTop=position.outer||0;
    const panel=preview.querySelector('.workspace-reading');if(panel)panel.scrollTop=position.inner||0;
    ctx.refreshFlags?.();update();
  }
  function update(){
    const previous=trail.previous(),held=trail.held(),current=trail.current();
    document.querySelectorAll('.card-navigation').forEach(bar=>{
      const back=bar.querySelector('[data-card-back]');
      back.disabled=!previous||pending;
      back.title=previous?'Back to '+title(previous.visit):'No earlier card in this visit';
      back.setAttribute('aria-label',previous?'Back to '+title(previous.visit):'Back');
      const tabs=bar.querySelector('.held-cards');tabs.hidden=!held.length;
      tabs.querySelectorAll('.held-card-slot').forEach(slot=>{if(!held.some(h=>h.key===slot.dataset.heldSlot))slot.remove();});
      for(const card of held){
        let slot=Array.from(tabs.children).find(el=>el.dataset.heldSlot===card.key);
        if(!slot){
          slot=document.createElement('div');slot.className='held-card-slot';slot.dataset.heldSlot=card.key;
          slot.innerHTML='<button data-card-peek aria-expanded="false"></button><button data-card-release>×</button>';
          slot.querySelector('[data-card-peek]').dataset.cardPeek=card.key;
          slot.querySelector('[data-card-release]').dataset.cardRelease=card.key;tabs.append(slot);
        }
        const peekButton=slot.querySelector('[data-card-peek]'),open=Boolean(preview&&peekButton===previewButton);
        peekButton.textContent=shortTitle(card);peekButton.title=(open?'Hide ':'View ')+(ctx.entries.get(card.id)?.atlasContext||title(card));
        peekButton.setAttribute('aria-expanded',open);
        if(open)peekButton.setAttribute('aria-controls','heldCardPreview');else peekButton.removeAttribute('aria-controls');
        const release=slot.querySelector('[data-card-release]');release.title='Release '+shortTitle(card);release.setAttribute('aria-label',release.title);
        slot.classList.toggle('is-open',open);
      }
      const hold=bar.querySelector('[data-card-hold]');
      const alreadyHeld=held.some(h=>h.id===current?.id&&h.view===current?.view);
      hold.disabled=!current?.id||alreadyHeld||held.length>=3;
      hold.textContent=alreadyHeld?'Held':'Hold';
      hold.setAttribute('aria-pressed',alreadyHeld);
      hold.title=alreadyHeld?'This card is already held':held.length>=3?'Three cards held. Release one to hold another.':'Keep this card available during this visit';
    });
    document.querySelectorAll('.card-navigation-away').forEach(el=>el.hidden=!held.length&&!previous);
  }
  function arrive(view,id,key,position,traversal=false){
    const visit=trail.arrive(view,id,key,traversal);pending=false;
    restore(position||visit.position);update();return visit.key;
  }
  function click(ev){
    if(ev.target.closest('[data-card-back]')){
      closePreview();const prev=trail.previous();if(prev&&!pending){pending=true;update();history.go(prev.delta);}return true;
    }
    if(ev.target.closest('[data-card-hold]')){
      remember();if(trail.hold()){
        const held=trail.held().at(-1);snapshots.set(held.key,{node:document.querySelector('#insp-'+held.view).cloneNode(true),position:{...held.position}});
        ctx.announce(shortTitle(held)+' held for this visit.');
      }update();return true;
    }
    const release=ev.target.closest('[data-card-release]');
    if(release){
      const key=release.dataset.cardRelease,bar=release.closest('.card-navigation');
      if(previewKey===key)closePreview();
      trail.release(key);snapshots.delete(key);update();
      (bar.querySelector('[data-card-peek]')||bar.querySelector('[data-card-hold]')).focus({preventScroll:true});
      ctx.announce('Held card released.');return true;
    }
    const peekButton=ev.target.closest('[data-card-peek]');
    if(peekButton){
      togglePreview(peekButton);return true;
    }
    return false;
  }
  return {createTrail,trail,bind,remember,restore,arrive,update,click,closePreview,isAt:trail.isAt};
})();
