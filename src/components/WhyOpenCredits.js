import React from 'react';
import './WhyOpenCredits.css';
import { FaDollarSign, FaExchangeAlt, FaLaptop } from 'react-icons/fa';

const WhyOpenCredits = () => {
  const features = [
    {
      icon: <FaDollarSign />,
      title: 'Affordable Tuition Cost',
      description: 'Our courses are priced at $180 per credit hour, which is substantially less than what most US universities cost for similar courses.'
    },
    {
      icon: <FaExchangeAlt />,
      title: 'Transferable Credits',
      description: 'All of our courses transfer to 40+ major universities so you can finish your degree at the school of your choice.'
    },
    {
      icon: <FaLaptop />,
      title: 'Self-Paced Learning',
      description: 'Take a single course or get all 60 credits at your own pace.'
    }
  ];

  return (
    <section className="why-section">
      <div className="why-container">
        <h2>Why <span className="highlight">Open Credits</span>?</h2>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <a href="#learn-more" className="learn-more">Learn more →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOpenCredits;
