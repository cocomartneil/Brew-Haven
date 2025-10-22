import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      setUserName(localStorage.getItem('userName') || 'User');
    }
  }, []);

  return (
    <header>
      <div className="logo">Brew Haven</div>
      <nav>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
          About
        </NavLink>
        <NavLink to="/menu" className={({ isActive }) => isActive ? 'active' : ''}>
          Menu
        </NavLink>
        <NavLink to="/locations" className={({ isActive }) => isActive ? 'active' : ''}>
          Locations
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
          Contact
        </NavLink>
        
        {isLoggedIn ? (
          <NavLink to="/account" className="login-btn">
            {userName}
          </NavLink>
        ) : (
          <NavLink to="/login" className="login-btn">
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}