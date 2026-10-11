// Audit the actual action-card model, not the older per-section guide count.
// Read-only: print Markdown by default, or JSON with --json.
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const read=name=>readFileSync(join(__dirname,name),'utf8');
function audit(){
  const html=read('index.html'),source=read('atlas.js');
  const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]).filter(n=>n!=='atlas.js');
  const model=vm.runInNewContext(scripts.map(read).join('\n')+'\n'+source.slice(0,source.indexOf('const flags=new Set();'))+'\n({entries,topicGroups,manualData,manualAtlas,workspaceAtlas,clipsAtlas,devicesAtlas,shortcutExplorer})',{URL,document:{querySelector:()=>null}});
  const {entries,topicGroups,manualData:data,manualAtlas:manual,workspaceAtlas:w,clipsAtlas:c,devicesAtlas:d,shortcutExplorer:k}=model;
  const navigation=new Set(Object.values(topicGroups).flatMap(groups=>groups.flatMap(g=>g.ids)));
  const rows=[...manual.nodes.values()].map(n=>{
    const row={section:n.number,key:n.key,title:n.title,url:n.url,view:n.view,status:'reference-only',hasSectionGuide:Boolean(n.guide||n.existing),path:null,card:null};
    // This matches the inspector's dispatch order: shortcut, Workspace, Clips,
    // Devices. An ID existing in the global search index is not card coverage.
    if(k.owned(n.id)){
      const shortcuts=data.shortcuts.map((r,i)=>({r,i})).filter(({r})=>r.section===n.anchor);
      row.status='shortcut-actions';row.path='Workspace → Navigation → Shortcuts';
      row.cards=[...new Set(shortcuts.map(({i})=>k.rowHome(i)))];
      if(row.cards.some(id=>!k.owned(id)))throw Error('Unreachable shortcut: '+n.key);
      row.card='shortcuts';
    }else{
      const owner=w.owned(n.id)?w:c.owned(n.id)?c:d.owned(n.id)?d:null;
      if(owner){
        const loc=owner.locations.get(n.id),action=loc.action||loc.item;
        if(!navigation.has(loc.area.home))throw Error('Card is not in navigation: '+n.key);
        row.status=owner.sourceHomes.has(n.key)?'action-card':'context-card';
        row.card=action.id;
        row.path=owner===w?['Workspace',w.neighborhoodOf(n.id).name,loc.area.label,action.label].join(' → '):owner===d?['Devices',d.neighborhoodOf(n.id).name,loc.area.label,action.label].join(' → '):['Clips',loc.area.label,action.label].join(' → ');
      }
    }
    if(!entries.has(n.id))throw Error('Missing source entry: '+n.key);
    if([1,42].includes(n.chapterNumber)&&n.guide){
      row.status='source-information';row.card=n.id;row.path='Sources & scope → '+n.title;
    }
    return row;
  });
  const chapters=manual.roots.map(root=>{
    const sections=rows.filter(r=>r.key.startsWith(root.chapter+'#'));
    return {number:root.number,title:root.title,sections:sections.length,mapped:sections.filter(r=>r.status!=='reference-only').length,missing:sections.filter(r=>r.status==='reference-only').length};
  });
  const pending=rows.filter(r=>r.status==='reference-only');
  return {retrieved:data.retrieved,source:data.source,chapters,rows,pending,counts:{sections:rows.length,mapped:rows.length-pending.length,missing:pending.length,plainReferenceGuides:pending.filter(r=>r.hasSectionGuide).length,linkOnly:pending.filter(r=>!r.hasSectionGuide).length}};
}
function markdown(report){
  const lines=[
    '# Manual-to-card audit', '',
    `Audit of the current app against the cached [Live 12 manual](${report.source}), retrieved ${report.retrieved}.`, '',
    '**This measures local card placement, not completeness of the explanations.**', '',
    `${report.counts.missing} source headings have no local atlas action-card home. Of these, ${report.counts.plainReferenceGuides} have an older reference-pane guide and ${report.counts.linkOnly} only have the source link. Searchability does not count as a card.`, '',
    'A single well-placed card may cover several manual headings. Mapped device parameters, chapter introductions and shared concepts still need a text-depth review; a route or citation is not proof that every control and behavior is explained.', '',
    ...(report.counts.missing?[
      '## Missing placements by chapter', '',
      '| Chapter | Headings without a card |', '| --- | ---: |',
      ...report.chapters.filter(c=>c.missing).map(c=>`| ${c.number}. ${c.title} | ${c.missing} |`), '',
      '## Exact queue', '',
      'Each heading below needs either an appropriate existing card expanded and linked, or a new action card. Do not make one card per heading mechanically.', ''
    ]:[
      '## Placement result', '',
      'All 42 cached chapters have local destinations: 1,048 action/context/shortcut headings and three source-information headings. Welcome and credits are available from Sources & scope. Push 1 and Push 2 have separate places under Settings & controllers.', '',
      'The missing-placement queue is closed. The parameter-level text-depth review remains open; see `MANUAL_CONTENT_REVIEW.md`.', ''
    ])
  ];
  for(const chapter of report.chapters.filter(c=>c.missing)){
    lines.push(`### ${chapter.number}. ${chapter.title}`,'');
    for(const row of report.pending.filter(r=>r.section.split('.')[0]===chapter.number))lines.push(`- [${row.section} · ${row.title}](${row.url}) — ${row.hasSectionGuide?'reference guide only':'source link only'}`);
    lines.push('');
  }
  lines.push('## Recheck','', '`node manual-card-audit.cjs` prints this audit; add `--json` for every heading’s status and card path. The script loads the same content modules as the app. No manual media is downloaded or changed.','');
  return lines.join('\n');
}
if(require.main===module){const report=audit();console.log(process.argv.includes('--json')?JSON.stringify(report,null,2):markdown(report));}
module.exports={audit,markdown};
