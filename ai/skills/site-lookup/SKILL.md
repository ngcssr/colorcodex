---
name: site-lookup
description: Retrieve actual public color information from ColorCodex Tools (color names, hex/RGB/HSL codes, conversions).
version: 1.0.0
type: skill-md
audience: [agent]
language: en
---

# ColorCodex Site Lookup Skill

## Purpose
This skill enables an AI agent to retrieve real, public color information from the ColorCodex Tools website (https://www.colorcodetools.com/), including named HTML colors and their Hex / RGB / HSL representations.

## Supported Capabilities
- **Lookup color by name**: Given a known CSS/HTML color name (case-insensitive, e.g. "Crimson", "salmon"), return its Hex, RGB, and HSL codes.
- **Enumerate named colors**: Return the list of supported color names.
- **Conversion**: Hex -> RGB -> HSL (read-only, public, no authentication).

## How to Use

### Endpoint 1: Lookup a single color by name
- **Method**: GET
- **URL**: `https://www.colorcodetools.com/api/agent/colors/{name}`
- **Path parameter**:
  - `name` — the HTML/CSS color name, case-insensitive (e.g. `Crimson`, `salmon`). Use URL-safe encoding for spaces; named colors here have no spaces.
- **Response 200**: `application/json`
  ```json
  {
    "name": "Crimson",
    "hex": "#DC143C",
    "rgb": "rgb(220, 20, 60)",
    "hsl": "hsl(348, 83%, 47%)",
    "source_url": "https://www.colorcodetools.com/color-names/"
  }
  ```
- **Response 404**: color not found.
  ```json
  { "error": "not_found", "message": "Color 'xyz' is not a recognized named color." }
  ```

### Endpoint 2: List all named colors
- **Method**: GET
- **URL**: `https://www.colorcodetools.com/api/agent/colors`
- **Response 200**: `application/json`
  ```json
  {
    "count": 140,
    "colors": [
      { "name": "IndianRed", "hex": "#CD5C5C", "rgb": "rgb(205, 92, 92)", "hsl": "hsl(0, 53%, 58%)" }
    ],
    "source_url": "https://www.colorcodetools.com/color-names/"
  }
  ```

### Endpoint 3: Hex -> RGB -> HSL conversion
- **Method**: GET
- **URL**: `https://www.colorcodetools.com/api/agent/convert?hex=DC143C`
- **Query parameter**: `hex` — 3 or 6 digit hex without `#` (e.g. `DC143C`, `fff`).
- **Response 200**: `application/json`
  ```json
  {
    "input_hex": "#DC143C",
    "rgb": "rgb(220, 20, 60)",
    "hsl": "hsl(348, 83%, 47%)"
  }
  ```
- **Response 400**: invalid hex.
  ```json
  { "error": "invalid_input", "message": "hex parameter must be 3 or 6 hex digits." }
  ```

## Agent Instructions (I-Lang)

::ILANG::v5.0
[TYPE:agent_skill][PROJECT:colorcodex_site_lookup][VERSION:1.0.0][LANG:en]

::STATE{@ROLE, function:Retrieve real public color data from ColorCodex Tools}
::STATE{@BASE_URL, value:https://www.colorcodetools.com}
::STATE{@DATA_FRESHNESS, value:Static HTML/CSS color name table; 140 colors as of 2026-09-15}

::MODULE{USAGE}
  [MUST] Use the Lookup endpoint to resolve a single named color. Names are case-insensitive.
  [MUST] If a name is not recognized, the endpoint returns 404 with `error: not_found`. Do not invent values; report unknown.
  [MUST] For conversion, use the convert endpoint with a 3- or 6-digit hex string (no `#` prefix).
  [MUST] Cite the `source_url` field when surfacing color data to a user.
  [MUST] Answer in the visitor's language. Preserve identifiers (Hex/RGB/HSL) exactly as returned.
  [MUST] Do not attempt write operations, account creation, or authenticated flows; this service is public read-only.
::ILANG::COMPLETE::

## Limitations
- Only HTML/CSS named colors are supported by the lookup endpoint (140 colors). Custom hex values must use the convert endpoint.
- No pagination on the list endpoint; all 140 colors are returned in one response.
- No authentication required; this is a public read-only service.

## Source
- Data origin: `data-names.js` (HTML/CSS named color table, served at https://www.colorcodetools.com/color-names/)
- Provenance: HTML/CSS specification named colors; values verified against MDN Web Docs.
- Last verified: 2026-09-15
