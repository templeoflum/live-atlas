// Original explanatory drawings, not reconstructions of historical Live UIs.
// Each drawing has a specific card home and a source for the relationship shown.
// import-history-images.cjs writes these vectors to local SVG assets.
const historyDiagramData=(()=>{
  const ink='#ece3d2',dim='#b9ac98',line='#66584d',rose='#d98189',gold='#c8a44d',green='#83c4ae',blue='#8fa9ca';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text=(x,y,s,color=ink,size=20,anchor='start')=>`<text x="${x}" y="${y}" fill="${color}" font-size="${size}" text-anchor="${anchor}">${esc(s)}</text>`;
  const path=(d,color=line,width=2,extra='')=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  const rect=(x,y,w,h,color='#29221e',stroke=line,rx=6)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${color}" stroke="${stroke}"/>`;
  const circle=(x,y,r,color,stroke='none')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" stroke="${stroke}"/>`;
  const arrow=(x,y,x2,y2,color=dim)=>{
    const a=Math.atan2(y2-y,x2-x),points=[[x2,y2],[x2-9*Math.cos(a-.48),y2-9*Math.sin(a-.48)],[x2-9*Math.cos(a+.48),y2-9*Math.sin(a+.48)]];
    return path(`M${x} ${y}L${x2} ${y2}`,color)+`<polygon points="${points.map(p=>p.join(',')).join(' ')}" fill="${color}"/>`;
  };
  const box=(x,y,w,h,label,color=ink)=>rect(x,y,w,h)+text(x+w/2,y+h/2+7,label,color,20,'middle');
  const wave=(x,y,w,h,color=blue)=>Array.from({length:48},(_,i)=>{
    const a=(.2+Math.abs(Math.sin(i*.61)*Math.cos(i*.18))*.8)*h/2;
    return path(`M${x+i*w/48} ${y-a}v${2*a}`,color,2);
  }).join('');
  const keyboard=(x,y,w,h)=>Array.from({length:14},(_,i)=>rect(x+i*w/14,y,w/14-1,h,'#d6cbb8','#171110',1)).join('')+
    [0,1,3,4,5,7,8,10,11,12].map(i=>rect(x+(i+.73)*w/14,y,w/14*.5,h*.61,'#171110','#171110',1)).join('');
  const grid=(x,y,cols,rows,size,active=[])=>Array.from({length:cols*rows},(_,i)=>rect(x+(i%cols)*(size+5),y+Math.floor(i/cols)*(size+5),size,size,active.includes(i)?'#6a4247':'#29221e',line,3)).join('');
  const diagrams=[];
  const press=path=>'https://www.ableton.com/en/pages/press/releases/'+path+'/';
  function add(card,title,alt,source,body,{position=0,height=280,caption=title,date='Historical relationship; drawn September 2026'}={}){
    const id='diagram-'+card;
    diagrams.push({id,card,position,title,alt,source,caption,date,width:640,height,
      svg:`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="${height}" viewBox="0 0 640 ${height}" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${esc(title)}</title><desc id="${id}-desc">${esc(alt)}</desc><rect width="640" height="${height}" rx="8" fill="#171110"/><g font-family="system-ui, sans-serif">${body}</g></svg>`});
  }
  add('live-one-five','Connect the studio','Live 1.5 connects to other music applications through ReWire, to hardware through MIDI sync, and to audio files through rendering.',press('2002_04_29'),
    box(20,96,160,76,'Live 1.5',gold)+arrow(180,117,320,55)+arrow(180,134,320,140)+arrow(180,153,320,225)+
    text(211,70,'ReWire',dim,17)+text(207,124,'MIDI sync',dim,17)+text(209,221,'Render',dim,17)+
    box(330,25,285,57,'Reason · Logic · Cubase')+box(330,112,285,57,'External hardware')+box(330,199,285,57,'Audio files'));
  add('live-two','Between stage and studio','Launch clips during a performance, record into a timeline, edit, and take the material back to performance.',press('2002_12_20'),
    text(100,36,'Perform',gold,23,'middle')+grid(33,64,3,3,36,[0,2,4,7])+text(360,36,'Record / edit',green,23)+
    rect(336,61,269,130)+[0,1,2].map((v)=>rect(349+v*24,75+v*36,161-v*21,23,'#344d43',green,2)).join('')+
    arrow(180,90,316,90,gold)+text(242,70,'Record',dim,18,'middle')+
    path('M476 204V244H104V209',green)+arrow(104,244,104,200,green)+text(290,235,'Take it back to the stage',dim,18,'middle'));
  add('live-three','Draw movement into a sample','The same waveform appears in two clips. Different volume-envelope shapes produce a fade and a pulse without replacing the sample.',press('2003_10_02'),
    text(28,33,'Same sample',dim)+text(380,33,'Different envelopes',rose)+
    rect(28,55,580,82)+wave(44,99,544,56)+path('M43 125L199 70L589 70',rose,3)+text(445,150,'Fade in',rose,16)+
    rect(28,154,580,82)+wave(44,198,544,56)+path('M43 169H178V224H311V169H451V224H589',rose,3)+text(441,270,'Pulse',rose,18),{height:292});
  add('live-four','Notes become sound','A MIDI clip sends note events into Simpler or Impulse, which produces audio. MIDI notes are instructions, not recorded sound.',press('2004_07_26'),
    text(25,43,'MIDI clip',gold)+rect(25,66,166,118)+
    [0,1,2,3].map(i=>path(`M25 ${87+i*23}h166`,line,1)).join('')+
    [[38,157,40],[78,133,32],[112,110,49],[147,133,29]].map(([x,y,w])=>rect(x,y,w,9,gold,gold,1)).join('')+
    arrow(201,126,266,126,gold)+rect(277,76,166,118)+text(360,116,'Simpler /',green,21,'middle')+text(360,151,'Impulse',green,21,'middle')+
    arrow(453,126,501,126,green)+wave(517,126,95,78,green)+text(563,43,'Audio',green,20,'middle')+
    text(25,238,'Play notes',dim)+text(295,238,'Load an instrument',dim));
  add('live-five','Freeze the processing','An instrument and effects are rendered into temporary audio. The frozen clip can still be launched in a performance.',press('2005_07_22'),
    text(25,38,'Process while playing',dim)+box(25,60,160,54,'Instrument',gold)+arrow(192,87,227,87)+box(237,60,142,54,'Effects',gold)+arrow(389,87,438,87)+wave(450,87,160,45)+
    arrow(319,130,319,177,blue)+text(342,164,'Freeze',blue)+
    rect(25,193,586,67)+`<polygon points="48,211 48,241 70,226" fill="${green}"/>`+text(91,232,'Launch',green)+wave(232,225,354,38,blue));
  add('live-six','One Macro, several parameters','One Macro control branches to filter, drive and level controls in a Rack. These are illustrative mappings, not a historical factory preset.',press('2006_09_29a'),
    circle(112,139,47,'#29221e',gold)+path('M112 139L134 109',gold,4)+text(112,219,'Macro',gold,23,'middle')+
    path('M160 139H261V54H380M261 139H380M261 139V225H380',gold,2)+
    box(390,26,221,56,'Filter',green)+box(390,111,221,56,'Drive',rose)+box(390,197,221,56,'Level',blue),
    {caption:'Illustrative Macro mappings · not a factory preset.'});
  add('sampler-history','Place samples across the keyboard','Three sample zones cover low, middle and high keys. Two velocity layers cover softer and harder playing. Zone widths are illustrative.',press('2006_09_29b'),
    text(21,32,'Velocity',dim,18)+text(96,88,'Hard',dim,18,'end')+text(96,144,'Soft',dim,18,'end')+
    [[111,162,'Low'],[280,162,'Middle'],[449,162,'High']].map(([x,w,l])=>
      rect(x,50,w,47,'#534536',gold)+text(x+w/2,81,l+' sample',ink,18,'middle')+rect(x,108,w,47,'#344d43',green)+text(x+w/2,139,l+' sample',ink,18,'middle')).join('')+
    keyboard(111,171,500,66)+arrow(111,259,611,259)+text(361,286,'Key range',dim,18,'middle'),
    {height:305,caption:'Illustrative key and velocity zones · not a Sampler screenshot.'});
  add('live-seven','A separate chain for each drum','Different Drum Rack pads connect to their own instrument and effects, rather than one effect chain for the whole kit.',press('2007_11_29'),
    text(24,35,'Pads',dim)+grid(25,57,4,4,35,[7,11,15])+
    arrow(184,114,316,64,rose)+arrow(184,154,316,139,gold)+arrow(184,194,316,214,green)+
    box(326,38,120,52,'Hat',rose)+arrow(450,64,480,64)+box(490,38,120,52,'Effects')+
    box(326,113,120,52,'Snare',gold)+arrow(450,139,480,139)+box(490,113,120,52,'Effects')+
    box(326,188,120,52,'Kick',green)+arrow(450,214,480,214)+box(490,188,120,52,'Effects'),
    {caption:'Illustrative Drum Rack chains · each pad has its own path.'});
  add('instrument-partners','Who contributed what','Applied Acoustics Systems supplied the technology for Electric, Analog and Tension. ChocolateAudio collaborated on Session Drums. Puremagnetik developed Drum Machines.',press('2007_11_29'),
    box(24,28,272,60,'Applied Acoustics Systems',gold)+arrow(306,58,346,58,gold)+text(362,52,'Electric · Analog',ink,20)+text(362,79,'Tension',ink,20)+
    box(24,111,272,60,'ChocolateAudio',green)+arrow(306,141,346,141,green)+text(362,148,'Session Drums',ink,20)+
    box(24,194,272,60,'Puremagnetik',blue)+arrow(306,224,346,224,blue)+text(362,231,'Drum Machines',ink,20));
  add('training-history','A teaching network grows','The training program began in 2008. The 2009 Australian event announcement reports more than eighty certified trainers worldwide and assessments of both Live knowledge and teaching ability.',
    'https://www.ableton.com/en/pages/2009/australian_certification/',
    text(29,42,'2008',gold,28)+text(329,42,'2009',green,28)+arrow(29,72,605,72)+circle(35,72,6,gold)+circle(336,72,6,green)+
    text(29,116,'Program begins',ink,21)+text(329,116,'80+ trainers worldwide',ink,21)+
    [0,1,2,3,4,5,6,7].map((i)=>{const x=338+(i%4)*67,y=155+Math.floor(i/4)*52;return circle(x+14,y,9,green)+path(`M${x} ${y+28}q14 -26 28 0`,green,3);}).join('')+
    text(29,168,'Live knowledge',dim,20)+text(29,199,'+ teaching ability',dim,20),
    {caption:'Milestones from the 2009 announcement · icons represent a network, not a count.'});
  add('live-eight','Move the timing, keep the phrase','A straight pattern is shown above a groove-shifted pattern. Dashed grid lines stay fixed while selected hits move between them.',press('2009_04_02'),
    text(24,34,'Straight',dim)+text(24,167,'With groove',green)+
    Array.from({length:8},(_,i)=>path(`M${45+i*77} 49V248`,line,1,'stroke-dasharray="3 6"')).join('')+
    Array.from({length:8},(_,i)=>rect(35+i*77,70,20,49,'#665635',gold,2)).join('')+
    Array.from({length:8},(_,i)=>{const x=35+i*77+(i%2?22:0);return rect(x,194,20,38+(i%2?13:0),'#344d43',green,2)+(i%2?arrow(45+i*77,178,x+10,178,green):'');}).join(''),
    {caption:'Illustrative groove offsets · not a specific Groove Pool preset.'});
  add('quality-history','Change the development priority','The December 2009 statement pauses new-feature work and redirects the team toward stability and improvements to bug handling. It does not establish that all bugs were fixed.',
    'https://cdm.link/ableton-suspends-development-to-focus-on-bug-fixes-for-live-8/',
    text(29,41,'December 2009',dim,20)+box(25,71,196,67,'New features',dim)+
    rect(259,79,9,51,rose,rose,1)+rect(279,79,9,51,rose,rose,1)+text(273,175,'Paused',rose,20,'middle')+
    path('M125 148V226H354V141',green)+arrow(354,141,391,141,green)+arrow(354,226,391,226,green)+
    box(403,113,212,57,'Stability',green)+box(403,199,212,57,'Bug handling',green),
    {caption:'The announced priority shift · not a measure of the fixes delivered.'});
  add('community-history','Build, share, adapt','A musician makes a Max for Live device, shares it, and several other musicians can use or adapt it. This represents the community described in Ableton’s 2011 showcase.',press('2011_03_31'),
    text(97,35,'Build',gold,23,'middle')+rect(25,58,146,132)+
    box(40,74,61,32,'in',dim)+box(90,139,65,32,'out',dim)+path('M70 107V122H123V137',gold)+
    arrow(182,124,247,124,gold)+box(259,85,147,79,'Share',green)+
    arrow(417,111,480,50,green)+arrow(417,124,480,134,green)+arrow(417,140,480,221,green)+
    box(491,23,122,53,'Use')+box(491,107,122,53,'Adapt')+box(491,194,122,53,'Perform'));
  add('sixty-four','Past the 32-bit memory ceiling','A 32-bit process has a four-gigabyte address-space ceiling. A 64-bit application can address memory beyond that boundary. The drawing does not state a maximum for 64-bit Live or imply improved audio resolution.',
    'https://www.ableton.com/en/release-notes/live-8/',
    text(25,38,'32-bit application',dim,22)+text(25,152,'64-bit application',green,22)+
    [0,1,2,3].map(i=>rect(25+i*69,58,60,53,'#665635',gold,3)).join('')+
    path('M309 49V123',rose,3)+text(331,81,'4 GB ceiling',rose,22)+text(331,108,'Usable memory can be lower',dim,16)+
    [0,1,2,3,4,5,6,7].map(i=>rect(25+i*69,172,60,53,'#344d43',green,3)).join('')+
    arrow(589,198,617,198,green)+text(25,261,'Memory addressing ≠ audio bit depth',ink,21),
    {caption:'Conceptual address space · the 64-bit row continues beyond the drawing.'});
  add('access-history','Move focus, hear the control','Tab moves keyboard focus to the next control, Shift-Tab moves back, and the screen reader announces the focused control. This requires the relevant keyboard-navigation and accessibility settings.',
    'https://help.ableton.com/hc/en-us/articles/11550373507868-Accessibility-in-Live-Overview',
    text(321,36,'Tab →',gold,22,'middle')+box(24,64,169,70,'Control')+
    arrow(205,99,227,99,gold)+rect(237,58,172,82,'#344d43',green)+text(323,105,'Focus',green,24,'middle')+
    arrow(423,99,445,99,gold)+box(457,64,158,70,'Control')+
    text(321,176,'← Shift + Tab',gold,22,'middle')+arrow(324,186,324,206,green)+
    box(183,215,282,49,'Spoken name / value',green),
    {caption:'With keyboard-navigation and screen-reader options enabled.'});

  // Add a functional pointer where a photograph cannot explain the connection.
  add('bridge-history','Two directions through The Bridge','A DJ deck controls a Live production through Ableton Transport Control. A recorded Serato performance can become an editable Live Set with song placement and fader movements.',press('2010_09_22b'),
    text(25,38,'Perform',gold,22)+circle(78,99,39,'#29221e',gold)+circle(78,99,8,gold)+path('M121 64L104 96',ink,3)+
    arrow(144,99,254,99,gold)+box(266,67,350,65,'Control a Live production',gold)+
    text(25,182,'Record',green,22)+box(25,201,233,61,'Serato performance',green)+arrow(270,231,347,231,green)+box(360,201,256,61,'Editable Live Set',green),
    {position:1,caption:'Historical Serato integration · separate from today’s Link.'});
  add('cv-history','Across the cable','Live’s CV Tools send pitch, clock and modulation through a compatible DC-coupled interface to modular hardware. CV Clock In can make Live follow the modular clock.',
    'https://www.ableton.com/en/packs/cv-tools/',
    box(22,82,145,70,'CV Tools',gold)+arrow(176,116,227,116,gold)+box(237,71,171,92,'Interface',green)+arrow(416,116,462,116,green)+
    rect(472,62,145,124)+[0,1,2].map(i=>rect(484+i*40,73,31,102)+circle(500+i*40,104,8,gold)+circle(500+i*40,153,5,green)).join('')+
    text(322,40,'DC-coupled',dim,18,'middle')+text(24,218,'Pitch · clock · modulation →',dim,20)+text(24,252,'← Modular clock can lead Live',green,20),
    {position:1});
  add('silicon-history','Native, without the translation step','An Intel application on an M1 Mac uses a translation layer. Live 11.1 adds a native build for M1. Third-party plug-in compatibility remains a separate question.',
    'https://www.ableton.com/en/blog/free-live-11-1-update-apple-silicon-support-out-now/',
    text(24,37,'Translated application',dim,21)+box(24,59,166,64,'Intel build')+arrow(198,91,225,91)+box(236,59,173,64,'Translation')+arrow(419,91,449,91)+box(460,59,157,64,'M1',gold)+
    text(24,175,'Native application',green,21)+box(24,196,166,64,'Live 11.1',green)+arrow(201,228,449,228,green)+box(460,196,157,64,'M1',gold),
    {position:1,caption:'Application architecture · plug-in support is a separate compatibility check.'});
  add('live-ten-one','Bring a recording into Wavetable','An audio file is imported into Wavetable’s oscillator section. Its waveform becomes source material for synthesis.',
    'https://www.ableton.com/en/blog/live-10-1-is-here/',
    text(25,41,'Your audio file',gold,22)+rect(25,65,182,145)+wave(40,137,153,91,gold)+arrow(220,137,299,137,gold)+
    text(335,41,'Wavetable',green,22)+rect(315,65,301,145)+
    [0,1,2,3].map(i=>path(`M${339+i*15} ${163-i*17}q22 -55 48 0t48 0t48 0t48 0`,green,2)).join(''),
    {position:0,caption:'Illustrative import path · not a reconstruction of the 10.1 interface.'});
  return diagrams;
})();
if(typeof module!=='undefined')module.exports=historyDiagramData;
