import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./Stylefile/DoctorLogin.scss"
function Doctorlogin() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/doctor/doctorLogin", formdata); // update your API URL
      const data = response.data;

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("isLoggedIn", "true");

      toast.success(`Welcome ${data.name}!`);
      navigate("/doctor-dashboard");
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-login-container">
      <h2>Doctor Login</h2>
      <form onSubmit={handlelogin}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={handlechange}
            placeholder="Enter your email"
            required
          />
        </div>
        <br />
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={handlechange}
            placeholder="Enter your password"
            required
          />
        </div>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Doctorlogin;
