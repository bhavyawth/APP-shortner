import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

export default function App() {
  // GLOBAL inline styles
  const appStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #071124 50%, #00121a 100%)",
    color: "#e6eef8",
    fontFamily: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
    padding: "28px 20px"
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 1100,
    margin: "0 auto 30px",
    gap: 12
  };

  const logoStyle = {
    fontWeight: 800,
    letterSpacing: 1,
    display: "flex",
    gap: 10,
    alignItems: "center",
    color: "white",
    textDecoration: "none"
  };

  const neonBadge = {
    width: 10,
    height: 10,
    borderRadius: 999,
    background: "radial-gradient(circle at 30% 30%, #34d399, #0ea5e9)",
    boxShadow: "0 0 12px rgba(14,165,233,0.6), 0 0 30px rgba(52,211,153,0.12)"
  };

  const linkStyle = {
    color: "#c7e8ff",
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid rgba(0, 198, 255, 1)",
    backdropFilter: "blur(4px)",
  };

  return (
    <div style={appStyle}>
      <BrowserRouter>
        <nav style={navStyle}>
          <motion.a
            href="/"
            style={logoStyle}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <span style={neonBadge} />
            <span style={{ fontSize: 20 }}>NeonShort</span>
          </motion.a>

          <div style={{ display: "flex", gap: 8 }}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/" style={linkStyle}>Home</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            </motion.div>
          </div>
        </nav>

        <main style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
