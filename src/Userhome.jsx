import React from "react";
import { Link } from "react-router-dom";

function UserHome() {
  return (
    <div className="user-home-page">
      <h1>Welcome! Please choose an option:</h1>
      <div className="user-home-buttons">
        <Link to="/signup">
          <button className="signup-btn">Sign Up</button>
        </Link>
        <Link to="/signin">
          <button className="signin-btn">Sign In</button>
        </Link>
      </div>
    </div>
  );
}

export default UserHome;
