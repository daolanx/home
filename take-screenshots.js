const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3000';

async function takeScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const configs = [
    { name: 'screenshot-en-light', url: `${BASE_URL}/en`, theme: 'light' },
    { name: 'screenshot-en-dark', url: `${BASE_URL}/en`, theme: 'dark' },
    { name: 'screenshot-zh-light', url: `${BASE_URL}/zh`, theme: 'light' },
    { name: 'screenshot-zh-dark', url: `${BASE_URL}/zh`, theme: 'dark' },
  ];

  for (const config of configs) {
    const page = await context.newPage();

    await page.goto(config.url, { waitUntil: 'networkidle' });

    // Set theme
    await page.evaluate((theme) => {
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }, config.theme);

    // Wait for theme to apply
    await page.waitForTimeout(500);

    // Take full page screenshot
    await page.screenshot({
      path: `${config.name}.png`,
      fullPage: true,
    });

    console.log(`✓ ${config.name}.png`);
    await page.close();
  }

  await browser.close();
  console.log('\nAll screenshots taken!');
}

takeScreenshots().catch(console.error);
