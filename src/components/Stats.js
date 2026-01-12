import React from 'react';
import './Stats.css';
import trustedBy from '../assets/Trustedby.png';

const Stats = () => {
  return (
    <section className="stats">
      <div className="stats-container">
        <img src={trustedBy} alt="Trusted by" className="trustedby-image" />
      </div>
    </section>
  );
};

export default Stats;
