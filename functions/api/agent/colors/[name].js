import { lookupColor } from './_data.js';

export async function onRequestGet({ params, env }) {
  const name = decodeURIComponent(params.name || '');
  const result = lookupColor(name);
  if (!result) {
    return new Response(JSON.stringify({
      error: 'not_found',
      message: `Color '${name}' is not a recognized named color.`,
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
