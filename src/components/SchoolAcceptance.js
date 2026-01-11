import React from 'react';
import './SchoolAcceptance.css';

const SchoolAcceptance = () => {
  return (
    <section className="school-acceptance">
      <div className="acceptance-container">
        <div className="acceptance-content">
          <h2>Does My School Accept This Course?</h2>
          <p>
            We'll help you check. UPI Study courses are ACE & NCCRS-recommended, 
            and students have successfully transferred credits to 1733+ universities. 
            You can check your college in our list so you can move forward with 
            confidence or schedule a call.
          </p>
          
          <div className="acceptance-buttons">
            <button className="btn-outline">Find accepted Colleges</button>
            <button className="btn-primary">Talk to an Advisor</button>
          </div>
        </div>

        <div className="guarantee-badge">
          <div className="badge-card">
            <div className="badge-top">
              <span className="badge-ribbon">GUARANTEED</span>
              <div className="badge-stars">★★★</div>
              <div className="badge-graduates">
                <svg width="80" height="60" viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="25" r="12" fill="#FFD700"/>
                  <circle cx="50" cy="20" r="14" fill="#5B4B9E"/>
                  <circle cx="70" cy="25" r="12" fill="#FF6633"/>
                  <rect x="20" y="37" width="20" height="30" fill="#FFD700"/>
                  <rect x="40" y="34" width="20" height="35" fill="#5B4B9E"/>
                  <rect x="60" y="37" width="20" height="30" fill="#FF6633"/>
                  <path d="M30 15 L25 8 L35 8 Z" fill="#333"/>
                  <path d="M50 10 L45 3 L55 3 Z" fill="#333"/>
                  <path d="M70 15 L65 8 L75 8 Z" fill="#333"/>
                </svg>
              </div>
            </div>
            <div className="badge-bottom">
              <span className="badge-main-text">CREDIT TRANSFER</span>
              <span className="badge-sub-text">TO ACCREDITED UNIVERSITIES</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolAcceptance;
