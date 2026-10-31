// Run after restoring the supplied database into the separate local instance.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.YAYBMT_RESTORED_URL || 'http://127.0.0.1:8086';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin ? route.continue() : route.abort());
 await page.goto(base+'/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('.catalogue-card').count(),12);
 assert.equal(await page.locator('.brand-grid>a').count(),9);
 assert.match(await page.locator('.catalogue-card').nth(2).getAttribute('href'),/\/product-category\/cp-fittings\//);
 await page.screenshot({path:'artifacts/home-desktop-restored.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:'artifacts/home-mobile-restored.png',fullPage:true});
 await page.goto(base+'/brand/daelim/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('h1').innerText(),'DAELIM');
 assert.equal(await page.locator('.catalogue-filter').first().locator('li').count(),9);
 assert.equal(await page.locator('.catalogue-filter').nth(1).locator('li').count(),41);
 assert.equal(await page.locator('[aria-current="page"] .term-count').innerText(),'21');
 const cards=page.locator('ul.products li.product');
 assert.ok(await cards.count()>0);
 const allTaxonomyLinks=await page.locator('.catalogue-filter a').evaluateAll(links=>links.map(a=>a.href));
 const firstProducts=await cards.locator('.woocommerce-loop-product__title').allTextContents();
 await page.setViewportSize({width:1440,height:1000});
 await page.screenshot({path:'artifacts/catalogue-desktop-restored.png',fullPage:true});
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:844});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Archive overflow at ${width}`);
  if(width===390)await page.screenshot({path:'artifacts/catalogue-mobile-restored.png',fullPage:true});
 }
 const next=page.locator('.woocommerce-pagination a.next');
 await next.click();
 assert.notDeepEqual(await page.locator('ul.products .woocommerce-loop-product__title').allTextContents(),firstProducts);
 const redirect=await page.request.get(base+'/product-category/marine-locks/',{maxRedirects:0});
 assert.equal(redirect.status(),301);
 assert.equal(redirect.headers().location,base+'/brand/marine-locks/');
 for(let i=0;i<allTaxonomyLinks.length;i+=5){
  const responses=await Promise.all(allTaxonomyLinks.slice(i,i+5).map(url=>page.request.get(url)));
  for(const r of responses)assert.equal(r.status(),200,`Archive failed: ${r.url()}`);
 }
 await page.goto(base+'/product/dc-102/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('h1').innerText(),'DC 102');
 assert.match(await page.locator('.product-enquiry a[href^="mailto:"]').getAttribute('href'),/^mailto:sales@yaybmt.com\?subject=/);
 const structured=await page.locator('script[type="application/ld+json"]').allTextContents();
 assert.ok(structured.length>0,'Yoast structured data is present');
 for(const text of structured){const schema=JSON.parse(text);assert.ok(!/"(?:aggregateRating|reviewRating|priceCurrency)"/.test(JSON.stringify(schema)),'No synthetic rating or price data');}
 assert.match(await page.locator('meta[name="robots"]').getAttribute('content'),/noindex/);
 assert.deepEqual(errors,[]);
 await browser.close();
 console.log('PASS: real catalogue, 9 brands, 41 categories, DAELIM count, 50 archive URLs, pagination, mobile widths, product enquiry, Marine Locks 301, no synthetic review/price schema, staging noindex.');
})().catch(e=>{console.error(e);process.exit(1)});
