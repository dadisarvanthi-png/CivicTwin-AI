import cityData from "../data/cityData";

function Dashboard() {
  return (
    <section className="dashboard">
      <h2>City Dashboard</h2>

      <div className="cards">
        {cityData.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="ai-box">
        <h3>🤖 AI Recommendations</h3>

        <ul>
          <li>🏥 Build a hospital in Zone A</li>
          <li>🗑️ Increase waste collection in Zone C</li>
          <li>🌊 Flood risk detected in Zone B</li>
          <li>🚦 Improve traffic signals at Main Junction</li>
        </ul>
      </div>
    </section>
  );
}

export default Dashboard;