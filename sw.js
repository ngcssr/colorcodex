const V = "v20260701-rootcause16";
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
