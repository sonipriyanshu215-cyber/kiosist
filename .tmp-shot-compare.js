const { chromium } = require("playwright-chromium");

const OUT = "C:/Users/PRIYAN~1/AppData/Local/Temp/claude/e--kiosist/8b98c9f2-1d05-4baf-932b-a8c3b7f0fecd/scratchpad";

(async () => {
  const browser = await chromium.launch();

  const targets = [
    { name: "local", url: "http://localhost:3000" },
    { name: "prod", url: "https://kiosist.vercel.app" },
  ];

  for (const t of targets) {
    for (const [label, width, height] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
      const page = await browser.newPage({ viewport: { width, height } });
      try {
        await page.goto(t.url, { waitUntil: "load", timeout: 45000 });
        await page.waitForTimeout(5000);
        await page.screenshot({ path: `${OUT}/${t.name}-${label}-intro.png`, fullPage: false });
        try {
          await page.getByRole("button", { name: /explore now/i }).click({ timeout: 5000 });
          await page.waitForTimeout(1200);
        } catch (e2) {
          console.log(`no explore-now button for ${t.name} ${label}: ${e2.message}`);
        }

        // Scroll through the whole page in steps so whileInView reveal
        // animations actually fire before the full-page screenshot.
        const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
        const step = height;
        for (let y = 0; y < scrollHeight; y += step) {
          await page.evaluate((y) => window.scrollTo(0, y), y);
          await page.waitForTimeout(350);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);

        await page.screenshot({ path: `${OUT}/${t.name}-${label}.png`, fullPage: true });
        console.log(`OK ${t.name} ${label}`);
      } catch (e) {
        console.log(`FAIL ${t.name} ${label}: ${e.message}`);
      }
      await page.close();
    }
  }

  await browser.close();
  console.log("done");
})();
