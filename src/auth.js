// auth.js

// Set the token in localStorage
export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

// Get the token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Clear the token from localStorage
export const clearAuthToken = () => {
  localStorage.removeItem("token");
};
