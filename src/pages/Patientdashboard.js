import React from 'react'
import Navbar from '../components/Navbar'
import Home from "./Home"
import BoodAppoinment from './BoodAppoinment'
import Footer from '../components/Footer'


function Patientdashboard() {
  return (
    <div>
        <Navbar/>
        <Home/>
        <BoodAppoinment/>
        <Footer/>
        
        
      
    </div>
  )
}

export default Patientdashboard