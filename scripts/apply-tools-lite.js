const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const langs = ['', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt'];

for (const lang of langs) {
  for (const route of ['color-mixer', 'contrast-checker']) {
    const rel = lang ? path.join(lang, route, 'index.html') : path.join(route, 'index.html');
    const file = path.join(root, rel);
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(
      /loadScript\("\/assets\/js\/(?:mixer|contrast)-core\.js\?v="\+window\.HCC_ASSET_VERSION\)/g,
      'loadScript("/assets/js/tools-lite.js?v="+window.HCC_ASSET_VERSION)'
    );
    html = html.replace(
      /var s=document\.createElement\("script"\);s\.src="\/assets\/js\/(?:mixer|contrast)-core\.js\?v="\+window\.HCC_ASSET_VERSION;s\.defer=true;document\.body\.appendChild\(s\)/g,
      'var s=document.createElement("script");s.src="/assets/js/tools-lite.js?v="+window.HCC_ASSET_VERSION;s.defer=true;document.body.appendChild(s)'
    );
    fs.writeFileSync(file, html, 'utf8');
    console.log('tools-lite ' + rel);
  }
}
