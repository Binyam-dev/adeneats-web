// QA-only Playwright harness. BASE_URL should point to the existing site's preview.
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),args:['--no-sandbox']});
try{
 const page=await browser.newPage({viewport:{width:390,height:844}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`${process.env.BASE_URL||'http://localhost:3000'}/play`);
 const g=page.frameLocator('iframe');
 await g.locator('[data-recipe="misir"]').click();
 await g.locator('[data-id="sugar"]').click();await g.locator('[data-id="sugar"]').click();
 await g.getByText('Two mistakes.',{exact:false}).waitFor();
 for(const id of ['onion','oil','garlic','berbere','lentils','water'])await g.locator(`[data-id="${id}"]`).click();
 assert.equal(await g.locator('#points').textContent(),'60 practice points');
 await g.locator('#next').click();
 for(const id of ['onion','oil','berbere','lentils','water'])await g.locator(`[data-step="${id}"]`).click();
 await g.locator('#next').click();
 await g.locator('#heat').fill('40');
 for(let i=0;i<3;i++)await g.locator('#stir').click();
 await g.locator('#next').click();await g.locator('#lay-injera').click();
 await g.locator('#ladle').click();await g.locator('#ladle').click();await g.locator('#next').click();
 await g.getByRole('heading',{name:'Misir wot, served!'}).waitFor();
 assert.equal(await g.locator('#points').textContent(),'160 practice points');
 for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});assert.equal(await g.locator('body').evaluate(el=>el.scrollWidth<=innerWidth),true);}
 await page.emulateMedia({reducedMotion:'reduce'});await g.locator('#restart').click();await g.locator('[data-id="onion"]').click();assert.equal(await g.locator('.fly').count(),0);
 assert.deepEqual(errors,[]);
 await page.screenshot({path:'/tmp/aden-kitchen-updated.png',fullPage:true});
 console.log('PASS: mobile complete round, two-chance reset, responsive widths and reduced motion.');
}finally{await browser.close();}
