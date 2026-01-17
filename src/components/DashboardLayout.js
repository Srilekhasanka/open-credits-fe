import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiGrid, FiBookOpen, FiUsers, FiBarChart2, FiShoppingCart, FiLogOut, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import companyLogo from '../assets/company-logo.png';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: <FiGrid />, path: '/dashboard' },
    { label: 'My Courses', icon: <FiBookOpen />, path: '/my-courses' },
    { label: 'All Courses', icon: <FiBarChart2 />, path: '/courses' },
    { label: 'Affiliate', icon: <FiUsers />, path: '/resources' },
    { label: 'My Cart', icon: <FiShoppingCart />, path: '/shop' }
  ];

  return (
    <div className="dashboard">
      <aside className="dashboard__sidebar">
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
                onClick={() => navigate(item.path)}
                type="button"
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="dashboard__sidebar-footer">
          <button className="dashboard__nav-item dashboard__sidebar-action" type="button" onClick={() => navigate('/my-account')}>
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
