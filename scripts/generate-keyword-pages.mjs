import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const site = 'https://www.colorcodetools.com';
const version = '20260624-121500';
const langs = [
  ['x-default', ''],
  ['en', ''],
  ['zh-CN', '/zh'],
  ['ja', '/ja'],
  ['ko', '/ko'],
  ['es', '/es'],
  ['fr', '/fr'],
  ['de', '/de'],
  ['pt', '/pt']
];

const pages = [
  {
    slug: 'color-guides',
    title: 'Color Guides - HTML, Hex, RGB, HSL and CSS Color Codes',
    h1: 'Color Guides',
    description: 'Practical guides for HTML color codes, Hex values, RGB, HSL, CSS colors, palettes, web safe colors, and shades.',
    intro: 'Use these guides to understand color formats, choose better palettes, and move colors between design tools and CSS.',
    sections: [
      ['Popular color code guides', 'Start with the format you use most often. Each guide explains when the format is useful, how the values work, and which Color Code Tools page can help you copy or convert the result.'],
      ['Build palettes faster', 'After choosing a base color, use the color picker, color wheel, palette generator, contrast checker, and mixer to turn one color into a practical website palette.']
    ]
  },
  {
    slug: 'html-color-codes',
    title: 'HTML Color Codes - Hex, RGB, HSL and CSS Values',
    h1: 'HTML Color Codes',
    description: 'Learn how HTML color codes work and copy Hex, RGB, HSL, OKLCH, named colors, and CSS-ready color values.',
    intro: 'HTML color codes describe the colors used in web pages, interfaces, charts, buttons, backgrounds, borders, and text.',
    sections: [
      ['What are HTML color codes?', 'HTML color codes are values that browsers can understand. The most common formats are Hex, RGB, HSL, named colors, and newer CSS formats such as OKLCH. They all describe the same idea: which color should appear on the screen.'],
      ['Which format should you use?', 'Hex is compact and common in design handoff. RGB is direct when you need red, green, and blue channels. HSL is easier for adjusting hue, saturation, and lightness. OKLCH is useful for modern perceptual color palettes.'],
      ['Using colors in CSS', 'You can place color values in CSS properties such as color, background-color, border-color, outline-color, box-shadow, gradients, SVG fills, and chart styles. Always check contrast when colors are used for text.']
    ]
  },
  {
    slug: 'hex-color-codes',
    title: 'Hex Color Codes - Pick, Convert and Copy Hex Colors',
    h1: 'Hex Color Codes',
    description: 'A guide to Hex color codes, six-digit #RRGGBB values, shorthand Hex colors, and Hex to RGB conversion.',
    intro: 'Hex color codes are one of the most widely used web color formats because they are short, precise, and easy to copy.',
    sections: [
      ['How Hex color codes work', 'A six-digit Hex value uses two characters for red, two for green, and two for blue. Each channel ranges from 00 to FF, giving the same color range as RGB values from 0 to 255.'],
      ['Three-digit Hex colors', 'Some colors can be written in shorthand. For example, #fff expands to #ffffff and #09c expands to #0099cc. Shorthand is compact, but six-digit Hex values are clearer for design systems.'],
      ['Converting Hex colors', 'Hex and RGB describe the same screen channels. Converting between them does not change the color; it only changes how the value is written.']
    ]
  },
  {
    slug: 'rgb-color-codes',
    title: 'RGB Color Codes - Red, Green and Blue Values',
    h1: 'RGB Color Codes',
    description: 'Understand RGB color codes, convert RGB to Hex, and use rgb() values in CSS.',
    intro: 'RGB color codes describe screen colors with red, green, and blue light channels.',
    sections: [
      ['How RGB values work', 'Each RGB channel is usually written as a number from 0 to 255. Low values add little light, while high values add more light. Combining the three channels creates the final screen color.'],
      ['RGB in CSS', 'Modern CSS can use rgb(255 0 0), rgb(255, 0, 0), or rgb values with alpha transparency. RGB is especially useful when a color must be generated or adjusted by code.'],
      ['RGB to Hex conversion', 'Each RGB channel can be converted to a two-character hexadecimal pair. The three pairs form the final Hex color code.']
    ]
  },
  {
    slug: 'hsl-color-codes',
    title: 'HSL Color Codes - Hue, Saturation and Lightness',
    h1: 'HSL Color Codes',
    description: 'Learn HSL color codes, hue angles, saturation, lightness, and how to use hsl() in CSS.',
    intro: 'HSL color codes are useful when you want to adjust a color by feel instead of editing red, green, and blue channels.',
    sections: [
      ['What HSL means', 'HSL stands for hue, saturation, and lightness. Hue is an angle around the color wheel, saturation controls color intensity, and lightness controls how dark or bright the color appears.'],
      ['Why designers use HSL', 'HSL makes it easier to create related colors. You can keep the hue the same while changing lightness for shades and tints, or rotate the hue to create harmonies.'],
      ['HSL in CSS', 'Modern CSS supports space-separated hsl() syntax and optional alpha transparency. HSL is practical for theme systems, hover states, and quick palette adjustments.']
    ]
  },
  {
    slug: 'css-color-codes',
    title: 'CSS Color Codes - Hex, RGB, HSL, OKLCH and Named Colors',
    h1: 'CSS Color Codes',
    description: 'Use CSS color codes in stylesheets, gradients, borders, shadows, SVG, and interface design.',
    intro: 'CSS supports many color formats, from classic Hex and named colors to modern color spaces for advanced palettes.',
    sections: [
      ['Common CSS color formats', 'Hex, RGB, HSL, and named colors are supported broadly. Modern CSS also supports formats such as OKLCH, which can help produce smoother and more perceptually balanced palettes.'],
      ['Where CSS colors are used', 'CSS color values can style text, backgrounds, borders, outlines, shadows, gradients, scrollbars, accent colors, SVG fills, and canvas-driven interfaces.'],
      ['Choosing readable colors', 'A color can look attractive and still fail as text. Use contrast checks for foreground and background combinations, especially for buttons, navigation, forms, and cards.']
    ]
  },
  {
    slug: 'color-palette-generator',
    title: 'Color Palette Generator - Create Website Color Palettes',
    h1: 'Color Palette Generator',
    description: 'Generate color palettes from a base color, image, color wheel, harmony, shades, tints, and tones.',
    intro: 'A palette generator turns one color into a practical group of colors for websites, apps, charts, and branding.',
    sections: [
      ['Start with one color', 'Choose a base color from the picker, image picker, color wheel, chart, or color library. Then explore harmonies, shades, tints, tones, and contrast-safe combinations.'],
      ['Use harmony rules', 'Analogous, complementary, split complementary, triadic, tetradic, and square palettes provide useful starting points. One color should usually lead while the others support the design.'],
      ['Export palette values', 'After the palette feels right, export Hex, RGB, HSL, OKLCH, CSS variables, Tailwind values, or simple code lists for your project.']
    ]
  },
  {
    slug: 'web-safe-colors',
    title: 'Web Safe Colors - Browser-Safe Color Chart and Codes',
    h1: 'Web Safe Colors',
    description: 'Explore web safe colors, classic browser-safe palettes, Hex values, and modern alternatives.',
    intro: 'Web safe colors come from an older palette designed to display consistently on limited-color screens.',
    sections: [
      ['What web safe colors are', 'The classic web safe palette contains colors built from six channel levels: 00, 33, 66, 99, CC, and FF. This created a predictable 216-color set for older displays.'],
      ['Are web safe colors still required?', 'Modern screens and browsers can display millions of colors, so web safe colors are no longer a technical requirement. They are still useful as a simple reference chart and historical design vocabulary.'],
      ['Using web safe colors today', 'Use web safe colors when you want a limited palette, retro visual style, or quick reference values. For modern interfaces, also check contrast and color harmony.']
    ]
  },
  {
    slug: 'color-shades-generator',
    title: 'Color Shades Generator - Shades, Tints and Tones',
    h1: 'Color Shades Generator',
    description: 'Create color shades, tints, tones, and variations from any Hex, RGB, HSL, or OKLCH color.',
    intro: 'Color shades help turn a single base color into a usable range for backgrounds, text, borders, hover states, and UI surfaces.',
    sections: [
      ['Shades, tints, and tones', 'A shade mixes a color with black, a tint mixes it with white, and a tone moves it toward gray. Together they create a flexible range around the original color.'],
      ['Building UI color scales', 'A useful color scale usually includes light values for backgrounds, middle values for accents, and darker values for text, borders, or active states.'],
      ['Check contrast', 'Not every shade works for text. Use contrast checks to decide which values are safe for foreground and background combinations.']
    ]
  }
];

