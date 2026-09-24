// _middleware.js — Markdown content negotiation for HTML pages
// 当 Accept: text/markdown 时：
//   - 首页返回手写的精选 Markdown（质量最优）
//   - 其他 HTML 页面从真实响应中提取 Markdown（标题 / 段落 / 表格），
//     保证"同页"语义 —— markdown 内容来自该页实际渲染的 HTML
// 普通 HTML 请求透传到静态资源；任何非 200 / 非 HTML 响应原样透传，
// markdown 生成失败也绝不影响页面本身。

function isMarkdownRequested(request) {
  const accept = (request.headers.get('Accept') || '').toLowerCase();
  // 必须明确请求 markdown，且不是 */* 通配
  if (accept.includes('text/markdown')) {
    // 检查是否包含 */* 通配（浏览器一般发送 */*）
    // 但如果 text/markdown 在前或并列，则视为 markdown 请求
    const parts = accept.split(',').map(s => s.split(';')[0].trim());
    if (parts.includes('text/markdown')) return true;
  }
  return false;
}

function buildHomepageMarkdown() {
  return `# ColorCodex Tools — HTML Color Codes & Color Picker

ColorCodex Tools (https://www.colorcodetools.com/) is a public, read-only color tools website providing a color picker, named HTML/CSS colors, hex/RGB/HSL conversions, color charts, and a color library.

## Available Tools

- [Color Picker](https://www.colorcodetools.com/color-picker/) — Interactive picker with image picker, color wheel, harmonies, variations, conversions, contrast checks, palettes, and color blindness simulator.
- [Image Color Picker](https://www.colorcodetools.com/image-color-picker/) — Pick colors from uploaded images.
- [Color Wheel](https://www.colorcodetools.com/color-wheel/) — Visual color wheel selector.
- [Color Chart](https://www.colorcodetools.com/color-chart/) — Chart of all named colors.
- [Color Names](https://www.colorcodetools.com/color-names/) — 140 HTML/CSS named colors with Hex, RGB, and HSL.
- [Color Library](https://www.colorcodetools.com/colors/) — Browsable library by category.
- [Contrast Checker](https://www.colorcodetools.com/contrast-checker/) — WCAG contrast checks.
- [Color Mixer](https://www.colorcodetools.com/color-mixer/) — Mix two colors.
- [RGB to Hex](https://www.colorcodetools.com/rgb-to-hex/) / [Hex to RGB](https://www.colorcodetools.com/hex-to-rgb/) — Color conversion.
- [Minecraft Color Codes](https://www.colorcodetools.com/minecraft-color-codes/) / [Bukkit](https://www.colorcodetools.com/bukkit-color-codes/) / [Roblox](https://www.colorcodetools.com/roblox-color-codes/) — Game-specific color codes.

## Public Read-Only API

- [OpenAPI document](https://www.colorcodetools.com/openapi.json)
- Base: \`https://www.colorcodetools.com/api/agent\`
- \`GET /api/agent/colors\` — List all 140 named colors.
- \`GET /api/agent/colors/{name}\` — Lookup a color by name (case-insensitive). Example: \`/api/agent/colors/Crimson\` returns \`{"name":"Crimson","hex":"#DC143C","rgb":"rgb(220, 20, 60)","hsl":"hsl(348, 83%, 47%)","source_url":"https://www.colorcodetools.com/color-names/"}\`
- \`GET /api/agent/convert?hex=DC143C\` — Convert hex to RGB and HSL.

## MCP Server

- Server card: \`https://www.colorcodetools.com/.well-known/mcp/server-card.json\`
- Transport: HTTP at \`POST https://www.colorcodetools.com/mcp\` (stateless)
- Tools: \`lookup-color\` (input: \`{name: string}\`), \`convert-color\` (input: \`{hex: string}\`)
- No authentication required.

## Agent Skill

- Index: \`https://www.colorcodetools.com/.well-known/agent-skills/index.json\`
- Artifact: \`https://www.colorcodetools.com/ai/skills/site-lookup/SKILL.md\`

## Agent Service Documentation

- [Service doc](https://www.colorcodetools.com/ai/index.md) — Full agent service documentation.
- [llms.txt](https://www.colorcodetools.com/llms.txt) — Compact agent reference.
- [llms-full.txt](https://www.colorcodetools.com/llms-full.txt) — Full agent reference.

## Authentication Status

Coming soon. Authentication is currently not available. See [/auth.md](https://www.colorcodetools.com/auth.md) for details.

All color lookup, conversion, and MCP operations are public read-only and require no authentication.

## Languages

English, 中文, 日本語, 한국어, Español, Français, Deutsch, Português.

## Source

Color name data: \`data-names.js\` (served at /color-names/). Values verified against MDN Web Docs HTML/CSS named color specification.

Last updated: 2026-09-15.
`;
}

