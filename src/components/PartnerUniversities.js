import React from 'react';
import partneredImage from '../assets/partnereduni.png';
import './PartnerUniversities.css';

const PartnerUniversities = () => {
  return (
    <section className="partner-universities">
      <div className="universities-container">
        <h2>
          Partnered <span className="highlight">Universities</span>
        </h2>
        <div className="partnered-search">
          <input type="text" placeholder="Search your college" aria-label="Search your college" />
          <span className="partnered-search-icon" aria-hidden="true" />
        </div>
        <div className="partnered-image-wrap">
          <img
            className="partnered-image"
            src={partneredImage}
            alt="Partnered universities"
          />
        </div>
        <div className="partnered-footer">
          <span>Can't find your University?</span>
          <button className="partnered-footer-button" type="button">Talk to an Advisor</button>
        </div>
      </div>
    </section>
  );
};

export default PartnerUniversities;
