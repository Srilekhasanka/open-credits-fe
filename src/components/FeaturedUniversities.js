import React from 'react';
import ubLogo from '../assets/ub.png';
import stonyLogo from '../assets/stony.png';
import sdsuLogo from '../assets/sdsu.png';
import paceLogo from '../assets/pace.png';
import './FeaturedUniversities.css';

const FeaturedUniversities = () => {
  const universities = [
    { name: 'University at Buffalo', logo: ubLogo },
    { name: 'Stony Brook University', logo: stonyLogo },
    { name: 'San Diego State University', logo: sdsuLogo },
    { name: 'Pace University', logo: paceLogo }
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
            <div className="featured-card" key={university.name}>
              <div className="featured-logo">
                <img src={university.logo} alt={university.name} />
              </div>
              <button type="button" className="featured-button">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;
