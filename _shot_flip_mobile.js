const { chromium } = require('playwright-chromium');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(4200);
  await page.click('button:has-text("Explore Now")');
  await page.waitForTimeout(1000);

  // Force through cycle to land on "Professionalism." (2nd word, index 2 -> after ~10s from Technology start... let's just wait through cycles)
  await page.screenshot({ path: 'flipm-1.png' });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'flipm-2.png' });

  const overflow = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    };
  });
  console.log('OVERFLOW CHECK (word 2):', JSON.stringify(overflow));

  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'flipm-3.png' });
  const overflow2 = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  console.log('OVERFLOW CHECK (word 3):', JSON.stringify(overflow2));

  await browser.close();
})();
