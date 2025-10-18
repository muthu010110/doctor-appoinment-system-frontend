import React from "react";
import "./Footer.scss";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div  className="footer-container">

    
        <div className="footer-section">
          <h3 className="footer-logo">MediBook 🩺</h3>
          <p className="footer-text">
            Your trusted online doctor appointment system for better healthcare.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="/doctors">Doctors</a></li>
            <li><a href="#appoinment">Appoinmentt</a></li>
          </ul>
        </div>

  
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p><Mail size={16}/> doctorcare@gmail.com</p>
          <p><Phone size={16}/> +91 6374448515</p>
          <p><MapPin size={16}/> Chennai, Tamil Nadu</p>
        </div>
      </div>


      <div className="footer-bottom">
        <p>© 2025 DoctorCare | Made with  by Shri Muthu Kumaran</p>
      </div>
    </footer>
  );
}

export default Footer;
