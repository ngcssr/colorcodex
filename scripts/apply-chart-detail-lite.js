const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = process.cwd();
const dataFile = path.join(root, "data-chart.js");
const dataCode = fs.readFileSync(dataFile, "utf8");
const dataContext = { window: {} };
vm.createContext(dataContext);
vm.runInContext(dataCode, dataContext);

const chartDefs = dataContext.window.HCC_CHART_DEFS || [];
const chartBySlug = new Map(chartDefs.map((def) => [def.slug, def]));
const detailSlugs = {
  "tailwind-color-chart": "tailwind",
  "flat-design-color-chart": "flat",
  "material-design-color-chart": "material",
  "web-safe-color-chart": "websafe",
};

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

function updateFile(file, updater) {
  const before = fs.readFileSync(file, "utf8");
  const after = updater(before, file);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    return true;
  }
  return false;
}

function isChartDetail(file) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  return /(^|\/)color-chart\/(tailwind-color-chart|flat-design-color-chart|material-design-color-chart|web-safe-color-chart)\/index\.html$/.test(rel);
}

function pageSlug(file) {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const match = rel.match(/\/?color-chart\/([^/]+)\/index\.html$/);
  return match ? detailSlugs[match[1]] : "";
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizeHex(value) {
  return String(value || "").replace("#", "").trim().toUpperCase();
}

function renderDetail(def) {
  const families = def.groups
    .map((colors, index) => {
      const name = escapeHtml(def.names[index] || def.title || "Color");
      const swatches = colors
        .map((raw) => {
          const hex = normalizeHex(raw);
          return `<button class="hcc-chart-family-swatch" type="button" title="#${hex}" aria-label="#${hex}" style="background-color:#${hex};--cell-bg:#${hex}"><span>${hex}</span></button>`;
        })
        .join("");
      return `<section class="hcc-chart-family"><h3>${name}</h3><div class="hcc-chart-family-bar">${swatches}</div></section>`;
    })
    .join("");
  return `<main class="hcc-chart-page" id="hccChartPage"><div class="hcc-chart-table" id="hccChartTable" data-ready="detail-${def.slug}" data-prerender="chart-detail"><section class="hcc-chart-detail"><div class="hcc-chart-list">${families}</div></section></div></main>`;
}

let changed = 0;
let visited = 0;
let rendered = 0;

for (const file of walk(root).filter(isChartDetail)) {
  visited += 1;
  const slug = pageSlug(file);
  const def = chartBySlug.get(slug);
  if (!def) {
    throw new Error(`Missing chart definition for ${file}`);
  }
  if (
    updateFile(file, (html) =>
      html
        .replace(/<style id="hccChartDetailGuard">[\s\S]*?<\/style>/g, "")
        .replace(/<main class="hcc-chart-page" id="hccChartPage">[\s\S]*?<\/main>/, renderDetail(def))
        .replace(/<link rel="preload" href="\/data-chart\.js\?v=[^"]+" as="script">/g, "")
        .replace(/<script[^>]+src="\/data-chart\.js\?v=[^"]+"[^>]*><\/script>/g, "")
        .replace(/\/assets\/js\/chart-core\.js\?v=/g, "/assets/js/chart-lite.js?v=")
    )
  ) {
    changed += 1;
  }
  rendered += 1;
}

console.log(JSON.stringify({ visited, changed, rendered }, null, 2));
