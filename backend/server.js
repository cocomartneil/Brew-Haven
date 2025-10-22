const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

// Routes

// Register endpoint
app.post('/api/register.php', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    
    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }
    
    // Check if user already exists
    const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered.' });
    }
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Insert new user
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );
    
    const user = result.rows[0];
    
    res.json({
      success: true,
      message: 'User registered successfully.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// Login endpoint
app.post('/api/login.php', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    
    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    
    // Get user from database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    
    const user = result.rows[0];
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    
    res.json({
      success: true,
      message: 'Login successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// Contact endpoint
app.post('/api/contact.php', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    
    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    
    // Insert contact message
    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id',
      [name, email, message]
    );
    
    res.json({
      success: true,
      message: 'Message sent successfully.',
      contactId: result.rows[0].id
    });
    
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// Order endpoint
app.post('/api/order.php', async (req, res) => {
  try {
    const { userId, itemName, quantity, size, specialInstructions, totalPrice } = req.body;
    
    if (!userId || !itemName || quantity < 1 || totalPrice <= 0) {
      return res.status(400).json({ error: 'Invalid order data.' });
    }
    
    // Insert order
    const result = await pool.query(
      'INSERT INTO orders (user_id, item_name, quantity, size, special_instructions, total_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, created_at',
      [userId, itemName, quantity, size, specialInstructions, totalPrice]
    );
    
    const orderId = result.rows[0].id;
    const createdAt = result.rows[0].created_at;
    
    res.json({
      success: true,
      message: 'Order placed successfully.',
      order: {
        id: orderId,
        user_id: userId,
        item_name: itemName,
        quantity: quantity,
        size: size,
        special_instructions: specialInstructions,
        total_price: totalPrice,
        status: 'pending',
        created_at: createdAt
      }
    });
    
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// Get user orders endpoint
app.get('/api/orders.php', async (req, res) => {
  try {
    const userId = req.query.user_id;
    
    let query, params;
    if (userId) {
      query = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC';
      params = [userId];
    } else {
      query = 'SELECT * FROM orders ORDER BY created_at DESC';
      params = [];
    }
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      orders: result.rows
    });
    
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// Menu endpoint
app.get('/api/menu.php', async (req, res) => {
  try {
    const itemName = req.query.name;
    
    let query, params;
    if (itemName) {
      query = 'SELECT * FROM menu_items WHERE name = $1';
      params = [itemName];
    } else {
      query = 'SELECT * FROM menu_items ORDER BY category, name';
      params = [];
    }
    
    const result = await pool.query(query, params);
    
    if (itemName) {
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Menu item not found.' });
      }
      res.json({
        success: true,
        item: result.rows[0]
      });
    } else {
      res.json({
        success: true,
        items: result.rows
      });
    }
    
  } catch (error) {
    console.error('Menu error:', error);
    res.status(500).json({ error: 'Database error: ' + error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Brew Haven API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
