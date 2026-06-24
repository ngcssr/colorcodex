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
    }
  }
};

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
  const keyword = KEYWORD_I18N[normalizePagePath(basePath)] && KEYWORD_I18N[normalizePagePath(basePath)][lang];
  if (keyword) {
    for (const [from, to] of keyword.replacements) {
      out = out.split(from).join(to);
    }
    out = out.replace(/<title>[^<]*<\/title>/i, `<title>${keyword.title}</title>`);
    out = out.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${escapeAttr(keyword.description)}">`);
  }
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
