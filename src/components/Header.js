import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="logo-icon">⚬⚬</span>
          <span className="logo-text">Open Credits</span>
        </Link>
        
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/find-my-college">Find My College</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/financing">Financing</Link>
          <Link to="/resources">Resources</Link>
        </nav>

        <div className="header-actions">
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#ff6b35',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                title={`${user?.email}`}
              >
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              
              {showDropdown && (
                <>
                  <div 
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 999
                    }}
                    onClick={() => setShowDropdown(false)}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '55px',
                    right: '0',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    minWidth: '200px',
                    zIndex: 1000,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      padding: '15px 20px',
                      borderBottom: '1px solid #f0f0f0',
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      {user?.email}
                    </div>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        navigate('/profile');
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 20px',
                        border: 'none',
                        background: 'white',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#333',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f8f8'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      👤 Profile Details
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        navigate('/my-courses');
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 20px',
                        border: 'none',
                        background: 'white',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#333',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f8f8'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      📚 My Courses
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        // Add settings navigation if needed
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 20px',
                        border: 'none',
                        background: 'white',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#333',
                        transition: 'background-color 0.2s',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f8f8'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      ⚙️ Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '12px 20px',
                        border: 'none',
                        background: 'white',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#ff6b35',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#fff5f0'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      🚪 Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <button className="btn-signin" onClick={() => navigate('/signin')}>Sign In</button>
              <button className="btn-primary" onClick={() => navigate('/get-started')}>Get Started</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
