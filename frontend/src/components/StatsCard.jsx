import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getStats } from "../api";

export default function StatsCard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats("test_user_123").then((s) => setStats(s));
  }, []);

  const card = {
    background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
    borderRadius: 14,
    padding: 18,
    width: 320,
    border: "1px solid rgba(255,255,255,0.04)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 8px 30px rgba(2,6,23,0.6)"
  };

  if (!stats) {
    return (
      <motion.div style={card} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "center", color: "#bfe9ff" }}>
          Loading...
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={card}
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <h3 style={{ margin: 0, fontSize: 18 }}>Your Stats</h3>
      <div style={{ marginTop: 10, color: "#dff7ff" }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{stats.total_urls ?? 0}</div>
        <div style={{ fontSize: 13, opacity: 0.9 }}>Total URLs</div>

        <div style={{ height: 10 }} />

        <div style={{ display: "flex", gap: 14 }}>
          <div>
            <div style={{ fontWeight: 700 }}>{(stats.avg_url_length ?? 0).toFixed(1)}</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>Avg length</div>
          </div>

          <div>
            <div style={{ fontWeight: 700 }}>{stats.most_common_domain ?? "—"}</div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>Top domain</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
