import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { FiSearch } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { STRIPE_PUBLISHABLE_KEY } from '../config/constants';
import '../components/DashboardLayout.css';

const companyLogo = '/images/company-logo.svg';
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const PaymentStatusDashboardPage = () => {
  const { isAuthenticated, user, cartItems, clearCart } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); // 'loading' | 'succeeded' | 'processing' | 'failed'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const clientSecret = searchParams.get('payment_intent_client_secret');
    if (!clientSecret) {
      setStatus('failed');
      setErrorMessage('Missing payment information.');
      return;
    }

    const checkStatus = async () => {
      const stripe = await stripePromise;
      const { paymentIntent, error } = await stripe.retrievePaymentIntent(clientSecret);

      if (error) {
        setStatus('failed');
        setErrorMessage(error.message || 'Unable to verify payment.');
        return;
      }

      switch (paymentIntent.status) {
        case 'succeeded':
          setStatus('succeeded');
          sessionStorage.removeItem('oc_payment_intent');
          clearCart();
          break;
        case 'processing':
          setStatus('processing');
          break;
        case 'requires_payment_method':
          setStatus('failed');
          setErrorMessage('Payment was declined. Please try again with a different payment method.');
          break;
        default:
          setStatus('failed');
          setErrorMessage(`Payment status: ${paymentIntent.status}. Please try again.`);
      }
    };

    checkStatus();
  }, [searchParams, clearCart]);

  useEffect(() => {
    if (status !== 'succeeded') return;
    const timer = setTimeout(() => navigate('/my-courses'), 5000);
    return () => clearTimeout(timer);
  }, [status, navigate]);

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

  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ');
  const formattedName = fullName || (user?.email ? user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1) : 'Student');
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

      <section className="payment-status">
        <div className="payment-status__header">
          <h2>Payment</h2>
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
            {status === 'loading' && 'Verifying payment...'}
            {status === 'succeeded' && 'Payment Successful'}
            {status === 'processing' && 'Payment is processing. We\'ll update you when it completes.'}
            {status === 'failed' && 'Payment Failed'}
          </div>
          {status === 'loading' && (
            <div className="payment-status__spinner" aria-label="Payment loading" />
          )}
          {status === 'succeeded' && (
            <>
              <div className="payment-status__success" aria-label="Payment successful" />
              <p className="payment-status__redirect">Redirecting to My Courses...</p>
            </>
          )}
          {status === 'processing' && (
            <div className="payment-status__spinner" aria-label="Payment processing" />
          )}
          {status === 'failed' && (
            <>
              <div className="payment-status__failed" aria-label="Payment failed" />
              {errorMessage && <p className="payment-status__error">{errorMessage}</p>}
              <button className="checkout__pay" type="button" onClick={() => navigate('/shop')}>
                Try Again
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default PaymentStatusDashboardPage;
