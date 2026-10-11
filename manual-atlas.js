// The complete source map is separate from the authored atlas layer.
// A section with only a verified link is never counted as a rewritten guide.
const manualAtlas = (() => {
  const nodes=new Map(),byId=new Map(),byNumber=new Map(),roots=[];
  let entries,ctx;
  const homes={1:'history',2:'workspace',3:'workspace',4:'workspace',5:'workspace',6:'workspace',7:'workspace',8:'clips',9:'clips',10:'clips',11:'clips',12:'clips',13:'clips',14:'clips',15:'clips',16:'clips',17:'workspace',18:'workspace',19:'clips',20:'workspace',21:'clips',22:'clips',23:'devices',24:'devices',25:'workspace',26:'clips',27:'workspace',28:'devices',29:'devices',30:'devices',31:'devices',32:'devices',33:'workspace',34:'workspace',35:'workspace',36:'workspace',37:'workspace',38:'workspace',39:'workspace',40:'workspace',41:'workspace',42:'history'};
  const chapterNames={2:'Setup & help',3:'Live’s objects',4:'Browser',5:'Files & projects',6:'Arrangement',7:'Session',8:'Clip properties',9:'Warp & tempo',10:'MIDI editing',11:'MIDI tools',12:'MPE',13:'Audio → MIDI',14:'Grooves',15:'Tunings',16:'Launch behavior',17:'Routing',18:'Mixing',19:'Recording',20:'Bounce to audio',21:'Comping',22:'Stem separation',23:'Using devices',24:'Racks',25:'Automation',26:'Clip envelopes',27:'Video',28:'Audio effects',29:'MIDI effects',30:'Instruments',31:'Max for Live',32:'Max devices',33:'Remote control',34:'Push 1',35:'Push 2',36:'Synchronization',37:'Performance & resources',38:'Audio behavior',39:'MIDI timing',40:'Accessibility',41:'Shortcuts',42:'Credits',1:'About Live'};
  const keyOf=url=>{const u=new URL(url);return u.pathname.split('/').filter(Boolean).at(-1)+'#'+u.hash.slice(1);};
  const clean=s=>String(s).toLowerCase().replace(/⌘|\bcommand\b/g,' cmd ').replace(/⌥|\boption\b/g,' alt ').replace(/⇧/g,' shift ').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
  const matches=(query,value)=>{const haystack=clean(value),words=haystack.split(' ');return query.split(' ').every(t=>t.length===1?words.includes(t):haystack.includes(t));};
  const keyQuery=query=>query.split(' ').some(t=>['cmd','ctrl','alt','shift'].includes(t));
  const shortcutMatches=(query,k)=>keyQuery(query)?matches(query,k[ctx?.platform?.()||'mac']):matches(query,k.action+' '+k[ctx?.platform?.()||'mac']);
  function install(model){
    entries=model.entries;
    model.sources.manual=manualData.source;
    const existing=new Map();
    for(const [id,r] of Object.entries(atlasReference.items))if(!existing.has(keyOf(r.source)))existing.set(keyOf(r.source),id);
    existing.set('editing-midi#quantizing-notes','quantize');
    existing.set('midi-tools#quantize','quantize');
    for(const raw of manualData.nodes){
      const key=raw.chapter+'#'+raw.anchor,chapterNumber=+raw.number.split('.')[0];
      // Preserve source-group routes; the shortcut explorer gives them contextual homes.
      const id=(chapterNumber!==41&&existing.get(key))||(chapterNumber===41&&raw.number==='41'?'shortcuts':'ref-'+raw.chapter+'--'+raw.anchor);
      const original=entries.get(id);
      const conceptViews={'audio-clips-and-samples':'clips','midi-clips-and-midi-files':'clips','recording-new-clips':'clips','clip-envelopes':'clips','scale-awareness':'clips','devices':'devices','presets-and-racks':'devices'};
      const node={...raw,key,id,view:original?.view||(chapterNumber===3&&conceptViews[raw.anchor])||homes[chapterNumber],chapterNumber,children:[],guide:manualGuides.items[key]||null,existing:Boolean(original)};
      nodes.set(key,node);byNumber.set(raw.number,node);
      if(!byId.has(id))byId.set(id,node);
      if(!raw.number.includes('.'))roots.push(node);
      if(original){original.manualKey=original.manualKey||key;}
      else entries.set(id,{id,view:node.view,title:raw.title,body:node.guide?.body||'',group:chapterNames[chapterNumber],source:'manual',manualNode:key,manualKey:key});
    }
    for(const node of nodes.values()){
      const number=node.number.split('.');number.pop();
      // The official manual occasionally skips a heading level (e.g. 28.12.0.1).
      // Attach to the closest real ancestor, not an invented empty section.
      while(number.length&&!byNumber.has(number.join('.')))number.pop();
      node.parent=byNumber.get(number.join('.'))||null;
      node.parent?.children.push(node);
    }
    for(const [id,reference] of Object.entries(atlasReference.items)){
      const key=keyOf(reference.source);if(nodes.has(key))entries.get(id).manualKey=key;
    }
    // Fill the same device families, retaining the user's original curated entries.
    const catalogs=[['Instruments',30,2],['Audio Effects',28,2],['MIDI Effects',29,2],['Max for Live',32,3]];
    for(const [name,chapterNumber,depth] of catalogs){
      let family=model.families.find(f=>f.name===name);
      if(!family){family={name,role:'Instruments · Effects · Modulators',source:'manual',items:[]};model.families.push(family);model.topicGroups.devices.push({name,ids:[]});}
      const group=model.topicGroups.devices.find(g=>g.name===name);
      for(const n of nodes.values())if(n.chapterNumber===chapterNumber&&n.number.split('.').length===depth){
        if(family.items.some(([id])=>id===n.id))continue;
        const e=entries.get(n.id);e.group=name;
        family.items.push([n.id,n.title,n.guide?.body||'',n.guide?.controls||[]]);group.ids.push(n.id);
      }
    }
    for(const view of Object.keys(model.topicGroups)){
      const ids=roots.filter(n=>n.view===view).map(n=>n.id);
      model.topicGroups[view].push({name:'Manual',ids,collapsed:true});
    }
  }
  const e=s=>ctx.esc(s);
  const link=(url,label)=>`<a href="${e(url)}" target="_blank" rel="noreferrer">${e(label)} ↗</a>`;
  const button=(n,label)=>`<button class="manual-section-link" data-entry="${e(n.id)}"><span>${e(label||n.title)}</span><span aria-hidden="true">↗</span></button>`;
  function childrenHTML(node,children=node.children){
    return children.length?`<div class="manual-children" aria-label="Sections in ${e(node.title)}">${children.map(n=>button(n)).join('')}</div>`:'';
  }
  function breadcrumb(node){
    const parents=[];let p=node.parent;while(p){parents.unshift(p);p=p.parent;}
    return parents.length?`<nav class="manual-breadcrumb" aria-label="Reference location">${parents.map(p=>`<button data-entry="${e(p.id)}">${e(p.title)}</button>`).join('<span aria-hidden="true">/</span>')}</nav>`:'';
  }
  function guideHTML(guide){
    if(!guide)return '';
    const media=guide.imageLabels?`<div class="manual-image-pair">${guide.images.map((id,i)=>`<div><p>${e(guide.imageLabels[i])}</p>${ctx.captureFigure(id)}</div>`).join('')}</div>`:guide.images.map(ctx.captureFigure).join('');
    return `${guide.keys?.length?`<div class="pilot-keys" aria-label="Keys for this action">${guide.keys.map(k=>`<span><small>${e(k.action)}</small><kbd>${e(k[ctx.platform()])}</kbd></span>`).join('')}</div>`:''}${media}
      <div class="reference-depth">
      ${guide.steps.length?`<section class="reference-section"><h4>${e(guide.title)}</h4><ol class="reference-steps">${guide.steps.map(s=>`<li>${e(s)}</li>`).join('')}</ol></section>`:''}
      ${guide.terms.length?`<section class="reference-section"><h4>Controls</h4><dl class="reference-terms">${guide.terms.map(([term,text])=>`<div><dt>${e(term)}</dt><dd>${e(text)}</dd></div>`).join('')}</dl></section>`:''}
      ${guide.controls?.length?`<div class="manual-control-names">${guide.controls.map(c=>`<span>${e(c)}</span>`).join('')}</div>`:''}
      ${guide.note?`<section class="reference-section"><h4>Notes</h4><p>${e(guide.note)}</p></section>`:''}</div>`;
  }
  function mount(host,entry,context){
    if(typeof shortcutExplorer!=='undefined'&&shortcutExplorer.owned(entry.id)){shortcutExplorer.mount(host,entry,context);return;}
    ctx=context;const n=nodes.get(entry.manualNode),g=n.guide;
    host.innerHTML=`${breadcrumb(n)}<div class="reference-heading"><div><div class="insp-eyebrow">${e(g?'Live 12 · Reference':'Live 12 · Manual section')}</div><h3 class="insp-title">${e(n.title)}</h3></div><label class="platform-label">Keys <select data-reference-platform aria-label="Shortcut platform"><option value="mac" ${ctx.platform()==='mac'?'selected':''}>Mac</option><option value="win" ${ctx.platform()==='win'?'selected':''}>Windows</option></select></label></div>
      ${g?`<div class="insp-body"><p>${e(g.body)}</p></div>${guideHTML(g)}`:''}
      ${childrenHTML(n)}
      <div class="manual-source">${link(n.url,g?'Live manual · '+n.number:'Read this section in the manual')}</div>
      <div class="manual-flag">${ctx.flagHTML(n.id)}</div>`;
    host.scrollTop=0;
  }
  function related(id,context){
    ctx=context;const entry=entries.get(id),n=nodes.get(entry?.manualKey);if(!n)return '';
    const target=n.children.length?n:n.parent||n;
    return `<section class="reference-section manual-related"><h4>Related controls</h4>${childrenHTML(target)}${target!==n?button(target,'All '+target.title+' sections'):''}${link(n.url,'Official section '+n.number)}</section>`;
  }
  function index(view,esc){
    return `<details class="manual-index"><summary>Manual</summary>${roots.filter(n=>n.view===view).map(n=>`<button class="topic-item" data-entry="${esc(n.id)}"><span>${esc(chapterNames[n.chapterNumber])}</span></button>`).join('')}</details>`;
  }
  function search(query){
    const terms=clean(query).split(' ').filter(Boolean);if(!terms.length)return [];
    const results=[];
    for(const entry of entries.values()){
      const node=byId.get(entry.id),parents=[];let parent=node?.parent;
      while(parent?.parent){parents.unshift(parent.title);parent=parent.parent;}
      const context=entry.atlasContext||parents.join(' › ')||entry.group;
      const title=clean(entry.title),haystack=clean([entry.title,entry.group,entry.body,context].filter(Boolean).join(' '));
      if(terms.every(t=>haystack.includes(t)))results.push({id:entry.id,title:entry.title,view:entry.view,context,score:(title===clean(query)?100:terms.every(t=>title.includes(t))?60:20)+(node?.guide||!entry.manualNode?5:0)});
    }
    for(const k of manualData.shortcuts){
      if(shortcutMatches(clean(query),k)){const n=nodes.get('live-keyboard-shortcuts#'+k.section);const exact=[k.mac,k.win].some(value=>clean(value)===clean(query));results.push({id:typeof shortcutExplorer!=='undefined'?shortcutExplorer.rowHome(k):n.id,title:k.action,view:'workspace',context:k[ctx?.platform?.()||'mac']||'Shortcut',shortcut:query,shortcutRow:manualData.shortcuts.indexOf(k),score:exact?110:40});}
    }
    return results.sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title)).slice(0,40);
  }
  function findResults(){
    const dialog=document.querySelector('#atlasFind'),input=dialog.querySelector('input');
    const results=search(input.value);
    dialog.querySelector('#atlasFindResults').innerHTML=results.length?results.map(r=>`<button data-find-entry="${e(r.id)}" ${r.shortcut?`data-find-shortcut-row="${r.shortcutRow}"`:''}><span>${e(r.title)}</span><small>${e(r.view)} · ${e(r.context)}</small></button>`).join(''):input.value?'<p>No matches.</p>':'';
    dialog.querySelector('#atlasFindCount').textContent=results.length?`${results.length}${results.length===40?'+':''} results`:'';
  }
  function bind(context){
    ctx=context;
    document.querySelector('#atlasFindOpen').addEventListener('click',()=>{const d=document.querySelector('#atlasFind');d.showModal();d.querySelector('input').focus();});
    document.querySelector('#atlasFindClose').addEventListener('click',()=>document.querySelector('#atlasFind').close());
    document.querySelector('#atlasFindQuery').addEventListener('input',findResults);
    document.querySelector('#atlasFindQuery').addEventListener('keydown',ev=>{if(['ArrowDown','Enter'].includes(ev.key)){const first=document.querySelector('[data-find-entry]');if(first){ev.preventDefault();if(ev.key==='Enter')first.click();else first.focus();}}});
    document.querySelector('#atlasFindResults').addEventListener('click',ev=>{
      const button=ev.target.closest('[data-find-entry]');if(!button)return;
      document.querySelector('#atlasFind').close();context.selectEntry(button.dataset.findEntry);
      if(button.dataset.findShortcutRow!==undefined&&typeof shortcutExplorer!=='undefined')shortcutExplorer.focusRow(Number(button.dataset.findShortcutRow));
    });
  }
  function coverage(){
    const rows=[...nodes.values()];return {chapters:roots.length,sections:rows.length,shortcuts:manualData.shortcuts.length,authored:rows.filter(n=>n.guide||n.existing).length,sourceOnly:rows.filter(n=>!n.guide&&!n.existing).length};
  }
  return {nodes,byId,roots,install,mount,related,index,bind,search,coverage};
})();
