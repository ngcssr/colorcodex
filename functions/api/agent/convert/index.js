import { convertHex, isValidHex } from './_data.js';

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const hex = url.searchParams.get('hex') || '';

  if (!hex) {
    return new Response(JSON.stringify({
      error: 'invalid_input',
      message: 'hex parameter is required.',
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  if (!isValidHex(hex)) {
    return new Response(JSON.stringify({
      error: 'invalid_input',
      message: 'hex parameter must be 3 or 6 hex digits.',
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  const result = convertHex(hex);
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
