# ColorCodex Cloudflare Pages build

This package is a real-path, page-split static build for Cloudflare Pages.

- each public route is a folder with its own `index.html`
- each route loads a small `entries/*.js` loader
- each route loads only its own page core plus required data/tool chunks
- old hash routes and old shared monolithic page routers are not used
- upload this folder contents, or the matching zip, to Cloudflare Pages
