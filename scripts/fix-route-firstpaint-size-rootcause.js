const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const newVersion = '20260627-171500';
const versionRe = /20260627-\d{6}/g;

const textExts = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.txt',
  '.webmanifest',
  '.xml',
]);

const markerStart = `/* hcc-route-firstpaint-rootfix ${newVersion} start */`;
const markerEnd = `/* hcc-route-firstpaint-rootfix ${newVersion} end */`;
const markerRe = /\/\* hcc-route-firstpaint-rootfix 20260627-\d{6} start \*\/[\s\S]*?\/\* hcc-route-firstpaint-rootfix 20260627-\d{6} end \*\//g;

const routeCss = `${markerStart}
body:not([data-hcc-page="picker"]):not([data-hcc-page="image"]):not([data-hcc-page="wheel"]) .hcc-work,
body:not([data-hcc-page="picker"]):not([data-hcc-page="image"]):not([data-hcc-page="wheel"]) .hcc-sections{display:none!important;visibility:hidden!important;opacity:0!important}
.hcc-chart-page,
.hcc-library-page,
.hcc-converter-page,
.hcc-hexrgb-page,
.hcc-contrast-tool-page,
.hcc-mixer-page,
.hcc-names-page,
.hcc-legal-page{display:none!important}
body[data-hcc-page="chart"] .hcc-chart-page,
body[data-hcc-page^="chart-"] .hcc-chart-page,
body[data-hcc-page="library"] .hcc-library-page,
body[data-hcc-page="converter"] .hcc-converter-page,
body[data-hcc-page="hex-to-rgb"] .hcc-hexrgb-page,
body[data-hcc-page="contrast-checker"] .hcc-contrast-tool-page,
body[data-hcc-page="color-mixer"] .hcc-mixer-page,
body[data-hcc-page="names"] .hcc-names-page,
body[data-hcc-page="minecraft"] .hcc-names-page,
body[data-hcc-page="bukkit"] .hcc-names-page,
body[data-hcc-page="roblox"] .hcc-names-page,
body[data-hcc-page="about"] .hcc-legal-page,
body[data-hcc-page="privacy-policy"] .hcc-legal-page,
body[data-hcc-page="terms-of-service"] .hcc-legal-page{display:block!important;visibility:visible!important;opacity:1!important}
html.hcc-lang-pending body[data-hcc-page="library"] .hcc-library-page,
html.hcc-lang-pending body[data-hcc-page="converter"] .hcc-converter-page,
html.hcc-lang-pending body[data-hcc-page="hex-to-rgb"] .hcc-hexrgb-page,
html.hcc-lang-pending body[data-hcc-page="contrast-checker"] .hcc-contrast-tool-page,
html.hcc-lang-pending body[data-hcc-page="color-mixer"] .hcc-mixer-page,
html.hcc-lang-pending body[data-hcc-page="names"] .hcc-names-page,
html.hcc-lang-pending body[data-hcc-page="minecraft"] .hcc-names-page,
html.hcc-lang-pending body[data-hcc-page="bukkit"] .hcc-names-page,
html.hcc-lang-pending body[data-hcc-page="roblox"] .hcc-names-page,
html.hcc-lang-pending body[data-hcc-page="chart"] .hcc-chart-page,
html.hcc-lang-pending body[data-hcc-page^="chart-"] .hcc-chart-page{visibility:visible!important;opacity:1!important}
html.hcc-lang-pending:not(.hcc-i18n-ready) body[data-hcc-page="library"] .hcc-library-page,
html.hcc-lang-pending:not(.hcc-i18n-ready) body[data-hcc-page="converter"] .hcc-converter-page,
html.hcc-lang-pending:not(.hcc-i18n-ready) body[data-hcc-page="hex-to-rgb"] .hcc-hexrgb-page,
html.hcc-lang-pending:not(.hcc-i18n-ready) body[data-hcc-page="contrast-checker"] .hcc-contrast-tool-page,
html.hcc-lang-pending:not(.hcc-i18n-ready) body[data-hcc-page="color-mixer"] .hcc-mixer-page,
html.hcc-lang-pending:not(.hcc-i18n-ready) body[data-hcc-page="names"] .hcc-names-page,
html.hcc-lang-pending:not(.hcc-i18n-ready) body[data-hcc-page="minecraft"] .hcc-names-page,
html.hcc-lang-pending:not(.hcc-i18n-ready) body[data-hcc-page="bukkit"] .hcc-names-page,
html.hcc-lang-pending:not(.hcc-i18n-ready) body[data-hcc-page="roblox"] .hcc-names-page,
html.hcc-lang-pending:not(.hcc-i18n-ready) body[data-hcc-page="chart"] .hcc-chart-page,
html.hcc-lang-pending:not(.hcc-i18n-ready) body[data-hcc-page^="chart-"] .hcc-chart-page{visibility:visible!important;opacity:1!important}
body[data-hcc-page="library"] .hcc-library-page{min-height:920px!important}
body[data-hcc-page="library"] .hcc-library-list{min-height:820px!important}
body[data-hcc-page="library"] .hcc-library-section{min-height:360px!important;margin-bottom:26px!important}
body[data-hcc-page="library"] .hcc-library-table-wrap{min-height:324px!important}
body[data-hcc-page="library"] .hcc-library-table tr{height:46px!important}
body[data-hcc-page="library"] .hcc-trail,
body[data-hcc-page="converter"] .hcc-trail,
body[data-hcc-page="hex-to-rgb"] .hcc-trail,
body[data-hcc-page="contrast-checker"] .hcc-trail,
body[data-hcc-page="color-mixer"] .hcc-trail,
body[data-hcc-page="names"] .hcc-trail,
body[data-hcc-page="minecraft"] .hcc-trail,
body[data-hcc-page="bukkit"] .hcc-trail,
body[data-hcc-page="roblox"] .hcc-trail{visibility:hidden!important}
html.hcc-i18n-ready body[data-hcc-page="library"] .hcc-trail,
html.hcc-i18n-ready body[data-hcc-page="converter"] .hcc-trail,
html.hcc-i18n-ready body[data-hcc-page="hex-to-rgb"] .hcc-trail,
html.hcc-i18n-ready body[data-hcc-page="contrast-checker"] .hcc-trail,
html.hcc-i18n-ready body[data-hcc-page="color-mixer"] .hcc-trail,
html.hcc-i18n-ready body[data-hcc-page="names"] .hcc-trail,
html.hcc-i18n-ready body[data-hcc-page="minecraft"] .hcc-trail,
html.hcc-i18n-ready body[data-hcc-page="bukkit"] .hcc-trail,
html.hcc-i18n-ready body[data-hcc-page="roblox"] .hcc-trail{visibility:visible!important}
body[data-hcc-page="library"] #hccLibraryList:empty{display:block!important;min-height:820px!important}
body[data-hcc-page="converter"] .hcc-converter-page,
body[data-hcc-page="hex-to-rgb"] .hcc-hexrgb-page{min-height:980px!important}
body[data-hcc-page="contrast-checker"] .hcc-contrast-tool-page{min-height:860px!important}
body[data-hcc-page="contrast-checker"] .hcc-converter-layout{min-height:760px!important}
body[data-hcc-page="contrast-checker"] .hcc-contrast-tool{min-height:322px!important}
body[data-hcc-page="contrast-checker"] #hccContrastToolRows tr{height:52px!important}
.hcc-chart-family-bar{display:flex!important;overflow:hidden!important;--hcc-swatch-hover-grow:1.16;--hcc-swatch-near-grow:.94;--hcc-swatch-rest-grow:.9;--hcc-swatch-label-font:10px;--hcc-swatch-label-pad:5px}
.hcc-chart-family-swatch{display:flex!important;align-items:center!important;justify-content:center!important;flex:1 1 0!important;min-width:0!important;max-width:none!important;overflow:hidden!important;border:0!important;padding:0!important;box-shadow:none!important;filter:none!important;transition:flex-grow .2s cubic-bezier(.2,.78,.2,1),padding .18s cubic-bezier(.2,.78,.2,1)}
.hcc-chart-family-swatch:hover{flex:1 1 0!important;min-width:0!important;max-width:none!important;box-shadow:none!important;filter:none!important}
.hcc-chart-family-bar.has-hover .hcc-chart-family-swatch:not(.is-hovered){flex-grow:var(--hcc-swatch-rest-grow,.9)!important}
.hcc-chart-family-bar.has-hover .hcc-chart-family-swatch.is-before-hover,
.hcc-chart-family-bar.has-hover .hcc-chart-family-swatch.is-after-hover{flex-grow:var(--hcc-swatch-near-grow,.94)!important}
.hcc-chart-family-bar.has-hover .hcc-chart-family-swatch.is-hovered{flex:var(--hcc-swatch-hover-grow,1.16) 1 0!important;min-width:0!important;max-width:none!important;z-index:5!important}
.hcc-chart-family-swatch span{opacity:0!important;color:transparent!important;font-size:0!important;line-height:1!important;text-shadow:none!important;pointer-events:none!important;display:flex!important;align-items:center!important;justify-content:center!important;white-space:nowrap!important;overflow:visible!important;font-weight:850!important;font-variant-numeric:tabular-nums!important}
.hcc-chart-family-swatch.is-hovered span{opacity:1!important;color:var(--swatch-text,#000)!important;font-size:var(--hcc-swatch-label-font,10px)!important;line-height:1.05!important;padding:0 var(--hcc-swatch-label-pad,5px)!important}
html.hcc-hover-boot .hcc-chart-family-swatch span,
html.hcc-hover-boot .hcc-chart-family-swatch.is-hovered span{opacity:0!important;color:transparent!important;font-size:0!important;line-height:1!important;text-shadow:none!important}
body[data-hcc-page="picker"] .hcc-work,
body[data-hcc-page="image"] .hcc-work,
body[data-hcc-page="wheel"] .hcc-work{display:grid!important;visibility:visible!important;opacity:1!important}
body[data-hcc-page="picker"] .hcc-sections,
body[data-hcc-page="image"] .hcc-sections,
body[data-hcc-page="wheel"] .hcc-sections{display:block!important;visibility:visible!important;opacity:1!important}
body[data-hcc-page="picker"] .hcc-standard-picker{display:block!important}
body[data-hcc-page="picker"] .hcc-image-picker,
body[data-hcc-page="picker"] .hcc-wheel-picker{display:none!important}
body[data-hcc-page="image"] .hcc-image-picker{display:block!important}
body[data-hcc-page="image"] .hcc-standard-picker,
body[data-hcc-page="image"] .hcc-wheel-picker{display:none!important}
body[data-hcc-page="wheel"] .hcc-wheel-picker{display:block!important}
body[data-hcc-page="wheel"] .hcc-standard-picker,
body[data-hcc-page="wheel"] .hcc-image-picker{display:none!important}
body[data-hcc-page="picker"] .hcc-preview,
body[data-hcc-page="image"] .hcc-preview,
body[data-hcc-page="wheel"] .hcc-preview{height:422px!important;min-height:422px!important;display:grid!important;align-items:stretch!important;justify-items:stretch!important;place-items:stretch!important;overflow:hidden!important;background:transparent!important}
body[data-hcc-page="picker"] .hcc-preview:empty,
body[data-hcc-page="image"] .hcc-preview:empty,
body[data-hcc-page="wheel"] .hcc-preview:empty{background:#6df3ea!important;color:#000!important;place-items:center!important;font-size:20px!important;font-weight:850!important;line-height:1!important;font-variant-numeric:tabular-nums}
body[data-hcc-page="picker"] .hcc-preview:empty:before,
body[data-hcc-page="image"] .hcc-preview:empty:before,
body[data-hcc-page="wheel"] .hcc-preview:empty:before{content:"6DF3EA"}
body[data-hcc-page="picker"] .hcc-preview-swatch,
body[data-hcc-page="image"] .hcc-preview-swatch,
body[data-hcc-page="wheel"] .hcc-preview-swatch{width:100%!important;height:100%!important;min-height:0!important;align-self:stretch!important;justify-self:stretch!important}
body[data-hcc-page="image"] .hcc-hero,
body[data-hcc-page="wheel"] .hcc-hero,
body[data-hcc-page="chart"] .hcc-hero,
body[data-hcc-page^="chart-"] .hcc-hero{min-height:346px!important;padding:46px 34px 104px!important}
body[data-hcc-page="wheel"] .hcc-wheel-wrap{height:304px!important;display:grid!important;place-items:center!important;border-color:transparent!important;box-shadow:none!important;overflow:visible!important;background:#fff!important}
body[data-hcc-page="wheel"] .hcc-wheel-light{width:302px!important;height:302px!important;z-index:1}
body[data-hcc-page="wheel"] .hcc-wheel{width:254px!important;height:254px!important;z-index:3}
body[data-hcc-page="wheel"] .hcc-wheel-note{display:none!important}
body[data-hcc-page="chart"] .hcc-chart-table,
body[data-hcc-page^="chart-"] .hcc-chart-table{display:grid!important;gap:0!important;width:752px!important;max-width:100%!important}
body[data-hcc-page^="chart-"] .hcc-chart-page{min-height:1380px!important}
body[data-hcc-page^="chart-"] .hcc-chart-detail{min-height:1320px!important}
body[data-hcc-page^="chart-"] .hcc-chart-list{min-height:1120px!important}
body[data-hcc-page^="chart-"] .hcc-chart-family{min-height:104px!important;margin-bottom:24px!important}
body[data-hcc-page^="chart-"] .hcc-chart-family-bar{height:58px!important}
body[data-hcc-page="chart"] .hcc-chart-matrix,
body[data-hcc-page^="chart-"] .hcc-chart-matrix{display:flex!important;align-items:flex-start!important;width:752px!important;max-width:100%!important;height:286px!important;overflow:hidden!important;border-radius:12px!important;background:transparent!important}
body[data-hcc-page="chart"] .hcc-chart-col,
body[data-hcc-page^="chart-"] .hcc-chart-col{flex:1 1 0!important;display:flex!important;flex-direction:column!important;align-self:stretch!important;height:100%!important;min-width:0!important;min-height:0!important}
body[data-hcc-page="chart"] .hcc-chart-col.fill,
body[data-hcc-page^="chart-"] .hcc-chart-col.fill{align-self:stretch!important}
body[data-hcc-page="chart"] .hcc-chart-col.fill .hcc-chart-cell,
body[data-hcc-page^="chart-"] .hcc-chart-col.fill .hcc-chart-cell{aspect-ratio:auto!important;flex:1 1 0!important}
body[data-hcc-page="chart"] .hcc-chart-cell,
body[data-hcc-page^="chart-"] .hcc-chart-cell{appearance:none!important;-webkit-appearance:none!important;display:block!important;aspect-ratio:auto!important;flex:1 1 0!important;width:100%!important;height:auto!important;border:0!important;border-radius:0!important;padding:0!important;margin:0!important;cursor:pointer!important;background:var(--cell-bg,#ccc)!important;box-shadow:0 0 0 1px var(--cell-bg,#ccc)!important;font-size:0!important;line-height:0!important;min-width:0!important;min-height:0!important;color:transparent!important}
body[data-hcc-page="names"] .hcc-names-page,
body[data-hcc-page="minecraft"] .hcc-names-page,
body[data-hcc-page="bukkit"] .hcc-names-page,
body[data-hcc-page="roblox"] .hcc-names-page{min-height:760px!important}
body[data-hcc-page="names"] .hcc-names-layout,
body[data-hcc-page="minecraft"] .hcc-names-layout,
body[data-hcc-page="bukkit"] .hcc-names-layout,
body[data-hcc-page="roblox"] .hcc-names-layout{min-height:700px!important}
body[data-hcc-page="names"] #hccNamesTable,
body[data-hcc-page="minecraft"] #hccNamesTable,
body[data-hcc-page="bukkit"] #hccNamesTable,
body[data-hcc-page="roblox"] #hccNamesTable{min-height:620px!important}
body[data-hcc-page="names"] .hcc-name-section,
body[data-hcc-page="minecraft"] .hcc-name-section,
body[data-hcc-page="bukkit"] .hcc-name-section,
body[data-hcc-page="roblox"] .hcc-name-section{min-height:300px!important;margin-bottom:28px!important}
body[data-hcc-page="names"] table.hcc-names-table tr,
body[data-hcc-page="minecraft"] table.hcc-names-table tr,
body[data-hcc-page="bukkit"] table.hcc-names-table tr,
body[data-hcc-page="roblox"] table.hcc-names-table tr{height:46px!important}
body[data-hcc-page="names"] #hccNamesTable:empty,
body[data-hcc-page="minecraft"] #hccNamesTable:empty,
body[data-hcc-page="bukkit"] #hccNamesTable:empty,
body[data-hcc-page="roblox"] #hccNamesTable:empty{display:block!important;min-height:720px!important}
html.hcc-hover-boot .hcc-strip i,
html.hcc-hover-boot .hcc-strip i:hover,
html.hcc-hover-boot .hcc-strip i.is-hovered,
html.hcc-hover-boot .hcc-strip.has-hover i.is-hovered,
html.hcc-hover-boot .hcc-bar i,
html.hcc-hover-boot .hcc-bar i:hover,
html.hcc-hover-boot .hcc-bar i.is-hovered,
html.hcc-hover-boot .hcc-bar.has-hover i.is-hovered,
html.hcc-hover-boot .hcc-long-bar i,
html.hcc-hover-boot .hcc-long-bar i:hover,
html.hcc-hover-boot .hcc-long-bar i.is-hovered,
html.hcc-hover-boot .hcc-long-bar.has-hover i.is-hovered{color:transparent!important;font-size:0!important;line-height:1!important;text-shadow:none!important;overflow:hidden!important;padding:0!important;box-shadow:none!important;filter:none!important}
html.hcc-hover-boot .hcc-toast{visibility:hidden!important;opacity:0!important;pointer-events:none!important}
@media (max-width:760px){
  body[data-hcc-page="picker"] .hcc-work,
  body[data-hcc-page="image"] .hcc-work,
  body[data-hcc-page="wheel"] .hcc-work{display:block!important;grid-template-columns:none!important;overflow:hidden!important}
  body[data-hcc-page="picker"] .hcc-preview,
  body[data-hcc-page="image"] .hcc-preview,
  body[data-hcc-page="wheel"] .hcc-preview{width:100%!important;height:246px!important;min-height:246px!important;max-height:246px!important}
  body[data-hcc-page="picker"] .hcc-preview:empty,
  body[data-hcc-page="image"] .hcc-preview:empty,
  body[data-hcc-page="wheel"] .hcc-preview:empty{font-size:18px!important}
  body[data-hcc-page="image"] .hcc-hero,
  body[data-hcc-page="wheel"] .hcc-hero,
  body[data-hcc-page="chart"] .hcc-hero,
  body[data-hcc-page^="chart-"] .hcc-hero{min-height:268px!important;padding:74px 28px 30px!important}
  body[data-hcc-page="wheel"] .hcc-wheel-wrap{width:100%!important;max-width:100%!important;min-width:0!important;height:min(286px,calc(100vw - 70px))!important;min-height:220px!important;max-height:286px!important;aspect-ratio:auto!important;overflow:hidden!important}
  body[data-hcc-page="wheel"] .hcc-wheel-light{width:min(282px,calc(100% - 12px))!important;height:min(282px,calc(100% - 12px))!important;overflow:hidden!important}
  body[data-hcc-page="wheel"] .hcc-wheel-light-rotor{inset:6px!important}
  body[data-hcc-page="wheel"] .hcc-wheel{width:min(236px,calc(100% - 56px))!important;height:min(236px,calc(100% - 56px))!important}
  body[data-hcc-page="chart"] .hcc-chart-table,
  body[data-hcc-page^="chart-"] .hcc-chart-table,
  body[data-hcc-page="chart"] .hcc-chart-matrix,
  body[data-hcc-page^="chart-"] .hcc-chart-matrix{width:100%!important;max-width:100%!important}
  body[data-hcc-page="chart"] .hcc-chart-matrix,
  body[data-hcc-page^="chart-"] .hcc-chart-matrix{height:236px!important;border-radius:10px!important;overflow:auto!important}
  body[data-hcc-page="names"] .hcc-names-page,
  body[data-hcc-page="minecraft"] .hcc-names-page,
  body[data-hcc-page="bukkit"] .hcc-names-page,
  body[data-hcc-page="roblox"] .hcc-names-page{min-height:680px!important}
  body[data-hcc-page="library"] .hcc-library-page{min-height:760px!important}
  body[data-hcc-page="library"] .hcc-library-list{min-height:680px!important}
  body[data-hcc-page="library"] .hcc-library-section{min-height:320px!important}
  body[data-hcc-page="library"] .hcc-library-table-wrap{min-height:286px!important}
  body[data-hcc-page="library"] #hccLibraryList:empty{min-height:680px!important}
  body[data-hcc-page="converter"] .hcc-converter-page,
  body[data-hcc-page="hex-to-rgb"] .hcc-hexrgb-page,
  body[data-hcc-page="contrast-checker"] .hcc-contrast-tool-page{min-height:760px!important}
  body[data-hcc-page="contrast-checker"] .hcc-converter-layout{min-height:680px!important}
  body[data-hcc-page^="chart-"] .hcc-chart-page{min-height:1180px!important}
  body[data-hcc-page^="chart-"] .hcc-chart-detail{min-height:1120px!important}
  body[data-hcc-page^="chart-"] .hcc-chart-list{min-height:960px!important}
  body[data-hcc-page="names"] .hcc-names-layout,
  body[data-hcc-page="minecraft"] .hcc-names-layout,
  body[data-hcc-page="bukkit"] .hcc-names-layout,
  body[data-hcc-page="roblox"] .hcc-names-layout{min-height:620px!important}
  body[data-hcc-page="names"] #hccNamesTable,
  body[data-hcc-page="minecraft"] #hccNamesTable,
  body[data-hcc-page="bukkit"] #hccNamesTable,
  body[data-hcc-page="roblox"] #hccNamesTable{min-height:560px!important}
  body[data-hcc-page="names"] #hccNamesTable:empty,
  body[data-hcc-page="minecraft"] #hccNamesTable:empty,
  body[data-hcc-page="bukkit"] #hccNamesTable:empty,
  body[data-hcc-page="roblox"] #hccNamesTable:empty{min-height:620px!important}
}
${markerEnd}`;

