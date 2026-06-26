const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const langs = ['', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt'];
const routes = ['rgb-to-hex', 'hex-to-rgb'];

function removeBetween(html, startNeedle, endNeedle) {
  const start = html.indexOf(startNeedle);
  if (start === -1) return html;
  const end = html.indexOf(endNeedle, start);
  if (end === -1) return html;
  return html.slice(0, start) + html.slice(end);
}

for (const lang of langs) {
  for (const route of routes) {
  const rel = lang ? path.join(lang, route, 'index.html') : path.join(route, 'index.html');
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');

  html = removeBetween(html, '<div class="hcc-work">', '<main class="hcc-chart-page"');
  if (route === 'hex-to-rgb') {
    html = removeBetween(html, '<main class="hcc-chart-page"', '<main class="hcc-hexrgb-page"');
    html = removeBetween(html, '<main class="hcc-contrast-tool-page"', '<section class="hcc-after-shell">');
  } else {
    html = removeBetween(html, '<main class="hcc-chart-page"', '<main class="hcc-converter-page"');
    html = removeBetween(html, '<main class="hcc-hexrgb-page"', '<section class="hcc-after-shell">');
  }
  html = html.replace(
    /<button class="hcc-icon-btn export" type="button" id="hccShare">[\s\S]*?<\/button><button class="hcc-icon-btn" type="button" id="hccHistoryToggle"[\s\S]*?<\/button>/,
    ''
  );
  html = html.replace(/<div class="hcc-modal" id="hccExportModal">[\s\S]*?<div class="hcc-toast" id="hccToast">/, '<div class="hcc-toast" id="hccToast">');

  fs.writeFileSync(file, html, 'utf8');
  console.log('slimmed ' + rel);
  }
}
