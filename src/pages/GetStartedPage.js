import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import { API_ENDPOINTS } from '../config/constants';
import '../App.css';

const successTick = '/images/success-tick.gif';

const GetStartedPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentType: ''
  });
  const [showPasswords, setShowPasswords] = useState(false);

  // Email OTP verification state
  const [emailVerified, setEmailVerified] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const otpRefs = useRef([]);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verificationToken, setVerificationToken] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') {
      setEmailVerified(false);
      setShowOtp(false);
      setOtp(Array(6).fill(''));
      setVerificationToken('');
    }
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, text: '' });
  const snackbarTimer = useRef(null);
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const showSnackbar = (text) => {
    if (snackbarTimer.current) {
      clearTimeout(snackbarTimer.current);
    }
    setSnackbar({ open: true, text });
    snackbarTimer.current = setTimeout(() => {
      setSnackbar({ open: false, text: '' });
    }, 3000);
  };

  // OTP handlers
  const handleOtpChange = (index, value) => {
    const numeric = value.replace(/\D/g, '').slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = numeric;
    setOtp(nextOtp);
    if (numeric && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && otpRefs.current[index - 1]) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (event) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    event.preventDefault();
    const nextOtp = Array(6).fill('');
    pasted.split('').forEach((digit, idx) => {
      nextOtp[idx] = digit;
    });
    setOtp(nextOtp);
    const nextIndex = Math.min(pasted.length, 5);
    if (otpRefs.current[nextIndex]) {
      otpRefs.current[nextIndex].focus();
    }
  };

  // Click "!" → call /auth/signup/request-otp → show OTP box
  const handleSendOtp = async () => {
    if (!isValidEmail) {
      showSnackbar('Please enter a valid email first.');
      return;
    }
    setVerifyLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.SIGNUP_REQUEST_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to send OTP');
      }
      showSnackbar(data.message || 'OTP sent to your email.');
      setShowOtp(true);
      setOtp(Array(6).fill(''));
      setVerificationToken('');
    } catch (err) {
      showSnackbar(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setVerifyLoading(false);
    }
  };

  // Verify OTP → email verified
  const handleVerifyOtp = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      showSnackbar('Please enter the 6-digit OTP.');
      return;
    }
    setOtpLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.VERIFY_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'signup', email: formData.email, otp: otpValue }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'OTP verification failed');
      }
      if (data?.payload?.verification_token) {
        setVerificationToken(data.payload.verification_token);
      }
      showSnackbar(data.message || 'Email verified successfully!');
      setEmailVerified(true);
      setShowOtp(false);
    } catch (err) {
      showSnackbar(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Student type validation - enable later
    // if (!formData.studentType) {
    //   showSnackbar('Please select your student type.');
    //   return;
    // }

    if (!emailVerified) {
      showSnackbar('Please verify your email first.');
      return;
    }

    if (!passwordsMatch) {
      const errText = 'Passwords do not match!';
      setError(errText);
      showSnackbar(errText);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authService.signup({
        verification_token: verificationToken,
        first_name: formData.firstName,
        last_name: formData.lastName,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        student_type: formData.studentType,
      });

      authService.clearAuthData();
      setSuccessMessage(response.message || 'Signup successful!');
      showSnackbar(response.message || 'Signup successful!');
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } catch (err) {
      const errText = err.message || 'Signup failed. Please try again.';
      setError(errText);
      showSnackbar(errText);
    } finally {
      setLoading(false);
    }
  };

  const submitDisabled = loading || !emailVerified;

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
                color: '#000'
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
                color: '#000'
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

          {/* Student Type - commented out for now, will enable later
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#000'
            }}>
              Student Type*
            </label>
            <select
              name="studentType"
              value={formData.studentType}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none',
                backgroundColor: '#fff',
                color: formData.studentType ? '#000' : '#999',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23666' d='M1.4 0L6 4.6 10.6 0 12 1.4l-6 6-6-6z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            >
              <option value="" disabled>Select student type</option>
              <option value="national">U.S Local / Military</option>
              <option value="international">International Student</option>
            </select>
          </div>
          */}

          {/* Email with ! icon and OTP */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#000'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={emailVerified}
                placeholder="your@email.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  paddingRight: '48px',
                  fontSize: '16px',
                  border: `2px solid ${emailVerified ? '#4CAF50' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  outline: 'none',
                  backgroundColor: emailVerified ? '#f0faf0' : 'white',
                }}
                onFocus={(e) => {
                  if (!emailVerified) e.target.style.borderColor = '#ff6b35';
                }}
                onBlur={(e) => {
                  if (!emailVerified) e.target.style.borderColor = '#e0e0e0';
                }}
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={!isValidEmail || emailVerified || verifyLoading}
                title={emailVerified ? 'Email verified' : isValidEmail ? 'Click to verify email' : 'Enter a valid email'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'none',
                  cursor: emailVerified || !isValidEmail || verifyLoading ? 'default' : 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  opacity: !isValidEmail ? 0.4 : 1,
                }}
              >
                {verifyLoading ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite', display: 'block' }}>
                    <circle cx="12" cy="12" r="10" stroke="#ff6b35" strokeWidth="3" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                  </svg>
                ) : emailVerified ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" style={{ display: 'block' }}>
                    <circle cx="12" cy="12" r="11" fill="#4CAF50" />
                    <path d="M7 12.5l3 3 7-7" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" style={{ display: 'block' }}>
                    <circle cx="12" cy="12" r="11" fill="#ff6b35" />
                    <text x="12" y="17" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="Arial">!</text>
                  </svg>
                )}
              </button>
            </div>

            {/* OTP input */}
            {showOtp && !emailVerified && (
              <div style={{ marginTop: '14px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#000',
                  fontSize: '14px'
                }}>
                  Enter the 6-digit OTP sent to your email
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: '10px'
                }}>
                  {otp.map((digit, index) => (
                    <input
                      key={`otp-${index}`}
                      ref={(el) => { otpRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={handleOtpPaste}
                      style={{
                        width: '100%',
                        padding: '12px 0',
                        textAlign: 'center',
                        fontSize: '18px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={verifyLoading}
                    style={{
                      color: '#ff6b35',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      font: 'inherit',
                      fontSize: '14px',
                      opacity: verifyLoading ? 0.6 : 1
                    }}
                  >
                    {verifyLoading ? 'Resending...' : 'Resend OTP'}
                  </button>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={otpLoading || otp.join('').length !== 6}
                    style={{
                      padding: '8px 20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      backgroundColor: otpLoading || otp.join('').length !== 6 ? '#ccc' : '#ff6b35',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: otpLoading || otp.join('').length !== 6 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {otpLoading ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#000'
            }}>
              Password
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={!emailVerified}
              placeholder="Create a password"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none',
                opacity: !emailVerified ? 0.5 : 1,
                backgroundColor: !emailVerified ? '#f5f5f5' : 'white',
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
              color: '#000'
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
                disabled={!emailVerified}
                placeholder="Confirm your password"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  paddingRight: '64px',
                  fontSize: '16px',
                  border: `2px solid ${passwordsMatch ? '#4CAF50' : '#e0e0e0'}`,
                  borderRadius: '8px',
                  outline: 'none',
                  opacity: !emailVerified ? 0.5 : 1,
                  backgroundColor: !emailVerified ? '#f5f5f5' : 'white',
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
            disabled={submitDisabled}
            style={{
              padding: '14px',
              fontSize: '16px',
              fontWeight: '600',
              backgroundColor: submitDisabled ? '#ccc' : '#ff6b35',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: submitDisabled ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s',
              marginTop: '10px',
              pointerEvents: submitDisabled ? 'none' : 'auto'
            }}
            onMouseEnter={(e) => !submitDisabled && (e.target.style.backgroundColor = '#ff5722')}
            onMouseLeave={(e) => !submitDisabled && (e.target.style.backgroundColor = '#ff6b35')}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          {!emailVerified && (
            <p style={{ textAlign: 'center', color: '#999', fontSize: '13px', margin: '-8px 0 0' }}>
              Please verify your email to continue
            </p>
          )}
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

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GetStartedPage;
