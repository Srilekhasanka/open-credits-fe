import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart, FiCopy } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/constants';
import '../components/DashboardLayout.css';

const AffiliateDashboardPage = () => {
  const { isAuthenticated, user, cartItems } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('links');
  const [referralData, setReferralData] = useState(null);
  const [loadingReferral, setLoadingReferral] = useState(false);
  const [referralError, setReferralError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const displayName = user?.email ? user.email.split('@')[0] : 'Student';
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
  const displayInitial = formattedName.charAt(0);

  useEffect(() => {
    if (!isAuthenticated) return;
    let isMounted = true;

    const fetchReferral = async () => {
      setLoadingReferral(true);
      setReferralError('');
      try {
        const response = await apiService.get(API_ENDPOINTS.REFERRALS.ME);
        const payload = response?.payload || response?.data || response;
        if (isMounted) {
          setReferralData(payload);
        }
      } catch (error) {
        if (isMounted) {
          setReferralError('Unable to load referral details.');
        }
      } finally {
        if (isMounted) {
          setLoadingReferral(false);
        }
      }
    };

    fetchReferral();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!copyMessage) return;
    const timer = setTimeout(() => setCopyMessage(''), 1800);
    return () => clearTimeout(timer);
  }, [copyMessage]);

  const referralCode =
    referralData?.code ||
    referralData?.referral_code ||
    referralData?.referralCode ||
    '';
  const referralLink =
    referralData?.link ||
    referralData?.referral_link ||
    referralData?.referralLink ||
    (referralCode ? `https://www.opencredits.org/?ref=${referralCode}` : 'https://www.opencredits.org/');

  const handleCopy = async (value, label = 'Copied') => {
    if (!value || value === '—' || value === 'Loading...') {
      setCopyMessage('Nothing to copy');
      return;
    }

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopyMessage(label);
    } catch (error) {
      setCopyMessage('Copy failed');
    }
  };

  const affiliateStats = [
    { label: 'Total Commissions Owed', value: referralData?.commissions_owed ?? '$0.00' },
    { label: 'Total Commissions Paid', value: referralData?.commissions_paid ?? '$0.00' },
    { label: 'Total Commissions Earned', value: referralData?.commissions_earned ?? '$0.00' },
    { label: 'Payout', value: referralData?.payout ?? '$0.00' }
  ];

  const rows = [
    { name: 'Course Title Course Title Course Title', link: 'Reference Link' },
    { name: 'Course Title Course Title Course Title', link: 'Reference Link' },
    { name: 'Course Title Course Title Course Title', link: 'Reference Link' }
  ];

  const visitorRows = [
    { date: 'Jan 20, 2025', visitors: 12 },
    { date: '12/12/2012', visitors: 12 },
    { date: '12/12/2012', visitors: 12 },
    { date: '12/12/2012', visitors: 12 },
    { date: '12/12/2012', visitors: 12 }
  ];

  if (!isAuthenticated) {
    return (
      <div className="dashboard__auth-cta">
        <div className="dashboard__auth-card">
          <h1>Please sign in to view affiliate details</h1>
          <p>Access your commissions and referral links after signing in.</p>
          <button onClick={() => navigate('/signin')}>Sign In</button>
        </div>
      </div>
    );
  }

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

      <section className="affiliate">
        <div className="affiliate__header">
          <h2>Affiliate Information</h2>
          <p>Your affiliate commission: {referralData?.commission ?? '20.00%'} of sales price</p>
        </div>

        <div className="affiliate__stats">
          {affiliateStats.map((stat) => (
            <div key={stat.label} className="affiliate__stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
        {referralError && <div className="mycourses__loading">{referralError}</div>}

        <div className="affiliate__tabs">
          <button
            className={`affiliate__tab ${activeTab === 'links' ? 'affiliate__tab--active' : ''}`}
            type="button"
            onClick={() => setActiveTab('links')}
          >
            Your Links
          </button>
          <button
            className={`affiliate__tab ${activeTab === 'insights' ? 'affiliate__tab--active' : ''}`}
            type="button"
            onClick={() => setActiveTab('insights')}
          >
            Insights
          </button>
          <button
            className={`affiliate__tab ${activeTab === 'settings' ? 'affiliate__tab--active' : ''}`}
            type="button"
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {activeTab === 'links' && (
          <>
            <div className="affiliate__section">
              <h3>Homepage Link</h3>
              <div className="affiliate__link-row">
                <input type="text" value={loadingReferral ? 'Loading...' : referralLink} readOnly />
                <button
                  type="button"
                  aria-label="Copy homepage link"
                  onClick={() => handleCopy(referralLink, 'Homepage link copied')}
                >
                  <FiCopy />
                </button>
              </div>
            </div>

            <div className="affiliate__section">
              <div className="affiliate__section-header">
                <div>
                  <h3>Course Links</h3>
                  <span>https://www.upistudy.com/?ref=b70734</span>
                </div>
                <div className="affiliate__table-search">
                  <input type="text" placeholder="Search Courses" aria-label="Search courses" />
                  <FiSearch />
                </div>
              </div>

              <div className="affiliate__table">
                <div className="affiliate__table-head">
                  <span>Course Name</span>
                  <span>Link</span>
                  <span>Copy</span>
                </div>
                {rows.map((row, index) => (
                  <div key={`${row.name}-${index}`} className="affiliate__table-row">
                    <span>{row.name}</span>
                    <span>{row.link}</span>
                    <button type="button" aria-label="Copy link">
                      <FiCopy />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'insights' && (
          <div className="affiliate__section">
            <h3>Visitors</h3>
            <div className="affiliate__visitors-table">
              <div className="affiliate__visitors-head">
                <span>Date</span>
                <span>Visitors</span>
              </div>
              {visitorRows.map((row, index) => (
                <div key={`${row.date}-${index}`} className="affiliate__visitors-row">
                  <span>{row.date}</span>
                  <span>{row.visitors}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="affiliate__section">
            <h3>Settings</h3>
            <div className="affiliate__settings">
              <div className="affiliate__field">
                <label>Affiliate Code</label>
                <div className="affiliate__field-row">
                  <input type="text" value={loadingReferral ? 'Loading...' : (referralCode || '—')} readOnly />
                  <button
                    type="button"
                    aria-label="Copy affiliate code"
                    onClick={() => handleCopy(referralCode, 'Referral code copied')}
                  >
                    <FiCopy />
                  </button>
                </div>
              </div>

              <div className="affiliate__field">
                <label>Commission</label>
                <input type="text" value="20%" readOnly />
              </div>

              <div className="affiliate__field">
                <label>Bank Information</label>
                <input type="text" value="example@gmail.com" readOnly />
              </div>

              <button className="affiliate__save" type="button">
                Save changes
              </button>
            </div>
          </div>
        )}
      </section>
      {copyMessage && <div className="dashboard__toast">{copyMessage}</div>}
    </div>
  );
};

export default AffiliateDashboardPage;
