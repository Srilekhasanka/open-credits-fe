import React from 'react';
import './SchoolAcceptance.css';
import graduatedImage from '../assets/graduated.png';

const SchoolAcceptance = () => {
  return (
    <section className="school-acceptance">
      <div className="acceptance-wrapper">
        <div className="acceptance-container">
          <div className="acceptance-content">
            <h2>Does My School Accept This Course?</h2>
            <p>
              <span className="acceptance-intro">
                We'll help you confirm it. Open Credits courses are recommended by
              </span>{' '}
              <span className="acceptance-midline">
                nationally recognized credit evaluators, and students have successfully
              </span>{' '}
              <span className="acceptance-line">
                transferred credits to 1,500+ universities. Check your college on our list or
              </span>{' '}
              <span className="acceptance-line">
                schedule a call to move forward with confidence.
              </span>
            </p>
            
            <div className="acceptance-buttons">
              <button className="btn-outline">Find accepted Colleges</button>
              <button className="btn-primary">Talk to an Advisor</button>
            </div>
          </div>
        </div>

        <div className="guarantee-badge">
          <div className="badge-card">
            <img src={graduatedImage} alt="Credit transfer guarantee" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolAcceptance;
