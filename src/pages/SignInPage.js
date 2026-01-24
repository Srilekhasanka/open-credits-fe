import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import '../App.css';

const SignInPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, type: 'info', text: '' });
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const otpRefs = useRef([]);
  const [showReset, setShowReset] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showResetPasswords, setShowResetPasswords] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const resetPasswordsMatch = newPassword && confirmNewPassword && newPassword === confirmNewPassword;
  const snackbarTimer = useRef(null);

  const showSnackbar = (type, text) => {
    if (snackbarTimer.current) {
      clearTimeout(snackbarTimer.current);
    }
    setSnackbar({ open: true, type, text });
    snackbarTimer.current = setTimeout(() => {
      setSnackbar({ open: false, type: 'info', text: '' });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Call real signin API
      const response = await authService.signin({
        email,
        password
      });

      // Update context with user data
      login(
        {
          email: response.payload.user.email,
          userId: response.payload.user.userId,
          role: response.payload.user.role
        },
        { remember: rememberMe }
      );

      showSnackbar('success', 'Signed in successfully.');
      navigate('/dashboard');
    } catch (err) {
      const errText = err.message || 'Sign in failed. Please try again.';
      setError(errText);
      showSnackbar('error', errText);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      const errText = 'Please enter your email address to reset your password.';
      setError(errText);
      setMessage('');
      showSnackbar('error', errText);
      return;
    }

    setForgotLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await authService.forgotPassword(email);
      const okText = response.message || 'Password reset email sent. Please check your inbox.';
      setMessage(okText);
      setShowOtp(true);
      showSnackbar('success', okText);
    } catch (err) {
      const errText = err.message || 'Unable to process forgot password. Please try again.';
      setError(errText);
      showSnackbar('error', errText);
    } finally {
      setForgotLoading(false);
    }
  };

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

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (!email) {
      const errText = 'Email is required to verify OTP.';
      setError(errText);
      showSnackbar('error', errText);
      return;
    }
    if (otpValue.length !== 6) {
      const errText = 'Please enter the 6-digit OTP.';
      setError(errText);
      showSnackbar('error', errText);
      return;
    }

    setOtpLoading(true);
    setError('');
    setMessage('');

    authService.verifyOtp(email, otpValue)
      .then((response) => {
        const okText = response.message || 'OTP verified successfully.';
        setMessage(okText);
        showSnackbar('success', okText);
        if (response?.payload?.reset_token) {
          setResetToken(response.payload.reset_token);
          setShowReset(true);
          setShowOtp(false);
        }
      })
      .catch((err) => {
        const errText = err.message || 'OTP verification failed.';
        setError(errText);
        showSnackbar('error', errText);
      })
      .finally(() => {
        setOtpLoading(false);
      });
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmNewPassword) {
      showSnackbar('error', 'Please enter and confirm your new password.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showSnackbar('error', 'Passwords do not match.');
      return;
    }
    if (!resetToken) {
      showSnackbar('error', 'Reset token is missing. Please verify OTP again.');
      return;
    }

    setResetLoading(true);
    authService.resetPassword({ email, resetToken, newPassword, confirmPassword: confirmNewPassword })
      .then((response) => {
        const okText = response.message || 'Password reset successful. Please sign in.';
        showSnackbar('success', okText);
        setShowReset(false);
        setShowOtp(false);
        setNewPassword('');
        setConfirmNewPassword('');
      })
      .catch((err) => {
        showSnackbar('error', err.message || 'Password reset failed.');
      })
      .finally(() => {
        setResetLoading(false);
      });
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
          {showReset ? 'Reset Password' : (showOtp ? 'Enter OTP' : 'Welcome Back')}
        </h1>
        <p style={{ 
          textAlign: 'center', 
          color: '#666', 
          marginBottom: '40px' 
        }}>
          {showReset ? 'Create a new password for your account.' : (showOtp ? 'We sent a 6-digit code to your email.' : 'Sign in to your Open Credits account')}
        </p>
        
        <form onSubmit={showReset ? handleResetSubmit : (showOtp ? handleOtpSubmit : handleSubmit)} style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px' 
        }}>
          {!showOtp && !showReset && (
            <>
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
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      paddingRight: '64px',
                      fontSize: '16px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff6b35'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
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
                    {showPassword ? (
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

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                fontSize: '14px'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={forgotLoading}
                  style={{ 
                    color: '#ff6b35', 
                    textDecoration: 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    font: 'inherit',
                    opacity: forgotLoading ? 0.6 : 1
                  }}
                >
                  {forgotLoading ? 'Sending...' : 'Forgot password?'}
                </button>
              </div>
            </>
          )}

          {showOtp && (
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '10px', 
                fontWeight: '500',
                color: '#333'
              }}>
                OTP Code
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
              <button 
                type="button"
                onClick={handleForgotPassword}
                disabled={forgotLoading}
                style={{ 
                  marginTop: '12px',
                  color: '#ff6b35', 
                  textDecoration: 'none',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  font: 'inherit',
                  opacity: forgotLoading ? 0.6 : 1
                }}
              >
                {forgotLoading ? 'Resending...' : 'Resend OTP'}
              </button>
            </div>
          )}

          {showReset && (
            <>
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
                  readOnly
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    outline: 'none',
                    backgroundColor: '#f5f5f5',
                    color: '#666'
                  }}
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#333'
                }}>
                  New Password
                </label>
                <input
                  type={showResetPasswords ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Enter new password"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    outline: 'none'
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
                  Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showResetPasswords ? 'text' : 'password'}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                    placeholder="Confirm new password"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      paddingRight: '64px',
                      fontSize: '16px',
                      border: `2px solid ${resetPasswordsMatch ? '#4CAF50' : '#e0e0e0'}`,
                      borderRadius: '8px',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      if (!resetPasswordsMatch) e.target.style.borderColor = '#ff6b35';
                    }}
                    onBlur={(e) => {
                      if (!resetPasswordsMatch) e.target.style.borderColor = '#e0e0e0';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowResetPasswords((prev) => !prev)}
                    aria-label={showResetPasswords ? 'Hide password' : 'Show password'}
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
                    {showResetPasswords ? (
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
            </>
          )}

          <button
            type="submit"
            disabled={showReset ? resetLoading : (showOtp ? otpLoading : loading)}
            style={{
              padding: '14px',
              fontSize: '16px',
              fontWeight: '600',
              backgroundColor: (showReset ? resetLoading : (showOtp ? otpLoading : loading)) ? '#ccc' : '#ff6b35',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: (showReset ? resetLoading : (showOtp ? otpLoading : loading)) ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s',
              marginTop: '10px'
            }}
            onMouseOver={(e) => !(showReset ? resetLoading : (showOtp ? otpLoading : loading)) && (e.target.style.backgroundColor = '#ff5722')}
            onMouseOut={(e) => !(showReset ? resetLoading : (showOtp ? otpLoading : loading)) && (e.target.style.backgroundColor = '#ff6b35')}
          >
            {showReset ? (resetLoading ? 'Resetting...' : 'Reset Password') : (showOtp ? (otpLoading ? 'Verifying...' : 'Verify OTP') : (loading ? 'Signing In...' : 'Sign In'))}
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
            onClick={() => setSnackbar({ open: false, type: 'info', text: '' })}
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

export default SignInPage;
