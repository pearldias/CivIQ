import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Add this import

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Home</h1>
      <p className="home-description">This page has the chatbot enabled.</p>

      <h2 className="complaint-title">Submit a Complaint</h2>
      <button
        type="button"
        onClick={() => navigate("/detection")}
        className="submit-button"
      >
        Make Complaint
      </button>

      <button type="button" className="submit-button">Check Status</button>

      <button className="submit-button">Community</button>
    </div>
  );
};

export default Home;
