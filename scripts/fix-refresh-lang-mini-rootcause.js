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
];

const hoverRootfixCss =
  ".hcc-strip:not(.has-hover) i,.hcc-bar:not(.has-hover) i,.hcc-long-bar:not(.has-hover) i,.hcc-strip i:hover,.hcc-bar i:hover,.hcc-long-bar i:hover,html.hcc-hover-boot .hcc-strip i,html.hcc-hover-boot .hcc-strip i:hover,html.hcc-hover-boot .hcc-strip i.is-hovered,html.hcc-hover-boot .hcc-bar i,html.hcc-hover-boot .hcc-bar i:hover,html.hcc-hover-boot .hcc-bar i.is-hovered,html.hcc-hover-boot .hcc-long-bar i,html.hcc-hover-boot .hcc-long-bar i:hover,html.hcc-hover-boot .hcc-long-bar i.is-hovered,html.hcc-mini-open .hcc-strip i,html.hcc-mini-open .hcc-strip i:hover,html.hcc-mini-open .hcc-strip i.is-hovered{color:transparent!important;font-size:0!important;line-height:1!important;text-shadow:none!important;overflow:hidden!important;padding:0!important;box-shadow:none!important;filter:none!important}.hcc-strip.has-hover i.is-hovered,.hcc-bar.has-hover i.is-hovered,.hcc-long-bar.has-hover i.is-hovered{color:var(--strip-text,var(--swatch-text,#000))!important;font-size:var(--hcc-swatch-label-font,10px)!important;padding:0 var(--hcc-swatch-label-pad,5px)!important}.hcc-toast:not(.show){visibility:hidden!important;opacity:0!important;pointer-events:none!important}html.hcc-mini-open .hcc-strip.has-hover i.active:after{opacity:1!important}.hcc-strip i[title],.hcc-bar i[title],.hcc-long-bar i[title]{pointer-events:auto}";

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

function patchCss(source) {
  let next = bumpVersions(source);
  next = appendCssBlock(next, "hcc-hover-flash-rootfix", hoverRootfixCss);
  if (next.includes("hcc-picker-flash-guard")) {
    next = next.replace(
      /\/\* hcc-picker-flash-guard [0-9-]+ \*\/[\s\S]*?\/\* hcc-picker-flash-guard end \*\//g,
      `/* hcc-picker-flash-guard ${VERSION} */${criticalGuard}/* hcc-picker-flash-guard end */`,
    );
  }
  return next;
}

function patchHtml(source) {
  let html = bumpVersions(source);
  const isEnglishRoute = /<html lang="en"/.test(html);
  html = html.replace(
    /<script>[^<]*window\.HCC_ASSET_VERSION="[^"]+";[^<]*<\/script>/,
    `<script>document.documentElement.classList.add("hcc-hover-boot");window.HCC_ASSET_VERSION="${VERSION}";${isEnglishRoute ? 'window.HCC_ROUTE_LANG="en";' : ""}</script>`,
  );
  html = html.replace(/<style id="hccCriticalPickerCss">([\s\S]*?)<\/style>/g, (_m, css) => {
    let nextCss = bumpVersions(css);
    nextCss = nextCss.replace(
      /\/\* hcc-picker-flash-guard [0-9-]+ \*\/[\s\S]*?\/\* hcc-picker-flash-guard end \*\//g,
      "",
    ).trimEnd();
    nextCss += `\n/* hcc-picker-flash-guard ${VERSION} */${criticalGuard}/* hcc-picker-flash-guard end */`;
    nextCss = appendCssBlock(nextCss, "hcc-hover-flash-rootfix", hoverRootfixCss).trim();
    return `<style id="hccCriticalPickerCss">${nextCss}</style>`;
  });
  return html;
}

