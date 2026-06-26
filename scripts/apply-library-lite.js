const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const langs = ['', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt'];

for (const lang of langs) {
  const rel = lang ? path.join(lang, 'colors', 'index.html') : path.join('colors', 'index.html');
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(
    /loadScript\("\/assets\/js\/library-core\.js\?v="\+window\.HCC_ASSET_VERSION\)/g,
    'loadScript("/assets/js/library-lite.js?v="+window.HCC_ASSET_VERSION)'
  );
  html = html.replace(
    /var s=document\.createElement\("script"\);s\.src="\/assets\/js\/library-core\.js\?v="\+window\.HCC_ASSET_VERSION;s\.defer=true;document\.body\.appendChild\(s\)/g,
    'var s=document.createElement("script");s.src="/assets/js/library-lite.js?v="+window.HCC_ASSET_VERSION;s.defer=true;document.body.appendChild(s)'
  );
  html = html.replace(/<link rel="preload" href="\/data-library\.js\?v=[^"]+" as="script">/g, '');
  html = html.replace(
    /;setTimeout\(function\(\)\{loadScript\("\/prefetch\.js\?v="\+window\.HCC_ASSET_VERSION\)\},5200\)/g,
    ''
  );
  fs.writeFileSync(file, html, 'utf8');
  console.log('library-lite ' + rel);
}
