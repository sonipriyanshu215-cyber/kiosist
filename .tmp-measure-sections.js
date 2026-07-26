const { chromium } = require("playwright-chromium");

(async () => {
  const browser = await chromium.launch();

  for (const [name, url] of [["local", "http://localhost:3000"], ["prod", "https://kiosist.vercel.app"]]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(url, { waitUntil: "load", timeout: 45000 });
    await page.waitForTimeout(5000);
    try {
      await page.getByRole("button", { name: /explore now/i }).click({ timeout: 5000 });
      await page.waitForTimeout(1000);
    } catch {}

    const data = await page.evaluate(() => {
      const main = document.querySelector("main") || document.body;
      const sections = Array.from(document.querySelectorAll("section"));
      return sections.map((s, i) => {
        const r = s.getBoundingClientRect();
        const cs = getComputedStyle(s);
        const heading = s.querySelector("h1,h2,h3");
        return {
          i,
          top: Math.round(r.top + window.scrollY),
          height: Math.round(r.height),
          paddingTop: cs.paddingTop,
          paddingBottom: cs.paddingBottom,
          heading: heading ? heading.textContent.trim().slice(0, 40) : null,
          class: s.className.slice(0, 60),
        };
      });
    });
    console.log(`\n=== ${name} (document height: ${await page.evaluate(() => document.body.scrollHeight)}) ===`);
    for (const d of data) {
      console.log(`[${d.i}] top=${d.top} h=${d.height} pad=${d.paddingTop}/${d.paddingBottom} heading="${d.heading}"`);
    }
    await page.close();
  }

  await browser.close();
})();
