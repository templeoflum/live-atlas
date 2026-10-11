// Reproducible coverage report, separate from the learner-facing surface.
const {readFileSync,writeFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
const read=name=>readFileSync(join(__dirname,name),'utf8');
const scripts=['entry-reference.js','manual-data.js','manual-guides.js','manual-device-guides.js','manual-workflow-guides.js','manual-editing-guides.js','manual-clip-guides.js','manual-workspace-guides.js','manual-set-guides.js','manual-routing-guides.js','manual-envelope-guides.js','manual-file-guides.js','manual-atlas.js'];
const atlas=read('atlas.js');
const code=scripts.map(read).join('\n')+'\n'+atlas.slice(0,atlas.indexOf('const flags=new Set();'));
const {manualAtlas:a,manualData:d,families,entryCaptures}=vm.runInNewContext(code+'\n({manualAtlas,manualData,families,entryCaptures})',{URL});
const nodes=Array.from(a.nodes.values());
const tableSections=new Set(d.shortcuts.map(k=>'live-keyboard-shortcuts#'+k.section));
const row=n=>({key:n.key,title:n.title,section:n.number,view:n.view,url:n.url});
const authored=n=>Boolean(n.guide||n.existing);
const referenceOnly=nodes.filter(n=>!authored(n)&&!tableSections.has(n.key));
const devices=families.flatMap(f=>f.items.map(([id,title])=>({id,title,family:f.name})));
const mediaQueue=devices.filter(x=>!entryCaptures[x.id]?.length&&!a.byId.get(x.id)?.guide?.images.length);
const report={version:d.version,source:d.source,retrieved:d.retrieved,counts:{...a.coverage(),shortcutTableSections:tableSections.size,referenceOnly:referenceOnly.length,devices:devices.length,devicePanelsPending:mediaQueue.length},chapters:a.roots.map(root=>{
  const children=nodes.filter(n=>n.chapterNumber===root.chapterNumber);
  return {title:root.title,number:root.number,view:root.view,total:children.length,authored:children.filter(authored).length,shortcutTables:children.filter(n=>tableSections.has(n.key)).length,referenceOnly:children.filter(n=>!authored(n)&&!tableSections.has(n.key)).length};
}),pendingGuides:referenceOnly.map(row),pendingDevicePanels:mediaQueue};
writeFileSync(join(__dirname,'manual-coverage.json'),JSON.stringify(report,null,2)+'\n');
const lines=[
  '# Full-manual integration coverage',
  '',
  `Source: [Ableton Live 12 manual](${d.source}), retrieved ${d.retrieved}.`,
  '',
  '**Status: the full source map is integrated; the original explanation and image conversion is not complete.**',
  '',
  `- ${report.counts.chapters} chapters and ${report.counts.sections} headings are indexed, routed, searchable and linked to their official sections.`,
  `- ${report.counts.authored} source sections currently have an original atlas guide or an existing pilot entry. This is section-entry coverage, not a claim that every parameter in those sections is explained.`,
  `- ${report.counts.shortcuts} factual shortcut rows are available across ${tableSections.size} table sections. Prose-only keyboard-context sections have separate original guides.`,
  `- ${referenceOnly.length} sections remain source references without original guides. They are not counted as converted.`,
  `- ${devices.length} devices/Racks have introductory entries. ${mediaQueue.length} still need their own native panel capture. Existing approved media are unchanged.`,
  '',
  '## Remaining work',
  '',
  '1. Write and fact-check the remaining original task/control explanations, grouped by the existing manual tree.',
  '2. Capture relevant native stills for the new controls and workflows, beginning with the missing device panels. No synthetic placeholders or unrelated images.',
  '3. Verify each new explanation against the installed Live release; preserve edition and point-release qualifications.',
  '4. Review the completed image/reference layer before any further video work.',
  '',
  'The exact pending section keys and device-image queue are in `manual-coverage.json`. Regenerate both reports with `node manual-coverage.cjs` after content changes.',
  '',
  '## Chapter coverage',
  '',
  '| Chapter | Atlas view | Headings | Original guide/entry | Shortcut tables | Reference only |',
  '| --- | --- | ---: | ---: | ---: | ---: |',
  ...report.chapters.map(c=>`| ${c.number}. ${c.title} | ${c.view} | ${c.total} | ${c.authored} | ${c.shortcutTables} | ${c.referenceOnly} |`),
  '',
  '## Source handling',
  '',
  '`import-manual.mjs` generates headings, section URLs and factual key mappings only. Raw HTML remains in the private sibling `manual-research` cache, outside the preview allowlist. The atlas does not ship manual prose or third-party images. Source-only entries retain direct official links.',
  '',
  'The main Live manual covers Push 1 and Push 2. It is not a conversion of the separate Push 3 manual. No learner accounts, shared collections or new videos were added.',
  ''
];
writeFileSync(join(__dirname,'MANUAL_COVERAGE.md'),lines.join('\n'));
console.log(JSON.stringify(report.counts));
