import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Stylefile/Login.scss";
import axios from "axios";
import api from "../api"

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", formData);
      const data = res.data;

      if (!data || !data.id) throw new Error("Invalid response");

      sessionStorage.setItem("auth", JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role
      }));

      toast.success(`Welcome ${data.name}!`);
      navigate("/patient-dashboard");
    } catch (err) {
      sessionStorage.removeItem("auth");
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="login-card">
        <h2 className="login-title">Login to Doctor care</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email" name="email" placeholder="Enter your email"
              value={formData.email} onChange={handleChange} required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password" name="password" placeholder="Enter your password"
              value={formData.password} onChange={handleChange} required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading || !formData.email || !formData.password}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-text">
          Don’t have an account? <Link to="/register" className="register-link">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
