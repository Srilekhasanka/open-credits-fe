import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/constants';
import '../components/DashboardLayout.css';

const businessIcon = '/images/Business.svg';
const computerIcon = '/images/Computer.svg';
const healthIcon = '/images/Health.svg';
const lawIcon = '/images/Law.svg';
const psychologyIcon = '/images/Psychology.svg';
const scienceIcon = '/images/Science.svg';
const literatureIcon = '/images/Literature.svg';
const financeIcon = '/images/Finance.svg';
const generalIcon = '/images/General.svg';
const economyIcon = '/images/Economy.svg';
const mathIcon = '/images/Math.svg';

const subjectIcons = {
  business: businessIcon,
  'computer science': computerIcon,
  computerscience: computerIcon,
  health: healthIcon,
  healthcare: healthIcon,
  law: lawIcon,
  lawandjustice: lawIcon,
  psychology: psychologyIcon,
  science: scienceIcon,
  literature: literatureIcon,
  finance: financeIcon,
  finances: financeIcon,
  general: generalIcon,
  economics: economyIcon,
  economy: economyIcon,
  math: mathIcon
};

const prefixToSubject = {
  bus: 'business',
  acc: 'business',
  law: 'law',
  psy: 'psychology',
  bio: 'science',
  chem: 'science',
  math: 'math',
  cs: 'computer science'
};

const getSubjectIcon = (course) => {
  const rawSubject =
    course?.subject ||
    course?.subject_area ||
    course?.category ||
    course?.discipline ||
    '';
  const normalized = rawSubject.toLowerCase().replace(/\s+/g, '');
  const spaced = rawSubject.toLowerCase();
  if (subjectIcons[normalized] || subjectIcons[spaced]) {
    return subjectIcons[normalized] || subjectIcons[spaced];
  }
  const codePrefix = (course?.code || '').split(' ')[0].toLowerCase();
  const fallbackKey = prefixToSubject[codePrefix];
  return fallbackKey ? subjectIcons[fallbackKey] : null;
};

const CartDashboardPage = () => {
  const { isAuthenticated, user, cartItems, removeFromCart, clearCart, enrollCourse } = useAuth();
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
  const freeItems = items.filter((item) => Number(item.price || 0) === 0);
  const paidItems = items.filter((item) => Number(item.price || 0) > 0);
  const paidCourseId = paidItems[0]?.course_id ?? paidItems[0]?.id ?? paidItems[0]?._id;

  const enrollFreeItems = async () => {
    const failed = [];
    for (const item of freeItems) {
      const courseId = item.course_id ?? item.id ?? item._id;
      try {
        await apiService.post(API_ENDPOINTS.ENROLLMENTS.COURSES, { course_id: courseId });
        enrollCourse(item);
        removeFromCart(item.id);
      } catch (err) {
        failed.push(item.name || item.code || 'Unknown course');
      }
    }
    return failed;
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      setCheckoutError('Unable to start checkout. Please select a course.');
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError('');

    // Enroll free courses directly
    let failedFree = [];
    if (freeItems.length > 0) {
      failedFree = await enrollFreeItems();
    }

    // If no paid courses, we're done
    if (paidItems.length === 0) {
      if (failedFree.length > 0) {
        setCheckoutError(`Failed to enroll: ${failedFree.join(', ')}. Please try again.`);
      } else {
        clearCart();
        navigate('/my-courses');
      }
      setIsCheckingOut(false);
      return;
    }

    // Show warning if some free courses failed but continue with paid checkout
    if (failedFree.length > 0) {
      setCheckoutError(`Some free courses failed to enroll: ${failedFree.join(', ')}. Proceeding with paid checkout.`);
    }

    sessionStorage.removeItem('oc_payment_intent');
    try {
      const intentResponse = await apiService.post(API_ENDPOINTS.PAYMENT.INTENT, {
        course_id: paidCourseId
      });
      const paymentIntent = intentResponse?.payload;
      if (!paymentIntent?.client_secret) {
        setCheckoutError('Checkout failed. Payment intent missing.');
        return;
      }
      sessionStorage.setItem('oc_payment_intent', JSON.stringify(paymentIntent));
      navigate('/payment', { state: { paymentIntent } });
    } catch (error) {
      setCheckoutError(error.message || 'Checkout failed. Please try again.');
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
            <img src="/images/dashcart.svg" alt="" className="dashboard__icon-img" />
            {cartItems.length > 0 && <span className="dashboard__cart-badge">{cartItems.length}</span>}
          </button>
          <button className="dashboard__icon-btn" type="button" aria-label="Notifications">
            <img src="/images/dashnoti.svg" alt="" className="dashboard__icon-img" />
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
              const iconSrc = getSubjectIcon(item);
              const fallbackLabel = (item.code || item.name || 'OC').split(' ')[0].slice(0, 3).toUpperCase();
              return (
                <div key={item.id} className="cart__item">
                  <div className="cart__item-icon">
                    {iconSrc ? (
                      <img src={iconSrc} alt="" aria-hidden="true" />
                    ) : (
                      <span>{fallbackLabel}</span>
                    )}
                  </div>
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
            {isCheckingOut ? 'Processing...' : (total === 0 ? 'Enroll Now' : 'Checkout')}
          </button>
        </div>
        {checkoutError && <div className="cart__error">{checkoutError}</div>}
      </section>
    </div>
  );
};

export default CartDashboardPage;
