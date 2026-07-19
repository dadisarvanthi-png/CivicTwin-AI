import { useEffect, useState, useRef } from "react";
import axios from "axios";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Auto-fit only once
function FitMap({ complaints }) {
  const map = useMap();
  const fitted = useRef(false);

  useEffect(() => {
    if (complaints.length === 0 || fitted.current) return;

    const bounds = complaints.map((item) => [
      item.latitude,
      item.longitude,
    ]);

    map.fitBounds(bounds, {
      padding: [50, 50],
    });

    fitted.current = true;
  }, [complaints, map]);

  return null;
}

function MapPage() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/complaints");

      const validComplaints = res.data.filter(
        (item) =>
          item.latitude !== null &&
          item.longitude !== null
      );

      setComplaints(validComplaints);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div style={{ height: "90vh" }}>

      <div
        style={{
          padding: "10px",
          background: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <button
          onClick={fetchComplaints}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🔄 Refresh Complaints
        </button>
      </div>

      <MapContainer
        center={[16.3067, 80.4365]}
        zoom={12}
        style={{
          height: "calc(100% - 60px)",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitMap complaints={complaints} />

        {complaints.map((item) => (
          <Marker
            key={item.id}
            position={[item.latitude, item.longitude]}
          >
            <Popup>
              <h3>{item.category}</h3>

              <p><b>Name:</b> {item.name}</p>

              <p><b>Location:</b> {item.location}</p>

              <p><b>Priority:</b> {item.priority}</p>

              <p><b>Status:</b> {item.status}</p>

              <p>{item.description}</p>

              {item.image && (
                <img
                  src={`http://127.0.0.1:8000/uploads/${item.image}`}
                  alt="Complaint"
                  style={{
                    width: "220px",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapPage;