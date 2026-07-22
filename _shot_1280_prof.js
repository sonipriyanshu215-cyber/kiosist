const { chromium } = require('playwright-chromium');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(4200);
  await page.click('button:has-text("Explore Now")');
  await page.waitForTimeout(1000);
  // cycle through to find Professionalism specifically (poll every 500ms, check text content)
  for (let i = 0; i < 22; i++) {
    const text = await page.locator('h1').innerText();
    if (text.includes('Professionalism')) break;
    await page.waitForTimeout(500);
  }
  await page.screenshot({ path: '1280-professionalism.png' });
  await browser.close();
})();
