// Read-only model loader shared by audits. Uses the page's actual script order.
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const vm=require('node:vm');
module.exports=function(){
  const read=n=>readFileSync(join(__dirname,n),'utf8'),html=read('index.html');
  const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]).filter(n=>n!=='atlas.js');
  return vm.runInNewContext(scripts.map(read).join('\n')+'\n'+read('atlas.js').split('const flags=new Set();')[0]+'\n({entries,manualData,manualAtlas,workspaceAtlas,clipsAtlas,devicesAtlas,shortcutExplorer,manualImages,captures,topicGroups,historyData,historyAtlas,historyImagesData,historyImages,neighborhoodCards})',{URL,document:{querySelector:()=>null}});
};
