const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000/api";

/**
 * PUBLIC_INTERFACE
 * General API wrapper (CRUD)
 * All methods return Promises.
 */
const api = {
  // PUBLIC_INTERFACE
  async getRecords() {
    const res = await fetch(`${API_BASE_URL}/records`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  },
  // PUBLIC_INTERFACE
  async createRecord(data) {
    const res = await fetch(`${API_BASE_URL}/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to create record");
    return res.json();
  },
  // PUBLIC_INTERFACE
  async updateRecord(id, data) {
    const res = await fetch(`${API_BASE_URL}/records/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update record");
    return res.json();
  },
  // PUBLIC_INTERFACE
  async deleteRecord(id) {
    const res = await fetch(`${API_BASE_URL}/records/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Failed to delete record");
    return true;
  }
};

export default api;
