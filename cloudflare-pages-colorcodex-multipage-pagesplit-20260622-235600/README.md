# Color Codex Cloudflare Pages build

Upload this folder to Cloudflare Pages. The _redirects file makes clean URLs such as /privacy-policy/ and /color-names/ load index.html.

Version 20260622-221900 adds lazy rendering so hidden pages are not redrawn during picker color changes.

Version 20260622-223300 splits chart, color library, and names data into lazy-loaded data chunks to reduce first-load app.js size.

Version 20260622-225600 lazy-loads Spanish, French, German, Portuguese, and Russian language packs.

Version 20260622-231500 generates real per-route HTML files for Cloudflare Pages, so /color-picker/, /color-chart/, tools, names, and legal pages are no longer served only through a catch-all SPA fallback.

