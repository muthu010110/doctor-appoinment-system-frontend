import React from "react";
import Navbar from "../components/Navbar";
import "./Stylefile/Home.scss";
import doctor from "./assets/doctor.png"

function Home() {
  return (
    <div id="home" className="home">
      <section   className="hero">
        <div className="hero-left">
          <h1>
            Providing Quality <span>Healthcare</span> For A <span>Brighter</span> And <span>Healthy</span> Future
          </h1>
          <p>
            At Our Hospital, We Are Dedicated To Providing Exceptional Medical Care To Our Patients And Their Families. 
            Our Experienced Team Of Medical Professionals, Cutting-Edge Technology, And Compassionate Approach Make Us A Leader In The Healthcare Industry.
          </p>
          <div className="hero-buttons">
            <a className="btn-primary"  href="#appoinment">Appoinment</a>
            <button className="btn-secondary">Watch Video</button>
          </div>
        </div>

        <div className="hero-right">
          <img src={doctor} alt="Doctor" /> 
          <div className="service-badge">24/7 Service</div>
        </div>
      </section>

      <section className="find-doctor">
        <h2>Find A Doctor</h2>
        <form className="doctor-form">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Specialty" />
          <label className="toggle">
            <input type="checkbox" />
            <span>Available</span>
          </label>
          <button type="submit">Search</button>
        </form>
      </section>
    </div>
  );
}

export default Home;
