import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup"; // Assuming the Signup component is in the "components" folder
import Signin from "./Signin"; // Assuming the Signin component is in the "components" folder
import Home from "./Home"; // Assuming the Home component is in the "components" folder
import UserHome from "./Userhome"; // Import the UserHome component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserHome />} /> {/* User Home page route */}
        <Route path="/signin" element={<Signin />} /> {/* Sign In page route */}
        <Route path="/signup" element={<Signup />} /> {/* Sign Up page route */}
        <Route path="/Home" element={<Home />} /> {/* Chatbot page route */}
      </Routes>
    </Router>

    
  );
}

export default App;
