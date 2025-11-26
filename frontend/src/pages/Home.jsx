import React from "react";
import { motion } from "framer-motion";
import ShortenForm from "../components/ShortenForm";

export default function Home() {
  const headerStyle = {
    textAlign: "center",
    marginBottom: 24
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: 36, letterSpacing: -1 }}>Shorten links — stylishly</h1>
        <p style={{ marginTop: 10, color: "#bfe9ff", opacity: 0.9 }}>
         Aesthetic compression for ugly URLs. Hit shorten, watch magic.
        </p>
      </div>

      <ShortenForm />
    </motion.div>
  );
}
