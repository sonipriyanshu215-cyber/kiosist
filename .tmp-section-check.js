const { chromium } = require("playwright-chromium");

const route = process.argv[2] || "/";
const sectionIndex = parseInt(process.argv[3] || "0", 10);
const outName = process.argv[4] || "section";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "load", timeout: 30000 });
  await page.waitForTimeout(500);
  const exploreBtn = page.locator(".explore-btn");
  if (await exploreBtn.count()) {
    await exploreBtn.click();
    await page.waitForTimeout(1000);
  }
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 500) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const el = page.locator("main section").nth(sectionIndex);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await el.screenshot({ path: `E:/kiosist/.tmp-${outName}.png` });

  const overflow = await page.evaluate(() => ({
    docWidth: document.documentElement.scrollWidth,
    winWidth: window.innerWidth,
  }));
  console.log(JSON.stringify(overflow));
  await browser.close();
})();
