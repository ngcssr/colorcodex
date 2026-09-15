function unavailable() {
  return new Response(JSON.stringify({
    status: 'under_construction',
    available: false,
    error: 'temporarily_unavailable',
    error_description: 'Coming soon. No token issuance is available. Use the public lookup service at /api/agent/.',
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
