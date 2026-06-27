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

const restoreMarkerStart = '/* hcc-preview-swatch-text-restore start */';
const restoreMarkerEnd = '/* hcc-preview-swatch-text-restore end */';
const restoreCss = `${restoreMarkerStart}
.hcc-preview-swatch{display:grid!important;place-items:center!important;color:var(--swatch-text,#000)!important;font-size:20px!important;line-height:1!important;font-weight:850!important;text-shadow:none!important;letter-spacing:0!important;overflow:hidden!important;text-align:center!important;font-variant-numeric:tabular-nums}
.hcc-preview-swatch.dark-text{color:var(--swatch-text,#000)!important;text-shadow:none!important}
@media (max-width:760px){.hcc-preview-swatch{font-size:18px!important}}
${restoreMarkerEnd}`;

const restoreStyle = `<style id="hccPreviewSwatchTextRestore">${restoreCss}</style>`;

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
  let next = html.replace(/<style id="hccPreviewSwatchTextRestore">[\s\S]*?<\/style>/g, '');
  if (next.includes('</style><script data-hcc-full-css>')) {
    return next.replace('</style><script data-hcc-full-css>', `</style>${restoreStyle}<script data-hcc-full-css>`);
  }
  if (next.includes('<script data-hcc-full-css>')) {
    return next.replace('<script data-hcc-full-css>', `${restoreStyle}<script data-hcc-full-css>`);
  }
  return next.replace('</head>', `${restoreStyle}</head>`);
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
    after = replaceMarkedBlock(after, restoreMarkerStart, restoreMarkerEnd, restoreCss);
    if (after !== beforeCss) cssChanged += 1;
  }
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}

console.log(JSON.stringify({ root, newVersion, scanned, changed, htmlChanged, cssChanged }, null, 2));
