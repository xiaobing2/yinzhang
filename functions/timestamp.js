export async function onRequest(context) {
  const now = new Date();
  return new Response(JSON.stringify({ iso: now.toISOString() }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
