import React, { useState } from 'react';
import './PartnerUniversities.css';

const PartnerUniversities = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const universities = [
    'University of Arizona',
    'Charter Oak State College',
    'Columbia College',
    'Southeast Missouri',
    'TC Council University',
    'Graceland University',
    'PACE University',
    'NJCU',
    'Indiana Tech',
    'NJIT',
    'Ohio State',
    'Penn State',
    'SDSU'
  ];

  return (
    <section className="partner-universities">
      <div className="universities-container">
        <h2>Our <span className="highlight">Partner Universities</span></h2>
        
        <div className="search-bar">
          <input type="text" placeholder="Search your schools..." />
          <button className="btn-search-icon">🔍</button>
        </div>

        <div className="universities-grid">
          {universities.map((university, index) => (
            <div key={index} className="university-card">
              <div className="university-logo">
                {university.split(' ').map(word => word[0]).join('').slice(0, 3)}
              </div>
              <span className="university-name">{university}</span>
            </div>
          ))}
        </div>

        <div className="universities-footer">
          <p>Can't find your University?</p>
          <button className="btn-contact" onClick={() => setShowContactForm(true)}>Contact Now →</button>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }} onClick={() => setShowContactForm(false)}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '40px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '1.8rem' }}>Contact Us</h2>
                <button 
                  onClick={() => setShowContactForm(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >×</button>
              </div>
              
              <p style={{ color: '#666', marginBottom: '25px' }}>
                Can't find your university? Let us know and we'll work to add it to our partner network.
              </p>

              <form onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you! We will contact you soon.');
                setShowContactForm(false);
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    University Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your University"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                    Additional Message
                  </label>
                  <textarea
                    placeholder="Tell us more about your request..."
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '15px',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    style={{
                      flex: 1,
                      padding: '14px',
                      backgroundColor: '#f0f0f0',
                      color: '#333',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '14px',
                      backgroundColor: '#ff6b35',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnerUniversities;
