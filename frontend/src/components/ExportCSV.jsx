import { saveAs } from "file-saver";
import api from "../api/api";

function ExportCSV() {
  const exportCSV = async () => {
    try {
      const res = await api.get("/complaints");

      const complaints = res.data;

      let csv =
        "ID,Name,Location,Category,Description,Priority,Status,Latitude,Longitude\n";

      complaints.forEach((item) => {
        csv += `${item.id},"${item.name}","${item.location}","${item.category}","${item.description}","${item.priority}","${item.status}",${item.latitude ?? ""},${item.longitude ?? ""}\n`;
      });

      const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
      });

      saveAs(blob, "CivicTwin_Complaints.csv");
    } catch (error) {
      console.error(error);
      alert("Unable to export CSV.");
    }
  };

  return (
    <button
      onClick={exportCSV}
      style={{
        background: "#16a34a",
        color: "white",
        border: "none",
        padding: "12px 18px",
        borderRadius: "8px",
        cursor: "pointer",
        marginBottom: "20px",
      }}
    >
      📄 Export CSV
    </button>
  );
}

export default ExportCSV;