function patchPickerLite(source) {
  let js = patchColorTitles(bumpVersions(source));
  js = js.replace(/setTimeout\(function\(\)\{if\(document\.documentElement&&document\.documentElement\.classList\)document\.documentElement\.classList\.remove\('hcc-hover-boot'\)\},900\);\n/g, "");
  if (!js.includes("function clearSwatchHover()")) {
    js = js.replace(
      "  function trackColorBars(){",
      "  function clearSwatchHover(){Array.prototype.slice.call(document.querySelectorAll('.hcc-strip,.hcc-bar,.hcc-long-bar')).forEach(function(bar){Array.prototype.slice.call(bar.querySelectorAll('.is-hovered,.is-before-hover,.is-after-hover')).forEach(function(el){el.classList.remove('is-hovered');el.classList.remove('is-before-hover');el.classList.remove('is-after-hover')});bar.classList.remove('has-hover')})}\n  function setMiniPickerOpen(open){if(document.documentElement&&document.documentElement.classList){document.documentElement.classList[open?'add':'remove']('hcc-mini-open')}if(open)clearSwatchHover()}\n  function trackColorBars(){",
    );
  }
  if (!js.includes("function releaseHoverBoot()")) {
    js = js.replace(
      "  function setMiniPickerOpen(open){",
      "  function releaseHoverBoot(){if(document.documentElement&&document.documentElement.classList)document.documentElement.classList.remove('hcc-hover-boot')}\n  function bindHoverBootRelease(){if(!document.documentElement||document.documentElement.dataset.hccHoverBootRelease)return;document.documentElement.dataset.hccHoverBootRelease='1';document.addEventListener('mousemove',function(e){if(!document.documentElement.classList.contains('hcc-hover-boot'))return;var t=e.target;if(t&&t.closest&&t.closest('.hcc-strip,.hcc-bar,.hcc-long-bar'))return;releaseHoverBoot()},{passive:true})}\n  function setMiniPickerOpen(open){",
    );
  }
  if (!js.includes("function bindHoverBootRelease()")) {
    js = js.replace(
      "  function releaseHoverBoot(){if(document.documentElement&&document.documentElement.classList)document.documentElement.classList.remove('hcc-hover-boot')}\n",
      "  function releaseHoverBoot(){if(document.documentElement&&document.documentElement.classList)document.documentElement.classList.remove('hcc-hover-boot')}\n  function bindHoverBootRelease(){if(!document.documentElement||document.documentElement.dataset.hccHoverBootRelease)return;document.documentElement.dataset.hccHoverBootRelease='1';document.addEventListener('mousemove',function(e){if(!document.documentElement.classList.contains('hcc-hover-boot'))return;var t=e.target;if(t&&t.closest&&t.closest('.hcc-strip,.hcc-bar,.hcc-long-bar'))return;releaseHoverBoot()},{passive:true})}\n",
    );
  }
  js = js.replace(
    "function trackColorBars(){Array.prototype.slice.call",
    "function trackColorBars(){bindHoverBootRelease();Array.prototype.slice.call",
  );
  js = js.replace(
    "bar.addEventListener('mousemove',function(e){if(document.documentElement.classList.contains('hcc-hover-boot')||document.documentElement.classList.contains('hcc-mini-open')){clearHover();return}var item=null,picked=null;",
    "bar.addEventListener('mousemove',function(e){if(document.documentElement.classList.contains('hcc-hover-boot')){clearHover();return}if(document.documentElement.classList.contains('hcc-mini-open')){clearHover();return}var item=null,picked=null;",
  );
  js = js.replace(
    "bar.addEventListener('mousemove',function(e){var item=null,picked=null;",
    "bar.addEventListener('mousemove',function(e){if(document.documentElement.classList.contains('hcc-hover-boot')){clearHover();return}if(document.documentElement.classList.contains('hcc-mini-open')){clearHover();return}var item=null,picked=null;",
  );
  js = js.replace(
    "bar.addEventListener('mouseleave',clearHover)})}",
    "bar.addEventListener('mouseleave',function(){clearHover();releaseHoverBoot()})})}",
  );
  js = js.replace(
    "bar.addEventListener('mousemove',function(e){if(document.documentElement.classList.contains('hcc-hover-boot')){clearHover();releaseHoverBoot();return}if(document.documentElement.classList.contains('hcc-mini-open')){clearHover();return}var item=null,picked=null;",
    "bar.addEventListener('mousemove',function(e){if(document.documentElement.classList.contains('hcc-hover-boot')){clearHover();return}if(document.documentElement.classList.contains('hcc-mini-open')){clearHover();return}var item=null,picked=null;",
  );
  js = js.replace(
    "miniTrigger.onclick=function(e){miniPicker.className=miniPicker.className.indexOf('show')>-1?'hcc-mini-picker':'hcc-mini-picker show';if(palettePanel)palettePanel.className='hcc-palette-panel';if(historyPanel)historyPanel.className='hcc-history-panel';e.stopPropagation()};",
    "miniTrigger.onclick=function(e){var open=miniPicker.className.indexOf('show')<0;miniPicker.className=open?'hcc-mini-picker show':'hcc-mini-picker';setMiniPickerOpen(open);if(palettePanel)palettePanel.className='hcc-palette-panel';if(historyPanel)historyPanel.className='hcc-history-panel';e.stopPropagation()};",
  );
  js = js.replace(
    "if(miniPicker)miniPicker.className='hcc-mini-picker';e.stopPropagation()};",
    "if(miniPicker){miniPicker.className='hcc-mini-picker';setMiniPickerOpen(false)}e.stopPropagation()};",
  );
  js = js.replace(
    "if(miniPicker&&!miniPicker.contains(e.target)&&e.target.id!=='hccMiniTrigger'&&!(miniTrigger&&miniTrigger.contains(e.target)))miniPicker.className='hcc-mini-picker';",
    "if(miniPicker&&!miniPicker.contains(e.target)&&e.target.id!=='hccMiniTrigger'&&!(miniTrigger&&miniTrigger.contains(e.target))){miniPicker.className='hcc-mini-picker';setMiniPickerOpen(false)}",
  );
  return js;
}

