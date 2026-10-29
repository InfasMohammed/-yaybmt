const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,...(fs.existsSync('/usr/bin/chromium')?{executablePath:'/usr/bin/chromium'}:{})});
 const page=await browser.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width:1440,height:1000});
 await page.goto(process.env.YAYBMT_TEST_URL || 'http://127.0.0.1:8080/',{waitUntil:'networkidle'});
 assert.equal(await page.locator('h1').count(),1);
 assert.match(await page.locator('h1').innerText(),/Strong foundations/);
 assert.equal(await page.locator('a[href$="/brand/marine-locks/"]').count(),4);
 await page.screenshot({path:'/workspace/-yaybmt/artifacts/home-desktop.png',fullPage:true});
 for(const width of [390,320]){
  await page.setViewportSize({width,height:844});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`Overflow at ${width}`);
  await page.getByRole('button',{name:/Menu/}).click();
  assert.equal(await page.getByRole('button',{name:/Menu/}).getAttribute('aria-expanded'),'true');
  assert.equal(await page.locator('#primary-nav').isVisible(),true);
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('button',{name:/Menu/}).getAttribute('aria-expanded'),'false');
 }
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:'/workspace/-yaybmt/artifacts/home-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);
 await browser.close();console.log('PASS: homepage, marine-lock links, 320/390px overflow, mobile menu, Escape, no JS errors.');
})().catch(e=>{console.error(e);process.exit(1)});
