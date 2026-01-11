import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, enrollCourse } = useAuth();
  const course = location.state?.course;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    // Card Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Billing Information
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Additional
    saveCard: false,
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Redirect to courses if no course selected
    if (!course) {
      navigate('/courses');
    }
    // Redirect to signin if not authenticated
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: '/payment', course } });
    }
  }, [course, navigate, isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Format card number
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted.slice(0, 19) }));
      return;
    }
    
    // Format expiry date
    if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2');
      setFormData(prev => ({ ...prev, [name]: formatted.slice(0, 5) }));
      return;
    }
    
    // Format CVV
    if (name === 'cvv') {
      setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, '').slice(0, 4) }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Only validate terms agreement
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      // Enroll the course
      enrollCourse(course);
      setShowSuccess(true);
      // Redirect after showing success
      setTimeout(() => {
        navigate('/my-courses');
      }, 15000);
    }, 2000);
  };

  if (!course) return null;

  // Success Screen
  if (showSuccess) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: 'fadeIn 0.3s ease-in'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '50px',
          maxWidth: '500px',
          textAlign: 'center',
          position: 'relative',
          animation: 'slideUp 0.5s ease-out'
        }}>
          {/* Confetti Animation - Top */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '120px',
            animation: 'bounce 0.6s ease-in-out'
          }}>
            🎉
          </div>

          {/* Success Message */}
          <h1 style={{
            fontSize: '2rem',
            color: '#333',
            marginBottom: '15px',
            marginTop: '20px',
            fontWeight: '700'
          }}>
            Payment Successful!
          </h1>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            marginBottom: '20px'
          }}>
            You are now enrolled in
          </p>

          <div style={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '30px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: course.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              margin: '0 auto 15px'
            }}>
              {course.icon}
            </div>
            <h3 style={{
              fontSize: '1.2rem',
              color: '#333',
              fontWeight: '600',
              marginBottom: '5px'
            }}>
              {course.code}: {course.name}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              ${course.price} • Lifetime Access
            </p>
          </div>

          <p style={{
            fontSize: '0.95rem',
            color: '#666',
            marginBottom: '25px'
          }}>
            A confirmation email has been sent to your registered email address.
            <br />
            Redirecting to My Courses...
          </p>

          <button
            onClick={() => navigate('/my-courses')}
            style={{
              padding: '15px 40px',
              backgroundColor: '#ff6b35',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#ff5722'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6b35'}
          >
            Go to My Courses
          </button>

          {/* Floating Confetti - More Visible */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '15px',
            fontSize: '50px',
            animation: 'float 3s ease-in-out infinite',
            zIndex: 10
          }}>🎊</div>
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '45px',
            animation: 'float 3s ease-in-out infinite 0.5s',
            zIndex: 10
          }}>✨</div>
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '30px',
            fontSize: '40px',
            animation: 'float 3s ease-in-out infinite 1s',
            zIndex: 10
          }}>🌟</div>
          <div style={{
            position: 'absolute',
            bottom: '40px',
            right: '15px',
            fontSize: '48px',
            animation: 'float 3s ease-in-out infinite 1.5s',
            zIndex: 10
          }}>🎈</div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '-20px',
            fontSize: '42px',
            animation: 'float 3s ease-in-out infinite 0.8s',
            zIndex: 10
          }}>🎁</div>
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '-20px',
            fontSize: '42px',
            animation: 'float 3s ease-in-out infinite 1.2s',
            zIndex: 10
          }}>🎊</div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from {
              transform: translateY(50px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes scaleIn {
            from {
              transform: scale(0);
            }
            to {
              transform: scale(1);
            }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-20px); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '30px', color: '#333' }}>Complete Your Enrollment</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '30px' }}>
          {/* Payment Form */}
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <form onSubmit={handleSubmit}>
              {/* Payment Method Selection */}
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#333' }}>Payment Method</h2>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      flex: 1,
                      padding: '15px',
                      border: `2px solid ${paymentMethod === 'card' ? '#ff6b35' : '#ddd'}`,
                      borderRadius: '8px',
                      backgroundColor: paymentMethod === 'card' ? '#fff5f0' : 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    💳 Credit/Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    style={{
                      flex: 1,
                      padding: '15px',
                      border: `2px solid ${paymentMethod === 'paypal' ? '#ff6b35' : '#ddd'}`,
                      borderRadius: '8px',
                      backgroundColor: paymentMethod === 'paypal' ? '#fff5f0' : 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    💰 PayPal
                  </button>
                </div>
              </div>

              {/* Card Information */}
              {paymentMethod === 'card' && (
                <div style={{ marginBottom: '30px' }}>
                  <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#333' }}>Card Information</h2>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${errors.cardNumber ? '#ff0000' : '#ddd'}`,
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                    {errors.cardNumber && <span style={{ color: '#ff0000', fontSize: '12px' }}>{errors.cardNumber}</span>}
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${errors.cardName ? '#ff0000' : '#ddd'}`,
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                    {errors.cardName && <span style={{ color: '#ff0000', fontSize: '12px' }}>{errors.cardName}</span>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: `1px solid ${errors.expiryDate ? '#ff0000' : '#ddd'}`,
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                      {errors.expiryDate && <span style={{ color: '#ff0000', fontSize: '12px' }}>{errors.expiryDate}</span>}
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: `1px solid ${errors.cvv ? '#ff0000' : '#ddd'}`,
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                      {errors.cvv && <span style={{ color: '#ff0000', fontSize: '12px' }}>{errors.cvv}</span>}
                    </div>
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      name="saveCard"
                      checked={formData.saveCard}
                      onChange={handleInputChange}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontSize: '14px' }}>Save card for future purchases</span>
                  </label>
                </div>
              )}

              {/* PayPal Info */}
              {paymentMethod === 'paypal' && (
                <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                    You will be redirected to PayPal to complete your payment securely.
                  </p>
                  <button
                    type="button"
                    style={{
                      padding: '12px 30px',
                      backgroundColor: '#0070ba',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Continue with PayPal
                  </button>
                </div>
              )}

              {/* Billing Information */}
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#333' }}>Billing Information</h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${errors.email ? '#ff0000' : '#ddd'}`,
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  {errors.email && <span style={{ color: '#ff0000', fontSize: '12px' }}>{errors.email}</span>}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="1234567890"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${errors.phone ? '#ff0000' : '#ddd'}`,
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  {errors.phone && <span style={{ color: '#ff0000', fontSize: '12px' }}>{errors.phone}</span>}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: `1px solid ${errors.address ? '#ff0000' : '#ddd'}`,
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                  {errors.address && <span style={{ color: '#ff0000', fontSize: '12px' }}>{errors.address}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${errors.city ? '#ff0000' : '#ddd'}`,
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                    {errors.city && <span style={{ color: '#ff0000', fontSize: '12px' }}>{errors.city}</span>}
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="NY"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${errors.state ? '#ff0000' : '#ddd'}`,
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                    {errors.state && <span style={{ color: '#ff0000', fontSize: '12px' }}>{errors.state}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: `1px solid ${errors.zipCode ? '#ff0000' : '#ddd'}`,
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    />
                    {errors.zipCode && <span style={{ color: '#ff0000', fontSize: '12px' }}>{errors.zipCode}</span>}
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    style={{ marginRight: '8px', marginTop: '4px' }}
                  />
                  <span style={{ fontSize: '14px' }}>
                    I agree to the <span style={{ color: '#ff6b35', cursor: 'pointer' }}>Terms and Conditions</span> and <span style={{ color: '#ff6b35', cursor: 'pointer' }}>Privacy Policy</span>. 
                    I understand that this purchase is non-refundable.
                  </span>
                </label>
                {errors.agreeTerms && <span style={{ color: '#ff0000', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.agreeTerms}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: processing ? '#ccc' : '#ff6b35',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: processing ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                {processing ? 'Processing...' : `Pay $${course.price}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', position: 'sticky', top: '100px' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#333' }}>Order Summary</h2>
              
              {/* Course Details */}
              <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: course.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: '15px'
                }}>
                  {course.icon}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                  {course.code}: {course.name}
                </h3>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>{course.desc}</p>
                {course.tags.map((tag, idx) => (
                  <span key={idx} style={{
                    padding: '4px 10px',
                    backgroundColor: '#fff5f0',
                    color: '#ff6b35',
                    fontSize: '11px',
                    borderRadius: '4px',
                    border: '1px solid #ffe0d5',
                    marginRight: '5px',
                    display: 'inline-block',
                    marginBottom: '5px'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price Breakdown */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                  <span style={{ color: '#666' }}>Course Price</span>
                  <span style={{ fontWeight: '600' }}>${course.price}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
                  <span style={{ color: '#666' }}>Processing Fee</span>
                  <span style={{ fontWeight: '600' }}>$0</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ color: '#666' }}>Taxes</span>
                  <span style={{ fontWeight: '600' }}>$0</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '18px' }}>
                  <span style={{ fontWeight: '700' }}>Total</span>
                  <span style={{ fontWeight: '700', color: '#ff6b35' }}>${course.price}</span>
                </div>
              </div>

              {/* Benefits */}
              <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>What's Included:</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#666' }}>
                  <li style={{ marginBottom: '8px' }}>Lifetime access to course materials</li>
                  <li style={{ marginBottom: '8px' }}>Transferable college credits</li>
                  <li style={{ marginBottom: '8px' }}>Expert instructor support</li>
                  <li style={{ marginBottom: '8px' }}>Certificate upon completion</li>
                  <li>24/7 student support</li>
                </ul>
              </div>

              {/* Security Badge */}
              <div style={{ marginTop: '20px', textAlign: 'center', padding: '15px', backgroundColor: '#f0f8f5', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔒</div>
                <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
                  Secure payment powered by industry-standard encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
