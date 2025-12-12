// Dashboard.jsx (same as before, just styling will update via components)
import React from "react";
import { motion } from "framer-motion";
import StatsCard from "../components/StatsCard";
import URLTable from "../components/URLTable";

export default function Dashboard({ getUser }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ marginBottom: 32 }}>
        <StatsCard getUser={getUser} />
      </div>

      <URLTable getUser={getUser} />
    </motion.div>
  );
}
