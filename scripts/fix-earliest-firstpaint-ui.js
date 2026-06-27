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

const earlyStyle = `<style id="hccFirstpaintEssential">.hcc-file-input,.hcc-harmony-select{display:none!important}.hcc-preview-swatch{color:transparent!important;font-size:0!important;line-height:1!important;text-shadow:none!important;letter-spacing:0!important;overflow:hidden!important}.hcc-preview-swatch.dark-text{color:transparent!important;text-shadow:none!important}.hcc-strip i,.hcc-bar i,.hcc-long-bar i{color:transparent!important;font-size:0!important;line-height:1!important;text-shadow:none!important;overflow:hidden!important}.hcc-strip i:hover,.hcc-strip i.is-hovered,.hcc-bar i:hover,.hcc-bar i.is-hovered,.hcc-long-bar i:hover,.hcc-long-bar i.is-hovered{box-shadow:none!important;filter:none!important;text-shadow:none!important}.hcc-toast{display:block!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}.hcc-toast.show{visibility:visible!important;opacity:1!important}.hcc-image-drop{height:254px;border:1px dashed #cfcfcf;border-radius:8px;background:#fafafa;position:relative;overflow:hidden;display:grid!important;place-items:center;cursor:pointer;color:#525866;text-align:center;touch-action:none;user-select:none}.hcc-image-empty{display:grid!important;gap:10px;place-items:center;padding:24px;position:relative;z-index:2;max-width:100%;text-align:center}.hcc-image-empty b{display:block;font-size:18px;line-height:1.1;font-weight:850;color:#050505}.hcc-image-empty span{display:block;max-width:270px;font-size:14px;line-height:1.4;font-weight:600;color:#525866}.hcc-image-target,.hcc-image-zoom{display:none}.hcc-select-wrap{position:relative;width:304px;max-width:100%;height:40px}.hcc-harmony-btn{width:100%;height:40px;border:1px solid #dedede;border-radius:8px;background:#fff;padding:0 42px 0 14px;font-size:16px;font-weight:760;text-align:left;display:flex;align-items:center;justify-content:space-between;cursor:pointer;position:relative;z-index:31;color:#050505}.hcc-harmony-btn:after{content:"";position:absolute;right:21px;top:50%;width:7px;height:7px;border-right:1.6px solid #111;border-bottom:1.6px solid #111;transform:translateY(-70%) rotate(45deg)}@media (max-width:760px){.hcc-image-drop{height:auto;aspect-ratio:1.52/1;min-height:188px;max-height:242px}.hcc-image-empty{padding:18px}.hcc-image-empty b{font-size:17px}.hcc-select-wrap,.hcc-harmony-btn{width:100%;max-width:100%;min-width:0}}</style>`;

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

function patchHtml(html) {
  let next = html.replace(/<style id="hccFirstpaintEssential">[\s\S]*?<\/style>/g, '');
  if (next.includes('<link id="hccCriticalShellCss"')) {
    next = next.replace('<link id="hccCriticalShellCss"', `${earlyStyle}<link id="hccCriticalShellCss"`);
  } else if (next.includes('<head>')) {
    next = next.replace('<head>', `<head>${earlyStyle}`);
  } else {
    next = next.replace('</head>', `${earlyStyle}</head>`);
  }
  return next;
}

let scanned = 0;
let changed = 0;
let htmlChanged = 0;

for (const file of walk(root)) {
  scanned += 1;
  const before = fs.readFileSync(file, 'utf8');
  let after = before.replace(versionRe, newVersion);
  if (path.extname(file).toLowerCase() === '.html') {
    const beforeHtmlPatch = after;
    after = patchHtml(after);
    if (after !== beforeHtmlPatch) htmlChanged += 1;
  }
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}

console.log(JSON.stringify({ root, newVersion, scanned, changed, htmlChanged }, null, 2));
