const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.YAYBMT_SAMPLE_URL||'http://127.0.0.1:5000';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium'});
 try {
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
 for(const file of ['index.html','catalogue.html','product-detail.html']){
  await page.goto(`${base}/${file}`);assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('a[href*="wa.me"]').count(),1);assert.equal(await page.locator('a.whatsapp-float').count(),1);
  assert.equal(await page.locator('.site-header .social-links').count(),0);assert.equal(await page.locator('.site-footer .social-links a').count(),2);
  for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${file} overflow at ${width}`);}
 }
 await page.goto(`${base}/index.html`);
 assert.equal(await page.locator('.hero-header').count(),1);assert.match(await page.locator('.hero-header .company-logo img').getAttribute('src'),/logo-footer-original.png/);
 assert.equal(await page.locator('#primary-nav > a').first().evaluate(e=>getComputedStyle(e).fontWeight),'700');
 await page.goto(`${base}/catalogue.html`);assert.equal(await page.locator('li.product').count(),16);
 const links=await page.locator('li.product a').evaluateAll(a=>a.map(e=>e.getAttribute('href')));assert(links.includes('/product/dc-102/'));assert(links.every(h=>h.startsWith('/product/')));
 await page.getByLabel('Find in this sample page').fill('DC 102');assert.equal(await page.locator('li.product:visible').count(),1);
 await page.getByLabel('Find in this sample page').fill('no-such-product');assert.equal(await page.locator('li.product:visible').count(),0);assert.match(await page.locator('[role="status"]').innerText(),/0 matching/);
 await page.getByLabel('Find in this sample page').fill('');assert.equal(await page.locator('li.product:visible').count(),16);
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('li.product').first().evaluate(e=>getComputedStyle(e).animationName),'none');
 await page.goto(`${base}/product-detail.html`);assert.match(await page.locator('h1').innerText(),/DC 102/);
 assert.equal(await page.getByRole('link',{name:'Existing product URL'}).getAttribute('href'),'/product/dc-102/');
 const email=new URL(await page.getByRole('link',{name:'Enquire about DC 102'}).getAttribute('href'));assert.match(email.searchParams.get('body'),/https:\/\/yaybmt.com\/product\/dc-102\//);
 const summary=page.locator('.product-guidance details').nth(1).locator('summary');await summary.focus();await page.keyboard.press('Enter');assert(await page.locator('.product-guidance details').nth(1).evaluate(e=>e.open));
 await page.setViewportSize({width:1440,height:1100});await page.screenshot({path:'/tmp/yaybmt-product-sample.png',fullPage:true});
 await page.goto(`${base}/catalogue.html`);await page.screenshot({path:'/tmp/yaybmt-catalogue-sample.png',fullPage:true});assert.deepEqual(errors,[]);
 console.log('PASS: three samples, four viewport widths, retained product links, search/empty/reset, keyboard details, reduced motion, homepage branding and floating-only WhatsApp.');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
