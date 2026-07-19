import { useEffect, useState } from "react";
import api from "../api/api";

function ComplaintHistory({ id }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!id) return;

    api
      .get(`/complaints/${id}/history`)
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div style={{ fontSize: "12px" }}>
      <h4>History</h4>

      {history.length === 0 ? (
        <p>No History</p>
      ) : (
        history.map((item) => (
          <div key={item.id}>
            <strong>{item.status}</strong>
            <br />
            {new Date(item.updated_at).toLocaleString()}
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default ComplaintHistory;