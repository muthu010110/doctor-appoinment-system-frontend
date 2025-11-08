import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Doctornavbar";
// import Sidebar from "./Sidebar";
// import "./Dashboard.scss";
import api from "../api"
function DoctorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [appointments, setAppointments] = useState([]);
  
  const doctor = JSON.parse(localStorage.getItem("user")); // doctor info
  const doctorEmail = doctor?.email;

  useEffect(() => {
    if (doctorEmail) {
      api
        .get(`/api/appointments/doctor/${doctorEmail}`)
        .then((res) => setAppointments(res.data))
        .catch((err) => console.error(err));
    }
  }, [doctorEmail]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-container">
      {/* <Sidebar isOpen={sidebarOpen} /> */}
      <div className="main-content">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="dashboard-content">
          <h1>Welcome, Dr. {doctor?.name}</h1>
          <p>Here are your upcoming appointments:</p>

          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="4">No appointments found</td>
                </tr>
              ) : (
                appointments.map((app) => (
                  <tr key={app.id}>
                    <td>{app.name}</td>
                    <td>{app.date}</td>
                    <td>{app.time}</td>
                    <td>{app.note}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
