import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import '../components/DashboardLayout.css';

export default function MyAccountDashboardPage() {
  const { isAuthenticated, user, cartItems } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    professionalTitle: '',
    universityName: '',
    profilePictureFile: null
  });
  const profileFileInputRef = useRef(null);
  const [profilePreviewUrl, setProfilePreviewUrl] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    let isMounted = true;

    const loadProfile = async () => {
      try {
        const response = await authService.getProfile();
        const payload = response.payload || {};
        const userPayload = payload.user || payload;
        const mappedProfile = {
          email: userPayload.email || user?.email || '',
          firstName: userPayload.first_name || userPayload.firstName || user?.firstName || '',
          lastName: userPayload.last_name || userPayload.lastName || user?.lastName || '',
          phone: userPayload.phone || '',
          companyName: userPayload.company_name || '',
          professionalTitle: userPayload.professional_title || '',
          universityName: userPayload.university_name || '',
          profilePictureUrl: userPayload.profile_picture_url || userPayload.profile_picture_signed_url || ''
        };

        if (isMounted) {
          setProfile(mappedProfile);
          setProfileForm({
            firstName: mappedProfile.firstName || '',
            lastName: mappedProfile.lastName || '',
            email: mappedProfile.email || '',
            phone: mappedProfile.phone || '',
            companyName: mappedProfile.companyName || '',
            professionalTitle: mappedProfile.professionalTitle || '',
            universityName: mappedProfile.universityName || '',
            profilePictureFile: null
          });
        }
      } catch (err) {
        // Keep existing user data if API fails.
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const displayUser = profile || user;
  const displayName = displayUser?.email ? displayUser.email.split('@')[0] : 'Student';
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
  const displayInitial = formattedName.charAt(0);
  const displayImageUrl = profilePreviewUrl || displayUser?.profilePictureUrl || '';

  const showSnackbar = (text) => {
    setSaveMessage(text);
    setSnackbarOpen(true);
    window.clearTimeout(showSnackbar._timer);
    showSnackbar._timer = window.setTimeout(() => {
      setSnackbarOpen(false);
      setSaveMessage('');
    }, 3000);
  };

  const handleSaveProfile = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        first_name: profileForm.firstName,
        last_name: profileForm.lastName,
        phone: profileForm.phone,
        company_name: profileForm.companyName,
        university_name: profileForm.universityName,
        professional_title: profileForm.professionalTitle
      };

      if (profileForm.profilePictureFile) {
        payload.profile_picture_upload = {
          content_type: profileForm.profilePictureFile.type || 'application/octet-stream',
          file_name: profileForm.profilePictureFile.name || 'profile-picture'
        };
      }

      const response = await authService.updateProfile(payload);

      const responsePayload = response.payload || {};
      const userPayload = responsePayload.user || responsePayload;
      const uploadUrl = responsePayload.profile_picture_upload_url
        || responsePayload.upload_url
        || responsePayload.presigned_url
        || '';
      const uploadedDisplayUrl = responsePayload.profile_picture_url
        || responsePayload.profile_picture_signed_url
        || uploadUrl
        || '';

      if (profileForm.profilePictureFile && uploadUrl) {
        const uploadResponse = await fetch(uploadUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': profileForm.profilePictureFile.type || 'application/octet-stream'
          },
          body: profileForm.profilePictureFile
        });

        if (!uploadResponse.ok) {
          throw new Error('Profile image upload failed.');
        }
      }
      const mappedProfile = {
        email: userPayload.email || profileForm.email || '',
        firstName: userPayload.first_name || profileForm.firstName || '',
        lastName: userPayload.last_name || profileForm.lastName || '',
        phone: userPayload.phone || profileForm.phone || '',
        companyName: userPayload.company_name || profileForm.companyName || '',
        professionalTitle: userPayload.professional_title || profileForm.professionalTitle || '',
        universityName: userPayload.university_name || profileForm.universityName || '',
        profilePictureUrl: userPayload.profile_picture_url || uploadedDisplayUrl || displayUser?.profilePictureUrl || ''
      };

      setProfile(mappedProfile);
      setProfileForm({
        firstName: mappedProfile.firstName,
        lastName: mappedProfile.lastName,
        email: mappedProfile.email,
        phone: mappedProfile.phone,
        companyName: mappedProfile.companyName,
        professionalTitle: mappedProfile.professionalTitle,
        universityName: mappedProfile.universityName,
        profilePictureFile: null
      });
      setImageError(false);
      setProfilePreviewUrl('');
      setIsEditing(false);
      showSnackbar(response.message || 'Profile updated successfully.');
    } catch (err) {
      showSnackbar(err.message || 'Unable to update profile.');
    } finally {
      setSaveLoading(false);
    }
  };

  useEffect(() => {
    if (displayImageUrl) {
      setImageError(false);
    }
  }, [displayImageUrl]);

  if (!isAuthenticated) {
    return (
      <div className="dashboard__auth-cta">
        <div className="dashboard__auth-card">
          <h1>Please sign in to view your account</h1>
          <p>Sign in to manage your profile details.</p>
          <button onClick={() => navigate('/signin')}>Sign In</button>
        </div>
      </div>
    );
  }

  return (
    <>
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

      <section className="account">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2>My Account</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #ff6b35',
                backgroundColor: isEditing ? '#fff5f0' : 'white',
                color: '#ff6b35',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={saveLoading}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #ff6b35',
                  backgroundColor: '#ff6b35',
                  color: 'white',
                  fontWeight: 600,
                  cursor: saveLoading ? 'not-allowed' : 'pointer',
                  opacity: saveLoading ? 0.7 : 1
                }}
              >
                {saveLoading ? 'Saving...' : 'Save'}
              </button>
            )}
          </div>
        </div>
        <div className="account__layout">
          <div className="account__menu">
            <button
              className={`account__menu-item ${activeTab === 'profile' ? 'account__menu-item--active' : ''}`}
              type="button"
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`account__menu-item ${activeTab === 'certificates' ? 'account__menu-item--active' : ''}`}
              type="button"
              onClick={() => setActiveTab('certificates')}
            >
              Certificates
            </button>
            <button
              className={`account__menu-item ${activeTab === 'billing' ? 'account__menu-item--active' : ''}`}
              type="button"
              onClick={() => setActiveTab('billing')}
            >
              Billing
            </button>
          </div>

          {activeTab === 'profile' && (
            <div className="account__form">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '18px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    backgroundColor: '#ff6b35',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    boxShadow: '0 6px 16px rgba(255, 107, 53, 0.3)',
                    margin: '0 auto 10px'
                  }}>
                    {displayImageUrl && !imageError ? (
                      <img
                        src={displayImageUrl}
                        alt="Profile"
                        onError={() => setImageError(true)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                      />
                    ) : (
                      (displayUser?.firstName || displayUser?.email || 'U').charAt(0)
                    )}
                  </div>
                  {isEditing && (
                    <>
                      <input
                        ref={profileFileInputRef}
                        type="file"
                        accept="image/png, image/jpeg"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
                          if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
                            showSnackbar('Only JPEG and PNG images are allowed.');
                            e.target.value = '';
                            setProfileForm((prev) => ({ ...prev, profilePictureFile: null }));
                            setProfilePreviewUrl('');
                            return;
                          }
                          setProfileForm((prev) => ({ ...prev, profilePictureFile: file }));
                          if (file) {
                            const objectUrl = URL.createObjectURL(file);
                            setProfilePreviewUrl((prevUrl) => {
                              if (prevUrl) {
                                URL.revokeObjectURL(prevUrl);
                              }
                              return objectUrl;
                            });
                          } else {
                            setProfilePreviewUrl('');
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => profileFileInputRef.current && profileFileInputRef.current.click()}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: '1px solid #ff6b35',
                          backgroundColor: 'white',
                          color: '#ff6b35',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Upload photo
                      </button>
                      {profileForm.profilePictureFile && (
                        <div style={{ marginTop: '6px', fontSize: '12px', color: '#666' }}>
                          {profileForm.profilePictureFile.name}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="account__row">
                <label>
                  Name
                  <input
                    type="text"
                    value={isEditing ? profileForm.firstName : (displayUser?.firstName || '')}
                    readOnly={!isEditing}
                    placeholder="Enter your first name"
                    onChange={(e) => setProfileForm((prev) => ({ ...prev, firstName: e.target.value }))}
                  />
                </label>
                <label>
                  <span className="account__label-spacer" aria-hidden="true" />
                  <input
                    type="text"
                    value={isEditing ? profileForm.lastName : (displayUser?.lastName || '')}
                    readOnly={!isEditing}
                    placeholder="Enter your last name"
                    onChange={(e) => setProfileForm((prev) => ({ ...prev, lastName: e.target.value }))}
                  />
                </label>
              </div>
              <div className="account__row">
                <label>
                  Email
                  <input
                    type="email"
                    value={isEditing ? profileForm.email : (displayUser?.email || '')}
                    readOnly
                    placeholder="Enter your email"
                    onChange={(e) => setProfileForm((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </label>
                <label>
                  Phone
                  <input
                    type="tel"
                    inputMode="tel"
                    value={isEditing ? profileForm.phone : (displayUser?.phone || '')}
                    readOnly={!isEditing}
                    placeholder="Enter your phone number"
                    onChange={(e) => {
                      const raw = e.target.value;
                      const cleaned = raw.replace(/[^0-9+]/g, '');
                      const normalized = cleaned.startsWith('+')
                        ? `+${cleaned.slice(1).replace(/\+/g, '')}`
                        : cleaned.replace(/\+/g, '');
                      setProfileForm((prev) => ({ ...prev, phone: normalized }));
                    }}
                  />
                </label>
              </div>
              <label>
                Company
                  <input
                    type="text"
                    value={isEditing ? profileForm.companyName : (displayUser?.companyName || '')}
                    readOnly={!isEditing}
                    placeholder="Enter your company name"
                    onChange={(e) => setProfileForm((prev) => ({ ...prev, companyName: e.target.value }))}
                  />
              </label>
              <label>
                Professional Title
                  <input
                    type="text"
                    value={isEditing ? profileForm.professionalTitle : (displayUser?.professionalTitle || '')}
                    readOnly={!isEditing}
                    placeholder="Enter your professional title"
                    onChange={(e) => setProfileForm((prev) => ({ ...prev, professionalTitle: e.target.value }))}
                  />
              </label>
              <label>
                University name
                <input
                  type="text"
                  value={isEditing ? profileForm.universityName : (displayUser?.universityName || '')}
                  readOnly={!isEditing}
                  placeholder="Enter your university name"
                  onChange={(e) => setProfileForm((prev) => ({ ...prev, universityName: e.target.value }))}
                />
              </label>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="account__empty">
              There are no certificates available for view.
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="billing">
              <div className="billing__form">
                <label className="billing__field">
                  Name on Card <span aria-hidden="true">&#9432;</span>
                  <input type="text" placeholder="" />
                </label>
                <label className="billing__field">
                  Billing Address <span aria-hidden="true">&#9432;</span>
                  <input type="text" placeholder="" />
                </label>
                <label className="billing__field billing__field--accent">
                  Card Number <span aria-hidden="true">&#9432;</span>
                  <input type="text" placeholder="1 2 3 4   -   -   -   -" />
                </label>
                <div className="billing__row">
                  <label className="billing__field">
                    CCV <span aria-hidden="true">&#9432;</span>
                    <input type="text" placeholder="---" />
                  </label>
                  <label className="billing__field">
                    Expiration Date <span aria-hidden="true">&#9432;</span>
                    <input type="text" placeholder="MM / YY" />
                  </label>
                </div>
              </div>
              <div className="billing__history">
                <h4>Order History</h4>
                {['Course name', 'Course name', 'Course name', 'Course name'].map((item, index) => (
                  <div key={`${item}-${index}`} className="billing__history-card">
                    <div>
                      <div className="billing__history-title">{item}</div>
                      <div className="billing__history-date">Date purchased:</div>
                    </div>
                    <div className="billing__history-price">$433</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      </div>
      {snackbarOpen && (
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
        <span style={{ flex: 1, fontSize: '14px' }}>{saveMessage}</span>
        <button
          type="button"
          onClick={() => setSnackbarOpen(false)}
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
          x
        </button>
      </div>
    )}
    </>
  );
}
