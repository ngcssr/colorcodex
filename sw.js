const V = "v20260702-rootcause76";
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
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (e.request.mode === "navigate") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  const accept = e.request.headers.get("accept") || "";
  if (accept.indexOf("text/html") !== -1) return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(V).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request))
  );
});
