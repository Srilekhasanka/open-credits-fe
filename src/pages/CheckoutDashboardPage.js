import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart, FiInfo } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../components/DashboardLayout.css';

const CheckoutDashboardPage = () => {
  const { isAuthenticated, user, cartItems } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="dashboard__auth-cta">
        <div className="dashboard__auth-card">
          <h1>Please sign in to checkout</h1>
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

      <section className="checkout">
        <div className="checkout__header">
          <h2>Checkout</h2>
          <button className="checkout__back" type="button" onClick={() => navigate('/shop')}>
            Go Back to Cart
          </button>
        </div>

        <div className="checkout__card">
          <div className="checkout__form">
            <div className="checkout__form-header">
              <div className="checkout__badge">≡</div>
              <h3>Payment details</h3>
            </div>

            <label className="checkout__field">
              Name on Card <FiInfo />
              <input type="text" placeholder="" />
            </label>

            <label className="checkout__field">
              Billing Address <FiInfo />
              <input type="text" placeholder="" />
            </label>

            <label className="checkout__field checkout__field--accent">
              Card Number <FiInfo />
              <input type="text" placeholder="1 2 3 4   -   -   -   -" />
            </label>

            <div className="checkout__row">
              <label className="checkout__field">
                CCV <FiInfo />
                <input type="text" placeholder="---" />
              </label>
              <label className="checkout__field">
                Expiration Date <FiInfo />
                <input type="text" placeholder="MM / YY" />
              </label>
            </div>

            <button className="checkout__pay" type="button" onClick={() => navigate('/payment/status')}>
              Pay Now
            </button>
          </div>

          <div className="checkout__summary">
            <div className="checkout__summary-card">
              <div className="checkout__summary-header">
                <h4>Cart Details</h4>
              </div>
              <div className="checkout__summary-row">
                <span>Order Total</span>
                <span>1145823</span>
              </div>
              <div className="checkout__summary-row">
                <span>Discount</span>
                <span>%20</span>
              </div>
              <div className="checkout__summary-row">
                <span>Tax</span>
                <span>$123.28</span>
              </div>
              <div className="checkout__summary-row">
                <span>Total</span>
                <span>$123.28</span>
              </div>
            </div>

            <div className="checkout__summary-total">
              <div>
                <span>Total Amount</span>
                <strong>$576.32</strong>
              </div>
              <div className="checkout__doc" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutDashboardPage;
