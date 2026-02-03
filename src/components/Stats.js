import React from 'react';
import './Stats.css';

const emojiPeople = '/images/emoji_people.svg';
const locationCity = '/images/location_city.svg';
const groups2 = '/images/groups_2.svg';
const apartment = '/images/apartment.svg';

const trustedStats = [
  { label: 'Advisors', value: '100+', icon: emojiPeople },
  { label: 'Colleges', value: '1500+', icon: locationCity },
  { label: 'Students', value: '100k+', icon: groups2 },
  { label: 'High Schools', value: '250+', icon: apartment }
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
              <img className="stats-icon" src={item.icon} alt="" aria-hidden="true" />
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
