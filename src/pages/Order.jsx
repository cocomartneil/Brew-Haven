import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import mysqlDB from '../database/mysqlDB.js';

export default function Order(){
  const { item } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('Regular');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const menuItems = {
    'Latte': { price: 150, description: 'Smooth espresso with steamed milk' },
    'Cappuccino': { price: 140, description: 'Perfect blend of espresso, steamed milk & foam' },
    'Americano': { price: 120, description: 'Rich espresso with hot water' },
    'Hot Chocolate': { price: 130, description: 'Rich and creamy hot chocolate' },
    'Matcha Latte': { price: 160, description: 'Premium matcha with steamed milk' },
    'Chai Tea': { price: 90, description: 'Spiced tea blend' },
    'Croissant': { price: 70, description: 'Buttery, flaky pastry' },
    'Muffin': { price: 85, description: 'Blueberry muffin' },
    'Cheesecake': { price: 150, description: 'Creamy New York style cheesecake' },
    'Espresso': { price: 100, description: 'Rich and bold shot of pure coffee bliss' },
    'Iced Latte': { price: 150, description: 'Chilled, creamy, and refreshingly smooth' },
    'Pumpkin Spice Latte': { price: 170, description: 'Seasonal favorite with warm spices' }
  };

  const currentItem = menuItems[item] || { price: 0, description: 'Item not found' };
  const totalPrice = currentItem.price * quantity;

  const handleOrder = async () => {
    try {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        alert('Please login to place an order.');
        return;
      }

      console.log('Order attempt:', {
        userId: userId,
        item: item,
        quantity: quantity,
        size: size,
        specialInstructions: specialInstructions
      });

      // Get menu item from database
      const menuItem = await mysqlDB.getMenuItemByName(item);
      console.log('Menu item from database:', menuItem);
      
      if (!menuItem) {
        alert('Item not found in menu.');
        return;
      }

      // Calculate total price
      let itemPrice = menuItem.price;
      if (size === 'Large') {
        itemPrice += 20;
      }
      const totalPrice = itemPrice * quantity;

      console.log('Order data being sent:', {
        userId: parseInt(userId),
        itemName: item,
        quantity: quantity,
        size: size,
        specialInstructions: specialInstructions,
        totalPrice: totalPrice
      });

      // Create order in database
      const order = await mysqlDB.createOrder({
        userId: parseInt(userId),
        itemName: item,
        quantity: quantity,
        size: size,
        specialInstructions: specialInstructions,
        totalPrice: totalPrice
      });

      console.log('Order response:', order);

      alert(`Order placed successfully! Order ID: ${order.id}\n${quantity}x ${item} (${size}) - Total: ₱${totalPrice}`);
      
      // Reset form
      setQuantity(1);
      setSize('Regular');
      setSpecialInstructions('');
      
    } catch (error) {
      console.error('Order error:', error);
      alert('Error placing order: ' + error.message);
    }
  };

  return (
    <section className="about">
      <h2>Order: {item}</h2>
      <p>{currentItem.description}</p>
      
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        margin: '20px auto'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Quantity:
          </label>
          <select 
            value={quantity} 
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '100%'
            }}
          >
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Size:
          </label>
          <select 
            value={size} 
            onChange={(e) => setSize(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '100%'
            }}
          >
            <option value="Small">Small (+₱0)</option>
            <option value="Regular">Regular (+₱0)</option>
            <option value="Large">Large (+₱20)</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
            Special Instructions:
          </label>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Any special requests?"
            rows="3"
            style={{
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '100%',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ 
          background: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#4b2e2b' }}>Order Summary</h3>
          <p style={{ margin: '5px 0' }}>{quantity}x {item} ({size})</p>
          <p style={{ margin: '5px 0' }}>Price per item: ₱{currentItem.price}</p>
          <p style={{ margin: '5px 0', fontWeight: 'bold', fontSize: '1.1rem' }}>
            Total: ₱{totalPrice}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button 
            onClick={handleOrder}
            className="btn"
            style={{ flex: 1 }}
          >
            Place Order
          </button>
          <Link to="/menu" className="btn" style={{ 
            textDecoration: 'none', 
            textAlign: 'center',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            Back to Menu
          </Link>
        </div>
      </div>
    </section>
  )
}
