// Figure placements follow source sections through the atlas's editorial homes.
// No legacy screenshot is allowed to leak through a secondary renderer.
const manualImages=(()=>{
  const placements=[],unplaced=[];
  // The manual's inline icons carry no caption; name each by what its sentence says it is.
  const iconLabels={
    'manual-managing-files-and-sets-002':'Sample with an analysis (.asd) file',
    'manual-managing-files-and-sets-003':'Sample without an analysis file',
    'manual-arrangement-view-024':'Track unfold button',
    'manual-session-view-021':'Arrangement View selector',
    'manual-session-view-022':'Session View selector',
    'manual-audio-clips-tempo-and-warping-022':'Transient Loop Mode · Loop Off',
    'manual-audio-clips-tempo-and-warping-023':'Transient Loop Mode · Loop Forward',
    'manual-audio-clips-tempo-and-warping-024':'Transient Loop Mode · Loop Back-and-Forth',
    'manual-launching-clips-009':'Follow Action · No Action',
    'manual-launching-clips-010':'Follow Action · Stop',
    'manual-launching-clips-011':'Follow Action · Again',
    'manual-launching-clips-012':'Follow Action · Previous',
    'manual-launching-clips-013':'Follow Action · Next',
    'manual-launching-clips-014':'Follow Action · First',
    'manual-launching-clips-015':'Follow Action · Last',
    'manual-launching-clips-016':'Follow Action · Any',
    'manual-launching-clips-017':'Follow Action · Other',
    'manual-launching-clips-018':'Follow Action · Jump',
    'manual-working-with-instruments-and-effects-032':'Plug-in unfold button (shows or hides parameters)',
    'manual-instrument-drum-and-effect-racks-016':'Show more Macro Controls',
    'manual-instrument-drum-and-effect-racks-017':'Show fewer Macro Controls',
    'manual-instrument-drum-and-effect-racks-023':'Rack mixer fold button (track title bar)',
    'manual-automation-and-editing-envelopes-007':'Automation Mode toggle',
    'manual-automation-and-editing-envelopes-009':'Move envelope to its own lane',
    'manual-automation-and-editing-envelopes-011':'Hide automation lane',
    'manual-automation-and-editing-envelopes-013':'Show / hide automation lanes',
    'manual-clip-envelopes-001':'Envelopes tab icon',
    'manual-working-with-video-004':'Track unfold button',
    'manual-live-audio-effect-reference-040':'Compressor unfold button (Sidechain)',
    'manual-live-audio-effect-reference-048':'Corpus unfold button (Sidechain; lit when active)',
    'manual-live-audio-effect-reference-060':'EQ Eight expanded-view button',
    'manual-live-audio-effect-reference-067':'Gate unfold button (Sidechain)',
    'manual-live-audio-effect-reference-071':'Glue Compressor unfold button (Sidechain)',
    'manual-live-audio-effect-reference-084':'Multiband Dynamics unfold button (Sidechain)',
    'manual-live-audio-effect-reference-088':'Phaser-Flanger unfold button (more LFO options)',
    'manual-live-audio-effect-reference-130':'Spectrum expanded-view button',
    'manual-live-instrument-reference-084':'Sustain Loop · off',
    'manual-live-instrument-reference-085':'Sustain Loop · forward',
    'manual-live-instrument-reference-086':'Sustain Loop · back-and-forth',
    'manual-live-instrument-reference-087':'Release Mode · off (release stays in the Sustain Loop)',
    'manual-live-instrument-reference-088':'Release Mode · on, no Release Loop',
    'manual-live-instrument-reference-089':'Release Loop · forward',
    'manual-live-instrument-reference-090':'Release Loop · back-and-forth',
    'manual-live-instrument-reference-096':'Simpler expanded-view button',
    'manual-live-instrument-reference-127':'Wavetable expanded-view button'
  };
  // The same icon repeated in the next sentence (enable / disable, modifier-click) is shown once.
  const repeats={
    'manual-arrangement-view-025':'manual-arrangement-view-024',
    'manual-automation-and-editing-envelopes-008':'manual-automation-and-editing-envelopes-007',
    'manual-automation-and-editing-envelopes-010':'manual-automation-and-editing-envelopes-009',
    'manual-automation-and-editing-envelopes-012':'manual-automation-and-editing-envelopes-011'
  };
  // A few figures belong beside a different action from their section's home: the one that explains them.
  const figureHomes={
    'manual-live-instrument-reference-100':'da-simpler--loop',
    'manual-max-for-live-devices-023':'da-max-for-live-devices--midi-monitor--flow',
    'manual-max-for-live-devices-024':'da-max-for-live-devices--midi-monitor--flow'
  };
  function install({captures,entryCaptures,entries,manual,workspace,clips,devices,shortcuts}){
    for(const key of Object.keys(captures))delete captures[key];
    for(const key of Object.keys(entryCaptures))entryCaptures[key]=[];
    for(const loc of new Set(workspace.locations.values())){
      loc.item.data.images=[];delete loc.item.data.variants;delete loc.item.data.mediaNote;
    }
    for(const area of clips.areas)for(const item of area.items){
      item.images=[];delete item.imageLabels;item.video=false;
      for(const part of item.parts){part.images=[];part.guide={...part.guide,images:[]};}
    }
    for(const area of devices.areas)for(const item of area.items){item.images=[];item.manualSections=[];delete item.leadImage;}
    for(const guide of Object.values(manualGuides.items))guide.images=[];
    // Assign every occurrence, including repeated figures and small inline icons.
    for(const figure of manualImagesData.figures){
      const node=manual.nodes.get(figure.key);
      if(!node){unplaced.push({...figure,reason:'No source section'});continue;}
      const title=figure.inline?(iconLabels[figure.id]||iconLabels[repeats[figure.id]]||figure.title):figure.title;
      const capture={...figure,title,alt:title,credit:'Ableton Live 12 Manual · © Ableton AG',previewHeight:figure.inline?100:360};
      if(figure.chapter==='credits'){
        captures[figure.id]=capture;node.guide.images.push(figure.id);
        placements.push({id:figure.id,key:figure.key,card:node.id,view:'history',available:!figure.error});continue;
      }
      if(figure.chapter==='live-keyboard-shortcuts'){
        captures[figure.id]=capture;shortcuts.locations.get('keys-typing').manualImage=figure.id;
        placements.push({id:figure.id,key:figure.key,card:'keys-typing',view:'workspace',available:!figure.error});continue;
      }
      const owner=workspace.owned(node.id)?workspace:clips.owned(node.id)?clips:devices.owned(node.id)?devices:null;
      if(!owner){unplaced.push({...figure,reason:'No atlas action'});continue;}
      const loc=(figureHomes[figure.id]&&owner.locations.get(figureHomes[figure.id]))||owner.sourceHomes.get(figure.key)||owner.locations.get(node.id);
      captures[figure.id]=capture;
      if(repeats[figure.id]){
        const first=placements.find(p=>p.id===repeats[figure.id]);
        placements.push({...first,id:figure.id,sameAs:first.id});continue;
      }
      if(owner===workspace){
        loc.item.data.images.push(figure.id);
      }else if(owner===clips){
        let part=loc.item.parts.find(p=>p.key===figure.key);
        if(!part){
          // Authored lead material may cover the heading without having a keyed part.
          const covered=(loc.item.covered||[]).includes(figure.key)||(loc.item.aliases||[]).includes(figure.key);
          if(covered)part=loc.item.parts[0];
          else {part={key:figure.key,label:node.title,guide:node.guide||{body:'',steps:[],terms:[],note:'',images:[]},url:node.url,images:[]};loc.item.parts.push(part);}
        }
        (part.images||=[]).push(figure.id);
      }else{
        if(!figure.inline&&!figure.error&&!loc.item.leadImage)loc.item.leadImage=figure.id;
        let section=loc.item.manualSections.find(s=>s.key===figure.key);
        if(!section){section={key:figure.key,label:node.title,url:node.url,images:[]};loc.item.manualSections.push(section);}
        section.images.push(figure.id);
      }
      placements.push({id:figure.id,key:figure.key,card:(loc.action||loc.item).id,view:entries.get((loc.action||loc.item).id).view,inline:figure.inline,available:!figure.error});
    }
    // Shortcut illustrations reuse the destination action's manual figure.
    // Missing illustrations stay absent, never fall back to custom screenshots.
    for(const node of shortcuts.locations.values())if(node.image){
      const loc=workspace.locations.get(node.entry)||clips.locations.get(node.entry)||devices.locations.get(node.entry);
      const figures=[...(loc?.item.data?.images||[]),...(loc?.item.parts?.flatMap(p=>p.images||[])||[]),...(loc?.item.manualSections?.flatMap(s=>s.images)||[])];
      const image=figures.find(id=>!captures[id]?.inline);
      node.image=node.manualImage||image||null;
    }
    return {placements,unplaced};
  }
  return {install,placements,unplaced};
})();
