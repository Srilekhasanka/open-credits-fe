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
  accounting: businessIcon,
  account: businessIcon,
  'computer science': computerIcon,
  computerscience: computerIcon,
  health: healthIcon,
  healthcare: healthIcon,
  law: lawIcon,
  lawandjustice: lawIcon,
  psychology: psychologyIcon,
  'social science': psychologyIcon,
  socialscience: psychologyIcon,
  science: scienceIcon,
  literature: literatureIcon,
  finance: financeIcon,
  finances: financeIcon,
  general: generalIcon,
  economics: economyIcon,
  economy: economyIcon,
  math: mathIcon,
  marketing: businessIcon,
  philosophy: psychologyIcon,
  history: generalIcon,
  sociology: psychologyIcon,
  english: literatureIcon,
  communications: generalIcon,
  education: generalIcon
};

const prefixToSubject = {
  bus: 'business',
  acc: 'business',
  accounting: 'business',
  marketing: 'business',
  law: 'law',
  psy: 'psychology',
  philosophy: 'psychology',
  soc: 'psychology',
  phil: 'psychology',
  bio: 'science',
  chem: 'science',
  math: 'math',
  cs: 'computer science',
  his: 'general',
  history: 'general',
  soc: 'general',
  sociology: 'general',
  eng: 'literature',
  english: 'literature',
  com: 'general',
  edu: 'general'
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
  const [successMessage, setSuccessMessage] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [couponError, setCouponError] = useState(false);
  const [couponApplying, setCouponApplying] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [couponToken, setCouponToken] = useState('');
  const [appliedCouponCode, setAppliedCouponCode] = useState('');

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMessage('Please enter a coupon code');
      setCouponError(true);
      return;
    }

    const courseIds = cartItems.map((item) => item.course_id ?? item.id ?? item._id);
    if (courseIds.length === 0) {
      setCouponMessage('Add items to cart first');
      setCouponError(true);
      return;
    }

    setCouponApplying(true);
    setCouponMessage('');
    setCouponError(false);

    try {
      const response = await apiService.post(API_ENDPOINTS.COUPONS.VALIDATE, {
        coupon_code: couponCode.trim(),
        course_ids: courseIds,
      });
      const data = response?.payload || response;
      setDiscount(data);
      const resolvedToken =
        data?.coupon_token ||
        data?.couponToken ||
        data?.token ||
        '';
      const resolvedCode = couponCode.trim();
      setCouponToken(resolvedToken);
      setAppliedCouponCode(resolvedCode);
      sessionStorage.setItem('oc_coupon_code', resolvedCode);
      if (resolvedToken) {
        sessionStorage.setItem('oc_coupon_token', resolvedToken);
      } else {
        sessionStorage.removeItem('oc_coupon_token');
      }
      const savings = (Number(data.coupon_discount) || 0) + (Number(data.bundle_discount) || 0);
      setCouponMessage(`Coupon applied! You save $${savings}`);
      setCouponError(false);
    } catch (err) {
      setCouponMessage(err.message || 'Invalid coupon code');
      setCouponError(true);
      setDiscount(null);
      setCouponToken('');
      setAppliedCouponCode('');
      sessionStorage.removeItem('oc_coupon_code');
      sessionStorage.removeItem('oc_coupon_token');
    } finally {
      setCouponApplying(false);
    }
  };

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

  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ');
  const formattedName = fullName || (user?.email ? user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1) : 'Student');
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

    // For all items (free or paid), go through the payment intent flow
    const courseIds = items
      .map((item) => item.course_id ?? item.id ?? item._id)
      .filter(Boolean);

    sessionStorage.removeItem('oc_payment_intent');
    try {
      const intentPayload = { course_ids: courseIds };
      if (appliedCouponCode) {
        intentPayload.coupon_code = appliedCouponCode;
      }
      if (couponToken) {
        intentPayload.coupon_token = couponToken;
      }
      const intentResponse = await apiService.post(API_ENDPOINTS.PAYMENT.INTENT, intentPayload);
      const paymentIntent = intentResponse?.payload;

      // If already paid (e.g. $0 course), enroll directly and go to my-courses
      if (paymentIntent?.is_paid) {
        for (const item of items) {
          enrollCourse(item);
        }
        clearCart();
        setIsCheckingOut(false);
        setSuccessMessage('Enrolled successfully!');
        setTimeout(() => navigate('/my-courses'), 2000);
        return;
      }

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

        <div className="cart__coupon">
          <label className="cart__coupon-label">Do you have a coupon code? <img src="/images/info.svg" alt="info" className="cart__coupon-info" /></label>
          <div className="cart__coupon-row">
            <input
              type="text"
              className="cart__coupon-input"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              type="button"
              className="cart__coupon-apply"
              onClick={handleApplyCoupon}
              disabled={couponApplying}
            >
              {couponApplying ? 'Applying...' : 'Apply'}
            </button>
          </div>
          {couponMessage && <div className={`cart__coupon-msg${couponError ? ' cart__coupon-msg--error' : ''}`}>{couponMessage}</div>}
        </div>

        <div className="cart__summary">
          <div className="cart__summary-left">
            <strong>Total</strong>
          </div>
          <div className="cart__summary-right">
            <div className="cart__total">
              {discount ? (
                <>
                  <span className="cart__total-original">${total}</span>
                  <span>${Number(discount.final_amount).toFixed(2)}</span>
                </>
              ) : (
                `$${total}`
              )}
            </div>
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
        {successMessage && <div className="cart__success">{successMessage}</div>}
      </section>
    </div>
  );
};

export default CartDashboardPage;
