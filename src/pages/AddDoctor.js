import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import './Stylefile/AddDoctor.scss';
import api from "../api"
const SPECIALIZATIONS = [
  "General Medicine",
  "General Surgery",
  "Cardiology",
  "Dermatology",
  "ENT (Otolaryngology)",
  "Gastroenterology",
  "Gynaecology & Obstetrics",
  "Neurology",
  "Neurosurgery",
  "Nephrology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Urology",
  "Dentistry",
  "Physiotherapy",
  "Diabetology"
];

function AddDoctor() {
  const [formdata, setformdata] = useState({
    name: "",
    specialization: "",
    email: "",
    password: ""
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/doctor/addDoctor", formdata);
      toast.success("Doctor details added successfully!");
      setformdata({ name: "", specialization: "", email: "", password: "" });
    } catch (error) {
      toast.error("Email already exists!");
    }
  };

  return (
    <div className="add-doctor-container">
      <ToastContainer/>
      <div className="add-doctor-card">
        <h2 className="add-doctor-title"> Add New Doctor</h2>

        <form onSubmit={handleRegister} className="add-doctor-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handlechange}
              placeholder="Enter doctor's name"
              required
            />
          </div>

          <div className="form-group">
            <label>Specialization</label>
            <select
              name="specialization"
              value={formdata.specialization}
              onChange={handlechange}
              required
            >
              <option value="" disabled>— Select specialization —</option>
              {SPECIALIZATIONS.map((sp) => (
                <option key={sp} value={sp}>{sp}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handlechange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handlechange}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="submit-btn">Add Doctor</button>
        </form>
      </div>
    </div>
  );
}

export default AddDoctor;
