import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../components/DashboardLayout.css';

const MyAccountDashboardPage = () => {
  const { isAuthenticated, user, cartItems } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');

  if (!isAuthenticated) {
    return (
      <div className="dashboard__auth-cta">
        <div className="dashboard__auth-card">
          <h1>Please sign in to view your account</h1>
          <p>Sign in to manage your profile details.</p>
          <button onClick={() => navigate('/signin')}>Sign In</button>
        </div>
      </div>
    );
  }

  const displayName = user?.email ? user.email.split('@')[0] : 'Student';
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
  const displayInitial = formattedName.charAt(0);

  return (
    <div className="dashboard__main">
      <header className="dashboard__topbar">
        <div className="dashboard__welcome">
          <h1>
            Welcome back, <span>{formattedName}!</span>
          </h1>
        </div>
        <div className="dashboard__topbar-actions">
          <div className="dashboard__search">
            <input type="text" placeholder="Search Courses" aria-label="Search courses" />
            <FiSearch />
          </div>
          <button className="dashboard__icon-btn dashboard__icon-btn--cart" type="button" aria-label="Cart" onClick={() => navigate('/shop')}>
            <FiShoppingCart />
            {cartItems.length > 0 && <span className="dashboard__cart-badge">{cartItems.length}</span>}
          </button>
          <button className="dashboard__icon-btn" type="button" aria-label="Notifications">
            <FiBell />
          </button>
          <button className="dashboard__avatar" type="button" onClick={() => navigate('/profile')}>
            {displayInitial}
          </button>
        </div>
      </header>

      <section className="account">
        <h2>My Account</h2>
        <div className="account__layout">
          <div className="account__menu">
            <button
              className={`account__menu-item ${activeTab === 'profile' ? 'account__menu-item--active' : ''}`}
              type="button"
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`account__menu-item ${activeTab === 'certificates' ? 'account__menu-item--active' : ''}`}
              type="button"
              onClick={() => setActiveTab('certificates')}
            >
              Certificates
            </button>
            <button
              className={`account__menu-item ${activeTab === 'billing' ? 'account__menu-item--active' : ''}`}
              type="button"
              onClick={() => setActiveTab('billing')}
            >
              Billing
            </button>
          </div>

          {activeTab === 'profile' && (
            <div className="account__form">
              <div className="account__row">
                <label>
                  Name
                  <input type="text" placeholder="First Name" />
                </label>
                <label>
                  <span className="account__label-spacer" aria-hidden="true" />
                  <input type="text" placeholder="Last Name" />
                </label>
              </div>
              <div className="account__row">
                <label>
                  Email
                  <input type="email" placeholder="First Name" />
                </label>
                <label>
                  Phone
                  <input type="text" placeholder="First Name" />
                </label>
              </div>
              <label>
                Company
                <input type="text" placeholder="First Name" />
              </label>
              <label>
                Professional Title
                <input type="text" placeholder="First Name" />
              </label>
              <label>
                University name
                <input type="text" placeholder="First Name" />
              </label>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="account__empty">
              There are no certificates available for view.
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="billing">
              <div className="billing__form">
                <label className="billing__field">
                  Name on Card <span aria-hidden="true">&#9432;</span>
                  <input type="text" placeholder="" />
                </label>
                <label className="billing__field">
                  Billing Address <span aria-hidden="true">&#9432;</span>
                  <input type="text" placeholder="" />
                </label>
                <label className="billing__field billing__field--accent">
                  Card Number <span aria-hidden="true">&#9432;</span>
                  <input type="text" placeholder="1 2 3 4   -   -   -   -" />
                </label>
                <div className="billing__row">
                  <label className="billing__field">
                    CCV <span aria-hidden="true">&#9432;</span>
                    <input type="text" placeholder="---" />
                  </label>
                  <label className="billing__field">
                    Expiration Date <span aria-hidden="true">&#9432;</span>
                    <input type="text" placeholder="MM / YY" />
                  </label>
                </div>
              </div>
              <div className="billing__history">
                <h4>Order History</h4>
                {['Course name', 'Course name', 'Course name', 'Course name'].map((item, index) => (
                  <div key={`${item}-${index}`} className="billing__history-card">
                    <div>
                      <div className="billing__history-title">{item}</div>
                      <div className="billing__history-date">Date purchased:</div>
                    </div>
                    <div className="billing__history-price">$433</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyAccountDashboardPage;
