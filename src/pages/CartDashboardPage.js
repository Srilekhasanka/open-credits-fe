import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/constants';
import '../components/DashboardLayout.css';

const CartDashboardPage = () => {
  const { isAuthenticated, user, cartItems, removeFromCart } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="dashboard__auth-cta">
        <div className="dashboard__auth-card">
          <h1>Please sign in to view your cart</h1>
          <p>Sign in to manage items in your cart.</p>
          <button onClick={() => navigate('/signin')}>Sign In</button>
        </div>
      </div>
    );
  }

  const displayName = user?.email ? user.email.split('@')[0] : 'Student';
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
  const displayInitial = formattedName.charAt(0);

  const items = cartItems;
  const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const primaryCourseId = items[0]?.course_id ?? items[0]?.id ?? items[0]?._id;

  const handleCheckout = async () => {
    if (!primaryCourseId) {
      setCheckoutError('Unable to start checkout. Please select a course.');
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError('');
    try {
      const intentResponse = await apiService.post(API_ENDPOINTS.PAYMENT.INTENT, {
        course_id: primaryCourseId
      });
      const paymentIntent = intentResponse?.payload;
      if (!paymentIntent?.client_secret) {
        setCheckoutError('Checkout failed. Payment intent missing.');
        return;
      }
      sessionStorage.setItem('oc_payment_intent', JSON.stringify(paymentIntent));
      navigate('/payment', { state: { paymentIntent } });
    } catch (error) {
      setCheckoutError('Checkout failed. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

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

      <section className="cart">
        <h2>My Cart</h2>
        <div className="cart__list">
          {items.length === 0 ? (
            <div className="cart__empty">Your cart is empty.</div>
          ) : (
            items.map((item) => {
              const title = item.name && item.code ? `${item.code}: ${item.name}` : item.name;
              return (
                <div key={item.id} className="cart__item">
                  <div className="cart__item-icon">ACC</div>
                  <div className="cart__item-content">
                    <div className="cart__item-title">{title}</div>
                    <div className="cart__item-desc">{item.description}</div>
                    <button
                      className="cart__remove"
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="cart__price">${item.price}</div>
                </div>
              );
            })
          )}
        </div>

        <div className="cart__summary">
          <div className="cart__summary-left">
            <strong>Total</strong>
          </div>
          <div className="cart__summary-right">
            <div className="cart__total">${total}</div>
            <div className="cart__note">Add 2 more courses to save with bundles</div>
          </div>
          <button
            className="cart__checkout"
            type="button"
            onClick={handleCheckout}
            disabled={isCheckingOut || items.length === 0}
          >
            {isCheckingOut ? 'Processing...' : 'Checkout'}
          </button>
        </div>
        {checkoutError && <div className="cart__error">{checkoutError}</div>}
      </section>
    </div>
  );
};

export default CartDashboardPage;
