import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PatientDashboard from "./pages/Patientdashboard";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import AddDoctor from "./pages/AddDoctor";
import Doctorlogin from "./pages/Doctorlogin";
import DoctorDashboard from "./pages/DoctorDrashboard";
import Chatbot from "./pages/Chatbot";

function App() {
  window.addEventListener("beforeunload", () => {
  localStorage.clear();
});

  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/register" element={<Register />} />   
      <Route path="/Home" element={<Home/>}/>  
      <Route path="/login" element={<Login/>}/> 
      <Route path="/adddoctor" element={<AddDoctor/>}/> 
       <Route path="/doctorlogin" element={<Doctorlogin/>}/> 
      <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>
      <Route path="/chatbot" element={<Chatbot/>}/>

    </Routes>
  );
}

export default App;
