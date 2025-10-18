import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.scss";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
   localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/login");
 
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h2>DoctorCare</h2>
        </div>

        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#footer">Contact</a></li>
          

          {isLoggedIn && (
            <>
              <li>Welcome, {user?.name||"User"}</li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register" className="register-btn">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
