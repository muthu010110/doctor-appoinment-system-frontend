import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PatientDashboard from "./pages/Patientdashboard";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  window.addEventListener("beforeunload", () => {
  localStorage.clear();
});

  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/patient-drashboard" element={<PatientDashboard />} />
      <Route path="/register" element={<Register />} />   
      <Route path="/Home" element={<Home/>}/>  
      <Route path="/login" element={<Login/>}/> 
    </Routes>
  );
}

export default App;
