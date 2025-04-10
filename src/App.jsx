import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Home from "./Home";
import UserHome from "./Userhome";
import Detection from "./detection";
import Admin from "./Admin";
import Community from "./Community";
import Navbar from "./Navbar";
import Status from "./Status";
function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Complain" element={<Detection />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Community" element={<Community />} />
        <Route path="Status" element={<Status/>}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
