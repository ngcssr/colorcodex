const SITE = 'https://www.colorcodetools.com';
const LANGS = {
  zh: { html: 'zh-CN', hreflang: 'zh-CN' },
  ja: { html: 'ja', hreflang: 'ja' },
  ko: { html: 'ko', hreflang: 'ko' },
  es: { html: 'es', hreflang: 'es' },
  fr: { html: 'fr', hreflang: 'fr' },
  de: { html: 'de', hreflang: 'de' },
  pt: { html: 'pt', hreflang: 'pt' }};
const LANG_PREFIXES = Object.keys(LANGS);

const KEYWORD_I18N = {
  '/color-guides/': {
    es: {
      title: 'Guías de color - Códigos HTML, Hex, RGB, HSL y CSS',
      description: 'Guías prácticas sobre códigos de color HTML, valores Hex, RGB, HSL, colores CSS, paletas, colores web seguros y tonos.',
      replacements: [
        ['Color Guides - HTML, Hex, RGB, HSL and CSS Color Codes', 'Guías de color - Códigos HTML, Hex, RGB, HSL y CSS'],
        ['Practical guides for HTML color codes, Hex values, RGB, HSL, CSS colors, palettes, web safe colors, and shades.', 'Guías prácticas sobre códigos de color HTML, valores Hex, RGB, HSL, colores CSS, paletas, colores web seguros y tonos.'],
        ['Color Guides', 'Guías de color'],
        ['Use these guides to understand color formats, choose better palettes, and move colors between design tools and CSS.', 'Usa estas guías para entender los formatos de color, elegir mejores paletas y mover colores entre herramientas de diseño y CSS.'],
        ['Popular color code guides', 'Guías populares de códigos de color'],
        ['Start with the format you use most often. Each guide explains when the format is useful, how the values work, and which Color Code Tools page can help you copy or convert the result.', 'Empieza con el formato que más usas. Cada guía explica cuándo conviene, cómo funcionan sus valores y qué herramienta puede ayudarte a copiar o convertir el resultado.'],
        ['Build palettes faster', 'Crea paletas más rápido'],
        ['After choosing a base color, use the color picker, color wheel, palette generator, contrast checker, and mixer to turn one color into a practical website palette.', 'Después de elegir un color base, usa el selector de color, la rueda, el generador de paletas, el comprobador de contraste y el mezclador para convertir un color en una paleta web práctica.'],
        ['Related color tools', 'Herramientas de color relacionadas'],
        ['Use these tools to pick, convert, test, and export the color values described in this guide.', 'Usa estas herramientas para elegir, convertir, comprobar y exportar los valores de color descritos en esta guía.'],
        ['More color guides', 'Más guías de color'],
        ['Color Code Tools helps you pick, convert, compare, and export colors for websites and apps.', 'Color Code Tools te ayuda a elegir, convertir, comparar y exportar colores para sitios web y aplicaciones.']
      ]
    },
    pt: {
      title: 'Guias de cores - Códigos HTML, Hex, RGB, HSL e CSS',
      description: 'Guias práticos para códigos de cor HTML, valores Hex, RGB, HSL, cores CSS, paletas, cores web safe e variações.',
      replacements: [
        ['Color Guides - HTML, Hex, RGB, HSL and CSS Color Codes', 'Guias de cores - Códigos HTML, Hex, RGB, HSL e CSS'],
        ['Practical guides for HTML color codes, Hex values, RGB, HSL, CSS colors, palettes, web safe colors, and shades.', 'Guias práticos para códigos de cor HTML, valores Hex, RGB, HSL, cores CSS, paletas, cores web safe e variações.'],
        ['Color Guides', 'Guias de cores'],
        ['Use these guides to understand color formats, choose better palettes, and move colors between design tools and CSS.', 'Use estes guias para entender formatos de cor, escolher paletas melhores e mover cores entre ferramentas de design e CSS.'],
        ['Popular color code guides', 'Guias populares de códigos de cor'],
        ['Start with the format you use most often. Each guide explains when the format is useful, how the values work, and which Color Code Tools page can help you copy or convert the result.', 'Comece pelo formato que você mais usa. Cada guia explica quando ele é útil, como os valores funcionam e qual ferramenta pode ajudar a copiar ou converter o resultado.'],
        ['Build palettes faster', 'Crie paletas mais rápido'],
        ['After choosing a base color, use the color picker, color wheel, palette generator, contrast checker, and mixer to turn one color into a practical website palette.', 'Depois de escolher uma cor base, use o seletor, a roda de cores, o gerador de paletas, o verificador de contraste e o misturador para criar uma paleta web prática.'],
        ['Related color tools', 'Ferramentas de cor relacionadas'],
        ['Use these tools to pick, convert, test, and export the color values described in this guide.', 'Use estas ferramentas para escolher, converter, testar e exportar os valores de cor descritos neste guia.'],
        ['More color guides', 'Mais guias de cores'],
        ['Color Code Tools helps you pick, convert, compare, and export colors for websites and apps.', 'Color Code Tools ajuda você a escolher, converter, comparar e exportar cores para sites e aplicativos.']
      ]
    },
    ko: {
      title: '색상 가이드 - HTML, Hex, RGB, HSL 및 CSS 색상 코드',
      description: 'HTML 색상 코드, Hex 값, RGB, HSL, CSS 색상, 팔레트, 웹 안전 색상과 명암 변화를 다루는 실용 가이드입니다.',
      replacements: [
        ['Color Guides - HTML, Hex, RGB, HSL and CSS Color Codes', '색상 가이드 - HTML, Hex, RGB, HSL 및 CSS 색상 코드'],
        ['Practical guides for HTML color codes, Hex values, RGB, HSL, CSS colors, palettes, web safe colors, and shades.', 'HTML 색상 코드, Hex 값, RGB, HSL, CSS 색상, 팔레트, 웹 안전 색상과 명암 변화를 다루는 실용 가이드입니다.'],
        ['Picker', '픽커'], ['Image', '이미지'], ['Wheel', '색상환'], ['Chart', '차트'], ['Color Library', '컬러 라이브러리'], ['Guides', '가이드'], ['Color Guides', '색상 가이드'],
        ['Use these guides to understand color formats, choose better palettes, and move colors between design tools and CSS.', '이 가이드를 사용해 색상 형식을 이해하고 더 나은 팔레트를 선택하며 디자인 도구와 CSS 사이에서 색상을 다루세요.'],
        ['Popular color code guides', '인기 색상 코드 가이드'],
        ['Start with the format you use most often. Each guide explains when the format is useful, how the values work, and which Color Code Tools page can help you copy or convert the result.', '가장 자주 쓰는 형식부터 시작하세요. 각 가이드는 형식이 유용한 상황, 값의 작동 방식, 복사나 변환에 사용할 수 있는 도구를 설명합니다.'],
        ['Build palettes faster', '팔레트를 더 빠르게 만들기'],
        ['After choosing a base color, use the color picker, color wheel, palette generator, contrast checker, and mixer to turn one color into a practical website palette.', '기본 색상을 선택한 뒤 색상 선택기, 색상환, 팔레트 생성기, 대비 검사기, 믹서를 사용해 실용적인 웹 팔레트를 만들 수 있습니다.'],
        ['Related color tools', '관련 색상 도구'], ['Use these tools to pick, convert, test, and export the color values described in this guide.', '이 가이드에서 설명한 색상 값을 선택, 변환, 테스트, 내보내기할 수 있는 도구입니다.'], ['More color guides', '더 많은 색상 가이드'],
        ['Color Picker', '색상 선택기'], ['Image Color Picker', '이미지 색상 선택기'], ['Color Wheel', '색상환'], ['Color Chart', '색상 차트'], ['RGB to Hex', 'RGB to Hex'], ['Hex to RGB', 'Hex to RGB'], ['Contrast Checker', '대비 검사'], ['Color Mixer', '색상 믹서'],
        ['HTML Color Codes', 'HTML 색상 코드'], ['Learn how HTML color codes work and copy Hex, RGB, HSL, OKLCH, named colors, and CSS-ready color values.', 'HTML 색상 코드가 작동하는 방식을 배우고 Hex, RGB, HSL, OKLCH, 이름 색상 및 CSS용 값을 복사하세요.'],
        ['Hex Color Codes', 'Hex 색상 코드'], ['A guide to Hex color codes, six-digit #RRGGBB values, shorthand Hex colors, and Hex to RGB conversion.', 'Hex 색상 코드, 여섯 자리 #RRGGBB 값, 축약 Hex 색상, Hex to RGB 변환 가이드입니다.'],
        ['RGB Color Codes', 'RGB 색상 코드'], ['Understand RGB color codes, convert RGB to Hex, and use rgb() values in CSS.', 'RGB 색상 코드를 이해하고 RGB를 Hex로 변환하며 CSS에서 rgb() 값을 사용합니다.'],
        ['HSL Color Codes', 'HSL 색상 코드'], ['Learn HSL color codes, hue angles, saturation, lightness, and how to use hsl() in CSS.', 'HSL 색상 코드, 색상 각도, 채도, 명도 및 CSS hsl() 사용법을 배웁니다.'],
        ['CSS Color Codes', 'CSS 색상 코드'], ['Use CSS color codes in stylesheets, gradients, borders, shadows, SVG, and interface design.', '스타일시트, 그라디언트, 테두리, 그림자, SVG 및 인터페이스 디자인에서 CSS 색상 코드를 사용합니다.'],
        ['Color Palette Generator', '색상 팔레트 생성기'], ['Generate color palettes from a base color, image, color wheel, harmony, shades, tints, and tones.', '기본 색상, 이미지, 색상환, 조화, 음영, 틴트, 톤에서 색상 팔레트를 생성합니다.'],
        ['Web Safe Colors', '웹 안전 색상'], ['Explore web safe colors, classic browser-safe palettes, Hex values, and modern alternatives.', '웹 안전 색상, 클래식 브라우저 안전 팔레트, Hex 값과 현대적 대안을 살펴봅니다.'],
        ['Color Shades Generator', '색상 명암 생성기'], ['Create color shades, tints, tones, and variations from any Hex, RGB, HSL, or OKLCH color.', '모든 Hex, RGB, HSL 또는 OKLCH 색상에서 음영, 틴트, 톤과 변형을 만듭니다.'],
        ['Color Code Tools helps you pick, convert, compare, and export colors for websites and apps.', 'Color Code Tools는 웹사이트와 앱을 위한 색상 선택, 변환, 비교, 내보내기를 도와줍니다.']
      ]
    },
    es: {
      title: 'Guias de color - Codigos HTML, Hex, RGB, HSL y CSS',
      description: 'Guias practicas sobre codigos de color HTML, valores Hex, RGB, HSL, colores CSS, paletas, colores web seguros y tonos.',
      replacements: [
        ['Color Guides - HTML, Hex, RGB, HSL and CSS Color Codes', 'Guias de color - Codigos HTML, Hex, RGB, HSL y CSS'],
        ['Practical guides for HTML color codes, Hex values, RGB, HSL, CSS colors, palettes, web safe colors, and shades.', 'Guias practicas sobre codigos de color HTML, valores Hex, RGB, HSL, colores CSS, paletas, colores web seguros y tonos.'],
        ['Picker', 'Selector'], ['Image', 'Imagen'], ['Wheel', 'Rueda'], ['Chart', 'Tabla'], ['Color Library', 'Biblioteca de colores'], ['Guides', 'Guias'], ['Color Guides', 'Guias de color'],
        ['Use these guides to understand color formats, choose better palettes, and move colors between design tools and CSS.', 'Usa estas guias para entender los formatos de color, elegir mejores paletas y mover colores entre herramientas de diseno y CSS.'],
        ['Popular color code guides', 'Guias populares de codigos de color'], ['Start with the format you use most often. Each guide explains when the format is useful, how the values work, and which Color Code Tools page can help you copy or convert the result.', 'Empieza con el formato que mas usas. Cada guia explica cuando conviene, como funcionan sus valores y que herramienta puede ayudarte a copiar o convertir el resultado.'],
        ['Build palettes faster', 'Crea paletas mas rapido'], ['After choosing a base color, use the color picker, color wheel, palette generator, contrast checker, and mixer to turn one color into a practical website palette.', 'Despues de elegir un color base, usa el selector de color, la rueda, el generador de paletas, el comprobador de contraste y el mezclador para convertir un color en una paleta web practica.'],
        ['Related color tools', 'Herramientas de color relacionadas'], ['Use these tools to pick, convert, test, and export the color values described in this guide.', 'Usa estas herramientas para elegir, convertir, comprobar y exportar los valores de color descritos en esta guia.'], ['More color guides', 'Mas guias de color'],
        ['Color Picker', 'Selector de color'], ['Image Color Picker', 'Selector de color de imagen'], ['Color Wheel', 'Rueda de color'], ['Color Chart', 'Tabla de colores'], ['RGB to Hex', 'RGB a Hex'], ['Hex to RGB', 'Hex a RGB'], ['Contrast Checker', 'Comprobador de contraste'], ['Color Mixer', 'Mezclador de colores'],
        ['HTML Color Codes', 'Codigos de color HTML'], ['Learn how HTML color codes work and copy Hex, RGB, HSL, OKLCH, named colors, and CSS-ready color values.', 'Aprende como funcionan los codigos de color HTML y copia valores Hex, RGB, HSL, OKLCH, colores con nombre y valores listos para CSS.'],
        ['Hex Color Codes', 'Codigos de color Hex'], ['A guide to Hex color codes, six-digit #RRGGBB values, shorthand Hex colors, and Hex to RGB conversion.', 'Guia de codigos Hex, valores #RRGGBB de seis digitos, colores Hex abreviados y conversion de Hex a RGB.'],
        ['RGB Color Codes', 'Codigos de color RGB'], ['Understand RGB color codes, convert RGB to Hex, and use rgb() values in CSS.', 'Comprende los codigos RGB, convierte RGB a Hex y usa valores rgb() en CSS.'],
        ['HSL Color Codes', 'Codigos de color HSL'], ['Learn HSL color codes, hue angles, saturation, lightness, and how to use hsl() in CSS.', 'Aprende codigos HSL, angulos de tono, saturacion, luminosidad y como usar hsl() en CSS.'],
        ['CSS Color Codes', 'Codigos de color CSS'], ['Use CSS color codes in stylesheets, gradients, borders, shadows, SVG, and interface design.', 'Usa codigos de color CSS en hojas de estilo, degradados, bordes, sombras, SVG y diseno de interfaces.'],
        ['Color Palette Generator', 'Generador de paletas'], ['Generate color palettes from a base color, image, color wheel, harmony, shades, tints, and tones.', 'Genera paletas desde un color base, imagen, rueda, armonia, sombras, tintes y tonos.'],
        ['Web Safe Colors', 'Colores web seguros'], ['Explore web safe colors, classic browser-safe palettes, Hex values, and modern alternatives.', 'Explora colores web seguros, paletas clasicas seguras para navegador, valores Hex y alternativas modernas.'],
        ['Color Shades Generator', 'Generador de tonos de color'], ['Create color shades, tints, tones, and variations from any Hex, RGB, HSL, or OKLCH color.', 'Crea sombras, tintes, tonos y variaciones desde cualquier color Hex, RGB, HSL u OKLCH.'],
        ['Color Code Tools helps you pick, convert, compare, and export colors for websites and apps.', 'Color Code Tools te ayuda a elegir, convertir, comparar y exportar colores para sitios web y aplicaciones.']
      ]
    },
    fr: {
      title: 'Guides couleur - Codes HTML, Hex, RGB, HSL et CSS',
      description: 'Guides pratiques pour les codes couleur HTML, les valeurs Hex, RGB, HSL, les couleurs CSS, les palettes, les couleurs web safe et les nuances.',
      replacements: [
        ['Color Guides - HTML, Hex, RGB, HSL and CSS Color Codes', 'Guides couleur - Codes HTML, Hex, RGB, HSL et CSS'],
        ['Practical guides for HTML color codes, Hex values, RGB, HSL, CSS colors, palettes, web safe colors, and shades.', 'Guides pratiques pour les codes couleur HTML, les valeurs Hex, RGB, HSL, les couleurs CSS, les palettes, les couleurs web safe et les nuances.'],
        ['Picker', 'Selecteur'], ['Image', 'Image'], ['Wheel', 'Roue'], ['Chart', 'Nuancier'], ['Color Library', 'Bibliotheque de couleurs'], ['Guides', 'Guides'], ['Color Guides', 'Guides couleur'],
        ['Use these guides to understand color formats, choose better palettes, and move colors between design tools and CSS.', 'Utilisez ces guides pour comprendre les formats de couleur, choisir de meilleures palettes et passer des outils de design au CSS.'],
        ['Popular color code guides', 'Guides populaires de codes couleur'], ['Start with the format you use most often. Each guide explains when the format is useful, how the values work, and which Color Code Tools page can help you copy or convert the result.', 'Commencez par le format que vous utilisez le plus. Chaque guide explique quand il est utile, comment ses valeurs fonctionnent et quel outil peut copier ou convertir le resultat.'],
        ['Build palettes faster', 'Creer des palettes plus vite'], ['After choosing a base color, use the color picker, color wheel, palette generator, contrast checker, and mixer to turn one color into a practical website palette.', 'Apres avoir choisi une couleur de base, utilisez le selecteur, la roue, le generateur de palettes, le verificateur de contraste et le melangeur pour creer une palette web pratique.'],
        ['Related color tools', 'Outils couleur associes'], ['Use these tools to pick, convert, test, and export the color values described in this guide.', 'Utilisez ces outils pour choisir, convertir, tester et exporter les valeurs de couleur decrites dans ce guide.'], ['More color guides', 'Autres guides couleur'],
        ['Color Picker', 'Selecteur de couleur'], ['Image Color Picker', 'Selecteur de couleur d image'], ['Color Wheel', 'Roue chromatique'], ['Color Chart', 'Nuancier'], ['RGB to Hex', 'RGB vers Hex'], ['Hex to RGB', 'Hex vers RGB'], ['Contrast Checker', 'Verificateur de contraste'], ['Color Mixer', 'Melangeur de couleurs'],
        ['HTML Color Codes', 'Codes couleur HTML'], ['Learn how HTML color codes work and copy Hex, RGB, HSL, OKLCH, named colors, and CSS-ready color values.', 'Decouvrez le fonctionnement des codes couleur HTML et copiez des valeurs Hex, RGB, HSL, OKLCH, des couleurs nommees et des valeurs pretes pour CSS.'],
        ['Hex Color Codes', 'Codes couleur Hex'], ['A guide to Hex color codes, six-digit #RRGGBB values, shorthand Hex colors, and Hex to RGB conversion.', 'Guide des codes Hex, des valeurs #RRGGBB a six chiffres, des couleurs Hex abregees et de la conversion Hex vers RGB.'],
        ['RGB Color Codes', 'Codes couleur RGB'], ['Understand RGB color codes, convert RGB to Hex, and use rgb() values in CSS.', 'Comprenez les codes RGB, convertissez RGB en Hex et utilisez les valeurs rgb() en CSS.'],
        ['HSL Color Codes', 'Codes couleur HSL'], ['Learn HSL color codes, hue angles, saturation, lightness, and how to use hsl() in CSS.', 'Decouvrez les codes HSL, les angles de teinte, la saturation, la luminosite et l utilisation de hsl() en CSS.'],
        ['CSS Color Codes', 'Codes couleur CSS'], ['Use CSS color codes in stylesheets, gradients, borders, shadows, SVG, and interface design.', 'Utilisez les codes couleur CSS dans les feuilles de style, degrades, bordures, ombres, SVG et interfaces.'],
        ['Color Palette Generator', 'Generateur de palettes'], ['Generate color palettes from a base color, image, color wheel, harmony, shades, tints, and tones.', 'Generez des palettes depuis une couleur de base, une image, une roue, une harmonie, des ombres, des teintes et des tons.'],
        ['Web Safe Colors', 'Couleurs web safe'], ['Explore web safe colors, classic browser-safe palettes, Hex values, and modern alternatives.', 'Explorez les couleurs web safe, les palettes classiques compatibles navigateur, les valeurs Hex et les alternatives modernes.'],
        ['Color Shades Generator', 'Generateur de nuances'], ['Create color shades, tints, tones, and variations from any Hex, RGB, HSL, or OKLCH color.', 'Creez des ombres, teintes, tons et variations depuis toute couleur Hex, RGB, HSL ou OKLCH.'],
        ['Color Code Tools helps you pick, convert, compare, and export colors for websites and apps.', 'Color Code Tools vous aide a choisir, convertir, comparer et exporter des couleurs pour sites web et applications.']
      ]
    }
  }
};

