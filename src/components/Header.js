import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const companyLogo = '/images/company-logo.svg';
const keyboardArrowRight = '/images/keyboard_arrow_right.svg';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const [activeCourseCategory, setActiveCourseCategory] = useState('Psychology');

  const courseCategories = [
    'Maths',
    'Science',
    'Computer Science',
    'Business',
    'Finance',
    'Economics',
    'Psychology',
    'Health',
    'Literature',
    'Free/Life Skill'
  ];

  const coursePreviews = {
    Psychology: [
      'PSY 111: Research Methods in Psychology',
      'PSY 112: Psychology of Diversity',
      'PSY 120: Educational Psychology',
      'PSY 180: Abnormal Psychology',
      'PSY 300: Psychology of Personality',
      'PSY 310: Advanced Social Psychology',
      'Bachelors in Healthcare management & Psychology',
      'PSY 110: Introduction to Psychology',
      'Philosophy 200: Principles of Philosophy'
    ]
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={companyLogo} alt="Open Credits" className="logo-image" />
          <span className="logo-text">Open Credits</span>
        </Link>
        
        <nav className="nav">
          <div className="nav-item">
            <button
              className="nav-button"
              type="button"
              onClick={() => setShowCoursesDropdown((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={showCoursesDropdown}
            >
              Courses{' '}
              <img
                className="nav-caret"
                src={keyboardArrowRight}
                alt=""
                aria-hidden="true"
              />
            </button>
            {showCoursesDropdown && (
              <>
                <div
                  className="nav-backdrop"
                  onClick={() => setShowCoursesDropdown(false)}
                />
                <div className="courses-dropdown" role="menu">
                  <div className="courses-dropdown-grid">
                    <div className="courses-dropdown-left">
                      {courseCategories.map((category) => (
                        <button
                          key={category}
                          type="button"
                          className={`courses-category ${activeCourseCategory === category ? 'is-active' : ''}`}
                          onClick={() => setActiveCourseCategory(category)}
                        >
                          <span>{category}</span>
                          <img
                            className="courses-category-caret"
                            src={keyboardArrowRight}
                            alt=""
                            aria-hidden="true"
                          />
                        </button>
                      ))}
                    </div>
                    <div className="courses-dropdown-right">
                      <div className="courses-dropdown-header">
                        <h4>{activeCourseCategory}</h4>
                        <button
                          className="courses-explore"
                          type="button"
                          onClick={() => {
                            setShowCoursesDropdown(false);
                            navigate('/courses');
                          }}
                        >
                          Explore All
                        </button>
                      </div>
                      <ul className="courses-preview-list">
                        {(coursePreviews[activeCourseCategory] || []).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                        {!coursePreviews[activeCourseCategory] && (
                          <li>Explore all courses in this subject.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <Link to="/find-my-college">Find My College</Link>
          <Link to="/enroll">Enroll</Link>
          <Link to="/how-it-works">Partnership</Link>
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
                        navigate('/my-account');
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
              <button className="btn-outline" onClick={() => navigate('/get-started')}>Book Call</button>
              <button className="btn-primary" onClick={() => navigate('/signin')}>Sign In</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
