import React from "react";
import Home from "./home/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Courses from "./courses/Courses.jsx";
import Signup from "./components/Signup.jsx";
import Contact from "./contactus/Contact.jsx";
import Login from "./components/Login.jsx";
const App = () => {
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Page */}
          <Route path="/courses" element={<Courses />} /> {/* About Page */}
           <Route path="/signup" element={<Signup />} /> {/* About Page */}
             <Route path="/contact" element={<Contact />} /> {/* About Page */}
        </Routes>
      </div>
    </>
  );
};

export default App;
