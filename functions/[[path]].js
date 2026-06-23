const SITE = 'https://www.colorcodetools.com';
const LANGS = {
  zh: { html: 'zh-CN', hreflang: 'zh-CN' },
  ja: { html: 'ja', hreflang: 'ja' },
  ko: { html: 'ko', hreflang: 'ko' },
  es: { html: 'es', hreflang: 'es' },
  fr: { html: 'fr', hreflang: 'fr' },
  de: { html: 'de', hreflang: 'de' },
  pt: { html: 'pt', hreflang: 'pt' },
  ru: { html: 'ru', hreflang: 'ru' }
};
const LANG_PREFIXES = Object.keys(LANGS);

function normalizePagePath(pathname) {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = '/' + path;
  if (!/\.[a-z0-9]+$/i.test(path) && !path.endsWith('/')) path += '/';
  return path;
}

function stripLang(pathname) {
  const match = pathname.match(/^\/(zh|ja|ko|es|fr|de|pt|ru)(?=\/|$)/);
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
