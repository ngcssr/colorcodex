const fs = require("fs");
const path = require("path");

const root = process.cwd();

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

const footerBefore =
  ".hcc-after-shell{background:#fff;margin:0;position:relative;left:50%;width:100vw;transform:translateX(-50%);z-index:1;overflow:hidden}";
const footerNarrowBefore =
  ".hcc-after-shell{background:#fff;margin:0;width:100%;max-width:none;position:relative;left:auto;transform:none;z-index:1;overflow:hidden}";
const footerAfter =
  ".hcc-after-shell{background:#fff;margin:0;position:relative;left:50%;width:100vw;max-width:none;transform:translateX(-50%);z-index:1;overflow:hidden}";

const criticalWideBefore =
  ".hcc-sections,.hcc-after-shell{max-width:1216px;margin:24px auto 0}";
const criticalWideNarrowBefore =
  ".hcc-after-shell{margin:24px 0 0;width:100%;max-width:none}";
const criticalWideAfter =
  ".hcc-sections{max-width:1216px;margin:24px auto 0}.hcc-after-shell{background:#fff;margin:24px 0 0;position:relative;left:50%;width:100vw;max-width:none;transform:translateX(-50%);z-index:1;overflow:hidden}";

const criticalTightBefore =
  ".hcc-after-shell{max-width:1216px;margin:12px auto 0}";
const criticalTightNarrowBefore =
  ".hcc-after-shell{margin:12px 0 0;width:100%;max-width:none}";
const criticalTightAfter =
  ".hcc-after-shell{background:#fff;margin:12px 0 0;position:relative;left:50%;width:100vw;max-width:none;transform:translateX(-50%);z-index:1;overflow:hidden}";

const mobileOverride =
  "@media (max-width:760px){.hcc-work{display:block!important;grid-template-columns:none!important;grid-auto-columns:auto!important;overflow:hidden}.hcc-work>*{min-width:0}.hcc-preview-col{display:grid!important;grid-template-columns:1fr!important;grid-column:auto!important;width:100%!important;max-width:100%!important;min-width:0!important;margin-top:18px!important;gap:12px!important}.hcc-select-wrap,.hcc-harmony-btn,#hccPreview,.hcc-preview{width:100%!important;max-width:100%!important;min-width:0!important}.hcc-preview{display:grid!important;place-items:center!important}}";

const cssFiles = walk(path.join(root, "assets", "css"), (file) => file.endsWith(".css"));
const htmlFiles = walk(root, (file) => file.endsWith(".html"));

let cssFooterChanged = 0;
let cssMobileChanged = 0;
let htmlChanged = 0;
let htmlFooterMoved = 0;

function findMatchingTagEnd(source, start, tagName) {
  const re = new RegExp(`<\\/?${tagName}\\b[^>]*>`, "g");
  re.lastIndex = start;
  let depth = 0;
  let match;
  while ((match = re.exec(source))) {
    if (match[0].startsWith("</")) depth -= 1;
    else depth += 1;
    if (depth === 0) return re.lastIndex;
  }
  return -1;
}

function moveFooterAfterSections(source) {
  const sectionStart = source.indexOf('<section class="hcc-after-shell"');
  if (sectionStart === -1) return source;
  const sectionEnd = findMatchingTagEnd(source, sectionStart, "section");
  if (sectionEnd === -1) return source;
  const sectionsStart = source.lastIndexOf('<div class="hcc-sections"', sectionStart);
  if (sectionsStart === -1) return source;
  const sectionsEnd = findMatchingTagEnd(source, sectionsStart, "div");
  if (sectionsEnd === -1 || sectionsEnd < sectionEnd) return source;

  const footer = source.slice(sectionStart, sectionEnd);
  const withoutFooter = source.slice(0, sectionStart) + source.slice(sectionEnd);
  const adjustedSectionsEnd = sectionsEnd - footer.length;
  return withoutFooter.slice(0, adjustedSectionsEnd) + footer + withoutFooter.slice(adjustedSectionsEnd);
}

for (const file of cssFiles) {
  const changed = updateFile(file, (source) => {
    let next = source.split(footerBefore).join(footerAfter).split(footerNarrowBefore).join(footerAfter);
    if (
      /assets[\\\/]css[\\\/](picker|image|wheel|shared-core)\.css$/.test(file) &&
      !next.includes(mobileOverride)
    ) {
      next += mobileOverride;
    }
    return next;
  });
  if (changed) {
    const content = fs.readFileSync(file, "utf8");
    if (content.includes(footerAfter)) cssFooterChanged += 1;
    if (content.includes(mobileOverride)) cssMobileChanged += 1;
  }
}

for (const file of htmlFiles) {
  const changed = updateFile(file, (source) => {
    const moved = moveFooterAfterSections(source);
    if (moved !== source) htmlFooterMoved += 1;
    return moved
      .split(criticalWideBefore)
      .join(criticalWideAfter)
      .split(criticalWideNarrowBefore)
      .join(criticalWideAfter)
      .split(criticalTightBefore)
      .join(criticalTightAfter)
      .split(criticalTightNarrowBefore)
      .join(criticalTightAfter);
  });
  if (changed) htmlChanged += 1;
}

console.log(
  JSON.stringify(
    {
      cssFiles: cssFiles.length,
      htmlFiles: htmlFiles.length,
      cssFooterChanged,
      cssMobileChanged,
      htmlChanged,
      htmlFooterMoved,
    },
    null,
    2
  )
);
