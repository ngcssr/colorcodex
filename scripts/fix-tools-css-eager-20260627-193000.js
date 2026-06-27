const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const version = "20260627-193000";
const langs = ["", "zh", "ja", "ko", "es", "fr", "de", "pt"];
const targets = [
  { slug: "contrast-checker", css: "contrast.css" },
  { slug: "color-mixer", css: "mixer.css" },
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

let changed = 0;

for (const lang of langs) {
  for (const target of targets) {
    const file = path.join(root, lang, target.slug, "index.html");
    if (!fs.existsSync(file)) {
      throw new Error(`Missing expected page: ${file}`);
    }

    const css = escapeRegex(target.css);
    const delayedCssPattern = new RegExp(
      `<script data-hcc-full-css>\\(function\\(\\)\\{var href="/assets/css/${css}\\?v=\\d{8}-\\d{6}";[\\s\\S]*?\\}\\)\\(\\);<\\/script><noscript><link id="hccFullCss" rel="stylesheet" href="/assets/css/${css}\\?v=\\d{8}-\\d{6}"><\\/noscript>`
    );
    const directCssPattern = new RegExp(
      `<link id="hccFullCss" rel="stylesheet" href="/assets/css/${css}\\?v=\\d{8}-\\d{6}">`
    );
    const replacement = `<link id="hccFullCss" rel="stylesheet" href="/assets/css/${target.css}?v=${version}">`;

    const before = fs.readFileSync(file, "utf8");
    let after = before;

    if (delayedCssPattern.test(after)) {
      after = after.replace(delayedCssPattern, replacement);
    } else if (directCssPattern.test(after)) {
      after = after.replace(directCssPattern, replacement);
    } else {
      throw new Error(`Could not find CSS loader for ${target.slug} in ${file}`);
    }

    if (after !== before) {
      fs.writeFileSync(file, after);
      changed += 1;
      console.log(`updated ${path.relative(root, file)}`);
    }
  }
}

console.log(`tools CSS eager load pages updated: ${changed}`);