const guideI18n = {
  en: {
    title: 'Color Guides - HTML, Hex, RGB, HSL and CSS Color Codes',
    h1: 'Color Guides',
    description: 'Practical guides for HTML color codes, Hex values, RGB, HSL, CSS colors, palettes, web safe colors, and shades.',
    intro: 'Use these guides to understand color formats, choose better palettes, and move colors between design tools and CSS.',
    sections: [
      ['Popular color code guides', 'Start with the format you use most often. Each guide explains when the format is useful, how the values work, and which Color Code Tools page can help you copy or convert the result.'],
      ['Build palettes faster', 'After choosing a base color, use the color picker, color wheel, palette generator, contrast checker, and mixer to turn one color into a practical website palette.'],
      ['Related color tools', 'Use these tools to pick, convert, test, and export the color values described in this guide.'],
      ['More color guides', 'More color guides']
    ],
    crumb: 'Color Guides',
    footer: 'Color Code Tools helps you pick, convert, compare, and export colors for websites and apps.'
  },
  zh: {
    title: '颜色指南 - HTML、Hex、RGB、HSL 和 CSS 色号',
    h1: '颜色指南',
    description: '了解 HTML 色号、Hex、RGB、HSL、CSS 颜色、调色板、网页安全色和颜色明暗变化。',
    intro: '使用这些指南理解颜色格式，选择更好的配色，并在设计工具和 CSS 之间转换颜色。',
    sections: [
      ['热门颜色代码指南', '从你最常用的格式开始。每篇指南都会说明这种格式适合什么场景、数值如何工作，以及可以用哪个工具复制或转换结果。'],
      ['更快构建调色板', '选定基础色后，可以使用取色器、色轮、调色板生成器、对比度检查器和混色工具，把一个颜色扩展成实用的网站配色。'],
      ['相关颜色工具', '使用这些工具来选取、转换、测试和导出本指南中提到的颜色值。'],
      ['更多颜色指南', '更多颜色指南']
    ],
    crumb: '颜色指南',
    footer: 'Color Code Tools 可帮助你为网站和应用选取、转换、比较并导出颜色。'
  },
  ja: {
    title: 'カラーガイド - HTML、Hex、RGB、HSL、CSS カラーコード',
    h1: 'カラーガイド',
    description: 'HTML カラーコード、Hex、RGB、HSL、CSS カラー、パレット、Web セーフカラー、色の濃淡を学べます。',
    intro: 'これらのガイドで色形式を理解し、より良い配色を選び、デザインツールと CSS の間で色を扱いやすくします。',
    sections: [
      ['人気のカラーコードガイド', 'よく使う形式から始めましょう。各ガイドでは、その形式が役立つ場面、値の仕組み、コピーや変換に使えるツールを説明します。'],
      ['パレットを素早く作成', 'ベースカラーを選んだら、カラーピッカー、色相環、パレット生成、コントラスト確認、ミキサーを使って実用的な Web 配色に広げられます。'],
      ['関連カラーツール', 'このガイドで説明する色値を選択、変換、確認、書き出すためのツールです。'],
      ['その他のカラーガイド', 'その他のカラーガイド']
    ],
    crumb: 'カラーガイド',
    footer: 'Color Code Tools は、Web サイトやアプリ向けの色選択、変換、比較、書き出しを支援します。'
  },
  ko: {
    title: '색상 가이드 - HTML, Hex, RGB, HSL 및 CSS 색상 코드',
    h1: '색상 가이드',
    description: 'HTML 색상 코드, Hex, RGB, HSL, CSS 색상, 팔레트, 웹 안전 색상과 색상 변형을 알아보세요.',
    intro: '이 가이드는 색상 형식을 이해하고 더 나은 팔레트를 선택하며 디자인 도구와 CSS 사이에서 색상을 다루는 데 도움을 줍니다.',
    sections: [
      ['인기 색상 코드 가이드', '가장 자주 사용하는 형식부터 시작하세요. 각 가이드는 형식의 용도, 값의 작동 방식, 복사나 변환에 사용할 도구를 설명합니다.'],
      ['팔레트를 더 빠르게 만들기', '기본 색상을 고른 뒤 색상 선택기, 색상환, 팔레트 생성기, 대비 검사기, 색상 믹서를 사용해 실용적인 웹 팔레트로 확장할 수 있습니다.'],
      ['관련 색상 도구', '이 가이드에서 설명한 색상 값을 선택, 변환, 테스트, 내보내기 위한 도구입니다.'],
      ['더 많은 색상 가이드', '더 많은 색상 가이드']
    ],
    crumb: '색상 가이드',
    footer: 'Color Code Tools는 웹사이트와 앱을 위한 색상 선택, 변환, 비교, 내보내기를 도와줍니다.'
  },
  es: {
    title: 'Guías de color - Códigos HTML, Hex, RGB, HSL y CSS',
    h1: 'Guías de color',
    description: 'Guías prácticas sobre códigos de color HTML, Hex, RGB, HSL, colores CSS, paletas, colores web seguros y tonos.',
    intro: 'Usa estas guías para entender los formatos de color, elegir mejores paletas y mover colores entre herramientas de diseño y CSS.',
    sections: [
      ['Guías populares de códigos de color', 'Empieza con el formato que más usas. Cada guía explica cuándo conviene, cómo funcionan sus valores y qué herramienta puede ayudarte a copiar o convertir el resultado.'],
      ['Crea paletas más rápido', 'Después de elegir un color base, usa el selector, la rueda, el generador de paletas, el comprobador de contraste y el mezclador para crear una paleta web práctica.'],
      ['Herramientas de color relacionadas', 'Usa estas herramientas para elegir, convertir, comprobar y exportar los valores de color descritos en esta guía.'],
      ['Más guías de color', 'Más guías de color']
    ],
    crumb: 'Guías de color',
    footer: 'Color Code Tools te ayuda a elegir, convertir, comparar y exportar colores para sitios web y aplicaciones.'
  },
  fr: {
    title: 'Guides couleur - Codes HTML, Hex, RGB, HSL et CSS',
    h1: 'Guides couleur',
    description: 'Guides pratiques pour les codes couleur HTML, Hex, RGB, HSL, couleurs CSS, palettes, couleurs web safe et nuances.',
    intro: 'Utilisez ces guides pour comprendre les formats de couleur, choisir de meilleures palettes et passer des outils de design au CSS.',
    sections: [
      ['Guides populaires de codes couleur', 'Commencez par le format que vous utilisez le plus. Chaque guide explique quand il est utile, comment ses valeurs fonctionnent et quel outil peut copier ou convertir le résultat.'],
      ['Créer des palettes plus vite', 'Après avoir choisi une couleur de base, utilisez le sélecteur, la roue, le générateur de palettes, le vérificateur de contraste et le mélangeur pour créer une palette web pratique.'],
      ['Outils couleur associés', 'Utilisez ces outils pour choisir, convertir, tester et exporter les valeurs de couleur décrites dans ce guide.'],
      ['Autres guides couleur', 'Autres guides couleur']
    ],
    crumb: 'Guides couleur',
    footer: 'Color Code Tools vous aide à choisir, convertir, comparer et exporter des couleurs pour les sites web et les applications.'
  },
  de: {
    title: 'Farbleitfäden - HTML-, Hex-, RGB-, HSL- und CSS-Farbcodes',
    h1: 'Farbleitfäden',
    description: 'Praktische Leitfäden zu HTML-Farbcodes, Hex, RGB, HSL, CSS-Farben, Paletten, websicheren Farben und Schattierungen.',
    intro: 'Mit diesen Leitfäden verstehst du Farbformate, wählst bessere Paletten und überträgst Farben zwischen Design-Tools und CSS.',
    sections: [
      ['Beliebte Farbcodes-Leitfäden', 'Beginne mit dem Format, das du am häufigsten nutzt. Jeder Leitfaden erklärt, wann es sinnvoll ist, wie die Werte funktionieren und welches Tool beim Kopieren oder Konvertieren hilft.'],
      ['Paletten schneller erstellen', 'Nach der Wahl einer Grundfarbe kannst du Picker, Farbrad, Palettengenerator, Kontrastprüfung und Farbmischer nutzen, um eine praktische Website-Palette zu erstellen.'],
      ['Verwandte Farbwerkzeuge', 'Nutze diese Werkzeuge, um die in diesem Leitfaden beschriebenen Farbwerte auszuwählen, zu konvertieren, zu testen und zu exportieren.'],
      ['Weitere Farbleitfäden', 'Weitere Farbleitfäden']
    ],
    crumb: 'Farbleitfäden',
    footer: 'Color Code Tools hilft dir, Farben für Websites und Apps auszuwählen, zu konvertieren, zu vergleichen und zu exportieren.'
  },
  pt: {
    title: 'Guias de cores - Códigos HTML, Hex, RGB, HSL e CSS',
    h1: 'Guias de cores',
    description: 'Guias práticos para códigos de cor HTML, Hex, RGB, HSL, cores CSS, paletas, cores web safe e variações.',
    intro: 'Use estes guias para entender formatos de cor, escolher paletas melhores e mover cores entre ferramentas de design e CSS.',
    sections: [
      ['Guias populares de códigos de cor', 'Comece pelo formato que você mais usa. Cada guia explica quando o formato é útil, como os valores funcionam e qual ferramenta pode ajudar a copiar ou converter o resultado.'],
      ['Crie paletas mais rápido', 'Depois de escolher uma cor base, use o seletor, a roda de cores, o gerador de paletas, o verificador de contraste e o misturador para criar uma paleta web prática.'],
      ['Ferramentas de cor relacionadas', 'Use estas ferramentas para escolher, converter, testar e exportar os valores de cor descritos neste guia.'],
      ['Mais guias de cores', 'Mais guias de cores']
    ],
    crumb: 'Guias de cores',
    footer: 'Color Code Tools ajuda você a escolher, converter, comparar e exportar cores para sites e aplicativos.'
  }
};

