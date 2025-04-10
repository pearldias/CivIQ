import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";  // Import Teachable Machine API
import { db } from "./firebase"; // Import Firestore database
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const PotholeDetection = () => {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [complaint, setComplaint] = useState({
    location: "",
    reg_date: "",
    type: "",
    department: "PWD",
    status: "Pending",
    imageURL: "",
  });

  // Load the Teachable Machine model
  const loadModel = async () => {
    try {
      const modelURL = '/model/model.json';  // Path to your model
      const metadataURL = '/model/metadata.json'; // Path to your metadata file (if needed)
      
      const loadedModel = await tmImage.load(modelURL, metadataURL); // Load model with metadata
      setModel(loadedModel);
    } catch (error) {
      console.error("Error loading the model: ", error);
    }
  };

  // Handle image upload and make predictions
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (validTypes.includes(file.type)) {
      const imgURL = URL.createObjectURL(file);
      setImage(imgURL);
      setIsLoading(true);

      if (model) {
        const imageElement = document.createElement("img");
        imageElement.src = imgURL;
        imageElement.onload = async () => {
          const predictionResult = await model.predict(imageElement);
          setPrediction(predictionResult);
          setIsLoading(false);
        };
      }
    } else {
      alert("Please upload a valid image (JPG, PNG).");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaint((prev) => ({ ...prev, [name]: value }));
  };

  const validatePrediction = () => {
    if (prediction.length > 0) {
      const highestPrediction = prediction.reduce((max, pred) => 
        pred.probability > max.probability ? pred : max, prediction[0]);
      return highestPrediction.className.toLowerCase() === complaint.type.toLowerCase();
    }
    return false;
  };

  const handleVerify = () => {
    if (validatePrediction()) {
      setIsVerified(true);
      alert("Verification successful!");
    } else {
      alert("The selected issue type does not match the highest prediction.");
    }
  };

  const handleSubmit = async () => {
    if (!isVerified) {
      alert("Please verify the prediction before submitting.");
      return;
    }
    try {
      await addDoc(collection(db, "complaints"), complaint);
      alert("Complaint submitted successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit complaint.");
    }
  };

  useEffect(() => {
    loadModel(); // Load model on component mount
  }, []);

  return (
    <div>
      <h1>Detection</h1>
      <form onSubmit={(e) => e.preventDefault()} className="complaint-form">
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
          <option value="broken street light">Broken Streetlight</option>
          <option value="Fallen Trees">Fallen Trees</option>
          <option value="Garbage Dumping">Garbage Dump</option>
          <option value="Water Leak">Water Leak</option>
        </select>
        <input type="file" onChange={handleImageUpload} className="form-file-input"/>
        <button type="button" onClick={handleVerify} className="verify-button">
          Verify
        </button>
        <button type="button" onClick={handleSubmit} className="submit-button">
          Submit 
        </button>
      </form>
      {image && <img src={image} alt="Uploaded" />}
      {isLoading && <p>Loading...</p>}
      <div>
        <h2>Prediction:</h2>
        <ul>
          {prediction.length > 0 ? (
            prediction.map((pred, index) => (
              <li key={index}>
                {pred.className}: {pred.probability.toFixed(2)}
              </li>
            ))
          ) : (
            <p>No prediction yet</p>
          )}
        </ul>
      </div>  
    </div>
  );
};

export default PotholeDetection;
