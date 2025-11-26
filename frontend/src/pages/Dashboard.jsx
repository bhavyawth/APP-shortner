import StatsCard from "../components/StatsCard";
import URLTable from "../components/URLTable";

export default function Dashboard() {
  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h1>Dashboard 📊</h1>

      <StatsCard />
      <URLTable />
    </div>
  );
}
