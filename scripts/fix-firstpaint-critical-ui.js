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

const cssMarkerStart = '/* hcc-firstpaint-ui-fix start */';
const cssMarkerEnd = '/* hcc-firstpaint-ui-fix end */';
const cssFix = `${cssMarkerStart}
.hcc-file-input{display:none!important}
.hcc-image-drop{height:254px;border:1px dashed #cfcfcf;border-radius:8px;background:#fafafa;position:relative;overflow:hidden;display:grid!important;place-items:center;cursor:pointer;color:#525866;text-align:center;touch-action:none;user-select:none}
.hcc-image-drop.has-image{border-style:solid;background:#fff;cursor:crosshair}
.hcc-image-drop canvas{display:none}
.hcc-image-drop.has-image #hccImageCanvas{display:block;position:absolute;left:var(--image-left,0);top:var(--image-top,0);width:var(--image-width,100%);height:var(--image-height,100%);max-width:none;max-height:none}
.hcc-image-empty{display:grid!important;gap:10px;place-items:center;padding:24px;position:relative;z-index:2;max-width:100%;text-align:center}
.hcc-image-drop.has-image .hcc-image-empty{display:none!important}
.hcc-image-empty b{display:block;font-size:18px;line-height:1.1;font-weight:850;color:#050505}
.hcc-image-empty span{display:block;max-width:270px;font-size:14px;line-height:1.4;font-weight:600;color:#525866}
.hcc-image-target,.hcc-image-zoom{display:none}
.hcc-image-palette{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:6px;margin-top:14px}
.hcc-preview-col{display:grid;gap:18px;width:304px;max-width:100%;min-width:0}
.hcc-select-wrap{position:relative;width:304px;max-width:100%;height:40px}
.hcc-harmony-select{display:none!important}
.hcc-harmony-btn{width:100%;height:40px;border:1px solid #dedede;border-radius:8px;background:#fff;padding:0 42px 0 14px;font-size:16px;font-weight:760;text-align:left;display:flex;align-items:center;justify-content:space-between;cursor:pointer;position:relative;z-index:31;color:#050505}
.hcc-harmony-btn:after{content:"";position:absolute;right:21px;top:50%;width:7px;height:7px;border-right:1.6px solid #111;border-bottom:1.6px solid #111;transform:translateY(-70%) rotate(45deg)}
.hcc-select-wrap:not(.idle) .hcc-harmony-btn:after{display:none}
.hcc-harmony-menu{position:absolute;left:0;right:0;top:48px;height:226px;background:#fff;border:1px solid #e5e5e5;border-radius:10px;box-shadow:0 14px 36px rgba(0,0,0,.1);padding:10px 26px;display:none;z-index:30;align-content:stretch}
.hcc-harmony-menu.show{display:grid;grid-template-rows:repeat(6,minmax(0,1fr));gap:0}
.hcc-harmony-menu button{border:0;background:#fff;text-align:left;font-size:16px;line-height:1;font-weight:700;cursor:pointer;padding:0;letter-spacing:0;display:flex;align-items:center;height:100%;color:#050505}
.hcc-clear-select{position:absolute;right:3px;top:3px;width:34px;height:34px;border:0;border-radius:7px;background:transparent;font-size:26px;font-weight:400;line-height:1;cursor:pointer;color:#777;display:grid;place-items:center;padding:0;z-index:32}
.hcc-select-wrap.idle .hcc-clear-select{display:none!important}
.hcc-preview{display:grid;overflow:hidden}
.hcc-preview-swatch{display:grid;place-items:center;min-height:70px;cursor:pointer;color:transparent!important;font-size:0!important;line-height:1!important;text-shadow:none!important;letter-spacing:0;overflow:hidden}
.hcc-preview-swatch.dark-text{color:transparent!important;text-shadow:none!important}
@media (max-width:760px){.hcc-preview-col,.hcc-select-wrap,.hcc-harmony-btn,.hcc-preview{width:100%;max-width:100%;min-width:0}.hcc-image-drop{height:auto;aspect-ratio:1.52/1;min-height:188px;max-height:242px}.hcc-image-empty{padding:18px}.hcc-image-empty b{font-size:17px}.hcc-image-palette{grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}}
${cssMarkerEnd}`;

const htmlFix = `<style id="hccFirstpaintUiFix">${cssFix}</style>`;

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
  const re = new RegExp(start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\S]*?' + end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  if (re.test(text)) return text.replace(re, replacement);
  return `${text.replace(/\s*$/, '')}\n${replacement}\n`;
}

function updateHtml(text) {
  text = text.replace(/<style id="hccFirstpaintUiFix">[\s\S]*?<\/style>/g, '');
  if (text.includes('<script data-hcc-full-css>')) {
    return text.replace('<script data-hcc-full-css>', `${htmlFix}<script data-hcc-full-css>`);
  }
  return text.replace('</head>', `${htmlFix}</head>`);
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
    after = updateHtml(after);
    if (after !== before) htmlChanged += 1;
  } else if (ext === '.css') {
    after = replaceMarkedBlock(after, cssMarkerStart, cssMarkerEnd, cssFix);
    if (after !== before) cssChanged += 1;
  }
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}

console.log(JSON.stringify({ root, newVersion, scanned, changed, htmlChanged, cssChanged }, null, 2));
