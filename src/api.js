// src/http.js
const API_BASE = process.env.REACT_APP_API_BASE;

export async function request(path, { method = "GET", body, headers = {} } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });

  const ct = res.headers.get("content-type") || "";
  let data = null;

  if (res.status !== 204) {
    if (ct.includes("application/json")) {
      data = await res.json().catch(() => null); // don't explode on bad JSON
    } else {
      data = await res.text().catch(() => "");
    }
  }

  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) ||
      `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}
