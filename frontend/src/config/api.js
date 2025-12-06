// API Configuration
// This file centralizes all API endpoints and base URL configuration

// Get the API base URL from environment variable or use default
// In production, Vercel will use the environment variable VITE_API_URL
// In development, it will fall back to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// API endpoints
export const API_ENDPOINTS = {
  // Book endpoints
  GET_ALL_BOOKS: `${API_BASE_URL}/book`,
  GET_BOOK_BY_ID: (id) => `${API_BASE_URL}/book/${id}`,
  CHECK_BOOK_ACCESS: (id) => `${API_BASE_URL}/book/${id}/check-access`,
  GET_BOOK_CONTENT: (id) => `${API_BASE_URL}/book/${id}/content`,
  GRANT_BOOK_ACCESS: `${API_BASE_URL}/book/grant-access`,
  
  // User endpoints
  USER_LOGIN: `${API_BASE_URL}/user/login`,
  USER_SIGNUP: `${API_BASE_URL}/user/signup`,
};

// Export the base URL for direct use if needed
export default API_BASE_URL;

