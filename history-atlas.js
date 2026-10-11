// Periods filter a bounded list; they do not expand a tree or replace the reader.
const historyAtlas=(()=>{
  const cards=new Map(historyData.cards.map(c=>[c.id,c]));
  const periods=historyData.periods.map(p=>({...p,ids:historyData.cards.filter(c=>c.period===p.id).map(c=>c.id)}));
  const scrollPositions=new Map();
  let escape,selectedPeriod='early',currentId='live-one';
  const owned=id=>cards.has(id);
  const activePeriod=()=>periods.find(p=>p.id===selectedPeriod);
  const periodOf=id=>periods.find(p=>p.ids.includes(id));
  function install(m){
    const referenceGroups=m.topicGroups.history.map(g=>({...g,ids:g.ids.filter(id=>!cards.has(id))})).filter(g=>g.ids.length);
    for(const c of cards.values()){
      const source='history-'+c.refs[0];
      m.sources[source]=historyData.sources[c.refs[0]].url;
      m.entries.set(c.id,{id:c.id,view:'history',title:c.title,body:[c.lead,...c.sections.map(s=>s.title+' '+s.text)].join(' '),source,
        group:periodOf(c.id).title,year:c.when,links:c.links,
        atlasContext:'History › '+periodOf(c.id).label});
    }
    m.topicGroups.history=[...periods.map(p=>({id:p.id,name:p.label+' · '+p.title,ids:p.ids})),...referenceGroups];
  }
  function listHTML(esc){
    return activePeriod().ids.map(id=>{
      const c=cards.get(id),on=id===currentId;
      return `<button class="topic-item history-place${on?' selected':''}" data-entry="${id}" aria-pressed="${on}" aria-controls="insp-history"><span>${esc(c.title)}<small>${esc(c.when)}</small></span></button>`;
    }).join('');
  }
  function index(esc){
    escape=esc;
    return `<div class="device-neighborhoods"><h3>Periods & people</h3><nav class="device-neighborhood-grid history-periods" aria-label="History periods and people">${periods.map(p=>`<button data-history-period="${p.id}" aria-pressed="${p.id===selectedPeriod}" aria-controls="historyPeriodList">${esc(p.label)}</button>`).join('')}</nav></div>
      <h3 class="device-list-heading" id="historyPeriodHeading">${esc(activePeriod().title)}</h3>
      <nav id="historyPeriodList" class="workspace-places device-neighborhood-list" aria-labelledby="historyPeriodHeading" tabindex="0">${listHTML(esc)}</nav>
      <p class="history-cutoff">Researched through <time datetime="${historyData.checked}">23 Sep 2026</time></p>`;
  }
  function topicOptions(esc){
    const p=activePeriod();
    return `<option value="" disabled ${p.ids.includes(currentId)?'':'selected'}>Choose an entry</option>`+p.ids.map(id=>`<option value="${id}" ${id===currentId?'selected':''}>${esc(cards.get(id).title)}</option>`).join('');
  }
  function picker(esc){
    return `<div class="topic-picker device-pickers history-pickers"><label>Period / people<select data-history-period-select aria-label="History period or people">${periods.map(p=>`<option value="${p.id}" ${p.id===selectedPeriod?'selected':''}>${esc(p.label)}</option>`).join('')}</select></label><label>Entry<select data-topic-picker="history" aria-label="History entry">${topicOptions(esc)}</select></label></div>`;
  }
  function refreshList(){
    const list=document.querySelector('#historyPeriodList');
    if(list){list.innerHTML=listHTML(escape);list.scrollTop=scrollPositions.get(selectedPeriod)||0;}
    const topic=document.querySelector('[data-topic-picker="history"]');
    if(topic)topic.innerHTML=topicOptions(escape);
  }
  function selectPeriod(id){
    if(!periods.some(p=>p.id===id)||selectedPeriod===id)return;
    const list=document.querySelector('#historyPeriodList');
    if(list)scrollPositions.set(selectedPeriod,list.scrollTop);
    selectedPeriod=id;
    document.querySelector('#historyIndex')?.querySelectorAll('[data-history-period]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.historyPeriod===id));
    const heading=document.querySelector('#historyPeriodHeading');
    if(heading)heading.textContent=activePeriod().title;
    const picker=document.querySelector('[data-history-period-select]');
    if(picker)picker.value=id;
    refreshList();
  }
  function revealSelection(id){
    currentId=id;
    const p=periodOf(id);if(!p)return;
    if(selectedPeriod!==p.id)selectPeriod(p.id);
    // Keep the focused topic button and list position when moving within a period.
    const picker=document.querySelector('[data-topic-picker="history"]');
    if(picker)picker.value=id;
    const list=document.querySelector('#historyPeriodList');
    const button=list?.querySelector(`[data-entry="${id}"]`);
    if(button){
      const item=button.getBoundingClientRect(),bounds=list.getBoundingClientRect();
      if(item.top<bounds.top)list.scrollTop+=item.top-bounds.top;
      else if(item.bottom>bounds.bottom)list.scrollTop+=item.bottom-bounds.bottom;
    }
  }
  function click(ev){
    const button=ev.target.closest('[data-history-period]');
    if(!button)return false;
    selectPeriod(button.dataset.historyPeriod);return true;
  }
  function render(id,ctx){
    const c=cards.get(id),esc=ctx.esc,p=periodOf(id);
    const route=neighborhoodCards.adjacent('history',id);
    const step=(other,dir)=>other?`<button data-entry="${other.id}"><small>${dir==='previous'?'← Previous':'Next →'}</small>${esc(other.label)}</button>`:'<span></span>';
    return `<article class="history-article" aria-labelledby="historyCardTitle">
      <header class="history-card-header"><div class="insp-eyebrow">${esc(c.when)}</div><h3 class="insp-title" id="historyCardTitle" tabindex="-1">${esc(c.title)}</h3><p class="history-lead">${esc(c.lead)}</p></header>
      ${historyImages.forCard(id,ctx,0)}
      <div class="history-sections">${c.sections.map((s,i)=>`<section><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p>${historyImages.forCard(id,ctx,i+1)}</section>`).join('')}</div>
      ${c.links.length?`<nav class="history-connections" aria-label="Related history">${c.links.map(id=>`<button data-entry="${id}">${esc(cards.get(id).title)} <span aria-hidden="true">↗</span></button>`).join('')}</nav>`:''}
      <section class="history-sources" aria-label="Historical sources"><h4>Sources</h4>${c.evidence?`<p class="history-evidence">${esc(c.evidence)}</p>`:''}<ul>${c.refs.map(id=>{
        const s=historyData.sources[id];
        return `<li><a href="${esc(s.url)}" target="_blank" rel="noreferrer">${esc(s.title)} ↗</a><span>${esc(s.kind)}${s.date?' · '+esc(s.date):''}</span>${s.note?`<p>${esc(s.note)}</p>`:''}</li>`;
      }).join('')}</ul></section>
      <div class="history-card-footer">${ctx.flagHTML(c.id)}<span>${esc(p.label)}</span></div>
      <nav class="history-adjacent" aria-label="Cards in History">${step(route.previous,'previous')}${step(route.next,'next')}</nav>
      </article>`;
  }
  function mount(host,entry,ctx){currentId=entry.id;host.innerHTML=render(entry.id,ctx);host.scrollTop=0;}
  return {install,cards,periods,owned,activePeriod,periodOf,index,picker,selectPeriod,revealSelection,click,render,mount};
})();
