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
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Dashboard</h1>

      {/* Department Filter */}
      <div style={styles.filterContainer}>
        <label htmlFor="department-filter" style={styles.label}>Filter by Department:</label>
        <select
          id="department-filter"
          value={selectedDepartment}
          onChange={(e) => filterByDepartment(e.target.value)}
          style={styles.select}
        >
          <option value="All">All</option>
          <option value="PWD">PWD</option>
          <option value="Electricity Department">Electricity Department</option>
          <option value="Water Resources Department">Water Resources Department</option>
          <option value="Local Municipality">Local Municipality</option>
        </select>
      </div>

      {/* Complaints List */}
      <div style={styles.complaintsList}>
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint) => (
            <div key={complaint.id} style={styles.complaintCard}>
              <h3 style={styles.complaintTitle}>{complaint.type}</h3>
              <p><strong>Location:</strong> {complaint.location}</p>
              <p><strong>Date:</strong> {complaint.reg_date}</p>
              <p><strong>Department:</strong> {complaint.department}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
              {complaint.imageURL && <img src={complaint.imageURL} alt="Complaint" style={styles.image} />}

              {/* Edit Status */}
              {editStatus.id === complaint.id ? (
                <div style={styles.editStatusContainer}>
                  <input
                    type="text"
                    value={editStatus.status}
                    onChange={(e) => setEditStatus({ ...editStatus, status: e.target.value })}
                    style={styles.input}
                  />
                  <div style={styles.buttonContainer}>
                    <button onClick={() => updateStatus(complaint.id)} style={styles.saveButton}>Save</button>
                    <button onClick={() => setEditStatus({ id: null, status: "" })} style={styles.cancelButton}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div style={styles.buttonContainer}>
                  <button onClick={() => setEditStatus({ id: complaint.id, status: complaint.status })} style={styles.editButton}>
                    Edit Status
                  </button>
                </div>
              )}

              {/* Delete Complaint */}
              <div style={styles.buttonContainer}>
                <button onClick={() => deleteComplaint(complaint.id)} style={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noComplaints}>No complaints available.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    fontSize: '36px',
    marginBottom: '20px',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    marginRight: '10px',
    color: '#555',
  },
  select: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    width: '250px',
  },
  complaintsList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  complaintCard: {
    backgroundColor: '#fff',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '10px',
    width: '80%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  },
  complaintTitle: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '10px',
  },
  image: {
    width: '100px',
    height: 'auto',
    marginTop: '10px',
    borderRadius: '8px',
  },
  editStatusContainer: {
    marginTop: '10px',
    display: 'flex',
    gap: '5px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    flex: '1',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  editButton: {
    backgroundColor: '#ff9800',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '5px',
    transition: 'background-color 0.3s',
  },
  noComplaints: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
  },
};

export default AdminPage;
