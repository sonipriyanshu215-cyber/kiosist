const { chromium } = require('playwright-chromium');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(4200);
  await page.click('button:has-text("Explore Now")');
  await page.waitForTimeout(1000);

  // capture all 4 words in sequence (5s interval)
  await page.screenshot({ path: '1024-word-a.png' }); // whatever's showing ~5.2s post-load
  await page.waitForTimeout(5000);
  await page.screenshot({ path: '1024-word-b.png' });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: '1024-word-c.png' });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: '1024-word-d.png' });

  await browser.close();
})();
