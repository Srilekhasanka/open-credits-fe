import React from 'react';
import './Stats.css';

const trustedStats = [
  { label: 'Advisors', value: '100+' },
  { label: 'Colleges', value: '1500+' },
  { label: 'Students', value: '100k+' },
  { label: 'High Schools', value: '250+' }
];

const Stats = () => {
  return (
    <section className="stats" aria-labelledby="trusted-by-title">
      <div className="stats-container">
        <div className="stats-title" id="trusted-by-title">
          TRUSTED BY
        </div>
        <div className="stats-grid">
          {trustedStats.map((item) => (
            <div key={item.label} className="stats-item">
              <div className="stats-icon" aria-hidden="true" />
              <div className="stats-value">{item.value}</div>
              <div className="stats-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
