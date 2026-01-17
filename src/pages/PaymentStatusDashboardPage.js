import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import companyLogo from '../assets/company-logo.png';
import '../components/DashboardLayout.css';

const PaymentStatusDashboardPage = () => {
  const { isAuthenticated, user, cartItems } = useAuth();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsSuccess(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="dashboard__auth-cta">
        <div className="dashboard__auth-card">
          <h1>Please sign in to view payment status</h1>
          <p>Sign in to complete your purchase.</p>
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
          <button className="dashboard__avatar" type="button" onClick={() => navigate('/my-account')}>
            {displayInitial}
          </button>
        </div>
      </header>

      <section className="payment-status">
        <div className="payment-status__header">
          <h2>PAyement</h2>
          <button className="checkout__back" type="button" onClick={() => navigate('/shop')}>
            Go Back to Cart
          </button>
        </div>

        <div className="payment-status__card">
          <div className="payment-status__brand">
            <img src={companyLogo} alt="Open Credits" className="payment-status__logo" />
            <span className="payment-status__brand-text">
              Open <strong>Credits</strong>
            </span>
          </div>
          <div className="payment-status__message">
            {isSuccess ? 'Payment Successful' : 'Payment loading'}
          </div>
          {isSuccess ? (
            <div className="payment-status__success" aria-label="Payment successful" />
          ) : (
            <div className="payment-status__spinner" aria-label="Payment loading" />
          )}
        </div>
      </section>
    </div>
  );
};

export default PaymentStatusDashboardPage;
