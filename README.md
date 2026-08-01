# Bright Solar Philippines website

A responsive Bright Solar website for Philippine home, commercial, hybrid, battery and off-grid solar enquiries. Built with Astro and Tailwind CSS.

## Included

- Approved Bright Solar blue-and-orange identity
- Five supplied project and equipment photographs
- Current Felicity Solar panel, inverter and LiFePO4 battery families
- Residential, commercial, hybrid and off-grid system routes
- Practical bill, roof, electrical and connection assessment guidance
- Clear Bright Solar and implementation-partner responsibility split
- Accessible enquiry form preview with partner-routing consent
- Mobile navigation and FAQ interactions
- SEO and privacy/source-claim QA scripts

## Run locally

```bash
npm install
npm run check
npm run build
npm run preview -- --host 127.0.0.1 --port 4322
```

With the production preview running:

```bash
node scripts/interaction-qa.mjs
node scripts/a11y-qa.mjs
python scripts/seo-qa.py
python scripts/privacy-source-qa.py
```

## Before public launch

- Add the verified Bright Solar phone number, email and confirmed service areas.
- Connect the enquiry form to a secure CRM, email platform or API.
- Add the final privacy policy and terms.
- Configure the live domain, canonical URL, Open Graph image and production analytics.
- Confirm current equipment availability, exact model compatibility, warranty route and implementation scope for every customer proposal.

## Commercial and technical boundary

Bright Solar provides buyer education, initial assessment, qualification and project routing. Appointed implementation partners own final engineering, site survey, installation, permits, warranty registration and after-sales for agreed projects.

Equipment capabilities, availability and warranty terms vary by exact model, design, installation site and current manufacturer policy.

## Stack

- Astro 7
- Tailwind CSS 4
- Lucide Astro icons
- Playwright-based interaction and rendered QA
- Axe accessibility QA
