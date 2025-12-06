import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Login from "./Login";
import toast, { Toaster } from "react-hot-toast";
import { useDarkMode } from "../hooks/useDarkMode";
import { useAuth } from "../context/AuthProvider";
import { API_ENDPOINTS } from "../config/api";

function Signup() {
  const [theme, toggleTheme] = useDarkMode();
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname:data.fullname,
      email:data.email,
      password:data.password,
    }
    await axios.post(API_ENDPOINTS.USER_SIGNUP, userInfo)
    .then((res)=>{
      console.log(res.data)
      if(res.data){
         toast.success("Signup  successfully");
         localStorage.setItem("Users",JSON.stringify(res.data.user));
         // Update auth state
         setAuthUser(res.data.user);
         // Redirect to courses page after successful signup
         setTimeout(() => {
          navigate("/courses");
        }, 1000);
      }
    }).catch((err)=>{
      
     
       toast.error("Error :" + err.response.data.message)
    })
  };

  return (
    <>
      {/* Signup Modal */}
      <dialog className="modal modal-open flex items-center justify-center h-screen bg-gray-100 dark:bg-slate-900">
        <div className="modal-box border-[2px] shadow-md p-5 rounded-md relative bg-white dark:bg-slate-800 dark:border-slate-700">
          {/* Dark Mode Toggle Button */}
          <div className="absolute top-2 left-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-slate-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Close Button */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-white dark:hover:bg-slate-700"
            >
              X
            </Link>

            <h3 className="font-bold text-lg text-center dark:text-white">
              Signup
            </h3>

            {/* Name */}
            <div className="mt-4 space-y-2">
              <span className="dark:text-gray-200">Name</span>
              <br />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-80 px-3 py-2 border rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <span className="text-sm text-red-500 dark:text-red-400">
                  Name is required
                </span>
              )}
            </div>

            {/* Email */}
            <div className="mt-4 space-y-2">
              <span className="dark:text-gray-200">Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-2 border rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500 dark:text-red-400">
                  Email is required
                </span>
              )}
            </div>

            {/* Password */}
            <div className="mt-4 space-y-2">
              <span className="dark:text-gray-200">Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-2 border rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-500 dark:text-red-400">
                  Password is required
                </span>
              )}
            </div>

            {/* Signup button */}
            <div className="flex justify-around mt-4">
              <button
                type="submit"
                className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 dark:bg-pink-600 dark:hover:bg-pink-700 duration-200"
              >
                Signup
              </button>

              <div className="dark:text-gray-200">
                <span>Have an account? </span>
                <button
                  type="button"
                  className="underline text-blue-500 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
      <Login />
    </>
  );
}

export default Signup;
