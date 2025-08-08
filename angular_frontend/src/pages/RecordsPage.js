import React, { useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import RecordForm from "../components/RecordForm";
import ConfirmModal from "../components/ConfirmModal";
import api from "../api";

// You can customize these fields as needed for your schema
const FIELDS = [
  { key: "name", label: "Name", required: true, type: "text" },
  { key: "email", label: "Email", required: true, type: "email" },
  { key: "role", label: "Role", required: true, type: "text" }
];

const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" }
];

/**
 * PUBLIC_INTERFACE
 * Main CRUD logic - Lists, adds, edits, deletes records.
 */
function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDelConfirm, setShowDelConfirm] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getRecords();
      setRecords(data);
    } catch (e) {
      setError("Error loading data");
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (record) => {
    setEditing(record);
    setShowForm(true);
  };

  const handleDelete = (record) => {
    setDeleting(record);
    setShowDelConfirm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editing) {
        await api.updateRecord(editing._id, formData);
      } else {
        await api.createRecord(formData);
      }
      setShowForm(false);
      fetchData();
    } catch (e) {
      alert("Operation failed.");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.deleteRecord(deleting._id);
      setShowDelConfirm(false);
      fetchData();
    } catch (e) {
      alert("Delete failed.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Records</h2>
        <button className="btn btn-primary" onClick={handleAdd}>+ Add Record</button>
      </div>
      {error && <div className="error-msg">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={COLUMNS} data={records} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      {showForm && (
        <div className="modal-backdrop">
          <div className="modal modal-form">
            <RecordForm
              fields={FIELDS}
              initialValues={editing}
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
      <ConfirmModal
        open={showDelConfirm}
        message={deleting ? `Are you sure you want to delete "${deleting.name}"?` : ""}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDelConfirm(false)}
      />
    </div>
  );
}

export default RecordsPage;
