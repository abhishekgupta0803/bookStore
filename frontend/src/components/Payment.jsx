import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { API_ENDPOINTS } from "../config/api";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [authUser] = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!authUser || !authUser._id) {
      toast.error("Please login to purchase books");
      navigate("/signup");
      return;
    }
    fetchBookDetails();
  }, [id, authUser]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_ENDPOINTS.GET_BOOK_BY_ID(id));
      setBook(res.data);
      
      // Check if book is free
      if (res.data.free || res.data.price === 0) {
        toast.success("This book is free! Redirecting to read page...");
        setTimeout(() => {
          navigate(`/book/${id}`);
        }, 1000);
        return;
      }

      // Check if already purchased
      const accessRes = await axios.post(
        API_ENDPOINTS.CHECK_BOOK_ACCESS(id),
        { userId: authUser._id }
      );
      
      if (accessRes.data.hasAccess) {
        toast.success("You already have access to this book!");
        setTimeout(() => {
          navigate(`/book/${id}`);
        }, 1000);
      }
    } catch (error) {
      console.error("Error fetching book:", error);
      toast.error("Failed to load book details");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!book) return;

    try {
      setProcessing(true);
      
      // Simulate payment processing
      // In production, integrate with Razorpay/Stripe here
      toast.success("Processing payment...");
      
      // Simulate payment success after 2 seconds
      setTimeout(async () => {
        try {
          // Grant access after payment
          const res = await axios.post(API_ENDPOINTS.GRANT_BOOK_ACCESS, {
            bookId: id,
            userId: authUser._id
          });

          toast.success("Payment successful! Access granted.");
          
          // Redirect to book reader
          setTimeout(() => {
            navigate(`/book/${id}`);
          }, 1000);
        } catch (error) {
          console.error("Error granting access:", error);
          toast.error("Payment processed but failed to grant access. Please contact support.");
        } finally {
          setProcessing(false);
        }
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center dark:bg-slate-900">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="mt-4 dark:text-white">Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!book) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center dark:bg-slate-900">
          <div className="text-center">
            <p className="text-red-500 text-xl mb-4">Book not found</p>
            <button
              onClick={() => navigate("/courses")}
              className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
            >
              Back to Courses
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen dark:bg-slate-900 dark:text-white pt-20">
        <div className="max-w-2xl container mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/courses")}
            className="mb-6 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Courses
          </button>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">
              Purchase Book
            </h1>
            
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 dark:text-white">
                {book.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {book.title}
              </p>
              
              <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-slate-700 rounded-lg">
                <span className="text-lg font-semibold dark:text-white">
                  Price:
                </span>
                <span className="text-2xl font-bold text-pink-500">
                  ${book.price}
                </span>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold mb-2 dark:text-white">
                What you'll get:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Full access to read the complete book</li>
                <li>Lifetime access to the content</li>
                <li>Read anytime, anywhere</li>
              </ul>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className={`w-full py-3 px-6 rounded-md font-semibold text-white ${
                processing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600"
              } duration-200`}
            >
              {processing ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Processing Payment...
                </>
              ) : (
                `Pay $${book.price} to Unlock`
              )}
            </button>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              * This is a demo payment. In production, integrate with Razorpay/Stripe.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;

