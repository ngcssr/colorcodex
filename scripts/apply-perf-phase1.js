const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pickerPages = [
  'index.html',
  path.join('color-picker', 'index.html'),
  path.join('zh', 'color-picker', 'index.html'),
];

const criticalCss = [
  '<style id="hccCriticalPickerCss">',
  'html,body{margin:0;padding:0;background:#fff;color:#050505;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;overflow-x:hidden}*{box-sizing:border-box}.hcc-app{min-height:100vh;background:#fff;color:#050505}.hcc-nav{height:58px;border-bottom:1px solid #e5e5e5;background:#fff;display:flex;align-items:center;gap:30px;padding:0 34px;overflow:visible;position:relative;z-index:80}.hcc-logo{width:32px;height:32px;border-radius:50%;background:conic-gradient(#c11007,#a50c36,#861043,#2563eb,#0ea5e9,#22c55e,#facc15,#f54927,#c11007);position:relative;flex:0 0 auto}.hcc-logo:after{content:"";position:absolute;inset:10px;border-radius:50%;background:#fff}.hcc-nav a{height:38px;border:0;background:transparent;border-radius:8px;padding:0 10px;font-size:14px;font-weight:760;color:#1f2937;text-decoration:none;display:inline-flex;align-items:center;white-space:nowrap}.hcc-nav a:hover,.hcc-nav a.active{background:#f5f5f5;color:#050505}.hcc-nav-item{height:58px;position:relative;display:inline-flex;align-items:center;flex:0 0 auto}.hcc-nav-item.has-menu>a:after{content:"";width:7px;height:7px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:translateY(-3px) rotate(45deg);margin-left:7px}.hcc-nav-menu,.hcc-mobile-menu{display:none}.hcc-lang-switch{margin-left:auto;width:176px;height:32px;position:relative;display:block;flex:0 0 auto}.hcc-lang-button{width:100%;height:32px;border:1px solid #dedede;border-radius:7px;background:#fff;color:#050505;font-size:14px;font-weight:760;padding:0 38px 0 14px;cursor:pointer;text-align:left;display:flex;align-items:center}.hcc-lang-menu{position:absolute;right:0;top:38px;width:176px;background:#fff;border:1px solid #d9d9d9;border-radius:10px;padding:6px;display:none;z-index:240}.hcc-lang-switch.show .hcc-lang-menu{display:grid;gap:4px}.hcc-lang-menu button{height:34px;border:0;border-radius:7px;background:#fff;color:#111827;font-size:14px;font-weight:760;text-align:left;padding:0 12px;cursor:pointer}.hcc-mobile-menu-toggle{display:none}.hcc-hero{min-height:346px;padding:46px 34px 104px;background:#f7f7f7}.hcc-hero-inner{max-width:1216px;margin:0 auto}.hcc-crumb{font-size:14px;color:#4b5563;font-weight:500;margin-bottom:12px}.hcc-hero h1{font-size:56px;line-height:1.05;margin:0;font-weight:900;letter-spacing:0}.hcc-hero p{max-width:760px;margin:16px 0 0;color:#1f2937;font-size:24px;line-height:1.42;font-weight:500}.hcc-shell{max-width:1216px;margin:-34px auto 0;border:1px solid #dedede;border-radius:14px;background:#fff;position:relative;z-index:2}.hcc-summary{height:62px;display:grid;grid-template-columns:74px repeat(4,auto) minmax(252px,1fr) 28px 32px 32px;align-items:center;column-gap:20px;padding:0 16px 0 18px;border-bottom:1px solid #e5e5e5;position:relative}.hcc-mini-trigger{width:74px;height:44px;border:1px solid #dedede;border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;gap:13px;cursor:pointer;padding:0}.hcc-dot{width:24px;height:24px;border-radius:50%;background:#6df3ea;display:inline-block;flex:0 0 auto}.hcc-eyedrop-icon{width:20px;height:20px;color:#111;display:block;opacity:.92;flex:0 0 auto}.hcc-eyedrop-icon path{fill:currentColor;stroke:none}.hcc-stat{display:flex;align-items:baseline;gap:9px;white-space:nowrap;min-width:0}.hcc-stat span,.hcc-stat b{font-size:14px}.hcc-stat span{color:#525866;font-weight:500}.hcc-stat b{color:#020617;font-weight:760}.hcc-strip{justify-self:end;width:352px;height:32px;border-radius:999px;overflow:hidden;display:flex;background:#6df3ea;cursor:pointer;position:relative}.hcc-icon-btn{width:32px;height:32px;border:0;background:#fff;border-radius:999px;cursor:pointer;color:#111;font-weight:800;display:inline-grid;place-items:center;position:relative;font-size:0}.hcc-export-icon,.hcc-history-icon{width:17px;height:17px;display:block;color:currentColor;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;fill:none}.hcc-work{padding:32px 40px 36px 46px;display:grid;grid-template-columns:432px 304px 1fr;gap:16px;align-items:start}.hcc-picker-card{border:1px solid #dedede;border-radius:12px;padding:23px 24px 24px;background:#fff}.hcc-standard-picker{display:block}.hcc-image-picker,.hcc-wheel-picker{display:none}.hcc-sv{height:254px;border:1px solid #d8d8d8;border-radius:7px;position:relative;background:linear-gradient(0deg,#000,rgba(0,0,0,0)),linear-gradient(90deg,#fff,hsla(var(--hue,176),100%,50%,0)),hsl(var(--hue,176),100%,50%);cursor:crosshair;touch-action:none;overflow:hidden}.hcc-target{position:absolute;width:22px;height:22px;border-radius:50%;border:5px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.36),0 1px 3px rgba(0,0,0,.18);left:55.144%;top:4.706%;transform:translate(-50%,-50%);z-index:2}.hcc-hue{width:100%;height:11px;margin-top:16px;border-radius:999px;background:linear-gradient(90deg,red,#ff0,lime,cyan,blue,#f0f,red);position:relative;cursor:pointer;touch-action:none}.hcc-hue-knob{position:absolute;top:50%;left:48.88%;width:18px;height:18px;border-radius:50%;background:hsl(176,100%,50%);border:3px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.25);transform:translate(-50%,-50%)}.hcc-input-row{height:40px;margin-top:25px;border:1px solid #dedede;border-radius:10px;display:grid;grid-template-columns:30px auto minmax(0,1fr) 38px 88px;align-items:center;padding:0 5px 0 8px;gap:4px}.hcc-color-input{border:0;outline:0;font-weight:780;font-size:14px;min-width:0;background:#fff}.hcc-copy{width:32px;height:32px;border:0;background:#fff;cursor:pointer;color:#555;font-size:0}.hcc-select{height:32px;border:0;border-radius:7px;background:#f4f4f4;font-weight:720;padding:0 8px}.hcc-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:42px}.hcc-btn{height:40px;border-radius:8px;border:1px solid #dedede;background:#fff;font-weight:820;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px}.hcc-btn-dark{background:#050505;color:#fff;border-color:#050505}.hcc-preview-col{min-width:0}.hcc-select-wrap{height:40px;position:relative}.hcc-harmony-btn{width:100%;height:40px;border:1px solid #dedede;border-radius:8px;background:#fff;font-weight:760;text-align:left;padding:0 14px;cursor:pointer}.hcc-harmony-menu{display:none;position:absolute;top:44px;left:0;right:0;background:#fff;border:1px solid #d9d9d9;border-radius:10px;padding:6px;z-index:20}.hcc-harmony-menu.show{display:grid;gap:4px}.hcc-harmony-select,.hcc-clear-select{display:none}.hcc-preview{min-height:254px;border-radius:12px;background:#6df3ea;margin-top:16px}.hcc-mini-picker,.hcc-palette-panel,.hcc-history-panel,.hcc-modal{display:none}.hcc-sections,.hcc-after-shell{max-width:1216px;margin:24px auto 0}.hcc-info-text{max-width:900px;margin:0 auto;padding:0 34px 70px;color:#1f2937}.hcc-info-text h2{font-size:34px;line-height:1.15;margin:42px 0 16px;color:#050505}.hcc-info-text h3{font-size:24px;line-height:1.2;margin:34px 0 12px;color:#050505}.hcc-info-text p{font-size:18px;line-height:1.62;margin:0 0 16px}@media (max-width:1040px){.hcc-summary{grid-template-columns:74px repeat(2,auto) minmax(180px,1fr) 28px 32px 32px}.hcc-stat:nth-of-type(n+3){display:none}.hcc-work{grid-template-columns:minmax(0,432px) minmax(0,1fr);padding:28px}.hcc-preview-col{grid-column:2}.hcc-strip{width:100%}}@media (max-width:760px){.hcc-nav{height:56px;gap:10px;padding:0 18px}.hcc-nav>a:nth-of-type(n+4),.hcc-nav-item{display:none}.hcc-lang-switch{width:92px}.hcc-hero{min-height:268px;padding:74px 28px 30px}.hcc-hero h1{font-size:42px;line-height:1.08}.hcc-hero p{font-size:19px;line-height:1.42}.hcc-shell{margin:0;border-left:0;border-right:0;border-radius:0}.hcc-summary{grid-template-columns:28px minmax(0,1fr) 24px 30px 30px;height:58px;padding:0 20px;gap:7px}.hcc-mini-trigger{width:28px;height:32px;border:0}.hcc-mini-trigger .hcc-eyedrop-icon{display:none}.hcc-stat:not(:first-of-type){display:none}.hcc-strip{height:28px;min-width:0}.hcc-work{display:block;padding:28px 20px 32px}.hcc-picker-card{padding:18px 20px 20px}.hcc-sv{height:auto;aspect-ratio:1.52/1;min-height:188px;max-height:242px}.hcc-preview-col{margin-top:18px}.hcc-preview{min-height:160px}.hcc-actions{margin-top:24px}.hcc-sections{margin:24px 20px 0}.hcc-info-text{padding:0 8px 52px}.hcc-info-text h2{font-size:30px}.hcc-info-text h3{font-size:22px}.hcc-info-text p{font-size:18px}}',
  '</style>',
].join('');

