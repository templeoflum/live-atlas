// History has its own dated source imagery. Register with the shared image
// viewer after the manual pass, without relabelling these as manual figures.
const historyImages=(()=>{
  const figures=new Map(historyImagesData.figures.map(f=>[f.id,f]));
  const get=id=>figures.get('history-image-'+id);
  function install(captures){for(const f of figures.values())captures[f.id]={...f,previewHeight:280};}
  function figure(id,{esc},compact=false){
    const f=get(id);if(!f)return '';
    const width=Math.min(f.width/(f.pixelRatio||1),(compact?100:280)*f.width/f.height,compact?220:720);
    return `<figure class="live-figure history-figure${compact?' history-period-figure':''}">
      <button class="capture-button" data-capture="${f.id}" aria-label="Enlarge ${esc(f.title)} image">
        <span class="capture-frame" style="--image-width:${f.width}px;--preview-width:${width}px;aspect-ratio:${f.width}/${f.height}"><img class="capture-image" src="assets/${f.file}" alt="${esc(f.alt)}" width="${f.width}" height="${f.height}" loading="lazy" decoding="async" style="width:100%;left:0;top:0"><span class="capture-error" role="status" hidden>Image unavailable. Click to retry.</span></span>
      </button>
      <figcaption><span class="history-image-caption">${compact?esc(f.title)+' · ':''}${esc(f.caption)}</span><a href="${esc(f.source)}" target="_blank" rel="noreferrer">${esc(f.credit)} ↗</a><span class="history-image-enlarge" aria-hidden="true">Enlarge ↗</span></figcaption>
    </figure>`;
  }
  function forCard(id,ctx,position=null){
    const ids=historyImagesData.cards[id]||[];
    return (position===null?ids:[ids[position]]).filter(Boolean).map(image=>figure(image,ctx)).join('');
  }
  const forPeriod=(id,ctx)=>figure(historyImagesData.periods[id],ctx,true);
  return {figures,install,figure,forCard,forPeriod};
})();
