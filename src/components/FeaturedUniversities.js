import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedUniversities.css';

const ubLogo = '/images/ub.svg';
const stonyLogo = '/images/stony.svg';
const sdsuLogo = '/images/sdsu.svg';
const paceLogo = '/images/pace.svg';

const FeaturedUniversities = () => {
  const universities = [
    {
      name: 'University at Buffalo',
      logo: ubLogo,
      slug: 'university-at-buffalo',
      isRoutable: false,
      logoWidth: 158,
      logoHeight: 122
    },
    {
      name: 'Stony Brook University',
      logo: stonyLogo,
      slug: 'stony-brook-university',
      logoWidth: 234,
      logoHeight: 86
    },
    {
      name: 'San Diego State University',
      logo: sdsuLogo,
      slug: 'san-diego-state-university',
      logoWidth: 142,
      logoHeight: 111
    },
    {
      name: 'Pace University',
      logo: paceLogo,
      slug: 'pace-university',
      logoWidth: 161,
      logoHeight: 71
    }
  ];

  return (
    <section className="featured-universities">
      <div className="featured-container">
        <h2>
          Featured <span className="highlight">Universities</span>
        </h2>
        <p className="featured-description">
          Our featured universities come with transfer guarantees. We ensure that credits you earn
          through Open Credits are accepted, so you can move forward with confidence toward your degree.
        </p>
        <div className="featured-grid">
          {universities.map((university) => (
            <div className="featured-card" key={university.slug}>
              <div className="featured-logo">
                <img
                  src={university.logo}
                  alt={university.name}
                  style={{
                    width: `${university.logoWidth}px`,
                    height: `${university.logoHeight}px`
                  }}
                />
              </div>
              {university.isRoutable === false ? (
                <span className="featured-button is-disabled" aria-disabled="true">
                  Learn More
                </span>
              ) : (
                <Link className="featured-button" to={`/universities/${university.slug}`}>
                  Learn More
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;
