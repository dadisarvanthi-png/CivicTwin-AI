function ComplaintModal({ complaint, onClose }) {
  if (!complaint) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <h2>Complaint Details</h2>

        {complaint.image && (
          <img
            src={`http://127.0.0.1:8000/uploads/${complaint.image}`}
            alt="Complaint"
            className="modal-image"
          />
        )}

        <div className="modal-content">

          <p><strong>ID:</strong> {complaint.id}</p>

          <p><strong>Name:</strong> {complaint.name}</p>

          <p><strong>Location:</strong> {complaint.location}</p>

          <p><strong>Category:</strong> {complaint.category}</p>

          <p><strong>Description:</strong> {complaint.description}</p>

          <p><strong>Priority:</strong> {complaint.priority}</p>

          <p><strong>Status:</strong> {complaint.status}</p>

          <p>
            <strong>Latitude:</strong>{" "}
            {complaint.latitude || "-"}
          </p>

          <p>
            <strong>Longitude:</strong>{" "}
            {complaint.longitude || "-"}
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {complaint.created_at
              ? new Date(complaint.created_at).toLocaleString()
              : "-"}
          </p>

        </div>

      </div>
    </div>
  );
}

export default ComplaintModal;