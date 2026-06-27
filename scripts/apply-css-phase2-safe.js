const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SHELL_CSS = '/assets/css/critical-shell.css?v=20260627-171500';

const INLINE_CRITICAL_RE = /id=["']hccCritical(?:Picker|Converter|Library|Chart)Css["']/i;
const FULL_PRELOAD_RE = /<link\b(?=[^>]*\bid=["']hccFullCssPreload["'])(?=[^>]*\brel=["']preload["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/i;
const CSS_STYLESHEET_RE = /<link\b(?=[^>]*\brel=["']stylesheet["'])(?=[^>]*\bhref=["'](\/assets\/css\/(?!critical-shell\.css)[^"']+\.css(?:\?[^"']*)?)["'])[^>]*>/gi;
const NOSCRIPT_RE = /<noscript\b[\s\S]*?<\/noscript>/gi;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.isFile() && entry.name === 'index.html') {
      files.push(full);
    }
  }
  return files;
}

function maskNoscript(input) {
  const blocks = [];
  const masked = input.replace(NOSCRIPT_RE, (block) => {
    const token = `__HCC_NOSCRIPT_${blocks.length}__`;
    blocks.push(block);
    return token;
  });
  return { masked, blocks };
}

function restoreNoscript(input, blocks) {
  return input.replace(/__HCC_NOSCRIPT_(\d+)__/g, (_, index) => blocks[Number(index)] || '');
}

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function fullCssLoader(href) {
  const literal = JSON.stringify(href);
  return `<script data-hcc-full-css>(function(){var href=${literal};function load(){if(document.getElementById("hccFullCss"))return;var link=document.createElement("link");link.id="hccFullCss";link.rel="stylesheet";link.href=href;document.head.appendChild(link)}function defer(){(window.requestIdleCallback||function(cb){setTimeout(cb,650)})(load)}if(document.readyState==="complete")defer();else window.addEventListener("load",defer,{once:true})})();</script>`;
}

function noscriptFullCss(href) {
  return `<noscript><link id="hccFullCss" rel="stylesheet" href="${escapeAttr(href)}"></noscript>`;
}

function shellLink() {
  return `<link id="hccCriticalShellCss" rel="stylesheet" href="${SHELL_CSS}">`;
}

function hasKwInlineCritical(head) {
  return head.includes('.kw-nav') && head.includes('.kw-main');
}

function processHead(head) {
  if (head.includes('data-hcc-full-css')) {
    return { head, changed: false, preload: 0, direct: 0, shell: 0 };
  }

  const hasInlineCritical = INLINE_CRITICAL_RE.test(head);
  const hasKwCritical = hasKwInlineCritical(head);
  const shouldAddShell = !hasInlineCritical && !hasKwCritical;
  const maskedState = maskNoscript(head);
  let masked = maskedState.masked;
  let preload = 0;
  let direct = 0;
  let shell = 0;

  masked = masked.replace(FULL_PRELOAD_RE, (_, href) => {
    preload += 1;
    return fullCssLoader(href);
  });

  masked = masked.replace(CSS_STYLESHEET_RE, (tag, href) => {
    if (tag.includes('hccCriticalShellCss')) return tag;
    direct += 1;
    const pieces = [];
    if (shouldAddShell) {
      shell += 1;
      pieces.push(shellLink());
    }
    pieces.push(fullCssLoader(href), noscriptFullCss(href));
    return pieces.join('');
  });

  const next = restoreNoscript(masked, maskedState.blocks);
  return { head: next, changed: next !== head, preload, direct, shell };
}

let changedFiles = 0;
let preloadReplaced = 0;
let directReplaced = 0;
let shellAdded = 0;

for (const file of walk(ROOT)) {
  const source = fs.readFileSync(file, 'utf8');
  const closeHead = source.search(/<\/head>/i);
  if (closeHead === -1) continue;

  const head = source.slice(0, closeHead);
  const rest = source.slice(closeHead);
  const result = processHead(head);
  if (!result.changed) continue;

  fs.writeFileSync(file, result.head + rest);
  changedFiles += 1;
  preloadReplaced += result.preload;
  directReplaced += result.direct;
  shellAdded += result.shell;
}

console.log(JSON.stringify({
  changedFiles,
  preloadReplaced,
  directReplaced,
  shellAdded
}, null, 2));
