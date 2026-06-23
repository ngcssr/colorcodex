# ColorCodex island/module hashed build

This Cloudflare Pages package uses real routes, hashed assets, and island-style hydration.

- public pages are real folders with independent `index.html`
- each page HTML keeps the shell/hero/footer and two `Loading...` island placeholders
- page tool DOM is stored in hashed `/assets/island-*.js` template chunks
- page bootstraps with `<script type="module">` and modulepreload
- page entries dynamically import i18n, shell runtime, and page core chunks
- all JS/CSS assets are served from `/assets/*-[hash].js/css`
- `/assets/*` is configured for long immutable caching
