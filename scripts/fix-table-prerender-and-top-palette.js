const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const newVersion = '20260627-183000';
const versionRe = /20260627-\d{6}/g;
const langs = ['', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt'];

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function loadGlobal(file, name) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(read(file), sandbox, { filename: file });
  return sandbox.window[name];
}

const librarySections = loadGlobal('data-library.js', 'HCC_LIBRARY_SECTIONS') || [];
const namePages = loadGlobal('data-names.js', 'HCC_NAME_PAGES') || {};

const libraryFallback = {
  en: { color: 'Color', name: 'Name', hex: 'Hex code', rgb: 'RGB code', hsl: 'HSL code' },
  zh: { color: '颜色', name: '名称', hex: 'Hex 代码', rgb: 'RGB 代码', hsl: 'HSL 代码' },
  ja: { color: '色', name: '名前', hex: 'Hex コード', rgb: 'RGB コード', hsl: 'HSL コード' },
  ko: { color: '색상', name: '이름', hex: 'Hex 코드', rgb: 'RGB 코드', hsl: 'HSL 코드' },
  es: { color: 'Color', name: 'Nombre', hex: 'Código Hex', rgb: 'Código RGB', hsl: 'Código HSL' },
  fr: { color: 'Couleur', name: 'Nom', hex: 'Code Hex', rgb: 'Code RGB', hsl: 'Code HSL' },
  de: { color: 'Farbe', name: 'Name', hex: 'Hex-Code', rgb: 'RGB-Code', hsl: 'HSL-Code' },
  pt: { color: 'Cor', name: 'Nome', hex: 'Código Hex', rgb: 'Código RGB', hsl: 'Código HSL' },
};

const sectionTitles = {
  zh:{'Shades of Black':'黑色系','Shades of Blue':'蓝色系','Shades of Brown':'棕色系','Shades of Gray':'灰色系','Shades of Green':'绿色系','Shades of Orange':'橙色系','Shades of Pink':'粉色系','Shades of Purple':'紫色系','Shades of Red':'红色系','Shades of White':'白色系','Shades of Yellow':'黄色系'},
  ja:{'Shades of Black':'黒系カラー','Shades of Blue':'青系カラー','Shades of Brown':'茶系カラー','Shades of Gray':'グレー系カラー','Shades of Green':'緑系カラー','Shades of Orange':'オレンジ系カラー','Shades of Pink':'ピンク系カラー','Shades of Purple':'紫系カラー','Shades of Red':'赤系カラー','Shades of White':'白系カラー','Shades of Yellow':'黄色系カラー'},
  ko:{'Shades of Black':'검은색 계열','Shades of Blue':'파란색 계열','Shades of Brown':'갈색 계열','Shades of Gray':'회색 계열','Shades of Green':'초록색 계열','Shades of Orange':'주황색 계열','Shades of Pink':'분홍색 계열','Shades of Purple':'보라색 계열','Shades of Red':'빨간색 계열','Shades of White':'흰색 계열','Shades of Yellow':'노란색 계열'},
  es:{'Shades of Black':'Tonos de negro','Shades of Blue':'Tonos de azul','Shades of Brown':'Tonos de marrón','Shades of Gray':'Tonos de gris','Shades of Green':'Tonos de verde','Shades of Orange':'Tonos de naranja','Shades of Pink':'Tonos de rosa','Shades of Purple':'Tonos de morado','Shades of Red':'Tonos de rojo','Shades of White':'Tonos de blanco','Shades of Yellow':'Tonos de amarillo'},
  fr:{'Shades of Black':'Nuances de noir','Shades of Blue':'Nuances de bleu','Shades of Brown':'Nuances de marron','Shades of Gray':'Nuances de gris','Shades of Green':'Nuances de vert','Shades of Orange':'Nuances d’orange','Shades of Pink':'Nuances de rose','Shades of Purple':'Nuances de violet','Shades of Red':'Nuances de rouge','Shades of White':'Nuances de blanc','Shades of Yellow':'Nuances de jaune'},
  de:{'Shades of Black':'Schwarztöne','Shades of Blue':'Blautöne','Shades of Brown':'Brauntöne','Shades of Gray':'Grautöne','Shades of Green':'Grüntöne','Shades of Orange':'Orangetöne','Shades of Pink':'Rosatöne','Shades of Purple':'Violetttöne','Shades of Red':'Rottöne','Shades of White':'Weißtöne','Shades of Yellow':'Gelbtöne'},
  pt:{'Shades of Black':'Tons de preto','Shades of Blue':'Tons de azul','Shades of Brown':'Tons de marrom','Shades of Gray':'Tons de cinza','Shades of Green':'Tons de verde','Shades of Orange':'Tons de laranja','Shades of Pink':'Tons de rosa','Shades of Purple':'Tons de roxo','Shades of Red':'Tons de vermelho','Shades of White':'Tons de branco','Shades of Yellow':'Tons de amarelo'},
};

