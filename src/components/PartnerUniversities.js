import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PartnerUniversities.css';
import { universities } from '../data/universities';

const PartnerUniversities = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUniversities = universities.filter((uni) =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="partner-universities">
      <div className="universities-container">
        <h2>
          Partnered <span className="highlight">Universities</span>
        </h2>
        <div className="partnered-image-wrap">
          <div className="partnered-search">
            <input
              type="text"
              placeholder="Search your college"
              aria-label="Search your college"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <span className="partnered-search-icon" aria-hidden="true" />
          </div>
          <div className="partnered-grid">
            {filteredUniversities.map((university) => (
              university.hasPartnerPage ? (
                <Link
                  key={university.slug}
                  className={`partnered-card${university.fullBleed ? ' full-bleed' : ''}`}
                  to={`/universities/${university.slug}`}
                  aria-label={`View ${university.name}`}
                >
                  {university.logo ? (
                    <img src={university.logo} alt={university.name} />
                  ) : (
                    <span style={{ color: university.color }}>{university.name}</span>
                  )}
                </Link>
              ) : (
                <div
                  key={university.slug}
                  className={`partnered-card${university.fullBleed ? ' full-bleed' : ''}`}
                  aria-label={university.name}
                >
                  {university.logo ? (
                    <img src={university.logo} alt={university.name} />
                  ) : (
                    <span style={{ color: university.color }}>{university.name}</span>
                  )}
                </div>
              )
            ))}
          </div>
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
