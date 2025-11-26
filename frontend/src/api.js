const API_BASE = "http://localhost:5000";

export async function shortenURL(url, user_token, custom_code = "") {
  const res = await fetch(`${API_BASE}/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, user_token, custom_code })
  });
  return res.json();
}

export async function getStats(user_token) {
  const res = await fetch(`${API_BASE}/stats`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_token })
  });
  return res.json();
}

export async function getMyURLs(user_token) {
  const res = await fetch(`${API_BASE}/my-urls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_token })
  });
  return res.json();
}

export async function getQRCode(code) {
  const res = await fetch(`${API_BASE}/qr`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code })
  });
  return res.json();
}