function patchSharedCore(source) {
  let js = patchColorTitles(bumpVersions(source));
  js = js.replace(/setTimeout\(function\(\)\{if\(document\.documentElement&&document\.documentElement\.classList\)document\.documentElement\.classList\.remove\('hcc-hover-boot'\)\},900\);\n/g, "");
  js = js.replace(/i\.setAttribute\('data-code',code\);i\.textContent=code;/g, "i.setAttribute('data-code',code);i.setAttribute('aria-label','#'+code);i.textContent=code;");
  if (!js.includes("function clearSwatchHover()")) {
    js = js.replace(
      "  function trackColorBars(){",
      "  function clearSwatchHover(){Array.prototype.slice.call(document.querySelectorAll('.hcc-strip,.hcc-bar,.hcc-long-bar')).forEach(function(bar){Array.prototype.slice.call(bar.querySelectorAll('.is-hovered,.is-before-hover,.is-after-hover')).forEach(function(el){el.classList.remove('is-hovered');el.classList.remove('is-before-hover');el.classList.remove('is-after-hover')});bar.classList.remove('has-hover')})}\n  function setMiniPickerOpen(open){if(document.documentElement&&document.documentElement.classList){document.documentElement.classList[open?'add':'remove']('hcc-mini-open')}if(open)clearSwatchHover()}\n  function trackColorBars(){",
    );
  }
  if (!js.includes("function releaseHoverBoot()")) {
    js = js.replace(
      "  function setMiniPickerOpen(open){",
      "  function releaseHoverBoot(){if(document.documentElement&&document.documentElement.classList)document.documentElement.classList.remove('hcc-hover-boot')}\n  function bindHoverBootRelease(){if(!document.documentElement||document.documentElement.dataset.hccHoverBootRelease)return;document.documentElement.dataset.hccHoverBootRelease='1';document.addEventListener('mousemove',function(e){if(!document.documentElement.classList.contains('hcc-hover-boot'))return;var t=e.target;if(t&&t.closest&&t.closest('.hcc-strip,.hcc-bar,.hcc-long-bar'))return;releaseHoverBoot()},{passive:true})}\n  function setMiniPickerOpen(open){",
    );
  }
  if (!js.includes("function bindHoverBootRelease()")) {
    js = js.replace(
      "  function releaseHoverBoot(){if(document.documentElement&&document.documentElement.classList)document.documentElement.classList.remove('hcc-hover-boot')}\n",
      "  function releaseHoverBoot(){if(document.documentElement&&document.documentElement.classList)document.documentElement.classList.remove('hcc-hover-boot')}\n  function bindHoverBootRelease(){if(!document.documentElement||document.documentElement.dataset.hccHoverBootRelease)return;document.documentElement.dataset.hccHoverBootRelease='1';document.addEventListener('mousemove',function(e){if(!document.documentElement.classList.contains('hcc-hover-boot'))return;var t=e.target;if(t&&t.closest&&t.closest('.hcc-strip,.hcc-bar,.hcc-long-bar'))return;releaseHoverBoot()},{passive:true})}\n",
    );
  }
  js = js.replace(
    "function trackColorBars(){Array.prototype.slice.call",
    "function trackColorBars(){bindHoverBootRelease();Array.prototype.slice.call",
  );
  js = js.replace(
    "bar.addEventListener('mousemove',function(e){if(document.documentElement.classList.contains('hcc-hover-boot')||document.documentElement.classList.contains('hcc-mini-open')){clear();return}var item=null,picked=null;",
    "bar.addEventListener('mousemove',function(e){if(document.documentElement.classList.contains('hcc-hover-boot')){clear();return}if(document.documentElement.classList.contains('hcc-mini-open')){clear();return}var item=null,picked=null;",
  );
  js = js.replace(
    "bar.addEventListener('mousemove',function(e){var item=null,picked=null;",
    "bar.addEventListener('mousemove',function(e){if(document.documentElement.classList.contains('hcc-hover-boot')){clear();return}if(document.documentElement.classList.contains('hcc-mini-open')){clear();return}var item=null,picked=null;",
  );
  js = js.replace(
    "bar.addEventListener('mouseleave',clear)})}",
    "bar.addEventListener('mouseleave',function(){clear();releaseHoverBoot()})})}",
  );
  js = js.replace(
    "bar.addEventListener('mouseleave',function(){clear();releaseHoverBoot()})}  function renderVariations",
    "bar.addEventListener('mouseleave',function(){clear();releaseHoverBoot()})})}  function renderVariations",
  );
  js = js.replace(
    "bar.addEventListener('mousemove',function(e){if(document.documentElement.classList.contains('hcc-hover-boot')){clear();releaseHoverBoot();return}if(document.documentElement.classList.contains('hcc-mini-open')){clear();return}var item=null,picked=null;",
    "bar.addEventListener('mousemove',function(e){if(document.documentElement.classList.contains('hcc-hover-boot')){clear();return}if(document.documentElement.classList.contains('hcc-mini-open')){clear();return}var item=null,picked=null;",
  );
  js = js.replace(
    "miniTrigger.onclick=function(e){miniPicker.className=miniPicker.className.indexOf('show')>-1?'hcc-mini-picker':'hcc-mini-picker show';palettePanel.className='hcc-palette-panel';historyPanel.className='hcc-history-panel';e.stopPropagation()};",
    "miniTrigger.onclick=function(e){var open=miniPicker.className.indexOf('show')<0;miniPicker.className=open?'hcc-mini-picker show':'hcc-mini-picker';setMiniPickerOpen(open);palettePanel.className='hcc-palette-panel';historyPanel.className='hcc-history-panel';e.stopPropagation()};",
  );
  js = js.replace(
    "miniPicker.className='hcc-mini-picker';e.stopPropagation()};",
    "miniPicker.className='hcc-mini-picker';setMiniPickerOpen(false);e.stopPropagation()};",
  );
  js = js.replace(
    "if(!miniPicker.contains(e.target)&&e.target.id!=='hccMiniTrigger'&&!miniTrigger.contains(e.target))miniPicker.className='hcc-mini-picker';",
    "if(!miniPicker.contains(e.target)&&e.target.id!=='hccMiniTrigger'&&!miniTrigger.contains(e.target)){miniPicker.className='hcc-mini-picker';setMiniPickerOpen(false)}",
  );
  return js;
}

