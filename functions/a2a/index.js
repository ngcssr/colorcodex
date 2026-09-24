/**
 * A2A (Agent2Agent) endpoint — read-only color lookup agent.
 *
 * Protocol: A2A JSON-RPC 2.0 binding.
 * Methods:  message/send, tasks/get  (spec-compliant error responses for the rest)
 * Discovery: /.well-known/agent-card.json (v1.0) and /.well-known/agent.json (v0.3)
 *
 * Stateless by design: Cloudflare Pages Functions have no persistent storage,
 * so the Task id is self-contained — `t_` + base64url(payload). tasks/get
 * decodes the id and rebuilds the task deterministically, so no database is
 * needed and repeated reads are idempotent.
 *
 * Read-only: this agent never mutates state, requires no authentication, and
 * performs no outbound calls. It only reads the inlined color table.
 */
import { NAMED_COLORS, lookupColor, convertHex, isValidHex } from './_data.js';

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store',
};

// A2A-specific JSON-RPC error codes (per specification).
const E_TASK_NOT_FOUND = -32001;
const E_TASK_NOT_CANCELABLE = -32002;
const E_UNSUPPORTED_OPERATION = -32004;

const MAX_QUERY_CHARS = 300;

// Protocol generations this endpoint serves. The A2A specification states that
// a missing A2A-Version header is interpreted as 0.3.
const V1 = '1.0';
const V03 = '0.3';

function detectProtocolVersion(request) {
  const raw = String(request.headers.get('A2A-Version') || '').trim().toLowerCase();
  if (!raw) return V03;
  if (raw.indexOf('0.') === 0) return V03;
  return V1;
}

/* ------------------------------------------------------------------ *
 * base64url helpers (UTF-8 safe — btoa alone breaks on non-Latin text)
 * ------------------------------------------------------------------ */
