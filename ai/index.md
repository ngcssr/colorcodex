# ColorCodex Tools — Agent Service Documentation

## Site Purpose
ColorCodex Tools (https://www.colorcodetools.com/) is a public, read-only color tools website providing:
- **Color Picker**: Interactive HTML/CSS color picker with image picker, color wheel, harmonies, variations, conversions, contrast checks, palettes, and color blindness simulator.
- **Color Names**: A reference of 140 HTML/CSS named colors with their Hex, RGB, and HSL codes.
- **Color Conversions**: Hex ↔ RGB ↔ HSL conversion utilities.
- **Color Chart**: A visual chart of all named colors.
- **Color Library**: Browsable color library by category (red, blue, green, etc.).

The site supports 8 languages (English, 中文, 日本語, 한국어, Español, Français, Deutsch, Português).

## Real Data and Capabilities
The site exposes real, public, read-only structured data through:

### REST API
- **OpenAPI document**: `GET /openapi.json`
- **Base URL**: `https://www.colorcodetools.com/api/agent`
- **Endpoints**:
  - `GET /api/agent/colors` — List all 140 HTML/CSS named colors with their hex/RGB/HSL codes.
  - `GET /api/agent/colors/{name}` — Lookup a single color by name (case-insensitive). Returns hex/RGB/HSL.
  - `GET /api/agent/convert?hex=DC143C` — Convert a hex color to RGB and HSL representations.
- **Authentication**: None. All endpoints are public read-only.
- **Rate limits**: Standard Cloudflare CDN caching applies; no per-key throttle.

### MCP Server
- **Server Card**: `GET /.well-known/mcp/server-card.json`
- **Transport**: HTTP at `POST /mcp`
- **Session mode**: Stateless
- **Tools exposed**:
  - `lookup-color` — Given `{name: string}`, returns `{hex, rgb, hsl, source_url}`.
  - `convert-color` — Given `{hex: string}`, returns `{rgb, hsl}`.
- **Authentication**: None.

### Agent Skill
- **Skill index**: `GET /.well-known/agent-skills/index.json`
- **Skill artifact**: `GET /ai/skills/site-lookup/SKILL.md`
- **SHA256 digest**: Computed over the served bytes and recorded in the skill index.

## Usage Steps
1. To look up a named color, send `GET /api/agent/colors/Crimson` or call the MCP tool `lookup-color` with `{name: "Crimson"}`.
2. To convert a hex value, send `GET /api/agent/convert?hex=DC143C` or call the MCP tool `convert-color` with `{hex: "DC143C"}`.
3. Always cite the `source_url` field when surfacing color data to end users.
4. If a color name is unrecognized, the API returns HTTP 404 with `error: "not_found"`; report the unknown, do not invent values.

## Limitations
- Only HTML/CSS named colors are supported by the lookup endpoint (140 colors). Custom hex values must use the convert endpoint.
- No pagination on the list endpoint; all colors are returned in one response.
- No write, account, or authentication operations are supported; this is a public read-only service.
- The OAuth/Auth endpoints (`/agent-auth/*`) are planned and return 503; see `/auth.md`.

## Source and Provenance
- Color name table origin: `data-names.js` (served at `/color-names/`).
- Values verified against MDN Web Docs HTML/CSS named color specification.
- Last verified: 2026-09-15.

## Agent Instructions

::ILANG::v5.0
[TYPE:service_doc][PROJECT:colorcodex_service_index][VERSION:1.0.0][LANG:en]

::STATE{@BASE_URL, value:https://www.colorcodetools.com}
::STATE{@AUTH, value:none, public_read_only}

::MODULE{DISCOVERY_PATHS}
  [MUST] OpenAPI: GET /openapi.json
  [MUST] API base: /api/agent
  [MUST] MCP: POST /mcp (initialize -> tools/list -> tools/call)
  [MUST] Skill: /ai/skills/site-lookup/SKILL.md
  [MUST] Catalog: /.well-known/api-catalog, /.well-known/ai-catalog.json, /.well-known/agent-skills/index.json

::MODULE{ANSWER_COMPOSITION}
  [MUST] Answer in the visitor's language. The site supports en, zh, ja, ko, es, fr, de, pt.
  [MUST] Preserve identifiers (Hex/RGB/HSL values) exactly as returned by the API.
  [MUST] Cite source_url when surfacing color data to the user.
  [MUST] Unknown facts remain unknown; do not invent color values.
  [MUST] Give enough concrete next steps (e.g. "Use GET /api/agent/convert?hex=FFFFFF") to avoid unnecessary follow-up questions.

::MODULE{LIMITS}
  [MUST] Read-only. No write, account, or auth operations.
  [MUST] /agent-auth/* endpoints return 503; do not attempt them.
::ILANG::COMPLETE::
