import {chromium} from 'playwright-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const out=process.env.QA_OUT||'qa/technical';
fs.mkdirSync(out,{recursive:true});
const mode=process.env.MODE||'before',base=process.env.BASE||'https://brightsolar.com.ph';
const b=await chromium.launch({executablePath:'/usr/sbin/chromium',headless:true,args:['--no-sandbox']});
const results=[];
try {
 for(const width of [320,390,768,1440]){
  const p=await b.newPage({viewport:{width,height:950},reducedMotion:'reduce'});
  await p.goto(base); await p.evaluate(()=>document.fonts.ready);
  if(mode!=='before'){const skip=await p.locator('.skip-link').boundingBox();assert(skip.y+skip.height<0,'skip link must be offscreen before focus');}
  const before=await p.locator('.mega-brand img').boundingBox();
  const svg=await (await p.request.get(base+(mode==='before'?'/bright-solar-logo.svg':'/bright-solar-logo-header.svg'))).text();
  const bounds=await p.evaluate(svg=>{const div=document.createElement('div');div.innerHTML=svg;document.body.append(div);const s=div.querySelector('svg'); const bb=s.getBBox(); const r={x:bb.x,y:bb.y,width:bb.width,height:bb.height,viewBox:s.getAttribute('viewBox')};div.remove();return r;},svg);
  const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  await p.screenshot({path:`${out}/logo-${mode}-${width}.png`});
  await p.locator('#mega-toggle').click(); await p.locator('#mega-panel').waitFor({state:'visible'});
  await p.screenshot({path:`${out}/menu-${mode}-${width}.png`});
  await p.locator('#mega-panel a[href="/home-solar/"]').click(); await p.waitForURL('**/home-solar/');
  assert.equal(await p.locator('h1').count(),1);
  await p.locator('#mega-toggle').click(); await p.keyboard.press('Escape'); assert.equal(await p.locator('#mega-nav').getAttribute('open'),null);
  const data={width,logo:before,bounds,overflow,menuNavigation:true};results.push(data);
  await p.close();
 }
 fs.writeFileSync(`${out}/logo-${mode}.json`,JSON.stringify(results,null,2));
 console.log(results);
 if(mode!=='before') for(const r of results){assert(!r.overflow);assert(r.logo.width>=176);}
}finally {await b.close();}
