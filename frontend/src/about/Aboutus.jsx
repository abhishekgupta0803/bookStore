import React from 'react'
import About from './About'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const Aboutus = () => {
  return (
    <>
        <Navbar />
        <div className='min h-screen'>
         <About />
        </div>
       < Footer />
    </>
  )
}

export default Aboutus