const GUIDE_ALL_I18N = {
  '/color-guides/': {
    zh: {
      title: '颜色指南 - HTML、Hex、RGB、HSL 和 CSS 色号',
      description: '实用指南，介绍 HTML 色号、Hex 值、RGB、HSL、CSS 颜色、调色板、网页安全色和颜色明暗变化。',
      replacements: [
        ['Color Guides - HTML, Hex, RGB, HSL and CSS Color Codes', '颜色指南 - HTML、Hex、RGB、HSL 和 CSS 色号'],
        ['Practical guides for HTML color codes, Hex values, RGB, HSL, CSS colors, palettes, web safe colors, and shades.', '实用指南，介绍 HTML 色号、Hex 值、RGB、HSL、CSS 颜色、调色板、网页安全色和颜色明暗变化。'],
        ['Picker', '取色器'],
        ['Image', '图片'],
        ['Wheel', '色轮'],
        ['Chart', '色表'],
        ['Color Library', '颜色库'],
        ['Guides', '指南'],
        ['Color Guides', '颜色指南'],
        ['Use these guides to understand color formats, choose better palettes, and move colors between design tools and CSS.', '使用这些指南了解颜色格式，选择更好的调色板，并在设计工具和 CSS 之间转换颜色。'],
        ['Popular color code guides', '热门颜色代码指南'],
        ['Start with the format you use most often. Each guide explains when the format is useful, how the values work, and which Color Code Tools page can help you copy or convert the result.', '从你最常用的格式开始。每篇指南都会说明这种格式适合什么场景、数值如何工作，以及可以用哪个 Color Code Tools 页面复制或转换结果。'],
        ['Build palettes faster', '更快构建调色板'],
        ['After choosing a base color, use the color picker, color wheel, palette generator, contrast checker, and mixer to turn one color into a practical website palette.', '选择基础色后，可以使用取色器、色轮、调色板生成器、对比度检查器和混色工具，把一个颜色扩展成实用的网站配色。'],
        ['Related color tools', '相关颜色工具'],
        ['Use these tools to pick, convert, test, and export the color values described in this guide.', '使用这些工具选择、转换、测试并导出本指南中介绍的颜色值。'],
        ['More color guides', '更多颜色指南'],
        ['Color Picker', '颜色取色器'],
        ['Image Color Picker', '图片取色器'],
        ['Color Wheel', '色轮'],
        ['Color Chart', '颜色表'],
        ['RGB to Hex', 'RGB 转 Hex'],
        ['Hex to RGB', 'Hex 转 RGB'],
        ['Contrast Checker', '对比度检查'],
        ['Color Mixer', '颜色混合器'],
        ['HTML Color Codes', 'HTML 颜色代码'],
        ['Learn how HTML color codes work and copy Hex, RGB, HSL, OKLCH, named colors, and CSS-ready color values.', '了解 HTML 色号的工作方式，并复制 Hex、RGB、HSL、OKLCH、命名颜色和 CSS 可用的颜色值。'],
        ['Hex Color Codes', 'Hex 颜色代码'],
        ['A guide to Hex color codes, six-digit #RRGGBB values, shorthand Hex colors, and Hex to RGB conversion.', '关于 Hex 色号、六位 #RRGGBB 值、简写 Hex 颜色以及 Hex 到 RGB 转换的指南。'],
        ['RGB Color Codes', 'RGB 颜色代码'],
        ['Understand RGB color codes, convert RGB to Hex, and use rgb() values in CSS.', '了解 RGB 色号，将 RGB 转换为 Hex，并在 CSS 中使用 rgb() 值。'],
        ['HSL Color Codes', 'HSL 颜色代码'],
        ['Learn HSL color codes, hue angles, saturation, lightness, and how to use hsl() in CSS.', '了解 HSL 色号、色相角度、饱和度、亮度，以及如何在 CSS 中使用 hsl()。'],
        ['CSS Color Codes', 'CSS 颜色代码'],
        ['Use CSS color codes in stylesheets, gradients, borders, shadows, SVG, and interface design.', '在样式表、渐变、边框、阴影、SVG 和界面设计中使用 CSS 颜色代码。'],
        ['Color Palette Generator', '调色板生成器'],
        ['Generate color palettes from a base color, image, color wheel, harmony, shades, tints, and tones.', '从基础色、图片、色轮、和谐配色、阴影、浅色和色调生成调色板。'],
        ['Web Safe Colors', '网页安全色'],
        ['Explore web safe colors, classic browser-safe palettes, Hex values, and modern alternatives.', '浏览网页安全色、经典浏览器安全调色板、Hex 值和现代替代方案。'],
        ['Color Shades Generator', '颜色明暗生成器'],
        ['Create color shades, tints, tones, and variations from any Hex, RGB, HSL, or OKLCH color.', '从任意 Hex、RGB、HSL 或 OKLCH 颜色创建阴影、浅色、色调和变化。'],
        ['Color Code Tools helps you pick, convert, compare, and export colors for websites and apps.', 'Color Code Tools 帮助你为网站和应用选择、转换、比较并导出颜色。']
      ]
    },
    ja: {
      title: 'カラーガイド - HTML、Hex、RGB、HSL、CSS カラーコード',
      description: 'HTML カラーコード、Hex、RGB、HSL、CSS カラー、パレット、Web セーフカラー、色の濃淡を学ぶ実用ガイドです。',
      replacements: [
        ['Color Guides - HTML, Hex, RGB, HSL and CSS Color Codes', 'カラーガイド - HTML、Hex、RGB、HSL、CSS カラーコード'],
        ['Practical guides for HTML color codes, Hex values, RGB, HSL, CSS colors, palettes, web safe colors, and shades.', 'HTML カラーコード、Hex、RGB、HSL、CSS カラー、パレット、Web セーフカラー、色の濃淡を学ぶ実用ガイドです。'],
        ['Picker', 'ピッカー'],
        ['Image', '画像'],
        ['Wheel', '色相環'],
        ['Chart', 'チャート'],
        ['Color Library', 'カラーライブラリ'],
        ['Guides', 'ガイド'],
        ['Color Guides', 'カラーガイド'],
        ['Use these guides to understand color formats, choose better palettes, and move colors between design tools and CSS.', 'これらのガイドで色形式を理解し、より良いパレットを選び、デザインツールと CSS の間で色を扱いやすくします。'],
        ['Popular color code guides', '人気のカラーコードガイド'],
        ['Start with the format you use most often. Each guide explains when the format is useful, how the values work, and which Color Code Tools page can help you copy or convert the result.', 'よく使う形式から始めましょう。各ガイドでは、その形式が役立つ場面、値の仕組み、コピーや変換に使えるツールを説明します。'],
        ['Build palettes faster', 'パレットをすばやく作成'],
        ['After choosing a base color, use the color picker, color wheel, palette generator, contrast checker, and mixer to turn one color into a practical website palette.', 'ベースカラーを選んだら、カラーピッカー、色相環、パレット生成、コントラスト確認、ミキサーを使って実用的な Web パレットを作れます。'],
        ['Related color tools', '関連カラー ツール'],
        ['Use these tools to pick, convert, test, and export the color values described in this guide.', 'このガイドで説明した色値を選択、変換、確認、書き出しするためのツールです。'],
        ['More color guides', 'その他のカラーガイド'],
        ['Color Picker', 'カラーピッカー'],
        ['Image Color Picker', '画像カラーピッカー'],
        ['Color Wheel', '色相環'],
        ['Color Chart', 'カラーチャート'],
        ['RGB to Hex', 'RGB から Hex'],
        ['Hex to RGB', 'Hex から RGB'],
        ['Contrast Checker', 'コントラスト確認'],
        ['Color Mixer', 'カラーミキサー'],
        ['HTML Color Codes', 'HTML カラーコード'],
        ['Learn how HTML color codes work and copy Hex, RGB, HSL, OKLCH, named colors, and CSS-ready color values.', 'HTML カラーコードの仕組みを学び、Hex、RGB、HSL、OKLCH、名前付き色、CSS 用の値をコピーできます。'],
        ['Hex Color Codes', 'Hex カラーコード'],
        ['A guide to Hex color codes, six-digit #RRGGBB values, shorthand Hex colors, and Hex to RGB conversion.', 'Hex カラーコード、6 桁の #RRGGBB、短縮 Hex、Hex から RGB への変換ガイドです。'],
        ['RGB Color Codes', 'RGB カラーコード'],
        ['Understand RGB color codes, convert RGB to Hex, and use rgb() values in CSS.', 'RGB カラーコードを理解し、RGB を Hex に変換して CSS の rgb() 値を使います。'],
        ['HSL Color Codes', 'HSL カラーコード'],
        ['Learn HSL color codes, hue angles, saturation, lightness, and how to use hsl() in CSS.', 'HSL カラーコード、色相角、彩度、明度、CSS の hsl() の使い方を学びます。'],
        ['CSS Color Codes', 'CSS カラーコード'],
        ['Use CSS color codes in stylesheets, gradients, borders, shadows, SVG, and interface design.', 'スタイルシート、グラデーション、枠線、影、SVG、UI デザインで CSS カラーコードを使います。'],
        ['Color Palette Generator', 'カラーパレット生成'],
        ['Generate color palettes from a base color, image, color wheel, harmony, shades, tints, and tones.', 'ベースカラー、画像、色相環、ハーモニー、シェード、ティント、トーンからパレットを生成します。'],
        ['Web Safe Colors', 'Web セーフカラー'],
        ['Explore web safe colors, classic browser-safe palettes, Hex values, and modern alternatives.', 'Web セーフカラー、従来のブラウザー安全パレット、Hex 値、現代的な代替色を確認します。'],
        ['Color Shades Generator', '色の濃淡生成'],
        ['Create color shades, tints, tones, and variations from any Hex, RGB, HSL, or OKLCH color.', '任意の Hex、RGB、HSL、OKLCH からシェード、ティント、トーン、バリエーションを作成します。'],
        ['Color Code Tools helps you pick, convert, compare, and export colors for websites and apps.', 'Color Code Tools は、Web サイトやアプリ向けの色選択、変換、比較、書き出しを支援します。']
      ]
    }
  }
};

