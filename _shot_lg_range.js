const { chromium } = require('playwright-chromium');

(async () => {
  const browser = await chromium.launch();
  const widths = [1024, 1152, 1279, 1280, 1440];
  for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto('http://localhost:3000', { waitUntil: 'load' });
    await page.waitForTimeout(4200);
    await page.click('button:has-text("Explore Now")');
    await page.waitForTimeout(1000);
    await page.waitForTimeout(9200); // land on Professionalism. (worst case, longest word)
    await page.screenshot({ path: `lg-${w}.png` });
    await page.close();
  }
  await browser.close();
})();
