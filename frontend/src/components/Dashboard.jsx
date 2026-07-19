import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  if (!data) {
    return (
      <div className="page">
        <h1>Loading Dashboard...</h1>
      </div>
    );
  }

  return (
    <section className="dashboard">
      <h2>📊 Smart City Dashboard</h2>

      <div className="cards">

        <div className="card">
          <h3>👨‍👩‍👧‍👦 Population</h3>
          <p>{data.population}</p>
        </div>

        <div className="card">
          <h3>🏥 Hospitals</h3>
          <p>{data.hospitals}</p>
        </div>

        <div className="card">
          <h3>🏫 Schools</h3>
          <p>{data.schools}</p>
        </div>

        <div className="card">
          <h3>🌳 Parks</h3>
          <p>{data.parks}</p>
        </div>

        <div className="card">
          <h3>🚦 Traffic Alerts</h3>
          <p>{data.traffic_alerts}</p>
        </div>

      </div>

      <div className="ai-box">
        <h3>🤖 AI Recommendations</h3>

        <ul>
          <li>Increase waste collection in Zone 4.</li>
          <li>Repair damaged roads in Sector 8.</li>
          <li>Monitor high traffic during peak hours.</li>
          <li>Improve drainage in flood-prone areas.</li>
        </ul>
      </div>
    </section>
  );
}

export default Dashboard;