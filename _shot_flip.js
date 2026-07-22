const { chromium } = require('playwright-chromium');

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(String(err)));

  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(4200);
  await page.click('button:has-text("Explore Now")');
  await page.waitForTimeout(1000);

  // Cycles every 5s; capture each of the 4 words
  await page.screenshot({ path: 'flip-1.png' });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'flip-2.png' });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'flip-3.png' });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'flip-4.png' });

  console.log('CONSOLE ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
