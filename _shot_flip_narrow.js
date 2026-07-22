const { chromium } = require('playwright-chromium');

(async () => {
  const browser = await chromium.launch();
  const widths = [375, 360, 320];
  for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 800 } });
    await page.goto('http://localhost:3000', { waitUntil: 'load' });
    await page.waitForTimeout(4200);
    await page.click('button:has-text("Explore Now")');
    await page.waitForTimeout(1000);
    // land on Professionalism. (fires at t=10s from load)
    await page.waitForTimeout(9200);
    await page.screenshot({ path: `narrow-${w}.png` });
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    console.log(`width ${w}:`, JSON.stringify(overflow));
    await page.close();
  }
  await browser.close();
})();
