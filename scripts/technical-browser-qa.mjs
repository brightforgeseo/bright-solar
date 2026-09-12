import {chromium} from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.env.BASE||'http://127.0.0.1:4333';
const out=process.env.QA_OUT||'qa/technical';
const phase=process.env.PHASE||'local';
const routes=JSON.parse(fs.readFileSync(`${out}/local-seo.json`)).rows.map(x=>x.route);
const b=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/sbin/chromium',headless:true,args:['--no-sandbox']});
const results=[];fs.mkdirSync(`${out}/browser-${phase}`,{recursive:true});
try{
 for(const width of [390,1440]){
  const context=await b.newContext({viewport:{width,height:950},reducedMotion:'reduce'});
  const p=await context.newPage();
  for(const route of [...routes,'/technical-missing-404-probe/']){
   const errors=[];const onError=e=>errors.push(e.message);p.on('pageerror',onError);
   const response=await p.goto(base+route);
   await p.evaluate(async()=>{await document.fonts.ready;await Promise.all(Array.from(document.images).map(async i=>{i.loading='eager';try{await i.decode();}catch{}}));});
   const axe=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   const state=await p.evaluate(()=>({h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth,images:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),font:getComputedStyle(document.querySelector('h1')).fontFamily}));
   const logo=await p.locator('.mega-brand img').boundingBox();const toggle=await p.locator('#mega-toggle').boundingBox();
   const headerFits=logo.x>=0&&logo.x+logo.width<=toggle.x&&toggle.x+toggle.width<=width;
   await p.screenshot({path:`${out}/browser-${phase}/${route.replaceAll('/','_')||'home'}-${width}.png`,fullPage:true});
   await p.locator('#mega-toggle').click();assert(await p.locator('#mega-panel').isVisible());await p.keyboard.press('Escape');assert(!(await p.locator('#mega-panel').isVisible()));
   const row={route,width,status:response.status(),expected:route.includes('technical-missing')?404:200,...state,headerFits,logo,errors,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))};results.push(row);
   fs.writeFileSync(`${out}/browser-${phase}.json`,JSON.stringify(results,null,2));
   p.off('pageerror',onError);
  }
  await p.close();
 }
 const failures=results.filter(x=>x.status!==x.expected||x.h1!==1||x.overflow||x.images.length||!x.headerFits||x.errors.length||x.violations.length);
 console.log(JSON.stringify({surfaces:results.length,failures},null,2));assert.equal(failures.length,0);
}finally{await b.close();}
