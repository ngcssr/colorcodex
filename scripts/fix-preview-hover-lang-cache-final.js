const fs = require("fs");
const path = require("path");

const root = process.cwd();
const VERSION = "20260627-171500";
const OLD_VERSIONS = [
  "20260627-171500",
  "20260627-171500",
  "20260627-171500",
  "20260627-171500",
  "20260627-171500",
  "20260627-171500",
  "20260627-171500",
  "20260627-171500",
];

const swatchHoverCss =
  ".hcc-strip,.hcc-bar,.hcc-long-bar{position:relative;overflow:hidden!important;--hcc-swatch-hover-grow:1.16;--hcc-swatch-near-grow:.94;--hcc-swatch-rest-grow:.9;--hcc-swatch-label-font:10px;--hcc-swatch-label-pad:5px}.hcc-strip{clip-path:inset(0 round 999px)!important}.hcc-strip i,.hcc-bar i,.hcc-long-bar i{display:flex!important;align-items:center!important;justify-content:center!important;flex:1 1 0!important;min-width:0!important;max-width:none!important;overflow:hidden!important;white-space:nowrap!important;text-overflow:clip!important;letter-spacing:0!important;text-shadow:none!important;transform:none!important;box-shadow:none!important;color:transparent!important;font-size:0!important;font-weight:850!important;line-height:1!important;padding:0!important;filter:none!important;font-variant-numeric:tabular-nums;transition:flex-grow .2s cubic-bezier(.2,.78,.2,1),color .08s linear,font-size .08s linear,padding .18s cubic-bezier(.2,.78,.2,1),filter .16s ease}.hcc-strip i:hover,.hcc-bar i:hover,.hcc-long-bar i:hover{flex:1 1 0!important;min-width:0!important;max-width:none!important;color:transparent!important;font-size:0!important;line-height:1!important;box-shadow:none!important;padding:0!important;filter:none!important;text-shadow:none!important}.hcc-strip.has-hover i:not(.is-hovered),.hcc-bar.has-hover i:not(.is-hovered),.hcc-long-bar.has-hover i:not(.is-hovered){flex-grow:var(--hcc-swatch-rest-grow,.9)!important;color:transparent!important;font-size:0!important;box-shadow:none!important;padding:0!important;filter:none!important}.hcc-strip.has-hover i.is-before-hover,.hcc-strip.has-hover i.is-after-hover,.hcc-bar.has-hover i.is-before-hover,.hcc-bar.has-hover i.is-after-hover,.hcc-long-bar.has-hover i.is-before-hover,.hcc-long-bar.has-hover i.is-after-hover{flex-grow:var(--hcc-swatch-near-grow,.94)!important}.hcc-strip.has-hover i.is-hovered,.hcc-bar.has-hover i.is-hovered,.hcc-long-bar.has-hover i.is-hovered{flex:var(--hcc-swatch-hover-grow,1.16) 1 0!important;min-width:0!important;max-width:none!important;color:var(--strip-text,var(--swatch-text,#000))!important;font-size:var(--hcc-swatch-label-font,10px)!important;font-weight:850!important;line-height:1!important;padding:0 var(--hcc-swatch-label-pad,5px)!important;z-index:5!important;box-shadow:none!important;filter:none!important;text-align:center!important}.hcc-strip i:hover:before,.hcc-strip i.is-hovered:before,.hcc-bar i.is-hovered:before,.hcc-long-bar i.is-hovered:before{content:none!important;display:none!important}.hcc-strip.has-hover i.active:after,.hcc-strip i.active.is-hovered:after{opacity:0!important}.hcc-strip i:first-child,.hcc-strip i:first-child.is-hovered{border-top-left-radius:999px!important;border-bottom-left-radius:999px!important}.hcc-strip i:last-child,.hcc-strip i:last-child.is-hovered{border-top-right-radius:999px!important;border-bottom-right-radius:999px!important}.hcc-bar,.hcc-long-bar{border-radius:12px!important}html.hcc-hover-boot .hcc-strip i,html.hcc-hover-boot .hcc-strip i:hover,html.hcc-hover-boot .hcc-strip i.is-hovered,html.hcc-hover-boot .hcc-bar i,html.hcc-hover-boot .hcc-bar i:hover,html.hcc-hover-boot .hcc-bar i.is-hovered,html.hcc-hover-boot .hcc-long-bar i,html.hcc-hover-boot .hcc-long-bar i:hover,html.hcc-hover-boot .hcc-long-bar i.is-hovered,html.hcc-mini-open .hcc-strip i,html.hcc-mini-open .hcc-strip i:hover,html.hcc-mini-open .hcc-strip i.is-hovered{color:transparent!important;font-size:0!important;line-height:1!important;text-shadow:none!important;overflow:hidden!important;padding:0!important;box-shadow:none!important;filter:none!important}.hcc-toast:not(.show),.hcc-toast{visibility:hidden;opacity:0;pointer-events:none}.hcc-toast.show{visibility:visible!important;opacity:1!important}@media (max-width:760px){.hcc-strip,.hcc-bar,.hcc-long-bar{--hcc-swatch-label-font:9.5px;--hcc-swatch-label-pad:4px}.hcc-strip.has-hover i.is-hovered,.hcc-bar.has-hover i.is-hovered,.hcc-long-bar.has-hover i.is-hovered{font-size:var(--hcc-swatch-label-font,9.5px)!important;padding:0 var(--hcc-swatch-label-pad,4px)!important}}";

