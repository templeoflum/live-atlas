const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const {execFileSync}=require('node:child_process');
const {historyImagesData:data,historyImages:media,historyAtlas:history,captures,neighborhoodCards}=require('./atlas-model.cjs')();
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const context={esc,flagHTML:()=>''};
const drum=media.figures.get('history-image-live-7-drum-rack-oriented');
assert.ok(drum,'Inspected Live 7 Drum Rack remains active');
assert.equal(drum.pdfDisplayTransform,'flip-vertical','Importer must preserve PDF display orientation');
assert.equal(drum.pdfPage,229);
assert.equal(drum.pdfImage,0);
assert.ok(!data.figures.some(f=>f.kind==='manual'||f.file.startsWith('manual/')),'Current manual images cannot stand in for historical versions');
const historicalVersions={'live-three':3,'live-four':4,'live-five':5,'live-six':6,'sampler-history':6,'live-seven':7,'instrument-partners':7,'live-eight':8};
for(const [id,major] of Object.entries(historicalVersions)){
  for(const image of data.cards[id]||[]){
    const f=media.figures.get('history-image-'+image);
    assert.equal(f.sourceMajor,major,'Version-matched historical figure: '+id);
  }
}
assert.ok(data.figures.every(f=>!f.svg&&!f.id.includes('diagram-')&&f.kind!=='diagram'),'No self-made diagram may return to the History collection');
assert.equal(new Set(data.figures.map(f=>f.id)).size,data.figures.length);
for(const f of data.figures){
  const path=join(__dirname,'assets',f.file),bytes=readFileSync(path);
  assert.equal(bytes.length,f.bytes,f.id);
  if(f.kind==='archive-manual'){
    assert.ok(Number.isInteger(f.pdfPage)&&f.pdfPage>2);
    assert.ok(Number.isInteger(f.pdfImage)&&f.pdfImage>=0);
    assert.match(f.pdfSha256,/^[a-f0-9]{64}$/);
    assert.equal(Number(f.sourceVersion.split('.')[0]),f.sourceMajor);
    assert.ok(f.caption.includes('Live '+f.sourceVersion+' manual'),'Exact source edition stays visible');
    assert.ok(f.source.endsWith('#page='+f.pdfPage));
  }
  assert.ok(f.file.endsWith('.png')?bytes.subarray(1,4).toString()==='PNG':bytes[0]===255&&bytes[1]===216,'Extension matches actual image bytes');
  const dimensions=execFileSync('sips',['-g','pixelWidth','-g','pixelHeight',path],{encoding:'utf8'});
  assert.equal(Number(dimensions.match(/pixelWidth: (\d+)/)[1]),f.width);
  assert.equal(Number(dimensions.match(/pixelHeight: (\d+)/)[1]),f.height);
  assert.equal(new URL(f.url).protocol,'https:');
  assert.ok(f.id.startsWith('history-image-')&&/^(history|manual)\//.test(f.file));
  assert.ok(f.title&&f.caption&&f.alt&&f.credit&&f.date&&f.rights);
  assert.equal(new URL(f.source).protocol,'https:');
  assert.equal(captures[f.id].file,f.file,'Shared enlarge viewer can resolve '+f.id);
  assert.ok(!captures[f.id].crop,'No extra image cropping');
  assert.ok(Object.values(data.cards).flat().includes(f.id.replace('history-image-','')),'Each image has a card home');
}
for(const [id,ids]of Object.entries(data.cards)){
  assert.ok(history.owned(id),id);
  const html=history.render(id,context);
  for(const image of ids){
    const f=media.figures.get('history-image-'+image);assert.ok(f,image);
    assert.ok(html.includes(`data-capture="${f.id}"`));
    assert.ok(html.includes(`src="assets/${f.file}"`));assert.ok(html.includes(esc(f.source)));
    assert.ok(html.includes(esc(f.caption)));assert.ok(html.includes(esc(f.alt)));
  }
  assert.ok(!/<details|<video|<iframe|src="https:|undefined/.test(html));
}
for(const c of history.cards.values()){
  if(data.cards[c.id]?.length){
    assert.ok(!data.gaps[c.id],'An illustrated card is not an unresolved gap');
    assert.ok(media.forCard(c.id,context,0));
    assert.ok(data.cards[c.id].length<=c.sections.length+1,'All placed visuals fit visible article slots');
  }else{
    assert.ok(data.gaps[c.id],'Missing visuals need a specific research note: '+c.id);
    assert.equal(media.forCard(c.id,context),'','No unrelated fallback to inflate coverage');
  }
}
for(const id of Object.keys(data.gaps))assert.ok(history.owned(id));
const opening=['monolake','laptop-audio','company'].map(id=>media.figures.get('history-image-'+data.cards[id][0]).file);
assert.equal(new Set(opening).size,opening.length,'Opening History cards must not repeat the same picture');
for(const p of history.periods){
  assert.ok(data.periods[p.id],'An artifact for every historical period and People');
  const html=neighborhoodCards.render('neighborhood-history-'+p.id,context);
  assert.ok(html.includes('history-period-figure'));
  assert.equal((html.match(/data-entry="/g)||[]).length,p.ids.length,'Same compact navigation choices');
}
assert.equal(media.forCard('unillustrated',context),'');
assert.equal(media.forPeriod('references',context),'','No arbitrary decorative fallback');
assert.match(media.figures.get('history-image-prototype').caption,/not the released Live 1/);
assert.match(media.figures.get('history-image-namm').caption,/tentatively/);
assert.match(media.figures.get('history-image-twelve-four').caption,/not a 12.4.6 screenshot/);
for(const id of ['operator','max-patch','cv-instrument','rewire-logic','certified-training','granulator-two'])assert.ok(!media.figures.has('history-image-'+id),'Rejected later stand-in remains inactive');
const page=readFileSync(join(__dirname,'index.html'),'utf8');
assert.ok(page.indexOf('history-images-data.js')<page.indexOf('history-images.js'));
assert.ok(page.indexOf('history-images.js')<page.indexOf('history-atlas.js'));
assert.ok(!page.includes('history-diagrams-data.js'),'Retired diagram authoring is not loaded');
assert.ok(page.indexOf('manual-images-data.js')<page.indexOf('history-images-data.js'));
console.log('Passed: version-matched historical figures, explicit visual gaps, distinct opening cards, no modern substitutes or homemade diagrams; dimensions, provenance, placement and enlargement checked.');
