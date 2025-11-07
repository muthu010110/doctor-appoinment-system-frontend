import React from 'react'
import Navbar from '../components/Navbar'
import Home from "./Home"
import BoodAppoinment from './BoodAppoinment'
import Footer from '../components/Footer'
import Chatbot from './Chatbot'


function Patientdashboard() {
  return (
    <div>
        <Navbar/>
        <Home/>
        <BoodAppoinment/>
        <Chatbot/>
        <Footer/>
        
        
      
    </div>
  )
}

export default Patientdashboard