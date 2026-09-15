function unavailable() {
  return new Response(JSON.stringify({
    status: 'under_construction',
    available: false,
    error: 'temporarily_unavailable',
    error_description: 'Coming soon. This is a planned future resource endpoint, not the active resource. The active resource is https://www.colorcodetools.com (the site origin).',
  }), {
    status: 503,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function onRequestGet() { return unavailable(); }
export async function onRequestPost() { return unavailable(); }
