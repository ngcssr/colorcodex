const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const oldVersion = '20260627-171500';
const newVersion = '20260627-171500';
const textExts = new Set(['.css', '.html', '.js', '.json', '.md', '.txt', '.webmanifest', '.xml']);

function edit(file, before, after) {
  const text = fs.readFileSync(file, 'utf8');
  if (!text.includes(before)) throw new Error(`Pattern not found: ${file}`);
  fs.writeFileSync(file, text.split(before).join(after));
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.chrome-codex-debug' || entry.name.startsWith('.chromium-')) continue;
      walk(file, files);
    } else if (textExts.has(path.extname(entry.name).toLowerCase())) {
      files.push(file);
    }
  }
  return files;
}

const picker = path.join(root, 'assets', 'js', 'picker-lite.js');
const shared = path.join(root, 'assets', 'js', 'shared-core.js');

edit(
  picker,
  "function bindHoverBootRelease(){if(!document.documentElement||document.documentElement.dataset.hccHoverBootRelease)return;document.documentElement.dataset.hccHoverBootRelease='1';document.addEventListener('mousemove',function(e){",
  "function bindHoverBootRelease(){if(!document.documentElement||document.documentElement.dataset.hccHoverBootRelease)return;document.documentElement.dataset.hccHoverBootRelease='1';setTimeout(function(){clearSwatchHover();releaseHoverBoot()},420);document.addEventListener('mousemove',function(e){"
);

edit(
  shared,
  "function bindHoverBootRelease(){if(!document.documentElement||document.documentElement.dataset.hccHoverBootRelease)return;document.documentElement.dataset.hccHoverBootRelease='1';document.addEventListener('mousemove',function(e){",
  "function bindHoverBootRelease(){if(!document.documentElement||document.documentElement.dataset.hccHoverBootRelease)return;document.documentElement.dataset.hccHoverBootRelease='1';setTimeout(function(){clearSwatchHover();releaseHoverBoot()},420);document.addEventListener('mousemove',function(e){"
);

let versionChanged = 0;
for (const file of walk(root)) {
  const before = fs.readFileSync(file, 'utf8');
  const after = before.split(oldVersion).join(newVersion);
  if (after !== before) {
    fs.writeFileSync(file, after);
    versionChanged += 1;
  }
}

console.log(JSON.stringify({ root, oldVersion, newVersion, versionChanged }, null, 2));
