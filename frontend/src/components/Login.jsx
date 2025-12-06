import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDarkMode } from "../hooks/useDarkMode";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
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
    email: data.email,
    password: data.password,
  };

  await axios
    .post("http://localhost:4000/user/login", userInfo)
    .then((res) => {
      console.log(res.data);

      if (res.data) {
        toast.success("Logged in successfully");

        if (res.data?.user) {
          localStorage.setItem("Users", JSON.stringify(res.data.user));
          // Update auth state
          setAuthUser(res.data.user);
        }

        // Redirect to courses page after successful login
        setTimeout(() => {
          navigate("/courses");
        }, 1000);
      }
    })
    .catch((err) => {
      const message = err?.response?.data?.message || "Something went wrong!";
      toast.error("Error: " + message);
    });
};

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white dark:bg-slate-800 dark:text-white">
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
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <Link
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 dark:text-white dark:hover:bg-slate-700"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              X
            </Link>
            <h3 className="font-bold text-lg dark:text-white text-center">Login</h3>
            <div className="mt-4 space-y-2">
              <span className="dark:text-gray-200">Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-2 border rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500 dark:text-red-400">
                  email is required
                </span>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <span className="dark:text-gray-200">Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your Password"
                className="w-80 px-3 py-2 border rounded-md outline-none bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:placeholder-gray-400 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500 dark:text-red-400">
                  password is required
                </span>
              )}
            </div>
            <div className="flex justify-around mt-4">
              <button
                type="submit"
                className=  " bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 dark:bg-pink-600 dark:hover:bg-pink-700 duration-200 "
              >
                Login
              </button>
              <p className="dark:text-gray-200">
                Not registered ?{" "}
                <Link
                  to="/signup"
                  className="underline text-blue-500 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Signup
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
