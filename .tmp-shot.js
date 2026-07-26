const { chromium } = require("playwright-chromium");

(async () => {
  const browser = await chromium.launch();
  for (const [name, width, height] of [["desktop", 1440, 2600], ["mobile", 390, 3200]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto("http://localhost:3000", { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(1500);
    const exploreBtn = page.locator("text=Explore Now");
    if (await exploreBtn.count()) {
      await exploreBtn.click();
      await page.waitForTimeout(1000);
    }
    await page.screenshot({ path: `E:/kiosist/.tmp-${name}.png`, fullPage: true });
    await page.close();
  }
  await browser.close();
  console.log("done");
})();
