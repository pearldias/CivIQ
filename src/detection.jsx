import React, { useState, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";  // Import Teachable Machine API

const PotholeDetection = () => {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    loadModel(); // Load model on component mount
  }, []);

  return (
    <div>
      <h1>Detection</h1>
      <input type="file" onChange={handleImageUpload} />
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
