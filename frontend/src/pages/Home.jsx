// Home.jsx
import React from "react";
import { motion } from "framer-motion";
import ShortenForm from "../components/ShortenForm";

export default function Home({ getUser }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          style={{
            margin: 0,
            fontSize: 48,
            fontWeight: 900,
            color: "#2d1810",
            textTransform: "uppercase",
            letterSpacing: -1,
          }}
        >
          Link Magic ✨
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            marginTop: 12,
            color: "#2d1810",
            fontSize: 18,
            fontWeight: 600,
            opacity: 0.8,
          }}
        >
          Shorten URLs with style. No boring links allowed.
        </motion.p>
      </div>

      <ShortenForm getUser={getUser} />
    </motion.div>
  );
}
