import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/opt/google/chrome/chrome',headless:true});
try{
 const page=await browser.newPage();
 const routes=['home-solar','commercial-solar','hybrid-solar','off-grid-solar','solar-panel-cost','net-metering'];
 for(const slug of routes){const r=await page.goto(`http://127.0.0.1:4322/${slug}/`);assert.equal(r.status(),200,`${slug} must resolve`);assert.equal(await page.locator('h1').count(),1);}
 const response=await page.goto('http://127.0.0.1:4322/home-solar/');
 assert.equal(response.status(),200,'Home solar must resolve as a real route');
 assert.equal(await page.locator('h1').count(),1);
 assert.match(await page.title(),/Home Solar/);
 assert.ok(await page.locator('main').innerText().then(t=>t.length>2000),'Home page needs substantive distinct content');
 console.log('PASS: home solar page resolves with distinct substantial content');
}finally{await browser.close();}
