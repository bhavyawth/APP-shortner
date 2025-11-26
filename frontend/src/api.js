const API_BASE = "http://localhost:5000";

export async function shortenURL(url, user_token) {
  const res = await fetch(`${API_BASE}/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, user_token })
  });
  console.log(res)
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
