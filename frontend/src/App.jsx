import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

export default function App() {
const [user, setUser] = useState(() => {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
});

  const [userText,setUserText]=useState("")
  // GLOBAL inline styles
  const appStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #071124 50%, #00121a 100%)",
    color: "#e6eef8",
    fontFamily: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
    padding: "0px 4px"
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


  const getUser=()=>{
    return user;
  }
  return (
    <div style={appStyle}>
      {!user && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center">

    {/* BACKDROP */}
    <div className="absolute inset-0 bg-[rgba(255,255,255,0.04)]  backdrop-blur-xl" />

    {/* CARD */}
    <div
      className="
        relative z-[1000]
        w-[350px]
        p-8
        rounded-3xl
        bg-white/10
        shadow-[0_0_25px_rgba(0,150,255,0.35)]
        border border-blue-300/40
        backdrop-blur-2xl
        flex flex-col items-center gap-6
        animate-[fadeInScale_0.5s_ease-out]
      "
    >

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-blue-200 tracking-wide drop-shadow-lg">
        Enter Your Details
      </h2>

      {/* INPUT */}
      <input
      value={userText}
        onChange={(e)=>{setUserText(e.target.value)}}
        className="
          w-full
          p-3
          rounded-xl
          bg-white/20
          text-blue-100
          placeholder-blue-200/60
          border border-blue-400/50
          shadow-inner
          focus:outline-none
          focus:ring-2 focus:ring-emerald-400/70
          backdrop-blur-lg
        "
        type="text"
        placeholder="Your username…"
      />

      {/* BUTTON */}
      <button
        className="
          w-full
          py-3
          rounded-xl
          bg-emerald-400/90
          text-slate-900
          font-semibold
          shadow-[0_0_15px_rgba(52,211,153,0.55)]
          hover:bg-emerald-300
          hover:shadow-[0_0_25px_rgba(52,211,153,0.8)]
          transition-all duration-200
        "
          onClick={()=>{setUser(userText);localStorage.setItem("user",JSON.stringify(userText))}}
      >
        Submit
      </button>
    </div>
  </div>
)}


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

          <div style={{ display: "flex", gap: 8,marginTop:"15px" }}>
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
            <Route path="/" element={<Home  getUser={getUser()}/>} />
            <Route path="/dashboard" element={<Dashboard  getUser={getUser()}/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
