const {chromium} = require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'), path=require('path');
const root=path.resolve(__dirname,'..');
let activeBrowser;
(async()=>{
 const browser=activeBrowser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,proxy:{server:process.env.HTTPS_PROXY||'http://proxy:8080'},args:['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader','--disable-dev-shm-usage','--ignore-certificate-errors-spki-list=n9jEr2dCP1tg9exQzr7xEpZ4TjG2QWO02LUFhmAzII4=']});
 const context=await browser.newContext({viewport:{width:1440,height:1000},ignoreHTTPSErrors:false});
 const page=await context.newPage(), network=[], errors=[];
 page.on('pageerror',e=>{errors.push(String(e));console.log('ERROR',String(e))}); page.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text().slice(0,300))}); console.log('Browser launched');
 page.on('response',r=>network.push({url:r.url(),status:r.status(),type:r.request().resourceType()}));
 await page.goto('https://aarya.wtf/',{waitUntil:'domcontentloaded',timeout:60000});
 console.log('Page loaded'); await page.waitForFunction(()=>document.body.classList.contains('on'),{},{timeout:90000}); console.log('Scene ready');
 await page.waitForTimeout(3500);
 await page.screenshot({path:root+'/evidence/desktop-hero.png'});
 fs.writeFileSync(root+'/evidence/live-dom.html',await page.content());
 fs.writeFileSync(root+'/evidence/live-state.json',JSON.stringify(await page.evaluate(()=>({title:document.title,height:document.documentElement.scrollHeight,bodyClass:document.body.className,webgl:!!document.querySelector('canvas').getContext('webgl2'),links:Array.from(document.querySelectorAll('a')).map(a=>({text:a.textContent,url:a.href})),buttons:Array.from(document.querySelectorAll('button')).map(a=>({text:a.textContent,label:a.getAttribute('aria-label')}))})),null,2));
 await page.locator('#nav .open').click();
 await page.waitForTimeout(1000);
 await page.screenshot({path:root+'/evidence/desktop-navigation.png'});
 await page.locator('#nav .open').click();
 for(const [name,y] of [['postcard-back',850],['selected-work',3100],['work-row',5500],['testimonials',10500],['contact',14000],['colouring',15500]]){
  await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(1500);await page.screenshot({path:root+'/evidence/desktop-'+name+'.png'});
 }
 fs.writeFileSync(root+'/evidence/network.json',JSON.stringify(network,null,2));
 fs.writeFileSync(root+'/evidence/browser-errors.json',JSON.stringify(errors,null,2));
 await context.close();
 const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
 const mp=await mobile.newPage();await mp.goto('https://aarya.wtf/',{waitUntil:'domcontentloaded',timeout:60000});await mp.waitForFunction(()=>document.body.classList.contains('on'),{},{timeout:90000});await mp.waitForTimeout(2000);await mp.screenshot({path:root+'/evidence/mobile-hero.png'});
 await browser.close();console.log('Browser evidence saved');
})().catch(async e=>{console.error(e);if(activeBrowser)await activeBrowser.close();process.exit(1)});
