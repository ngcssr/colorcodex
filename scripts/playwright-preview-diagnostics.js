const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const base = process.argv[2] || 'http://127.0.0.1:4190';
const version = process.argv[3] || '20260627-171500';
const chromiumPath = process.argv[4] || 'C:\\Users\\Administrator\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win64\\chrome.exe';
const outDir = path.resolve(__dirname, '..', 'playwright-diagnostics');

fs.mkdirSync(outDir, { recursive: true });

async function collect(page, label) {
  const data = await page.evaluate((label) => {
    const strip = document.querySelector('#hccTopStrip');
    const stripItems = strip ? Array.from(strip.querySelectorAll('i')).map((el, i) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        i,
        text: el.textContent,
        className: el.className,
        color: cs.color,
        fontSize: cs.fontSize,
        width: Math.round(r.width * 100) / 100,
        left: Math.round(r.left * 100) / 100,
        pointerEvents: cs.pointerEvents
      };
    }) : [];
    const toast = document.querySelector('#hccToast');
    const toastCs = toast ? getComputedStyle(toast) : null;
    return {
      label,
      href: location.href,
      htmlLang: document.documentElement.lang || document.documentElement.getAttribute('lang'),
      htmlClass: document.documentElement.className,
      bodyPage: document.body && document.body.getAttribute('data-hcc-page'),
      assetVersion: window.HCC_ASSET_VERSION,
      routeLang: window.HCC_ROUTE_LANG,
      forcedLang: window.HCC_ROUTE_FORCED_LANG,
      localStorageLang: localStorage.getItem('hccLang'),
      localStorageManual: localStorage.getItem('hccLangManual'),
      swControlled: !!(navigator.serviceWorker && navigator.serviceWorker.controller),
      topHex: document.querySelector('#hccTopHex')?.textContent || '',
      inputValue: document.querySelector('#hccColorValue')?.value || '',
      miniValue: document.querySelector('#hccMiniHexInput')?.value || '',
      format: document.querySelector('#hccFormat')?.value || '',
      imageTitle: document.querySelector('.hcc-image-empty b')?.textContent || '',
      imageHint: document.querySelector('.hcc-image-empty span')?.textContent || '',
      toast: toast ? {
        text: toast.textContent,
        className: toast.className,
        visibility: toastCs.visibility,
        opacity: toastCs.opacity,
        display: toastCs.display
      } : null,
      stripClass: strip?.className || '',
      hoveredCount: stripItems.filter((item) => item.className.includes('is-hovered')).length,
      stripItems
    };
  }, label);
  await page.screenshot({ path: path.join(outDir, `${label}.png`), fullPage: false });
  return data;
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: chromiumPath,
    args: ['--disable-gpu', '--no-sandbox']
  });
  const context = await browser.newContext({
    viewport: { width: 1365, height: 900 },
    deviceScaleFactor: 1,
    bypassCSP: true
  });
  const page = await context.newPage();
  const out = [];

  await page.goto(`${base}/color-picker/?v=${version}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.setItem('hccLang', 'zh');
    localStorage.setItem('hccLangManual', '1');
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  out.push(await collect(page, 'color-after-reload-with-zh-localStorage'));

  const strip = page.locator('#hccTopStrip');
  const box = await strip.boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
    await page.waitForTimeout(260);
    out.push(await collect(page, 'color-hover-first-move'));
    await page.mouse.move(box.x + box.width * 0.52, box.y + box.height * 0.5);
    await page.waitForTimeout(260);
    out.push(await collect(page, 'color-hover-second-move'));
  }

  await page.goto(`${base}/image-color-picker/?v=${version}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  out.push(await collect(page, 'image-en-after-zh-localStorage'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  out.push(await collect(page, 'image-en-after-reload'));

  await fs.promises.writeFile(path.join(outDir, 'diagnostics.json'), JSON.stringify(out, null, 2));
  console.log(JSON.stringify({ outDir, items: out }, null, 2));
  await browser.close();
}

main().catch((err) => {
  console.error(err && err.stack || err);
  process.exit(1);
});
