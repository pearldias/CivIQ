import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "@firebase/firestore";
import "./Home.css"; // Add this import

const Home = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.3/inject.js";
    script1.async = true;

    script1.onload = () => {
      const script2 = document.createElement("script");
      script2.src =
        "https://files.bpcontent.cloud/2025/04/10/12/20250410123106-I318OB4E.js";
      script2.async = true;
      document.body.appendChild(script2);
      script2.dataset.cleanup = "true";
    };

    document.body.appendChild(script1);

    return () => {
      const scripts = document.querySelectorAll("script");
      scripts.forEach((s) => {
        if (
          s.src.includes("botpress.cloud") ||
          s.dataset.cleanup === "true"
        ) {
          s.remove();
        }
      });
    };
  }, []);

  // Complaint form state & handlers
  const [complaint, setComplaint] = useState({
    location: "",
    reg_date: "",
    type: "",
    department: "PWD",
    status: "Pending",
    imageURL: "",
  });

  const departmentMapping = {
    Pothole: "PWD",
    "Broken Streetlight": "Electricity Department",
    "Fallen Tree": "Local Municipality",
    "Garbage Dump": "Local Municipality",
    "Water Leak": "Water Resources Department",
  };

  const addComplaint = async () => {
    try {
      const assignedDepartment =
        departmentMapping[complaint.type] || "PWD";
      await addDoc(collection(db, "complaints"), {
        ...complaint,
        department: assignedDepartment,
      });
      setComplaint({
        location: "",
        reg_date: "",
        type: "",
        department: "PWD",
        status: "Pending",
        imageURL: "",
      });
    } catch (e) {
      console.error("Failed to add complaint:", e);
    }
  };

  const handleImageInput = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Test_Preset");
    data.append("cloud_name", "diq0bcrjl");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/diq0bcrjl/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      if (result.secure_url) {
        setComplaint((prev) => ({ ...prev, imageURL: result.secure_url }));
      } else {
        throw new Error("Failed to upload image.");
      }
    } catch (e) {
      console.error("Failed to upload image: ", e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaint((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Home</h1>
      <p className="home-description">This page has the chatbot enabled.</p>

      <h2 className="complaint-title">Submit a Complaint</h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="complaint-form"
      >
        <input
          type="text"
          name="location"
          value={complaint.location}
          onChange={handleInputChange}
          placeholder="Enter Location"
          className="form-input"
        />
        <input
          type="date"
          name="reg_date"
          value={complaint.reg_date}
          onChange={handleInputChange}
          className="form-input"
        />
        <select
          name="type"
          value={complaint.type}
          onChange={handleInputChange}
          className="form-select"
        >
          <option value="">Select Issue Type</option>
          <option value="Pothole">Pothole</option>
          <option value="Broken Streetlight">Broken Streetlight</option>
          <option value="Fallen Tree">Fallen Tree</option>
          <option value="Garbage Dump">Garbage Dump</option>
          <option value="Water Leak">Water Leak</option>
        </select>
        <input type="file" onChange={handleImageInput} className="form-file-input"/>
        <button
          type="button"
          onClick={addComplaint}
          className="submit-button"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default Home;
