const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const NEW_VERSION = '20260627-171500';
const OLD_VERSION = '20260626-214000';
const pickerLitePath = path.join(ROOT, 'assets', 'js', 'picker-lite.js');
const pickerZhTextPath = path.join(ROOT, 'assets', 'js', 'picker-zh-text.js');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.isFile() && entry.name === 'index.html') {
      files.push(full);
    }
  }
  return files;
}

let pickerLite = fs.readFileSync(pickerLitePath, 'utf8');
const marker = '  var zhText=';
const functionMarker = '  function renderLiteTextArticle';
const start = pickerLite.indexOf(marker);
const end = pickerLite.indexOf(functionMarker, start);

if (start !== -1 && end !== -1) {
  const declaration = pickerLite.slice(start + marker.length, end).trim();
  const objectLiteral = declaration.endsWith(';') ? declaration.slice(0, -1).trim() : declaration;
  const zhAsset = `(function(){window.HCC_PICKER_ZH_TEXT=${objectLiteral};})();\n`;
  fs.writeFileSync(pickerZhTextPath, zhAsset);
  pickerLite = pickerLite.slice(0, start) + '  var zhText=window.HCC_PICKER_ZH_TEXT||{};\n' + pickerLite.slice(end);
  fs.writeFileSync(pickerLitePath, pickerLite);
} else if (!fs.existsSync(pickerZhTextPath)) {
  throw new Error('Could not find zhText block in picker-lite.js');
}

let htmlChanged = 0;
for (const file of walk(ROOT)) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  html = html.replaceAll(`HCC_ASSET_VERSION="${OLD_VERSION}"`, `HCC_ASSET_VERSION="${NEW_VERSION}"`);
  html = html.replaceAll(`v=${OLD_VERSION}`, `v=${NEW_VERSION}`);
  if (html !== before) {
    fs.writeFileSync(file, html);
    htmlChanged += 1;
  }
}

const zhPickerPath = path.join(ROOT, 'zh', 'color-picker', 'index.html');
let zhPicker = fs.readFileSync(zhPickerPath, 'utf8');
const oldLoader = '<script>(function(){var s=document.createElement("script");s.src="/assets/js/picker-lite.js?v="+window.HCC_ASSET_VERSION;s.defer=true;document.body.appendChild(s)})();</script>';
const newLoader = '<script>(function(){function load(src,next){var s=document.createElement("script");s.src=src+"?v="+window.HCC_ASSET_VERSION;s.defer=true;if(next){s.onload=next;s.onerror=next}document.body.appendChild(s)}load("/assets/js/picker-zh-text.js",function(){load("/assets/js/picker-lite.js")})})();</script>';
if (zhPicker.includes(oldLoader) && !zhPicker.includes('/assets/js/picker-zh-text.js')) {
  zhPicker = zhPicker.replace(oldLoader, newLoader);
  fs.writeFileSync(zhPickerPath, zhPicker);
}

console.log(JSON.stringify({
  pickerLiteBytes: fs.statSync(pickerLitePath).size,
  pickerZhTextBytes: fs.statSync(pickerZhTextPath).size,
  htmlChanged,
  zhPickerLoader: fs.readFileSync(zhPickerPath, 'utf8').includes('/assets/js/picker-zh-text.js')
}, null, 2));
