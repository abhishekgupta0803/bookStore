import React, { useEffect } from "react";
import Home from "./home/Home.jsx";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Courses from "./courses/Courses.jsx";
import Signup from "./components/Signup.jsx";
import Contact from "./contactus/Contact.jsx";
import Aboutus from "./about/Aboutus.jsx";
import BookReader from "./components/BookReader.jsx";
import Payment from "./components/Payment.jsx";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider.jsx";
import { useModalBlur } from "./hooks/useModalBlur.js";

const App = () => {
  const [authUser, setAuthUser] = useAuth();
  const location = useLocation();
  
  // Check if login modal is open
  const isLoginModalOpen = useModalBlur("my_modal_3");
  
  // Check if we're on signup page (which is a full-page modal)
  const isSignupPage = location.pathname === "/signup";
  
  // Determine if any modal is open (blur background when login modal opens)
  // Note: Signup is already a full-page overlay, so no blur needed for it
  const shouldBlur = isLoginModalOpen;
  
  // Apply blur class to main container and body
  useEffect(() => {
    if (shouldBlur) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [shouldBlur]);

  console.log(authUser);
  
  return (
    <>
      <div 
        className={`dark:bg-slate-900 dark:text-white ${shouldBlur ? 'modal-backdrop-blur' : ''}`}
      >
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/courses" element={ authUser ? <Courses /> : <Navigate  to="/signup"/>} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/about" element={<Aboutus />} /> 
          <Route path="/book/:id" element={ authUser ? <BookReader /> : <Navigate  to="/signup"/>} />
          <Route path="/book/:id/payment" element={ authUser ? <Payment /> : <Navigate  to="/signup"/>} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
};

export default App;
