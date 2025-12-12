import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { shortenURL } from "../api";

export default function ShortenForm({ getUser }) {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [password, setPassword] = useState("");
  const [expiry, setExpiry] = useState("");
  const [advanced, setAdvanced] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const user = getUser;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setResult(null);

    const res = await shortenURL(url, user, customCode, password, expiry);
    setLoading(false);

    if (res.error) return setError(res.error);

    setResult(res.short_url);
    setCopied(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  }

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={300}
          colors={["#ff6b6b", "#4ecdc4", "#ffe66d", "#ff8787", "#95e1d3"]}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: 36,
          background: "#fff5e6",
          border: "6px solid #2d1810",
          borderRadius: 24,
          boxShadow: "12px 12px 0px #2d1810",
          position: "relative",
        }}
      >
        {/* Decorative corner dots */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            width: 24,
            height: 24,
            background: "#ff6b6b",
            border: "4px solid #2d1810",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            width: 20,
            height: 20,
            background: "#4ecdc4",
            border: "4px solid #2d1810",
            borderRadius: "50%",
          }}
        />

        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            textAlign: "center",
            fontSize: 36,
            fontWeight: 900,
            color: "#2d1810",
            marginBottom: 28,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          ✂️ Snip It Short
        </motion.h2>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <motion.input
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileFocus={{ scale: 1.01, y: -2 }}
            placeholder="🔗 Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              padding: "18px 24px",
              fontSize: 17,
              fontWeight: 600,
              background: "white",
              border: "4px solid #2d1810",
              borderRadius: 14,
              color: "#2d1810",
              outline: "none",
              boxShadow: "4px 4px 0px #2d1810",
            }}
          />

          <motion.input
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileFocus={{ scale: 1.01, y: -2 }}
            placeholder="✨ Custom code (optional)"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            style={{
              padding: "18px 24px",
              fontSize: 17,
              fontWeight: 600,
              background: "white",
              border: "4px solid #2d1810",
              borderRadius: 14,
              color: "#2d1810",
              outline: "none",
              boxShadow: "4px 4px 0px #2d1810",
            }}
          />

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                style={{
                  padding: "14px 20px",
                  background: "#ff8787",
                  border: "4px solid #2d1810",
                  borderRadius: 12,
                  color: "#2d1810",
                  fontWeight: 700,
                  textAlign: "center",
                  boxShadow: "4px 4px 0px #2d1810",
                }}
              >
                ⚠️ {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -4, boxShadow: "8px 8px 0px #2d1810" }}
            whileTap={{ y: 0, boxShadow: "2px 2px 0px #2d1810" }}
            disabled={loading}
            type="submit"
            style={{
              padding: "18px",
              fontSize: 20,
              fontWeight: 900,
              background: loading ? "#95e1d3" : "#4ecdc4",
              border: "5px solid #2d1810",
              borderRadius: 14,
              color: "#2d1810",
              cursor: loading ? "wait" : "pointer",
              textTransform: "uppercase",
              letterSpacing: 1,
              boxShadow: "6px 6px 0px #2d1810",
              transition: "all 0.2s",
              marginTop: 8,
            }}
          >
            {loading ? "⏳ Shortening..." : "✂️ Shorten Link"}
          </motion.button>
        </form>

        <motion.div
          onClick={() => setAdvanced(!advanced)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: 24,
            padding: "12px 20px",
            textAlign: "center",
            background: "#ffe66d",
            border: "4px solid #2d1810",
            borderRadius: 12,
            fontWeight: 800,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "4px 4px 0px #2d1810",
            textTransform: "uppercase",
          }}
        >
          {advanced ? "▲ Hide Advanced" : "▼ Show Advanced"}
        </motion.div>

        <AnimatePresence>
          {advanced && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{
                marginTop: 16,
                padding: 20,
                background: "#ffebcd",
                border: "4px solid #2d1810",
                borderRadius: 16,
                display: "grid",
                gap: 12,
              }}
            >
              <motion.input
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                whileFocus={{ scale: 1.01 }}
                placeholder="🔒 Password (optional)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                style={{
                  padding: "16px 20px",
                  fontSize: 16,
                  fontWeight: 600,
                  background: "white",
                  border: "4px solid #2d1810",
                  borderRadius: 12,
                  color: "#2d1810",
                  outline: "none",
                }}
              />

              <motion.input
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                whileFocus={{ scale: 1.01 }}
                placeholder="⏰ Expiry in minutes"
                type="number"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                style={{
                  padding: "16px 20px",
                  fontSize: 16,
                  fontWeight: 600,
                  background: "white",
                  border: "4px solid #2d1810",
                  borderRadius: 12,
                  color: "#2d1810",
                  outline: "none",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              style={{
                marginTop: 24,
                padding: 20,
                background: "#95e1d3",
                border: "5px solid #2d1810",
                borderRadius: 16,
                boxShadow: "6px 6px 0px #2d1810",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <motion.a
                whileHover={{ scale: 1.02 }}
                href={result}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#2d1810",
                  textDecoration: "none",
                  fontSize: 18,
                  fontWeight: 800,
                  wordBreak: "break-all",
                }}
              >
                🎉 {result}
              </motion.a>

              <motion.button
                whileHover={{ y: -2, boxShadow: "4px 4px 0px #2d1810" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                style={{
                  padding: "12px 24px",
                  fontSize: 16,
                  fontWeight: 900,
                  background: copied ? "#ffe66d" : "#ff6b6b",
                  border: "4px solid #2d1810",
                  borderRadius: 10,
                  color: "#2d1810",
                  cursor: "pointer",
                  boxShadow: "3px 3px 0px #2d1810",
                  transition: "all 0.2s",
                  textTransform: "uppercase",
                }}
              >
                {copied ? "✓ Copied!" : "📋 Copy"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
