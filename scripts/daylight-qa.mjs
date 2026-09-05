import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const browser=await chromium.launch({executablePath:'/opt/google/chrome/chrome',headless:true});
const results=[];
try {
 for(const width of [390,768,1440]){
  const page=await browser.newPage({viewport:{width,height:950},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4322');
  assert.equal(await page.locator('h1').count(),1);
  await page.locator('#sun-time').focus();
  await page.keyboard.press('End');
  assert.match(await page.locator('#energy-heading').innerText(),/grid takes over/);
  await page.locator('#battery-mode').check();
  assert.match(await page.locator('#energy-heading').innerText(),/Stored energy/);
  for(const value of ['backup','business','remote','day']){
   await page.selectOption('#solar-goal',value);
   assert.equal(await page.locator('#route-checklist li').count(),3);
  }
  await page.selectOption('#solar-goal','backup');
  await page.locator('#route-action').click();
  await page.waitForURL('**/assessment/?system=hybrid-solar');
  assert.equal(await page.locator('#brief-system').inputValue(),'hybrid-solar');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  assert.deepEqual(errors,[]);
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:`preview-${width}.png`});
  results.push({width,passed:true,checks:['single H1','keyboard time slider','battery toggle','four goal routes','brief transfer','no horizontal overflow','no JS errors']});
  await page.close();
 }
 fs.writeFileSync('daylight-qa.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
} finally {await browser.close();}