const namesText = {
  en:{'Color':'Color','Name':'Name','Hex Code':'Hex Code','Hex code':'Hex code','RGB Code':'RGB Code','RGB code':'RGB code','HSL Code':'HSL Code','HSL code':'HSL code','Chat Code':'Chat Code','MOTD Code':'MOTD Code','Number':'Number','Red HTML Color Names':'Red HTML Color Names','Pink HTML Color Names':'Pink HTML Color Names','Orange HTML Color Names':'Orange HTML Color Names','Yellow HTML Color Names':'Yellow HTML Color Names','Purple HTML Color Names':'Purple HTML Color Names','Green HTML Color Names':'Green HTML Color Names','Blue HTML Color Names':'Blue HTML Color Names','White HTML Color Names':'White HTML Color Names','Gray HTML Color Names':'Gray HTML Color Names'},
  zh:{'Color':'颜色','Name':'名称','Hex Code':'Hex 代码','Hex code':'Hex 代码','RGB Code':'RGB 代码','RGB code':'RGB 代码','HSL Code':'HSL 代码','HSL code':'HSL 代码','Chat Code':'聊天代码','MOTD Code':'MOTD 代码','Number':'编号','Red HTML Color Names':'红色 HTML 颜色名称','Pink HTML Color Names':'粉色 HTML 颜色名称','Orange HTML Color Names':'橙色 HTML 颜色名称','Yellow HTML Color Names':'黄色 HTML 颜色名称','Purple HTML Color Names':'紫色 HTML 颜色名称','Green HTML Color Names':'绿色 HTML 颜色名称','Blue HTML Color Names':'蓝色 HTML 颜色名称','White HTML Color Names':'白色 HTML 颜色名称','Gray HTML Color Names':'灰色 HTML 颜色名称'},
};

function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function txLibrary(lang, key) {
  return (libraryFallback[lang] && libraryFallback[lang][key]) || libraryFallback.en[key] || key;
}

function txSection(lang, title) {
  return (sectionTitles[lang] && sectionTitles[lang][title]) || title;
}

function txName(lang, key) {
  return (namesText[lang] && namesText[lang][key]) || (namesText.en && namesText.en[key]) || key;
}

