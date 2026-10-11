// Only source photographs, documentation screenshots and manual figures.
// Public availability is not a reuse licence: review source-image permissions
// before publishing this teaching prototype. No homemade historical diagrams.
const historyImagesData=(()=>{
  const figures=[];
  const blog=slug=>'https://www.ableton.com/en/blog/'+slug+'/';
  const push=blog('the-evolution-of-push');
  const oral='https://roberthenke.com/interviews/ableton.html';
  const early='https://roberthenke.com/technology/ableton_live.html';
  const operator='https://roberthenke.com/technology/operator.html';
  // These CDN paths end in .png but the actual responses are JPEG. Keep their
  // original bytes; name local files for their verified format and MIME type.
  const jpegResponses=new Set(['push-one','push-two','push-three','extensions']);
  function add(id,url,source,title,caption,alt,credit='Image via Ableton',date=''){
    const extension=jpegResponses.has(id)?'jpg':new URL(url).pathname.split('.').pop();
    figures.push({id:'history-image-'+id,file:'history/'+id+'.'+extension,url,source,title,caption,alt,credit,date,checked:'2026-09-23',rights:'Permission for public redistribution not established'});
  }
  add('monolake','https://beta-ableton.imgix.net/media/ipanuacs/monolake.jpg',push,'Monolake on stage','Gerhard Behles and Robert Henke performing in the late 1990s.','Monolake performing behind a table of synthesizers and studio equipment.','Image via Ableton’s Push retrospective','Late 1990s');
  add('powerbook-g3','https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/PowerBook_G3_%28Bronze_Keyboard%29.jpg/960px-PowerBook_G3_%28Bronze_Keyboard%29.jpg','https://commons.wikimedia.org/wiki/File:PowerBook_G3_(Bronze_Keyboard).jpg','PowerBook G3','PowerBook G3 “Lombard” · photograph, 2023.','An open black PowerBook G3 with a bronze keyboard.','LiamTheGuy · CC0 · Wikimedia Commons','Photographed 9 September 2023');
  Object.assign(figures.at(-1),{file:'history/powerbook-g3-960.jpg',rights:'CC0 1.0 Universal; photo by LiamTheGuy, source crop by RickyCourtney. Commons-provided 960px image, downloaded without further modification.',license:'https://creativecommons.org/publicdomain/zero/1.0/'});
  add('prototype','https://roberthenke.com/files_images/ableton/Live1Alpha.jpg',early,'Before Live 1','Internal prototype, probably summer 2000; not the released Live 1.','An early Live prototype with a clip grid, mixer strips and sample controls.','Robert Henke archive · Ableton interface','c. 2000');
  add('berlin','https://roberthenke.com/files_images/interviews/ableton/RH_GB_4.jpg',oral,'Berlin, 1999','Gerhard Behles and Robert Henke.','Gerhard Behles and Robert Henke together in Berlin.','Robert Henke archive · individual photo credit unspecified','1999');
  add('namm','https://roberthenke.com/files_images/interviews/ableton/namm_1.jpg',oral,'At NAMM','Robert Henke and Bernd Roggendorf; the archive tentatively dates this to 2004.','Robert Henke and Bernd Roggendorf standing together at NAMM.','Robert Henke archive · individual photo credit unspecified','c. 2004, uncertain');
  add('live-one','https://beta-ableton.imgix.net/media/0wkifc3f/l1_session.jpg',push,'Live 1','Session View, 2001.','Live 1 Session View, with audio clips above mixer channels.','Image via Ableton’s Push retrospective','2001');
  add('monodeck','https://www.roberthenke.com/files_images/monodeck/md_001.jpg','https://www.roberthenke.com/technology/monodeck.html','Monodeck II','Henke’s custom controller, with its grid, knobs and colored feedback.','Monodeck II, a custom hardware controller with knobs and illuminated buttons.','Robert Henke archive','2006 hardware');
  add('onyx','https://roberthenke.com/files_images/technology/operator/operator-onyx.jpeg',operator,'Before Operator: Onyx','An internal prototype invitation from September 2004.','The Onyx prototype and an invitation to preview it at Ableton.','Robert Henke archive','September 2004');
  add('operator','https://roberthenke.com/files_images/technology/operator/operator-lcd.jpeg',operator,'Operator’s central display','A later illustration of the compact interface, using Henke’s custom theme.','Operator’s oscillator controls arranged around its central display.','Robert Henke archive · Ableton interface','2024 retrospective');
  add('apc40','https://beta-ableton.imgix.net/media/zming0oa/akai_apc40_test.jpg',push,'Akai APC40','Clip-launch grid, encoders and faders on a dedicated Live controller.','An Akai APC40 controller with illuminated clip buttons and mixer faders.','Image via Ableton’s Push retrospective','2009 model');
  add('push-sketch','https://beta-ableton.imgix.net/media/3tkiirmc/drumstep.png',push,'An early Push sketch','Jesse Terry’s drum-oriented concept.','A rough controller layout combining a step sequencer and drum pads.','Jesse Terry / Ableton','Before Push 1');
  add('push-prototype','https://beta-ableton.imgix.net/media/gl1g3rnc/251368_0776773_0002_m.jpg',push,'The Push prototype','A physical proof of concept, now held by the Powerhouse museum.','An early handmade Push prototype with a grid of buttons and exposed construction.','Image via Ableton’s Push retrospective','Before Push 1');
  add('push-one','https://beta-ableton.imgix.net/media/jayfuimj/02_push_and_computer.png',push,'Live 9 and the first Push','The first Push with Live; commercial release was March 2013.','The first Ableton Push beside a laptop running Live.','Image via Ableton’s Push retrospective','2013 release');
  add('push-two','https://beta-ableton.imgix.net/media/bprjv5im/04_push2_angled_clr_view.png',push,'Push 2','The 2015 instrument, with its color display.','Push 2 seen at an angle, showing its color display, encoders and pad grid.','Image via Ableton’s Push retrospective','2015');
  add('push-three','https://beta-ableton.imgix.net/media/ljlclg2u/p3.png',push,'Push 3','The third-generation instrument, introduced in 2023.','Push 3 with its display, encoders and expressive pad grid.','Image via Ableton’s Push retrospective','2023');
  add('book','https://cdn-resources.ableton.com/resources/filer_thumbnails/95/91/95914e75-d868-4cd7-b81a-c4272119bc8d/makingmusic_hph.jpg__615x375_q85_crop_subsampling-2_upscale.jpg','https://www.ableton.com/en/press/press-archive/ableton-publishes-making-music-book/','Making Music','Dennis DeSantis’s book, published in 2015.','A stack of gray clothbound copies of Making Music.','Image via Ableton','2015');
  add('loop','https://cdn-resources.ableton.com/resources/uploads/zinnia/Ableton_Holly_1.jpg',blog('loop-holly-herndon-on-process'),'Holly Herndon at Loop','A presentation from the first Loop summit in 2015.','Holly Herndon presenting at the Loop summit.','Image via Ableton','2015 event');
  add('link','https://cdn-resources.ableton.com/resources/filer_thumbnails/ae/8e/ae8e61eb-037a-4546-9e46-a71ef43dd75e/link_blog_800px.jpg__800x533_q85_crop_subsampling-2_upscale.jpg',blog('link-now-available-in-live'),'Link arrives in Live','Image from the Live 9.6 announcement.','Computers and mobile music devices illustrating an Ableton Link setup.','Image via Ableton','2016');
  add('learning-music','https://cdn-resources.ableton.com/resources/filer_thumbnails/c9/43/c9435693-b821-4ae3-95a9-60bc14434c68/nl_learning_collage_800x400.jpg__800x400_q85_crop_subsampling-2_upscale.jpg',blog('learn-music-in-your-browser'),'Learning Music','The browser-based learning environment, 2017.','A collage of Learning Music’s colorful interactive grids and controls.','Image via Ableton','2017');
  add('live-ten','https://roberthenke.com/files_images/ableton/l10.jpg',early,'Live 10','Henke’s working interface, early 2019.','A Live 10 Set with tracks, clips and device controls.','Robert Henke archive · Ableton interface','Early 2019');
  add('wavetable','https://cdn-resources.ableton.com/resources/filer_thumbnails/ab/b5/abb534a0-5354-4306-a2b2-ed32bd89b726/piano_wavetable.jpg__800x324_q85_crop_subsampling-2_upscale.jpg',blog('new-wave-depth-look-wavetable'),'Inside Wavetable','A piano-derived wavetable in the original instrument article.','Wavetable’s three-dimensional waveform display and synthesis controls.','Image via Ableton','2017 article');
  add('learning-synths','https://cdn-resources.ableton.com/resources/filer_thumbnails/misc-downloads/bl_learning_synth.jpg__800x401_q85_subsampling-2.jpg',blog('new-in-learning-synths-export-to-live-record-your-creations-and-more'),'Learning Synths','The 2022 update to the learning tool introduced in 2019.','Colorful envelope shapes, a waveform and an export symbol from the Learning Synths update.','Image via Ableton','2022 update');
  add('live-eleven','https://cdn-resources.ableton.com/resources/uploads/zinnia/L11-800x400-Beta.jpg',blog('live-11-coming-february-23-2021'),'Live 11','A studio photograph from the February 2021 release-date announcement.','A recording studio with a microphone, laptop running Live, Push and speakers.','Image via Ableton','2021');
  add('note','https://cdn-resources.ableton.com/resources/uploads/zinnia/800x400_NOTE_News.jpg',blog('introducing-note-an-ios-app-for-sketching-musical-ideas'),'Note','Ableton’s 2022 introduction of the mobile sketchpad.','Ableton Note’s mobile interface in its launch image.','Image via Ableton','2022');
  add('drift','https://cdn-resources.ableton.com/resources/uploads/zinnia/AbletonLive113-Drift-Blog.jpg',blog('live-113-is-out-now'),'Drift in Live 11.3','A studio photograph from the Live 11.3 announcement.','A laptop running Live 11.3, with Drift in its device chain, on a studio desk.','Image via Ableton','2023');
  add('meld','https://cdn-resources.ableton.com/resources/filer_thumbnails/misc-downloads/meld-1_dsc1794_crop_800x400px.jpg__800x400_q85_subsampling-2.jpg',blog('meld-a-look-at-live-12s-new-bi-timbral-synth'),'Meld','From the 2024 interview about the instrument’s design.','Meld’s two-engine synthesizer interface in the design article.','Image via Ableton','2024');
  add('live-twelve','https://cdn-resources.ableton.com/resources/uploads/zinnia/Blog-Live12-2-2.jpg',blog('ableton-live-12-out-now'),'Live 12','A studio photograph from the March 2024 release announcement.','Live 12 on a studio monitor surrounded by speakers, rack equipment and Push.','Image via Ableton','2024');
  add('tuning','https://cdn-resources.ableton.com/resources/uploads/zinnia/Thumbnail_final_800x400px.jpg',blog('explore-and-edit-tunings-in-your-browser'),'Exploring tunings','Illustration from the tuning companion’s 2024 introduction.','A tuning fork, pitch lattice, spiral and cents scale on a dark blue background.','Image via Ableton','2024');
  add('move','https://cdn-resources.ableton.com/resources/uploads/zinnia/Ableton-Move_800x400.jpg',blog('say-hello-to-ableton-move'),'Move','Ableton’s portable instrument, introduced in October 2024.','Ableton Move with its pads, encoders and step buttons.','Image via Ableton','2024');
  add('twelve-one','https://cdn-resources.ableton.com/resources/filer_thumbnails/misc-downloads/l12-1_1600x800.jpg__1600x800_q85_subsampling-2.jpg',blog('live-121-is-out-now'),'Live 12.1','A photograph from the Live 12.1 release announcement.','A laptop showing Live 12.1 on a round table next to a keyboard.','Image via Ableton','2024');
  add('twelve-two','https://cdn-resources.ableton.com/resources/filer_thumbnails/misc-downloads/l12-2_blog-r_1600x800.jpg__1600x800_q85_subsampling-2.jpg',blog('live-12-2-is-out-now'),'Live 12.2','A photograph from the June 2025 release announcement.','Live 12.2 on a laptop with tracks, a context menu and updated devices visible.','Image via Ableton','2025');
  add('twelve-three','https://cdn-resources.ableton.com/resources/filer_thumbnails/press/press-releases/12-3-blog_1600x800_QTmVNhb.jpg__1600x800_q85_subsampling-2.jpg',blog('live-12-3-is-here'),'Live 12.3','A photograph from the November 2025 release announcement.','Live 12.3 on a studio monitor, with Splice in the Browser beside an Arrangement.','Image via Ableton','2025');
  add('twelve-four','https://beta-ableton.imgix.net/media/gejpwzbc/124-homepage-1000x680px.jpg',blog('live-12-4-is-out-now'),'Live 12.4','Live, Move and Note in the May 2026 release photograph; not a 12.4.6 screenshot.','Move, a laptop running Live and a phone running Note resting on a wooden organ.','Image via Ableton','May 2026');
  add('extensions','https://beta-ableton.imgix.net/media/doapp5jz/extensions-sdk_article_1280x1280.png',blog('introducing-extensions-sdk'),'Extensions SDK','Artwork from the public-beta announcement.','Ableton’s Extensions SDK announcement illustration.','Image via Ableton','June 2026 · public beta');
  const conversation='https://cdm.link/conversation-david-zicarelli-gerhard-behles/';
  add('zicarelli-behles','https://cdm.link/app/uploads/2017/06/gerhard_david-1024x683.jpg',conversation,'David Zicarelli and Gerhard Behles','David Zicarelli (left) and Gerhard Behles (right), in the 2017 acquisition interview.','David Zicarelli and Gerhard Behles seated together for an interview.','Photo courtesy Ableton, via Peter Kirn / CDM','June 2017');
  add('max-patch','https://cdm.link/app/uploads/2017/06/mfl-build@2x.jpg',conversation,'Open a Max for Live device','Patching inside a Live device, illustrated in 2017; not the 2009 launch interface.','Max’s object browser and patching canvas over a Max for Live audio-effect template in Live.','Image courtesy Ableton, via CDM','2017 illustration');
  add('bridge','https://cdn-resources.ableton.com/resources/filer_thumbnails/public/2012/10/19/the_bridge_tour_home_en_the-bridge-banner.jpg__556x206_q85_crop_subsampling-2_upscale.jpg','https://www.ableton.com/en/products/bridge/','The Bridge','Artwork from the archived Bridge product page.','The Bridge’s white arch and green bar logo beside its DJing and beatmaking tagline.','Image via Ableton','Archived Bridge product page; image date unspecified');
  add('delay-ten-one','https://cdn-resources.ableton.com/resources/filer_thumbnails/64/50/64501c29-d263-4133-af46-ce1b8e66d35f/delay.jpg__800x240_q85_crop_subsampling-2_upscale.jpg',blog('live-101-user-wavetables-new-devices-and-workflow-upgrades'),'Delay in Live 10.1','The combined Delay device, pictured in the February 2019 beta announcement.','The Delay device with left and right delay-time controls, filter and modulation.','Image via Ableton','February 2019 · beta announcement');
  add('cv-instrument','https://cdn-resources.ableton.com/resources/filer_thumbnails/be/05/be05d100-91a7-4794-bead-81e1783fc3be/cv-instrument.jpg__800x400_q85_crop_subsampling-2_upscale.jpg','https://www.ableton.com/en/packs/cv-tools/','CV Instrument','CV Instrument on the product documentation page; not a dated 2019 capture.','CV Instrument controls for sending pitch and modulation to external hardware.','Image via Ableton','Current product documentation · checked September 2026');
  add('silicon','https://cdn-resources.ableton.com/resources/uploads/zinnia/1_L11-1_Release_Blog-800x400.jpg',blog('free-live-11-1-update-apple-silicon-support-out-now'),'Live 11.1','From the February 2022 native Apple-silicon support announcement.','An overhead photograph of a laptop running Live, a microphone, phone, controller and audio mixer.','Image via Ableton','February 2022');
  add('rewire-logic','https://cdn-resources.ableton.com/80bA26cPQ1hEJDFjpUKntxfqdmG3ZykO/static/images/archives/rewire_logic_pro_shot3.png','https://www.ableton.com/en/pages/rewire/logic_pro/','ReWire with Logic','From Ableton’s archived Logic/ReWire guide; not a Live 1.5 release capture.','Live’s ReWire Out routing selector, with stereo buses listed in the open menu.','Ableton · archived ReWire guide','Archived guide · image date unspecified');
  add('certified-training','https://ableton-production.imgix.net/certified-trainers/header.jpg','https://www.ableton.com/en/certified-training/','Certified Training','From Ableton’s Certified Training page; a later photograph, not the 2008 launch.','Three people gathered around a Push controller and a laptop running Live.','Image via Ableton · Certified Training','Current program page · checked September 2026');
  add('granulator-two','https://roberthenke.com/files_images/technology/granulator/granulatorII.jpeg','https://roberthenke.com/technology/granulator.html','Henke’s Granulator II','Granulator II (2013), a later example of Henke’s artist-built Max for Live instruments.','Granulator II with its sample waveform and grain, filter and modulation controls.','Robert Henke archive · Max for Live interface','2013 instrument');
  // Measured from the archived source files (the Commons size is noted above).
  const dimensions={
  "history-image-powerbook-g3": {"width":960,"height":1044,"bytes":243589},
  "history-image-monolake": {
    "width": 1147,
    "height": 768,
    "bytes": 91140
  },
  "history-image-prototype": {
    "width": 2076,
    "height": 1486,
    "bytes": 407024
  },
  "history-image-berlin": {
    "width": 800,
    "height": 539,
    "bytes": 74405
  },
  "history-image-namm": {
    "width": 800,
    "height": 536,
    "bytes": 129163
  },
  "history-image-live-one": {
    "width": 823,
    "height": 424,
    "bytes": 81726
  },
  "history-image-monodeck": {
    "width": 800,
    "height": 400,
    "bytes": 294369
  },
  "history-image-onyx": {
    "width": 2318,
    "height": 1196,
    "bytes": 355089
  },
  "history-image-operator": {
    "width": 1280,
    "height": 375,
    "bytes": 143902
  },
  "history-image-apc40": {
    "width": 1200,
    "height": 675,
    "bytes": 87684
  },
  "history-image-push-sketch": {
    "width": 1427,
    "height": 825,
    "bytes": 737945
  },
  "history-image-push-prototype": {
    "width": 3000,
    "height": 2001,
    "bytes": 200400
  },
  "history-image-push-one": {
    "width": 1440,
    "height": 1307,
    "bytes": 259791
  },
  "history-image-push-two": {
    "width": 2000,
    "height": 1335,
    "bytes": 167098
  },
  "history-image-push-three": {
    "width": 3000,
    "height": 1684,
    "bytes": 185122
  },
  "history-image-book": {
    "width": 615,
    "height": 375,
    "bytes": 43164
  },
  "history-image-loop": {
    "width": 3840,
    "height": 2816,
    "bytes": 4901771
  },
  "history-image-link": {
    "width": 800,
    "height": 533,
    "bytes": 60011
  },
  "history-image-learning-music": {
    "width": 800,
    "height": 400,
    "bytes": 29431
  },
  "history-image-live-ten": {
    "width": 1920,
    "height": 1150,
    "bytes": 585939
  },
  "history-image-wavetable": {
    "width": 800,
    "height": 324,
    "bytes": 49470
  },
  "history-image-learning-synths": {
    "width": 800,
    "height": 401,
    "bytes": 20452
  },
  "history-image-live-eleven": {
    "width": 800,
    "height": 400,
    "bytes": 334807
  },
  "history-image-note": {
    "width": 800,
    "height": 400,
    "bytes": 160589
  },
  "history-image-drift": {
    "width": 800,
    "height": 400,
    "bytes": 281240
  },
  "history-image-meld": {
    "width": 800,
    "height": 400,
    "bytes": 52393
  },
  "history-image-live-twelve": {
    "width": 800,
    "height": 400,
    "bytes": 298182
  },
  "history-image-tuning": {
    "width": 800,
    "height": 400,
    "bytes": 114634
  },
  "history-image-move": {
    "width": 800,
    "height": 400,
    "bytes": 240904
  },
  "history-image-twelve-one": {
    "width": 1600,
    "height": 800,
    "bytes": 187059
  },
  "history-image-twelve-two": {
    "width": 1600,
    "height": 800,
    "bytes": 190195
  },
  "history-image-twelve-three": {
    "width": 1600,
    "height": 800,
    "bytes": 154197
  },
  "history-image-twelve-four": {
    "width": 1000,
    "height": 680,
    "bytes": 60781
  },
  "history-image-extensions": {
    "width": 1280,
    "height": 1280,
    "bytes": 56014
  },
  "history-image-zicarelli-behles": {"width":1024,"height":683,"bytes":88715},
  "history-image-max-patch": {"width":1500,"height":1000,"bytes":110572},
  "history-image-bridge": {"width":556,"height":206,"bytes":23771},
  "history-image-delay-ten-one": {"width":800,"height":240,"bytes":40865},
  "history-image-cv-instrument": {"width":800,"height":400,"bytes":31515},
  "history-image-silicon": {"width":800,"height":400,"bytes":1109544},
  "history-image-rewire-logic": {"width":351,"height":300,"bytes":8944},
  "history-image-certified-training": {"width":800,"height":800,"bytes":452066},
  "history-image-granulator-two": {"width":1280,"height":356,"bytes":88566}
};
  for(const figure of figures)Object.assign(figure,dimensions[figure.id]);
  const cards={
    monolake:['monolake'],'laptop-audio':['powerbook-g3'],company:['prototype','berlin'],
    'live-one':['live-one'],'monodeck-history':['monodeck'],
    'operator-design':['onyx'],'controller-partners':['apc40'],
    'live-nine':['push-one'],'push-design':['push-prototype','push-sketch'],
    'making-music':['book'],'loop-history':['loop'],'push-two-history':['push-two'],
    'link-history':['link'],'learning-history':['learning-music'],'live-ten':['live-ten'],
    'wavetable-history':['wavetable'],'synth-learning-history':['learning-synths'],
    'live-eleven':['live-eleven'],'note-history':['note'],'drift-history':['drift'],
    'push-three-history':['push-three'],'meld-history':['meld'],'live-twelve':['live-twelve'],
    'tuning-history':['tuning'],'move-history':['move'],'live-twelve-one':['twelve-one'],
    'live-twelve-two':['twelve-two'],'live-twelve-three':['twelve-three'],
    'link-audio-history':['twelve-four'],'extensions-history':['extensions'],
    'current-history':['twelve-four'],behles:['berlin'],henke:['monodeck'],
    roggendorf:['namm'],slama:['onyx'],terry:['push-prototype'],
    desantis:['book'],'kleine-tubb':['meld'],
    'bridge-history':['bridge'],
    'cycling-history':['zicarelli-behles'],zicarelli:['zicarelli-behles'],
    'live-ten-one':['delay-ten-one'],'silicon-history':['silicon']
  };
  // One modest artifact on each period card, rather than larger image selectors.
  const periods={before:'monolake',early:'live-one',instruments:'onyx',open:'apc40',hands:'push-prototype',studio:'live-ten',portable:'push-three',twelve:'move',now:'twelve-four',people:'berlin'};
  // Editions verified against each PDF's title/credits page. Extract embedded
  // source images, not modern recreations. PDF page numbers are one-based.
  const editions={
    3:{version:'3.0',date:'2003',url:'https://manuals.plus/m/e172f9cdde7e35e116dc58434b314bb4722f014d5bbc0d30352c79ae65578545.pdf',sha:'e172f9cdde7e35e116dc58434b314bb4722f014d5bbc0d30352c79ae65578545'},
    4:{version:'4.1',date:'Live 4.1 edition',url:'https://downloads.ableton.com/manuals/40/ableton_live_4_manual_en.pdf',sha:'bf7b1d3991cd45a517bf24b1ef84e9421f1ccdd51f3f1e924545636e1a042b26'},
    5:{version:'5.2',date:'2006',url:'https://downloads.ableton.com/manuals/50/ableton_live_5_manual_en.pdf',sha:'abec58fc81eae4ef1ad8afde7b4a69c012d6429d8df32ce7a921c6d76323049d'},
    6:{version:'6.0',date:'2006',url:'https://downloads.ableton.com/manuals/60/ableton_live_6_manual_en.pdf',sha:'b5a9086b8b8f90f62acb0a629c9e723b0d12a6b4cbe32f191a1a925b049a212c'},
    7:{version:'7.0.9',date:'July 2008',url:'https://downloads.ableton.com/manuals/70/ableton_live_7_manual_en.pdf',sha:'525fc265b3d1135cf58409853e39abeabc40b9c07829474fd89a6390c8f32fed'},
    8:{version:'8.0.2',date:'May 2009',url:'https://downloads.ableton.com/manuals/80/ableton_live_8_manual_en.pdf',sha:'cac1b8e42d90d021620a81b7b71a8a2f9a82c89bc6064c0f62b947aa272f248f'}
  };
  function archive(card,id,major,pdfPage,title,alt,width,height,bytes,extension='png'){
    const edition=editions[major];
    const printedPage=pdfPage-2;
    figures.push({id:'history-image-'+id,file:'history/'+id+'.'+extension,kind:'archive-manual',
      url:edition.url,source:edition.url+'#page='+pdfPage,sourceMajor:major,sourceVersion:edition.version,
      pdfPage,pdfImage:0,pdfSha256:edition.sha,width,height,bytes,title,alt,
      caption:title+' · Live '+edition.version+' manual, p. '+printedPage+'.',
      credit:'Ableton'+(major===3?' · archived at Manuals.plus':'')+' · © Ableton AG',
      date:edition.date,checked:'2026-09-23',rights:'Permission for public redistribution not established'});
    cards[card]=[id];
  }
  archive('live-three','live-3-envelope',3,90,'Pitch envelopes','The Live 3 clip editor with stepped and sloped pitch envelopes over the audio waveform.',700,188,40648,'jpg');
  archive('live-four','live-4-midi',4,125,'The MIDI editor','Live 4.1’s piano-roll editor with MIDI notes and the velocity lane below.',692,285,54579,'jpg');
  archive('live-five','live-5-warp',5,120,'Auto-Warp','The Live 5.2 sample editor with Warp markers over a long audio recording.',588,212,12811);
  archive('live-six','live-6-rack',6,207,'An Audio Effect Rack','Live 6’s Audio Effect Rack with Macro controls, parallel chains and its effects.',752,194,73769);
  archive('sampler-history','live-6-sampler',6,314,'Sampler’s key zones','Sampler’s original key-zone editor showing samples distributed across a keyboard.',731,178,55650);
  // /Im284's /Im0 uses [831 0 0 -194 43.5 196.75]: preserve its display orientation.
  archive('live-seven','live-7-drum-rack-oriented',7,229,'Drum Rack’s chain list','Live 7’s Drum Rack with pads, chain routing, mixer controls and return chains.',831,194,100209);
  Object.assign(figures[figures.length-1],{pdfDisplayTransform:'flip-vertical',checked:'2026-09-28'});
  archive('instrument-partners','live-7-tension',7,379,'Tension','The Tension instrument in Live 7, with its string-modeling controls.',659,192,41447);
  archive('live-eight','live-8-looper',8,311,'Looper','Live 8’s Looper device with its loop display, transport controls and feedback knob.',388,192,24894);
  // Explicit research gaps, not slots to pad with later interfaces or unrelated
  // photos. These cards stay readable without a decorative fallback.
  const gaps={
    'live-one-five':'Need a verified Live 1.5 / 2002 connection artifact.',
    'live-two':'Need a verified Live 2 crossfader or recording screenshot.',
    'training-history':'Need a photograph from the 2008–09 program; the current Push photo is not period-correct.',
    'max-history':'Need a 2009 Max for Live release artifact; the 2017 patch is not a substitute.',
    'quality-history':'Need an artifact of the 2009 quality statement; the c. 2004 NAMM photo is unrelated.',
    'community-history':'Need the original 2011 community/Granulator artifact, not Granulator II (2013).',
    'sixty-four':'Need a Live 8.4 beta / 2012 artifact; a RAM toggle does not illustrate the application transition.',
    'cv-history':'Need a verified 2019 CV Tools image, not undated current documentation.',
    'access-history':'Need an authentic visual of screen-reader support, not an unrelated envelope editing image.'
  };
  // A later interface is not a historical illustration, even with a disclaimer.
  // Unplaced source files remain on disk but are not registered or served.
  const placed=new Set([...Object.values(cards).flat(),...Object.values(periods)]);
  return {figures:figures.filter(f=>placed.has(f.id.replace('history-image-',''))),cards,periods,gaps};
})();
if(typeof module!=='undefined')module.exports=historyImagesData;
