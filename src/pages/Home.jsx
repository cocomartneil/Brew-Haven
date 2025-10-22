import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <main>
      <section className="hero">
        <h1 className="fade-in">Wake Up & Smell the Coffee</h1>
        <p className="fade-in">Serving freshly brewed happiness since 2025.</p>
        <Link to="/menu" className="btn fade-in">View Menu</Link>
      </section>
      
      <section className="menu-preview">
        <h2>Our Favorites</h2>
        <div className="menu-items">
          <div className="item fade-in">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG"
              alt="Espresso"
              loading="lazy" />
            <h3>Espresso</h3>
            <p>Rich and bold shot of pure coffee bliss.</p>
            <Link to="/order/Espresso">
              <button className="order-button">Order Now</button>
            </Link>
          </div>
          <div className="item fade-in">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9XAW2dKjfyKedMHS0RCpElyziMJxhllI6lw&s"
              alt="Cappuccino" />
            <h3>Cappuccino</h3>
            <p>Perfect blend of espresso, steamed milk & foam.</p>
            <Link to="/order/Cappuccino">
              <button className="order-button">Order Now</button>
            </Link>
          </div>
          <div className="item fade-in">
            <img
              src="https://images.ctfassets.net/v601h1fyjgba/71VWCR6Oclk14tsdM9gTyM/6921cc6b21746f62846c99fa6a872c35/Iced_Latte.jpg"
              alt="Iced Latte" />
            <h3>Iced Latte</h3>
            <p>Chilled, creamy, and refreshingly smooth.</p>
            <Link to="/order/Iced%20Latte">
              <button className="order-button">Order Now</button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="specials">
        <h2>Special of the Month</h2>
        <div className="special-card fade-in">
          <img
            src="https://www.munchkintime.com/wp-content/uploads/2024/09/Best-Pumpkin-Spice-Latte-Recipe-with-Coffee-11.jpg"
            alt="Pumpkin Spice Latte" />
          <div>
            <h3>Pumpkin Spice Latte</h3>
            <p>
              A seasonal favorite with warm spices and creamy goodness. Available
              hot or iced.
            </p>
            <Link to="/order/Pumpkin%20Spice%20Latte">
              <button className="order-button">Order Now</button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial fade-in">
            <p>
              "Brew Haven has the coziest atmosphere and the friendliest baristas.
              The coffee is top notch!"
            </p>
            <span>- Jhanes H.</span>
          </div>
          <div className="testimonial fade-in">
            <p>
              "I come here every morning before work. Their cappuccino is simply
              the best in town."
            </p>
            <span>- Jayson R.</span>
          </div>
          <div className="testimonial fade-in">
            <p>
              "Perfect place to relax, read a book, and enjoy a pastry with my
              coffee."
            </p>
            <span>- Rouel M.</span>
          </div>
        </div>
      </section>
    </main>
  )
}
