import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

function CityMap() {
  return (
    <MapContainer
      center={[17.385, 78.4867]}
      zoom={13}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "12px",
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[17.385, 78.4867]}>
        <Popup>CivicTwin AI Demo Location</Popup>
      </Marker>
    </MapContainer>
  );
}

export default CityMap;