const relatedTools = [
  ['Color Picker', '/color-picker/'],
  ['Image Color Picker', '/image-color-picker/'],
  ['Color Wheel', '/color-wheel/'],
  ['Color Chart', '/color-chart/'],
  ['Color Library', '/colors/'],
  ['RGB to Hex', '/rgb-to-hex/'],
  ['Hex to RGB', '/hex-to-rgb/'],
  ['Contrast Checker', '/contrast-checker/'],
  ['Color Mixer', '/color-mixer/']
];

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function hreflang(pathname) {
  return langs.map(([lang, prefix]) => `<link rel="alternate" hreflang="${lang}" href="${site}${prefix}${pathname}">`).join('');
}

function nav() {
  return `<header class="kw-nav"><a class="kw-logo" href="/color-picker/" aria-label="Color Code Tools"></a><nav><a href="/color-picker/">Picker</a><a href="/image-color-picker/">Image</a><a href="/color-wheel/">Wheel</a><a href="/color-chart/">Chart</a><a href="/colors/">Color Library</a><a href="/color-guides/" class="active">Guides</a></nav><span class="kw-lang" id="kwLang"><button type="button" id="kwLangButton">English</button><span id="kwLangMenu">${[
    ['en', 'English'],
    ['zh', '中文'],
    ['ja', '日本語'],
    ['ko', '한국어'],
    ['es', 'Español'],
    ['fr', 'Français'],
    ['de', 'Deutsch'],
    ['pt', 'Português']
  ].map(([code, label]) => `<button type="button" data-lang="${code}">${label}</button>`).join('')}</span></span></header>`;
}

