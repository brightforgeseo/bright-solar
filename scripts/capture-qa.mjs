import { chromium } from 'playwright-core';

const baseUrl = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4322';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});

for (const config of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: { width: config.width, height: config.height }, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  const galleryImages = page.locator('#projects .project-photo img');
  for (let index = 0; index < await galleryImages.count(); index += 1) {
    await galleryImages.nth(index).scrollIntoViewIfNeeded();
  }
  await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0));
  await page.locator('#top').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `.qa/bright-solar-${config.name}-full.png`, fullPage: true });
  await page.close();
}

await browser.close();
console.log('Captured desktop and mobile full-page screenshots.');
