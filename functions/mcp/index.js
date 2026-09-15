import { MCP_TOOLS, handleMcpTool } from '../_data.js';

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Cache-Control': 'no-store',
  'MCP-Protocol-Version': '2025-09-25',
};

function jsonrpc(id, result, error) {
  const msg = { jsonrpc: '2.0', id };
  if (error) msg.error = error;
  else msg.result = result;
  return JSON.stringify(msg);
}

function err(id, code, message) {
  return jsonrpc(id, undefined, { code, message });
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(err(0, -32700, 'Parse error'), { status: 400, headers: JSON_HEADERS });
  }

  const id = body.id;
  const method = body.method;
  const params = body.params || {};

  // 1. initialize
  if (method === 'initialize') {
    return new Response(jsonrpc(id, {
      protocolVersion: '2025-09-25',
      serverInfo: {
        name: 'colorcodex-site-lookup',
        version: '1.0.0',
        title: 'ColorCodex Color Lookup MCP Server',
      },
      capabilities: {
        tools: {},
        prompts: false,
        resources: false,
        logging: false,
      },
    }), { status: 200, headers: JSON_HEADERS });
  }

  // 2. notifications/initialized (no response for notification)
  if (method === 'notifications/initialized') {
    return new Response(null, { status: 202, headers: JSON_HEADERS });
  }

  // 3. tools/list
  if (method === 'tools/list') {
    return new Response(jsonrpc(id, { tools: MCP_TOOLS }), { status: 200, headers: JSON_HEADERS });
  }

  // 4. tools/call
  if (method === 'tools/call') {
    const toolName = params.name;
    const toolArgs = params.arguments || {};
    const result = handleMcpTool(toolName, toolArgs);
    return new Response(jsonrpc(id, result), { status: 200, headers: JSON_HEADERS });
  }

  // 5. ping (optional)
  if (method === 'ping') {
    return new Response(jsonrpc(id, {}), { status: 200, headers: JSON_HEADERS });
  }

  // unknown method
  return new Response(err(id, -32601, `Method not found: ${method}`), { status: 404, headers: JSON_HEADERS });
}

// OPTIONS handler for CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, MCP-Protocol-Version',
      'Access-Control-Max-Age': '86400',
    },
  });
}
