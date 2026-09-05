import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/opt/google/chrome/chrome',headless:true});
try{const p=await browser.newPage();await p.goto('http://127.0.0.1:4322/hybrid-solar/');assert.equal(await p.locator('#load-watts').count(),1,'Hybrid page needs a load planner');await p.locator('#load-watts').fill('500');await p.locator('#load-hours').fill('4');assert.match(await p.locator('#planner-result').innerText(),/2.00 kWh/);await p.locator('#load-watts').fill('-2');assert.match(await p.locator('#planner-result').innerText(),/Enter/);console.log('PASS: raw load calculation and invalid input handling');}finally{await browser.close();}
