import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="
      min-h-screen 
      bg-white 
      text-gray-900
      dark:bg-gradient-to-b 
      dark:from-gray-900 
      dark:to-gray-800 
      dark:text-white 
      flex items-center justify-center px-6
    ">
      <div className="
        max-w-3xl 
        p-10 
        rounded-3xl 
        shadow-xl 
        border 
        bg-gray-100 
        border-gray-300
        text-center
        
        dark:bg-white/10 
        dark:border-white/20 
        dark:backdrop-blur-xl
      ">

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-4">
          About <span className="text-blue-500 dark:text-blue-400">Us</span>
        </h1>

        {/* Home Button */}
        <Link
          to="/"
          className="
            inline-block 
            mt-3 mb-6 
            px-6 py-2 
            bg-blue-600 
            text-white 
            font-semibold 
            rounded-full 
            hover:bg-blue-700 
            transition
          "
        >
          Go to Home
        </Link>

        {/* Sub text */}
        <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
          Welcome to our platform! We aim to deliver the best learning experience with
          high-quality courses, modern UI, and user-friendly features. Our mission is to
          help students and developers learn new technologies in the easiest way possible.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="
            p-6 rounded-2xl border
            
            bg-gray-200 border-gray-300
            dark:bg-white/10 dark:border-white/20 
            hover:scale-105 transition
          ">
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              To empower everyone with quality education and practical skills.
            </p>
          </div>

          <div className="
            p-6 rounded-2xl border
            
            bg-gray-200 border-gray-300
            dark:bg-white/10 dark:border-white/20 
            hover:scale-105 transition
          ">
            <h2 className="text-xl font-semibold mb-2">Our Goal</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              To create modern content that helps you grow in your career.
            </p>
          </div>

          <div className="
            p-6 rounded-2xl border
            
            bg-gray-200 border-gray-300
            dark:bg-white/10 dark:border-white/20 
            hover:scale-105 transition
          ">
            <h2 className="text-xl font-semibold mb-2">Our Team</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              A passionate group of developers and designers building the future.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
