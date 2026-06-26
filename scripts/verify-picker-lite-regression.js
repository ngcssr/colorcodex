const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const jsPath = path.join(root, 'assets', 'js', 'picker-lite.js');
const sharedJsPath = path.join(root, 'assets', 'js', 'shared-core.js');
const cssPath = path.join(root, 'assets', 'css', 'picker.css');
const cssDir = path.join(root, 'assets', 'css');
const imageCorePath = path.join(root, 'assets', 'js', 'image-core.js');
const pickerCorePath = path.join(root, 'assets', 'js', 'picker-core.js');
const assetVersion = '20260626-214000';
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

function assertNotMatches(haystack, pattern, label) {
  if (pattern.test(haystack)) {
    fail(`${label}: unexpected pattern ${pattern}`);
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
  assertContains(html, `window.HCC_ASSET_VERSION="${assetVersion}"`, label);
  assertContains(html, `/assets/css/picker.css?v=${assetVersion}`, label);
  assertContains(html, 'picker-lite.js?v="+window.HCC_ASSET_VERSION', label);
  assertNotMatches(html, /picker-core\.js|prefetch\.js|shared-core\.js|i18n-text\.js|data-(?:library|chart|names)\.js/, `${label} first-load scripts`);
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
  assertMatches(css, /\.hcc-strip,.hcc-bar,.hcc-long-bar\{[^}]*--hcc-swatch-hover-grow:1\.16/, 'picker.css swatch hover grow variable');
  assertMatches(css, /\.hcc-strip\.has-hover i\.is-before-hover,\.hcc-strip\.has-hover i\.is-after-hover,\.hcc-bar\.has-hover i\.is-before-hover,\.hcc-bar\.has-hover i\.is-after-hover,\.hcc-long-bar\.has-hover i\.is-before-hover,\.hcc-long-bar\.has-hover i\.is-after-hover\{[^}]*flex-grow:var\(--hcc-swatch-near-grow,\.94\)!important/, 'picker.css near swatches compress softly');
  assertMatches(css, /\.hcc-strip i\.is-hovered,\.hcc-bar i\.is-hovered,\.hcc-long-bar i\.is-hovered\{[^}]*flex:var\(--hcc-swatch-hover-grow,1\.16\) 1 0!important/, 'picker.css swatch self-expands with flex grow');
  assertMatches(css, /\.hcc-strip i\.is-hovered,\.hcc-bar i\.is-hovered,\.hcc-long-bar i\.is-hovered\{[^}]*color:var\(--strip-text,var\(--swatch-text,#000\)\)!important/, 'picker.css swatch code uses per-swatch contrast color');
  assertMatches(css, /\.hcc-hover-label,\.hcc-hover-label\.is-visible\{display:none!important\}/, 'picker.css disables shared hover label');
  assertMatches(css, /\.hcc-strip i\.active\.is-hovered:after/, 'picker.css active strip dot hidden on hover');
  assertMatches(css, /\.hcc-strip i:hover:before,\.hcc-strip i\.is-hovered:before,\.hcc-bar i\.is-hovered:before,\.hcc-long-bar i\.is-hovered:before\{content:none!important;display:none!important\}/, 'picker.css disables pseudo hover labels');
  assertNotMatches(css, /content:attr\(data-code\)/, 'picker.css old per-swatch hover label');
}

function verifyAllPageCss() {
  const files = fs.readdirSync(cssDir).filter((name) => name.endsWith('.css'));
  for (const name of files) {
    const css = read(path.join(cssDir, name));
    assertNotMatches(css, /content:attr\(data-code\)/, `${name} old per-swatch hover label`);
    assertContains(css, '.hcc-hover-label,.hcc-hover-label.is-visible{display:none!important}', `${name} shared hover label disabled`);
    assertContains(css, '--hcc-swatch-hover-grow:1.16', `${name} desktop swatch hover grow`);
    assertContains(css, 'is-before-hover', `${name} adjacent swatch class`);
    assertContains(css, 'is-after-hover', `${name} adjacent swatch class`);
  }
}

function verifyLanguageMenu(js) {
  assertMatches(js, /langMenu\.onclick=function\(e\)\{e\.stopPropagation\(\)\}/, 'picker-lite.js language menu');
  assertMatches(js, /langButton\.addEventListener\('pointerdown'/, 'picker-lite.js language pointerdown');
}

function verifyTopStripJs(js) {
  assertMatches(js, /renderStrip\(c\).*?title='#'\+code/s, 'picker-lite.js top strip title');
  assertMatches(js, /trackColorBars\(\).*?\.hcc-strip/s, 'picker-lite.js top strip hover tracking');
  assertMatches(js, /function pickBySlot\(x\).*?Math\.trunc/s, 'picker-lite.js stable slot-based hover hit testing');
  assertMatches(js, /function setHoverVars\(items,r\).*?base=r\.width\/n/s, 'picker-lite.js dynamic hover variables');
  assertMatches(js, /is-before-hover.*?is-after-hover/s, 'picker-lite.js adjacent hover classes');
  assertNotMatches(js, /Math\.floor\(\(e\.clientX-r\.left\)\/r\.width\*items\.length\)/, 'picker-lite.js old width/count hover hit testing');
  assertNotMatches(js, /hcc-hover-label|hover-label-left/, 'picker-lite.js must not use shared floating hover label');
  ['Tailwind', 'Tint', 'Shade', 'Tone', 'Analogous', 'Complement', 'Split', 'Triadic', 'Tetradic', 'Square'].forEach((name) => {
    assertContains(js, `'${name}'`, `picker-lite.js palette row ${name}`);
  });
}

function verifySharedHoverJs(js) {
  assertMatches(js, /querySelectorAll\('\.hcc-strip,\.hcc-bar,\.hcc-long-bar,\.hcc-history-grid'\)/, 'shared-core.js top strip hover tracking');
  assertMatches(js, /function pickBySlot\(x\).*?Math\.trunc/s, 'shared-core.js stable slot-based hover hit testing');
  assertMatches(js, /function setHoverVars\(items,r\).*?base=r\.width\/n/s, 'shared-core.js dynamic hover variables');
  assertMatches(js, /is-before-hover.*?is-after-hover/s, 'shared-core.js adjacent hover classes');
  assertNotMatches(js, /Math\.floor\(\(e\.clientX-r\.left\)\/r\.width\*items\.length\)/, 'shared-core.js old width/count hover hit testing');
  assertNotMatches(js, /hcc-hover-label|hover-label-left/, 'shared-core.js must not use shared floating hover label');
}

function verifyCoreWrapper(file, js) {
  const label = path.relative(root, file);
  assertMatches(js, /window\.HCC_ASSET_VERSION\|\|'20260626-214000'/, `${label} shared-core cache version`);
  assertNotMatches(js, /shared-core\.js\?v=20260626-214000/, `${label} stale shared-core cache version`);
}

const js = read(jsPath);
const sharedJs = read(sharedJsPath);
const css = read(cssPath);
const imageCoreJs = read(imageCorePath);
const pickerCoreJs = read(pickerCorePath);

verifyInitialJsColor(js);
verifyLanguageMenu(js);
verifyTopStripJs(js);
verifySharedHoverJs(sharedJs);
verifyCoreWrapper(imageCorePath, imageCoreJs);
verifyCoreWrapper(pickerCorePath, pickerCoreJs);
verifyHoverCss(css);
verifyAllPageCss();

for (const page of pickerPages) {
  verifyPickerHtml(page, read(page));
}

console.log('picker-lite regression checks passed');
