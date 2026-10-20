const {chromium}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'),path=require('path');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
 const page=await browser.newPage({viewport:{width:1400,height:1000}}),errors=[],failures=[];
 page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.status()>=400)failures.push({url:r.url(),status:r.status()})});
 await page.goto('http://127.0.0.1:8001/guide/',{waitUntil:'networkidle'});
 const result={title:await page.title(),chapters:await page.locator('#contents a').count()};
 await page.locator('#turn').fill('0.8');await page.locator('#bend').fill('1.7');await page.locator('#wire').uncheck();result.paper=await page.locator('#paper-readout').textContent();
 await page.locator('#height').fill('90');result.shadow=await page.locator('#shadow-shape').getAttribute('transform');
 await page.locator('#step').click();await page.waitForTimeout(900);result.motion=await page.locator('#motion-readout').textContent();
 await page.locator('[data-lab="paper"]').screenshot({path:path.resolve(__dirname,'../evidence/guide-paper.png')});
 await page.locator('[data-lab="shadow"]').screenshot({path:path.resolve(__dirname,'../evidence/guide-shadow.png')});
 await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:path.resolve(__dirname,'../evidence/guide-desktop.png')});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.resolve(__dirname,'../evidence/guide-mobile.png')});result.mobile=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
 result.errors=errors;result.failedResponses=failures;
 if(result.chapters!==14||result.mobile.viewport!==result.mobile.document||errors.length||failures.length||!result.paper.includes('144°')||!result.shadow.includes('40'))throw new Error(JSON.stringify(result));
 fs.writeFileSync(path.resolve(__dirname,'../evidence/guide-verification.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
