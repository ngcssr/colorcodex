const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const newVersion = '20260627-171500';
const oldVersionRe = /20260627-(?:122000|123000|123500)/g;

const textExts = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.txt',
  '.webmanifest',
  '.xml'
]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name === 'node_modules' ||
        entry.name === '.git' ||
        entry.name === 'playwright-diagnostics' ||
        entry.name.startsWith('.chromium')
      ) {
        continue;
      }
      walk(full, files);
      continue;
    }
    if (textExts.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

function earlyBootScript(routeLang, forcedLang) {
  return `<script>(function(){document.documentElement.classList.add("hcc-hover-boot");window.HCC_ASSET_VERSION="${newVersion}";window.HCC_ROUTE_LANG="${routeLang}";window.HCC_ROUTE_FORCED_LANG="${forcedLang}";if(!("serviceWorker" in navigator)||!/^(?:localhost|127\\\\.0\\\\.0\\\\.1|::1)$/.test(location.hostname))return;var key="hccLocalPreviewClean-"+window.HCC_ASSET_VERSION;function clean(){var tasks=[];if(navigator.serviceWorker.getRegistrations){tasks.push(navigator.serviceWorker.getRegistrations().then(function(rs){return Promise.all(rs.map(function(r){return r.unregister()}))}).catch(function(){}))}if(window.caches&&caches.keys){tasks.push(caches.keys().then(function(keys){return Promise.all(keys.map(function(k){return /colorcodex|hcc/i.test(k)?caches.delete(k):Promise.resolve()}))}).catch(function(){}))}return Promise.all(tasks)}try{clean().then(function(){if(navigator.serviceWorker.controller&&sessionStorage.getItem(key)!=="1"){sessionStorage.setItem(key,"1");location.reload()}})}catch(_){}})();</script>`;
}

const productionSwScript = `<script>if("serviceWorker" in navigator){(function(){if(/^(?:localhost|127\\\\.0\\\\.0\\\\.1|::1)$/.test(location.hostname))return;window.addEventListener("load",function(){setTimeout(function(){navigator.serviceWorker.register("/sw.js?v=${newVersion}").catch(function(){})},4200)})})()}</script>`;

function updateHtml(html) {
  html = html.replace(
    /<script>document\.documentElement\.classList\.add\("hcc-hover-boot"\);window\.HCC_ASSET_VERSION="[^"]+";window\.HCC_ROUTE_LANG="([^"]*)";window\.HCC_ROUTE_FORCED_LANG="([^"]*)";<\/script>/,
    (_, routeLang, forcedLang) => earlyBootScript(routeLang, forcedLang)
  );
  html = html.replace(
    /<script>if\("serviceWorker" in navigator\)\{[\s\S]*?navigator\.serviceWorker\.register\("\/sw\.js\?v=[^"]+"[\s\S]*?<\/script>/g,
    productionSwScript
  );
  return html;
}

const sw = `const HCC_VERSION = '${newVersion}';
const HCC_CACHE = 'colorcodex-static-lang-pages-${newVersion}';
const HCC_CORE = [
  '/favicon.svg'
];

function isLocalOrigin() {
  return /^(?:localhost|127\\.0\\.0\\.1|::1)$/.test(self.location.hostname);
}

function clearOldCaches() {
  return caches.keys().then((keys) => {
    return Promise.all(
      keys
        .filter((key) => key !== HCC_CACHE || isLocalOrigin())
        .map((key) => caches.delete(key))
    );
  });
}

self.addEventListener('install', (event) => {
  if (isLocalOrigin()) {
    event.waitUntil(self.skipWaiting());
    return;
  }
  event.waitUntil(
    caches.open(HCC_CACHE)
      .then((cache) => cache.addAll(HCC_CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    clearOldCaches()
      .then(() => self.clients.claim())
  );
});

function cacheFirst(request) {
  return caches.match(request).then((cached) => {
    if (cached) return cached;
    return fetch(request).then((response) => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(HCC_CACHE).then((cache) => cache.put(request, copy));
      }
      return response;
    });
  });
}

function networkFirst(request) {
  return fetch(request, { cache: 'no-store' }).catch(() => caches.match(request));
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  if (isLocalOrigin()) {
    event.respondWith(fetch(request, { cache: 'no-store' }));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (/\\.(?:css|js|svg|png|jpg|jpeg|webp|gif|ico|txt|xml)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
  }
});
`;

let scanned = 0;
let changed = 0;
let htmlChanged = 0;

for (const file of walk(root)) {
  scanned += 1;
  const before = fs.readFileSync(file, 'utf8');
  let after = before.replace(oldVersionRe, newVersion);
  if (path.extname(file).toLowerCase() === '.html') {
    const htmlBefore = after;
    after = updateHtml(after);
    if (after !== htmlBefore) htmlChanged += 1;
  }
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}

fs.writeFileSync(path.join(root, 'sw.js'), sw);

console.log(JSON.stringify({ root, newVersion, scanned, changed, htmlChanged }, null, 2));
