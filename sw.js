const HCC_VERSION = '20260628-195500';
const HCC_CACHE = 'colorcodex-static-lang-pages-20260628-195500';
const HCC_CORE = [
  '/favicon.svg'
];

function isLocalOrigin() {
  return /^(?:localhost|127\.0\.0\.1|::1)$/.test(self.location.hostname);
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

  if (/\.(?:css|js|svg|png|jpg|jpeg|webp|gif|ico|txt|xml)$/i.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
  }
});
