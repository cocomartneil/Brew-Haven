import React from 'react';

export default function Locations(){
  const locations = [
    {
      id: 1,
      name: "Downtown Location",
      address: "123 Coffee Street, Downtown",
      city: "Brew City, BC 12345",
      phone: "(555) 123-BREW",
      hours: "Mon-Fri: 6:00 AM - 8:00 PM\nSat-Sun: 7:00 AM - 9:00 PM",
      features: ["Free WiFi", "Outdoor Seating", "Drive-Thru", "Pet Friendly"],
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Mall Branch",
      address: "456 Shopping Center, Level 2",
      city: "Brew City, BC 12345",
      phone: "(555) 456-BREW",
      hours: "Mon-Sun: 8:00 AM - 10:00 PM",
      features: ["Mall Access", "Free WiFi", "Quick Service"],
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "University Campus",
      address: "789 Student Plaza, University District",
      city: "Brew City, BC 12345",
      phone: "(555) 789-BREW",
      hours: "Mon-Fri: 7:00 AM - 11:00 PM\nSat-Sun: 8:00 AM - 10:00 PM",
      features: ["Student Discounts", "Study Areas", "Free WiFi", "Late Hours"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div>
      <section className="about">
        <h2>Our Locations</h2>
        <p>
          Find us at three convenient locations throughout Brew City. Each location offers 
          the same great coffee and atmosphere, but with unique features to serve our 
          diverse community.
        </p>
      </section>

      <section className="locations-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '30px',
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {locations.map(location => (
          <div key={location.id} className="location-card" style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease'
          }}>
            <img 
              src={location.image} 
              alt={location.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover'
              }}
            />
            <div style={{ padding: '20px' }}>
              <h3 style={{ 
                color: '#4b2e2b', 
                marginBottom: '10px',
                fontSize: '1.3rem'
              }}>
                {location.name}
              </h3>
              
              <div style={{ marginBottom: '15px' }}>
                <p style={{ margin: '5px 0', fontWeight: '500' }}>
                  📍 {location.address}
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  {location.city}
                </p>
                <p style={{ margin: '5px 0' }}>
                  📞 {location.phone}
                </p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ 
                  color: '#4b2e2b', 
                  marginBottom: '8px',
                  fontSize: '1rem'
                }}>
                  Hours:
                </h4>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#666',
                  whiteSpace: 'pre-line'
                }}>
                  {location.hours}
                </p>
              </div>

              <div>
                <h4 style={{ 
                  color: '#4b2e2b', 
                  marginBottom: '8px',
                  fontSize: '1rem'
                }}>
                  Features:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {location.features.map((feature, index) => (
                    <span key={index} style={{
                      background: '#ffcc80',
                      color: '#4b2e2b',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="newsletter" style={{
        background: '#ffecb3',
        padding: '40px 20px',
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <h2>Stay Updated</h2>
        <p>Get notified about new locations and special offers!</p>
        <form style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '15px',
          flexWrap: 'wrap'
        }}>
          <input 
            type="email" 
            placeholder="Enter your email"
            style={{
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              width: '250px',
              fontSize: '1rem'
            }}
          />
          <button 
            type="submit"
            style={{
              background: '#4e342e',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  )
}