import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiGrid, FiBookOpen, FiUsers, FiBarChart2, FiShoppingCart, FiLogOut, FiChevronRight, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './DashboardLayout.css';

const companyLogo = '/images/company-logo.svg';

const DashboardLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 820) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleNav = useCallback((path) => {
    navigate(path);
    setMobileMenuOpen(false);
  }, [navigate]);

  const navItems = [
    { label: 'Dashboard', icon: <FiGrid />, path: '/dashboard' },
    { label: 'My Courses', icon: <FiBookOpen />, path: '/my-courses' },
    { label: 'All Courses', icon: <FiBarChart2 />, path: '/courses' },
    { label: 'Affiliate', icon: <FiUsers />, path: '/resources' },
    { label: 'My Cart', icon: <FiShoppingCart />, path: '/shop' }
  ];

  return (
    <div className="dashboard">
      {/* Mobile header bar */}
      <div className="dashboard__mobile-header">
        <button
          className="dashboard__hamburger"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        <Link to="/dashboard" className="dashboard__brand dashboard__brand--mobile">
          <img src={companyLogo} alt="Open Credits" />
          <span className="dashboard__brand-text">
            Open <strong>Credits</strong>
          </span>
        </Link>
      </div>

      {/* Overlay backdrop */}
      {mobileMenuOpen && (
        <div
          className="dashboard__overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`dashboard__sidebar ${mobileMenuOpen ? 'is-open' : ''}`}>
        <Link to="/dashboard" className="dashboard__brand">
          <img src={companyLogo} alt="Open Credits" />
          <span className="dashboard__brand-text">
            Open <strong>Credits</strong>
          </span>
        </Link>
        <nav className="dashboard__nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.label}
                className={`dashboard__nav-item ${isActive ? 'is-active' : ''}`}
                onClick={() => handleNav(item.path)}
                type="button"
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="dashboard__sidebar-footer">
          <button className="dashboard__nav-item dashboard__sidebar-action" type="button" onClick={() => handleNav('/my-account')}>
            <FiChevronRight />
            My Account
          </button>
          <button
            className="dashboard__nav-item dashboard__sidebar-action dashboard__sidebar-action--primary"
            type="button"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            <FiLogOut />
            Sign out
          </button>
        </div>
      </aside>
      <div className="dashboard__page">{children}</div>
    </div>
  );
};

export default DashboardLayout;
