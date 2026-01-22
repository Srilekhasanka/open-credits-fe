import React from 'react';
import communityImage from '../assets/community_image.png';
import communityWhyImage from '../assets/community_why.png';
import orangeCommunityImage from '../assets/orange_community.png';
import WorkProcess from '../components/WorkProcess';
import './CommunityPartnershipsPage.css';

const CommunityPartnershipsPage = () => (
  <section className="community-page">
    <div className="community-container">
      <div className="community-hero">
        <img src={communityImage} alt="Community partnership" />
      </div>
      <h1>
        Community <span>Partnerships</span>
      </h1>
      <p>
        Education should not be limited by cost, background, or timing. Open Credits helps learners
        move forward with affordable, flexible, online courses designed to support college progress
        and career mobility.
      </p>
      <div className="community-actions">
        <button type="button" className="community-button is-outline">
          Get a Partnership Proposal
        </button>
        <button type="button" className="community-button">
          Talk to us
        </button>
      </div>
    </div>

    <section className="community-why">
      <div className="community-container">
        <div className="community-why-header">
          <h2>
            Why Companies Choose <span>Open Credits?</span>
          </h2>
          <p className="community-why-lead">Open doors through flexible education pathways</p>
          <p>
            When you partner with Open Credits, you support progress toward life changing goals.
            Our partnerships help organizations and institutions expand access to learning, improve
            outcomes, and create meaningful impact.
          </p>
        </div>
        <div className="community-why-image">
          <img src={communityWhyImage} alt="Why companies choose Open Credits" />
        </div>
      </div>
    </section>

    <section className="community-orange">
      <div className="community-container">
        <div className="community-orange__card">
          <img src={orangeCommunityImage} alt="Employees love Open Credits" />
        </div>
      </div>
    </section>

    <WorkProcess />

    <section className="savings-section">
      <div className="community-container">
        <h2>
          Calculate how much you save with <span>Open Credits</span>
        </h2>
        <div className="savings-card">
          <div className="savings-left">
            <div className="savings-field">
              <label>Pick your University</label>
              <div className="savings-input">
                <input type="text" placeholder="Search your college" />
                <span className="savings-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" focusable="false">
                    <circle cx="9" cy="9" r="6" />
                    <line x1="13.5" y1="13.5" x2="18" y2="18" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="savings-field">
              <label>Number of Courses</label>
              <div className="savings-input">
                <select>
                  <option>1 (1 course = 3 Credits)</option>
                  <option>2 (2 courses = 6 Credits)</option>
                  <option>3 (3 courses = 9 Credits)</option>
                </select>
              </div>
            </div>
            <div className="savings-field">
              <label>Student Type</label>
              <div className="savings-toggle">
                <button type="button" className="is-active">U.S Local/ Military</button>
                <button type="button">International Student</button>
              </div>
            </div>
            <div className="savings-breakdown">
              <h3>Breakdown</h3>
              <div className="savings-row">
                <span>Estimated cost per course (3 credits):</span>
                <span>$1400</span>
              </div>
              <div className="savings-row">
                <span>Estimated cost of living (per semester):</span>
                <span>$1400</span>
              </div>
              <div className="savings-row">
                <span>What you pay Open Credits per course (3 credits):</span>
                <span>$750</span>
              </div>
              <div className="savings-row is-total">
                <span>You save:</span>
                <span>$1400</span>
              </div>
            </div>
          </div>
          <div className="savings-right">
            <div className="savings-pill">
              <div>You Pay</div>
              <strong>$11,000</strong>
              <span>without Open Credits</span>
            </div>
            <div className="savings-pill is-accent">
              <div>You Pay</div>
              <strong>$2,000</strong>
              <span>with Open Credits (Tax included)</span>
            </div>
          </div>
          <div className="savings-bundles">
            <h3>Also See - Bundle Savings</h3>
            <div className="savings-bundle-grid">
              <div className="savings-bundle">
                <div className="bundle-label">6 Course Bundle</div>
                <div className="bundle-price">$2,000</div>
                <div className="bundle-note">Save upto $11,000</div>
              </div>
              <div className="savings-bundle">
                <div className="bundle-label">12 Course Bundle</div>
                <div className="bundle-price">$2,000</div>
                <div className="bundle-note">Save upto $11,000</div>
              </div>
              <div className="savings-bundle">
                <div className="bundle-label">24 Course Bundle</div>
                <div className="bundle-price">$2,000</div>
                <div className="bundle-note">Save upto $11,000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
);

export default CommunityPartnershipsPage;
