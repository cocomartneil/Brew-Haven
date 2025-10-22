import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mysqlDB from '../database/mysqlDB.js';

export default function Account(){
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const userId = localStorage.getItem('userId');
      setUserInfo({
        name: localStorage.getItem('userName') || 'User',
        email: localStorage.getItem('userEmail') || ''
      });
      
      // Load user orders
      loadUserOrders(userId);
    }
  }, []);

  const loadUserOrders = async (userId) => {
    try {
      const orders = await mysqlDB.getUserOrders(parseInt(userId));
      setUserOrders(orders);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const handleLogout = () => {
    navigate('/logout');
  };

  if (!isLoggedIn) {
    return (
      <section className="about">
        <h2>Please Login</h2>
        <p>You need to be logged in to access your account.</p>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/login" className="btn" style={{ marginRight: '10px' }}>
            Login
          </Link>
          <Link to="/register" className="btn" style={{ background: '#6d4c41' }}>
            Register
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="about">
      <h2>Welcome back, {userInfo.name}!</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#4b2e2b', marginBottom: '15px' }}>Account Information</h3>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
          <button 
            onClick={handleLogout}
            className="btn"
            style={{ marginTop: '15px', background: '#dc3545' }}
          >
            Logout
          </button>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#4b2e2b', marginBottom: '15px' }}>Recent Orders</h3>
          {userOrders.length > 0 ? (
            <div>
              {userOrders.slice(0, 3).map(order => (
                <div key={order.id} style={{
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  padding: '10px',
                  marginBottom: '10px',
                  fontSize: '0.9rem'
                }}>
                  <p><strong>{order.itemName}</strong> - {order.quantity}x ({order.size})</p>
                  <p>₱{order.totalPrice} - {order.status}</p>
                  <p style={{ color: '#666', fontSize: '0.8rem' }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {userOrders.length > 3 && (
                <p style={{ color: '#666', fontSize: '0.8rem' }}>
                  +{userOrders.length - 3} more orders
                </p>
              )}
            </div>
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No recent orders</p>
          )}
          <Link to="/menu" className="btn" style={{ marginTop: '15px', display: 'inline-block' }}>
            Browse Menu
          </Link>
        </div>

        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#4b2e2b', marginBottom: '15px' }}>Favorites</h3>
          <p style={{ color: '#666', fontStyle: 'italic' }}>No favorites saved yet</p>
          <Link to="/menu" className="btn" style={{ marginTop: '15px', display: 'inline-block' }}>
            Add Favorites
          </Link>
        </div>
      </div>
    </section>
  )
}
