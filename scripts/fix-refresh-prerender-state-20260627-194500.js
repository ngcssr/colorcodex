const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const version = "20260627-194500";
const defaultRgb = { r: 109, g: 243, b: 234 };
const defaultHex = "6DF3EA";

const langNames = {
  en: "English",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
};

const converterTitles = {
  en: { rgb: "RGB to Hex", hex: "Hex to RGB" },
  zh: { rgb: "RGB 转 Hex", hex: "Hex 转 RGB" },
  ja: { rgb: "RGB から Hex", hex: "Hex から RGB" },
  ko: { rgb: "RGB에서 Hex로", hex: "Hex에서 RGB로" },
  es: { rgb: "RGB a Hex", hex: "Hex a RGB" },
  fr: { rgb: "RGB vers Hex", hex: "Hex vers RGB" },
  de: { rgb: "RGB zu Hex", hex: "Hex zu RGB" },
  pt: { rgb: "RGB para Hex", hex: "Hex para RGB" },
};

const namesHero = {
  en: "Modern browsers support 140 named colors, which are listed below. Use them in your HTML and CSS by name, Hex color code, RGB or HSL value.",
  zh: "现代浏览器支持 140 个命名颜色，下面列出了这些颜色。你可以在 HTML 和 CSS 中按名称、Hex 色号、RGB 或 HSL 值使用它们。",
  ja: "Modern browsers support 140 named colors, which are listed below. Use them in your HTML and CSS by name, Hex color code, RGB or HSL value.",
  ko: "Modern browsers support 140 named colors, which are listed below. Use them in your HTML and CSS by name, Hex color code, RGB or HSL value.",
  es: "Modern browsers support 140 named colors, which are listed below. Use them in your HTML and CSS by name, Hex color code, RGB or HSL value.",
  fr: "Modern browsers support 140 named colors, which are listed below. Use them in your HTML and CSS by name, Hex color code, RGB or HSL value.",
  de: "Modern browsers support 140 named colors, which are listed below. Use them in your HTML and CSS by name, Hex color code, RGB or HSL value.",
  pt: "Modern browsers support 140 named colors, which are listed below. Use them in your HTML and CSS by name, Hex color code, RGB or HSL value.",
};

const namesTitle = {
  en: "Color Names",
  zh: "颜色名称",
  ja: "Color Names",
  ko: "Color Names",
  es: "Color Names",
  fr: "Color Names",
  de: "Color Names",
  pt: "Color Names",
};

function htmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function twoHex(value) {
  const hex = clamp(Math.round(Number(value) || 0), 0, 255).toString(16);
  return (hex.length < 2 ? "0" : "") + hex;
}

function rgbToHex(rgb) {
  return `${twoHex(rgb.r)}${twoHex(rgb.g)}${twoHex(rgb.b)}`.toUpperCase();
}

function luminance(rgb) {
  function f(value) {
    value /= 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  }
  return 0.2126 * f(rgb.r) + 0.7152 * f(rgb.g) + 0.0722 * f(rgb.b);
}

function stripColors() {
  const colors = [];
  for (let i = 0; i < 11; i += 1) {
    const t = i / 10;
    const rgb = {
      r: Math.round(defaultRgb.r + (128 - defaultRgb.r) * t),
      g: Math.round(defaultRgb.g + (128 - defaultRgb.g) * t),
      b: Math.round(defaultRgb.b + (128 - defaultRgb.b) * t),
    };
    colors.push(rgbToHex(rgb));
  }
  return colors;
}

function stripHtml() {
  return stripColors()
    .map((code, index) => {
      const rgb = {
        r: parseInt(code.slice(0, 2), 16),
        g: parseInt(code.slice(2, 4), 16),
        b: parseInt(code.slice(4, 6), 16),
      };
      const text = luminance(rgb) > 0.55 ? "#000" : "#fff";
      const active = index === 0 ? ' class="active"' : "";
      return `<i${active} style="background-color:#${code};--strip-text:${text};--strip-dot:#000" data-code="${code}" aria-label="#${code}">${code}</i>`;
    })
    .join("");
}

function detectLang(relativePath, html) {
  const first = relativePath.split(/[\\/]/)[0];
  if (Object.prototype.hasOwnProperty.call(langNames, first) && first !== "en") return first;
  const match = html.match(/window\.HCC_ROUTE_LANG="([^"]+)"/);
  return match ? match[1] : "en";
}

function bumpVersions(html) {
  return html.replace(/20260627-\d{6}/g, version);
}

