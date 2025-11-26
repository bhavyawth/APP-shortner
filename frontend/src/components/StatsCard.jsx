import { useEffect, useState } from "react";
import { getStats } from "../api";

export default function StatsCard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats("test_user_123").then(setStats);
  }, []);

  if (!stats) return null;

  return (
    <div
      style={{
        background: "#f3f4f6",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}
    >
      <h2>Your Stats</h2>
      <p>Total URLs: <b>{stats.total_urls}</b></p>
      <p>Average URL Length: <b>{stats.avg_url_length.toFixed(2)}</b></p>
      <p>Most Common Domain: <b>{stats.most_common_domain}</b></p>
    </div>
  );
}
