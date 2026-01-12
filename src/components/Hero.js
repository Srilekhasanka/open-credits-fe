import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import { useAuth } from '../context/AuthContext';
import homeStudent from '../assets/homestudent.png';
import whatsappIcon from '../assets/whatsapp.png';

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
            Credits - 100% Online
          </h1>
          <p>
            We offer self-paced, accredited online courses recommended for
            college credit. Save money, finish faster, and build a pathway toward
            your degree.
          </p>
          {!isAuthenticated && (
            <div className="hero-actions">
              <button className="btn-chat">
                Chat Now
                <img src={whatsappIcon} alt="" className="chat-icon" />
              </button>
              <button className="btn-primary" onClick={handleEnroll}>Talk to an Advisor</button>
            </div>
          )}
        </div>
        
        <div className="hero-image">
          <div className="image-frame">
            <img src={homeStudent} alt="Students studying together" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
