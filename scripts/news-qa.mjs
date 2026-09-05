import {chromium} from 'playwright-core';import assert from 'node:assert/strict';
const expected=[
  'reading-meralco-bill-solar-assessment',
  'solar-panels-during-brownout',
  'business-opening-hours-solar-savings',
  'meralco-bill-after-solar',
  'roof-shade-solar-site-survey',
  'felicity-solar-battery-runtime',
  'solar-warranties-panels-inverters-labour',
  'solar-output-rainy-season-philippines',
  'off-grid-appliance-load-list',
];
const b=await chromium.launch({executablePath:'/opt/google/chrome/chrome'});
try{
  const p=await b.newPage();
  const hub=await p.goto('http://127.0.0.1:4322/news/');
  assert.equal(hub.status(),200);
  assert.equal(await p.locator('h1').count(),1);
  const text=await p.locator('main').innerText();
  assert.doesNotMatch(text,/No articles published yet/);
  assert.doesNotMatch(text,/Can Solar Credits Be Shared Across Electricity Accounts/);
  for(const slug of expected){
    assert.notEqual(await p.locator(`a[href="/news/${slug}/"]`).count(),0, slug);
  }
  for(const slug of expected){
    const r=await p.goto('http://127.0.0.1:4322/news/'+slug+'/');
    assert.equal(r.status(),200, slug);
    assert.equal(await p.locator('h1').count(),1, slug);
    assert.equal(await p.locator('a[href="/news/"]').count()>0, true, slug+' back to news');
  }
  const missing=await p.goto('http://127.0.0.1:4322/news/can-solar-credits-be-shared-across-electricity-accounts/');
  assert.equal(missing.status(),404);
  for(const route of ['/','/home-solar/']){
    await p.goto('http://127.0.0.1:4322'+route);
    assert.notEqual(await p.locator('a[href="/news/"]').count(),0);
  }
  console.log('PASS news hub with 9 articles, no A10, article pages 200');
}finally{await b.close();}
