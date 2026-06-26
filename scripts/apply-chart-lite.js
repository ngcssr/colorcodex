const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const langs = ['', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt'];

for (const lang of langs) {
  const rel = lang ? path.join(lang, 'color-chart', 'index.html') : path.join('color-chart', 'index.html');
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(
    /loadScript\("\/assets\/js\/chart-core\.js\?v="\+window\.HCC_ASSET_VERSION\)/,
    'loadScript("/assets/js/chart-lite.js?v="+window.HCC_ASSET_VERSION)'
  );
  html = html.replace(
    /var s=document\.createElement\("script"\);s\.src="\/assets\/js\/chart-core\.js\?v="\+window\.HCC_ASSET_VERSION;s\.defer=true;document\.body\.appendChild\(s\)/,
    'var s=document.createElement("script");s.src="/assets/js/chart-lite.js?v="+window.HCC_ASSET_VERSION;s.defer=true;document.body.appendChild(s)'
  );
  html = html.replace(/<link rel="preload" href="\/data-chart\.js\?v=[^"]+" as="script">/g, '');
  html = html.replace(
    /;setTimeout\(function\(\)\{loadScript\("\/prefetch\.js\?v="\+window\.HCC_ASSET_VERSION\)\},5200\)/g,
    ''
  );
  fs.writeFileSync(file, html, 'utf8');
  console.log('chart-lite ' + rel);
}
