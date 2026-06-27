const fs = require("fs");
const path = require("path");

const root = process.cwd();
const VERSION = "20260627-171500";
const OLD_VERSION = "20260627-171500";
const PREVIOUS_VERSION = "20260627-171500";
const marker = "hcc-mobile-overflow-fit";

const mobileCss = [
  "/* hcc-mobile-overflow-fit 20260627-171500 */",
  "@media (max-width:760px){html,body{width:100%;max-width:100%;overflow-x:hidden}.hcc-app,.hcc-shell,.hcc-after-shell,.hcc-hero,.hcc-hero-inner,.hcc-summary,.hcc-work,.hcc-sections,.hcc-chart-page,.hcc-library-page,.hcc-converter-page,.hcc-hexrgb-page,.hcc-contrast-tool-page,.hcc-mixer-page,.hcc-names-page,.hcc-legal-page{max-width:100%!important;min-width:0!important;box-sizing:border-box}.hcc-after-shell{left:auto!important;right:auto!important;width:100%!important;max-width:100%!important;transform:none!important;overflow:hidden!important}.hcc-nav{width:100%;max-width:100%;min-width:0;padding-left:8px!important;padding-right:8px!important;gap:4px!important;box-sizing:border-box}.hcc-logo{flex:0 0 28px}.hcc-nav>a{min-width:0;flex:0 1 auto;padding-left:6px!important;padding-right:6px!important;font-size:12px!important}.hcc-lang-switch{margin-left:auto!important;width:58px!important;flex:0 0 58px!important;min-width:0}.hcc-mobile-menu-toggle{width:32px!important;flex:0 0 32px!important;margin-left:0!important}.hcc-mobile-menu{left:8px!important;right:8px!important;max-width:calc(100vw - 16px)!important}.hcc-app.wheel-mode .hcc-wheel-wrap{width:100%!important;max-width:100%!important;min-width:0!important;height:min(286px,calc(100vw - 70px))!important;min-height:220px!important;max-height:286px!important;aspect-ratio:auto!important;overflow:hidden!important}.hcc-app.wheel-mode .hcc-wheel-light{width:min(282px,calc(100% - 12px))!important;height:min(282px,calc(100% - 12px))!important;overflow:hidden!important}.hcc-app.wheel-mode .hcc-wheel-light-rotor{inset:6px!important}.hcc-app.wheel-mode .hcc-wheel{width:min(236px,calc(100% - 56px))!important;height:min(236px,calc(100% - 56px))!important}.hcc-summary{width:100%;overflow:visible}.hcc-footer-inner,.hcc-site-footer{width:100%!important;max-width:100%!important;overflow:hidden}.hcc-footer-links{width:100%!important;max-width:100%!important;box-sizing:border-box!important;display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:28px 32px!important;padding:46px 22px!important}.hcc-footer-link,#hccFooterGuides,#hccFooterAbout,#hccFooterPrivacy,#hccFooterTerms{min-width:0!important;max-width:100%!important;white-space:normal!important;overflow-wrap:anywhere!important;word-break:normal!important;font-size:14px!important;line-height:1.25!important}.hcc-library-page,.hcc-library-layout,.hcc-library-list,.hcc-library-intro,.hcc-library-section,.hcc-names-page,.hcc-names-layout,#hccNamesTable,.hcc-name-section,.hcc-converter-layout,.hcc-converter-result{width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box}.hcc-library-section,.hcc-library-list,#hccNamesTable,.hcc-converter-layout{overflow:hidden}.hcc-library-table-wrap,.hcc-converter-result,.hcc-name-section{overflow-x:auto!important;overflow-y:hidden;-webkit-overflow-scrolling:touch}.hcc-library-table,.hcc-converter-table,table.hcc-names-table{min-width:560px;width:100%;max-width:none}.hcc-library-table-wrap,.hcc-converter-result,.hcc-name-section{border-radius:12px}.hcc-converter-table th,.hcc-converter-table td,.hcc-library-table th,.hcc-library-table td,table.hcc-names-table th,table.hcc-names-table td{white-space:nowrap}}",
  "@media (max-width:360px){.hcc-nav>a{font-size:11px!important;padding-left:4px!important;padding-right:4px!important;max-width:46px;overflow:hidden;text-overflow:clip;white-space:nowrap}.hcc-lang-switch{width:54px!important;flex-basis:54px!important}.hcc-lang-button{font-size:11px!important;padding-left:6px!important;padding-right:16px!important}.hcc-lang-button:after{right:7px!important}.hcc-mobile-menu-toggle{width:30px!important;flex-basis:30px!important}.hcc-footer-links{gap:22px 24px!important;padding:42px 20px!important}.hcc-hero,.hcc-summary,.hcc-work,.hcc-chart-card,.hcc-chart-detail,.hcc-library-page,.hcc-converter-page,.hcc-hexrgb-page,.hcc-contrast-tool-page,.hcc-mixer-page,.hcc-names-page,.hcc-legal-page{padding-left:18px!important;padding-right:18px!important}.hcc-sections{margin-left:18px!important;margin-right:18px!important}.hcc-input-row{grid-template-columns:26px auto minmax(0,1fr) 28px 70px!important}.hcc-select{min-width:0}}",
  "@media (max-width:330px){.hcc-nav{gap:3px!important}.hcc-logo{width:26px!important;height:26px!important;flex-basis:26px!important}.hcc-nav>a{font-size:10px!important;padding-left:3px!important;padding-right:3px!important;max-width:42px}.hcc-lang-switch{width:50px!important;flex-basis:50px!important}.hcc-mobile-menu-toggle{width:28px!important;flex-basis:28px!important}.hcc-footer-links{gap:18px 18px!important;padding-left:16px!important;padding-right:16px!important}.hcc-footer-link,#hccFooterGuides,#hccFooterAbout,#hccFooterPrivacy,#hccFooterTerms{font-size:13px!important}}",
].join("");

