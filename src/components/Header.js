import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import courseService from '../services/courseService';
import './Header.css';

const companyLogo = '/images/company-logo.svg';
const keyboardArrowRight = '/images/keyboard_arrow_right.svg';

const buildCourseDropdownData = (payload) => {
  const rawCategories = Array.isArray(payload)
    ? payload
    : payload?.categories || payload?.items || payload?.data || [];

  const normalized = rawCategories
    .map((category) => {
      const name = String(
        category?.category ||
        category?.name ||
        category?.category_name ||
        category?.title ||
        category?.subject_area ||
        ''
      ).trim();

      if (!name) {
        return null;
      }

      const courses = Array.isArray(category?.courses) ? category.courses : [];
      const preview = courses
        .slice(0, 10)
        .map((course, index) => {
          const courseName = String(
            course?.name ||
            course?.title ||
            course?.course_name ||
            ''
          ).trim();

          if (!courseName) return null;

          return {
            id: String(course?.id || course?.course_id || `${name}-${index}`),
            name: courseName,
          };
        })
        .filter(Boolean);

      return { name, preview };
    })
    .filter(Boolean);

  const categories = normalized.map((item) => item.name);
  const previews = normalized.reduce((acc, item) => {
    acc[item.name] = item.preview;
    return acc;
  }, {});

  return { categories, previews };
};

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const [isLoadingCourseCategories, setIsLoadingCourseCategories] = useState(false);
  const [activeCourseCategory, setActiveCourseCategory] = useState('');
  const [courseCategories, setCourseCategories] = useState([]);
  const [coursePreviews, setCoursePreviews] = useState({});

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  const handleCoursesDropdownToggle = async () => {
    const isOpening = !showCoursesDropdown;
    setShowCoursesDropdown(isOpening);

    if (!isOpening) {
      return;
    }

    setIsLoadingCourseCategories(true);
    try {
      const payload = await courseService.getCourseCategories({
        is_active: true,
        include_courses: true,
        limit_per_category: 10,
      });

      const { categories, previews } = buildCourseDropdownData(payload);
      if (categories.length > 0) {
        setCourseCategories(categories);
        setCoursePreviews(previews);
        setActiveCourseCategory((previous) => (
          categories.includes(previous) ? previous : categories[0]
        ));
      }
    } catch (error) {
      console.error('Failed to fetch header course categories:', error);
    } finally {
      setIsLoadingCourseCategories(false);
    }
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
              onClick={handleCoursesDropdownToggle}
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
                      {isLoadingCourseCategories && courseCategories.length === 0 && (
                        <div className="courses-category-loading">Loading categories...</div>
                      )}
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
                        <h4>{activeCourseCategory || 'Courses'}</h4>
                        <button
                          className="courses-explore"
                          type="button"
                          onClick={() => {
                            setShowCoursesDropdown(false);
                            const params = new URLSearchParams();
                            if (activeCourseCategory) {
                              params.set('subject', activeCourseCategory);
                            }
                            navigate(`/courses${params.toString() ? `?${params.toString()}` : ''}`);
                          }}
                        >
                          Explore All
                        </button>
                      </div>
                      <ul className="courses-preview-list">
                        {isLoadingCourseCategories && <li>Loading courses...</li>}
                        {!isLoadingCourseCategories && (coursePreviews[activeCourseCategory] || []).map((course) => (
                          <li key={course.id}>
                            <button
                              type="button"
                              className="courses-preview-link"
                              onClick={() => {
                                const params = new URLSearchParams();
                                params.set('search', course.name);
                                setShowCoursesDropdown(false);
                                navigate(`/courses?${params.toString()}`);
                              }}
                            >
                              {course.name}
                            </button>
                          </li>
                        ))}
                        {!isLoadingCourseCategories && !!activeCourseCategory && (coursePreviews[activeCourseCategory] || []).length === 0 && (
                          <li>No courses found in this category.</li>
                        )}
                        {!isLoadingCourseCategories && !activeCourseCategory && (
                          <li>Select a category to view courses.</li>
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
