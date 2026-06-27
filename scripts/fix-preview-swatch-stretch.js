const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const newVersion = '20260627-171500';
const versionRe = /20260627-\d{6}/g;

const textExts = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.txt',
  '.webmanifest',
  '.xml'
]);

const markerStart = '/* hcc-preview-swatch-stretch start */';
const markerEnd = '/* hcc-preview-swatch-stretch end */';
const stretchCss = `${markerStart}
.hcc-preview{display:grid!important;align-items:stretch!important;justify-items:stretch!important;place-items:stretch!important;background:transparent!important}
.hcc-preview-swatch{width:100%!important;height:100%!important;min-height:0!important;align-self:stretch!important;justify-self:stretch!important}
@media (max-width:760px){.hcc-preview{display:grid!important;align-items:stretch!important;justify-items:stretch!important;place-items:stretch!important}.hcc-preview-swatch{width:100%!important;height:100%!important;min-height:0!important;align-self:stretch!important;justify-self:stretch!important}}
${markerEnd}`;

const stretchStyle = `<style id="hccPreviewSwatchStretch">${stretchCss}</style>`;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name === '.git' ||
        entry.name === 'node_modules' ||
        entry.name === 'playwright-diagnostics' ||
        entry.name.startsWith('.chromium')
      ) {
        continue;
      }
      walk(full, files);
      continue;
    }
    if (textExts.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

function replaceMarkedBlock(text, start, end, replacement) {
  const re = new RegExp(
    start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    'g'
  );
  if (re.test(text)) return text.replace(re, replacement);
  return `${text.replace(/\s*$/, '')}\n${replacement}\n`;
}

function updateHtml(html) {
  let next = html.replace(/<style id="hccPreviewSwatchStretch">[\s\S]*?<\/style>/g, '');
  if (next.includes('<script data-hcc-full-css>')) {
    return next.replace('<script data-hcc-full-css>', `${stretchStyle}<script data-hcc-full-css>`);
  }
  return next.replace('</head>', `${stretchStyle}</head>`);
}

let scanned = 0;
let changed = 0;
let htmlChanged = 0;
let cssChanged = 0;

for (const file of walk(root)) {
  scanned += 1;
  const ext = path.extname(file).toLowerCase();
  const before = fs.readFileSync(file, 'utf8');
  let after = before.replace(versionRe, newVersion);
  if (ext === '.html') {
    const beforeHtml = after;
    after = updateHtml(after);
    if (after !== beforeHtml) htmlChanged += 1;
  } else if (ext === '.css') {
    const beforeCss = after;
    after = replaceMarkedBlock(after, markerStart, markerEnd, stretchCss);
    if (after !== beforeCss) cssChanged += 1;
  }
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}

console.log(JSON.stringify({ root, newVersion, scanned, changed, htmlChanged, cssChanged }, null, 2));