/* ------------------------------------------------------------------ *
 * Generic HTML -> Markdown extraction for deep pages.
 * Pure string operations; cannot throw in practice. Strips chrome
 * (script/style/svg/nav/footer/modals) and keeps the structural
 * content: h1-h3, paragraphs, and the first tables.
 * ------------------------------------------------------------------ */
function stripTagsAndEntities(s) {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function tableToMarkdown(tableHtml) {
  const rows = [];
  const trRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let m;
  while ((m = trRe.exec(tableHtml)) !== null) {
    const cells = [];
    const cellRe = /<(?:th|td)[^>]*>([\s\S]*?)<\/(?:th|td)>/gi;
    let c;
    while ((c = cellRe.exec(m[1])) !== null) {
      cells.push(stripTagsAndEntities(c[1]).replace(/\|/g, '\\|'));
    }
    if (cells.length) rows.push(cells);
  }
  if (!rows.length) return '';
  const width = rows.reduce((w, r) => Math.max(w, r.length), 0);
  const norm = rows.map((r) => { const x = r.slice(); while (x.length < width) x.push(''); return x; });
  const line = (cells) => '| ' + cells.join(' | ') + ' |';
  const out = [line(norm[0]), '| ' + Array(width).fill('---').join(' | ') + ' |'];
  // Cap each table at 40 rows to keep payloads bounded on huge charts.
  for (let i = 1; i < norm.length && i <= 40; i++) out.push(line(norm[i]));
  return out.join('\n');
}

function htmlToMarkdown(html, pathname) {
  // JSON-LD lives inside a <script>, so capture it before scripts are stripped.
  const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);

  // Remove non-content chrome first.
  const s = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[\s\S]*?<\/aside>/gi, '');

  const title = stripTagsAndEntities((s.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '');

  const parts = ['# ' + (title || pathname), '', '> Source: https://www.colorcodetools.com' + pathname, ''];

  const blockRe = /<(h1|h2|h3|p|table)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  let h1Seen = false;
  let tableCount = 0;
  while ((m = blockRe.exec(s)) !== null) {
    const tag = m[1].toLowerCase();
    const inner = m[2];
    if (tag === 'h1') {
      const t = stripTagsAndEntities(inner);
      if (!t) continue;
      if (!h1Seen) { parts[0] = '# ' + t; h1Seen = true; }
      else parts.push('\n## ' + t + '\n');
    } else if (tag === 'h2' || tag === 'h3') {
      const t = stripTagsAndEntities(inner);
      if (t) parts.push('\n' + (tag === 'h2' ? '## ' : '### ') + t + '\n');
    } else if (tag === 'p') {
      // Keep sentence-like paragraphs; drop button/label fragments.
      const t = stripTagsAndEntities(inner);
      if (t.length >= 15 && /\s/.test(t)) parts.push(t + '\n');
    } else if (tag === 'table') {
      if (tableCount < 3) {
        const md = tableToMarkdown(inner);
        if (md) { parts.push('\n' + md + '\n'); tableCount++; }
      }
    }
  }
  // Append the page's structured data: many pages on this site render their
  // tables and lists client-side, so the JSON-LD carries the substantive
  // machine-readable content (name, description, featureList).
  if (ldMatch && ldMatch[1].trim()) {
    parts.push('\n## Structured data (JSON-LD)\n\n```json\n' + ldMatch[1].trim() + '\n```\n');
  }

  return parts.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

function isHtmlPage(pathname) {
  const last = pathname.split('/').pop();
  return last === '' || last.indexOf('.') === -1;
}

export async function onRequest(context) {
  const { request, next } = context;

  if (!isMarkdownRequested(request)) return next();

  const url = new URL(request.url);
  const pathname = url.pathname;

  // Homepage (and /index.html): curated hand-written markdown.
  const isHomepage = pathname === '/' || pathname === '/index.html';
  if (isHomepage) {
    return new Response(buildHomepageMarkdown(), {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'no-cache, max-age=0, must-revalidate',
        'Vary': 'Accept',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  // Other HTML pages: derive markdown from the real response so the
  // content is genuinely the same page. Anything that is not a 200
  // HTML response passes through untouched.
  if (isHtmlPage(pathname)) {
    let upstream = null;
    try {
      upstream = await next();
      const ct = upstream.headers.get('content-type') || '';
      if (upstream.status !== 200 || ct.indexOf('text/html') === -1) {
        return upstream;
      }
      const html = await upstream.text();
      const md = htmlToMarkdown(html, pathname);
      return new Response(md, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'no-cache, max-age=0, must-revalidate',
          'Vary': 'Accept',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (e) {
      // Markdown generation must never break the page itself.
      if (upstream) {
        return new Response('# ' + pathname + '\n\nMarkdown version temporarily unavailable.\n', {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Cache-Control': 'no-cache, max-age=0, must-revalidate',
            'Vary': 'Accept',
          },
        });
      }
      return next();
    }
  }

  // Everything else passes through.
  return next();
}