const routeStyle = `<style id="hccRouteFirstpaintRootfix">${routeCss}</style>`;
const routeLangGuardRe = /<style id="hccRouteLangGuard">[\s\S]*?<\/style>/g;
const langGuardRe = /<style id="hccLangGuard">[\s\S]*?<\/style>/g;

const earlyCss = `.hcc-file-input,.hcc-harmony-select{display:none!important}
.hcc-preview-swatch{color:transparent!important;font-size:0!important;line-height:1!important;text-shadow:none!important;letter-spacing:0!important;overflow:hidden!important}
.hcc-preview-swatch.dark-text{color:transparent!important;text-shadow:none!important}
.hcc-strip i,.hcc-bar i,.hcc-long-bar i{color:transparent!important;font-size:0!important;line-height:1!important;text-shadow:none!important;overflow:hidden!important}
.hcc-strip i:hover,.hcc-strip i.is-hovered,.hcc-bar i:hover,.hcc-bar i.is-hovered,.hcc-long-bar i:hover,.hcc-long-bar i.is-hovered{box-shadow:none!important;filter:none!important;text-shadow:none!important}
.hcc-chart-family-swatch span,.hcc-chart-family-swatch.is-hovered span{opacity:0!important;color:transparent!important;font-size:0!important;line-height:1!important;text-shadow:none!important;pointer-events:none!important}
.hcc-toast{display:block!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}
.hcc-toast.show{visibility:visible!important;opacity:1!important}
.hcc-image-drop{height:254px;border:1px dashed #cfcfcf;border-radius:8px;background:#fafafa;position:relative;overflow:hidden;display:grid!important;place-items:center;cursor:pointer;color:#525866;text-align:center;touch-action:none;user-select:none}
.hcc-image-empty{display:grid!important;gap:10px;place-items:center;padding:24px;position:relative;z-index:2;max-width:100%;text-align:center}
.hcc-image-empty b{display:block;font-size:18px;line-height:1.1;font-weight:850;color:#050505}
.hcc-image-empty span{display:block;max-width:270px;font-size:14px;line-height:1.4;font-weight:600;color:#525866}
.hcc-image-target,.hcc-image-zoom{display:none}
.hcc-select-wrap{position:relative;width:304px;max-width:100%;height:40px}
.hcc-harmony-btn{width:100%;height:40px;border:1px solid #dedede;border-radius:8px;background:#fff;padding:0 42px 0 14px;font-size:16px;font-weight:760;text-align:left;display:flex;align-items:center;justify-content:space-between;cursor:pointer;position:relative;z-index:31;color:#050505}
.hcc-harmony-btn:after{content:"";position:absolute;right:21px;top:50%;width:7px;height:7px;border-right:1.6px solid #111;border-bottom:1.6px solid #111;transform:translateY(-70%) rotate(45deg)}
@media (max-width:760px){.hcc-image-drop{height:auto;aspect-ratio:1.52/1;min-height:188px;max-height:242px}.hcc-image-empty{padding:18px}.hcc-image-empty b{font-size:17px}.hcc-select-wrap,.hcc-harmony-btn{width:100%;max-width:100%;min-width:0}}`;
const earlyStyle = `<style id="hccFirstpaintEssential">${earlyCss}\n${routeCss}</style>`;

