import React from "react";
import { motion } from "framer-motion";
import StatsCard from "../components/StatsCard";
import URLTable from "../components/URLTable";

export default function Dashboard({getUser}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 20 }}>
        <StatsCard getUser={getUser}/>
        <div style={{ flex: 1 }} />
      </div>

      <URLTable getUser={getUser}/>
    </motion.div>
  );
}
