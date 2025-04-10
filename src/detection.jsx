import React, { useState, useEffect , useContext} from "react";
import * as tmImage from "@teachablemachine/image";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import {getAuth} from "firebase/auth"
import { useAuth } from "./AuthContext";


import  './detection.css';
const PotholeDetection = () => {
  const {user}=useAuth();
  console.log(user.email);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [regionName, setRegionName] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [complaint, setComplaint] = useState({
    location: "",
    reg_date: "",
    type: "",
    department: "PWD",
    status: "Pending",
    imageURL: "",
    user: user?.email||""
  });

  const departmentMapping = {
    "Potholes": "PWD",
    "broken street light": "Electricity Department",
    "Fallen Trees": "Local Municipality",
    "Garbage Dumping": "Local Municipality",
  };

  // Load the Teachable Machine model
  const loadModel = async () => {
    try {
      const modelURL = "/model/model.json";
      const metadataURL = "/model/metadata.json";
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    } catch (error) {
      console.error("Error loading the model: ", error);
    }
  };


  // Handle image upload and make predictions
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
  
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Test_Preset");
    data.append("cloud_name", "diq0bcrjl");
  
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
  
          const highestPrediction = predictionResult.reduce((max, pred) =>
            pred.probability > max.probability ? pred : max,
            predictionResult[0]
          );
  
          const predictedType = highestPrediction.className;
          const mappedDepartment = departmentMapping[predictedType] || "General Department";
  
          // Update complaint with type and department
          setComplaint((prev) => ({
            ...prev,
            type: predictedType,
            department: mappedDepartment,
          }));
  
          setIsLoading(false);
        };
      }
    } else {
      alert("Please upload a valid image (JPG, PNG).");
      return;
    }
  
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/diq0bcrjl/image/upload", {
        method: "POST",
        body: data,
      });
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
  

  const fetchCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          await fetchRegionName(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          alert("Failed to fetch your location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const fetchRegionName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBehEghFrkAKZ7EE3z4YJ5dOHAbxMURZBQ`
      );
      const data = await response.json();
      if (data.results && data.results[0]) {
        setRegionName(data.results[0].formatted_address);
        setComplaint((prev) => ({ ...prev, location: data.results[0].formatted_address }));
      } else {
        alert("Unable to fetch the region name. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching region name:", error);
    }
  };

  const initializeMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: location.latitude, lng: location.longitude },
      zoom: 14,
    });

    const marker = new window.google.maps.Marker({
      position: { lat: location.latitude, lng: location.longitude },
      map,
      draggable: true,
    });

    map.addListener("click", async (event) => {
      const latitude = event.latLng.lat();
      const longitude = event.latLng.lng();
      setLocation({ latitude, longitude });
      await fetchRegionName(latitude, longitude);
    });

    marker.addListener("dragend", async () => {
      const position = marker.getPosition();
      const latitude = position.lat();
      const longitude = position.lng();
      setLocation({ latitude, longitude });
      await fetchRegionName(latitude, longitude);
    });
  };

  const handleSubmit = async () => {
    if (!location.latitude || !location.longitude) {
      alert("Please provide a valid location.");
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
    loadModel();
    fetchCurrentLocation();
    setComplaint((prev) => ({ ...prev, reg_date: new Date().toISOString().split("T")[0] }));
  }, []);

  useEffect(() => {
    if (showMap) {
      initializeMap();
    }
  }, [showMap]);

  return (
    <div>
      <h1>Submit a Complaint</h1>
      <form onSubmit={(e) => e.preventDefault()} className="complaint-form">
        <input
          type="text"
          value={regionName || `${location.latitude}, ${location.longitude}`}
          placeholder="Location"
          readOnly
          className="form-input"
        />
        <button type="button" className="submit-button" onClick={() => setShowMap(!showMap)}>
          {showMap ? "Close Map" : "Select Location on Map"}
        </button>
        {showMap && <div id="map" style={{ height: "400px", width: "100%" }} />}
        <input
          type="text"
          value={complaint.reg_date}
          placeholder="Date"
          readOnly
          className="form-input"
        />
        <input
          type="file"
          onChange={handleImageUpload}
          className="form-file-input"
        />
        <button type="button" onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </form>
      {image && <img src={image} alt="Uploaded" />}
      {isLoading && <p>Loading...</p>}
      
    </div>
  );
};

export default PotholeDetection;