function libraryHtml(lang) {
  return `<div class="hcc-library-list" id="hccLibraryList" data-prerender="library" data-ready="library">` + librarySections.map((section) => {
    const rows = section.rows || [];
    const body = rows.map((r) => {
      const hex = String(r[1] || '').replace(/^#/, '').toUpperCase();
      return `<tr><td><span class="hcc-library-dot" data-hex="${esc(hex)}" style="background-color:#${esc(hex)}"></span></td><td><span class="hcc-library-name" data-hex="${esc(hex)}">${esc(r[0])}</span></td><td><span class="hcc-library-code" data-hex="${esc(hex)}" data-copy="#${esc(hex)}">${esc(hex)}</span></td><td><span class="hcc-library-code" data-hex="${esc(hex)}" data-copy="${esc(r[2])}">${esc(r[2])}</span></td><td><span class="hcc-library-code" data-hex="${esc(hex)}" data-copy="${esc(r[3])}">${esc(r[3])}</span></td></tr>`;
    }).join('');
    return `<section class="hcc-library-section"><h3>${esc(txSection(lang, section.title))}</h3><div class="hcc-library-table-wrap"><table class="hcc-library-table"><thead><tr><th>${esc(txLibrary(lang, 'color'))}</th><th>${esc(txLibrary(lang, 'name'))}</th><th>${esc(txLibrary(lang, 'hex'))}</th><th>${esc(txLibrary(lang, 'rgb'))}</th><th>${esc(txLibrary(lang, 'hsl'))}</th></tr></thead><tbody>${body}</tbody></table></div></section>`;
  }).join('') + '</div>';
}

function colorNameSections(rows) {
  const byName = {};
  rows.forEach((r) => { byName[r[0]] = r; });
  const take = (title, list) => ({ title, rows: list.map((n) => byName[n]).filter(Boolean) });
  return [
    take('Red HTML Color Names',['IndianRed','LightCoral','Salmon','DarkSalmon','LightSalmon','Crimson','Red','FireBrick','DarkRed']),
    take('Pink HTML Color Names',['Pink','LightPink','HotPink','DeepPink','MediumVioletRed','PaleVioletRed']),
    take('Orange HTML Color Names',['Orange','DarkOrange','Coral','Tomato','OrangeRed']),
    take('Yellow HTML Color Names',['Gold','Yellow','LightYellow','LemonChiffon','Khaki']),
    take('Purple HTML Color Names',['Lavender','Thistle','Plum','Violet','Orchid','Fuchsia','Magenta','Purple','RebeccaPurple','BlueViolet','Indigo']),
    take('Green HTML Color Names',['GreenYellow','Chartreuse','LawnGreen','Lime','LimeGreen','PaleGreen','LightGreen','MediumSpringGreen','SpringGreen','MediumSeaGreen','SeaGreen','ForestGreen','Green','DarkGreen']),
    take('Blue HTML Color Names',['Aqua','Cyan','LightCyan','PaleTurquoise','Aquamarine','Turquoise','MediumTurquoise','DarkTurquoise','CadetBlue','SteelBlue','LightSteelBlue','PowderBlue','LightBlue','SkyBlue','DeepSkyBlue','DodgerBlue','CornflowerBlue','RoyalBlue','Blue','MediumBlue','DarkBlue','Navy']),
    take('White HTML Color Names',['White','Snow','HoneyDew','MintCream','Azure','AliceBlue','GhostWhite','WhiteSmoke','Beige','Ivory']),
    take('Gray HTML Color Names',['Black','DarkSlateGray','DimGray','Gray','DarkGray','Silver','LightGray']),
  ].filter((s) => s.rows.length);
}

function nameTableHtml(lang, page, rows, title) {
  const headers = (page.headers || []).map((h) => `<th>${esc(txName(lang, h))}</th>`).join('');
  const body = rows.map((r) => {
    if (page.type === 'colorNames') {
      const hex = String(r[1] || '').replace(/^#/, '').toUpperCase();
      return `<tr><td><span class="hcc-name-dot" data-hex="${esc(hex)}" style="background-color:#${esc(hex)}"></span></td><td>${esc(r[0])}</td><td><span class="hcc-name-code" data-hex="${esc(hex)}" data-copy="#${esc(hex)}">${esc(hex)}</span></td><td><span class="hcc-name-code" data-copy="${esc(r[2])}">${esc(r[2])}</span></td><td><span class="hcc-name-code" data-copy="${esc(r[3])}">${esc(r[3])}</span></td></tr>`;
    }
    if (page.type === 'roblox') {
      const hex = String(r[3] || '').replace(/^#/, '').toUpperCase();
      return `<tr><td><span class="hcc-name-dot" data-hex="${esc(hex)}" data-copy="${esc(r[2])}" style="background-color:#${esc(hex)}"></span></td><td>${esc(r[0])}</td><td><span class="hcc-name-code" data-copy="${esc(r[1])}">${esc(r[1])}</span></td><td><span class="hcc-name-code" data-copy="${esc(r[2])}">${esc(r[2])}</span></td></tr>`;
    }
    const hex = String(r[3] || '').replace(/^#/, '').toUpperCase();
    return `<tr><td><span class="hcc-name-dot" data-hex="${esc(hex)}" style="background-color:#${esc(hex)}"></span></td><td>${esc(r[0])}</td><td><span class="hcc-name-code" data-copy="${esc(r[1])}">${esc(r[1])}</span></td><td><span class="hcc-name-code" data-copy="${esc(r[2])}">${esc(r[2])}</span></td><td><span class="hcc-name-code" data-hex="${esc(hex)}" data-copy="#${esc(hex)}">${esc(hex)}</span></td></tr>`;
  }).join('');
  return `<section class="hcc-name-section">${title ? `<h2>${esc(txName(lang, title))}</h2>` : ''}<table class="hcc-names-table ${page.type === 'colorNames' ? '' : 'hcc-format-table'}"><thead><tr>${headers}</tr></thead><tbody>${body}</tbody></table></section>`;
}

function namesHtml(lang, kind) {
  const page = namePages[kind] || namePages.names;
  if (!page) return `<div id="hccNamesTable" data-prerender="${kind}" data-ready="${kind}"></div>`;
  const content = page.type === 'colorNames'
    ? colorNameSections(page.rows || []).map((s) => nameTableHtml(lang, page, s.rows, s.title)).join('')
    : nameTableHtml(lang, page, page.rows || [], page.sectionTitle || '');
  return `<div id="hccNamesTable" data-prerender="${kind}" data-ready="${kind}">${content}</div>`;
}

function replaceBetween(html, startRe, replacement) {
  return html.replace(startRe, replacement);
}

function langForPrefix(prefix) {
  return prefix || 'en';
}

function pageFile(prefix, slug) {
  return path.join(root, prefix, slug, 'index.html');
}

function patchFile(file, patcher) {
  if (!fs.existsSync(file)) return false;
  const before = fs.readFileSync(file, 'utf8');
  let after = before.replace(versionRe, newVersion);
  after = patcher(after);
  if (after === before) return false;
  fs.writeFileSync(file, after);
  return true;
}

function patchLibraryPage(html, lang) {
  return html.replace(/<div class="hcc-library-list" id="hccLibraryList"[\s\S]*?<\/div><\/main>/, `${libraryHtml(lang)}</main>`);
}

function patchNamesPage(html, lang, kind) {
  return html.replace(/<div id="hccNamesTable"[\s\S]*?<\/div><\/section><\/main>/, `${namesHtml(lang, kind)}</section></main>`);
}

function patchConverterPage(html, lang) {
  const enter = lang === 'zh' ? '在上方输入颜色代码' : null;
  if (!enter) return html;
  return html
    .replace(/(<div class="hcc-converter-preview" id="hccConverterPreview">)[\s\S]*?(<\/div><table class="hcc-converter-table">)/, `$1${enter}$2`)
    .replace(/(<div class="hcc-converter-preview" id="hccHexRgbPreview">)[\s\S]*?(<\/div><table class="hcc-converter-table">)/, `$1${enter}$2`);
}

let changed = 0;

for (const prefix of langs) {
  const lang = langForPrefix(prefix);
  if (patchFile(pageFile(prefix, 'colors'), (html) => patchLibraryPage(html, lang))) changed += 1;
  if (patchFile(pageFile(prefix, 'color-names'), (html) => patchNamesPage(html, lang, 'names'))) changed += 1;
  if (patchFile(pageFile(prefix, 'minecraft-color-codes'), (html) => patchNamesPage(html, lang, 'minecraft'))) changed += 1;
  if (patchFile(pageFile(prefix, 'bukkit-color-codes'), (html) => patchNamesPage(html, lang, 'bukkit'))) changed += 1;
  if (patchFile(pageFile(prefix, 'roblox-color-codes'), (html) => patchNamesPage(html, lang, 'roblox'))) changed += 1;
  if (patchFile(pageFile(prefix, 'rgb-to-hex'), (html) => patchConverterPage(html, lang))) changed += 1;
  if (patchFile(pageFile(prefix, 'hex-to-rgb'), (html) => patchConverterPage(html, lang))) changed += 1;
}

[
  'assets/js/chart-lite.js',
  'assets/js/library-lite.js',
  'assets/js/names-lite.js',
  'assets/js/converter-lite.js',
  'scripts/fix-table-prerender-and-top-palette.js',
].forEach((rel) => {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return;
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replace(versionRe, newVersion);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
});

console.log(JSON.stringify({ root, newVersion, changed }, null, 2));
