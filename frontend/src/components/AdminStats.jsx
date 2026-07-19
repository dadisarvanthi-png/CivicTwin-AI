import { useEffect, useState } from "react";
import api from "../api/api";

function AdminStats() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    in_progress: 0,
    resolved: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h2>{stats.total}</h2>
        <p>Total Complaints</p>
      </div>

      <div className="stat-card">
        <h2>{stats.pending}</h2>
        <p>Pending</p>
      </div>

      <div className="stat-card">
        <h2>{stats.in_progress}</h2>
        <p>In Progress</p>
      </div>

      <div className="stat-card">
        <h2>{stats.resolved}</h2>
        <p>Resolved</p>
      </div>
    </div>
  );
}

export default AdminStats;