const inlineStyle = `<style id="hccMobileOverflowFit">${mobileCss}</style>`;

function walk(dir, predicate, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, predicate, out);
    } else if (predicate(full)) {
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

const cssFiles = walk(path.join(root, "assets", "css"), (file) => file.endsWith(".css"));
const jsFiles = walk(path.join(root, "assets", "js"), (file) => file.endsWith(".js"));
const htmlFiles = walk(root, (file) => file.endsWith(".html"));

let cssChanged = 0;
let jsChanged = 0;
let htmlChanged = 0;
let htmlStyleInserted = 0;
let swChanged = 0;

for (const file of cssFiles) {
  if (
    updateFile(file, (source) => {
      const markerIndex = source.indexOf("/* " + marker);
      if (markerIndex === -1) return `${source}\n${mobileCss}\n`;
      return `${source.slice(0, markerIndex).trimEnd()}\n${mobileCss}\n`;
    })
  ) {
    cssChanged += 1;
  }
}

for (const file of jsFiles) {
  if (updateFile(file, (source) => source.split(OLD_VERSION).join(VERSION).split(PREVIOUS_VERSION).join(VERSION))) {
    jsChanged += 1;
  }
}

for (const file of htmlFiles) {
  if (
    updateFile(file, (source) => {
      let next = source.split(OLD_VERSION).join(VERSION).split(PREVIOUS_VERSION).join(VERSION);
      if (next.includes("hccMobileOverflowFit")) {
        next = next.replace(/<style id="hccMobileOverflowFit">[\s\S]*?<\/style>/, inlineStyle);
      } else if (next.includes("hcc-app")) {
        if (next.includes("<script data-hcc-full-css>")) {
          next = next.replace("<script data-hcc-full-css>", `${inlineStyle}<script data-hcc-full-css>`);
        } else {
          next = next.replace("</head>", `${inlineStyle}</head>`);
        }
        htmlStyleInserted += 1;
      }
      return next;
    })
  ) {
    htmlChanged += 1;
  }
}

const swPath = path.join(root, "sw.js");
if (fs.existsSync(swPath)) {
  if (
    updateFile(swPath, (source) =>
      source.replace(/colorcodex-static-lang-pages-[0-9-]+/g, `colorcodex-static-lang-pages-${VERSION}`)
    )
  ) {
    swChanged = 1;
  }
}

console.log(
  JSON.stringify(
    {
      cssFiles: cssFiles.length,
      jsFiles: jsFiles.length,
      htmlFiles: htmlFiles.length,
      cssChanged,
      jsChanged,
      htmlChanged,
      htmlStyleInserted,
      swChanged,
      version: VERSION,
    },
    null,
    2
  )
);