Object.assign(GUIDE_ALL_I18N['/color-guides/'], {
  ko: {
    title: '색상 가이드 - HTML, Hex, RGB, HSL 및 CSS 색상 코드',
    description: 'HTML 색상 코드, Hex 값, RGB, HSL, CSS 색상, 팔레트, 웹 안전 색상 및 색상 음영을 설명하는 실용 가이드입니다.',
    replacements: [
      ['Color Guides - HTML, Hex, RGB, HSL and CSS Color Codes', '색상 가이드 - HTML, Hex, RGB, HSL 및 CSS 색상 코드'],
      ['Practical guides for HTML color codes, Hex values, RGB, HSL, CSS colors, palettes, web safe colors, and shades.', 'HTML 색상 코드, Hex 값, RGB, HSL, CSS 색상, 팔레트, 웹 안전 색상 및 색상 음영을 설명하는 실용 가이드입니다.'],
      ['Picker', '색상 선택기'],
      ['Image', '이미지'],
      ['Wheel', '색상 휠'],
      ['Chart', '색상 차트'],
      ['Color Library', '색상 라이브러리'],
      ['Guides', '가이드'],
      ['Color Guides', '색상 가이드'],
      ['Use these guides to understand color formats, choose better palettes, and move colors between design tools and CSS.', '이 가이드를 사용해 색상 형식을 이해하고 더 좋은 팔레트를 선택하며 디자인 도구와 CSS 사이에서 색상을 옮길 수 있습니다.'],
      ['Popular color code guides', '인기 색상 코드 가이드'],
      ['Start with the format you use most often. Each guide explains when the format is useful, how the values work, and which Color Code Tools page can help you copy or convert the result.', '가장 자주 사용하는 형식부터 시작하세요. 각 가이드는 해당 형식이 유용한 상황, 값이 작동하는 방식, 결과를 복사하거나 변환하는 데 도움이 되는 Color Code Tools 페이지를 설명합니다.'],
      ['Build palettes faster', '팔레트를 더 빠르게 만들기'],
      ['After choosing a base color, use the color picker, color wheel, palette generator, contrast checker, and mixer to turn one color into a practical website palette.', '기본 색상을 선택한 뒤 색상 선택기, 색상 휠, 팔레트 생성기, 대비 검사기, 믹서를 사용해 하나의 색상을 실용적인 웹사이트 팔레트로 확장하세요.'],
      ['Related color tools', '관련 색상 도구'],
      ['Use these tools to pick, convert, test, and export the color values described in this guide.', '이 도구들을 사용해 이 가이드에서 설명한 색상 값을 선택, 변환, 테스트 및 내보낼 수 있습니다.'],
      ['More color guides', '더 많은 색상 가이드'],
      ['Color Picker', '색상 선택기'],
      ['Image Color Picker', '이미지 색상 선택기'],
      ['Color Wheel', '색상 휠'],
      ['Color Chart', '색상 차트'],
      ['RGB to Hex', 'RGB에서 Hex로'],
      ['Hex to RGB', 'Hex에서 RGB로'],
      ['Contrast Checker', '대비 검사기'],
      ['Color Mixer', '색상 믹서'],
      ['HTML Color Codes', 'HTML 색상 코드'],
      ['Learn how HTML color codes work and copy Hex, RGB, HSL, OKLCH, named colors, and CSS-ready color values.', 'HTML 색상 코드가 작동하는 방식을 배우고 Hex, RGB, HSL, OKLCH, 이름 색상 및 CSS용 색상 값을 복사하세요.'],
      ['Hex Color Codes', 'Hex 색상 코드'],
      ['A guide to Hex color codes, six-digit #RRGGBB values, shorthand Hex colors, and Hex to RGB conversion.', 'Hex 색상 코드, 여섯 자리 #RRGGBB 값, 축약 Hex 색상 및 Hex에서 RGB로 변환하는 방법을 안내합니다.'],
      ['RGB Color Codes', 'RGB 색상 코드'],
      ['Understand RGB color codes, convert RGB to Hex, and use rgb() values in CSS.', 'RGB 색상 코드를 이해하고 RGB를 Hex로 변환하며 CSS에서 rgb() 값을 사용하는 방법을 알아보세요.'],
      ['HSL Color Codes', 'HSL 색상 코드'],
      ['Learn HSL color codes, hue angles, saturation, lightness, and how to use hsl() in CSS.', 'HSL 색상 코드, 색상 각도, 채도, 명도 및 CSS에서 hsl()을 사용하는 방법을 알아보세요.'],
      ['CSS Color Codes', 'CSS 색상 코드'],
      ['Use CSS color codes in stylesheets, gradients, borders, shadows, SVG, and interface design.', '스타일시트, 그라디언트, 테두리, 그림자, SVG 및 인터페이스 디자인에서 CSS 색상 코드를 사용하세요.'],
      ['Color Palette Generator', '색상 팔레트 생성기'],
      ['Generate color palettes from a base color, image, color wheel, harmony, shades, tints, and tones.', '기본 색상, 이미지, 색상 휠, 조화색, 음영, 틴트 및 톤에서 색상 팔레트를 생성하세요.'],
      ['Web Safe Colors', '웹 안전 색상'],
      ['Explore web safe colors, classic browser-safe palettes, Hex values, and modern alternatives.', '웹 안전 색상, 전통적인 브라우저 안전 팔레트, Hex 값 및 현대적인 대안을 살펴보세요.'],
      ['Color Shades Generator', '색상 음영 생성기'],
      ['Create color shades, tints, tones, and variations from any Hex, RGB, HSL, or OKLCH color.', '모든 Hex, RGB, HSL 또는 OKLCH 색상에서 음영, 틴트, 톤 및 변형을 만드세요.'],
      ['Color Code Tools helps you pick, convert, compare, and export colors for websites and apps.', 'Color Code Tools는 웹사이트와 앱을 위한 색상을 선택, 변환, 비교 및 내보내는 데 도움을 줍니다.']
    ]
  },
  es: {
    title: 'Guías de color - Códigos HTML, Hex, RGB, HSL y CSS',
    description: 'Guías prácticas sobre códigos de color HTML, valores Hex, RGB, HSL, colores CSS, paletas, colores seguros para web y tonos.',
    replacements: [
      ['Color Guides - HTML, Hex, RGB, HSL and CSS Color Codes', 'Guías de color - Códigos HTML, Hex, RGB, HSL y CSS'],
      ['Practical guides for HTML color codes, Hex values, RGB, HSL, CSS colors, palettes, web safe colors, and shades.', 'Guías prácticas sobre códigos de color HTML, valores Hex, RGB, HSL, colores CSS, paletas, colores seguros para web y tonos.'],
      ['Picker', 'Selector'],
      ['Image', 'Imagen'],
      ['Wheel', 'Rueda'],
      ['Chart', 'Tabla'],
      ['Color Library', 'Biblioteca de colores'],
      ['Guides', 'Guías'],
      ['Color Guides', 'Guías de color'],
      ['Use these guides to understand color formats, choose better palettes, and move colors between design tools and CSS.', 'Usa estas guías para entender formatos de color, elegir mejores paletas y mover colores entre herramientas de diseño y CSS.'],
      ['Popular color code guides', 'Guías populares de códigos de color'],
      ['Start with the format you use most often. Each guide explains when the format is useful, how the values work, and which Color Code Tools page can help you copy or convert the result.', 'Empieza con el formato que más usas. Cada guía explica cuándo es útil, cómo funcionan sus valores y qué página de Color Code Tools puede ayudarte a copiar o convertir el resultado.'],
      ['Build palettes faster', 'Crea paletas más rápido'],
      ['After choosing a base color, use the color picker, color wheel, palette generator, contrast checker, and mixer to turn one color into a practical website palette.', 'Después de elegir un color base, usa el selector, la rueda de color, el generador de paletas, el comprobador de contraste y el mezclador para convertir un color en una paleta web práctica.'],
      ['Related color tools', 'Herramientas de color relacionadas'],
      ['Use these tools to pick, convert, test, and export the color values described in this guide.', 'Usa estas herramientas para elegir, convertir, probar y exportar los valores de color descritos en esta guía.'],
      ['More color guides', 'Más guías de color'],
      ['Color Picker', 'Selector de color'],
      ['Image Color Picker', 'Selector de color de imagen'],
      ['Color Wheel', 'Rueda de color'],
      ['Color Chart', 'Tabla de colores'],
      ['RGB to Hex', 'RGB a Hex'],
      ['Hex to RGB', 'Hex a RGB'],
      ['Contrast Checker', 'Comprobador de contraste'],
      ['Color Mixer', 'Mezclador de colores'],
      ['HTML Color Codes', 'Códigos de color HTML'],
      ['Learn how HTML color codes work and copy Hex, RGB, HSL, OKLCH, named colors, and CSS-ready color values.', 'Aprende cómo funcionan los códigos de color HTML y copia valores Hex, RGB, HSL, OKLCH, colores con nombre y colores listos para CSS.'],
      ['Hex Color Codes', 'Códigos de color Hex'],
      ['A guide to Hex color codes, six-digit #RRGGBB values, shorthand Hex colors, and Hex to RGB conversion.', 'Guía de códigos Hex, valores #RRGGBB de seis dígitos, colores Hex abreviados y conversión de Hex a RGB.'],
      ['RGB Color Codes', 'Códigos de color RGB'],
      ['Understand RGB color codes, convert RGB to Hex, and use rgb() values in CSS.', 'Entiende los códigos RGB, convierte RGB a Hex y usa valores rgb() en CSS.'],
      ['HSL Color Codes', 'Códigos de color HSL'],
      ['Learn HSL color codes, hue angles, saturation, lightness, and how to use hsl() in CSS.', 'Aprende códigos HSL, ángulos de tono, saturación, luminosidad y cómo usar hsl() en CSS.'],
      ['CSS Color Codes', 'Códigos de color CSS'],
      ['Use CSS color codes in stylesheets, gradients, borders, shadows, SVG, and interface design.', 'Usa códigos de color CSS en hojas de estilo, degradados, bordes, sombras, SVG y diseño de interfaces.'],
      ['Color Palette Generator', 'Generador de paletas'],
      ['Generate color palettes from a base color, image, color wheel, harmony, shades, tints, and tones.', 'Genera paletas desde un color base, una imagen, una rueda de color, armonías, sombras, tintes y tonos.'],
      ['Web Safe Colors', 'Colores seguros para web'],
      ['Explore web safe colors, classic browser-safe palettes, Hex values, and modern alternatives.', 'Explora colores seguros para web, paletas clásicas compatibles con navegadores, valores Hex y alternativas modernas.'],
      ['Color Shades Generator', 'Generador de tonos'],
      ['Create color shades, tints, tones, and variations from any Hex, RGB, HSL, or OKLCH color.', 'Crea sombras, tintes, tonos y variaciones desde cualquier color Hex, RGB, HSL u OKLCH.'],
      ['Color Code Tools helps you pick, convert, compare, and export colors for websites and apps.', 'Color Code Tools te ayuda a elegir, convertir, comparar y exportar colores para sitios web y aplicaciones.']
    ]
  },
  fr: {
    title: 'Guides couleur - Codes HTML, Hex, RGB, HSL et CSS',
    description: 'Guides pratiques pour les codes couleur HTML, les valeurs Hex, RGB, HSL, les couleurs CSS, les palettes, les couleurs web safe et les nuances.',
    replacements: [
      ['Color Guides - HTML, Hex, RGB, HSL and CSS Color Codes', 'Guides couleur - Codes HTML, Hex, RGB, HSL et CSS'],
      ['Practical guides for HTML color codes, Hex values, RGB, HSL, CSS colors, palettes, web safe colors, and shades.', 'Guides pratiques pour les codes couleur HTML, les valeurs Hex, RGB, HSL, les couleurs CSS, les palettes, les couleurs web safe et les nuances.'],
      ['Picker', 'Sélecteur'],
      ['Image', 'Image'],
      ['Wheel', 'Roue'],
      ['Chart', 'Nuancier'],
      ['Color Library', 'Bibliothèque de couleurs'],
      ['Guides', 'Guides'],
      ['Color Guides', 'Guides couleur'],
      ['Use these guides to understand color formats, choose better palettes, and move colors between design tools and CSS.', 'Utilisez ces guides pour comprendre les formats de couleur, choisir de meilleures palettes et déplacer les couleurs entre les outils de design et CSS.'],
      ['Popular color code guides', 'Guides populaires de codes couleur'],
      ['Start with the format you use most often. Each guide explains when the format is useful, how the values work, and which Color Code Tools page can help you copy or convert the result.', 'Commencez par le format que vous utilisez le plus. Chaque guide explique quand il est utile, comment ses valeurs fonctionnent et quelle page Color Code Tools peut vous aider à copier ou convertir le résultat.'],
      ['Build palettes faster', 'Créer des palettes plus vite'],
      ['After choosing a base color, use the color picker, color wheel, palette generator, contrast checker, and mixer to turn one color into a practical website palette.', 'Après avoir choisi une couleur de base, utilisez le sélecteur, la roue chromatique, le générateur de palettes, le vérificateur de contraste et le mélangeur pour créer une palette web pratique.'],
      ['Related color tools', 'Outils couleur associés'],
      ['Use these tools to pick, convert, test, and export the color values described in this guide.', 'Utilisez ces outils pour choisir, convertir, tester et exporter les valeurs de couleur décrites dans ce guide.'],
      ['More color guides', 'Plus de guides couleur'],
      ['Color Picker', 'Sélecteur de couleur'],
      ['Image Color Picker', 'Sélecteur de couleur d’image'],
      ['Color Wheel', 'Roue chromatique'],
      ['Color Chart', 'Nuancier'],
      ['RGB to Hex', 'RGB vers Hex'],
      ['Hex to RGB', 'Hex vers RGB'],
      ['Contrast Checker', 'Vérificateur de contraste'],
      ['Color Mixer', 'Mélangeur de couleurs'],
      ['HTML Color Codes', 'Codes couleur HTML'],
      ['Learn how HTML color codes work and copy Hex, RGB, HSL, OKLCH, named colors, and CSS-ready color values.', 'Apprenez le fonctionnement des codes couleur HTML et copiez des valeurs Hex, RGB, HSL, OKLCH, des couleurs nommées et des valeurs prêtes pour CSS.'],
      ['Hex Color Codes', 'Codes couleur Hex'],
      ['A guide to Hex color codes, six-digit #RRGGBB values, shorthand Hex colors, and Hex to RGB conversion.', 'Guide des codes Hex, des valeurs #RRGGBB à six chiffres, des couleurs Hex abrégées et de la conversion Hex vers RGB.'],
      ['RGB Color Codes', 'Codes couleur RGB'],
      ['Understand RGB color codes, convert RGB to Hex, and use rgb() values in CSS.', 'Comprenez les codes RGB, convertissez RGB en Hex et utilisez les valeurs rgb() en CSS.'],
      ['HSL Color Codes', 'Codes couleur HSL'],
      ['Learn HSL color codes, hue angles, saturation, lightness, and how to use hsl() in CSS.', 'Découvrez les codes HSL, les angles de teinte, la saturation, la luminosité et l’utilisation de hsl() en CSS.'],
      ['CSS Color Codes', 'Codes couleur CSS'],
      ['Use CSS color codes in stylesheets, gradients, borders, shadows, SVG, and interface design.', 'Utilisez les codes couleur CSS dans les feuilles de style, dégradés, bordures, ombres, SVG et interfaces.'],
      ['Color Palette Generator', 'Générateur de palettes'],
      ['Generate color palettes from a base color, image, color wheel, harmony, shades, tints, and tones.', 'Générez des palettes depuis une couleur de base, une image, une roue, une harmonie, des ombres, des teintes et des tons.'],
      ['Web Safe Colors', 'Couleurs web safe'],
      ['Explore web safe colors, classic browser-safe palettes, Hex values, and modern alternatives.', 'Explorez les couleurs web safe, les palettes classiques compatibles navigateur, les valeurs Hex et les alternatives modernes.'],
      ['Color Shades Generator', 'Générateur de nuances'],
      ['Create color shades, tints, tones, and variations from any Hex, RGB, HSL, or OKLCH color.', 'Créez des ombres, teintes, tons et variations depuis toute couleur Hex, RGB, HSL ou OKLCH.'],
      ['Color Code Tools helps you pick, convert, compare, and export colors for websites and apps.', 'Color Code Tools vous aide à choisir, convertir, comparer et exporter des couleurs pour sites web et applications.']
    ]
  },
  de: {
    title: 'Farbleitfäden - HTML-, Hex-, RGB-, HSL- und CSS-Farbcodes',
    description: 'Praktische Leitfäden zu HTML-Farbcodes, Hex-Werten, RGB, HSL, CSS-Farben, Paletten, websicheren Farben und Schattierungen.',
    replacements: [
      ['Color Guides - HTML, Hex, RGB, HSL and CSS Color Codes', 'Farbleitfäden - HTML-, Hex-, RGB-, HSL- und CSS-Farbcodes'],
      ['Practical guides for HTML color codes, Hex values, RGB, HSL, CSS colors, palettes, web safe colors, and shades.', 'Praktische Leitfäden zu HTML-Farbcodes, Hex-Werten, RGB, HSL, CSS-Farben, Paletten, websicheren Farben und Schattierungen.'],
      ['Picker', 'Farbwähler'],
      ['Image', 'Bild'],
      ['Wheel', 'Farbrad'],
      ['Chart', 'Farbtafel'],
      ['Color Library', 'Farbbibliothek'],
      ['Guides', 'Leitfäden'],
      ['Color Guides', 'Farbleitfäden'],
      ['Use these guides to understand color formats, choose better palettes, and move colors between design tools and CSS.', 'Nutzen Sie diese Leitfäden, um Farbformate zu verstehen, bessere Paletten zu wählen und Farben zwischen Designtools und CSS zu übertragen.'],
      ['Popular color code guides', 'Beliebte Farbcodierungs-Leitfäden'],
      ['Start with the format you use most often. Each guide explains when the format is useful, how the values work, and which Color Code Tools page can help you copy or convert the result.', 'Beginnen Sie mit dem Format, das Sie am häufigsten verwenden. Jeder Leitfaden erklärt, wann es nützlich ist, wie die Werte funktionieren und welche Color Code Tools-Seite beim Kopieren oder Konvertieren hilft.'],
      ['Build palettes faster', 'Paletten schneller erstellen'],
      ['After choosing a base color, use the color picker, color wheel, palette generator, contrast checker, and mixer to turn one color into a practical website palette.', 'Wählen Sie eine Grundfarbe und nutzen Sie Farbwähler, Farbrad, Palettengenerator, Kontrastprüfer und Mischer, um daraus eine praktische Website-Palette zu erstellen.'],
      ['Related color tools', 'Verwandte Farbwerkzeuge'],
      ['Use these tools to pick, convert, test, and export the color values described in this guide.', 'Nutzen Sie diese Werkzeuge, um die in diesem Leitfaden beschriebenen Farbwerte auszuwählen, umzuwandeln, zu testen und zu exportieren.'],
      ['More color guides', 'Weitere Farbleitfäden'],
      ['Color Picker', 'Farbwähler'],
      ['Image Color Picker', 'Bild-Farbwähler'],
      ['Color Wheel', 'Farbrad'],
      ['Color Chart', 'Farbtafel'],
      ['RGB to Hex', 'RGB zu Hex'],
      ['Hex to RGB', 'Hex zu RGB'],
      ['Contrast Checker', 'Kontrastprüfer'],
      ['Color Mixer', 'Farbmischer'],
      ['HTML Color Codes', 'HTML-Farbcodes'],
      ['Learn how HTML color codes work and copy Hex, RGB, HSL, OKLCH, named colors, and CSS-ready color values.', 'Lernen Sie, wie HTML-Farbcodes funktionieren, und kopieren Sie Hex-, RGB-, HSL-, OKLCH-, benannte und CSS-fertige Farbwerte.'],
      ['Hex Color Codes', 'Hex-Farbcodes'],
      ['A guide to Hex color codes, six-digit #RRGGBB values, shorthand Hex colors, and Hex to RGB conversion.', 'Ein Leitfaden zu Hex-Farbcodes, sechsstelligen #RRGGBB-Werten, Kurz-Hex-Farben und der Umwandlung von Hex in RGB.'],
      ['RGB Color Codes', 'RGB-Farbcodes'],
      ['Understand RGB color codes, convert RGB to Hex, and use rgb() values in CSS.', 'Verstehen Sie RGB-Farbcodes, wandeln Sie RGB in Hex um und verwenden Sie rgb()-Werte in CSS.'],
      ['HSL Color Codes', 'HSL-Farbcodes'],
      ['Learn HSL color codes, hue angles, saturation, lightness, and how to use hsl() in CSS.', 'Lernen Sie HSL-Farbcodes, Farbwinkel, Sättigung, Helligkeit und die Verwendung von hsl() in CSS.'],
      ['CSS Color Codes', 'CSS-Farbcodes'],
      ['Use CSS color codes in stylesheets, gradients, borders, shadows, SVG, and interface design.', 'Verwenden Sie CSS-Farbcodes in Stylesheets, Verläufen, Rahmen, Schatten, SVG und Interface-Design.'],
      ['Color Palette Generator', 'Farbpaletten-Generator'],
      ['Generate color palettes from a base color, image, color wheel, harmony, shades, tints, and tones.', 'Erzeugen Sie Farbpaletten aus einer Grundfarbe, einem Bild, Farbrad, Harmonien, Schattierungen, Tönungen und Tönen.'],
      ['Web Safe Colors', 'Websichere Farben'],
      ['Explore web safe colors, classic browser-safe palettes, Hex values, and modern alternatives.', 'Entdecken Sie websichere Farben, klassische browser-sichere Paletten, Hex-Werte und moderne Alternativen.'],
      ['Color Shades Generator', 'Generator für Farbabstufungen'],
      ['Create color shades, tints, tones, and variations from any Hex, RGB, HSL, or OKLCH color.', 'Erstellen Sie Schattierungen, Tönungen, Töne und Varianten aus jeder Hex-, RGB-, HSL- oder OKLCH-Farbe.'],
      ['Color Code Tools helps you pick, convert, compare, and export colors for websites and apps.', 'Color Code Tools hilft beim Auswählen, Umwandeln, Vergleichen und Exportieren von Farben für Websites und Apps.']
    ]
  },
  pt: {
    title: 'Guias de cores - Códigos HTML, Hex, RGB, HSL e CSS',
    description: 'Guias práticos para códigos de cor HTML, valores Hex, RGB, HSL, cores CSS, paletas, cores web safe e variações.',
    replacements: [
      ['Color Guides - HTML, Hex, RGB, HSL and CSS Color Codes', 'Guias de cores - Códigos HTML, Hex, RGB, HSL e CSS'],
      ['Practical guides for HTML color codes, Hex values, RGB, HSL, CSS colors, palettes, web safe colors, and shades.', 'Guias práticos para códigos de cor HTML, valores Hex, RGB, HSL, cores CSS, paletas, cores web safe e variações.'],
      ['Picker', 'Seletor'],
      ['Image', 'Imagem'],
      ['Wheel', 'Roda'],
      ['Chart', 'Tabela'],
      ['Color Library', 'Biblioteca de cores'],
      ['Guides', 'Guias'],
      ['Color Guides', 'Guias de cores'],
      ['Use these guides to understand color formats, choose better palettes, and move colors between design tools and CSS.', 'Use estes guias para entender formatos de cor, escolher paletas melhores e mover cores entre ferramentas de design e CSS.'],
      ['Popular color code guides', 'Guias populares de códigos de cor'],
      ['Start with the format you use most often. Each guide explains when the format is useful, how the values work, and which Color Code Tools page can help you copy or convert the result.', 'Comece pelo formato que você mais usa. Cada guia explica quando ele é útil, como os valores funcionam e qual página do Color Code Tools pode ajudar a copiar ou converter o resultado.'],
      ['Build palettes faster', 'Crie paletas mais rápido'],
      ['After choosing a base color, use the color picker, color wheel, palette generator, contrast checker, and mixer to turn one color into a practical website palette.', 'Depois de escolher uma cor base, use o seletor, a roda de cores, o gerador de paletas, o verificador de contraste e o misturador para criar uma paleta web prática.'],
      ['Related color tools', 'Ferramentas de cor relacionadas'],
      ['Use these tools to pick, convert, test, and export the color values described in this guide.', 'Use estas ferramentas para escolher, converter, testar e exportar os valores de cor descritos neste guia.'],
      ['More color guides', 'Mais guias de cores'],
      ['Color Picker', 'Seletor de cor'],
      ['Image Color Picker', 'Seletor de cor da imagem'],
      ['Color Wheel', 'Roda de cores'],
      ['Color Chart', 'Tabela de cores'],
      ['RGB to Hex', 'RGB para Hex'],
      ['Hex to RGB', 'Hex para RGB'],
      ['Contrast Checker', 'Verificador de contraste'],
      ['Color Mixer', 'Misturador de cores'],
      ['HTML Color Codes', 'Códigos de cor HTML'],
      ['Learn how HTML color codes work and copy Hex, RGB, HSL, OKLCH, named colors, and CSS-ready color values.', 'Aprenda como os códigos de cor HTML funcionam e copie valores Hex, RGB, HSL, OKLCH, cores nomeadas e valores prontos para CSS.'],
      ['Hex Color Codes', 'Códigos de cor Hex'],
      ['A guide to Hex color codes, six-digit #RRGGBB values, shorthand Hex colors, and Hex to RGB conversion.', 'Guia de códigos Hex, valores #RRGGBB de seis dígitos, cores Hex abreviadas e conversão de Hex para RGB.'],
      ['RGB Color Codes', 'Códigos de cor RGB'],
      ['Understand RGB color codes, convert RGB to Hex, and use rgb() values in CSS.', 'Entenda os códigos RGB, converta RGB para Hex e use valores rgb() em CSS.'],
      ['HSL Color Codes', 'Códigos de cor HSL'],
      ['Learn HSL color codes, hue angles, saturation, lightness, and how to use hsl() in CSS.', 'Aprenda códigos HSL, ângulos de matiz, saturação, luminosidade e como usar hsl() em CSS.'],
      ['CSS Color Codes', 'Códigos de cor CSS'],
      ['Use CSS color codes in stylesheets, gradients, borders, shadows, SVG, and interface design.', 'Use códigos de cor CSS em folhas de estilo, gradientes, bordas, sombras, SVG e design de interfaces.'],
      ['Color Palette Generator', 'Gerador de paletas'],
      ['Generate color palettes from a base color, image, color wheel, harmony, shades, tints, and tones.', 'Gere paletas a partir de uma cor base, imagem, roda de cores, harmonia, sombras, tintas e tons.'],
      ['Web Safe Colors', 'Cores web safe'],
      ['Explore web safe colors, classic browser-safe palettes, Hex values, and modern alternatives.', 'Explore cores web safe, paletas clássicas seguras para navegadores, valores Hex e alternativas modernas.'],
      ['Color Shades Generator', 'Gerador de variações de cor'],
      ['Create color shades, tints, tones, and variations from any Hex, RGB, HSL, or OKLCH color.', 'Crie sombras, tintas, tons e variações a partir de qualquer cor Hex, RGB, HSL ou OKLCH.'],
      ['Color Code Tools helps you pick, convert, compare, and export colors for websites and apps.', 'Color Code Tools ajuda você a escolher, converter, comparar e exportar cores para sites e aplicativos.']
    ]
  }
});

