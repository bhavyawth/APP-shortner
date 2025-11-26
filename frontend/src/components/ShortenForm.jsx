import React, { useState } from "react";
import { motion } from "framer-motion";
import { shortenURL } from "../api";

export default function ShortenForm() {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const cardStyle = {
    background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
    borderRadius: 16,
    padding: 22,
    boxShadow: "0 10px 30px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(10px)",
    maxWidth: 760,
    margin: "0 auto"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "transparent",
    color: "#eaf6ff",
    outline: "none",
    fontSize: 15
  };

  const btnPrimary = {
    marginTop: 12,
    width: "100%",
    padding: "12px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    letterSpacing: 0.3,
    background: "linear-gradient(90deg,#06b6d4,#34d399)",
    boxShadow: "0 6px 18px rgba(34,211,153,0.12), 0 2px 6px rgba(6,182,212,0.08)",
    color: "#04202c"
  };

  const smallMuted = { fontSize: 13, color: "#9fdfff", opacity: 0.85, marginTop: 8 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await shortenURL(url, "test_user_123", customCode);
      if (res.error) {
        setError(res.error);
      } else {
        setResult(res.short_url);
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.995 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={cardStyle}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gap: 10 }}>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your long URL (e.g. google.com)"
            style={inputStyle}
          />

          <input
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            placeholder="Optional: custom short code (ggl)"
            style={{ ...inputStyle, opacity: 0.95 }}
          />

          {error && (
            <div style={{ color: "#ffb4b4", fontSize: 13 }}>{error}</div>
          )}

          <motion.button
            type="submit"
            style={btnPrimary}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.995 }}
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten URL — neon!"}
          </motion.button>

          <div style={smallMuted}>
            Pro tip: If you omit protocol the app will add <code>https://</code>.
          </div>
        </div>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            marginTop: 18,
            padding: 14,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 12,
            justifyContent: "space-between",
            border: "1px solid rgba(255,255,255,0.04)",
            background: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))"
          }}
        >
          <a href={result} target="_blank" rel="noreferrer" style={{ color: "#e6faff", textDecoration: "none" }}>
            {result}
          </a>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <motion.button
              onClick={() => {
                navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 1400);
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: copied ? "#10b981" : "linear-gradient(135deg, #00c6ff, #0072ff)",
                color: "#051523",
                fontWeight: 700
              }}
            >
              {copied ? "Copied ✓" : "Copy"}
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
