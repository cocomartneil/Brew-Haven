import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu() {
  const coffeeItems = [
    {
      name: "Latte",
      price: "₱150",
      image: "https://www.drinksupercoffee.com/cdn/shop/articles/fae84ed5-a18c-4da8-95d8-d38d576fa3b1_latte_2a0c8c48-b26b-48a0-8079-f999ed9fa3fd.jpg?v=1746120400&width=2048",
      alt: "Latte"
    },
    {
      name: "Cappuccino", 
      price: "₱140",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9XAW2dKjfyKedMHS0RCpElyziMJxhllI6lw&s",
      alt: "Cappuccino"
    },
    {
      name: "Americano",
      price: "₱120", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS45G_1ozrE9F_T-SypEA4sF36UkFVgZe6gzA&s",
      alt: "Americano"
    }
  ];

  const nonCoffeeItems = [
    {
      name: "Hot Chocolate",
      price: "₱130",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnurlPAU_aWo5JU6M5OrP1aPhOjiPZkopKEw&s",
      alt: "Hot Chocolate"
    },
    {
      name: "Matcha Latte",
      price: "₱160",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGWtPrzyApvXV1So996Ps47hPNNVWepasLVQ&s", 
      alt: "Matcha Latte"
    },
    {
      name: "Chai Tea",
      price: "₱90",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcaq2qG1TY5Q-kA47PXe_zu9WoGHK60hMMiA&s",
      alt: "Chai Tea"
    }
  ];

  const pastryItems = [
    {
      name: "Croissant",
      price: "₱70",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1WSvxGW7cWoovgmg_f2EDI3gfAdPnCZ4-Ig&s",
      alt: "Croissant"
    },
    {
      name: "Blueberry Muffin",
      price: "₱85", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTruV-37quTOjX3lC3QZSkaIzc-6jvs8nzUQ&s",
      alt: "Muffin"
    },
    {
      name: "Cheesecake",
      price: "₱150",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd_0WyGPI3T7ghv6f8YPk1Xg1MiXzVgJVH-w&s",
      alt: "Cheesecake"
    }
  ];

  const MenuSection = ({ title, items }) => (
    <div className="menu-category">
      <h2 className="category-title">{title}</h2>
      <div className="items-grid">
        {items.map((item, index) => (
          <div key={index} className="menu-card">
            <img src={item.image} alt={item.alt} className="item-image" />
            <div className="item-info">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-price">{item.price}</p>
              <Link to={`/order/${encodeURIComponent(item.name)}`} className="order-link">
                <button className="order-btn">Order Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="menu-page">
      <MenuSection title="Coffee" items={coffeeItems} />
      <MenuSection title="Non-Coffee" items={nonCoffeeItems} />
      <MenuSection title="Pastries" items={pastryItems} />
    </div>
  );
}