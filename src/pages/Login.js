import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Stylefile/Login.scss";
import axios from "axios";
import bgimg from "./assets/Doctorlogin.jpg"

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/Login", formData);

      const data = response.data; 

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("isLoggedIn", "true");

      toast.success(`Welcome ${data.name}!`);

  
      if (!data.role || data.role === "PATIENT") navigate("/patient-drashboard");
      else if (data.role === "DOCTOR") navigate("/doctor-dashboard");
      else if (data.role === "ADMIN") navigate("/admin-dashboard");
      else navigate("/dashboard");

    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{background:`url(${bgimg})`,
    }}>
      <ToastContainer />
      <div className="login-card">
        <h2 className="login-title">Login to Doctor care 🏥</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-text">
          Don’t have an account?{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
