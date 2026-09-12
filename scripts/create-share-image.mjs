import fs from 'node:fs';
import { chromium } from 'playwright-core';
const image=(file,mime)=>`data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
const browser=await chromium.launch({headless:true,executablePath:'/usr/sbin/chromium'});
try {
const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
await page.setContent(`<!doctype html><html><head><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet"><style>*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#102b42;color:white;font-family:Inter,sans-serif;overflow:hidden}.photo{position:absolute;right:0;top:0;width:550px;height:630px;object-fit:cover;object-position:55% center}.shade{position:absolute;inset:0;background:linear-gradient(90deg,#102b42 0%,#102b42 49%,rgba(16,43,66,.15) 73%,rgba(16,43,66,.06))}.copy{position:absolute;inset:48px auto 44px 52px;width:630px}.logo{width:400px;height:90px;object-fit:contain;object-position:left}.line{width:65px;height:5px;background:#f79535;margin-top:26px}h1{font-size:62px;line-height:1.08;letter-spacing:-2px;margin:26px 0 20px;font-weight:800}h1 span{color:#ffae4b}p{font-size:21px;margin:0 0 9px;color:#f0f3f6}.equipment{font-size:17px;color:#bfccd5}.domain{position:absolute;bottom:0;font-size:19px;font-weight:600;letter-spacing:.3px}</style></head><body><img class="photo" src="${image('public/rooftop-solar-array.webp','image/webp')}"><div class="shade"></div><div class="copy"><img class="logo" src="${image('public/bright-solar-logo-reversed.svg','image/svg+xml')}"><div class="line"></div><h1>Your roof.<br>Your power.<br><span>A brighter day.</span></h1><p>Solar for homes &amp; businesses</p><p class="equipment">Featuring Felicity Solar equipment</p><div class="domain">brightsolar.com.ph</div></div></body></html>`,{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
await page.waitForFunction(()=>Array.from(document.images).every(i=>i.complete&&i.naturalWidth>0));
if(!await page.evaluate(()=>Array.from(document.fonts).some(f=>f.family==='Inter'&&f.status==='loaded')))throw Error('Inter did not load');
await page.screenshot({path:'public/og.jpg',type:'jpeg',quality:91});
console.log('Created public/og.jpg at 1200x630');
}finally{await browser.close();}
