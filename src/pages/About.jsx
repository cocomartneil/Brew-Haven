import React from 'react';

export default function About(){
  return (
    <div>
      <section className="about">
        <h2>About Brew Haven</h2>
        <p>
          Welcome to Brew Haven, where every cup tells a story. Since 2025, we've been dedicated to 
          serving the finest coffee and creating memorable experiences for our community. Our passion 
          for quality coffee, warm hospitality, and cozy atmosphere has made us a beloved destination 
          for coffee lovers.
        </p>
        <p>
          We source our beans from sustainable farms around the world, ensuring every sip delivers 
          exceptional flavor and quality. Our skilled baristas craft each drink with precision and care, 
          making every visit to Brew Haven a special moment in your day.
        </p>
      </section>

      <section className="about-extra">
        <div>
          <h3>Our Mission</h3>
          <p>
            To create a welcoming space where people can enjoy exceptional coffee, connect with others, 
            and find comfort in every cup we serve.
          </p>
        </div>
        <div>
          <h3>Our Vision</h3>
          <p>
            To be the heart of our community, fostering connections and spreading joy through the 
            universal language of great coffee.
          </p>
        </div>
        <div>
          <h3>Our Values</h3>
          <p>
            Quality, sustainability, community, and hospitality are the core values that guide 
            everything we do at Brew Haven.
          </p>
        </div>
      </section>

      <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" alt="Alex Johnson" />
            <h3>Alex Johnson</h3>
            <p>Head Barista & Coffee Expert</p>
          </div>
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" alt="Sarah Chen" />
            <h3>Sarah Chen</h3>
            <p>Store Manager</p>
          </div>
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" alt="Mike Rodriguez" />
            <h3>Mike Rodriguez</h3>
            <p>Pastry Chef</p>
          </div>
        </div>
      </section>
    </div>
  )
}
