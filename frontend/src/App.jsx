import React, { useState } from "react";
import Home from "./home/Home.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Courses from "./courses/Courses.jsx";
import Signup from "./components/Signup.jsx";
import Contact from "./contactus/Contact.jsx";
import Aboutus from "./about/Aboutus.jsx";
import BookReader from "./components/BookReader.jsx";
import Payment from "./components/Payment.jsx";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider.jsx";

const App = () => {
   const [authUser,setAuthUser] =  useAuth();
 console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
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
