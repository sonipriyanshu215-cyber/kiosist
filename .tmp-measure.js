const { chromium } = require('playwright-chromium');

const WIDTHS = [320, 360, 375, 390, 414, 430, 600, 700, 768, 834, 900, 962, 1000, 1024, 1050, 1100, 1150, 1200, 1280, 1366, 1440, 1536, 1680, 1920];

(async () => {
  const browser = await chromium.launch();
  const results = [];

  for (const w of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 60000 });
    await page.getByRole('button', { name: /explore now/i }).click();
    await page.waitForTimeout(900);

    const words = [];
    for (let i = 0; i < 4; i++) {
      const data = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        const title = h1.children[0];
        const line2 = h1.children[1];
        const cyclingWord = line2.querySelector('.text-color-cycle');
        const colEl = h1.closest('div');
        const colWidth = colEl.clientWidth;
        return {
          titleScrollW: title.scrollWidth,
          titleOverflow: title.scrollWidth > colWidth + 1,
          line2ScrollW: line2.scrollWidth,
          line2Overflow: line2.scrollWidth > colWidth + 1,
          colWidth,
          word: cyclingWord ? cyclingWord.textContent : null,
        };
      });
      words.push(data);
      await page.waitForTimeout(2650);
    }
    results.push({ width: w, samples: words });
    await page.close();
  }

  await browser.close();
  for (const r of results) {
    for (const s of r.samples) {
      if (s.titleOverflow || s.line2Overflow) {
        console.log(`W=${r.width} word="${s.word}" colW=${s.colWidth} titleScrollW=${s.titleScrollW}(${s.titleOverflow ? 'OVERFLOW' : 'ok'}) line2ScrollW=${s.line2ScrollW}(${s.line2Overflow ? 'OVERFLOW' : 'ok'})`);
      }
    }
  }
  console.log('MEASURE DONE');
})();
