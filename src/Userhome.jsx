import React from 'react';
import './userhome.css';
import logo from './assets/civiqimg.png';
import {Link} from 'react-router-dom';
const UserHome = () => {
  return (
    <>
      <div className="app-bar">CivIQ</div>
      <div className="user-home-page">
        <div className="user-home-content">
        <img 
  src={logo} 
  alt="CivIQ Logo" 
  style={{ 
    width: '200px', 
    height: '200px', // Ensure it's a square
    marginBottom: '20px', 
    borderRadius: '50%', // Circular image
    border: '4px solid #fff', // White border around the image for a clean look
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow for a lifted effect
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Smooth transitions
  }} 
  onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} // Hover effect: scales up the image
  onMouseOut={(e) => e.target.style.transform = 'scale(1)'} // Reverts back when hover ends
/>

          <h1>Welcome</h1>
          <div className="user-home-buttons">
            <Link to="/signin">
            <button className="signup-btn">Sign In</button>
            </Link>
            
            <Link to="/signup">
             <button className="signin-btn">Sign Up</button> 
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
