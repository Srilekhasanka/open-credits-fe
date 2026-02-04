import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import { useAuth } from '../context/AuthContext';

const homeStudent = '/images/homestudent.svg';

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate('/enroll');
  };
  
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            <span className="hero-no-break">Earn Affordable,</span><br />
            <span className="highlight">Transferable College</span><br />
            <span className="highlight">Credits</span> - 100% Online
          </h1>
          <p>
            Flexible, accredited online courses designed to{' '}
            <span className="hero-no-break">transfer. Lower your costs,</span> gain college credit,
            and move forward with confidence.
          </p>
          {!isAuthenticated && (
            <div className="hero-actions">
              <button className="btn-chat" type="button">
                Chat Now
              </button>
              <button className="btn-primary" type="button" onClick={handleEnroll}>
                Enroll Now
              </button>
            </div>
          )}
        </div>
        
        <div className="hero-image">
          <div className="image-frame">
            <img src={homeStudent} alt="Students studying together" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