function b64urlEncode(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 1) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(str) {
  let b64 = String(str).replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/* ------------------------------------------------------------------ *
 * JSON-RPC 2.0 envelope
 * ------------------------------------------------------------------ */
function rpcOk(id, result) {
  return JSON.stringify({ jsonrpc: '2.0', id, result });
}

function rpcErr(id, code, message, data) {
  const error = { code, message };
  if (data !== undefined) error.data = data;
  return JSON.stringify({ jsonrpc: '2.0', id, error });
}

/* ------------------------------------------------------------------ *
 * Stateless task id
 * ------------------------------------------------------------------ */
function encodeTaskId(payload) {
  return 't_' + b64urlEncode(JSON.stringify(payload));
}

function decodeTaskId(taskId) {
  if (typeof taskId !== 'string' || taskId.indexOf('t_') !== 0) return null;
  try {
    const parsed = JSON.parse(b64urlDecode(taskId.slice(2)));
    return parsed && typeof parsed.q === 'string' ? parsed : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * Intent resolution — turns a natural-language message into a lookup
 * ------------------------------------------------------------------ */
function extractText(message) {
  const parts = Array.isArray(message && message.parts) ? message.parts : [];
  const texts = [];
  for (const part of parts) {
    if (!part || typeof part !== 'object') continue;
    // v0.3 sends { kind: "text", text: "..." }; v1.0 sends { text: "..." }
    // because Part is a oneof there. Fall back to the payload field itself.
    const declared = part.kind !== undefined ? part.kind : part.type;
    const isText = declared === undefined
      ? typeof part.text === 'string'
      : declared === 'text';
    if (isText && typeof part.text === 'string' && part.text) texts.push(part.text);
  }
  return texts.join(' ').trim();
}

function findNamedColor(text) {
  const padded = ' ' + String(text).toLowerCase().replace(/[^a-z0-9]+/g, ' ') + ' ';
  let best = null;
  for (const row of NAMED_COLORS) {
    const name = row[0].toLowerCase();
    if (padded.indexOf(' ' + name + ' ') !== -1 && (!best || name.length > best.length)) {
      best = name;
    }
  }
  return best;
}

/**
 * Resolution order matters:
 *   1. explicit "#rrggbb" / "#rgb"  — unambiguous
 *   2. bare 6-digit hex            — almost always a color value
 *   3. a known named color         — natural language friendly
 *   4. bare 3-digit hex            — last, because words like "fed" also match
 *   5. usage guidance
 */
function resolveIntent(text) {
  const raw = String(text || '').trim();
  if (!raw) return { kind: 'help' };

  const hashed = raw.match(/#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/);
  if (hashed) return { kind: 'convert', hex: hashed[1] };

  const six = raw.match(/\b[0-9a-fA-F]{6}\b/);
  if (six) return { kind: 'convert', hex: six[0] };

  const named = findNamedColor(raw);
  if (named) {
    const result = lookupColor(named);
    if (result) return { kind: 'lookup', result };
  }

  const three = raw.match(/\b[0-9a-fA-F]{3}\b/);
  if (three && isValidHex(three[0])) return { kind: 'convert', hex: three[0] };

  return { kind: 'help' };
}

const USAGE_TEXT =
  'Read-only color agent. Send a color name (e.g. "Crimson") or a hex value ' +
  '(e.g. "DC143C" or "#DC143C") to look it up. No authentication required.';

/**
 * Part shape differs between protocol generations:
 *   v0.3 -> { "kind": "text", "text": "..." }
 *   v1.0 -> { "text": "..." }   (Part is a oneof, so there is no discriminator)
 * Everything else (artifactId, name, parts, messageId, contextId, taskId) is
 * identical in both generations.
 */
function makePart(kind, body, version) {
  return version === V1 ? body : Object.assign({ kind }, body);
}

function buildArtifact(intent, version) {
  if (intent.kind === 'lookup') {
    const r = intent.result;
    return {
      artifactId: 'color-lookup',
      name: 'color',
      parts: [
        makePart('text', { text: r.name + ': ' + r.hex + ', ' + r.rgb + ', ' + r.hsl }, version),
        makePart('data', { data: r }, version),
      ],
    };
  }

  if (intent.kind === 'convert') {
    const r = convertHex(intent.hex);
    if (r) {
      return {
        artifactId: 'color-conversion',
        name: 'conversion',
        parts: [
          makePart('text', { text: r.input_hex + ' = ' + r.rgb + ' = ' + r.hsl }, version),
          makePart('data', { data: r }, version),
        ],
      };
    }
  }

  return {
    artifactId: 'usage',
    name: 'usage',
    parts: [makePart('text', { text: USAGE_TEXT }, version)],
  };
}

/**
 * Builds the Task for the requested protocol generation.
 *
 * v0.3 and v1.0 differ in exactly four places, all handled here:
 *   1. Task carries a "kind": "task" discriminator only in v0.3
 *   2. status.state is lowercase ("completed") in v0.3,
 *      but the protobuf enum name ("TASK_STATE_COMPLETED") in v1.0
 *   3. history[].role is "user" in v0.3 but "ROLE_USER" in v1.0
 *   4. Part carries a "kind" discriminator only in v0.3 (see makePart)
 *
 * Every value is derived from the payload, which travels inside the task id —
 * so rebuilding from an id yields a byte-identical task.
 */
function buildTask(payload, version) {
  const query = String(payload.q || '');
  const contextId = payload.c;
  const timestamp = payload.t;
  const messageId = payload.m;
  const taskId = encodeTaskId(payload);
  const intent = resolveIntent(query);
  const isV1 = version === V1;

  const historyEntry = {
    messageId,
    role: isV1 ? 'ROLE_USER' : 'user',
    parts: [makePart('text', { text: query }, version)],
    taskId,
    contextId,
  };

  const task = {
    id: taskId,
    contextId,
    status: {
      state: isV1 ? 'TASK_STATE_COMPLETED' : 'completed',
      timestamp,
    },
    artifacts: [buildArtifact(intent, version)],
    history: [isV1 ? historyEntry : Object.assign({ kind: 'message' }, historyEntry)],
    metadata: {
      readOnly: true,
      generator: 'colorcodex-a2a/1.0.0',
      resolvedAs: intent.kind,
    },
  };

  return isV1 ? task : Object.assign({ kind: 'task' }, task);
}

/* ------------------------------------------------------------------ *
 * Method handlers
 * ------------------------------------------------------------------ */
function handleMessageSend(id, params, version) {
  const message = params && params.message;
  if (!message || typeof message !== 'object') {
    return rpcErr(id, -32602, 'Invalid params: "message" is required');
  }

  const text = extractText(message).slice(0, MAX_QUERY_CHARS);
  const stamp = new Date().toISOString();
  const seed = b64urlEncode(text.slice(0, 80) || stamp).slice(0, 24);

  const payload = {
    q: text,
    c: message.contextId || 'ctx_' + seed,
    t: stamp,
    m: message.messageId || 'msg_' + seed,
  };

  const task = buildTask(payload, version);
  // v1.0 wire format (verified against official a2a-sdk 1.1.5): the
  // message/send result is a SendMessageResponse wrapper { task | message },
  // so the Task is nested under "task". v0.3 used the bare Task as result.
  // GetTask keeps the bare Task in BOTH versions (per the same SDK).
  return rpcOk(id, version === V1 ? { task } : task);
}

function handleTasksGet(id, params, version) {
  const taskId = params && params.id;
  const payload = decodeTaskId(taskId);
  if (!payload) {
    return rpcErr(id, E_TASK_NOT_FOUND, 'Task not found', { id: taskId });
  }
  return rpcOk(id, buildTask(payload, version));
}

/* ------------------------------------------------------------------ *
 * Entry points
 * ------------------------------------------------------------------ */
export async function onRequestPost({ request }) {
  const version = detectProtocolVersion(request);

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(rpcErr(null, -32700, 'Parse error'), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return new Response(rpcErr(null, -32600, 'Invalid Request'), {
      status: 200,
      headers: JSON_HEADERS,
    });
  }

  const id = body.id === undefined ? null : body.id;
  const method = body.method;
  const params = body.params && typeof body.params === 'object' ? body.params : {};

  let payload;
  switch (method) {
    // v0.3 wire names and the v1.0 abstract-operation names are both
    // accepted: the official a2a-sdk 1.x JSON-RPC transport sends
    // 'SendMessage' / 'GetTask' / 'CancelTask' / 'SendStreamingMessage'.
    case 'message/send':
    case 'SendMessage':
      payload = handleMessageSend(id, params, version);
      break;

    case 'tasks/get':
    case 'GetTask':
      payload = handleTasksGet(id, params, version);
      break;

    case 'tasks/cancel':
    case 'CancelTask':
      payload = rpcErr(
        id,
        E_TASK_NOT_CANCELABLE,
        'Task cannot be canceled: color lookups complete immediately.'
      );
      break;

    case 'message/stream':
    case 'SendStreamingMessage':
      payload = rpcErr(
        id,
        E_UNSUPPORTED_OPERATION,
        'Streaming is not supported by this agent (capabilities.streaming = false).'
      );
      break;

    default:
      payload = rpcErr(id, -32601, 'Method not found: ' + method);
  }

  return new Response(payload, { status: 200, headers: JSON_HEADERS });
}

export async function onRequestGet() {
  return new Response(
    JSON.stringify({
      endpoint: 'https://www.colorcodetools.com/a2a',
      transport: 'A2A JSON-RPC 2.0',
      usage: 'POST a JSON-RPC 2.0 request with method "message/send" or "tasks/get".',
      agentCard: 'https://www.colorcodetools.com/.well-known/agent-card.json',
    }),
    { status: 405, headers: Object.assign({}, JSON_HEADERS, { Allow: 'POST, OPTIONS' }) }
  );
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, A2A-Version',
      'Access-Control-Max-Age': '86400',
    },
  });
}
