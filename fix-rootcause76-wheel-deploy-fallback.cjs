const fs = require("fs");
const path = require("path");

const root = __dirname;
const version = "20260702-rootcause76-wheel-deploy-fallback";
const pages = [
  "color-wheel/index.html",
  "zh/color-wheel/index.html",
  "ja/color-wheel/index.html",
  "ko/color-wheel/index.html",
  "es/color-wheel/index.html",
  "fr/color-wheel/index.html",
  "de/color-wheel/index.html",
  "pt/color-wheel/index.html",
];

const fallback = `<style id="hccWheelDeployFallbackRootcause76">/* rootcause76-wheel-deploy-fallback */
html body[data-hcc-page=wheel] #hccConversionPanel,html body[data-hcc-page=wheel] #hccContrastPanel,html body[data-hcc-page=wheel] #hccBlindPanel{border-bottom:1px solid #dedede!important;box-sizing:border-box!important;display:block!important;margin-bottom:26px!important;overflow:hidden!important;padding:0 0 30px!important;width:100%!important}
html body[data-hcc-page=wheel] #hccConversionPanel .hcc-panel-head,html body[data-hcc-page=wheel] #hccContrastPanel .hcc-panel-head,html body[data-hcc-page=wheel] #hccBlindPanel .hcc-panel-head{align-items:center!important;cursor:pointer!important;display:flex!important;justify-content:space-between!important}
html body[data-hcc-page=wheel] #hccConversionPanel .hcc-panel-head h2,html body[data-hcc-page=wheel] #hccContrastPanel .hcc-panel-head h2,html body[data-hcc-page=wheel] #hccBlindPanel .hcc-panel-head h2{font-size:30px!important;font-weight:900!important;line-height:1.1!important;margin:0!important}
html body[data-hcc-page=wheel] #hccConversionPanel .hcc-panel-body,html body[data-hcc-page=wheel] #hccContrastPanel .hcc-panel-body,html body[data-hcc-page=wheel] #hccBlindPanel .hcc-panel-body{box-sizing:border-box!important;display:block!important;max-width:100%!important;overflow:hidden!important;padding-top:24px!important;width:100%!important}
html body[data-hcc-page=wheel] #hccConversionPanel.closed .hcc-panel-body,html body[data-hcc-page=wheel] #hccContrastPanel.closed .hcc-panel-body,html body[data-hcc-page=wheel] #hccBlindPanel.closed .hcc-panel-body{display:none!important;height:0!important;min-height:0!important;overflow:hidden!important;padding-top:0!important}
html body[data-hcc-page=wheel] #hccConversionPanel .hcc-panel-toggle,html body[data-hcc-page=wheel] #hccContrastPanel .hcc-panel-toggle,html body[data-hcc-page=wheel] #hccBlindPanel .hcc-panel-toggle{align-items:center!important;background:#fff!important;border:0!important;border-radius:999px!important;color:#111!important;cursor:pointer!important;display:grid!important;font-size:0!important;height:36px!important;line-height:0!important;place-items:center!important;position:relative!important;width:36px!important}
html body[data-hcc-page=wheel] #hccConversionPanel .hcc-panel-toggle:before,html body[data-hcc-page=wheel] #hccContrastPanel .hcc-panel-toggle:before,html body[data-hcc-page=wheel] #hccBlindPanel .hcc-panel-toggle:before{border-bottom:1.5px solid!important;border-right:1.5px solid!important;content:""!important;display:block!important;height:7px!important;transform:translateY(-2px) rotate(45deg)!important;width:7px!important}
html body[data-hcc-page=wheel] #hccConversionPanel.closed .hcc-panel-toggle:before,html body[data-hcc-page=wheel] #hccContrastPanel.closed .hcc-panel-toggle:before,html body[data-hcc-page=wheel] #hccBlindPanel.closed .hcc-panel-toggle:before{transform:translateY(2px) rotate(-135deg)!important}
html body[data-hcc-page=wheel] #hccConversionPanel .hcc-convert-table{background:#fff!important;border:1px solid #dedede!important;border-radius:14px!important;box-sizing:border-box!important;overflow:hidden!important;width:100%!important}
html body[data-hcc-page=wheel] #hccConversionPanel .hcc-convert-row{align-items:center!important;border-bottom:1px solid #e6e6e6!important;box-sizing:border-box!important;display:grid!important;grid-template-columns:176px 246px 1fr!important;min-height:57px!important}
html body[data-hcc-page=wheel] #hccConversionPanel .hcc-convert-row:last-child{border-bottom:0!important}
html body[data-hcc-page=wheel] #hccConversionPanel .hcc-convert-row div{box-sizing:border-box!important;font-size:16px!important;font-weight:720!important;min-width:0!important;padding:0 24px!important}
html body[data-hcc-page=wheel] #hccConversionPanel .hcc-convert-row.head div{font-size:14px!important;font-weight:820!important}
html body[data-hcc-page=wheel] #hccConversionPanel .hcc-convert-row button{appearance:none!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;color:#050505!important;cursor:pointer!important;font:inherit!important;font-weight:720!important;margin:0!important;padding:0!important;text-align:left!important}
html body[data-hcc-page=wheel] #hccContrastGrid{box-sizing:border-box!important;display:grid!important;gap:24px!important;grid-template-columns:1fr!important;width:100%!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-contrast-title{align-items:center!important;display:flex!important;gap:12px!important;justify-content:space-between!important;margin-bottom:16px!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-contrast-title h3{font-size:18px!important;font-weight:850!important;line-height:1.2!important;margin:0!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-ratio-pill{border-radius:8px!important;font-size:12px!important;font-weight:850!important;padding:6px 9px!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-ratio-pill.bad{background:#ffe1e5!important;color:#e11d48!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-ratio-pill.good{background:#dcfce7!important;color:#00a84f!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-contrast-card{background:#fff!important;border:1px solid #dedede!important;border-radius:12px!important;box-sizing:border-box!important;overflow:hidden!important;width:100%!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-contrast-hero{display:grid!important;font-weight:850!important;height:192px!important;place-items:center!important;text-align:center!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-contrast-hero b{display:block!important;font-size:40px!important;line-height:1!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-contrast-hero span{display:block!important;font-size:14px!important;line-height:1.45!important;margin-top:4px!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-contrast-hero.black{background:#000!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-contrast-table-row{align-items:center!important;border-top:1px solid #e6e6e6!important;display:grid!important;grid-template-columns:1.5fr 1fr 1fr!important;min-height:53px!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-contrast-table-row div{font-size:14px!important;font-weight:760!important;padding:0 16px!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-fail,html body[data-hcc-page=wheel] #hccContrastGrid .hcc-pass{border-radius:50%!important;color:#fff!important;display:inline-grid!important;font-size:12px!important;font-weight:900!important;height:16px!important;line-height:1!important;place-items:center!important;width:16px!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-pass{background:#00bf5b!important}
html body[data-hcc-page=wheel] #hccContrastGrid .hcc-fail{background:#ff3040!important}
html body[data-hcc-page=wheel] #hccBlindGrid.hcc-blind-grid{box-sizing:border-box!important;display:grid!important;gap:36px 40px!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;width:100%!important}
html body[data-hcc-page=wheel] #hccBlindGrid .hcc-blind-card{min-width:0!important}
html body[data-hcc-page=wheel] #hccBlindGrid .hcc-wide-title{align-items:center!important;display:flex!important;gap:12px!important;justify-content:space-between!important;margin-bottom:18px!important}
html body[data-hcc-page=wheel] #hccBlindGrid .hcc-wide-title h3{font-size:18px!important;font-weight:850!important;line-height:1!important;margin:0!important}
html body[data-hcc-page=wheel] #hccBlindGrid .hcc-link-btn,html body[data-hcc-page=wheel] #hccHarmonyPanel .hcc-link-btn,html body[data-hcc-page=wheel] #hccVariationsPanel .hcc-link-btn{align-items:center!important;appearance:none!important;background:#fff!important;border:0!important;border-radius:8px!important;box-shadow:none!important;color:#525866!important;cursor:pointer!important;display:inline-flex!important;font-size:14px!important;font-weight:500!important;gap:7px!important;height:auto!important;line-height:1.2!important;margin:0!important;padding:5px 8px!important;text-align:left!important}
html body[data-hcc-page=wheel] #hccBlindGrid .hcc-link-btn:hover,html body[data-hcc-page=wheel] #hccHarmonyPanel .hcc-link-btn:hover,html body[data-hcc-page=wheel] #hccVariationsPanel .hcc-link-btn:hover{background:#f3f3f3!important}
html body[data-hcc-page=wheel] #hccBlindGrid .hcc-link-btn .hcc-export-icon,html body[data-hcc-page=wheel] #hccBlindGrid .hcc-link-btn svg,html body[data-hcc-page=wheel] #hccHarmonyPanel .hcc-link-btn .hcc-export-icon,html body[data-hcc-page=wheel] #hccVariationsPanel .hcc-link-btn .hcc-export-icon{color:currentColor!important;display:block!important;fill:none!important;height:14px!important;stroke:currentColor!important;stroke-linecap:round!important;stroke-linejoin:round!important;stroke-width:1.7px!important;width:14px!important}
html body[data-hcc-page=wheel] #hccBlindGrid .hcc-long-bar{border-radius:12px!important;box-sizing:border-box!important;display:flex!important;height:64px!important;min-height:64px!important;overflow:hidden!important;position:relative!important;width:100%!important}
html body[data-hcc-page=wheel] #hccBlindGrid .hcc-long-bar i,html body[data-hcc-page=wheel] #hccHarmonyPanel .hcc-bar i,html body[data-hcc-page=wheel] #hccVariationsPanel .hcc-long-bar i,html body[data-hcc-page=wheel] .hcc-summary .hcc-strip i{align-items:center!important;border:0!important;box-shadow:none!important;color:#0000!important;display:flex!important;filter:none!important;flex:1 1 0!important;font-size:0!important;font-weight:850!important;justify-content:center!important;letter-spacing:0!important;line-height:1!important;max-width:none!important;min-width:0!important;overflow:hidden!important;padding:0!important;text-align:center!important;text-shadow:none!important;white-space:nowrap!important}
html body[data-hcc-page=wheel] #hccBlindGrid .hcc-long-bar i:hover,html body[data-hcc-page=wheel] #hccBlindGrid .hcc-long-bar.has-hover i.is-hovered,html body[data-hcc-page=wheel] #hccHarmonyPanel .hcc-bar i:hover,html body[data-hcc-page=wheel] #hccHarmonyPanel .hcc-bar.has-hover i.is-hovered,html body[data-hcc-page=wheel] #hccVariationsPanel .hcc-long-bar i:hover,html body[data-hcc-page=wheel] #hccVariationsPanel .hcc-long-bar.has-hover i.is-hovered,html body[data-hcc-page=wheel] .hcc-summary .hcc-strip i:hover,html body[data-hcc-page=wheel] .hcc-summary .hcc-strip.has-hover i.is-hovered{color:var(--strip-text,var(--swatch-text,#000))!important;flex:var(--hcc-swatch-hover-grow,1.16) 1 0!important;font-size:var(--hcc-swatch-label-font,10px)!important;font-weight:850!important;line-height:1!important;overflow:visible!important;padding:0 var(--hcc-swatch-label-pad,5px)!important;text-align:center!important;z-index:5!important}
html body[data-hcc-page=wheel] #hccBlindGrid .hcc-long-bar.has-hover .hcc-bar-dot,html body[data-hcc-page=wheel] #hccBlindGrid .hcc-long-bar:has(i:hover) .hcc-bar-dot,html body[data-hcc-page=wheel] #hccHarmonyPanel .hcc-bar.has-hover .hcc-bar-dot,html body[data-hcc-page=wheel] #hccHarmonyPanel .hcc-bar:has(i:hover) .hcc-bar-dot,html body[data-hcc-page=wheel] #hccVariationsPanel .hcc-long-bar.has-hover .hcc-bar-dot,html body[data-hcc-page=wheel] #hccVariationsPanel .hcc-long-bar:has(i:hover) .hcc-bar-dot{opacity:0!important}
html body[data-hcc-page=wheel] #hccBlindGrid .hcc-bar-dot{background:var(--bar-dot-color,#fff)!important;border-radius:50%!important;height:5px!important;left:var(--bar-dot-left,50%)!important;pointer-events:none!important;position:absolute!important;top:50%!important;transform:translate(-50%,-50%)!important;width:5px!important;z-index:2!important}
html body[data-hcc-page=wheel] .hcc-after-shell{background:#fff!important;box-sizing:border-box!important;margin:24px 0 0!important;max-width:none!important;overflow:hidden!important;padding:0!important;position:relative!important;width:100%!important}
html body[data-hcc-page=wheel] .hcc-trail{align-items:center!important;background:#fff!important;border:0!important;box-sizing:border-box!important;color:#050505!important;display:flex!important;font-size:13px!important;font-weight:760!important;gap:14px!important;height:96px!important;margin:0 auto!important;max-width:1216px!important;min-height:96px!important;padding:0 34px!important}
html body[data-hcc-page=wheel] .hcc-trail-logo{background:conic-gradient(#dc2626 0 25%,#9333ea 0 50%,#2563eb 0 75%,#22c55e 0)!important;border-radius:50%!important;display:inline-block!important;flex:none!important;height:32px!important;position:relative!important;width:32px!important}
html body[data-hcc-page=wheel] .hcc-trail-logo:after{background:#fff!important;border-radius:50%!important;content:""!important;height:12px!important;left:50%!important;position:absolute!important;top:50%!important;transform:translate(-50%,-50%)!important;width:12px!important}
html body[data-hcc-page=wheel] .hcc-trail a{background:transparent!important;border:0!important;color:#050505!important;font-size:13px!important;font-weight:760!important;padding:0!important;text-decoration:none!important}
html body[data-hcc-page=wheel] .hcc-trail a:hover{text-decoration:underline!important}
html body[data-hcc-page=wheel] .hcc-trail-sep{color:#555!important;font-size:20px!important;font-weight:400!important;line-height:1!important;transform:translateY(-1px)!important}
html body[data-hcc-page=wheel] .hcc-site-footer{background:#f5f5f5!important;border-top:1px solid #ececec!important;box-sizing:border-box!important;display:block!important;margin:0!important;min-height:224px!important;padding:0!important;width:100%!important}
html body[data-hcc-page=wheel] .hcc-footer-inner{box-sizing:border-box!important;margin:0 auto!important;max-width:1090px!important;min-height:224px!important;padding:0 34px!important;position:relative!important;width:100%!important}
html body[data-hcc-page=wheel] .hcc-footer-links{align-content:start!important;box-sizing:border-box!important;display:grid!important;gap:30px 96px!important;grid-template-areas:"guides terms" "about privacy"!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;min-height:224px!important;padding:48px 0 0!important;position:static!important;width:100%!important}
html body[data-hcc-page=wheel] #hccFooterGuides{grid-area:guides!important}html body[data-hcc-page=wheel] #hccFooterTerms{grid-area:terms!important}html body[data-hcc-page=wheel] #hccFooterAbout{grid-area:about!important}html body[data-hcc-page=wheel] #hccFooterPrivacy{grid-area:privacy!important}
html body[data-hcc-page=wheel] .hcc-footer-link{align-items:center!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;color:#050505!important;display:inline-flex!important;font-size:15px!important;font-weight:760!important;height:auto!important;justify-content:flex-start!important;line-height:1.25!important;margin:0!important;padding:0!important;position:static!important;text-align:left!important;text-decoration:none!important;white-space:normal!important;width:auto!important}
html body[data-hcc-page=wheel] .hcc-footer-link:hover{background:transparent!important;text-decoration:underline!important}
@media (max-width:980px){html body[data-hcc-page=wheel] #hccConversionPanel .hcc-convert-row{grid-template-columns:88px 1fr!important}html body[data-hcc-page=wheel] #hccConversionPanel .hcc-convert-row div:nth-child(3){grid-column:2!important}html body[data-hcc-page=wheel] #hccBlindGrid.hcc-blind-grid{gap:24px!important;grid-template-columns:1fr!important}}
@media (max-width:760px){html body[data-hcc-page=wheel] #hccConversionPanel .hcc-panel-head h2,html body[data-hcc-page=wheel] #hccContrastPanel .hcc-panel-head h2,html body[data-hcc-page=wheel] #hccBlindPanel .hcc-panel-head h2{font-size:27px!important}html body[data-hcc-page=wheel] .hcc-trail{height:76px!important;min-height:76px!important;padding:0 20px!important}html body[data-hcc-page=wheel] .hcc-footer-inner,html body[data-hcc-page=wheel] .hcc-footer-links,html body[data-hcc-page=wheel] .hcc-site-footer{min-height:214px!important}html body[data-hcc-page=wheel] .hcc-footer-inner{padding:0 22px!important}html body[data-hcc-page=wheel] .hcc-footer-links{gap:28px 32px!important;padding-top:44px!important}}
</style>`;

