const fs = require("fs");
const path = require("path");

const root = process.cwd();
const VERSION = "20260627-171500";
const KNOWN_VERSIONS = ["20260627-171500", "20260627-171500", "20260627-171500"];

const criticalGuard =
  ".hcc-strip i,.hcc-bar i,.hcc-long-bar i{color:transparent!important;font-size:0!important;line-height:1!important;text-shadow:none!important;overflow:hidden!important}.hcc-strip i:hover,.hcc-bar i:hover,.hcc-long-bar i:hover{color:transparent!important;font-size:0!important}.hcc-toast{display:block!important;visibility:hidden!important;opacity:0!important}.hcc-toast.show{visibility:visible!important;opacity:1!important}";

function walk(dir, predicate, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, predicate, out);
    else if (predicate(full)) out.push(full);
  }
  return out;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function writeIfChanged(file, next) {
  const before = read(file);
  if (before === next) return false;
  fs.writeFileSync(file, next, "utf8");
  return true;
}

function bumpVersions(source) {
  let next = source;
  for (const version of KNOWN_VERSIONS) next = next.split(version).join(VERSION);
  return next;
}

function addCriticalGuard(css) {
  let next = css.replace(/\/\* hcc-picker-flash-guard [0-9-]+ \*\/[\s\S]*?\/\* hcc-picker-flash-guard end \*\//g, "").trimEnd();
  return `${next}\n/* hcc-picker-flash-guard ${VERSION} */${criticalGuard}/* hcc-picker-flash-guard end */\n`;
}

function patchPickerJs(source) {
  return source
    .replace(/i\.title='#'\+code;/g, "i.setAttribute('aria-label','#'+code);")
    .replace(/b\.title='#'\+hex;/g, "b.setAttribute('aria-label','#'+hex);")
    .replace(/cell\.title='#'\+hex;/g, "cell.setAttribute('aria-label','#'+hex);");
}

let jsChanged = 0;
for (const file of walk(path.join(root, "assets", "js"), (file) => file.endsWith(".js"))) {
  const name = path.basename(file);
  const source = read(file);
  const next = bumpVersions(name === "picker-lite.js" || name === "shared-core.js" ? patchPickerJs(source) : source);
  if (writeIfChanged(file, next)) jsChanged += 1;
}

let cssChanged = 0;
const criticalPath = path.join(root, "assets", "css", "critical-shell.css");
if (fs.existsSync(criticalPath)) {
  const next = addCriticalGuard(bumpVersions(read(criticalPath)));
  if (writeIfChanged(criticalPath, next)) cssChanged += 1;
}

for (const file of walk(path.join(root, "assets", "css"), (file) => file.endsWith(".css") && path.basename(file) !== "critical-shell.css")) {
  const next = bumpVersions(read(file));
  if (writeIfChanged(file, next)) cssChanged += 1;
}

let htmlChanged = 0;
for (const file of walk(root, (file) => file.endsWith(".html"))) {
  let html = bumpVersions(read(file));
  html = html.replace(/<style id="hccCriticalPickerCss">([\s\S]*?)<\/style>/g, (_m, css) => {
    return `<style id="hccCriticalPickerCss">${addCriticalGuard(css).trim()}</style>`;
  });
  if (writeIfChanged(file, html)) htmlChanged += 1;
}

let swChanged = 0;
const swPath = path.join(root, "sw.js");
if (fs.existsSync(swPath)) {
  const next = read(swPath).replace(/colorcodex-static-lang-pages-[0-9-]+/g, `colorcodex-static-lang-pages-${VERSION}`);
  if (writeIfChanged(swPath, next)) swChanged = 1;
}

console.log(JSON.stringify({ version: VERSION, jsChanged, cssChanged, htmlChanged, swChanged }, null, 2));
