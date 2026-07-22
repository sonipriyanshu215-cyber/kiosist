const { chromium } = require('playwright-chromium');

const widths = [1024, 1152, 1279, 1280, 1440, 1920];

(async () => {
  const browser = await chromium.launch();
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto('http://localhost:3000', { waitUntil: 'load' });
    await page.waitForTimeout(4200);
    await page.click('button:has-text("Explore Now")');
    await page.waitForTimeout(1000);
    for (let i = 0; i < 22; i++) {
      const text = await page.locator('h1').innerText();
      if (text.includes('Professionalism')) break;
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: `verify-${width}.png` });
    await page.close();
  }
  await browser.close();
})();
