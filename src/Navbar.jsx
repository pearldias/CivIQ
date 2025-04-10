import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'; // Import CSS for styling

export default function Navbar() {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "nv active" : "nv")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Community"
            className={({ isActive }) => (isActive ? "nv active" : "nv")}
          >
            Community
          </NavLink>
        </li>
        
        <li>
            <NavLink to="/Complain" className={({ isActive }) => (isActive ? "nv active" : "nv")}>
                Make Complain
            </NavLink>
        </li>

        <li>
            <NavLink to="/Status" className={({ isActive }) => (isActive ? "nv active" : "nv")}>
                Check Status
            </NavLink>
        </li>
      </ul>
    </nav>
  );
}