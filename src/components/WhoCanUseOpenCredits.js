import React from 'react';
import './WhoCanUseOpenCredits.css';
import toWhomImage from '../assets/towhom.png';

const WhoCanUseOpenCredits = () => {
  return (
    <section className="who-section">
      <div className="who-container">
        <h2>
          Who can use <span className="highlight">Open Credits</span>?
        </h2>
        <div className="who-image">
          <img src={toWhomImage} alt="Who can use Open Credits" />
        </div>
      </div>
    </section>
  );
};

export default WhoCanUseOpenCredits;
