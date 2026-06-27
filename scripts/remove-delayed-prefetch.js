const fs = require("fs");
const path = require("path");

const root = process.cwd();

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

let visited = 0;
let changed = 0;

for (const file of walk(root)) {
  visited += 1;
  const before = fs.readFileSync(file, "utf8");
  const after = before.replace(
    /;setTimeout\(function\(\)\{loadScript\("\/prefetch\.js\?v="\+window\.HCC_ASSET_VERSION\)\},5200\)/g,
    ""
  );
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    changed += 1;
  }
}

console.log(JSON.stringify({ visited, changed }, null, 2));