const criticalGuard =
  ".hcc-strip i,.hcc-bar i,.hcc-long-bar i{color:transparent!important;font-size:0!important;line-height:1!important;text-shadow:none!important;overflow:hidden!important}.hcc-strip i:hover,.hcc-strip i.is-hovered,.hcc-bar i:hover,.hcc-bar i.is-hovered,.hcc-long-bar i:hover,.hcc-long-bar i.is-hovered{color:transparent!important;font-size:0!important;line-height:1!important;text-shadow:none!important;overflow:hidden!important;padding:0!important;box-shadow:none!important;filter:none!important}.hcc-toast{display:block!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}.hcc-toast.show{visibility:visible!important;opacity:1!important}";

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
  for (const old of OLD_VERSIONS) next = next.split(old).join(VERSION);
  return next;
}

function stripBlock(source, name) {
  return source.replace(new RegExp(`/\\* ${name} [0-9-]+ \\*/[\\s\\S]*?/\\* ${name} end \\*/`, "g"), "");
}

function appendCssBlock(source, name, css) {
  let next = stripBlock(source, name).trimEnd();
  return `${next}\n/* ${name} ${VERSION} */${css}/* ${name} end */\n`;
}

function neutralizeRawSwatchHover(css) {
  return css.replace(/([^{}]+)\{([^{}]*)\}/g, (match, selector, body) => {
    if (!/(?:\.hcc-strip i(?::first-child)?:(?:hover)|\.hcc-strip i\.active:hover:after|\.hcc-bar i:hover|\.hcc-long-bar i:hover)/.test(selector)) {
      return match;
    }
    const selectors = selector.split(",").map((s) => s.trim()).filter(Boolean);
    const raw = [];
    const keep = [];
    for (const s of selectors) {
      if (/(?:\.hcc-strip i(?::first-child)?:(?:hover)|\.hcc-strip i\.active:hover:after|\.hcc-bar i:hover|\.hcc-long-bar i:hover)/.test(s)) raw.push(s);
      else keep.push(s);
    }
    const keptRule = keep.length ? `${keep.join(",")}{${body}}` : "";
    const normal = raw.filter((s) => !/first-child:hover|active:hover:after/.test(s));
    let neutral = "";
    if (normal.length) {
      neutral += `${normal.join(",")}{flex:1 1 0!important;min-width:0!important;max-width:none!important;color:transparent!important;font-size:0!important;line-height:1!important;box-shadow:none!important;padding:0!important;filter:none!important;text-shadow:none!important}`;
    }
    if (raw.some((s) => /first-child:hover/.test(s))) {
      neutral += ".hcc-strip i:first-child:hover{justify-content:center!important;padding-left:0!important}";
    }
    if (raw.some((s) => /active:hover:after/.test(s))) {
      neutral += ".hcc-strip i.active:hover:after{opacity:1!important}";
    }
    return keptRule + neutral;
  });
}

