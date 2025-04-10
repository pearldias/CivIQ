import React from 'react';
import './userhome.css';
import {Link} from 'react-router-dom';
const UserHome = () => {
  return (
    <>
      <div className="app-bar">CivIQ</div>
      <div className="user-home-page">
        <div className="user-home-content">
          <h1>Welcome</h1>
          <div className="user-home-buttons">
            <Link to="/signup">
            <button className="signup-btn">Sign Up</button>
            </Link>
            
            <Link to="/signin">
             <button className="signin-btn">Sign In</button> 
            </Link>

            <Link to="/Admin">
             <button className="admin-btn">Admin</button> 
            </Link>
            
            
            
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
