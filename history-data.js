// Original historical summaries; primary documents and retrospective accounts
// are distinguished in the source registry. Research cutoff is not a live feed.
const historyData=(()=>{
  const checked='2026-09-23';
  const sources={};
  function s(id,title,url,date,kind='Announcement',note=''){
    sources[id]={id,title,url,date,kind,note,checked};
  }
  const press=(id,title,date,path)=>s(id,title,'https://www.ableton.com/en/pages/press/releases/'+path+'/',date);
  const blog=(id,title,date,path,kind='Announcement')=>s(id,title,'https://www.ableton.com/en/blog/'+path+'/',date,kind);
  s('oral','Behles & Henke · One adds and the other subtracts','https://roberthenke.com/interviews/ableton.html','2016-11','Retrospective interview','Maya-Roisin Slater’s Loop interview, hosted by Henke with later annotations.');
  s('early','Robert Henke · Ableton Live','https://roberthenke.com/technology/ableton_live.html',null,'Creator’s archive','The internal prototype screenshot is dated approximately, not to a verified release day.');
  s('monodeck','Robert Henke · Monodeck II','https://www.roberthenke.com/technology/monodeck.html',null,'Creator’s archive');
  press('onefive','Live 1.5 release','2002-04-29','2002_04_29');
  press('two','Live 2 release','2002-12-20','2002_12_20');
  press('three','Live 3 release announcement','2003-10-02','2003_10_02');
  press('four','Live 4 at Summer NAMM','2004-07-26','2004_07_26');
  s('operator-story','Robert Henke · Twenty Years of Operator','https://roberthenke.com/technology/operator.html','2024','Creator’s retrospective');
  press('operator-release','Operator release','2005-01-20','2005_01_20');
  press('five','Live 5 release','2005-07-22','2005_07_22');
  press('six','Live 6 release','2006-09-28','2006_09_29a');
  sources.six.note='Body dated September 28; archive index and URL say September 29. The atlas uses the month.';
  press('sampler','Sampler release','2006-09-28','2006_09_29b');
  sources.sampler.note='Body dated September 28; archive index and URL say September 29.';
  press('seven','Live 7, new instruments and Suite','2007-11-29','2007_11_29');
  s('training','First Australian certification event','https://www.ableton.com/en/pages/2009/australian_certification/','2009','Announcement','This announcement dates the worldwide training program’s start to 2008.');
  press('eight','Live 8 and Suite 8 release','2009-04-02','2009_04_02');
  press('initiatives','Live 8 and three new initiatives','2009-01-15','2009_01_15');
  press('max','Max for Live release','2009-11-23','2009_11_23');
  s('quality','Behles & Roggendorf · statement on Live 8 quality','https://cdm.link/ableton-suspends-development-to-focus-on-bug-fixes-for-live-8/','2009-12-28','Reprinted primary statement','Signed management statement reproduced by Peter Kirn. The original Ableton forum URL could not be retrieved during this pass.');
  press('bridge','Ableton and Serato release The Bridge','2010-09-22','2010_09_22b');
  press('community','Max for Live community showcase','2011-03-31','2011_03_31');
  s('eight-notes','Live 8 · release notes','https://www.ableton.com/en/release-notes/live-8/',null,'Release notes');
  s('eight-beta','Live 8.4 · beta program information','https://forum.ableton.com/viewtopic.php?t=182049','2012-07-03','Staff beta notice');
  s('nine','Live 9 and Push release','https://www.ableton.com/ja/press/press-archive/press-archive-release-9-push/','2013-03-05','Announcement','English release text preserved under the Japanese archive route.');
  s('nine-notes','Live 9 · release notes','https://www.ableton.com/en/release-notes/live-9/',null,'Release notes');
  blog('push-date','Live 9 and Push · release date announcement','2013-02-14','ableton-live-9-push-coming-march-5');
  blog('push-story','Jesse Terry · The evolution of Push','2026-05-26','the-evolution-of-push','Creator’s retrospective');
  sources['push-story'].note='The retrospective calls the first Push “2012”; the contemporary release announcement dates availability to March 5, 2013.';
  s('book','Making Music · publication announcement','https://www.ableton.com/en/press/press-archive/ableton-publishes-making-music-book/','2015-03-18');
  blog('loop','Holly Herndon · process at Loop 2015','2016-02-25','loop-holly-herndon-on-process','Event recording');
  blog('push-two','Original Push support and the Push trade-in','2015-11-02','new-features-for-1st-generation-push');
  blog('link','Link in Live 9.6','2016-02-03','link-now-available-in-live');
  blog('link-open','Link for desktop apps and open source','2016-09-14','link-now-available-for-desktop-apps');
  s('cycling','David Zicarelli · Cycling ’74 + Ableton','https://cycling74.com/articles/cycling-%E2%80%9974-ableton','2017-06-06','First-person announcement');
  blog('learning','Learning Music in the browser','2017-09-13','learn-music-in-your-browser');
  blog('ten-date','Live 10 · release date announcement','2018-01-17','live-10-coming-february-6');
  s('ten-notes','Live 10 · release notes','https://www.ableton.com/en/release-notes/live-10/',null,'Release notes');
  blog('wavetable','Wavetable · interviews with the design team','2017-11-29','new-wave-depth-look-wavetable','Designer interviews');
  blog('tenone','Live 10.1 release','2019-05-28','live-10-1-is-here');
  s('cv','CV Tools · device documentation','https://www.ableton.com/en/packs/cv-tools/',null,'Product documentation');
  s('press','Ableton · dated press archive','https://www.ableton.com/en/press/',null,'Archive index');
  blog('synth-learning','Learning Synths · 2022 update and 2019 origins','2022-04-26','new-in-learning-synths-export-to-live-record-your-creations-and-more');
  blog('eleven-date','Live 11 · release date announcement','2021-02-11','live-11-coming-february-23-2021');
  s('eleven-notes','Live 11 · release notes','https://www.ableton.com/en/release-notes/live-11/',null,'Release notes');
  blog('silicon','Live 11.1 · native Apple silicon support','2022-02-01','free-live-11-1-update-apple-silicon-support-out-now');
  blog('note','Introducing Note','2022-10-18','introducing-note-an-ios-app-for-sketching-musical-ideas');
  blog('drift','Live 11.3 and Drift','2023-05-22','live-113-is-out-now');
  blog('push-three','Meet the new Push','2023-05-23','meet-the-new-push');
  blog('twelve','Live 12 release','2024-03-05','ableton-live-12-out-now');
  s('twelve-notes','Live 12 · release notes','https://www.ableton.com/en/release-notes/live-12/',null,'Release notes');
  s('access','Accessibility in Live · overview','https://help.ableton.com/hc/en-us/articles/11550373507868-Accessibility-in-Live-Overview',null,'Technical documentation');
  blog('tuning','Live 12 tuning companion','2024-03-07','explore-and-edit-tunings-in-your-browser');
  blog('meld','Meld · Christian Kleine and Rob Tubb','2024-01-30','meld-a-look-at-live-12s-new-bi-timbral-synth','Designer interviews');
  blog('move','Introducing Move','2024-10-08','say-hello-to-ableton-move');
  blog('twelveone','Live 12.1 release','2024-10-08','live-121-is-out-now');
  blog('twelvetwo','Live 12.2 release','2025-06-11','live-12-2-is-out-now');
  blog('twelvethree','Live 12.3 release','2025-11-25','live-12-3-is-here');
  blog('twelvefour','Live 12.4 release','2026-05-05','live-12-4-is-out-now');
  blog('extensions','Extensions SDK public beta','2026-06-02','introducing-extensions-sdk');
  s('extensions-status','Extensions · availability and limitations','https://www.ableton.com/en/live/extensions',null,'Beta documentation');

  const periods=[
    ['before','Before 2001','Music & code'],['early','2001–2004','Audio, then MIDI'],
    ['instruments','2005–2008','An instrument collection'],['open','2009–2012','Opening Live'],
    ['hands','2013–2017','Pads, networks & learning'],['studio','2018–2021','A larger studio'],
    ['portable','2022–2023','Beyond the laptop'],['twelve','2024','Live 12 & Move'],
    ['now','2025–2026','The current chapter'],['people','People','People & collaborators']
  ].map(([id,label,title])=>({id,label,title}));
  const cards=[];
  function c(id,period,when,title,lead,sections,refs,links=[],extra={}){
    cards.push({id,period,when,title,lead,sections:sections.map(([title,text])=>({title,text})),refs,links,...extra});
  }
  c('monolake','before','1990s','Monolake','Gerhard Behles and Robert Henke were making instruments as well as music.',[
    ['Berlin','Their shared ground included TU Berlin’s electronic-music studio and the club culture around Basic Channel, Hard Wax and Chain Reaction. Hardware sequencers and synthesizers made a studio that could be played in real time.'],
    ['The missing piece','In their later account, the awkward part was bringing prerecorded sound into that performance. Live grew from that particular working problem, not from a plan to reproduce a conventional recording studio.']
  ],['oral'],['laptop-audio','company'],{evidence:'Recalled in 2016'});
  c('laptop-audio','before','Late 1990s','Audio enters the laptop','Faster laptops and Max’s MSP audio extension made a different performance setup possible.',[
    ['From patches to a product','Behles and Henke had already made custom Max systems. The PowerBook G3 generation offered enough processing for more of their music to move into software. Bernd Roggendorf argued for a general-purpose application, rather than another patch made for one performance.']
  ],['oral'],['company','max-history'],{evidence:'Recalled in 2016'});
  c('company','before','1999','A company in Berlin','Ableton was established in 1999.',[
    ['Who did what','Henke names Behles, developer Bernd Roggendorf and finance specialist Jan Bohl as founders. Behles invited Henke onto the development team.'],
    ['An early artifact','Henke’s archive preserves a prototype screenshot, probably from summer 2000—not the commercial release.']
  ],['early','two'],['behles','roggendorf','henke','live-one'],{evidence:'1999 company date · c. 2000 prototype'});

  c('live-one','early','October 2001','Live 1 · play recorded sound','Clips could be launched and combined while the music kept running.',[
    ['An audio instrument','Early Live adjusted recorded material to a shared tempo without necessarily changing pitch. A performance could be captured and then edited, including mixer and effect movements. Session’s clip grid and the Arrangement timeline served different ways of working with the same sound.'],
    ['Before MIDI tracks','Live began with audio. MIDI sequencing and sampling instruments arrived with Live 4.']
  ],['onefive','two','four'],['live-one-five','live-four'],{release:1,evidence:'Commercial release · October 2001'});
  c('live-one-five','early','29 April 2002','Live 1.5 · connect the studio','Live could sit alongside other software and external equipment.',[
    ['Connection, not replacement','ReWire host/client operation linked Live with applications such as Reason and Logic. MIDI sync and controller support connected it to hardware. Render-to-disk provided a route back to other audio programs.'],
    ['Cross-platform','The free update supported Mac OS 9, Mac OS X and Windows, and supplied localized interfaces in four languages. Reverb joined the built-in effects.']
  ],['onefive'],['live-two']);
  c('live-two','early','20 December 2002','Live 2 · record and edit','Studio work became an explicit part of Live’s purpose.',[
    ['Stage → studio → stage','Users were taking the performance tools into the studio. Live responded with stronger recording and editing alongside real-time manipulation.'],
    ['More ways to steer playback','The release added a DJ-style crossfader, expanded automation handling, scene navigation mappings, tempo and transport mappings, effect presets, Gate and Redux.']
  ],['two'],['live-three','bridge-history'],{release:2});
  c('live-three','early','10 October 2003','Live 3 · reshape a clip','Clip envelopes put changing parameters inside the musical phrase.',[
    ['Variation without another recording','Volume, pitch, pan and effect movements could transform a sample as it played. The same recording could become several different gestures without first making separate audio files.'],
    ['Release date','The press release was published on October 2 and announced availability from October 10 at the AES convention in New York.']
  ],['three'],['live-four','live-nine'],{release:3});
  c('monodeck-history','early','2003–2006','Monodeck · build the controls','Henke wanted to perform without constantly reaching for the mouse.',[
    ['The first box','In 2003 he built Monodeck from Doepfer controller parts in a wooden enclosure. The layout served his own concerts; it was not a commercial Live controller.'],
    ['A second instrument','Sketches for Monodeck II began in summer 2005; hardware followed a year later. Ralf Suckow worked on electronics and firmware, Jan Buchholz on Live’s API connection, and Thorsten Klose supplied MIDIBOX modules. A Max patch connected its controls and feedback to Live.'],
    ['On stage','An 8 × 8 button matrix, knobs and multicolor LEDs let Henke combine material and alter it without watching the computer. The instrument was retired in 2011.']
  ],['monodeck'],['controller-partners','push-design','henke']);
  c('live-four','early','July 2004','Live 4 · play notes','MIDI tracks, clips and instruments joined Live’s audio workflow.',[
    ['Drag an instrument in','Simpler played samples melodically; Impulse supplied a percussion sampler. VST and Audio Units instruments could be hosted, and MIDI could also be sent to external hardware.'],
    ['One working surface','Notes gained the same launchable, loopable treatment as audio clips. MIDI overdubbing, a note editor, MIDI effects and flexible routing made Live a place to construct parts, not only combine recordings. Follow Actions opened up sequences of clip launches.']
  ],['four'],['operator-design','live-five'],{release:4,evidence:'July 2004 · contemporary NAMM announcement'});

  c('operator-design','instruments','2004 → 20 January 2005','Operator · a synth that fits','Henke prototyped “Onyx” in 2004. The released instrument was named Operator.',[
    ['Why FM','His Yamaha instruments and Max experiments suggested a wide range of tones at manageable CPU cost. He initially resisted adding a filter; the team persuaded him to include one.'],
    ['Why the central display','A small laptop screen could not show every parameter. Torsten Slama helped shape an interface with immediate controls around a context-sensitive display. Matthias Mayrock wrote the C++ implementation.'],
    ['An instrument inside Live','Operator launched with Live 4.1 as a separately licensed instrument. Its synthesis parameters could participate in Live’s envelopes and controller mappings.']
  ],['operator-story','operator-release'],['slama','henke','sampler-history','wavetable-history']);
  c('live-five','instruments','22 July 2005','Live 5 · keep larger sets playable','Freeze and plug-in delay compensation addressed practical limits of a growing studio.',[
    ['Less processing, still launchable','Frozen material retained real-time clip launching. A demanding project could therefore move to a less powerful performance computer.'],
    ['Reuse and rearrange','Live Clips saved musical material together with its settings and devices. The Browser gained search and access to tracks inside other Sets. MP3 support, automatic tempo matching and Complex Warp aided work with complete songs; Beat Repeat, Saturator and Arpeggiator expanded the built-in tools.']
  ],['five'],['live-six'],{release:5});
  c('live-six','instruments','September 2006','Live 6 · combine devices','Instrument and Effect Racks made collections of devices into playable units.',[
    ['Many parameters, a few controls','Macros could control multiple parameters across a Rack. Layers and processing chains could be saved and passed between projects.'],
    ['A bigger working environment','Multicore support spread processing work; project management gathered files; Deep Freeze allowed more edits without re-rendering. QuickTime video brought picture into Arrangement work, and EQ Eight replaced EQ Four.']
  ],['six'],['sampler-history','live-seven'],{release:6,evidence:'September 2006 · archive dates differ by one day'});
  c('sampler-history','instruments','September 2006','Sampler · map an instrument','Sampler expanded beyond Simpler’s single-sample starting point.',[
    ['Across the keyboard','Multiple samples could be distributed by key and velocity, with crossfades and individual loop settings. Existing libraries could be imported from several sampler formats.'],
    ['Beyond library playback','An oscillator could modulate the samples; envelopes and LFOs could change playback and filtering per voice. Sampler launched as an optional Live 6 instrument and could be layered inside Racks.']
  ],['sampler'],['live-seven','operator-design']);
  c('live-seven','instruments','29 November 2007','Live 7 · drums and a Suite','Drum Rack gave each pad its own instrument and effect chain.',[
    ['Open the kit','Slicing turned a loop into pad-addressed pieces and a MIDI pattern. Individual drums could have separate processing, sends and mixer channels.'],
    ['Studio foundations','Sidechaining, external-instrument/effect integration, improved MIDI timing and 64-bit mix summing accompanied the new instruments. Mix summing precision is not the same as the later 64-bit application.']
  ],['seven'],['instrument-partners','live-eight'],{release:7});
  c('instrument-partners','instruments','2007','Instruments made with partners','Suite brought together work by Ableton and specialist developers.',[
    ['Physical models','Applied Acoustics Systems supplied the underlying technology for Electric, Analog and Tension: electric-piano mechanics, analog circuitry and vibrating strings.'],
    ['Recorded instruments','ChocolateAudio collaborated on Session Drums. Puremagnetik developed Drum Machines content. These were distinct contributions, not a collection created by one in-house synthesizer designer.']
  ],['seven'],['live-seven','sampler-history','meld-history']);
  c('training-history','instruments','2008','Certified Training','Teaching became a supported part of Live’s expanding community.',[
    ['A teaching network','Ableton’s 2009 Australian certification announcement dates the program’s start to 2008. It describes assessments of both Live knowledge and teaching ability, with more than eighty certified trainers worldwide by then.'],
    ['People learning from people','This was a network of teachers, not a feature inside the application. Workshops and local instruction supplied a route into a tool whose audience was growing beyond its original developers’ circles.']
  ],['training'],['making-music','learning-history']);

  c('live-eight','open','2 April 2009','Live 8 · groove and looping','Timing, grouping and live overdubbing became more direct.',[
    ['Move the sound','Warp editing moved audio events on the timeline. The Groove Pool could extract feel from audio or MIDI and apply it elsewhere. Looper supplied sound-on-sound recording with foot-controller-friendly operation.'],
    ['Build larger combinations','Group Tracks and Arrangement crossfades helped organize and join material. Vocoder, Multiband Dynamics, Overdrive, Limiter and Frequency Shifter arrived; Collision and Corpus added physical resonators, while Operator gained drawable partials.']
  ],['eight'],['controller-partners','max-history','quality-history'],{release:8});
  c('controller-partners','open','2009','APC40 & Launchpad','Dedicated commercial controllers reduced the setup between a grid of clips and a hand on a button.',[
    ['APC40','Ableton and Akai announced APC40 in January 2009: a Session-oriented controller combining clip buttons, faders and encoders.'],
    ['The next question','Jesse Terry recalls APC40 and Novation’s Launchpad as strong performance controls. What he still wanted was an instrument for creating new parts. That distinction shaped Push’s development.']
  ],['initiatives','push-story'],['push-design','monodeck-history']);
  c('max-history','open','23 November 2009','Max for Live · open the device','Ableton and Cycling ’74 connected Max’s patching environment to Live.',[
    ['Build, then play','Users could create instruments, MIDI tools, effects and controller integrations as Live devices. Editing a patch did not require stopping playback. Max’s graphical environment also offered routes into video through Jitter.'],
    ['An add-on first','Max for Live initially required Live 8 and a separate license; it was not automatically part of Suite 8. Live 9 later included it in Suite. Users who did not build devices could still use those made by others.']
  ],['max','nine'],['community-history','cycling-history','zicarelli']);
  c('quality-history','open','28 December 2009','A pause for reliability','Behles and Roggendorf publicly apologized for unresolved Live 8 problems.',[
    ['The decision','Their signed statement paused new-feature development so the team could address stability and change its bug-handling process. They accepted management responsibility for failures in getting reported problems to engineers.'],
    ['The record','The statement survives in Peter Kirn’s contemporary reproduction. It is evidence of the commitment and the problems acknowledged—not proof that every bug was immediately fixed.']
  ],['quality'],['live-eight','roggendorf'],{evidence:'Management statement · reproduced by CDM'});
  c('bridge-history','open','22 September 2010','The Bridge · connect DJing and Live','A joint Serato–Ableton product connected Scratch Live and Live 8.2.',[
    ['Turntables and clips','Transport control let a DJ manipulate a Live production from a turntable or CDJ. A view inside Scratch Live exposed Live clips, scenes, devices and mixing.'],
    ['Take the performance home','A DJ performance could be recorded as a Live Set, retaining song placement and fader movements for later editing. The release names Nathan Holmberg as Serato’s lead developer for the collaboration. This is a historical integration, not today’s Link workflow.']
  ],['bridge'],['link-history']);
  c('community-history','open','31 March 2011','Users become device makers','Live’s extensions were no longer limited to Ableton’s release schedule.',[
    ['Artist-built tools','Ableton’s showcase featured creators including Robert Henke, Alexkid, Gareth Williams and Richie Hawtin. Their devices addressed particular needs: synthesis, controller sequencing and remembering performance settings.'],
    ['Useful small inventions','The accompanying update supplied tools such as LFOs, envelope followers and multichannel routing. This history includes musicians solving local problems, not only major product launches.']
  ],['community'],['max-history','cycling-history','cv-history']);
  c('sixty-four','open','July 2012 · Live 8.4 beta','More memory','A native 64-bit edition of Live could address more than four gigabytes of RAM.',[
    ['A different limit','Large sample libraries and plug-in-heavy Sets could exceed the memory ceiling of a 32-bit process. This change concerned application memory, not a promise that identical audio would sound better.'],
    ['A transition','The July 3 beta notice still excluded Max for Live, video and The Bridge from the 64-bit build. The later release notes document the finished 8.4 version. Beta availability and stable release were separate milestones.']
  ],['eight-notes','eight-beta'],['live-nine','silicon-history'],{evidence:'Public beta · not the stable release date'});

  c('live-nine','hands','5 March 2013','Live 9 · record movement in clips','Session automation traveled with clips between the grid and the timeline.',[
    ['A richer phrase','Automation could be recorded directly into Session clips. Audio-to-MIDI conversion supplied new routes from recordings to editable notes, while curved automation and a redesigned Browser changed editing and finding sounds.'],
    ['Suite includes Max','Max for Live became part of Suite. Live and the first Push were released together, joining the software’s clip-based workflow to a dedicated playing surface.']
  ],['nine','nine-notes'],['push-design','max-history'],{release:9});
  c('push-design','hands','5 March 2013','Push · make the part','A grid for playing notes, sequencing drums and controlling Live—not only launching clips.',[
    ['The prototype','Jesse Terry’s early mock-up combined cut-up controllers and Lego. His starting point was drum-machine immediacy; Behles asked for melody, harmony and a backpack-sized instrument too.'],
    ['The collaboration','Ableton designed the first Push; Akai Professional engineered it. A repeating pad layout allowed chord shapes to move around the grid. The first generation still needed a connected computer.']
  ],['push-story','push-date'],['terry','push-two-history','push-three-history'],{evidence:'2013 release · earlier design recounted in 2026'});
  c('making-music','hands','18 March 2015','Making Music · beyond the manual','Dennis DeSantis wrote about starting, developing and finishing work.',[
    ['The problem was not another button','Ableton’s first published book collected approaches to creative blocks rather than instructions for operating Live. Its author was the company’s head of documentation, but the book deliberately applied to other tools too.'],
    ['A separate kind of help','The book’s three-part structure followed problems of beginning, progressing and finishing. Selected chapters were also made available on the web.']
  ],['book'],['desantis','loop-history','learning-history']);
  c('loop-history','hands','2015','Loop · meet other makers','The first Loop summit gathered artists, technologists, educators and researchers.',[
    ['Process in public','Holly Herndon’s presentation described how her musical process engaged questions beyond the studio; Jace Clayton joined her for a conversation. Talks and recordings let that discussion continue beyond the event.'],
    ['A wider conversation','Loop belongs to Ableton’s history as a meeting place around musical practice. It was not a software update or a prescribed way to make a Live track.']
  ],['loop'],['making-music','learning-history']);
  c('push-two-history','hands','2 November 2015','Push 2 · see the sample','A new display made waveform work part of the hardware instrument.',[
    ['Rework Simpler','Live 9.5 rebuilt Simpler around warping, slicing and one-shot playback. New modeled filters, made with Cytomic, also reached Sampler, Auto Filter and Operator.'],
    ['Keep the first generation in use','The original Push received browsing and plug-in-loading improvements. A trade-in program refurbished returned units for youth music-education projects, rather than simply treating them as obsolete.']
  ],['nine-notes','push-two'],['push-three-history','link-history']);
  c('link-history','hands','2016','Link · share time','Musicians could join a common beat over a local network.',[
    ['No single Live session required','Link synchronized tempo, beat and phase across compatible applications. It arrived in Live 9.6 on February 3, following the 2015 introduction. It could also be used without Live.'],
    ['An open protocol','In September 2016 Ableton announced desktop integrations and open-source availability. Other developers could add Link themselves. The original system shared timing; audio streaming was a separate addition in 2026.']
  ],['link','link-open'],['link-audio-history','bridge-history']);
  c('cycling-history','hands','6 June 2017','Cycling ’74 joins Ableton','The makers of Max and Live brought their long collaboration under one ownership.',[
    ['Continuity was the stated aim','David Zicarelli announced Ableton’s acquisition of Cycling ’74. He said the organizations would continue operating independently: a distributed Max team alongside Ableton’s largely Berlin-based staff.'],
    ['A longer collaboration','Zicarelli recalled Henke proposing editable Max-built Live devices soon after an early Live demonstration. Max for Live took years to become a released product; the acquisition came eight years after that release.']
  ],['cycling'],['zicarelli','max-history','extensions-history']);
  c('learning-history','hands','2017','Learning Music · start in a browser','Interactive musical sketches offered an entry point without installing Live.',[
    ['Play before configuring','Learning Music supplied browser-based work with beats, melodies, bass lines, chords and song structure. It was free and available in multiple languages.'],
    ['Carry the idea onward','Work made on the site could be exported as a Live Set. The September announcement documents the site and its language availability; it is not used here to claim the exact initial launch day.']
  ],['learning'],['synth-learning-history','making-music']);

  c('live-ten','studio','6 February 2018','Live 10 · capture the playing','Capture MIDI could recover a phrase played before pressing Record.',[
    ['Keep an unplanned take','On a monitored MIDI track, Live remembered incoming notes and could turn the recent phrase into a clip. Capture addressed a particular interruption: stopping to set up a recording after an idea had already happened.'],
    ['More room inside a Set','Nested groups and multi-clip MIDI editing supported larger projects. Wavetable, Echo, Drum Buss and Pedal expanded the native palette, and Max for Live was more tightly integrated.']
  ],['ten-date','ten-notes'],['wavetable-history','live-ten-one','live-eleven'],{release:10});
  c('wavetable-history','studio','2017 design → 2018 release','Wavetable · choose what moves','Ian Hobson, Matt Jackson and Robert Henke described a synth designed for both immediate play and detailed control.',[
    ['Make the movement visible','Waveform-position displays let the player see a changing oscillator. The team balanced a small starting set of controls with a deeper modulation matrix.'],
    ['Start at the destination','Their documented decision was to begin with the parameter the musician wanted to change, then choose a modulation source. The matrix supported that direction of thought, rather than starting from a list of modulators.']
  ],['wavetable'],['operator-design','meld-history','live-ten']);
  c('live-ten-one','studio','28 May 2019','Live 10.1 · bring your own wave','Wavetable gained user-imported waveforms, and Live gained VST3 support.',[
    ['Editing and finishing','Automation shapes, numerical entry and new zooming shortcuts expanded detailed editing. Sidechain tracks could be frozen, and individual exports could include return and main effects.'],
    ['Consolidate the tools','A new Delay combined Simple Delay and Ping Pong Delay with more control. Channel EQ offered a compact alternative for everyday tonal adjustment.']
  ],['tenone'],['cv-history','live-eleven']);
  c('cv-history','studio','16 July 2019','CV Tools · connect modular gear','Max for Live devices connected Live to control-voltage instruments.',[
    ['Across the cable','With a compatible DC-coupled interface, the tools could generate or receive pitch, clock, triggers and other control signals. Live could drive a modular system or follow its clock.'],
    ['Not only MIDI','A recorded automation curve or modulation signal could act on external hardware. This extended Live’s connections beyond note messages and conventional plug-ins.']
  ],['cv','press'],['max-history','link-history']);
  c('synth-learning-history','studio','2019 → 2022','Learning Synths · touch the sound','A browser synth made oscillators, filters, envelopes and LFOs directly explorable.',[
    ['A playable lesson','Introduced in 2019, Learning Synths followed Learning Music with an interactive instrument and lessons. It did not require buying or configuring a DAW first.'],
    ['Take it into Live','The 2022 update added recording, a configurable XY pad and export into a Live Set containing a Max for Live synth. The learning surface could become material for a project.']
  ],['synth-learning'],['learning-history','max-history']);
  c('live-eleven','studio','23 February 2021','Live 11 · takes and touch','Comping and MIDI Polyphonic Expression expanded how performances could be recorded and edited.',[
    ['Choose from takes','Take lanes and linked-track editing supported building a performance from repeated recordings. This was distinct from simply layering every take together.'],
    ['Keep individual gestures','MPE recorded and edited expression per note. Note probability, velocity ranges and expanded Follow Actions added variation; Hybrid Reverb, Spectral Resonator and Spectral Time extended the effects palette.']
  ],['eleven-date','eleven-notes'],['silicon-history','drift-history','push-three-history'],{release:11});

  c('silicon-history','portable','1 February 2022','Live 11.1 · a new processor family','Live added native support for Apple’s M1 computers.',[
    ['Under the interface','A native build let Live run on the new processor architecture without relying on translation for the application itself. This did not make every third-party plug-in native automatically.'],
    ['Alongside the port','The update also revised Shifter, added Align Delay and Shaper MIDI, and improved comping and clip handling. Platform work continued alongside visible musical features.']
  ],['silicon'],['sixty-four','note-history']);
  c('note-history','portable','18 October 2022','Note · sketch away from the studio','Ableton’s iOS app concentrated on the beginning of a musical idea.',[
    ['A smaller surface','Drum kits, melodic instruments and sampling supported quick beats and phrases. Recording surrounding sounds supplied another way to start without a prepared sample library.'],
    ['Continue in Live','Ableton Cloud transferred Note Sets into Live’s Browser. Note was presented as a sketching tool, not the full desktop application shrunk onto a phone.']
  ],['note'],['move-history','link-audio-history']);
  c('drift-history','portable','May 2023','Drift · a synth in every edition','Live 11.3 introduced Drift, including in Live Lite.',[
    ['A compact instrument','Its subtractive layout and MPE support put a playable native synth within reach of users outside Suite. The design drew on both older hardware and newer modular instruments.'],
    ['Expression spreads','Analog, Collision, Electric and Tension also gained MPE support. Improved auto-warping accompanied the release, which supplied software support for the new Push.']
  ],['drift'],['push-three-history','live-twelve']);
  c('push-three-history','portable','23 May 2023','Push 3 · leave the computer behind','The standalone model placed Live inside an instrument with its own processor.',[
    ['Hands and connections','MPE-enabled pads sensed expression within individual notes. A built-in audio interface connected other instruments; replaceable components and an upgrade route distinguished the hardware from earlier Push generations.'],
    ['Two configurations','Standalone operation required the processor-equipped configuration. A controller-only Push still worked with a computer; “Push 3” did not mean every unit was already standalone.']
  ],['push-three'],['push-design','terry','link-audio-history']);

  c('meld-history','twelve','January–March 2024','Meld · design for exploration','Christian Kleine and Rob Tubb’s team began by making oscillator experiments in Max.',[
    ['Start with a complex sound','Rather than require the player to build every timbre from elementary waveforms, Meld offered varied oscillator types with two immediate macro controls per engine.'],
    ['Keep the deeper connections','The two engines could exchange modulation. Tubb described inspiration from modular instruments, including Mutable Instruments; Kleine wanted that flexibility without making the starting point intimidating. The January design interview preceded Live 12’s March release.']
  ],['meld'],['kleine-tubb','wavetable-history','live-twelve']);
  c('live-twelve','twelve','5 March 2024','Live 12 · transform musical material','MIDI tools joined the note editor, alongside changes to browsing, tuning and navigation.',[
    ['Generate and transform','The new tools could produce patterns or reshape existing notes. Meld, Roar and Granulator III broadened the instrument and effect collection.'],
    ['Find and move','Browser tags, filters and sound-similarity search changed finding material. Keyboard navigation and screen-reader support addressed access to the working surface, while tuning systems loosened the assumption of twelve equal pitches.']
  ],['twelve','twelve-notes'],['access-history','tuning-history','live-twelve-one'],{release:12});
  c('access-history','twelve','Live 12 · 2024 onward','Navigate without a mouse','Screen readers became a supported way of working with Live on macOS and Windows.',[
    ['A structural change','Keyboard focus, spoken control information and high-contrast options affected how a musician could reach and understand the interface. They were not merely new color themes.'],
    ['Still developing','Support varies by area and release. Ableton’s current overview still lists automation, modulation and MPE editing as unsupported for screen readers. This is an ongoing accessibility effort, not a claim that every workflow is covered.']
  ],['access'],['live-twelve','current-history']);
  c('tuning-history','twelve','March 2024','Tuning · beyond one keyboard grid','Live 12 incorporated tuning systems and an interactive web companion.',[
    ['More than changing key','The tuning site linked presets to context and playable examples. Scala import and a tuning editor allowed musicians to explore and construct pitch systems.'],
    ['Move between tools','The site could export tuning files and Live Sets. The change concerned the intervals available to instruments, not simply transposing a familiar major or minor scale.']
  ],['tuning'],['live-twelve','meld-history']);
  c('move-history','twelve','8 October 2024','Move · carry a sketchbook','Ableton introduced a smaller standalone music-making instrument.',[
    ['Built to be picked up','An internal battery, processor, microphone and speaker reduced the equipment needed to begin. Sampling and shaping a sound were part of the portable instrument itself.'],
    ['A different size of commitment','Move’s launch emphasized quickly getting an idea down away from a studio setup. It joined Note and Push as another physical context for Ableton’s music-making tools, rather than replacing desktop Live.']
  ],['move'],['note-history','push-three-history','link-audio-history']);
  c('live-twelve-one','twelve','8 October 2024','Live 12.1 · pitch and samples','Auto Shift and Drum Sampler joined the native devices.',[
    ['Voice and drums','Auto Shift supplied real-time pitch correction and MIDI-controlled harmonizing. Drum Sampler combined one-shot playback with built-in transformations. Limiter and Saturator were revised.'],
    ['Finding and making patterns','Automatic sample tagging and MIDI-note selection tools extended the Browser and editor. Packs by Philip Meyer and Ableton designers Marco Tonni and Christian Kleine added more generators and sequencers.']
  ],['twelveone'],['live-twelve-two','kleine-tubb']);

  c('live-twelve-two','now','11 June 2025','Live 12.2 · bounce and reshape','Bounce commands made turning processed material into editable audio more direct.',[
    ['Commit a sound','Clips or time selections could be bounced to a new track, and entire tracks could be bounced in place. These actions shortened a common resampling workflow.'],
    ['Revisit established devices','Auto Filter was rebuilt with new types and visual feedback. Roar, Meld and resonators gained further capabilities, while Browser Quick Tags exposed organization more directly. Related updates brought more of Live’s timing and tuning tools to Push.']
  ],['twelvetwo'],['live-twelve-three']);
  c('live-twelve-three','now','25 November 2025','Live 12.3 · separate and compare','Stem Separation arrived in Suite; Splice appeared inside the Browser.',[
    ['Recordings become parts','Stem Separation could split an audio clip into components such as vocals, drums and bass. Group bouncing and Paste Bounced Audio provided further ways to turn processing into material.'],
    ['Compare and perform','Device A/B supported comparing parameter states. Auto Pan became Auto Pan-Tremolo. Push gained an XYZ control layout and rhythm tools; standalone Push also gained stem separation and class-compliant interface support.']
  ],['twelvethree'],['link-audio-history']);
  c('link-audio-history','now','5 May 2026','Live 12.4 · share sound over Link','Link Audio added networked audio to the earlier shared-clock system.',[
    ['Time becomes sound','Compatible devices could stream audio over a local network. Audio from another player could appear as an input in Live or Push; Move and Note joined as sources.'],
    ['Across the family','Live revised Erosion, Chorus-Ensemble and Delay. Move 2.0 and Note 2.0 added audio clips and warping. A new Learn View replaced Help View with combined video and written lessons.']
  ],['twelvefour'],['link-history','extensions-history','current-history']);
  c('extensions-history','now','2 June 2026','Extensions · edit the Set itself','Ableton announced a JavaScript SDK as a public beta for Live Suite.',[
    ['A different extension point','These tools read and modify Set structure—tracks, clips, notes and parameters—to automate or transform a workflow. Max for Live remains the environment for instruments, effects and real-time patching.'],
    ['Beta, not a settled release promise','At the research cutoff, Ableton’s SDK page still specified Live Suite Beta. That status is kept separate from the stable Live release number. Extensions can run powerful code; their source must be trusted.']
  ],['extensions','extensions-status'],['max-history','cycling-history','current-history'],{evidence:'Public beta · checked 23 September 2026'});
  c('current-history','now','23 September 2026','The documented present','The newest stable Live release listed at this research cutoff is 12.4.6, released September 15.',[
    ['Maintenance matters','12.4.6 fixes a hang affecting some rendering, bouncing and consolidating operations. The preceding 12.4.5 update improved screen-reader focus and changed Cmd/Ctrl-F to select an existing search term instead of clearing it.'],
    ['A dated snapshot','This is a checked historical endpoint, not a live update feed. The linked release notes remain the place to check developments after September 23, 2026.']
  ],['twelve-notes'],['quality-history','access-history'],{evidence:'Stable release · verified 23 September 2026',currentVersion:'12.4.6'});

  c('behles','people','Music · company','Gerhard Behles','Monolake collaborator and Ableton co-founder.',[
    ['A changing role','His 2016 account describes moving from making music with Henke toward running the company. Their shared musical practice remained part of the origin, but their work and priorities did not stay identical.']
  ],['oral'],['monolake','company','push-design']);
  c('henke','people','Music · instruments','Robert Henke','Musician, early Live developer and instrument designer.',[
    ['Alongside the company','Henke’s archive documents both his involvement in Live and his independent tools. Operator, Monodeck and his contributions to Wavetable show different forms that work took.']
  ],['early','operator-story','wavetable'],['monolake','monodeck-history','operator-design','wavetable-history']);
  c('roggendorf','people','Software · company','Bernd Roggendorf','Software developer and Ableton co-founder.',[
    ['Product and responsibility','Henke identifies Roggendorf as Behles’s engineering collaborator in forming Ableton. As CTO, Roggendorf co-signed the 2009 statement accepting responsibility for Live 8’s quality-management problems.']
  ],['early','quality'],['company','quality-history']);
  c('slama','people','Interface · implementation','Slama & Mayrock','Operator’s credits name Torsten Slama for its interface and Matthias Mayrock for its C++ code.',[
    ['More than one designer','Henke describes Operator’s implementation and key decisions as teamwork. Slama also shaped Live’s original visual language.']
  ],['operator-story'],['operator-design']);
  c('terry','people','Hardware · playing','Jesse Terry','A musician and hardware lead whose Push prototypes began with drum-machine workflows.',[
    ['From sketch to instrument','His retrospective traces the route through improvised prototypes, Akai’s engineering and later in-house hardware development. The aim included both immediacy and room to develop playing skill.']
  ],['push-story'],['controller-partners','push-design','push-two-history','push-three-history']);
  c('zicarelli','people','Max · collaboration','David Zicarelli','Cycling ’74’s leader and the author of its 2017 acquisition announcement.',[
    ['Two working cultures','His account emphasizes a long relationship with Ableton and continuity for Max’s team and users, rather than treating Max as merely another bundled Live instrument.']
  ],['cycling'],['max-history','cycling-history']);
  c('desantis','people','Documentation · learning','Dennis DeSantis','Ableton’s head of documentation when Making Music was published in 2015.',[
    ['A second kind of reference','His book addressed creative decisions and unfinished music, separately from the operational knowledge in the Live manual.']
  ],['book'],['making-music','loop-history']);
  c('kleine-tubb','people','Sound · interaction','Kleine & Tubb','Christian Kleine led Meld’s concept and interaction design; Rob Tubb was its lead engineer.',[
    ['Prototype, play, refine','Their team tried oscillator ideas in Max, then paired immediate macro controls with deeper modulation. The interview documents specific choices rather than attributing the whole instrument to one person.']
  ],['meld'],['meld-history','live-twelve-one']);
  return {checked,sources,periods,cards};
})();
