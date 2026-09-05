# Bright Solar launch checklist

## Implemented locally

The homepage links to six distinct routes: `/home-solar/`, `/commercial-solar/`, `/hybrid-solar/`, `/off-grid-solar/`, `/solar-panel-cost/` and `/net-metering/`. Each includes Felicity Solar product-range context, a decision tool and links to related pages. `/assessment/` builds and downloads a local brief. It does not send an enquiry. `/privacy/` describes that behaviour.

## Passed checks for this expansion

- Astro type check: zero errors, warnings or hints.
- Static build: nine pages.
- All six route decision controls tested, including invalid raw-load input.
- Homepage slider, battery mode, four goals and assessment routing tested at 390, 768 and 1440 pixels.
- Full-site Chromium and automated WCAG A/AA scan: 18 page/viewport combinations, no reported violations, overflow, broken images or JavaScript exceptions.
- Six new routes also checked at 320 pixels.
- Internal links: 217 links checked against nine generated pages, including target fragments; no missing targets.
- Local brief creation/download and no fake send confirmation tested.
- SEO and privacy source checks passed.
- Independent bounded expansion code/security review passed. This is not public-launch approval.
- npm audit: zero reported vulnerabilities after lockfile update.

## Launch remains blocked

1. Confirm the public domain and hosting target. Set Astro's `site` option in `astro.config.mjs` to that confirmed origin, then verify canonical URLs, social URLs, crawl directives and sitemap on the actual deployed origin.
2. Supply the approved business contact and enquiry destination. Implement delivery, appropriate privacy/consent controls and spam protection, then verify receipt end to end. The current local brief tool is not lead delivery.
3. Confirm the currently offered Felicity Solar models and supporting documentation. The old homepage's numeric panel, inverter and battery ranges remain supplied legacy copy, not independently verified current stock or model specifications.
4. Confirm geographical service coverage and responsibility for technical design, installation and after-sales before expanding those claims.
5. Run final HTTPS, live navigation, form delivery and performance checks on the public site. Repository CI and localhost checks do not prove deployment.

## Reproduce local QA

Run `npm ci`, `npm run check` and `npm run build`. Start `npm run preview -- --host 127.0.0.1 --port 4322` in a separate process. Then run:

```sh
npm run qa:seo
npm run qa:privacy
node scripts/daylight-qa.mjs
node scripts/routes-qa.mjs
node scripts/planner-qa.mjs
node scripts/brief-qa.mjs
node scripts/navigation-qa.mjs
node scripts/site-browser-qa.mjs
npm audit
```

Browser scripts require a Chromium executable. Most accept `CHROME_PATH`; the existing daylight script uses `/opt/google/chrome/chrome`. Automated accessibility checks supplement, but do not replace, manual accessibility testing.

## Article work

A separate local research plan proposes ten supporting topics. No articles were written or published in this expansion. Long-tail volumes have not been measured; priorities reflect buyer usefulness, not traffic forecasts. Product-specific articles require the confirmed offered model list and matching manufacturer evidence first.