for (const rel of pages) {
  const file = path.join(root, rel);
  let html = fs.readFileSync(file, "utf8");
  html = html
    .replace(/<style id="hccWheelDeployFallbackRootcause76">[\s\S]*?<\/style>/, "")
    .replace(/wheel-tools-core-rootcause75\.js/g, "wheel-tools-core-rootcause76.js")
    .replace(/wheel-critical-rootcause75\.css/g, "wheel-critical-rootcause76.css")
    .replace(/rootcause75-first-paint\.css/g, "rootcause76-first-paint.css")
    .replace(/wheel-rootcause75\.css/g, "wheel-rootcause76.css")
    .replace(/20260702-rootcause75-wheelcssdeploystable/g, version);
  const marker = "<meta name=\"viewport\"";
  if (!html.includes(marker)) throw new Error(`marker missing in ${rel}`);
  html = html.replace(marker, `${fallback}${marker}`);
  fs.writeFileSync(file, html);
}

const copies = [
  ["assets/css/wheel-critical-rootcause75.css", "assets/css/wheel-critical-rootcause76.css"],
  ["assets/css/rootcause75-first-paint.css", "assets/css/rootcause76-first-paint.css"],
  ["assets/css/wheel-rootcause75.css", "assets/css/wheel-rootcause76.css"],
  ["assets/js/wheel-tools-core-rootcause75.js", "assets/js/wheel-tools-core-rootcause76.js"],
];
for (const [from, to] of copies) {
  fs.copyFileSync(path.join(root, from), path.join(root, to));
}

const swFile = path.join(root, "sw.js");
let sw = fs.readFileSync(swFile, "utf8");
sw = sw.replace(/const V = "v[^"]+";/, 'const V = "v20260702-rootcause76";');
fs.writeFileSync(swFile, sw);

console.log(`rootcause76 wheel deploy fallback applied to ${pages.length} pages`);
