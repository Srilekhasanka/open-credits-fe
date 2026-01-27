import React from 'react';
import { Link } from 'react-router-dom';
import ubLogo from '../assets/ub.png';
import stonyLogo from '../assets/stony.png';
import sdsuLogo from '../assets/sdsu.png';
import paceLogo from '../assets/pace.png';
import './FeaturedUniversities.css';

const FeaturedUniversities = () => {
  const universities = [
    { name: 'University at Buffalo', logo: ubLogo, slug: 'university-at-buffalo' },
    { name: 'Stony Brook University', logo: stonyLogo, slug: 'stony-brook-university' },
    {
      name: 'San Diego State University',
      logo: sdsuLogo,
      slug: 'san-diego-state-university'
    },
    { name: 'Pace University', logo: paceLogo, slug: 'pace-university' }
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
                <img src={university.logo} alt={university.name} />
              </div>
              <Link className="featured-button" to={`/universities/${university.slug}`}>
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;
