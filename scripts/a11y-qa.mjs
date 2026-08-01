import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';

const baseUrl = process.env.QA_BASE_URL ?? 'http://127.0.0.1:4322';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});

const report = {};
for (const config of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  const context = await browser.newContext({ viewport: { width: config.width, height: config.height } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  report[config.name] = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    nodes: violation.nodes.length,
    targets: violation.nodes.flatMap((node) => node.target),
  }));
  await page.close();
  await context.close();
}

await browser.close();
report.passed = report.desktop.length === 0 && report.mobile.length === 0;
console.log(JSON.stringify(report, null, 2));
process.exit(report.passed ? 0 : 1);
