import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mysqlDB from '../database/mysqlDB.js';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      // Use the MySQL database for login
      const response = await mysqlDB.loginUser(formData.email, formData.password);
      
      if (response.success) {
        // Store user data in localStorage for session management
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', response.user.id.toString());
        localStorage.setItem('userName', response.user.name);
        localStorage.setItem('userEmail', response.user.email);
        
        setSuccess(`Welcome back, ${response.user.name}! You have successfully logged in.`);
        
        // Redirect to home page after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError(response.error || 'Login failed.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login to Brew Haven</h2>
        
        {success && (
          <div className="success-message">{success}</div>
        )}
        
        {error && (
          <div className="error-message">{error}</div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p className="auth-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
        
        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: admin@brewhaven.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
}
