const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const newVersion = '20260627-191500';
const versionRe = /20260627-\d{6}/g;

const langs = ['', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt'];
const routeGroups = [
  { css: 'chart.css', pages: [
    'color-chart',
    'color-chart/flat-design-color-chart',
    'color-chart/material-design-color-chart',
    'color-chart/tailwind-color-chart',
    'color-chart/web-safe-color-chart',
  ] },
  { css: 'library.css', pages: ['colors'] },
  { css: 'names.css', pages: [
    'color-names',
    'minecraft-color-codes',
    'bukkit-color-codes',
    'roblox-color-codes',
  ] },
  { css: 'converter.css', pages: ['rgb-to-hex', 'hex-to-rgb'] },
];

function pagePath(lang, route) {
  return path.join(root, lang, route, 'index.html');
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function write(file, text) {
  fs.writeFileSync(file, text);
}

function eagerCss(html, cssFile) {
  const fullCssRe = /<script data-hcc-full-css>[\s\S]*?<\/script><noscript><link id="hccFullCss" rel="stylesheet" href="([^"]+)"><\/noscript>/g;
  return html.replace(fullCssRe, (match, href) => {
    const asset = (href.match(/\/assets\/css\/([^?"]+)/) || [])[1];
    if (asset !== cssFile) return match;
    return `<link id="hccFullCss" rel="stylesheet" href="/assets/css/${cssFile}?v=${newVersion}">`;
  });
}

function patchHtmlFile(file, cssFile) {
  if (!fs.existsSync(file)) return false;
  const before = read(file);
  let after = before.replace(versionRe, newVersion);
  after = eagerCss(after, cssFile);
  if (after === before) return false;
  write(file, after);
  return true;
}

function patchConverterLite() {
  const file = path.join(root, 'assets', 'js', 'converter-lite.js');
  const before = read(file);
  let after = before.replace(versionRe, newVersion);
  const oldBlank = "function blank(message,keepPrerender){var rows=document.getElementById(activeRowsId()),preview=document.getElementById(activePreviewId()),msg=message||tx('enter');if(preview){preview.className='hcc-converter-preview';preview.style.setProperty('--converter-color','#fff');preview.style.setProperty('--converter-text','#606876');if(preview.textContent!==msg)preview.textContent=msg;preview.onclick=null}if(!rows)return;if(keepPrerender&&rows.getAttribute('data-prerender')==='converter-blank'&&rows.children.length){rows.setAttribute('data-ready',pageKind==='hex'?'hex-to-rgb':'converter');return}";
  const newBlank = "function blank(message,keepPrerender){var rows=document.getElementById(activeRowsId()),preview=document.getElementById(activePreviewId()),msg=message||tx('enter'),keepStatic=keepPrerender&&rows&&rows.getAttribute('data-prerender')==='converter-blank'&&rows.children.length;if(preview){preview.className='hcc-converter-preview';preview.style.setProperty('--converter-color','#fff');preview.style.setProperty('--converter-text','#606876');if((!keepStatic||message)&&preview.textContent!==msg)preview.textContent=msg;preview.onclick=null}if(!rows)return;if(keepStatic){rows.setAttribute('data-ready',pageKind==='hex'?'hex-to-rgb':'converter');return}";
  if (!after.includes(oldBlank)) {
    throw new Error('converter-lite blank() target not found');
  }
  after = after.replace(oldBlank, newBlank);
  if (after === before) return false;
  write(file, after);
  return true;
}

let changed = 0;
const changedFiles = [];

for (const lang of langs) {
  for (const group of routeGroups) {
    for (const route of group.pages) {
      const file = pagePath(lang, route);
      if (patchHtmlFile(file, group.css)) {
        changed += 1;
        changedFiles.push(path.relative(root, file));
      }
    }
  }
}

if (patchConverterLite()) {
  changed += 1;
  changedFiles.push(path.join('assets', 'js', 'converter-lite.js'));
}

console.log(JSON.stringify({ root, newVersion, changed, changedFiles }, null, 2));
