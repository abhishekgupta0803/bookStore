import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { API_ENDPOINTS } from "../config/api";

const BookReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [authUser] = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authUser || !authUser._id) {
      toast.error("Please login to read books");
      navigate("/signup");
      return;
    }
    fetchBookContent();
  }, [id, authUser]);

  const fetchBookContent = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        API_ENDPOINTS.GET_BOOK_CONTENT(id),
        { userId: authUser._id }
      );
      
      if (res.data.book && res.data.book.content) {
        setBook(res.data.book);
        setError(null);
      } else {
        setError("Book content is not available yet.");
        toast.error("Content is being generated. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching book:", error);
      if (error.response?.status === 403) {
        const errorData = error.response.data;
        setError(errorData.message || "Purchase Required. Please purchase this book to read.");
        toast.error(errorData.message || "Purchase required to read this book");
        // Show purchase prompt
        setTimeout(() => {
          navigate(`/book/${id}/payment`);
        }, 2000);
      } else if (error.response?.status === 401) {
        setError("Please login to read books");
        toast.error("Please login to read books");
        navigate("/signup");
      } else {
        setError("Failed to load book content");
        toast.error("Failed to load book");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center dark:bg-slate-900">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="mt-4 dark:text-white">Loading book...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error && !book) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center dark:bg-slate-900">
          <div className="text-center">
            <p className="text-red-500 text-xl mb-4">{error}</p>
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
        <div className="max-w-4xl container mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/courses")}
            className="mb-6 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Courses
          </button>
          
          {book && (
            <>
              <h1 className="text-4xl font-bold mb-4 dark:text-white">
                {book.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {book.title}
              </p>
              
              <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
                <div className="book-content">
                  {book.content ? (
                    <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                      {book.content.split('\n').map((line, index) => {
                        // Format headings
                        if (line.startsWith('# ')) {
                          return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 dark:text-white">{line.substring(2)}</h1>;
                        }
                        if (line.startsWith('## ')) {
                          return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 dark:text-white">{line.substring(3)}</h2>;
                        }
                        if (line.startsWith('### ')) {
                          return <h3 key={index} className="text-xl font-bold mt-4 mb-2 dark:text-white">{line.substring(4)}</h3>;
                        }
                        // Format bold text
                        if (line.includes('**')) {
                          const parts = line.split('**');
                          return (
                            <p key={index} className="mb-4">
                              {parts.map((part, i) => 
                                i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                              )}
                            </p>
                          );
                        }
                        // Format italic text
                        if (line.includes('*') && !line.startsWith('*')) {
                          const parts = line.split('*');
                          return (
                            <p key={index} className="mb-4">
                              {parts.map((part, i) => 
                                i % 2 === 1 ? <em key={i}>{part}</em> : part
                              )}
                            </p>
                          );
                        }
                        // Regular paragraphs
                        if (line.trim() === '') {
                          return <br key={index} />;
                        }
                        return <p key={index} className="mb-4">{line}</p>;
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No content available for this book.</p>
                  )}
                </div>
                <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    End of {book.name}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookReader;

