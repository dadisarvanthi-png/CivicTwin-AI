import { useState } from "react";
import api from "../api/api";

import {
  successToast,
  errorToast,
  infoToast,
  loadingToast,
  updateToast,
} from "../utils/toast";

function ComplaintPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    category: "",
    description: "",
    priority: "",
    status: "Pending",
    latitude: "",
    longitude: "",
  });

  const [image, setImage] = useState(null);
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const getCurrentLocation = () => {

  if (!navigator.geolocation) {
    errorToast("Geolocation is not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(

    (position) => {

      setFormData((prev) => ({
        ...prev,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }));

      infoToast("📍 Current Location Captured");

    },

    () => {

      errorToast("Unable to fetch current location.");

    }

  );

};
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Form Submitted");

  try {

    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("location", formData.location);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("priority", formData.priority);
    data.append("status", "Pending");


    if(image){
      data.append("image", image);
    }


    await api.post("/complaints", data);


    // SUCCESS MESSAGE
    successToast("🎉 Complaint Submitted Successfully");


    // clear form
    setFormData({
      name:"",
      email:"",
      location:"",
      category:"",
      description:"",
      priority:"",
      status:"Pending",
      latitude:"",
      longitude:""
    });


    setImage(null);


  } catch(error){

    console.log(error);

    errorToast(
      error.response?.data?.detail ||
      "❌ Complaint Submission Failed"
    );

  }

};

  return (
    <div className="page">
      <h1>🏛️ CivicTwin AI - Citizen Complaint Portal</h1>

      <form
        className="complaint-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="👤 Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="📧 Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="📍 Location / Address"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <button
          type="button"
          onClick={getCurrentLocation}
        >
          📍 Use Current Location
        </button>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">📂 Select Category</option>
          <option value="Road Damage">🛣️ Road Damage</option>
          <option value="Garbage">🗑️ Garbage Collection</option>
          <option value="Water Supply">💧 Water Supply</option>
          <option value="Street Light">💡 Street Light</option>
          <option value="Drainage">🚰 Drainage Issue</option>
          <option value="Traffic">🚦 Traffic Problem</option>
          <option value="Electricity">⚡ Electricity</option>
          <option value="Public Transport">🚌 Public Transport</option>
          <option value="Park Maintenance">🌳 Park Maintenance</option>
          <option value="Noise Pollution">🔊 Noise Pollution</option>
          <option value="Air Pollution">🏭 Air Pollution</option>
          <option value="Water Pollution">🌊 Water Pollution</option>
          <option value="Illegal Construction">🏗️ Illegal Construction</option>
          <option value="Animal Complaint">🐕 Animal Complaint</option>
          <option value="Healthcare">🏥 Healthcare</option>
          <option value="School Issue">🏫 School Issue</option>
          <option value="Other">📌 Other</option>
        </select>

        <textarea
          rows="5"
          name="description"
          placeholder="📝 Describe your complaint..."
          value={formData.description}
          onChange={handleChange}
          required
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          required
        >
          <option value="">🚨 Select Priority</option>
          <option value="Low">🟢 Low</option>
          <option value="Medium">🟡 Medium</option>
          <option value="High">🔴 High</option>
        </select>

        <label
          style={{
            marginTop: "15px",
            marginBottom: "8px",
            display: "block",
            fontWeight: "bold",
          }}
        >
          📷 Upload Complaint Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

      <button type="submit">
 🚀 Submit Complaint
</button>
      </form>
    </div>
  );
}

export default ComplaintPage;