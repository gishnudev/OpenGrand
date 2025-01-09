import React from 'react'
import Hero from "../components/Hero"
import About from "../components/About"
import HowItWorks from "../components/HowItWorks"
import Footer from "../components/Footer"
import Navbar from '../components/Navbar'
const LandingPage = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <About/>
    <HowItWorks/>
    <Footer/>
    </>
  )
}

export default LandingPage