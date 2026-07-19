import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>🏙 CivicTwin AI</h2>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/map">Map</Link>
        </li>

        <li>
          <Link to="/analytics">Analytics</Link>
        </li>

        <li>
          <Link to="/complaints">Complaints</Link>
        </li>

        <li>
          <Link to="/ai">AI Assistant</Link>
        </li>

        <li>
          <Link to="/admin">Admin</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      <div className="navbar-actions">

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <button
          className="profile-btn"
        >
          👤 Admin
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;