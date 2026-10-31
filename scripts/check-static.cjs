const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext();
 await context.route('**/*',route=>new URL(route.request().url()).hostname==='127.0.0.1'?route.continue():route.abort());
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base='http://127.0.0.1:8080'; const output=process.env.YAYBMT_SCREENSHOTS||'artifacts/nextjs';fs.mkdirSync(output,{recursive:true});
 for(const width of [1440,390,320]){
  await page.setViewportSize({width,height:width===1440?1000:844});
  for(const [route,name] of [['/','home'],['/shop/','catalogue'],['/product/fc-110cs/','product']]){
   const response=await page.goto(base+route);assert.equal(response.status(),200);await page.waitForLoadState('networkidle');
   assert.equal(await page.locator('h1').count(),1);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow '+route+' '+width);
   assert.match(await page.locator('meta[name=robots]').getAttribute('content'),/noindex/);
   assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://yaybmt.com'+route);
   assert.ok(await page.locator('header a[href*=wa]').count()===0);
   if(width!==320) await page.screenshot({path:path.join(output,name+'-'+(width===1440?'desktop':'mobile')+'.png'),fullPage:true});
  }
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/shop/');
 const count=await page.locator('.card').count();assert.equal(count,16);
 await page.getByRole('searchbox').fill('FC110');assert.equal(await page.locator('.card').count(),1);
 await page.getByRole('button',{name:/Clear search/}).click();assert.equal(await page.locator('.card').count(),16);
 await page.locator('aside input[type=checkbox]').check();assert.equal(await page.locator('.chips button').count(),1);
 await page.getByRole('button',{name:/Remove brand filter/}).click();
 const geometry=await page.locator('.card').evaluateAll(cards=>cards.slice(0,3).map(c=>({bottom:c.getBoundingClientRect().bottom,top:c.querySelector('.card-name').getBoundingClientRect().top,frame:c.querySelector('.image-frame').getBoundingClientRect().height})));
 assert.ok(geometry.every(g=>Math.abs(g.bottom-geometry[0].bottom)<2&&Math.abs(g.top-geometry[0].top)<2&&Math.abs(g.frame-geometry[0].frame)<2));
 await page.getByRole('searchbox').fill('nonexistent');assert.equal(await page.locator('.card').count(),0);
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:/Clear search/}).click();await page.getByRole('button',{name:'Filters +'}).click();assert.ok(await page.locator('dialog').isVisible());await page.locator('dialog input').check();await page.keyboard.press('Escape');assert.ok(!await page.locator('dialog').isVisible());
 await page.goto(base+'/product/fc-110cs/');
 assert.match(await page.getByRole('link',{name:'Enquire by email'}).getAttribute('href'),/^mailto:sales@yaybmt.com\?subject=/);
 const wa=new URL(await page.locator('main').getByRole('link',{name:/Enquire on WhatsApp/}).getAttribute('href'));assert.equal(wa.pathname,'/971567369803');assert.match(wa.searchParams.get('text'),/FC110CS/);
 const bad=await page.goto(base+'/genuine-missing-page/');assert.equal(bad.status(),404);
 const redirect=await context.request.get(base+'/product-category/marine-locks/',{maxRedirects:0});assert.equal(redirect.status(),301);assert.equal(redirect.headers().location,'/brand/marine-locks/');
 const nojs=await browser.newContext({javaScriptEnabled:false});const plain=await nojs.newPage();await plain.goto(base+'/shop/');assert.equal(await plain.locator('.card').count(),16);await plain.locator('.card a').first().click();assert.equal(await plain.locator('h1').count(),1);assert.ok(await plain.getByRole('link',{name:'Enquire by email'}).isVisible());await nojs.close();
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base+'/');assert.equal(await page.locator('.hero>div').evaluate(e=>getComputedStyle(e).animationName),'none');
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS: responsive pages, metadata, filters, drawer/Escape, alignment, enquiry destinations, real 404, redirect, no-JS browsing and reduced motion.');
})().catch(e=>{console.error(e);process.exit(1)});
