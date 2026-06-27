const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = process.cwd();
const legalSlugs = new Set(["about", "privacy-policy", "terms-of-service"]);
const langs = new Set(["zh", "ja", "ko", "es", "fr", "de", "pt"]);
const siteInfo = {
  en: "Site Information",
  zh: "网站信息",
  ja: "サイト情報",
  ko: "사이트 정보",
  es: "Información del sitio",
  fr: "Informations du site",
  de: "Website-Informationen",
  pt: "Informações do site",
};

const dataCode = fs.readFileSync(path.join(root, "legal-data.js"), "utf8");
const context = { window: {} };
vm.createContext(context);
vm.runInContext(dataCode, context);
const pages = context.window.HCC_LEGAL_PAGES || {};
const i18n = context.window.HCC_LEGAL_PAGE_I18N || {};

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (entry.name === "index.html") {
      out.push(full);
    }
  }
  return out;
}

function route(file) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const parts = rel.split("/");
  if (parts.length === 2 && legalSlugs.has(parts[0]) && parts[1] === "index.html") {
    return { lang: "en", slug: parts[0] };
  }
  if (parts.length === 3 && langs.has(parts[0]) && legalSlugs.has(parts[1]) && parts[2] === "index.html") {
    return { lang: parts[0], slug: parts[1] };
  }
  return null;
}

function dataFor(lang, slug) {
  return (lang !== "en" && i18n[lang] && i18n[lang][slug]) || pages[slug];
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderArticle(page) {
  const body = [`<h2>${escapeHtml(page.title)}</h2>`];
  for (const section of page.sections || []) {
    body.push(`<h3>${escapeHtml(section.h)}</h3>`);
    for (const p of section.p || []) body.push(`<p>${escapeHtml(p)}</p>`);
  }
  return `<main class="hcc-legal-page" id="hccLegalPage"><article class="hcc-legal-article" id="hccLegalArticle">${body.join("")}</article></main>`;
}

function updateFile(file, updater) {
  const before = fs.readFileSync(file, "utf8");
  const after = updater(before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    return true;
  }
  return false;
}

let visited = 0;
let changed = 0;

for (const file of walk(root)) {
  const r = route(file);
  if (!r) continue;
  const page = dataFor(r.lang, r.slug);
  if (!page) throw new Error(`Missing legal data for ${r.lang}/${r.slug}`);
  visited += 1;
  if (
    updateFile(file, (html) =>
      html
        .replace(/<div class="hcc-hero-inner"><div class="hcc-crumb">[\s\S]*?<\/div><h1>[\s\S]*?<\/h1><p>[\s\S]*?<\/p><\/div><\/div>/, `<div class="hcc-hero-inner"><div class="hcc-crumb">${escapeHtml(siteInfo[r.lang] || siteInfo.en)}</div><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.hero)}</p></div></div>`)
        .replace(/<main class="hcc-legal-page" id="hccLegalPage">[\s\S]*?<\/main>/, renderArticle(page))
        .replace(/\/assets\/js\/legal-core\.js\?v=/g, "/assets/js/legal-lite.js?v=")
        .replace(/;setTimeout\(function\(\)\{loadScript\("\/prefetch\.js\?v="\+window\.HCC_ASSET_VERSION\)\},5200\)/g, "")
    )
  ) {
    changed += 1;
  }
}

console.log(JSON.stringify({ visited, changed }, null, 2));