function patchColorTitles(source) {
  return source
    .replace(/i\.setAttribute\('data-code',code\);i\.textContent=code;/g, "i.setAttribute('data-code',code);i.setAttribute('aria-label','#'+code);i.textContent=code;")
    .replace(/i\.title='#'\+code;/g, "i.setAttribute('aria-label','#'+code);")
    .replace(/b\.title='#'\+hex;/g, "b.setAttribute('aria-label','#'+hex);")
    .replace(/cell\.title='#'\+hex;/g, "cell.setAttribute('aria-label','#'+hex);")
    .replace(/b\.title='Extracted image color '\+cleanHex\(hex\);/g, "b.setAttribute('aria-label','Extracted image color '+cleanHex(hex));");
}

let cssChanged = 0;
for (const file of walk(path.join(root, "assets", "css"), (file) => file.endsWith(".css"))) {
  if (writeIfChanged(file, patchCss(read(file)))) cssChanged += 1;
}

let jsChanged = 0;
for (const file of walk(path.join(root, "assets", "js"), (file) => file.endsWith(".js"))) {
  const name = path.basename(file);
  let next = patchColorTitles(bumpVersions(read(file)));
  if (name === "picker-lite.js") next = patchPickerLite(next);
  if (name === "shared-core.js") next = patchSharedCore(next);
  if (writeIfChanged(file, next)) jsChanged += 1;
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
