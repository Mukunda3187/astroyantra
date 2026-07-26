const API_BASE = import.meta.env.VITE_API_BASE !== undefined ? import.meta.env.VITE_API_BASE : 'http://localhost:4000';

async function postJson(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export function getChart(payload) {
  return postJson('/api/chart', payload);
}

/**
 * Streams a chart reading via Server-Sent Events so the UI can render text as it
 * arrives instead of waiting for the whole response.
 *
 * @param {object} payload - birth details
 * @param {object} handlers
 * @param {(profile: object) => void} handlers.onProfile - fired once, as soon as chart math is ready
 * @param {(deltaText: string) => void} handlers.onChunk - fired repeatedly with new text
 * @param {(reading: object) => void} handlers.onDone - fired once, with the final parsed reading
 * @param {(message: string) => void} handlers.onError
 */
export async function streamChart(payload, { onProfile, onChunk, onDone, onError }) {
  const res = await fetch(`${API_BASE}/api/chart/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok || !res.body) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      message = data.error || message;
    } catch (_) { /* body wasn't JSON */ }
    onError?.(message);
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE events are separated by a blank line
    const events = buffer.split('\n\n');
    buffer = events.pop(); // keep any incomplete trailing event for the next round

    for (const raw of events) {
      const lines = raw.split('\n');
      let eventName = 'message';
      let dataLine = '';
      for (const line of lines) {
        if (line.startsWith('event:')) eventName = line.slice(6).trim();
        if (line.startsWith('data:')) dataLine = line.slice(5).trim();
      }
      if (!dataLine) continue;
      let data;
      try {
        data = JSON.parse(dataLine);
      } catch (_) {
        continue;
      }
      if (eventName === 'profile') onProfile?.(data.profile);
      else if (eventName === 'chunk') onChunk?.(data.text);
      else if (eventName === 'done') onDone?.(data.reading);
      else if (eventName === 'error') onError?.(data.message);
    }
  }
}

export function getCompatibility(personA, personB) {
  return postJson('/api/compatibility', { personA, personB });
}

/**
 * Free geocoding via OpenStreetMap Nominatim (no API key required).
 * Please be considerate of Nominatim's usage policy for production traffic.
 */
export async function geocodePlace(query) {
  if (!query || query.trim().length < 2) return [];
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((d) => ({
    label: d.display_name,
    latitude: Number(d.lat),
    longitude: Number(d.lon),
  }));
}
