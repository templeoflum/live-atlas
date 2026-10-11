// Original setup and library guides. Facts checked against Live 12 chapters 2 and 4.
(() => {
  const key=(action,mac,win=mac.replace(/⇧/g,'Shift'))=>({action,mac,win});
  const add=(chapter,rows)=>rows.forEach(([anchor,body,title,steps,terms=[],note='',images=[],keys=[]])=>{
    manualGuides.put(chapter,anchor,body,title,steps,terms,note,images);
    manualGuides.items[chapter+'#'+anchor].keys=keys;
  });
  add('first-steps',[
    ['installation-and-authorization','Installation puts Live on the computer; authorization enables the licensed edition and content.','Check the installation',[
      'Check the installed Live version and edition against your Ableton account.',
      'Use Ableton’s installer and authorization flow if installation or activation is still needed.'
    ],[['Edition','Determines which devices and features are available.']], 'Avoid changing an installation immediately before a lesson unless a missing feature requires it.'],
    ['learning-about-live','Info View identifies a control; Learn View provides guided material; the manual supplies detailed reference.','Identify one unfamiliar control',[
      'Show Info View and hover over the control.',
      'Use its displayed name to locate the corresponding atlas or manual reference.'
    ],[['Context help','For the thing currently under the pointer.'],['Guided lesson','An optional walkthrough rather than a prerequisite.']]],
    ['learn-view','Ableton’s built-in lesson area contains walkthroughs and links to official help.','Open a relevant lesson',[
      'Open Learn View from Help and choose the topic you need.',
      'Close it when you need the editing space; reopen it to return to the material.'
    ],[['Learning modules','Groups of lessons, each a video walkthrough with a short text. New modules arrive without a Live update; filter lessons by topic.'],['Where you left off','Close with the X at top left; while Live stays open, it reopens on the last page. Learn View Home Page (top right) or “< Lessons” returns home.'],['Complete Lesson','Button at the bottom of a lesson; completed lessons get a check mark.'],['Picture-in-picture','The button right of the progress bar pops the video out and closes Learn View. It stays on top of every app; ← 15 / 15 → skip; Learn View → brings Live back.'],['Reload','Refreshes the view after a lost connection.']], 'Learn View needs an internet connection. Its videos are also on Ableton’s YouTube playlist. The home page links to this manual and the Knowledge Base.',[],[key('Learn View','⌘ ⌥ 7','Ctrl Alt 7')]],
    ['info-view','A small help area names the control under the pointer. It can also show your own saved notes for clips, tracks and devices.','Keep a note inside the Set',[
      'Open an object’s context menu and choose Edit Info Text.',
      'Write the note in Info View and save the Set.'
    ],[['Built-in help','Appears when hovering over an interface element.'],['Your text','Belongs to the chosen object in this Set.']], 'Check which object is selected before adding lesson notes.'],
    ['other-learning-resources','Ableton’s manual, help articles and interactive learning sites cover different kinds of questions.','Choose the relevant source',[
      'Use the manual for a named Live control or operation.',
      'Use a focused help article for setup problems, or an interactive synthesis resource for a sound-generation concept.'
    ],[['Software reference','How Live behaves. Ableton recommends the manual’s Live Concepts chapter as the overview; the rest is deeper reference.'],['Learning Music / Learning Synths','Ableton’s free interactive websites for music-making basics and synthesis, used directly in a web browser.'],['Ableton YouTube channel','Musicians’ workflows and other Ableton products.'],['Musical concept','Optional background, not a requirement for operating the software.']], 'The atlas’s section links go directly to the official reference.'],
    ['display--input','Interface scale, focus navigation, scroll behavior and pointer options live here.','Make controls readable',[
      'Open Display & Input and adjust interface zoom to fit the screen.',
      'Check Use Tab to Move Focus before relying on Tab for view switching.'
    ],[['Outline View in Focus','Makes the keyboard target easier to identify.'],['Permanent Scrub Areas','Changes where clicking can start playback.']], 'Changing zoom is a display choice; it does not enlarge notes in musical time.'],
    ['theme--colors','Theme, contrast and color settings affect the application’s appearance and new track/clip colors.','Adjust visual contrast',[
      'Choose a theme and contrast level that keeps text and controls clear.',
      'Check the note grid and clip selection colors before settling on it.'
    ],[['Track colors','Can be assigned automatically or start from a default.'],['Clip colors','Can follow their track or use random assignment.']], 'Color changes do not affect the audio.'],
    ['audio','Choose the actual audio hardware, available channels, sample rate and buffer.','Check where sound leaves Live',[
      'Choose the intended output device and enable the output channels you use.',
      'Check the track and Main routing before changing buffer or sample-rate settings.'
    ],[['Buffer','Smaller settings reduce monitoring delay but leave less processing time.'],['Sample rate','The audio engine’s sampling frequency.']], 'Use a comfortable listening level. Do not adjust calibration values as a general cure for silence.',['settings']],
    ['link','Link coordinates timing across compatible applications; Link Audio is a separate network-audio capability.','Identify the connection needed',[
      'Use timing Link settings when devices should share a beat clock.',
      'Use Link Audio only when compatible devices should also exchange sound.'
    ],[['Timing','Tempo and phase coordination.'],['Audio','Sound streamed between supported peers.']], 'Feature availability depends on the installed release and connected products.'],
    ['tempo--midi','Controller playing, remote control and clock synchronization are separate MIDI uses.','Configure the intended role',[
      'Locate the physical MIDI port or control-surface entry.',
      'Enable only the functions needed for playing notes, mapping controls or synchronization.'
    ],[['Track','Note and controller-message routing to tracks.'],['Remote','Mapping to Live controls.'],['Sync','Clock synchronization.']], 'Receiving notes does not prove that Remote or Sync is configured, and neither is needed just to play an instrument.'],
    ['file--folder','Data-handling locations include temporary files, the decoding cache and external editing or Max paths.','Inspect a storage location',[
      'Open File & Folder and check the path associated with the task.',
      'Verify that the drive is connected and has space before recording or processing files.'
    ],[['Temporary files','Used before work has a saved project location.'],['Decoding cache','Working audio decoded from compressed formats.']], 'Moving a cache or folder is not the same as collecting a project’s samples.'],
    ['library','Choose library locations, sample-collection behavior and which optional Places appear.','Check the User Library',[
      'Inspect Location of User Library and confirm the drive is available.',
      'Check Collect Files on Export before saving sample-dependent presets or clips into the Browser.'
    ],[['Library location','Where reusable material is stored.'],['Project location','Where a particular project is stored.']], 'External-drive libraries need that drive connected when their assets are used.'],
    ['plug-ins','Choose supported plug-in locations and scanning options. Native Live devices are not managed here.','Find an installed plug-in',[
      'Check that its supported format and intended folder are enabled.',
      'Rescan if necessary, then search its name in the Browser’s Plug-Ins label.'
    ],[['Native device','Part of Live.'],['Plug-in','Separately installed software with its own compatibility and authorization.']], 'A missing plug-in is not fixed by dragging its installer into a track.'],
    ['record-warp--launch','Defaults for recording, imported audio and clip launch behavior are grouped here.','Inspect before a take',[
      'Check recording format, count-in-related behavior and recording start preferences.',
      'Review import Warp defaults separately when a sample arrives with unexpected timing.'
    ],[['Defaults','Initial behavior for new material.'],['Existing clip','May already have its own different settings.']], 'Change one relevant option at a time so the cause of a behavior remains clear.'],
    ['licenses--updates','Authorization, update preferences and usage-data options are managed together.','Check edition or update status',[
      'Inspect the licensed edition and installed version.',
      'Review any update choice deliberately before applying it to a teaching or performance machine.'
    ],[['Authorization','Access to licensed features.'],['Update','A change to the installed software.']], 'This atlas does not alter licenses, update preferences or data-sharing settings.']
  ]);
  add('working-with-the-browser',[
    ['content-pane','The results list shows the selected location, search or filtered content. Columns can expose file details.','Inspect a result',[
      'Select an item and check its name and type before loading it.',
      'Use Content Options to show useful columns, then click a heading to sort.'
    ],[['Device versus preset','A preset can load a prepared device or Rack.'],['Extension','Can be shown to distinguish file types.']], '',['browser']],
    ['saving-search-results-as-custom-labels','Save a useful search and filter combination as a Browser label.','Keep a reusable lookup',[
      'Create the search or tag-filter combination.',
      'Use Add Label in the Results bar and give it a recognizable name.'
    ],[['Custom label','A saved way to find content, not a duplicated folder of files.']], 'Removing the label is different from deleting its underlying content.'],
    ['browser-history','Return to previous searches and Browser locations without rebuilding them.','Return to the previous results',[
      'Run a search, then navigate to another label.',
      'Use Browser Back to return and Forward to revisit the later state.'
    ],[['Browser history','Search and navigation states, not audio-edit undo.']], '',[],[key('Back','⌘ [','Ctrl ['),key('Forward','⌘ ]','Ctrl ]')]],
    ['filters-and-tags','Tags narrow search results by properties or your own organization. They remain separate from the typed query.','Recover a missing result',[
      'Check the Results bar for active tag filters.',
      'Use Clear to remove the search and filters, then search again.'
    ],[['Search-field ×','Clears text but may leave filters active.'],['Results Clear','Removes both kinds of constraint.']], 'A device can be installed and still hidden by the current filters.'],
    ['filter-groups','Each Browser label can remember a different set of visible filter groups and active tags.','Narrow one label',[
      'Select the label, then choose a relevant tag from a visible group.',
      'Use the Filter View menu to show another group or restore the default group layout.'
    ],[['⌘-click / Ctrl-click','Selects several tags in one group.'],['Remembered state','Each label keeps its own visible groups and active tags when you come back to it.'],['Hide one group','Right-click the group’s name.'],['Reset Filter Groups to Default','Filter View menu option that restores the label’s default groups.'],['Results bar','Counts active filters. Clear removes tags and search text; Add Label saves the results as a custom label.']], 'Hiding a group’s display is not the same operation as clearing its selected filters. ⌘ ⌥ G / Ctrl Alt G shows or hides Filter View.'],
    ['tags','Tags describe content without moving its file. Factory, user and automatic tags have different edit rules.','Add your own label to a sound',[
      'Select the item and assign a user tag.',
      'Search for that tag to confirm the item is discoverable.'
    ],[['Factory tags','Core Library and bundled Packs are fully tagged; third-party webshop Packs carry Sounds-group tags. Factory tags cannot be removed, but you can add more.'],['User tags','Your editable descriptions, made in the Tag Editor or Quick Tags.'],['Auto tags','Live’s periodic sound analysis tags your own samples up to 60 seconds long. Turn them on or off with Enable Auto Tags in the Filter View menu; remove them or turn them into user tags in the Tag Editor.'],['VST3 plug-ins','Tagged from their VST3 sub-category when it maps to a Live category.']], 'An automatically assigned tag is a search aid, not an authoritative description of the sound.'],
    ['tag-editor','Assign existing tags or build a small custom tag group.','Tag a few related items',[
      'Select the items and open Tag Editor from the Filter View menu.',
      'Check or uncheck tags for the selection, then verify the resulting filter.'
    ],[['Several items','Shift-select them in the Browser before ticking tags.'],['Add Tag…','At the end of each group: a new tag in that group.'],['Add Group…','At the bottom of the editor: a custom filter group. It appears in Filter View once one of its tags is assigned.'],['Add Subtag in…','Right-click a tag to nest a subtag; that tag becomes a parent tag. Not possible in the Creator group.'],['Folded groups','A bolder arrow means the group holds an assigned tag.'],['Editing','Rename or delete your own tags and groups from the context menu; default groups cannot be changed.']], 'A multi-item selection applies assignments to multiple files; check the selection before editing. Close with the × or the Filter View menu.'],
    ['quick-tags','View and assign tags for the selected Browser item without opening the full editor.','Add a familiar tag',[
      'Select the item and choose Add in Quick Tags.',
      'Type the tag name and choose the intended suggestion.'
    ],[['Create new tag…','Type an unknown name after Add…, press Enter at this prompt, then choose (or create) its parent tag or group.'],['Remove','The × beside a tag you assigned.'],['Asterisk','The tag is not shared by every item in a multi-selection.'],['Status Bar','Selecting a tag name shows which filter group it belongs to.'],['Open Quick Tags','Filter View menu entry that hides or shows this section.']], 'Factory tags cannot be removed through this panel.'],
    ['collections','Colored collections gather shortcuts to different kinds of content in one place.','Keep a few frequently used tools',[
      'Select a Browser item and assign a Collection color.',
      'Open that Collection to retrieve it alongside other assigned items.'
    ],[['Mixed types','Devices, presets, samples and folders can share a Collection.'],['Rename','Gives the color a meaningful label.']], 'Collection assignment does not relocate or copy the file.',[],[key('Assign color','1–7'),key('Clear assignments','0')]],
    ['library','Library labels organize content by type, while Sounds groups presets by their sound-oriented tags.','Choose the right kind of result',[
      'Search All for a known name, or choose the relevant content label.',
      'Check whether the result is a raw sample, device, preset, Rack or saved clip.'
    ],[['All','Everything in one list: devices first, then files.'],['Sounds','Instrument Racks and instrument presets, plus presets tagged from the Sounds filter group.'],['Drums','Drum devices, Drum Racks, single hits, and drum loops and one-shots.'],['Instruments / Audio Effects / MIDI Effects','Live’s devices, their presets and your Racks of that kind, organized by device.'],['Modulators','Live’s modulator devices and anything tagged Modulator.'],['Max for Live','Max for Live devices, presets and Racks built from them.'],['Plug-Ins','Installed VST and Audio Units plug-ins.'],['Clips / Samples / Grooves / Templates','Live Clips, raw audio files, grooves and template Sets.'],['Tunings','Tuning systems from the Core Library and your saved .ascl or .scl files.'],['Edit','Hover right of the Library header and click Edit to show or hide labels; Done to finish.']], 'Use Instruments when you know the device; use Sounds when looking for a prepared sound.'],
    ['places','Places points to actual libraries, project folders and optional connected sources.','Locate the source location',[
      'Choose Current Project for this project’s files or User Library for reusable material.',
      'Use an added folder for a separate sample library.'
    ],[['Packs','The Core Library, Packs you installed, and available Pack updates and downloads.'],['User Library','Things you saved: default presets, grooves, Rack and device presets, samples, Live Clips.'],['Current Project','Every file belonging to the open Project.'],['User Folder','A folder from any drive that you added.'],['Add Folder…','Opens a chooser to add another folder to Places.'],['Splice / Cloud / Push','Optional, turned on in Library Settings. Splice: its sample catalog. Cloud: Sets synced from Note and Move. Push: files from a Push 3 in Standalone Mode.'],['Library vs Places','Library sorts by type; Places sorts by where things live.']], 'What appears here depends on how your library is set up.'],
    ['downloading-and-installing-packs-in-the-browser','Owned Packs may be available without being installed. Installed content appears in the Browser’s normal categories.','Check a missing Pack',[
      'Open Packs and inspect Installed, Updates and Available Packs.',
      'Check size and ownership before downloading; install after the download finishes.'
    ],[['Download','Retrieves the archive.'],['Install','Makes its content available in Live.']], 'Deleting a Pack can make Sets that depend on it incomplete until the content is restored.'],
    ['pack-info','Pack Info identifies the creator and explains the included material.','Inspect an unfamiliar Pack',[
      'Open the installed Pack’s context menu and choose Show Pack Info.',
      'Use any included instructions to identify required devices or suggested starting presets.'
    ],[['Pack Overview','A Help-menu route to installed Pack information.']], 'The Core Library does not have the same Pack Info page.'],
    ['splice','An optional online sample service inside Live’s Browser, separate from the local library.','Explore without loading',[
      'Open the Splice label if your version supports it.',
      'Search and preview a sample before deciding whether to add it to a Set.'
    ],[['Online service','Requires a network connection.'],['Home page','Navigation arrows, search bar, Search with Sound drop area and category buttons.'],['Account','Browsing and previewing work without one. Adding samples to a Set, saving to your Splice library and Search with Sound need a login.'],['Hide it','Right-click → Hide from Sidebar, or set Show Splice to Off in Library Settings.']], 'Account access, credits and licenses are managed by Splice; this is not required for native Live lessons.'],
    ['logging-into-splice','Live connects to a Splice account through the service’s browser sign-in flow.','Verify the device connection',[
      'Choose Login (or Try free for a new free account) at the top of the Splice label.',
      'Check that the device code in Live matches the browser prompt before confirming and signing in.'
    ],[['Account connection','Enables the account-specific library and loading functions.']], 'Only confirm a sign-in you initiated. Account creation and subscriptions are separate choices.'],
    ['searching-for-splice-samples','Search by description or filter the online sample catalog by sound and musical properties.','Narrow a search',[
      'Enter a term in the Splice search field and choose Samples or Packs.',
      'Refine by the relevant instrument, sample type, key or tempo.'
    ],[['Browse buttons','Instruments, Genres and Cinematic FX open category and subcategory views.'],['Sorting','Most popular, relevant, recent or Random (shuffle).'],['Included','With a free account or when logged out, results are limited to included samples (about 2,500), marked by the Included filter and tag.'],['Search with Sound','Drag a clip onto the drop area, or make a time selection and click it; Splice returns 50 compatible samples.']], 'Treat Search with Sound as use of an online service: only supply audio you intend to share with it. Available results depend on account access.'],
    ['working-with-splice-samples','Preview settings can change a sample’s playback tempo and pitch before you load it.','Check what you are hearing',[
      'Compare the preview’s stretch and pitch settings with the original sample.',
      'When ready to load it, choose a deliberate destination track or sampler.'
    ],[['Preview defaults','Everything previews on a loop, and loops sync to the Set’s tempo. Click 1x BPM and turn off Timestretch to hear the original tempo; on a one-shot, click 1 BAR to stop looping. Key transpose, Live scale sync and preview loudness are also here.'],['Loading','Drag onto an audio or MIDI track, or into Simpler, Sampler, Drum Rack or Impulse. In Session View, double-click or Enter also loads.'],['Warp Mode','Splice clips are set to Complex automatically, so they sound as previewed.'],['Storage','Library Settings: User Library/Samples/Splice (default), Current Project/Samples/Splice, or a custom folder.'],['Heart','Adds the sample to Likes.']], 'Loading a sample licenses it and saves it to your Splice library automatically; check access or credit consequences first.'],
    ['splice-library','Splice’s library contains account Likes, Collections and downloaded material.','Find a saved item',[
      'Open the Splice Library and choose the relevant Like or Collection.',
      'Check whether the sample has been downloaded locally before relying on it offline.'
    ],[['Splice Collection','Separate from Live’s colored Collections.']], 'Sharing or deleting an online Collection is an account action, not just a local Browser view change.'],
    ['splice-settings','Account plan, display, logs and licensing-help options belong to Splice’s settings area.','Check the account context',[
      'Open Splice Settings from its label.',
      'Inspect the relevant account or display option before making changes.'
    ],[['Service settings','Separate from Live’s Audio or Library settings.']], 'Do not change a subscription to solve an unrelated Live routing or playback problem.'],
    ['using-ableton-cloud','Open Sets synced from supported mobile or standalone Ableton products. Live is not a two-way editor for those synced Sets.','Continue a synced idea in Live',[
      'Select the Cloud label in the Browser sidebar and click Sign In to authorize with your ableton.com account.',
      'Open a synced Set; when you have developed it in Live, use Collect All and Save.'
    ],[['Capacity','Up to eight Sets from Move and Note.'],['User Library','Stores sample assets used by synced Sets; it must be set and reachable when those Sets open.'],['Direction','Move and Note send Sets to Live; changes in Live do not sync back.'],['Show Cloud','Library Settings option to hide the Cloud label.']], 'If samples are missing, check whether the User Library is on a custom location such as an external drive, and connect it.'],
    ['transferring-files-from-push-3-in-standalone-mode','Pair Live with your standalone Push to move project material between them.','Pair the intended device',[
      'Put both devices on the same network and find the correct Push name in Places.',
      'Check the device name, connect, and enter the pairing code shown on that Push.'
    ],[['Compatibility','Standalone use needs supported devices and collected samples.'],['Plug-ins','Need an audio/frozen alternative for standalone playback.']], 'This entry covers file transfer only; the separate Push manual covers its standalone operation.'],
    ['user-library','Your reusable presets, defaults, grooves, clips and templates live independently of any one project.','Find a saved preset',[
      'Open User Library and locate the relevant content folder.',
      'Search the preset’s name in the appropriate Library label to check that it is indexed.'
    ],[['Reusable library','Material intended for more than one Set.'],['Backup','Needs its own backup plan, especially on an external drive.']], 'Saving a project does not automatically back up the whole User Library.'],
    ['abl-assets','Synced Move and Note Sets can depend on audio in this User Library folder.','Resolve missing synced audio',[
      'Check the configured User Library location and reconnect its drive if necessary.',
      'Reopen or relink the synced Set, then collect the samples into its saved project.'
    ],[['ABL Assets','Storage for material arriving through Ableton Cloud.']], 'Do not delete the folder as a cache-clearing experiment.'],
    ['chord-banks','Custom chord banks for the Stacks MIDI tool are stored here.','Reuse a saved bank',[
      'Save the bank from the Stacks workflow.',
      'Locate it in User Library and verify it can be selected again in the tool.'
    ],[['Bank','Reusable tool data, not a recording of the chord sound.']]],
    ['clips-folder','Saved Live Clips can carry MIDI or audio behavior together with relevant device settings.','Keep a reusable clip',[
      'Drag the clip into the User Library’s Clips folder.',
      'Load it into a spare track and check the sound and sample dependencies.'
    ],[['Live Clip','More than a raw MIDI file or audio sample.'],['Collect Files on Export','Controls whether dependent samples are gathered.']], 'Verify collection behavior before moving the library to another computer.'],
    ['defaults-folder','Default presets establish what newly created devices, tracks and supported operations start with.','Inspect a surprising default',[
      'Compare a newly created item with the intended starting state.',
      'Check the related saved default before changing or removing it.'
    ],[['Default','Changes future creation behavior.'],['Ordinary preset','Loaded deliberately when needed.']], 'Existing tracks and devices do not all reset when a default changes.'],
    ['grooves-folder','Store your own reusable groove files separately from the Groove Pool in a particular Set.','Keep an extracted groove',[
      'Extract a groove from the intended clip region.',
      'Save the groove with a clear name and check that it can be loaded into another Set.'
    ],[['.agr','A groove file, not the source audio.']]],
    ['presets-folder','Reusable instrument, effect, Rack and Max presets are stored here.','Recall a saved sound',[
      'Save the device or Rack preset, then locate it in the User Library.',
      'Load it in a spare track and check any referenced samples.'
    ],[['Preset','Stores the device configuration.'],['Samples','May still be dependencies of that configuration.']], 'Keep the preset and its collected samples together when moving the library.'],
    ['samples-folder','The User Library’s saved clips and presets can reference audio stored here.','Check a preset’s dependency',[
      'Inspect the sample used by the saved instrument or clip.',
      'Confirm that it is collected and available in the expected library location.'
    ],[['Referenced audio','May be shared by multiple presets or clips.']], 'A file that looks unused in one Set may still be needed by library material.'],
    ['templates-folder','Saved starting Sets and the custom default Set live here.','Start from a known setup',[
      'Choose the intended template in the Browser.',
      'Save the resulting working Set into its own project location.'
    ],[['Template','A starting structure, not the destination for every lesson’s recordings.']], 'Keep the reusable template separate from evolving student work.'],
    ['managing-files-in-the-user-library','The library file manager reports missing and external dependencies across reusable material.','Inspect before reorganizing',[
      'Choose Manage Files, then Manage User Library.',
      'Review missing or external references before moving or deleting source folders.'
    ],[['External file','Referenced from outside the library.'],['Missing file','Expected at a location that is currently unavailable.']], 'Resolve the referenced source, not just the visible preset name.'],
    ['current-project','A view of the active project’s Sets, media and saved-version backups.','Find an earlier saved version',[
      'Open Current Project and inspect its Backup folder if one exists.',
      'Check the timestamp of the desired version before opening or saving over anything.'
    ],[['Backup folder','Appears after repeated saves and holds recent saved Set versions.'],['Unsaved Set','Still refers to temporary working storage.']], 'Recent Set backups are not a complete independent backup of all media.'],
    ['user-folders','Add a folder as a Browser location without moving its contents.','Make a sample folder searchable',[
      'Use Add Folder in Places, or drag the folder from Finder or Explorer into Places.',
      'Wait for the spinning wheel beside Places to stop, then search for a known file from that folder.'
    ],[['Not moved','The folder stays where it is. Renaming or moving it in Finder/Explorer, or launching Live without its external drive, loses it.'],['Gray folder','Live cannot find it. Right-click → Locate Folder to point to its new place.'],['Remove from Sidebar','Forgets the Browser location rather than deleting its files.']], 'Add focused content folders rather than an entire drive: huge folders slow indexing and may be re-indexed at every launch.'],
    ['previewing-files','Audition supported samples, clips and presets before loading them into a track.','Listen before loading',[
      'Select a Browser item and start its preview.',
      'Use arrows to compare nearby results; load only after confirming the destination track.'
    ],[['Raw','Original-speed, unlooped sample preview.'],['Preview/Cue Volume','Controls preview loudness independently from the track.']], 'A tempo-synced preview can sound different from the source at its original speed.',[],[key('Preview selected file','⇧ Enter')]],
    ['adding-content-from-the-browser-to-a-live-set','The destination determines whether a sample becomes an audio clip or is loaded into an instrument.','Load a known device by name',[
      'Select the intended track, search the device name and choose the matching result.',
      'Load it, then check its position in the device chain.'
    ],[['Audio destination','A sample becomes an audio clip.'],['MIDI destination','A sample can load into Simpler.'],['Empty Set area','Dropping content can create a new track.']], 'Loading a new instrument can replace an existing one; check the selection first.',[],[key('Search','⌘ F','Ctrl F'),key('Results','↓'),key('Load','Enter')]]
  ]);
})();
