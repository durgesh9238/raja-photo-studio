// Talks to the Express server. In development Vite proxies /api to port 5000.
// For production, set VITE_API_URL (for example https://api.yourdomain.com).
const BASE = import.meta.env.VITE_API_URL || '';

export async function postJSON(path, body) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('We could not reach the server. Please check your internet and try again.');
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* response had no JSON body */
  }

  if (!res.ok) {
    throw new Error(data?.message || 'Something went wrong. Please try again.');
  }
  return data;
}
