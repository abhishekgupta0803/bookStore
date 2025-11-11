import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Contactus from '../components/Contactus'

const Contact = () => {
  return (
    <>
    
         <Navbar />
        
         <div className="min-h-screen">
           <Contactus />
         </div>
        <Footer />
     
    </>
  )
}

export default Contact