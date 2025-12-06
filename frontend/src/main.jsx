import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";

// Initialize dark mode from localStorage on mount
const initializeTheme = () => {
  const theme = localStorage.getItem("theme") || "light";
  const element = document.documentElement;
  if (theme === "dark") {
    element.classList.add("dark");
    document.body.classList.add("dark");
  } else {
    element.classList.remove("dark");
    document.body.classList.remove("dark");
  }
};

// Initialize theme before rendering
initializeTheme();

createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
    <AuthProvider>
    <div className="dark:bg-slate-900 dark:text-white min-h-screen">
       <App />
    </div>
      </AuthProvider>
    </BrowserRouter>
 
);
