import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import '../App.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await authService.getProfile();
        const payload = response.payload || {};
        const userPayload = payload.user || payload;
        const mappedProfile = {
          email: userPayload.email || user?.email || '',
          firstName: userPayload.first_name || userPayload.firstName || user?.firstName || '',
          lastName: userPayload.last_name || userPayload.lastName || user?.lastName || ''
        };

        if (isMounted) {
          setProfile(mappedProfile);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load profile.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (!user) {
    return (
      <div className="page-content" style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h1>Please sign in to view your profile</h1>
      </div>
    );
  }

  if (loading && !profile) {
    return (
      <div className="page-content" style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h1>Loading profile...</h1>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="page-content" style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h1>{error}</h1>
      </div>
    );
  }

  const displayProfile = profile || user;

  return (
    <div className="page-content" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: '#ff6b35',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px',
            fontWeight: '600',
            margin: '0 auto 20px',
            textTransform: 'uppercase',
            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)'
          }}>
            {displayProfile.email?.charAt(0).toUpperCase()}
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>
            {displayProfile.firstName} {displayProfile.lastName}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>
            {displayProfile.email}
          </p>
        </div>

        {/* Profile Details Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '30px', color: '#333', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px' }}>
            Profile Details
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {/* First Name */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#666', 
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                First Name
              </label>
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                fontSize: '16px',
                color: '#333'
              }}>
                {displayProfile.firstName || 'Not provided'}
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#666', 
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Last Name
              </label>
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                fontSize: '16px',
                color: '#333'
              }}>
                {displayProfile.lastName || 'Not provided'}
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#666', 
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Email Address
              </label>
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                fontSize: '16px',
                color: '#333'
              }}>
                {displayProfile.email}
              </div>
            </div>

            {/* Account Status */}
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#666', 
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Account Status
              </label>
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#e8f5e9',
                borderRadius: '8px',
                fontSize: '16px',
                color: '#2e7d32',
                fontWeight: '500'
              }}>
                ✓ Active
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            marginTop: '40px', 
            paddingTop: '30px', 
            borderTop: '2px solid #f0f0f0',
            display: 'flex',
            gap: '15px'
          }}>
            <button
              style={{
                flex: 1,
                padding: '14px',
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
              Edit Profile
            </button>
            <button
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e0e0e0'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
