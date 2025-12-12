import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getStats } from "../api";

export default function StatsCard({ getUser }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const user = getUser;
    getStats(user).then((s) => setStats(s));
  }, []);

  if (!stats) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "#fff5e6",
          border: "5px solid #2d1810",
          borderRadius: 18,
          padding: 24,
          width: 340,
          boxShadow: "8px 8px 0px #2d1810",
        }}
      >
        <div
          style={{
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#2d1810",
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          Loading stats...
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      style={{
        background: "#fff5e6",
        border: "5px solid #2d1810",
        borderRadius: 18,
        padding: 28,
        width: 340,
        boxShadow: "8px 8px 0px #2d1810",
        position: "relative",
      }}
    >
      {/* Decorative corner */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 16,
          height: 16,
          background: "#4ecdc4",
          border: "3px solid #2d1810",
          borderRadius: "50%",
        }}
      />

      <h3
        style={{
          margin: 0,
          fontSize: 24,
          fontWeight: 900,
          color: "#2d1810",
          textTransform: "uppercase",
          marginBottom: 20,
        }}
      >
        📊 Your Stats
      </h3>

      <div style={{ color: "#2d1810" }}>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            padding: "16px 20px",
            background: "#ff6b6b",
            border: "4px solid #2d1810",
            borderRadius: 14,
            marginBottom: 16,
            boxShadow: "4px 4px 0px #2d1810",
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 900, color: "#fff5e6" }}>
            {stats.total_urls ?? 0}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff5e6", textTransform: "uppercase" }}>
            Total Links
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              padding: "14px",
              background: "#ffe66d",
              border: "4px solid #2d1810",
              borderRadius: 12,
              boxShadow: "3px 3px 0px #2d1810",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 22 }}>
              {(stats.avg_url_length ?? 0).toFixed(0)}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>
              Avg Length
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              padding: "14px",
              background: "#95e1d3",
              border: "4px solid #2d1810",
              borderRadius: 12,
              boxShadow: "3px 3px 0px #2d1810",
            }}
          >
            <div
              style={{
                fontWeight: 900,
                fontSize: 16,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {stats.most_common_domain ?? "—"}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>
              Top Domain
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
