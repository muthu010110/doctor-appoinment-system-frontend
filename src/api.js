// src/api.js
const API_BASE = process.env.REACT_APP_API_BASE;

if (!API_BASE) {
  // See value in browser console after deploy
  // eslint-disable-next-line no-console
  console.warn("REACT_APP_API_BASE is missing");
}

export async function getJSON(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
  return data;
}

export async function postJSON(path, body, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    credentials: "include",
    body: JSON.stringify(body),
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
  return data;
}
