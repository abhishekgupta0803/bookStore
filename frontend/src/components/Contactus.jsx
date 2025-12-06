import React from "react";
import { useForm } from "react-hook-form";
const Contactus = () => {

    const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();
const onSubmit = (data) => console.log(data)

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-base-200 dark:bg-slate-900">
        <form className="fieldset bg-base-300 dark:bg-slate-800 border-base-300 dark:border-slate-700 rounded-box w-[400px] border p-6 shadow-md dark:shadow-lg" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-semibold text-center mb-4 dark:text-white">
            Contact Us
          </h1>

          <label className=" font-bold label text-black dark:text-white text-base">
            <span className="label-text font-medium ">Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-full dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:placeholder-gray-400"
             {...register("name", { required: true })}
          />
          
             {errors.name && <span className="text-sm text-red-500 dark:text-red-400">name is required</span>}

          <label className=" font-bold label mt-2 text-black dark:text-white text-base">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:placeholder-gray-400"
              {...register("email", { required: true })}
          />
            {errors.email && <span className="text-sm text-red-500 dark:text-red-400">email is required</span>}

          <label className=" font-bold  label mt-2 text-black dark:text-white text-base">
            <span className="label-text font-medium">Message</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:placeholder-gray-400"
            placeholder="Write your message..."
            rows="4"
                {...register("message", { required: true })}
          ></textarea>
            {errors.message && <span className="text-sm text-red-500 dark:text-red-400">message is required</span>}

          <button className=" font-bold   btn btn-neutral  mt-4 w-full dark:bg-slate-700 dark:text-white dark:border-slate-600 dark:hover:bg-slate-600 border-4">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Contactus;
