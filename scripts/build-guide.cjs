// Build once and commit local/guide/index.html; the deployed guide needs no build step.
const fs=require('fs'),path=require('path');
let marked;
try{({marked}=require('marked'))}catch{({marked}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/marked'))}
const root=path.resolve(__dirname,'..');
const md=fs.readFileSync(root+'/HOW-IT-WORKS.md','utf8');
let body=marked.parse(md);
const repo='https://github.com/hardikk-gupta/Cubbon-park-story/blob/main/';
body=body.replace(/href="(CODE-MAP\.md|BREAKDOWN\.md)"/g,(_,f)=>`href="${repo+f}"`);
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="An illustrated, interactive explanation of the recovered aarya.wtf frontend: paper, shadows, leaves, butterflies and smooth motion."><title>How the picnic works — an interactive code guide</title><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="guide.css"></head><body><header><div class="eyebrow">Aarya.wtf · Recovered frontend study</div><h1>Paper, sunlight,<br>and a little mathematics.</h1><p>How a browser turns flat artwork into a picnic you can touch. A guided explanation of the actual code, with three experiments you can control.</p><p class="links"><a href="/">Explore the picnic ↗</a> &nbsp;·&nbsp; <a href="${repo}HOW-IT-WORKS.md">Read on GitHub ↗</a></p></header><main><nav id="contents" aria-label="Guide chapters"><strong>Inside this guide</strong></nav><article>${body}</article></main><footer>Based on the public frontend captured on 2026-10-20 UTC. Experiments illustrate selected concepts; the portfolio's recovered code is preserved separately. The original repository and backend were not recovered.</footer><script src="guide.js"></script></body></html>`;
fs.mkdirSync(root+'/local/guide',{recursive:true});fs.writeFileSync(root+'/local/guide/index.html',html);console.log('Built local/guide/index.html');
