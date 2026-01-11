import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import '../App.css';

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call real signin API
      const response = await authService.signin({
        email,
        password
      });

      // Update context with user data
      login({
        email: response.payload.user.email,
        userId: response.payload.user.userId,
        role: response.payload.user.role
      });

      navigate('/');
    } catch (err) {
      setError(err.message || 'Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <div style={{ 
        padding: '120px 20px', 
        maxWidth: '450px', 
        margin: '0 auto',
        minHeight: '70vh'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '10px', 
          fontSize: '2.5rem' 
        }}>
          Welcome Back
        </h1>
        <p style={{ 
          textAlign: 'center', 
          color: '#666', 
          marginBottom: '40px' 
        }}>
          Sign in to your Open Credits account
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.3s',
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            fontSize: '14px'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button 
              type="button"
              onClick={() => alert('Password reset feature coming soon!')}
              style={{ 
                color: '#ff6b35', 
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                font: 'inherit'
              }}
            >
              Forgot password?
            </button>
          </div>

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
              marginTop: '10px'
            }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#ff5722')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#ff6b35')}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '30px', 
          color: '#666' 
        }}>
          Don't have an account?{' '}
          <a href="/get-started" style={{ 
            color: '#ff6b35', 
            textDecoration: 'none', 
            fontWeight: '600' 
          }}>
            Get Started
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
