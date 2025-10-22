import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all user data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    // Show logout message briefly, then redirect
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }, [navigate]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Logging Out...</h2>
        <div className="success-message">
          You have been successfully logged out. Redirecting to home page...
        </div>
      </div>
    </div>
  );
}