function patchCss(source) {
  let next = bumpVersions(source);
  next = neutralizeRawSwatchHover(next);
  next = appendCssBlock(next, "hcc-picker-flash-guard", criticalGuard);
  next = appendCssBlock(next, "hcc-swatch-hover-rootfix", swatchHoverCss);
  return next;
}

function routeLangFromHtml(html) {
  const attr = ((html.match(/<html[^>]*\blang="([^"]+)"/i) || [])[1] || "en").toLowerCase();
  if (attr.indexOf("zh") === 0) return "zh";
  if (attr.indexOf("ja") === 0) return "ja";
  if (attr.indexOf("ko") === 0) return "ko";
  if (attr.indexOf("es") === 0) return "es";
  if (attr.indexOf("fr") === 0) return "fr";
  if (attr.indexOf("de") === 0) return "de";
  if (attr.indexOf("pt") === 0) return "pt";
  return "en";
}

function patchInlineStyles(html) {
  return html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/g, (match, attrs, css) => {
    if (!/hcc-strip|hcc-bar|hcc-long-bar|hcc-mobile-overflow-fit|hcc-picker-flash-guard|hcc-hover-flash-rootfix|hcc-swatch-hover-rootfix/.test(css + attrs)) {
      return match;
    }
    return `<style${attrs}>${patchCss(css).trim()}</style>`;
  });
}

function patchServiceWorkerRegistration(html) {
  const swSnippet = `<script>if("serviceWorker" in navigator){window.addEventListener("load",function(){var isLocal=/^(?:localhost|127\\\\.0\\\\.0\\\\.1|::1)$/.test(location.hostname);if(isLocal){if(navigator.serviceWorker.getRegistrations){navigator.serviceWorker.getRegistrations().then(function(rs){rs.forEach(function(r){r.unregister()})}).catch(function(){})}return}setTimeout(function(){navigator.serviceWorker.register("/sw.js?v=${VERSION}").catch(function(){})},4200)})}</script>`;
  return html.replace(/<script>if\("serviceWorker" in navigator\)\{window\.addEventListener\("load",function\(\)\{setTimeout\(function\(\)\{navigator\.serviceWorker\.register\("\/sw\.js"\)\.catch\(function\(\)\{\}\)\},4200\)\}\)\}<\/script>/g, swSnippet);
}

function patchHtml(source) {
  let html = bumpVersions(source);
  const routeLang = routeLangFromHtml(html);
  const boot = `<script>document.documentElement.classList.add("hcc-hover-boot");window.HCC_ASSET_VERSION="${VERSION}";window.HCC_ROUTE_LANG="${routeLang}";window.HCC_ROUTE_FORCED_LANG="${routeLang}";</script>`;
  html = html.replace(/<script>[^<]*window\.HCC_ASSET_VERSION="[^"]+";[^<]*<\/script>/, boot);
  html = patchInlineStyles(html);
  html = patchServiceWorkerRegistration(html);
  return html;
}

function patchColorTitles(source) {
  return source
    .replace(/i\.setAttribute\('data-code',code\);i\.textContent=code;/g, "i.setAttribute('data-code',code);i.setAttribute('aria-label','#'+code);i.textContent=code;")
    .replace(/i\.title='#'\+code;/g, "i.setAttribute('aria-label','#'+code);")
    .replace(/b\.title='#'\+hex;/g, "b.setAttribute('aria-label','#'+hex);")
    .replace(/cell\.title='#'\+hex;/g, "cell.setAttribute('aria-label','#'+hex);")
    .replace(/b\.title='Extracted image color '\+cleanHex\(hex\);/g, "b.setAttribute('aria-label','Extracted image color '+cleanHex(hex));");
}

