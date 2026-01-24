import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FiSearch, FiBell, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';
import { API_ENDPOINTS, STRIPE_PUBLISHABLE_KEY } from '../config/constants';
import '../components/DashboardLayout.css';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const StripeCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setErrorMessage('');
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/status`
      },
      redirect: 'always'
    });

    if (error) {
      setErrorMessage(error.message || 'Payment failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <form className="checkout__form" onSubmit={handleSubmit}>
      <div className="checkout__form-header">
        <div className="checkout__badge">#</div>
        <h3>Payment details</h3>
      </div>
      <div className="checkout__stripe">
        <PaymentElement />
      </div>
      {errorMessage && <div className="checkout__error">{errorMessage}</div>}
      <button className="checkout__pay" type="submit" disabled={isSubmitting || !stripe}>
        {isSubmitting ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const CheckoutDashboardPage = () => {
  const { isAuthenticated, user, cartItems } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const storedIntent = sessionStorage.getItem('oc_payment_intent');
  const parsedStoredIntent = storedIntent ? JSON.parse(storedIntent) : null;
  const [resolvedIntent, setResolvedIntent] = useState(
    location.state?.paymentIntent ?? parsedStoredIntent
  );
  const [isLoadingIntent, setIsLoadingIntent] = useState(false);
  const [intentError, setIntentError] = useState('');
  const clientSecret = resolvedIntent?.client_secret;

  useEffect(() => {
    const fetchIntent = async () => {
      if (clientSecret || isLoadingIntent) return;
      const primaryCourseId = cartItems[0]?.course_id ?? cartItems[0]?.id ?? cartItems[0]?._id;
      if (!primaryCourseId) {
        setIntentError('Missing course for checkout. Please go back to cart.');
        return;
      }
      setIsLoadingIntent(true);
      setIntentError('');
      try {
        const intentResponse = await apiService.post(API_ENDPOINTS.PAYMENT.INTENT, {
          course_id: primaryCourseId
        });
        const paymentIntent = intentResponse?.payload;
        if (!paymentIntent?.client_secret) {
          setIntentError('Payment intent missing. Please try again.');
          return;
        }
        sessionStorage.setItem('oc_payment_intent', JSON.stringify(paymentIntent));
        setResolvedIntent(paymentIntent);
      } catch (error) {
        setIntentError('Unable to start payment. Please try again.');
      } finally {
        setIsLoadingIntent(false);
      }
    };

    fetchIntent();
  }, [clientSecret, cartItems, isLoadingIntent]);

  const elementsOptions = useMemo(() => ({
    clientSecret,
    appearance: {
      theme: 'stripe'
    }
  }), [clientSecret]);

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
          <button
            className="dashboard__icon-btn dashboard__icon-btn--cart"
            type="button"
            aria-label="Cart"
            onClick={() => navigate('/shop')}
          >
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
          {clientSecret ? (
            <Elements stripe={stripePromise} options={elementsOptions}>
              <StripeCheckoutForm clientSecret={clientSecret} />
            </Elements>
          ) : (
            <div className="checkout__form">
              <div className="checkout__form-header">
                <div className="checkout__badge">#</div>
                <h3>Payment details</h3>
              </div>
              {isLoadingIntent ? (
                <div className="checkout__error">Preparing your payment...</div>
              ) : (
                <div className="checkout__error">
                  {intentError || 'Missing payment intent. Please go back to cart and try again.'}
                </div>
              )}
              <button className="checkout__pay" type="button" onClick={() => navigate('/shop')}>
                Go Back to Cart
              </button>
            </div>
          )}

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
