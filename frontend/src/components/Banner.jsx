import React from "react";
import bannerImg from "../../public/Banner.png";
const Banner = () => {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full md:w-1/2  mt-12 md:mt-32 order-2 md:order-1">
          <div className="space-y-12">
            <h1 className="text-4xl font-bold">
              Hello, Welcomes here to learn Something
              <span className="colorful-text"> new everyday!!!</span>
            </h1>
            <p className="text-xl ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              aperiam aliquid officiis dolor reprehenderit iste id cumque odio
              amet, eos expedita natus nisi, minus quo illo voluptate ducimus
            </p>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input type="email" placeholder="mail@site.com" required />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>
          <button className="bg-pink-500 text-white hover:bg-pink-600 mt-6 px-4 py-2 rounded">
            Secondary
          </button>
        </div>

        <div className="w-full md:w-1/2 order-1 mt-20 ">
          <img src={bannerImg}  alt="img"  className="md:w-[550px] md:h-[460px] md:ml-12" />
        </div>
      </div>
    </>
  );
};

export default Banner;
