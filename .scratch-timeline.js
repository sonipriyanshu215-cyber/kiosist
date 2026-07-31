const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1920, height: 1000 } });
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto('http://localhost:3000/about', { waitUntil: 'load', timeout: 60000 });
  await page.click('.explore-btn');
  await page.waitForTimeout(600);
  const el = await page.locator('text=Every Great').first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'C:\\Users\\PRIYAN~1\\AppData\\Local\\Temp\\claude\\e--kiosist\\04312601-963d-4d9f-a84f-f43632487950\\scratchpad\\timeline-1920.png' });
  await page.mouse.wheel(0, 700);
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:\\Users\\PRIYAN~1\\AppData\\Local\\Temp\\claude\\e--kiosist\\04312601-963d-4d9f-a84f-f43632487950\\scratchpad\\timeline-1920-years.png' });
  console.log('ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
