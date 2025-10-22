import React, { useState } from 'react';
import mysqlDB from '../database/mysqlDB.js';

export default function Contact(){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required.');
      return;
    }
    
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      // Save contact message to database
      await mysqlDB.saveContact({
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('There was an error sending your message. Please try again.');
    }
  };

  return (
    <section className="about">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Fill out the form below:</p>
      
      {error && (
        <div className="error-message" style={{color: 'red', marginBottom: '20px'}}>
          {error}
        </div>
      )}
      
      {isSubmitted && (
        <div className="success-message" style={{color: 'green', marginBottom: '20px'}}>
          Thank you! Your message has been sent successfully.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn">Send Message</button>
      </form>
      
      <div style={{marginTop: '40px', textAlign: 'center'}}>
        <h3>Visit Us</h3>
        <p>123 Coffee Street<br />
        Brew City, BC 12345<br />
        Phone: (555) 123-BREW</p>
        <p>Hours: Monday - Friday: 6:00 AM - 8:00 PM<br />
        Saturday - Sunday: 7:00 AM - 9:00 PM</p>
      </div>
    </section>
  )
}
