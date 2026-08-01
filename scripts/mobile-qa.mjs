import { chromium } from 'playwright-core';

const baseUrl = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4322';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
const metrics = await page.evaluate(() => {
  const offenders = [...document.querySelectorAll('body *')]
    .map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        id: el.id,
        cls: typeof el.className === 'string' ? el.className.slice(0, 140) : '',
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
      };
    })
    .filter((item) => item.right > window.innerWidth + 1 || item.left < -1 || item.width > window.innerWidth + 1)
    .sort((a, b) => b.right - a.right)
    .slice(0, 25);
  return {
    viewport: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    offenders,
  };
});
await page.screenshot({ path: '.qa/bright-solar-mobile-playwright.png', fullPage: true });
console.log(JSON.stringify(metrics, null, 2));
await browser.close();