function patchJs(source) {
  let js = patchColorTitles(bumpVersions(source));
  js = js.replace(
    "function detectLang(){var routed=langFromCode(window.HCC_ROUTE_LANG)||routeLangFromPath();if(routed)return routed;",
    "function detectLang(){var routed=langFromCode(window.HCC_ROUTE_FORCED_LANG)||langFromCode(window.HCC_ROUTE_LANG)||routeLangFromPath();if(routed)return routed;",
  );
  js = js.replace(
    "function bindHoverBootRelease(){if(!document.documentElement||document.documentElement.dataset.hccHoverBootRelease)return;document.documentElement.dataset.hccHoverBootRelease='1';document.addEventListener('mousemove',function(e){if(!document.documentElement.classList.contains('hcc-hover-boot'))return;var t=e.target;if(t&&t.closest&&t.closest('.hcc-strip,.hcc-bar,.hcc-long-bar'))return;releaseHoverBoot()},{passive:true})}",
    "function bindHoverBootRelease(){if(!document.documentElement||document.documentElement.dataset.hccHoverBootRelease)return;document.documentElement.dataset.hccHoverBootRelease='1';document.addEventListener('mousemove',function(e){if(!document.documentElement.classList.contains('hcc-hover-boot'))return;var t=e.target;if(t&&t.closest&&t.closest('.hcc-strip,.hcc-bar,.hcc-long-bar'))return;clearSwatchHover();releaseHoverBoot()},{passive:true})}",
  );
  js = js.replace(
    "if(document.documentElement.classList.contains('hcc-hover-boot')){clearHover();return}if(document.documentElement.classList.contains('hcc-mini-open')){clearHover();return}",
    "if(document.documentElement.classList.contains('hcc-hover-boot')){clearHover();releaseHoverBoot();bar.dataset.hccHoverSkip='1';return}if(bar.dataset.hccHoverSkip==='1'){delete bar.dataset.hccHoverSkip;clearHover();return}if(document.documentElement.classList.contains('hcc-mini-open')){clearHover();return}",
  );
  js = js.replace(
    "if(document.documentElement.classList.contains('hcc-hover-boot')){clear();return}if(document.documentElement.classList.contains('hcc-mini-open')){clear();return}",
    "if(document.documentElement.classList.contains('hcc-hover-boot')){clear();releaseHoverBoot();bar.dataset.hccHoverSkip='1';return}if(bar.dataset.hccHoverSkip==='1'){delete bar.dataset.hccHoverSkip;clear();return}if(document.documentElement.classList.contains('hcc-mini-open')){clear();return}",
  );
  js = js.replace(
    "bar.addEventListener('mouseleave',function(){clearHover();releaseHoverBoot()})",
    "bar.addEventListener('mouseleave',function(){clearHover();delete bar.dataset.hccHoverSkip;releaseHoverBoot()})",
  );
  js = js.replace(
    "bar.addEventListener('mouseleave',function(){clear();releaseHoverBoot()})",
    "bar.addEventListener('mouseleave',function(){clear();delete bar.dataset.hccHoverSkip;releaseHoverBoot()})",
  );
  return js;
}

let cssChanged = 0;
for (const file of walk(path.join(root, "assets", "css"), (file) => file.endsWith(".css"))) {
  if (writeIfChanged(file, patchCss(read(file)))) cssChanged += 1;
}

let jsChanged = 0;
for (const file of walk(path.join(root, "assets", "js"), (file) => file.endsWith(".js"))) {
  if (writeIfChanged(file, patchJs(read(file)))) jsChanged += 1;
}

let htmlChanged = 0;
for (const file of walk(root, (file) => file.endsWith(".html"))) {
  if (writeIfChanged(file, patchHtml(read(file)))) htmlChanged += 1;
}

let swChanged = 0;
const swPath = path.join(root, "sw.js");
if (fs.existsSync(swPath)) {
  const next = bumpVersions(read(swPath)).replace(/colorcodex-static-lang-pages-[0-9-]+/g, `colorcodex-static-lang-pages-${VERSION}`);
  if (writeIfChanged(swPath, next)) swChanged = 1;
}

console.log(JSON.stringify({ version: VERSION, cssChanged, jsChanged, htmlChanged, swChanged }, null, 2));
