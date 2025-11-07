import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Stylefile/Register.scss";
import doctor from "./assets/doctor.png";
import api from "../api"; // <-- add this

function Register() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleregister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      // Path must match your Spring controller, adjust if needed:
      // e.g. @PostMapping("/api/auth/register")
      await api.post("/api/auth/register", formdata);
      toast.success("Register successful");
      navigate("/login");
    } catch (err) {
      const msg = err?.message || "Registration failed";
      setMessage(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-left">
          <form className="register-form" onSubmit={handleregister}>
            <h2 className="form-title">Create Your MediBook Account </h2>

            <div className="form-group">
              <input name="name" placeholder="Full Name"
                value={formdata.name} onChange={handlechange} required />
            </div>

            <div className="form-group">
              <input type="email" name="email" placeholder="Email Address"
                value={formdata.email} onChange={handlechange} required />
            </div>

            <div className="form-group">
              <input type="password" name="password" placeholder="Password"
                value={formdata.password} onChange={handlechange} required />
            </div>

            <div className="form-group">
              <input name="phone" placeholder="Phone Number"
                value={formdata.phone} onChange={handlechange} required />
            </div>

            <button type="submit" className="submit-btn">Register</button>

            {message && <p className="error-message">{message}</p>}

            <p className="login-redirect">
              Already have an account?{" "}
              <Link to="/login" className="login-link">Login</Link>
            </p>

            <ToastContainer position="top-right" autoClose={3000} />
          </form>
        </div>

        <div className="register-right">
          <div className="graphic-circle"></div>
          <img src={doctor} alt="Doctor illustration" className="doctor-image" />
        </div>
      </div>
    </div>
  );
}

export default Register;
