import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import { useAuth } from '../context/AuthContext';

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate('/courses');
  };
  
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>
            Earn Affordable,<br />
            <span className="highlight">Transferable College</span><br />
            <span className="highlight">Credits</span> – 100% Online
          </h1>
          <p>
            Study with Sophia to earn college credits online that transfer to 
            40+ partner colleges. Fast, flexible, and affordable courses designed 
            to fit into your busy life.
          </p>
          {!isAuthenticated && (
            <div className="hero-actions">
              <button className="btn-secondary">Book Call</button>
              <button className="btn-primary" onClick={handleEnroll}>Enroll</button>
            </div>
          )}
        </div>
        
        <div className="hero-image">
          <div className="image-placeholder">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop" 
              alt="Students studying together"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
