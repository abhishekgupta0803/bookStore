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
      <div className="flex justify-center items-center h-screen bg-base-200">
        <form className="fieldset bg-base-300 border-base-300 rounded-box w-[400px] border p-6 shadow-md" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-semibold text-center mb-4 dark:text-black">
            Contact Us
          </h1>

          <label className=" font-bold label text-black  text-base">
            <span className="label-text font-medium ">Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-full "
             {...register("name", { required: true })}
          />
          
             {errors.name && <span className="text-sm text-red-500">name is required</span>}

          <label className=" font-bold label mt-2 text-black text-base">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
              {...register("email", { required: true })}
          />
            {errors.email && <span className="text-sm text-red-500">email is required</span>}

          <label className=" font-bold  label mt-2 text-black  text-base">
            <span className="label-text font-medium">Message</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Write your message..."
            rows="4"
                {...register("message", { required: true })}
          ></textarea>
            {errors.message && <span className="text-sm text-red-500">message is required</span>}

          <button className=" font-bold   btn btn-neutral  mt-4 w-full dark:text-black  border-4">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Contactus;