const firstScreenFitCss = [
  '<style id="hccFirstScreenFit">',
  '@media (min-width:761px){body[data-hcc-page="picker"] .hcc-hero{min-height:300px;padding-top:40px;padding-bottom:84px}body[data-hcc-page="picker"] .hcc-sv{height:230px}body[data-hcc-page="picker"] .hcc-input-row{margin-top:18px}body[data-hcc-page="picker"] .hcc-actions{margin-top:24px}}',
  '</style>',
].join('');

function asyncCssLink(href) {
  return '<link id="hccFullCssPreload" rel="preload" href="' + href + '" as="style" onload="this.onload=null;this.rel=\'stylesheet\';this.id=\'hccFullCss\'"><noscript><link id="hccFullCss" rel="stylesheet" href="' + href + '"></noscript>';
}

function cleanPickerCssBootstrap(html) {
  return html
    .replace(/<style id="hccCriticalPickerCss">[\s\S]*?<\/style>/g, '')
    .replace(/<style id="hccFirstScreenFit">[\s\S]*?<\/style>/g, '')
    .replace(/<link id="hccFullCssPreload"[^>]*>/g, '')
    .replace(/<noscript><link id="hccFullCss" rel="stylesheet" href="[^"]*\/assets\/css\/picker\.css\?v=[^"]+"><\/noscript>/g, '')
    .replace(/<link id="hccFullCss" rel="stylesheet" href="[^"]*\/assets\/css\/picker\.css\?v=[^"]+">/g, '');
}

function removeBetween(html, startNeedle, endNeedle) {
  const start = html.indexOf(startNeedle);
  if (start === -1) return html;
  const end = html.indexOf(endNeedle, start);
  if (end === -1) return html;
  return html.slice(0, start) + html.slice(end);
}

for (const rel of pickerPages) {
  const file = path.join(root, rel);
  let html = fs.readFileSync(file, 'utf8');
  const hrefMatch = html.match(/href="([^"]*\/assets\/css\/picker\.css\?v=[^"]+)"/);
  const href = hrefMatch ? hrefMatch[1] : '/assets/css/picker.css?v=20260626-214000';

  html = cleanPickerCssBootstrap(html);
  html = html.replace(
    /(<script>window\.HCC_ASSET_VERSION="[^"]+";<\/script>)/,
    '$1' + criticalCss + asyncCssLink(href) + firstScreenFitCss
  );

  html = removeBetween(
    html,
    '<article class="hcc-info-text hcc-info-wheel"',
    '<main class="hcc-chart-page"'
  );

  html = removeBetween(
    html,
    '<main class="hcc-chart-page"',
    '<section class="hcc-after-shell">'
  );

  fs.writeFileSync(file, html, 'utf8');
  console.log('updated ' + rel);
}