const GUIDE_PAGE_SLUGS = [
  'color-guides',
  'html-color-codes',
  'hex-color-codes',
  'rgb-color-codes',
  'hsl-color-codes',
  'css-color-codes',
  'color-palette-generator',
  'web-safe-colors',
  'color-shades-generator'
];

const GUIDE_PAGE_TEXT = {
  zh: {
    brand: '颜色代码工具',
    footer: '帮助你为网站和应用选择、转换、比较并导出颜色。',
    titleSuffix: '颜色指南',
    intro: (name) => `${name} 页面用对应语言说明颜色格式、使用场景和相关工具，方便你在设计工具与 CSS 之间使用颜色。`,
    sections: (name) => [
      [`什么是${name}`, `${name}介绍这种颜色格式或工具的核心用途，并说明它如何用于网页、界面、图表、按钮、背景、边框和文本。`],
      ['如何使用', '你可以配合取色器、色轮、颜色表、颜色库、对比度检查器和混色工具来选择、转换、测试并导出颜色值。'],
      ['用于网站配色', '在实际项目中，请同时关注可读性、对比度、品牌一致性以及浅色和深色状态下的表现。']
    ],
    names: {
      'color-guides': '颜色指南',
      'html-color-codes': 'HTML 颜色代码',
      'hex-color-codes': 'Hex 颜色代码',
      'rgb-color-codes': 'RGB 颜色代码',
      'hsl-color-codes': 'HSL 颜色代码',
      'css-color-codes': 'CSS 颜色代码',
      'color-palette-generator': '调色板生成器',
      'web-safe-colors': '网页安全色',
      'color-shades-generator': '颜色明暗生成器'
    }
  },
  ja: {
    brand: 'カラーコードツール',
    footer: 'Webサイトやアプリ向けの色を選択、変換、比較、書き出しできます。',
    titleSuffix: 'カラーガイド',
    intro: (name) => `${name}では、色形式、使いどころ、関連ツールを日本語で確認し、デザインツールとCSSの間で色を扱いやすくします。`,
    sections: (name) => [
      [`${name}とは`, `${name}の基本的な用途と、Webページ、UI、グラフ、ボタン、背景、枠線、テキストでの使い方を説明します。`],
      ['使い方', 'カラーピッカー、色相環、カラーチャート、カラーライブラリ、コントラスト確認、カラーミキサーと組み合わせて値を選択、変換、確認、書き出しできます。'],
      ['Web配色での活用', '実際の制作では、読みやすさ、コントラスト、ブランドの一貫性、明るい背景と暗い背景での見え方を確認してください。']
    ],
    names: {
      'color-guides': 'カラーガイド',
      'html-color-codes': 'HTML カラーコード',
      'hex-color-codes': 'Hex カラーコード',
      'rgb-color-codes': 'RGB カラーコード',
      'hsl-color-codes': 'HSL カラーコード',
      'css-color-codes': 'CSS カラーコード',
      'color-palette-generator': 'カラーパレット生成',
      'web-safe-colors': 'Web セーフカラー',
      'color-shades-generator': '色の濃淡生成'
    }
  },
  ko: {
    brand: '색상 코드 도구',
    footer: '웹사이트와 앱에 사용할 색상을 선택, 변환, 비교하고 내보낼 수 있도록 도와줍니다.',
    titleSuffix: '색상 가이드',
    intro: (name) => `${name} 페이지는 색상 형식, 사용 상황, 관련 도구를 한국어로 설명하여 디자인 도구와 CSS 사이에서 색상을 쉽게 다룰 수 있게 합니다.`,
    sections: (name) => [
      [`${name}란?`, `${name}의 기본 용도와 웹 페이지, 인터페이스, 차트, 버튼, 배경, 테두리, 텍스트에서 색상을 사용하는 방법을 설명합니다.`],
      ['사용 방법', '색상 선택기, 색상 휠, 색상 차트, 색상 라이브러리, 대비 검사기, 색상 믹서를 함께 사용해 색상 값을 선택, 변환, 테스트, 내보낼 수 있습니다.'],
      ['웹 팔레트에 활용하기', '실제 프로젝트에서는 가독성, 대비, 브랜드 일관성, 밝은 배경과 어두운 배경에서의 표현을 함께 확인하세요.']
    ],
    names: {
      'color-guides': '색상 가이드',
      'html-color-codes': 'HTML 색상 코드',
      'hex-color-codes': 'Hex 색상 코드',
      'rgb-color-codes': 'RGB 색상 코드',
      'hsl-color-codes': 'HSL 색상 코드',
      'css-color-codes': 'CSS 색상 코드',
      'color-palette-generator': '색상 팔레트 생성기',
      'web-safe-colors': '웹 안전 색상',
      'color-shades-generator': '색상 음영 생성기'
    }
  },
  es: {
    brand: 'Herramientas de códigos de color',
    footer: 'te ayuda a elegir, convertir, comparar y exportar colores para sitios web y aplicaciones.',
    titleSuffix: 'guía de color',
    intro: (name) => `${name} explica formatos de color, usos comunes y herramientas relacionadas para trabajar con colores entre diseño y CSS.`,
    sections: (name) => [
      [`Qué es ${name}`, `${name} resume el uso principal de este formato o herramienta y cómo se aplica en páginas, interfaces, gráficos, botones, fondos, bordes y texto.`],
      ['Cómo usarlo', 'Combínalo con el selector de color, la rueda, la tabla, la biblioteca, el comprobador de contraste y el mezclador para elegir, convertir, probar y exportar valores.'],
      ['Uso en paletas web', 'En proyectos reales, revisa legibilidad, contraste, coherencia de marca y el aspecto sobre fondos claros y oscuros.']
    ],
    names: {
      'color-guides': 'Guías de color',
      'html-color-codes': 'Códigos de color HTML',
      'hex-color-codes': 'Códigos de color Hex',
      'rgb-color-codes': 'Códigos de color RGB',
      'hsl-color-codes': 'Códigos de color HSL',
      'css-color-codes': 'Códigos de color CSS',
      'color-palette-generator': 'Generador de paletas',
      'web-safe-colors': 'Colores seguros para web',
      'color-shades-generator': 'Generador de tonos'
    }
  },
  fr: {
    brand: 'Outils de codes couleur',
    footer: 'vous aide à choisir, convertir, comparer et exporter des couleurs pour les sites web et les applications.',
    titleSuffix: 'guide couleur',
    intro: (name) => `${name} explique les formats de couleur, les usages courants et les outils liés pour passer des outils de design au CSS.`,
    sections: (name) => [
      [`Qu’est-ce que ${name}`, `${name} présente l’usage principal de ce format ou outil et son emploi dans les pages, interfaces, graphiques, boutons, fonds, bordures et textes.`],
      ['Comment l’utiliser', 'Associez-le au sélecteur, à la roue, au nuancier, à la bibliothèque, au vérificateur de contraste et au mélangeur pour choisir, convertir, tester et exporter des valeurs.'],
      ['Utilisation dans les palettes web', 'Dans un projet réel, vérifiez la lisibilité, le contraste, la cohérence de marque et le rendu sur fonds clairs et sombres.']
    ],
    names: {
      'color-guides': 'Guides couleur',
      'html-color-codes': 'Codes couleur HTML',
      'hex-color-codes': 'Codes couleur Hex',
      'rgb-color-codes': 'Codes couleur RGB',
      'hsl-color-codes': 'Codes couleur HSL',
      'css-color-codes': 'Codes couleur CSS',
      'color-palette-generator': 'Générateur de palettes',
      'web-safe-colors': 'Couleurs web safe',
      'color-shades-generator': 'Générateur de nuances'
    }
  },
  de: {
    brand: 'Farbcodetools',
    footer: 'helfen beim Auswählen, Umwandeln, Vergleichen und Exportieren von Farben für Websites und Apps.',
    titleSuffix: 'Farbleitfaden',
    intro: (name) => `${name} erklärt Farbformate, typische Anwendungen und passende Werkzeuge für die Arbeit zwischen Designtools und CSS.`,
    sections: (name) => [
      [`Was ist ${name}`, `${name} beschreibt den Hauptzweck dieses Formats oder Werkzeugs und den Einsatz in Seiten, Oberflächen, Diagrammen, Buttons, Hintergründen, Rahmen und Text.`],
      ['So verwendest du es', 'Kombiniere es mit Farbwähler, Farbrad, Farbtafel, Farbbibliothek, Kontrastprüfung und Farbmischer, um Werte auszuwählen, umzuwandeln, zu testen und zu exportieren.'],
      ['Einsatz in Webpaletten', 'Prüfe in echten Projekten Lesbarkeit, Kontrast, Markenkonsistenz und die Wirkung auf hellen und dunklen Hintergründen.']
    ],
    names: {
      'color-guides': 'Farbleitfäden',
      'html-color-codes': 'HTML-Farbcodes',
      'hex-color-codes': 'Hex-Farbcodes',
      'rgb-color-codes': 'RGB-Farbcodes',
      'hsl-color-codes': 'HSL-Farbcodes',
      'css-color-codes': 'CSS-Farbcodes',
      'color-palette-generator': 'Farbpaletten-Generator',
      'web-safe-colors': 'Websichere Farben',
      'color-shades-generator': 'Generator für Farbabstufungen'
    }
  },
  pt: {
    brand: 'Ferramentas de códigos de cor',
    footer: 'ajuda você a escolher, converter, comparar e exportar cores para sites e aplicativos.',
    titleSuffix: 'guia de cores',
    intro: (name) => `${name} explica formatos de cor, usos comuns e ferramentas relacionadas para trabalhar com cores entre design e CSS.`,
    sections: (name) => [
      [`O que é ${name}`, `${name} resume o uso principal deste formato ou ferramenta e como ele aparece em páginas, interfaces, gráficos, botões, fundos, bordas e textos.`],
      ['Como usar', 'Combine com o seletor, a roda de cores, a tabela, a biblioteca, o verificador de contraste e o misturador para escolher, converter, testar e exportar valores.'],
      ['Uso em paletas web', 'Em projetos reais, verifique legibilidade, contraste, consistência de marca e aparência em fundos claros e escuros.']
    ],
    names: {
      'color-guides': 'Guias de cores',
      'html-color-codes': 'Códigos de cor HTML',
      'hex-color-codes': 'Códigos de cor Hex',
      'rgb-color-codes': 'Códigos de cor RGB',
      'hsl-color-codes': 'Códigos de cor HSL',
      'css-color-codes': 'Códigos de cor CSS',
      'color-palette-generator': 'Gerador de paletas',
      'web-safe-colors': 'Cores web safe',
      'color-shades-generator': 'Gerador de variações de cor'
    }
  }
};

