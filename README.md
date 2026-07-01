# Color Codex Cloudflare Pages build

Upload this folder to Cloudflare Pages. The _redirects file makes clean URLs such as /privacy-policy/ and /color-names/ load index.html.

Version 20260622-221900 adds lazy rendering so hidden pages are not redrawn during picker color changes.

Version 20260622-223300 splits chart, color library, and names data into lazy-loaded data chunks to reduce first-load app.js size.

Version 20260622-225600 lazy-loads Spanish, French, German, Portuguese, and Russian language packs.

Version 20260622-231500 generates real per-route HTML files for Cloudflare Pages, so /color-picker/, /color-chart/, tools, names, and legal pages are no longer served only through a catch-all SPA fallback.
Version 20260701-rootcause fixes desktop refresh flashing on picker, image picker, and color wheel pages. Root cause: full page CSS was delayed by the Phase 48 loader while lower dynamic panels were empty in the initial HTML, so restoring scroll to the middle/bottom painted an unstyled/empty panel frame before JS rendered. The fix loads full page CSS immediately, prerenders the dynamic panels, hides toast by default, and prevents the service worker from caching HTML navigations.
Version 20260701-rootcause2 additionally disables content-visibility intrinsic placeholders on picker/image/wheel section panels to prevent mid-page refresh jitter on the Color harmonies and Color Variations cards.
