import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RedirectHandler from "./components/RedirectHandler";

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [userText, setUserText] = useState("");

  // Warm sunset background with soft grain texture
  const appStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff5e6 0%, #ffe4cc 30%, #ffd4b3 60%, #ffb88c 100%)",
    color: "#2d1810",
    fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
    padding: "20px",
    position: "relative",
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 1200,
    margin: "0 auto 40px",
    padding: "20px 28px",
    background: "#ff6b6b",
    border: "5px solid #2d1810",
    borderRadius: 16,
    boxShadow: "8px 8px 0px #2d1810",
  };

  const logoStyle = {
    fontWeight: 900,
    fontSize: 28,
    letterSpacing: -1,
    color: "#fff5e6",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: 12,
    textShadow: "3px 3px 0px #2d1810",
  };

  const linkStyle = {
    color: "#2d1810",
    textDecoration: "none",
    padding: "12px 24px",
    borderRadius: 12,
    border: "4px solid #2d1810",
    background: "#ffe66d",
    fontWeight: 800,
    fontSize: 16,
    boxShadow: "4px 4px 0px #2d1810",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const getUser = () => {
    return user;
  };

  return (
    <div style={appStyle}>
      {/* Floating decorative shapes */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "5%",
          width: 120,
          height: 120,
          background: "#4ecdc4",
          border: "5px solid #2d1810",
          borderRadius: "50%",
          opacity: 0.3,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "15%",
          right: "8%",
          width: 160,
          height: 160,
          background: "#ff6b6b",
          border: "5px solid #2d1810",
          transform: "rotate(45deg)",
          opacity: 0.25,
          zIndex: 0,
        }}
      />

      {!user && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 245, 230, 0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{
              width: 400,
              padding: 40,
              background: "#4ecdc4",
              border: "6px solid #2d1810",
              borderRadius: 20,
              boxShadow: "12px 12px 0px #2d1810",
            }}
          >
            <h2
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: "#fff5e6",
                textAlign: "center",
                marginBottom: 24,
                textShadow: "4px 4px 0px #2d1810",
              }}
            >
              Welcome! 🌅
            </h2>

            <input
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 20px",
                fontSize: 18,
                fontWeight: 700,
                background: "#fff5e6",
                border: "4px solid #2d1810",
                borderRadius: 12,
                color: "#2d1810",
                outline: "none",
                marginBottom: 20,
              }}
              type="text"
              placeholder="Enter username..."
            />

            <motion.button
              whileHover={{ y: -2, boxShadow: "6px 6px 0px #2d1810" }}
              whileTap={{ y: 0, boxShadow: "2px 2px 0px #2d1810" }}
              style={{
                width: "100%",
                padding: "16px",
                fontSize: 20,
                fontWeight: 900,
                background: "#ffe66d",
                border: "4px solid #2d1810",
                borderRadius: 12,
                color: "#2d1810",
                cursor: "pointer",
                boxShadow: "4px 4px 0px #2d1810",
                transition: "all 0.2s",
              }}
              onClick={() => {
                setUser(userText);
                localStorage.setItem("user", JSON.stringify(userText));
              }}
            >
              Let's Go! 🚀
            </motion.button>
          </motion.div>
        </div>
      )}

      <BrowserRouter>
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          style={navStyle}
        >
          <a href="/" style={logoStyle}>
            <span
              style={{
                width: 16,
                height: 16,
                background: "#ffe66d",
                border: "3px solid #2d1810",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
            ShortCut
          </a>

          <div style={{ display: "flex", gap: 12 }}>
            <motion.div
              whileHover={{ y: -2, boxShadow: "6px 6px 0px #2d1810" }}
              whileTap={{ y: 0, boxShadow: "2px 2px 0px #2d1810" }}
            >
              <Link to="/" style={linkStyle}>
                Home
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -2, boxShadow: "6px 6px 0px #2d1810" }}
              whileTap={{ y: 0, boxShadow: "2px 2px 0px #2d1810" }}
            >
              <Link to="/dashboard" style={linkStyle}>
                Dashboard
              </Link>
            </motion.div>
          </div>
        </motion.nav>

        <main style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home getUser={getUser()} />} />
            <Route path="/dashboard" element={<Dashboard getUser={getUser()} />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
