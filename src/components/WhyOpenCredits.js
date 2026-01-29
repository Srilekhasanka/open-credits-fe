import React from 'react';
import './WhyOpenCredits.css';
import { FaBook, FaBolt, FaDollarSign, FaExchangeAlt } from 'react-icons/fa';

const WhyOpenCredits = () => {
  const features = [
    {
      icon: <FaDollarSign />,
      title: 'Affordable Tuition Cost',
      description: 'Save significantly compared to traditional college courses, without sacrificing quality or credibility.',
      linkLabel: 'Calculate pricing',
      linkHref: '#pricing'
    },
    {
      icon: <FaExchangeAlt />,
      title: 'Transferable\u00A0College\nCredits',
      description: 'Courses recommended by nationally recognized credit evaluators at 1000+ colleges.',
      linkLabel: 'View Courses',
      linkHref: '/courses'
    },
    {
      icon: <FaBook />,
      title: 'Self-Paced Learning',
      description: 'Learn anytime, anywhere with no start or end dates.',
      linkLabel: 'View accepted colleges',
      linkHref: '#accepted-colleges'
    },
    {
      icon: <FaBolt />,
      title: 'Graduate Faster',
      description: 'Earn transferable credits on your schedule and reduce time to graduation.',
      linkLabel: 'Schedule Call',
      linkHref: '/get-started'
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
              <h3>
                {feature.title.split('\n').map((line, index, arr) => (
                  <React.Fragment key={`${feature.title}-${index}`}>
                    {line}
                    {index < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h3>
              <p>{feature.description}</p>
              <a href={feature.linkHref} className="learn-more">
                {feature.linkLabel} <span className="learn-more__arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOpenCredits;
