// _middleware.js — Markdown content negotiation for the homepage
// 当 Accept: text/markdown 时，对首页返回有效 Markdown 版本
// 普通 HTML 请求透传到静态资源

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

export async function onRequest(context) {
  const { request, next } = context;

  // 仅对首页（/）执行 markdown 协商
  const url = new URL(request.url);
  const pathname = url.pathname;

  // 首页或 /index.html
  const isHomepage = pathname === '/' || pathname === '/index.html';

  if (isHomepage && isMarkdownRequested(request)) {
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

  // 普通 HTML 请求透传
  return next();
}
