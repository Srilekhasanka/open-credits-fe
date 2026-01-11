import React, { useState } from 'react';
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
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!passwordsMatch) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Call real signup API
      const response = await authService.signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      setSuccessMessage(response.message || 'Signup successful!');
      setShowSuccess(true);
      authService.clearAuthData();
      setTimeout(() => {
        navigate('/signin');
      }, 10000);
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
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
          {error && (
            <div style={{
              padding: '12px',
              backgroundColor: '#ffebee',
              color: '#c62828',
              borderRadius: '8px',
              fontSize: '14px',
              border: '1px solid #ef5350'
            }}>
              {error}
            </div>
          )}
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
              type="password"
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
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  paddingRight: '45px',
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
              {passwordsMatch && (
                <span style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#4CAF50',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>✓</span>
              )}
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
    </div>
  );
};

export default GetStartedPage;


