import { useNavigate } from "react-router-dom";

function AdminProfile() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#2563eb",
        color: "white",
        padding: "15px 25px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <div>
        <h3>Admin Dashboard</h3>
        <p>Welcome, Administrator</p>
      </div>

      <button
        onClick={logout}
        style={{
          background: "#ef4444",
          color: "#fff",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminProfile;