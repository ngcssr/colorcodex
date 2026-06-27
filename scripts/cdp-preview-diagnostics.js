const http = require('http');

const port = Number(process.argv[2] || 9223);
const base = process.argv[3] || 'http://127.0.0.1:4190';
const version = process.argv[4] || '20260627-171500';

function requestJson(url, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { method }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (err) { reject(new Error(`${method} ${url} returned non-JSON: ${data.slice(0, 140)}`)); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.seq = 0;
    this.pending = new Map();
    this.events = [];
    this.ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result || {});
      } else if (msg.method) {
        this.events.push(msg);
      }
    });
  }
  async ready() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    await new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
    });
  }
  send(method, params = {}) {
    const id = ++this.seq;
    const payload = JSON.stringify({ id, method, params });
    this.ws.send(payload);
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`CDP timeout: ${method}`));
        }
      }, 10000);
    });
  }
  close() {
    this.ws.close();
  }
}

async function createPage() {
  let page;
  try {
    page = await requestJson(`http://127.0.0.1:${port}/json/new?about:blank`, 'PUT');
  } catch (_) {
    const pages = await requestJson(`http://127.0.0.1:${port}/json/list`);
    page = pages.find((item) => item.type === 'page') || pages[0];
  }
  const cdp = new CDP(page.webSocketDebuggerUrl);
  await cdp.ready();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('DOM.enable');
  await cdp.send('CSS.enable');
  await cdp.send('Network.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1365, height: 900, deviceScaleFactor: 1, mobile: false });
  return cdp;
}

async function evaluate(cdp, expression) {
  const res = await cdp.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true
  });
  if (res.exceptionDetails) return { exception: res.exceptionDetails.text || res.exceptionDetails.exception?.description };
  return res.result ? res.result.value : undefined;
}

async function goto(cdp, url) {
  await cdp.send('Page.navigate', { url });
  await sleep(1400);
}

async function collect(cdp, label) {
  return evaluate(cdp, `(() => {
    const css = getComputedStyle(document.documentElement);
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
        display: cs.display,
        visibility: cs.visibility,
        overflow: cs.overflow
      };
    }) : [];
    const toast = document.querySelector('#hccToast');
    const toastCs = toast ? getComputedStyle(toast) : null;
    const imageTitle = document.querySelector('.hcc-image-empty b');
    const imageHint = document.querySelector('.hcc-image-empty span');
    const mini = document.querySelector('#hccMiniHexInput');
    const main = document.querySelector('#hccColorValue');
    const active = document.activeElement;
    const sw = navigator.serviceWorker ? {
      controller: !!navigator.serviceWorker.controller
    } : null;
    return {
      label: ${JSON.stringify(label)},
      href: location.href,
      lang: document.documentElement.lang || document.documentElement.getAttribute('lang'),
      htmlClass: document.documentElement.className,
      assetVersion: window.HCC_ASSET_VERSION,
      routeLang: window.HCC_ROUTE_LANG,
      forcedLang: window.HCC_ROUTE_FORCED_LANG,
      topHex: document.querySelector('#hccTopHex')?.textContent || '',
      inputValue: main?.value || '',
      miniValue: mini?.value || '',
      format: document.querySelector('#hccFormat')?.value || '',
      activeId: active && active.id,
      toast: toast ? { text: toast.textContent, className: toast.className, visibility: toastCs.visibility, opacity: toastCs.opacity, display: toastCs.display } : null,
      imageTitle: imageTitle?.textContent || '',
      imageHint: imageHint?.textContent || '',
      stripClass: strip?.className || '',
      stripCount: stripItems.length,
      stripItems,
      localStorageLang: (() => { try { return localStorage.getItem('hccLang') } catch (_) { return null } })(),
      localStorageManual: (() => { try { return localStorage.getItem('hccLangManual') } catch (_) { return null } })(),
      serviceWorker: sw
    };
  })()`);
}

async function moveTo(cdp, x, y) {
  await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
  await sleep(260);
}

async function run() {
  const cdp = await createPage();
  const out = [];
  try {
    await goto(cdp, `${base}/color-picker/?v=${version}`);
    await evaluate(cdp, `localStorage.setItem('hccLang','zh'); localStorage.setItem('hccLangManual','1'); 'ok'`);
    await cdp.send('Page.reload', { ignoreCache: false });
    await sleep(1800);
    out.push(await collect(cdp, 'color-after-reload-with-zh-localStorage'));
    const rect = await evaluate(cdp, `(() => { const r=document.querySelector('#hccTopStrip').getBoundingClientRect(); return {left:r.left, top:r.top, width:r.width, height:r.height}; })()`);
    await moveTo(cdp, rect.left + rect.width * 0.5, rect.top + rect.height * 0.5);
    out.push(await collect(cdp, 'color-hover-first-move'));
    await moveTo(cdp, rect.left + rect.width * 0.52, rect.top + rect.height * 0.5);
    out.push(await collect(cdp, 'color-hover-second-move'));

    await goto(cdp, `${base}/image-color-picker/?v=${version}`);
    out.push(await collect(cdp, 'image-en-after-zh-localStorage'));
    await cdp.send('Page.reload', { ignoreCache: false });
    await sleep(1800);
    out.push(await collect(cdp, 'image-en-after-reload'));

    console.log(JSON.stringify(out, null, 2));
  } finally {
    cdp.close();
  }
}

run().catch((err) => {
  console.error(err && err.stack || err);
  process.exit(1);
});
