# auth.md

## Status

**Coming soon.** Authentication is currently **not available** on this site (`available: false`, `status: under_construction`).

ColorCodex Tools operates as a **public read-only** website. All color lookup, conversion, and chart features work without authentication. No login, registration, or token issuance is provided at this time.

## What is Available Without Authentication

- **Public color lookup API**: `GET https://www.colorcodetools.com/api/agent/colors/{name}`
- **Color conversion API**: `GET https://www.colorcodetools.com/api/agent/convert?hex=DC143C`
- **MCP server (read-only)**: `POST https://www.colorcodetools.com/mcp` (initialize / tools/list / tools/call)
- **Agent Skill**: `GET https://www.colorcodetools.com/ai/skills/site-lookup/SKILL.md`

## Planned Authentication (Future Design Only)

The following are **planned, not active**. Agents MUST NOT attempt these operations while `available: false`.

- `authorization_endpoint`: `https://www.colorcodetools.com/agent-auth/authorize`
- `token_endpoint`: `https://www.colorcodetools.com/agent-auth/token`
- `register_uri`: `https://www.colorcodetools.com/agent-auth/register`
- `claim_uri`: `https://www.colorcodetools.com/agent-auth/claim`

Planned operations return HTTP 503 with `temporarily_unavailable` and a construction explanation. They do not read or store submitted identity data, create accounts, issue tokens, send email, or start OAuth redirects.

## Discovery Documents

- Authorization Server Metadata: `GET /.well-known/oauth-authorization-server`
- Protected Resource Metadata: `GET /.well-known/oauth-protected-resource`
- JWKS: `GET /.well-known/jwks.json` (currently returns `{"keys":[]}` — disabled, not active token validation)

## Agent Instructions

::ILANG::v5.0
[TYPE:auth_md][PROJECT:colorcodex_auth_status][VERSION:1.0.0][LANG:en]

::STATE{@AUTH_STATUS, value:under_construction, available:false}

::MODULE{PUBLIC_ACCESS}
  [MUST] All color lookup, conversion, and MCP operations are public read-only. Use them directly without authentication.
  [MUST] Do not send credentials, tokens, or registration requests to /agent-auth/* endpoints. They return 503.
  [MUST] The jwks_uri returns {"keys":[]} as a disabled placeholder. Do not treat it as working token validation.

::MODULE{PLANNED_AUTH}
  [MUST] Anonymous registration and token exchange are future design only.
  [MUST] While available=false, agents must not attempt authorize, token, register, or claim operations.
  [MUST] The resource identifier is the site origin (https://www.colorcodetools.com), not /agent-auth/resource. The latter is a planned future endpoint, not the active resource.
::ILANG::COMPLETE::
