const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const oldVersion = '20260627-171500';
const newVersion = '20260627-171500';

const textExts = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.md',
  '.txt',
  '.webmanifest',
  '.xml'
]);

const swScript = `<script>if("serviceWorker" in navigator){(function(){var isLocal=/^(?:localhost|127\\\\.0\\\\.0\\\\.1|::1)$/.test(location.hostname);if(isLocal){var controlled=!!navigator.serviceWorker.controller,key="hccLocalSwCleared-"+(window.HCC_ASSET_VERSION||"${newVersion}"),tasks=[];if(navigator.serviceWorker.getRegistrations){tasks.push(navigator.serviceWorker.getRegistrations().then(function(rs){return Promise.all(rs.map(function(r){return r.unregister()}))}).catch(function(){}))}if(window.caches&&caches.keys){tasks.push(caches.keys().then(function(keys){return Promise.all(keys.map(function(k){return /colorcodex/i.test(k)?caches.delete(k):Promise.resolve()}))}).catch(function(){}))}if(controlled){try{if(sessionStorage.getItem(key)!=="1"){sessionStorage.setItem(key,"1");Promise.all(tasks).then(function(){setTimeout(function(){location.reload()},60)})}}catch(_){Promise.all(tasks)}}return}window.addEventListener("load",function(){setTimeout(function(){navigator.serviceWorker.register("/sw.js?v=${newVersion}").catch(function(){})},4200)})})()}</script>`;

const oldSwScriptRe = /<script>if\("serviceWorker" in navigator\)\{window\.addEventListener\("load",function\(\)\{var isLocal=\/\^\(\?:localhost\|127\\\\\.0\\\\\.0\\\\\.1\|::1\)\$\/\.test\(location\.hostname\);if\(isLocal\)\{if\(navigator\.serviceWorker\.getRegistrations\)\{navigator\.serviceWorker\.getRegistrations\(\)\.then\(function\(rs\)\{rs\.forEach\(function\(r\)\{r\.unregister\(\)\}\)\}\)\.catch\(function\(\)\{\}\)\}return\}setTimeout\(function\(\)\{navigator\.serviceWorker\.register\("\/sw\.js\?v=[^"]+"\)\.catch\(function\(\)\{\}\)\},4200\)\}\)\}<\/script>/g;

let scanned = 0;
let changed = 0;
let swChanged = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.chromium-cdp-profile' || entry.name === '.chromium-verify-profile') continue;
      walk(file);
      continue;
    }
    if (!textExts.has(path.extname(entry.name).toLowerCase())) continue;
    scanned += 1;
    const before = fs.readFileSync(file, 'utf8');
    let after = before.split(oldVersion).join(newVersion);
    if (path.extname(entry.name).toLowerCase() === '.html') {
      const replaced = after.replace(oldSwScriptRe, () => {
        swChanged += 1;
        return swScript;
      });
      after = replaced;
    }
    if (after !== before) {
      fs.writeFileSync(file, after);
      changed += 1;
    }
  }
}

walk(root);

console.log(JSON.stringify({ root, oldVersion, newVersion, scanned, changed, swChanged }, null, 2));