function patchTopState(html) {
  let out = html;
  out = out.replace(/<div class="hcc-strip" id="hccTopStrip"><\/div>/g, `<div class="hcc-strip" id="hccTopStrip">${stripHtml()}</div>`);
  out = out.replace(/(<span class="hcc-dot" id="hccMiniTriggerDot")(?![^>]*style=)([^>]*><\/span>)/g, `$1 style="background-color:#${defaultHex}"$2`);
  out = out.replace(/(<span class="hcc-dot" id="hccMiniInputDot")(?![^>]*style=)([^>]*><\/span>)/g, `$1 style="background-color:#${defaultHex}"$2`);
  out = out.replace(/(<span class="hcc-dot" id="hccInputDot")(?![^>]*style=)([^>]*><\/span>)/g, `$1 style="background-color:#${defaultHex}"$2`);
  out = out.replace(/(<span class="hcc-mini-target" id="hccMiniTarget")(?![^>]*style=)([^>]*><\/span>)/g, '$1 style="left:55.144%;top:4.706%"$2');
  out = out.replace(/(<span class="hcc-mini-hue-knob" id="hccMiniHueKnob")(?![^>]*style=)([^>]*><\/span>)/g, '$1 style="left:48.881%;background-color:hsl(176,100%,50%)"$2');
  out = out.replace(/(<span class="hcc-target" id="hccTarget")(?![^>]*style=)([^>]*><\/span>)/g, '$1 style="left:55.144%;top:4.706%"$2');
  out = out.replace(/(<span class="hcc-hue-knob" id="hccHueKnob")(?![^>]*style=)([^>]*><\/span>)/g, '$1 style="left:48.881%;background-color:hsl(176,100%,50%)"$2');
  return out;
}

function patchConverterText(html, lang, kind) {
  const title = converterTitles[lang] || converterTitles.en;
  const next = kind === "hex" ? title.hex : title.rgb;
  return html.replace(/(<main class="hcc-(?:converter|hexrgb)-page"[\s\S]*?<h2 class="hcc-converter-title">)([\s\S]*?)(<\/h2>)/, `$1${htmlEscape(next)}$3`);
}

function patchNamesText(html, lang) {
  const title = namesTitle[lang] || namesTitle.en;
  const hero = namesHero[lang] || namesHero.en;
  let out = html.replace(/(<div class="hcc-hero"><div class="hcc-hero-inner"><div class="hcc-crumb">)([\s\S]*?)(<\/div><h1>)([\s\S]*?)(<\/h1><p>)([\s\S]*?)(<\/p>)/, `$1${lang === "zh" ? "颜色代码" : "Color Codes"}$3${htmlEscape(title)}$5${htmlEscape(hero)}$7`);
  out = out.replace(/(<a href="[^"]*\/color-names\/" id="hccTrailCurrent">)([\s\S]*?)(<\/a>)/, `$1${htmlEscape(title)}$3`);
  return out;
}

function pageKind(relativePath) {
  if (/(^|[\\/])rgb-to-hex[\\/]index\.html$/.test(relativePath)) return "rgb";
  if (/(^|[\\/])hex-to-rgb[\\/]index\.html$/.test(relativePath)) return "hex";
  if (/(^|[\\/])color-names[\\/]index\.html$/.test(relativePath)) return "names";
  return "";
}

function patchHtmlFiles() {
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "index.html") files.push(full);
    }
  }
  walk(root);

  let changed = 0;
  for (const file of files) {
    const relative = path.relative(root, file);
    let html = fs.readFileSync(file, "utf8");
    if (!html.includes("hccTopStrip") && !/(rgb-to-hex|hex-to-rgb|color-names)[\\/]index\.html$/.test(relative)) continue;

    const before = html;
    const lang = detectLang(relative, html);
    const kind = pageKind(relative);
    html = bumpVersions(html);
    html = patchTopState(html);
    if (kind === "rgb" || kind === "hex") html = patchConverterText(html, lang, kind);
    if (kind === "names") html = patchNamesText(html, lang);

    if (html !== before) {
      fs.writeFileSync(file, html);
      changed += 1;
      console.log(`updated ${relative}`);
    }
  }
  return changed;
}

function patchCssFiles() {
  const dir = path.join(root, "assets", "css");
  let changed = 0;
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith(".css")) continue;
    const file = path.join(dir, name);
    const before = fs.readFileSync(file, "utf8");
    let css = before.replace(/background:#8a3030/g, "background:#6df3ea");
    css = css.replace(/background:var\(--strip-gradient,#777\)/g, "background:var(--strip-gradient,#6df3ea)");
    if (css !== before) {
      fs.writeFileSync(file, css);
      changed += 1;
      console.log(`updated assets/css/${name}`);
    }
  }
  return changed;
}

console.log(`html pages updated: ${patchHtmlFiles()}`);
console.log(`css files updated: ${patchCssFiles()}`);
