import React from 'react';
import partneredImage from '../assets/partnereduni.png';
import './FeaturedUniversities.css';

const FeaturedUniversities = () => {
  return (
    <section className="featured-universities">
      <div className="featured-container">
        <h2>
          Partnered <span className="highlight">Universities</span>
        </h2>
        <div className="featured-image-wrap">
          <img
            className="featured-image"
            src={partneredImage}
            alt="Partnered universities"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;