function applyGuidePagesI18n(html, lang, normalizedPath) {
  const slug = normalizedPath.replace(/^\/|\/$/g, '');
  const text = GUIDE_PAGE_TEXT[lang];
  if (!text || !GUIDE_PAGE_SLUGS.includes(slug)) return html;
  const common = GUIDE_ALL_I18N['/color-guides/'] && GUIDE_ALL_I18N['/color-guides/'][lang];
  let out = html;
  const name = text.names[slug] || text.names['color-guides'];

  if (slug !== 'color-guides') {
    const title = `${name} - ${text.titleSuffix}`;
    const description = text.intro(name);
    const sections = text.sections(name).map(([h, p]) => `<section><h2>${h}</h2><p>${p}</p></section>`).join('');
    out = out.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
    out = out.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${escapeAttr(description)}">`);
    out = out.replace(/<h1>[^<]*<\/h1>/i, `<h1>${name}</h1>`);
    out = out.replace(/(<section class="kw-hero"><div class="kw-hero-inner"><div class="kw-crumb">[\s\S]*?<\/div><h1>[\s\S]*?<\/h1><p>)[\s\S]*?(<\/p><\/div><\/section>)/i, `$1${description}$2`);
    out = out.replace(/<main class="kw-main">[\s\S]*?<section><h2>Related color tools<\/h2>/i, `<main class="kw-main">${sections}<section><h2>Related color tools</h2>`);
  }

  if (common) {
    for (const [from, to] of [...common.replacements].sort((a, b) => b[0].length - a[0].length)) {
      out = out.split(from).join(to);
    }
  }

  out = out.replace(/<footer class="kw-footer">[\s\S]*?<\/footer>/i, `<footer class="kw-footer"><a href="/color-picker/">${text.brand}</a> ${text.footer}</footer>`);
  return out;
}