function pageHtml(page) {
  const pathname = `/${page.slug}/`;
  const guideCards = pages.filter((item) => item.slug !== page.slug).map((item) => `<a href="/${item.slug}/"><b>${escapeHtml(item.h1)}</b><span>${escapeHtml(item.description)}</span></a>`).join('');
  const toolCards = relatedTools.map(([label, href]) => `<a href="${href}">${escapeHtml(label)}</a>`).join('');
  const sections = page.sections.map(([heading, body]) => `<section><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(body)}</p></section>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(page.title)}</title><link rel="canonical" href="${site}${pathname}">${hreflang(pathname)}<meta name="description" content="${escapeHtml(page.description)}"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preload" href="/app.css?v=${version}" as="style" fetchpriority="low" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="/app.css?v=${version}"></noscript><style>html,body{margin:0;background:#fff;color:#050505;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}.kw-nav{height:58px;border-bottom:1px solid #e5e5e5;display:flex;align-items:center;gap:24px;padding:0 34px;background:#fff;position:relative;z-index:20}.kw-logo{width:32px;height:32px;border-radius:50%;background:conic-gradient(#c11007,#a50c36,#861043,#2563eb,#0ea5e9,#22c55e,#facc15,#f54927,#c11007);position:relative;flex:0 0 auto}.kw-logo:after{content:"";position:absolute;inset:10px;border-radius:50%;background:#fff}.kw-nav nav{display:flex;gap:14px;align-items:center}.kw-nav a{color:#1f2937;text-decoration:none;font-size:14px;font-weight:760;border-radius:8px;padding:9px 10px}.kw-nav a:hover,.kw-nav a.active{background:#f5f5f5;color:#050505}.kw-lang{margin-left:auto;position:relative;width:176px}.kw-lang>button{width:100%;height:32px;border:1px solid #dedede;border-radius:7px;background:#fff;text-align:left;padding:0 14px;font-weight:760}.kw-lang span{display:none;position:absolute;right:0;top:38px;width:176px;background:#fff;border:1px solid #d9d9d9;border-radius:10px;padding:6px;box-shadow:0 16px 34px rgba(15,23,42,.12)}.kw-lang.show span{display:grid;gap:4px}.kw-lang span button{height:30px;border:0;border-radius:7px;background:#fff;text-align:left;padding:0 10px}.kw-lang span button:hover,.kw-lang span button.active{background:#f3f4f6}.kw-hero{background:#f7f7f7;padding:56px 34px 96px}.kw-hero-inner,.kw-main{max-width:1050px;margin:0 auto}.kw-crumb{font-size:14px;color:#4b5563;margin-bottom:14px}.kw-hero h1{font-size:56px;line-height:1.04;margin:0;font-weight:900}.kw-hero p{font-size:22px;line-height:1.45;max-width:760px;margin:16px 0 0}.kw-main{margin-top:-42px;background:#fff;border:1px solid #dedede;border-radius:14px;padding:34px 38px 42px;box-shadow:0 1px 0 rgba(0,0,0,.02)}.kw-main h2{font-size:26px;margin:30px 0 10px}.kw-main p{font-size:17px;line-height:1.72;color:#273244}.kw-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:18px}.kw-grid a{border:1px solid #e2e2e2;border-radius:10px;padding:16px;text-decoration:none;color:#111827;background:#fff}.kw-grid b{display:block;font-size:17px;margin-bottom:6px}.kw-grid span{display:block;color:#526071;font-size:14px;line-height:1.45}.kw-tools{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.kw-tools a{border:1px solid #dedede;border-radius:999px;padding:8px 12px;color:#111827;text-decoration:none;font-weight:700;font-size:14px}.kw-footer{max-width:1050px;margin:28px auto 56px;padding:0 34px;color:#526071;font-size:14px}.kw-footer a{color:#111827;text-decoration:none;font-weight:700}@media(max-width:760px){.kw-nav{height:auto;min-height:48px;padding:8px 14px;gap:10px;flex-wrap:wrap}.kw-nav nav{order:3;width:100%;overflow:auto;gap:8px;padding-bottom:4px}.kw-nav a{font-size:13px;padding:8px}.kw-lang{width:96px}.kw-hero{padding:40px 20px 76px}.kw-hero h1{font-size:39px}.kw-hero p{font-size:16px}.kw-main{margin:-36px 14px 0;padding:24px 20px 30px;border-radius:12px}.kw-grid{grid-template-columns:1fr}.kw-main h2{font-size:23px}.kw-main p{font-size:16px}}</style><script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${escapeHtml(page.h1)}","description":"${escapeHtml(page.description)}","url":"${site}${pathname}","isPartOf":{"@type":"WebSite","name":"Color Code Tools","url":"${site}/"}}</script></head><body>${nav()}<section class="kw-hero"><div class="kw-hero-inner"><div class="kw-crumb"><a href="/color-guides/">Color Guides</a></div><h1>${escapeHtml(page.h1)}</h1><p>${escapeHtml(page.intro)}</p></div></section><main class="kw-main">${sections}<section><h2>Related color tools</h2><p>Use these tools to pick, convert, test, and export the color values described in this guide.</p><div class="kw-tools">${toolCards}</div></section><section><h2>More color guides</h2><div class="kw-grid">${guideCards}</div></section></main><footer class="kw-footer"><a href="/color-picker/">Color Code Tools</a> helps you pick, convert, compare, and export colors for websites and apps.</footer><script>(function(){var langs={en:'English',zh:'中文',ja:'日本語',ko:'한국어',es:'Español',fr:'Français',de:'Deutsch',pt:'Português'},rx=/^\\/(zh|ja|ko|es|fr|de|pt)(?=\\/|$)/,m=location.pathname.match(rx),cur=m?m[1]:'en',base=location.pathname.replace(rx,'')||'/';var b=document.getElementById('kwLangButton'),w=document.getElementById('kwLang'),menu=document.getElementById('kwLangMenu');if(b)b.textContent=langs[cur]||'English';if(w&&b){b.onclick=function(e){e.stopPropagation();w.className=w.className.indexOf('show')>-1?'kw-lang':'kw-lang show'}}if(menu){Array.prototype.slice.call(menu.querySelectorAll('button')).forEach(function(btn){var lang=btn.getAttribute('data-lang');btn.className=lang===cur?'active':'';btn.onclick=function(){location.href=(lang==='en'?'':'/'+lang)+base}})}Array.prototype.slice.call(document.querySelectorAll('a[href^="/"]')).forEach(function(a){var href=a.getAttribute('href');if(!href||href.indexOf('/'+cur+'/')===0||cur==='en')return;a.setAttribute('href','/'+cur+href)});document.addEventListener('click',function(){if(w)w.className='kw-lang'})})();</script></body></html>`;
}

fs.mkdirSync(path.join(root, 'scripts'), { recursive: true });
for (const page of pages) {
  const dir = path.join(root, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pageHtml(page), 'utf8');
}
