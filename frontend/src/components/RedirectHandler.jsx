import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = "http://localhost:5000";

export default function RedirectHandler() {
  const { code } = useParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [needsPassword, setNeedsPassword] = useState(false);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    // First try GET access
    fetch(`${API}/${code}`)
      .then(async (res) => {
        const text = await res.text();

        try {
          const json = JSON.parse(text);

          if (json.error === "password required") {
            setNeedsPassword(true);
            return;
          }

          if (json.error === "URL expired") {
            setExpired(true);
            return;
          }

          setError("Unknown error");
        } catch {
          // If not JSON → backend redirected → browser handled it.
          window.location.href = `${API}/${code}`;
        }
      });
  }, [code]);

  async function unlock() {
    setError("");

    const res = await fetch(`${API}/${code}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
      return;
    }

    // Backend allowed → redirect
    window.location.href = `${API}/${code}`;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a] text-white">

      {/* EXPIRED */}
      {expired && (
        <div className="bg-red-500/20 border border-red-400 p-6 rounded-xl backdrop-blur-xl">
          <h2 className="text-xl font-bold text-red-300">This link has expired ❌</h2>
        </div>
      )}

      {/* PASSWORD REQUIRED */}
      {needsPassword && (
        <div className="bg-white/10 p-8 rounded-2xl shadow-xl border border-blue-300/30 backdrop-blur-xl w-[340px]">

          <h2 className="text-xl font-bold text-blue-200 mb-4">🔒 Enter Password</h2>

          <input
            type="password"
            className="w-full p-3 rounded-xl bg-white/20 text-blue-100 border border-blue-400/50 focus:outline-none mb-3"
            placeholder="Enter password…"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="text-red-300 text-sm mb-3">{error}</div>}

          <button
            onClick={unlock}
            className="w-full py-3 rounded-xl bg-emerald-400/80 text-slate-900 font-semibold hover:bg-emerald-300 transition"
          >
            Unlock Link
          </button>
        </div>
      )}

      {/* LOADING STATE */}
      {!needsPassword && !expired && (
        <div className="text-blue-200 text-lg animate-pulse">Checking link…</div>
      )}
    </div>
  );
}
