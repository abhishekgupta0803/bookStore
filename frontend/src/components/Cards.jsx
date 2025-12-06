
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBookImage } from "../utils/bookImages";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

function Cards({ item }) {
  const bookImage = getBookImage(item.name) || item.image;
  const navigate = useNavigate();
  const [authUser] = useAuth();
  const [hasAccess, setHasAccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authUser && authUser._id) {
      checkAccess();
    }
  }, [authUser, item._id]);

  const checkAccess = async () => {
    try {
      const res = await axios.post(
        `http://localhost:4000/book/${item._id}/check-access`,
        { userId: authUser._id }
      );
      setHasAccess(res.data.hasAccess);
    } catch (error) {
      console.error("Error checking access:", error);
    }
  };

  const handleReadClick = () => {
    if (!authUser) {
      toast.error("Please login to read books");
      navigate("/signup");
      return;
    }
    navigate(`/book/${item._id}`);
  };

  const handleBuyClick = () => {
    if (!authUser) {
      toast.error("Please login to purchase books");
      navigate("/signup");
      return;
    }
    navigate(`/book/${item._id}/payment`);
  };

  const isFree = item.free || item.price === 0;
  const canRead = isFree || hasAccess === true;

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img src={bookImage} alt={item.name} className="w-full h-64 object-cover" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
              {isFree ? (
                <div className="badge badge-success">Free</div>
              ) : (
                <div className="badge badge-warning">Paid</div>
              )}
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between items-center">
              <div className="badge badge-outline">
                {isFree ? "Free" : `$${item.price}`}
              </div>
              {canRead ? (
                <button
                  onClick={handleReadClick}
                  className="cursor-pointer px-3 py-1 rounded-full border-[2px] bg-green-500 text-white hover:bg-green-600 duration-200"
                >
                  Read Now
                </button>
              ) : (
                <button
                  onClick={handleBuyClick}
                  className="cursor-pointer px-3 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
