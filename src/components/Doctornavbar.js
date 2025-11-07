import React from "react";

function Doctornavbar({ toggleSidebar }) {
  const doctor = JSON.parse(localStorage.getItem("user")); // get logged-in doctor info

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <h2>Doctor Dashboard</h2>
      </div>

      <div className="navbar-right">
        <span>Welcome, Dr. {doctor?.name}</span>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/doctorlogin";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Doctornavbar;