function isZhHtml(html) {
  return /<html\b[^>]*\blang="zh-CN"/.test(html);
}

function contrastMain(lang) {
  const zh = lang === 'zh';
  const title = zh ? '对比度检查' : 'Check Contrast';
  const fg = zh ? '前景色' : 'Foreground';
  const bg = zh ? '背景色' : 'Background';
  const colorHex = zh ? '颜色 Hex' : 'Color hex';
  const lightness = zh ? '亮度' : 'Lightness';
  const element = zh ? '元素' : 'Element';
  const small = zh ? '小字号文本' : 'Small text';
  const large = zh ? '大字号文本' : 'Large text';
  const ui = zh ? '界面元素' : 'UI element';
  const noteTitle = zh ? '颜色对比度检查' : 'Color Contrast Checker';
  const note = zh ? '使用对比度检查器比较文字和背景颜色，帮助设计更易读、更无障碍的界面。' : 'Use the contrast checker to compare text and background colors against common WCAG readability thresholds. Enter two colors, check the ratio, then copy or adjust the values until the result is readable.';
  const wcag = zh ? 'WCAG 对比度' : 'WCAG contrast';
  const wcagNote = zh ? '小字号文本通常需要 4.5:1 达到 AA，7:1 达到 AAA。大字号文本和界面元素门槛更低，但更强对比度仍然更易读。' : 'Small text generally needs a ratio of 4.5:1 for AA and 7:1 for AAA. Large text and user interface elements have lower thresholds, but strong contrast is still easier to read.';
  const fgAria = zh ? '复制前景色' : 'Copy foreground color';
  const bgAria = zh ? '复制背景色' : 'Copy background color';
  const fail = '<span class="hcc-contrast-mark fail">&times;</span>';
  return `<main class="hcc-contrast-tool-page" id="hccContrastToolPage"><div class="hcc-converter-layout"><h2 class="hcc-converter-title">${title}</h2><section class="hcc-contrast-tool"><div class="hcc-contrast-form"><div class="hcc-contrast-group"><h3>${fg}</h3><label class="hcc-contrast-label" for="hccContrastFg">${colorHex}</label><div class="hcc-contrast-hexbox"><button class="hcc-contrast-swatch" id="hccContrastFgSwatch" type="button" aria-label="${fgAria}" style="--contrast-color:#6DF3EA"></button><span class="hcc-contrast-hash">#</span><input id="hccContrastFg" value="6DF3EA" /></div><label class="hcc-contrast-lightness" id="hccContrastFgLightLabel" for="hccContrastFgLight">${lightness} (69%)</label><input class="hcc-contrast-range" id="hccContrastFgLight" type="range" min="0" max="100" value="69" style="--range-pct:69%" /></div><div class="hcc-contrast-group"><h3>${bg}</h3><label class="hcc-contrast-label" for="hccContrastBg">${colorHex}</label><div class="hcc-contrast-hexbox"><button class="hcc-contrast-swatch" id="hccContrastBgSwatch" type="button" aria-label="${bgAria}" style="--contrast-color:#FFFFFF"></button><span class="hcc-contrast-hash">#</span><input id="hccContrastBg" value="FFFFFF" /></div><label class="hcc-contrast-lightness" id="hccContrastBgLightLabel" for="hccContrastBgLight">${lightness} (100%)</label><input class="hcc-contrast-range" id="hccContrastBgLight" type="range" min="0" max="100" value="100" style="--range-pct:100%" /></div></div><div class="hcc-contrast-result"><div class="hcc-contrast-score" id="hccContrastPreview" style="--contrast-accent:#6DF3EA"><span>1.34</span></div><table class="hcc-contrast-table"><thead><tr><th>${element}</th><th>AA</th><th>AAA</th></tr></thead><tbody id="hccContrastToolRows" data-prerender="contrast-default"><tr><td>${small}</td><td>${fail}</td><td>${fail}</td></tr><tr><td>${large}</td><td>${fail}</td><td>${fail}</td></tr><tr><td>${ui}</td><td>${fail}</td><td>${fail}</td></tr></tbody></table></div></section><article class="hcc-converter-note"><h2>${noteTitle}</h2><p>${note}</p><h3>${wcag}</h3><p>${wcagNote}</p></article></div></main>`;
}

