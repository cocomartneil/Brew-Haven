import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(){
  return (
    <section className="about">
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <p>Let's get you back to enjoying some great coffee!</p>
      <Link to="/" className="btn">Back to Home</Link>
    </section>
  )
}
