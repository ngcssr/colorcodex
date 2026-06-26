const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const langs = ['', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt'];

const zhStaticCopy = {
  rgbTitle: 'RGB 转 Hex',
  hexTitle: 'Hex 转 RGB',
  convert: '转换',
  reset: '重置',
  toggle: '切换',
  toast: '已复制到剪贴板',
  tableHead: '<thead><tr><th>代码</th><th>数值</th><th>HTML/CSS</th></tr></thead>',
  rgbNote: '<h2>RGB 转 Hex</h2><p>RGB 颜色值使用 0 到 255 的红、绿、蓝通道描述屏幕颜色。Hex 颜色代码把相同通道写成十六进制对，因此 RGB 可以转换为 Hex 而不改变颜色外观。</p><h3>如何将 RGB 转为 Hex</h3><p>输入红、绿、蓝数值后，转换器会计算匹配的 Hex、HSL、HSV、OKLCH 和 CMYK 值，并可直接复制需要的格式。</p><h3>在 CSS 中使用颜色代码</h3><p>Hex、RGB 和 HSL 都被现代 CSS 支持。Hex 简洁，RGB 直观，HSL 适合按色相、饱和度和亮度进行调整。</p>',
  hexNote: '<h2>Hex 转 RGB</h2><p>Hex 色号和 RGB 数值描述的是同一组红、绿、蓝通道。Hex 用十六进制对保存每个通道，RGB 则用 0 到 255 的十进制数字表示。</p><h3>如何将 Hex 转为 RGB</h3><p>输入三位或六位 Hex 色号后，转换器会展开简写值，计算 RGB 通道，并显示匹配的 HSL、HSV、OKLCH 和 CMYK 值。</p><h3>在 CSS 中使用 RGB 值</h3><p>RGB 值适合查看或编辑屏幕颜色的红、绿、蓝组成。需要可直接粘贴的 CSS 颜色函数时，可使用 HTML/CSS 列。</p>'
};

function applyStaticCopy(html, lang, page) {
  if (lang !== 'zh') return html;
  const title = page === 'hex' ? zhStaticCopy.hexTitle : zhStaticCopy.rgbTitle;
  const note = page === 'hex' ? zhStaticCopy.hexNote : zhStaticCopy.rgbNote;
  html = html.replace(
    /<h2 class="hcc-converter-title">[\s\S]*?<\/h2>/,
    '<h2 class="hcc-converter-title">' + title + '</h2>'
  );
  html = html.replace(
    /<button class="primary" type="button" id="hccConvConvert">[\s\S]*?<\/button>/,
    '<button class="primary" type="button" id="hccConvConvert">' + zhStaticCopy.convert + '</button>'
  );
  html = html.replace(
    /<button class="primary" type="button" id="hccHexRgbConvert">[\s\S]*?<\/button>/,
    '<button class="primary" type="button" id="hccHexRgbConvert">' + zhStaticCopy.convert + '</button>'
  );
  html = html.replace(
    /<button type="button" id="hccConvReset">[\s\S]*?<\/button>/,
    '<button type="button" id="hccConvReset">' + zhStaticCopy.reset + '</button>'
  );
  html = html.replace(
    /<button type="button" id="hccHexRgbReset">[\s\S]*?<\/button>/,
    '<button type="button" id="hccHexRgbReset">' + zhStaticCopy.reset + '</button>'
  );
  html = html.replace(
    /<label for="hccHexRgbInput">[\s\S]*?<\/label>/,
    '<label for="hccHexRgbInput">Hex 色号</label>'
  );
  html = html.replace(
    /<thead><tr><th>[\s\S]*?<\/tr><\/thead>/,
    zhStaticCopy.tableHead
  );
  html = html.replace(
    /<button class="hcc-icon-btn hcc-strip-toggle" type="button" id="hccStripToggle">[\s\S]*?<\/button>/,
    '<button class="hcc-icon-btn hcc-strip-toggle" type="button" id="hccStripToggle">' + zhStaticCopy.toggle + '</button>'
  );
  html = html.replace(
    /<article class="hcc-converter-note">[\s\S]*?<\/article>/,
    '<article class="hcc-converter-note">' + note + '</article>'
  );
  html = html.replace(
    /<div class="hcc-toast" id="hccToast">[\s\S]*?<\/div>/,
    '<div class="hcc-toast" id="hccToast">' + zhStaticCopy.toast + '</div>'
  );
  return html;
}

for (const lang of langs) {
  for (const route of ['rgb-to-hex', 'hex-to-rgb']) {
  const rel = lang ? path.join(lang, route, 'index.html') : path.join(route, 'index.html');
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(
    /loadScript\("\/assets\/js\/converter-core\.js\?v="\+window\.HCC_ASSET_VERSION\)/,
    'loadScript("/assets/js/converter-lite.js?v="+window.HCC_ASSET_VERSION)'
  );
  html = html.replace(
    /var s=document\.createElement\("script"\);s\.src="\/assets\/js\/converter-core\.js\?v="\+window\.HCC_ASSET_VERSION;s\.defer=true;document\.body\.appendChild\(s\)/,
    'var s=document.createElement("script");s.src="/assets/js/converter-lite.js?v="+window.HCC_ASSET_VERSION;s.defer=true;document.body.appendChild(s)'
  );
  html = applyStaticCopy(html, lang, route === 'hex-to-rgb' ? 'hex' : 'rgb');
  fs.writeFileSync(file, html, 'utf8');
  console.log('updated ' + rel);
  }
}
