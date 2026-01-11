import React, { useState } from 'react';
import '../App.css';

const FindMyCollegePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);

  const universities = [
    { name: 'Bottega University', logo: 'bottega', color: '#FF6633', hasLogo: true },
    { name: 'Charter Oak State College', logo: 'charteroak', color: '#2E5A3C', hasLogo: true },
    { name: 'Columbia Southern University', logo: 'columbia', color: '#1E3A5F', hasLogo: true },
    { name: 'Crestpoint University', logo: 'crestpoint', color: '#4A4A4A', hasLogo: true },
    { name: 'Dunlap-Stone University', logo: 'dunlap', color: '#1E4D6B', hasLogo: true },
    { name: 'EC-Council University', logo: 'eccouncil', color: '#C41E3A', hasLogo: true },
    { name: 'Graceland University', logo: 'graceland', color: '#1E3A5F', hasLogo: true },
    { name: 'PACE University', logo: 'pace', color: '#003366', hasLogo: true },
    { name: 'NJCU', logo: 'njcu', color: '#003366', hasLogo: true },
    { name: 'Indiana Tech', logo: 'indiana', color: '#FF6633', hasLogo: true },
    { name: 'NJIT', logo: 'njit', color: '#D32F2F', hasLogo: true },
    { name: 'The Ohio State University', logo: 'osu', color: '#BB0000', hasLogo: true },
    { name: 'Penn State', logo: 'pennstate', color: '#1E407C', hasLogo: true },
    { name: 'San Diego State University', logo: 'sdsu', color: '#A6192E', hasLogo: true },
  ];

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-content" style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '15px', color: '#333', fontWeight: '700' }}>
            Find Your College
          </h1>
          <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6', maxWidth: '800px' }}>
            Open Credits has sent transcripts to over 1,500 colleges and universities. If your university is with the American Council on Education (ACE) or National College Credit Recommendation Service (NCCRS), or accepts transcripts from a four-year university for credit review.
          </p>
        </div>

        {/* Universities Section */}
        <div style={{
          backgroundColor: '#fafafa',
          borderRadius: '12px',
          padding: '40px',
          marginBottom: '40px'
        }}>
          {/* Search */}
          <div style={{ maxWidth: '400px', margin: '0 auto 40px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search your college"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 16px',
                  fontSize: '14px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  outline: 'none',
                  backgroundColor: 'white'
                }}
              />
              <span style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999'
              }}>
                🔍
              </span>
            </div>
          </div>

          {/* Universities Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {filteredUniversities.map((university, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '25px 15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '80px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
                }}
              >
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: university.color,
                  textAlign: 'center'
                }}>
                  {university.name}
                </span>
              </div>
            ))}
          </div>

          {/* Can't Find Section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            paddingTop: '30px',
            borderTop: '1px solid #e0e0e0'
          }}>
            <span style={{ fontSize: '15px', color: '#333' }}>
              Can't find your University?
            </span>
            <button
              onClick={() => setShowContactForm(true)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#FF6633',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e55522'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FF6633'}
            >
              Talk to an Advisor
            </button>
          </div>
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
    </div>
  );
};

export default FindMyCollegePage;