function patchContrastMain(html) {
  if (!html.includes('id="hccContrastToolPage"')) return html;
  return html.replace(
    /<main class="hcc-contrast-tool-page" id="hccContrastToolPage">[\s\S]*?<\/main>/,
    contrastMain(isZhHtml(html) ? 'zh' : 'en')
  );
}

function patchChineseNames(html) {
  if (!isZhHtml(html) || !html.includes('data-hcc-page="names"')) return html;
  return html.replace(
    /(<div class="hcc-hero-inner"><div class="hcc-crumb">颜色代码<\/div><h1>颜色名称<\/h1><p>)[\s\S]*?(<\/p><\/div><\/div><div class="hcc-shell")/,
    '$1现代浏览器支持 140 个命名颜色，下面列出了这些颜色。你可以在 HTML 和 CSS 中按名称、Hex 色号、RGB 或 HSL 值使用它们。$2'
  );
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (
        entry.name === '.git' ||
        entry.name === 'node_modules' ||
        entry.name === 'playwright-diagnostics' ||
        entry.name.startsWith('.chromium') ||
        entry.name.startsWith('.chrome')
      ) {
        continue;
      }
      walk(full, files);
      continue;
    }
    if (textExts.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

function replaceMarkedBlock(text, replacement) {
  const cleaned = text.replace(markerRe, '').replace(/<style id="hccRouteFirstpaintRootfix">[\s\S]*?<\/style>/g, '');
  if (cleaned !== text && cleaned.includes(replacement)) return cleaned;
  return cleaned;
}

function patchCss(css) {
  let next = replaceMarkedBlock(css, routeCss).replace(/\s*$/, '');
  return `${next}\n${routeCss}\n`;
}

function patchHtml(html) {
  let next = replaceMarkedBlock(html, routeStyle).replace(routeLangGuardRe, '').replace(langGuardRe, '');
  next = next.replace(/<style id="hccFirstpaintEssential">[\s\S]*?<\/style>/g, '');
  next = patchContrastMain(next);
  next = patchChineseNames(next);
  if (next.includes('<link id="hccCriticalShellCss"')) {
    next = next.replace('<link id="hccCriticalShellCss"', `${earlyStyle}<link id="hccCriticalShellCss"`);
  } else if (next.includes('<meta charset=')) {
    next = next.replace('<meta charset=', `${earlyStyle}<meta charset=`);
  } else if (next.includes('<head>')) {
    next = next.replace('<head>', `<head>${earlyStyle}`);
  }
  if (next.includes('<script data-hcc-full-css>')) {
    return next.replace('<script data-hcc-full-css>', `${routeStyle}<script data-hcc-full-css>`);
  }
  if (next.includes('<style id="hccFirstScreenFit">')) {
    return next.replace('<style id="hccFirstScreenFit">', `${routeStyle}<style id="hccFirstScreenFit">`);
  }
  if (next.includes('</head>')) {
    return next.replace('</head>', `${routeStyle}</head>`);
  }
  return next;
}

let scanned = 0;
let changed = 0;
let cssChanged = 0;
let htmlChanged = 0;

for (const file of walk(root)) {
  scanned += 1;
  const ext = path.extname(file).toLowerCase();
  const before = fs.readFileSync(file, 'utf8');
  let after = before.replace(versionRe, newVersion);
  if (ext === '.css') {
    const cssBefore = after;
    after = patchCss(after);
    if (after !== cssBefore) cssChanged += 1;
  } else if (ext === '.html') {
    const htmlBefore = after;
    after = patchHtml(after);
    if (after !== htmlBefore) htmlChanged += 1;
  }
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}

console.log(JSON.stringify({ root, newVersion, scanned, changed, cssChanged, htmlChanged }, null, 2));