function normalizePagePath(pathname) {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = '/' + path;
  if (!/\.[a-z0-9]+$/i.test(path) && !path.endsWith('/')) path += '/';
  return path;
}

function stripLang(pathname) {
  const match = pathname.match(/^\/(zh|ja|ko|es|fr|de|pt)(?=\/|$)/);
  if (!match) return null;
  const rest = pathname.slice(match[0].length) || '/';
  return { lang: match[1], basePath: normalizePagePath(rest) };
}

function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function alternateLinks(basePath) {
  const path = normalizePagePath(basePath);
  const links = [
    ['x-default', SITE + path],
    ['en', SITE + path],
    ...LANG_PREFIXES.map((prefix) => [LANGS[prefix].hreflang, SITE + '/' + prefix + path])
  ];
  return links.map(([lang, href]) => `<link rel="alternate" hreflang="${lang}" href="${escapeAttr(href)}">`).join('');
}

function localizeHtml(html, lang, basePath) {
  const info = LANGS[lang] || LANGS.zh;
  const localizedPath = '/' + lang + normalizePagePath(basePath);
  const canonical = SITE + localizedPath;
  let out = html;
  const normalizedPath = normalizePagePath(basePath);
  const keyword = (GUIDE_ALL_I18N[normalizedPath] && GUIDE_ALL_I18N[normalizedPath][lang]) ||
    (KEYWORD_I18N[normalizedPath] && KEYWORD_I18N[normalizedPath][lang]);
  if (keyword) {
    for (const [from, to] of [...keyword.replacements].sort((a, b) => b[0].length - a[0].length)) {
      out = out.split(from).join(to);
    }
    out = out.replace(/<title>[^<]*<\/title>/i, `<title>${keyword.title}</title>`);
    out = out.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${escapeAttr(keyword.description)}">`);
  }
  out = applyGuidePagesI18n(out, lang, normalizedPath);
  out = out.replace(/<html\b([^>]*)\blang="[^"]*"/i, `<html$1lang="${info.html}"`);
  out = out.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*>/i, `<link rel="canonical" href="${escapeAttr(canonical)}">`);
  out = out.replace(/<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="[^"]*"\s*>/gi, '');
  out = out.replace('</head>', `${alternateLinks(basePath)}<script>window.HCC_ROUTE_LANG="${lang}";</script></head>`);
  return out;
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const routed = stripLang(url.pathname);

  if (!routed || request.method !== 'GET') {
    return env.ASSETS.fetch(request);
  }

  const assetUrl = new URL(request.url);
  assetUrl.pathname = routed.basePath;
  const assetRequest = new Request(assetUrl.toString(), request);
  const response = await env.ASSETS.fetch(assetRequest);
  const type = response.headers.get('content-type') || '';

  if (!type.includes('text/html')) {
    return response;
  }

  const html = await response.text();
  const headers = new Headers(response.headers);
  headers.set('content-type', 'text/html; charset=utf-8');
  return new Response(localizeHtml(html, routed.lang, routed.basePath), {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
