import { chromium } from 'playwright-core';

const executablePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const baseUrl = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4322';
const browser = await chromium.launch({ headless: true, executablePath });
const results = { wideDesktop: {}, desktop: {}, mobile: {}, errors: [] };

async function run(viewport, mode) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  const title = await page.title();
  const h1 = (await page.locator('h1').textContent())?.replace(/\s+/g, ' ').trim();
  const width = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));

  if (mode === 'mobile') {
    await page.locator('#menu-open').click();
    const menuVisible = await page.locator('#mobile-menu').isVisible();
    const bodyLocked = await page.evaluate(() => document.body.style.overflow === 'hidden');
    await page.locator('#menu-close').click();
    const menuClosed = !(await page.locator('#mobile-menu').isVisible());
    results.mobile.menu = { menuVisible, bodyLocked, menuClosed };
  }

  await page.locator('#faq details').first().locator('summary').click();
  const faqOpen = await page.locator('#faq details').first().evaluate((el) => el.open);

  await page.locator('input[name="name"]').fill('Demo User');
  await page.locator('input[name="email"]').fill('demo@example.com');
  await page.locator('input[name="location"]').fill('Quezon City');
  await page.locator('label.interest-pill').filter({ hasText: 'Grid-connected solar' }).click();
  const interestChecked = await page.locator('input[value="solar"]').isChecked();
  await page.locator('input[name="partner-consent"]').check();
  const consentChecked = await page.locator('input[name="partner-consent"]').isChecked();
  await page.locator('#assessment-form button[type="submit"]').click();
  const formSuccess = await page.locator('#form-success').isVisible();
  const projectImages = await page.locator('#projects .project-photo img').count();

  const galleryImages = page.locator('#projects .project-photo img');
  for (let index = 0; index < await galleryImages.count(); index += 1) {
    await galleryImages.nth(index).scrollIntoViewIfNeeded();
  }
  await page.waitForFunction(() => [...document.images].every((img) => img.complete));
  const brokenImages = await page.evaluate(() => [...document.images].filter((img) => img.naturalWidth === 0).map((img) => img.src));
  results[mode] = {
    ...results[mode],
    title,
    h1,
    width,
    faqOpen,
    formSuccess,
    interestChecked,
    consentChecked,
    projectImages,
    brokenImages,
    consoleErrors,
  };
  await page.close();
}

await run({ width: 1920, height: 1080 }, 'wideDesktop');
await run({ width: 1440, height: 1000 }, 'desktop');
await run({ width: 390, height: 844 }, 'mobile');
await browser.close();

const failed = [];
if (results.desktop.title !== 'Solar Systems Philippines | Bright Solar') failed.push('desktop title');
if (!results.desktop.h1?.includes('matched to your property and priorities')) failed.push('desktop h1');
if (results.wideDesktop.width.document !== results.wideDesktop.width.viewport) failed.push('wide desktop overflow');
if (results.desktop.width.document !== results.desktop.width.viewport) failed.push('desktop overflow');
if (results.mobile.width.document !== results.mobile.width.viewport) failed.push('mobile overflow');
if (!results.wideDesktop.faqOpen || !results.desktop.faqOpen || !results.mobile.faqOpen) failed.push('faq interaction');
if (!results.wideDesktop.formSuccess || !results.desktop.formSuccess || !results.mobile.formSuccess) failed.push('form interaction');
if (!results.wideDesktop.interestChecked || !results.desktop.interestChecked || !results.mobile.interestChecked) failed.push('interest control');
if (!results.wideDesktop.consentChecked || !results.desktop.consentChecked || !results.mobile.consentChecked) failed.push('partner consent');
if (results.wideDesktop.projectImages !== 5 || results.desktop.projectImages !== 5 || results.mobile.projectImages !== 5) failed.push('project image count');
if (!results.mobile.menu?.menuVisible || !results.mobile.menu?.bodyLocked || !results.mobile.menu?.menuClosed) failed.push('mobile menu');
if (results.wideDesktop.brokenImages.length || results.desktop.brokenImages.length || results.mobile.brokenImages.length) failed.push('broken image');
if (results.wideDesktop.consoleErrors.length || results.desktop.consoleErrors.length || results.mobile.consoleErrors.length) failed.push('console error');
results.passed = failed.length === 0;
results.failed = failed;
console.log(JSON.stringify(results, null, 2));
process.exit(results.passed ? 0 : 1);
