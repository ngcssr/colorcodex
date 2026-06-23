const HCC_CACHE = 'colorcodex-instant-20260623-231500';
const HCC_CORE = [
  '/',
  '/color-picker/',
  '/image-color-picker/',
  '/color-wheel/',
  '/color-chart/',
  '/colors/',
  '/rgb-to-hex/',
  '/hex-to-rgb/',
  '/contrast-checker/',
  '/color-mixer/',
  '/color-names/',
  '/css/shell.css?v=20260623-231500',
  '/css/picker.css?v=20260623-231500',
  '/css/image.css?v=20260623-231500',
  '/css/wheel.css?v=20260623-231500',
  '/css/page.css?v=20260623-231500',
  '/app.js?v=20260623-231500',
  '/favicon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(HCC_CACHE)
      .then((cache) => cache.addAll(HCC_CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== HCC_CACHE).map((key) => caches.delete(key))))
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

function staleWhileRevalidate(request) {
  return caches.open(HCC_CACHE).then((cache) => {
    return cache.match(request).then((cached) => {
      const network = fetch(request).then((response) => {
        if (response && response.ok) cache.put(request, response.clone());
        return response;
      }).catch(() => cached);
      return cached || network;
    });
  });
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  if (/\.(?:css|js|svg|png|jpg|jpeg|webp|gif|ico|txt|xml)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
  }
});

