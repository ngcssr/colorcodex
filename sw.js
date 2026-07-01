const V = "v1";
const CORE = [
  "/favicon.svg",
  "/assets/css/home-critical.css",
  "/assets/css/picker-critical.css",
  "/assets/js/home-lite.js"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  if (CORE.some(p => url.pathname.includes(p.replace(/^\//,"").replace(/\.css.*/,".css").replace(/\.js.*/,".js")))) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  } else {
    e.respondWith(
      caches.open(V).then(c => c.match(e.request).then(r => r || fetch(e.request).then(res => {
        c.put(e.request, res.clone());
        return res;
      })))
    );
  }
});
