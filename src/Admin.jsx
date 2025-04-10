import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from '@firebase/firestore';

const AdminPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [editStatus, setEditStatus] = useState({ id: null, status: "" });

  const fetchComplaints = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "complaints"));
      const complaintList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComplaints(complaintList);
      setFilteredComplaints(complaintList); // Initialize with all complaints
    } catch (e) {
      console.error("Failed to fetch complaints:", e);
    }
  };

  const filterByDepartment = (department) => {
    setSelectedDepartment(department);
    if (department === "All") {
      setFilteredComplaints(complaints);
    } else {
      setFilteredComplaints(complaints.filter((item) => item.department === department));
    }
  };

  const updateStatus = async (id) => {
    try {
      const complaintRef = doc(db, "complaints", id);
      await updateDoc(complaintRef, { status: editStatus.status });
      setEditStatus({ id: null, status: "" });
      fetchComplaints(); // Refresh complaints list
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const deleteComplaint = async (id) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        const complaintRef = doc(db, "complaints", id);
        await deleteDoc(complaintRef);
        fetchComplaints(); // Refresh complaints list
      } catch (e) {
        console.error("Failed to delete complaint:", e);
      }
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Dropdown to select department */}
      <label htmlFor="department-filter">Filter by Department:</label>
      <select
        id="department-filter"
        value={selectedDepartment}
        onChange={(e) => filterByDepartment(e.target.value)}
      >
        <option value="All">All</option>
        <option value="PWD">PWD</option>
        <option value="Electricity Department">Electricity Department</option>
        <option value="Water Resources Department">Water Resources Department</option>
        <option value="Local Municipality">Local Municipality</option>
      </select>

      {/* Complaints list */}
      <div>
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint) => (
            <div key={complaint.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              <h3>{complaint.type}</h3>
              <p><strong>Location:</strong> {complaint.location}</p>
              <p><strong>Date:</strong> {complaint.reg_date}</p>
              <p><strong>Department:</strong> {complaint.department}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
              {complaint.imageURL && <img src={complaint.imageURL} alt="Complaint" style={{ width: "100px", height: "auto" }} />}
              
              {/* Edit Status */}
              {editStatus.id === complaint.id ? (
                <div>
                  <input
                    type="text"
                    value={editStatus.status}
                    onChange={(e) => setEditStatus({ ...editStatus, status: e.target.value })}
                  />
                  <button onClick={() => updateStatus(complaint.id)}>Save</button>
                  <button onClick={() => setEditStatus({ id: null, status: "" })}>Cancel</button>
                </div>
              ) : (
                <button onClick={() => setEditStatus({ id: complaint.id, status: complaint.status })}>
                  Edit Status
                </button>
              )}

              {/* Delete Complaint */}
              <button onClick={() => deleteComplaint(complaint.id)} style={{ color: "red" }}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No complaints available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;