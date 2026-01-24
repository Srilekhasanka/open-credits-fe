import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import '../App.css';
import successTick from '../assets/success-tick.gif';

const GetStartedPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, text: '' });
  const snackbarTimer = useRef(null);
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  const showSnackbar = (text) => {
    if (snackbarTimer.current) {
      clearTimeout(snackbarTimer.current);
    }
    setSnackbar({ open: true, text });
    snackbarTimer.current = setTimeout(() => {
      setSnackbar({ open: false, text: '' });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!passwordsMatch) {
      const errText = 'Passwords do not match!';
      setError(errText);
      showSnackbar(errText);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call real signup API
      const response = await authService.signup({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName
      });

      setSuccessMessage(response.message || 'Signup successful!');
      showSnackbar(response.message || 'Signup successful!');
      setShowSuccess(true);
      authService.clearAuthData();
      setTimeout(() => {
        navigate('/signin');
      }, 10000);
    } catch (err) {
      const errText = err.message || 'Signup failed. Please try again.';
      setError(errText);
      showSnackbar(errText);
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="page-content">
        <div style={{
          padding: '120px 20px',
          maxWidth: '520px',
          margin: '0 auto',
          minHeight: '70vh',
          textAlign: 'center'
        }}>
          <img
            src={successTick}
            alt="Success"
            style={{
              width: '72px',
              height: '72px',
              margin: '0 auto 24px',
              display: 'block'
            }}
          />
          <h1 style={{
            marginBottom: '12px',
            fontSize: '2.4rem'
          }}>
            Account created
          </h1>
          <p style={{
            marginBottom: '20px',
            color: '#555',
            fontSize: '16px'
          }}>
            {successMessage}
          </p>
          <button
            type="button"
            onClick={() => navigate('/signin')}
            style={{
              marginTop: '28px',
              padding: '12px 18px',
              fontSize: '15px',
              fontWeight: '600',
              backgroundColor: '#ff6b35',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#ff5722')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff6b35')}
          >
            Go to Sign In Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div style={{ 
        padding: '100px 20px', 
        maxWidth: '500px', 
        margin: '0 auto',
        minHeight: '70vh'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '10px', 
          fontSize: '2.5rem' 
        }}>
          Get Started
        </h1>
        <p style={{ 
          textAlign: 'center', 
          color: '#666', 
          marginBottom: '40px' 
        }}>
          Create your Open Credits account and start earning transferable college credits
        </p>
        
        <form onSubmit={handleSubmit} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px' 
        }}>
          {error}
          <div className="form-row-grid">
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: '#333'
              }}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="John"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  outline: 'none',
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500',
                color: '#333'
              }}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Doe"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  outline: 'none',
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500',
              color: '#333'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none',
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500',
              color: '#333'
            }}>
              Password
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none',
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500',
              color: '#333'
            }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPasswords ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  paddingRight: '64px',
                  fontSize: '16px',
                  border: `2px solid ${passwordsMatch ? '#4CAF50' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  outline: 'none',
                }}
                onFocus={(e) => {
                  if (!passwordsMatch) e.target.style.borderColor = '#ff6b35';
                }}
                onBlur={(e) => {
                  if (!passwordsMatch) e.target.style.borderColor = '#e0e0e0';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPasswords((prev) => !prev)}
                aria-label={showPasswords ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'none',
                  color: '#666',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPasswords ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ display: 'block' }}>
                    <path
                      fill="currentColor"
                      d="M12 5c5 0 8.9 3.3 11 7-2.1 3.7-6 7-11 7S3.1 15.7 1 12c2.1-3.7 6-7 11-7zm0 2C8.6 7 5.7 9 3.7 12c2 3 4.9 5 8.3 5s6.3-2 8.3-5c-2-3-4.9-5-8.3-5zm0 2.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5zm0 1.7a.8.8 0 1 0 .8.8.8.8 0 0 0-.8-.8z"
                    />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ display: 'block' }}>
                    <path
                      fill="currentColor"
                      d="M2.1 3.5L3.5 2.1 21.9 20.5 20.5 21.9 16.7 18.1C15.2 18.7 13.6 19 12 19 7 19 3.1 15.7 1 12c.7-1.2 1.6-2.3 2.7-3.2L2.1 3.5zm5.1 5.1L8.7 10c-.4.5-.7 1.2-.7 2 0 2.2 1.8 4 4 4 .8 0 1.5-.2 2-.7l1.4 1.4c-1 .8-2.2 1.3-3.4 1.3-3.3 0-6-2.7-6-6 0-1.2.4-2.4 1.3-3.4zm4.5-.6c.1 0 .2 0 .3 0 3.3 0 6 2.7 6 6 0 .1 0 .2 0 .3l-2.1-2.1V12c0-2.2-1.8-4-4-4h-.2L11.7 8zm.3-4c5 0 8.9 3.3 11 7-1 1.8-2.4 3.4-4.1 4.6l-1.5-1.5c1.5-1 2.8-2.3 3.6-3.7C18.9 8 15.4 5 12 5c-.9 0-1.7.2-2.5.5L7.8 3.8C9 3.3 10.5 3 12 3z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <label style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: '8px',
            fontSize: '14px',
            color: '#666'
          }}>
            <input type="checkbox" required style={{ marginTop: '3px' }} />
            <span>
              I agree to the Terms of Service and Privacy Policy
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px',
              fontSize: '16px',
              fontWeight: '600',
              backgroundColor: loading ? '#ccc' : '#ff6b35',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s',
              marginTop: '10px',
              pointerEvents: loading ? 'none' : 'auto'
            }}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#ff5722')}
            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#ff6b35')}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '30px', 
          color: '#666' 
        }}>
          Already have an account?{' '}
          <a href="/signin" style={{ 
            color: '#ff6b35', 
            textDecoration: 'none', 
            fontWeight: '600' 
          }}>
            Sign In
          </a>
        </p>
      </div>

      {snackbar.open && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            left: '50%',
            bottom: '24px',
            transform: 'translateX(-50%)',
            backgroundColor: '#000',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            minWidth: '280px',
            maxWidth: '90vw',
            zIndex: 9999
          }}
        >
          <span style={{ flex: 1, fontSize: '14px' }}>{snackbar.text}</span>
          <button
            type="button"
            onClick={() => setSnackbar({ open: false, text: '' })}
            style={{
              border: 'none',
              background: 'transparent',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              lineHeight: 1
            }}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default GetStartedPage;


