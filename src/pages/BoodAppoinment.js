import React, { useEffect } from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Stylefile/Appoinment.scss"
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
function BoodAppoinment() {
    const [formdata,setformdata]=useState({
        name:"",
        doctorid:"",
        data:"",
        time:"",
        note:""
    });
    const [doctor,setdoctor]=useState([]);
    useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/doctor");
      setdoctor(response.data);
    } catch (error) {
      console.error("Error loading doctors:", error);
    }
  };

  fetchDoctors();
}, []);

const [message, setMessage] = useState("");
const navigate=useNavigate();


    const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };
 const handleSubmit = async (e) => {
    e.preventDefault();

const loggedIn = localStorage.getItem("isLoggedIn");
if (!loggedIn) {
  toast.error("Please login to book an appointment!");
  setTimeout(() => navigate("/login"), 1000);
  return;
}
const user=JSON.parse(localStorage.getItem("user"));
const email=user?.email;
const payload={
   appointment: formdata, 
    email: email
};

    try {
      const response = await axios.post("http://localhost:8080/api/appointment", payload);
      
      if (response.status === 200 || response.status === 201) {
        toast.success("Appointment booked successfully!"+"get confrim mail");
        
        setformdata({
          name: "",
          doctorId: "",
          date: "",
          time: "",
          note: ""
        });
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment!");
      setMessage(error.message);
    }
  };
 return (
    <div id='appoinment' className="appointment-container">
        <ToastContainer/>
      <div className="appointment-card">
        <h2>Book Your Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formdata.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Select Doctor</label>
            <select
              name="doctorId"
              value={formdata.doctorId}
              onChange={handleChange}
              required
            >
              <option value="">Choose doctor</option>
              {doctor.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} — ({doc.specialization})
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formdata.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={formdata.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="note"
              placeholder="Enter any additional information"
              value={formdata.note}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="book-btn">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default BoodAppoinment