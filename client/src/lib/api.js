const API_BASE = import.meta.env.VITE_API_URL || "";

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function post(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function get(path) {
  const res = await fetch(`${API_BASE}${path}`, { headers: { ...authHeaders() } });
  if (!res.ok) throw await res.json();
  return res.json();
}

export default { get, post };
