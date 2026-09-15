import { listColors } from './_data.js';

export async function onRequestGet({ env }) {
  const colors = listColors();
  return new Response(JSON.stringify({
    count: colors.length,
    colors,
    source_url: 'https://www.colorcodetools.com/color-names/',
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
