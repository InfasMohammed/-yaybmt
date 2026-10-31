// Browser-only image/title fixtures: the restored database and media are untouched.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.YAYBMT_RESTORED_URL || 'http://127.0.0.1:8086';
const widths=[320,390,768,1100,1440];
async function addMixedImages(page,cardSelector,imageSelector,titleSelector){
 await page.locator(cardSelector).evaluateAll((cards,{imageSelector,titleSelector})=>{
  const shapes=[[1200,300],[300,1200],[600,600],[1600,900]];
  const titles=['Alloy Steel Pipes','Ball Valves','Blind Flanges','Butt Weld Fittings','Caps','Check Valves','Clamps (U-Bolt, T-Bolt, etc.)','Stainless Steel Marine Hardware Fittings for Commercial Vessel Maintenance and Industrial Applications'];
  cards.slice(0,8).forEach((card,i)=>{
   const frame=card.querySelector(imageSelector), title=card.querySelector(titleSelector);
   const [w,h]=shapes[i%shapes.length];
   const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect x="2" y="2" width="${w-4}" height="${h-4}" rx="10" fill="#c6d1dc" stroke="#293746" stroke-width="4"/></svg>`;
   const image=document.createElement('img');image.src='data:image/svg+xml,'+encodeURIComponent(svg);image.width=w;image.height=h;image.alt='Layout test fixture';frame.replaceChildren(image);title.textContent=titles[i];
  });
 },{imageSelector,titleSelector});
 await page.locator(`${cardSelector} ${imageSelector} img`).evaluateAll(images=>Promise.all(images.map(image=>image.decode())));
}
async function verifyRows(page,cardSelector,imageSelector,titleSelector,label){
 const metrics=await page.locator(cardSelector).evaluateAll((cards,{imageSelector,titleSelector})=>cards.slice(0,8).map(card=>{
  const frame=card.querySelector(imageSelector),title=card.querySelector(titleSelector),image=frame.querySelector('img');
  const c=card.getBoundingClientRect(),f=frame.getBoundingClientRect(),t=title.getBoundingClientRect();
  const range=document.createRange();range.selectNodeContents(title);const text=range.getBoundingClientRect();
  return {top:c.top,bottom:c.bottom,imageTop:f.top,imageHeight:f.height,titleTop:t.top,titleBottom:t.bottom,textBottom:text.bottom,textRight:text.right,titleRight:t.right,fit:getComputedStyle(image).objectFit,naturalWidth:image.naturalWidth,naturalHeight:image.naturalHeight};
 }),{imageSelector,titleSelector});
 const rows=[];
 for(const m of metrics){let row=rows.find(r=>Math.abs(r[0].top-m.top)<1);if(!row){row=[];rows.push(row);}row.push(m);}
 for(const row of rows)for(const m of row){
  const first=row[0];
  for(const key of ['imageHeight','titleTop','bottom'])assert(Math.abs(m[key]-first[key])<1.1,`${label}: uneven ${key}`);
  assert(m.textBottom<=m.titleBottom+1,`${label}: title clipped vertically`);
  assert(m.textRight<=m.titleRight+1,`${label}: title clipped horizontally`);
  assert.equal(m.fit,'contain');assert(m.naturalWidth>0 && m.naturalHeight>0);
 }
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${label}: page overflow`);
}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium'});
 const page=await browser.newPage();
 await page.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin?route.continue():route.abort());
 await page.goto(base+'/brand/daelim/');
 await addMixedImages(page,'ul.products li.product','.product-card-media','.woocommerce-loop-product__title');
 for(const width of widths){await page.setViewportSize({width,height:1000});await verifyRows(page,'ul.products li.product','.product-card-media','.woocommerce-loop-product__title',`Product grid at ${width}px`);}
 await page.goto(base+'/');
 await addMixedImages(page,'.catalogue-card','.catalogue-image','.catalogue-caption h3');
 for(const width of widths){await page.setViewportSize({width,height:1000});await verifyRows(page,'.catalogue-card','.catalogue-image','.catalogue-caption',`Homepage ranges at ${width}px`);}
 await browser.close();console.log('PASS: landscape, portrait, square images and long names keep image frames, title panels and card bottoms aligned at 320/390/768/1100/1440px, without clipping or page overflow.');
})().catch(error=>{console.error(error);process.exit(1)});
