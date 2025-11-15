import React from "react";
import Cards2 from "./Cards2";
// import lists from "../../public/list.json"
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Course = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4000/book");
        console.log(res.data);
        setBook(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBook();
  }, []);
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-[90px]">
        <div className="items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="ml-2 text-pink-500"> Here ! :) </span>
          </h1>
          <p className=" mt-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            quibusdam nihil veniam sit deleniti ab enim eius, qui iusto voluptas
            id neque possimus, doloribus autem dicta rerum voluptatibus
            recusandae quos! Modi, dolorem deleniti pariatur totam accusantium
            impedit labore maxime quas quidem, quod temporibus, voluptate iusto
            sapiente molestias dicta natus corporis sed. eius, similique
            accusamus vitae est qui? Consectetur doloribus magnam quod numquam,
            eaque velit debitis, eius, unde soluta veniam a.
          </p>
          <Link to="/">
            <button className=" mt-6 bg-pink-500 text-white px-4  py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {book.map((items) => (
            <Cards2 item={items} key={items._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Course;
