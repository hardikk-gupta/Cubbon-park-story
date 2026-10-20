// Evaluate module definitions only, without invoking the WebGL renderer.
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'shaders');fs.mkdirSync(out,{recursive:true});
let source=fs.readFileSync(root+'/readable/scene.js','utf8');
source=source.replace('function be(d) {',`window.extracted={shared:A,fullscreen:O,clothHeight:de,canopy:me,paperVertex:te(false),paperShadowVertex:te(true),paperShadowFragment:pe,meshVertex:oe(false),meshShadowVertex:oe(true),meshShadowFragment:xe,meshFragment:ge,blur:we,clothFragment:ye,paperFragment:Te}; function be(d) {`);
const context={window:{}};vm.runInNewContext(source,context,{timeout:2000});
for(const [name,text] of Object.entries(context.window.extracted))fs.writeFileSync(path.join(out,name+'.glsl'),text+'\n');
console.log('Extracted',Object.keys(context.window.extracted).length,'shader sources');
