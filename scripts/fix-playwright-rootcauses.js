const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const oldVersion = '20260627-171500';
const newVersion = '20260627-171500';
const textExts = new Set(['.css', '.html', '.js', '.json', '.md', '.txt', '.webmanifest', '.xml']);

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function write(file, text) {
  fs.writeFileSync(file, text);
}

function replaceExact(file, before, after, label) {
  const text = read(file);
  if (!text.includes(before)) {
    throw new Error(`Missing pattern in ${file}: ${label}`);
  }
  write(file, text.split(before).join(after));
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.chrome-codex-debug' || entry.name.startsWith('.chromium-')) continue;
      walk(file, files);
    } else if (textExts.has(path.extname(entry.name).toLowerCase())) {
      files.push(file);
    }
  }
  return files;
}

const pickerLite = path.join(root, 'assets', 'js', 'picker-lite.js');
const sharedCore = path.join(root, 'assets', 'js', 'shared-core.js');

replaceExact(
  pickerLite,
  "if(document.documentElement.classList.contains('hcc-hover-boot')){clearHover();releaseHoverBoot();bar.dataset.hccHoverSkip='1';return}if(bar.dataset.hccHoverSkip==='1'){delete bar.dataset.hccHoverSkip;clearHover();return}",
  "if(document.documentElement.classList.contains('hcc-hover-boot')){var moved=Math.abs(e.movementX||0)+Math.abs(e.movementY||0);clearHover();if(moved<1){return}releaseHoverBoot()}",
  'picker hover boot release'
);

replaceExact(
  sharedCore,
  "if(document.documentElement.classList.contains('hcc-hover-boot')){clear();releaseHoverBoot();bar.dataset.hccHoverSkip='1';return}if(bar.dataset.hccHoverSkip==='1'){delete bar.dataset.hccHoverSkip;clear();return}",
  "if(document.documentElement.classList.contains('hcc-hover-boot')){var moved=Math.abs(e.movementX||0)+Math.abs(e.movementY||0);clear();if(moved<1){return}releaseHoverBoot()}",
  'shared hover boot release'
);

replaceExact(
  pickerLite,
  "if(miniHexInput&&document.activeElement!==miniHexInput)miniHexInput.value=c.hex;var pref=document.getElementById('hccInputPrefix');",
  "if(miniHexInput){var miniPref=miniHexInput.previousElementSibling;if(miniPref)miniPref.textContent=formatSelect&&formatSelect.value==='Hex'?'#':'';miniHexInput.readOnly=!!(formatSelect&&formatSelect.value!=='Hex');if(document.activeElement!==miniHexInput)miniHexInput.value=formatSelect&&formatSelect.value==='Hex'?c.hex:fmt(c)}var pref=document.getElementById('hccInputPrefix');",
  'picker mini format sync'
);

replaceExact(
  sharedCore,
  "if(document.activeElement!==miniHexInput)miniHexInput.value=c.hex;document.getElementById('hccInputPrefix').textContent=formatSelect.value==='Hex'?'#':'';",
  "if(miniHexInput){var miniPref=miniHexInput.previousElementSibling;if(miniPref)miniPref.textContent=formatSelect&&formatSelect.value==='Hex'?'#':'';miniHexInput.readOnly=!!(formatSelect&&formatSelect.value!=='Hex');if(document.activeElement!==miniHexInput)miniHexInput.value=formatSelect&&formatSelect.value==='Hex'?c.hex:fmt(c)}document.getElementById('hccInputPrefix').textContent=formatSelect.value==='Hex'?'#':'';",
  'shared mini format sync'
);

replaceExact(
  pickerLite,
  "miniHexInput.oninput=function(){var rgb=hexToRgb(miniHexInput.value);if(rgb)setFromRgb(rgb)};",
  "miniHexInput.oninput=function(){if(formatSelect&&formatSelect.value!=='Hex')return;var rgb=hexToRgb(miniHexInput.value);if(rgb)setFromRgb(rgb)};",
  'picker mini input guard'
);

replaceExact(
  sharedCore,
  "miniHexInput.oninput=function(){var rgb=hexToRgb(miniHexInput.value);if(rgb){setFromRgb(rgb);recordPickedRgb(rgb)}};",
  "miniHexInput.oninput=function(){if(formatSelect&&formatSelect.value!=='Hex')return;var rgb=hexToRgb(miniHexInput.value);if(rgb){setFromRgb(rgb);recordPickedRgb(rgb)}};",
  'shared mini input guard'
);

let versionChanged = 0;
for (const file of walk(root)) {
  const before = read(file);
  const after = before.split(oldVersion).join(newVersion);
  if (after !== before) {
    write(file, after);
    versionChanged += 1;
  }
}

console.log(JSON.stringify({
  root,
  oldVersion,
  newVersion,
  versionChanged,
  files: {
    pickerLite,
    sharedCore
  }
}, null, 2));
