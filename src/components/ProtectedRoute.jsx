import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  
  // Check if user is logged in (in a real app, this would check JWT token, session, etc.)
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isAuthenticated) {
    // Redirect to home page with a message about needing to login
    return <Navigate to="/" state={{ from: location.pathname, message: "Please login to access your account" }} replace />;
  }
  
  return children;
}
