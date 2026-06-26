const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const jsPath = path.join(root, 'assets', 'js', 'picker-lite.js');
const cssPath = path.join(root, 'assets', 'css', 'picker.css');
const pickerPages = [
  path.join(root, 'index.html'),
  path.join(root, 'color-picker', 'index.html'),
  path.join(root, 'zh', 'color-picker', 'index.html'),
];

function fail(message) {
  throw new Error(message);
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function twoHex(value) {
  const hex = clamp(Math.round(value), 0, 255).toString(16);
  return (hex.length < 2 ? '0' : '') + hex;
}

function hsvToRgb(h, s, v) {
  h = ((h % 360) + 360) % 360;
  s /= 100;
  v /= 100;
  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function rgbToHex(rgb) {
  return (twoHex(rgb.r) + twoHex(rgb.g) + twoHex(rgb.b)).toUpperCase();
}

function assertContains(haystack, needle, label) {
  if (!haystack.includes(needle)) {
    fail(`${label}: missing ${needle}`);
  }
}

function assertMatches(haystack, pattern, label) {
  if (!pattern.test(haystack)) {
    fail(`${label}: pattern not found ${pattern}`);
  }
}

function verifyInitialJsColor(js) {
  const match = js.match(/var state=\{h:([0-9.]+),s:([0-9.]+),v:([0-9.]+)\}/);
  if (!match) {
    fail('picker-lite.js: cannot find initial HSV state');
  }
  const rgb = hsvToRgb(Number(match[1]), Number(match[2]), Number(match[3]));
  const hex = rgbToHex(rgb);
  if (hex !== '6DF3EA') {
    fail(`picker-lite.js: initial HSV renders ${hex}, expected 6DF3EA`);
  }
}

function verifyPickerHtml(file, html) {
  const label = path.relative(root, file);
  assertContains(html, 'window.HCC_ASSET_VERSION="20260626-173000"', label);
  assertContains(html, '/assets/css/picker.css?v=20260626-173000', label);
  assertContains(html, '<b id="hccTopHex">6DF3EA</b>', label);
  assertContains(html, '<b id="hccTopRgb">109, 243, 234</b>', label);
  assertContains(html, '<b id="hccTopHsl">176, 85, 69</b>', label);
  assertContains(html, '<b id="hccTopOklch">0.89, 0.12, 189</b>', label);
  assertMatches(html, /<div class="hcc-shell" id="hccShell" style="--hue:176(?:\.|")/, label);
  assertMatches(html, /<input id="hccMiniHexInput" value="6DF3EA"/, label);
  assertMatches(html, /<input class="hcc-color-input" id="hccColorValue" value="6DF3EA"/, label);
}

function verifyHoverCss(css) {
  assertMatches(css, /body\[data-hcc-page="picker"\] \.hcc-dot\{background:#6df3ea\}/, 'picker.css default dot');
  assertMatches(css, /body\[data-hcc-page="picker"\] \.hcc-target,body\[data-hcc-page="picker"\] \.hcc-mini-target\{left:55\.144%;top:4\.706%\}/, 'picker.css default picker target');
  assertMatches(css, /body\[data-hcc-page="picker"\] \.hcc-hue-knob,body\[data-hcc-page="picker"\] \.hcc-mini-hue-knob\{left:48\.88%;background:hsl\(176,100%,50%\)\}/, 'picker.css default hue knob');
  assertMatches(css, /\.hcc-long-bar i\.is-hovered\{[^}]*box-shadow:none!important/, 'picker.css variation hover');
  assertMatches(css, /\.hcc-strip i\.is-hovered:before/, 'picker.css top strip hover class');
  assertMatches(css, /\.hcc-strip i\.active\.is-hovered:after/, 'picker.css active strip dot hidden on hover');
}

function verifyLanguageMenu(js) {
  assertMatches(js, /langMenu\.onclick=function\(e\)\{e\.stopPropagation\(\)\}/, 'picker-lite.js language menu');
  assertMatches(js, /langButton\.addEventListener\('pointerdown'/, 'picker-lite.js language pointerdown');
}

function verifyTopStripJs(js) {
  assertMatches(js, /renderStrip\(c\).*?title='#'\+code/s, 'picker-lite.js top strip title');
  assertMatches(js, /trackColorBars\(\).*?\.hcc-strip/s, 'picker-lite.js top strip hover tracking');
}

const js = read(jsPath);
const css = read(cssPath);

verifyInitialJsColor(js);
verifyLanguageMenu(js);
verifyTopStripJs(js);
verifyHoverCss(css);

for (const page of pickerPages) {
  verifyPickerHtml(page, read(page));
}

console.log('picker-lite regression checks passed');
