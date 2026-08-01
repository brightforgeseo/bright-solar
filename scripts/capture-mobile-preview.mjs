import { chromium } from 'playwright-core';

const baseUrl = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4322';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
});
const page = await context.newPage();
await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
await page.screenshot({
  path: '.qa/bright-solar-mobile-preview.png',
  fullPage: false,
});
await browser.close();
console.log('Created .qa/bright-solar-mobile-preview.png');
