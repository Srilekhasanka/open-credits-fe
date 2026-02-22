import React from 'react';
import './WhoCanUseOpenCredits.css';

const highschoolGirl = '/images/Highschoolgirl.svg';
const universityBoy = '/images/Universityboy.svg';
const adultUncle = '/images/Adultuncle.svg';

const cards = [
  { img: highschoolGirl, title: 'High School', subtitle: 'Students', href: '/partnerships/k-12' },
  { img: universityBoy, title: 'University', subtitle: 'Students', href: '/partnerships/higher-education' },
  { img: adultUncle, title: 'Adult', subtitle: 'Learners', href: '/partnerships/corporate', className: 'who-card--adult' }
];

const WhoCanUseOpenCredits = () => {
  return (
    <section className="who-section">
      <div className="who-container">
        <h2>
          Who can use <span className="highlight">Open Credits?</span>
        </h2>
        <div className="who-grid">
          {cards.map((card) => (
            <article
              className={`who-card${card.className ? ` ${card.className}` : ''}`}
              key={`${card.title}-${card.subtitle}`}
              style={{ backgroundImage: `url(${card.img})` }}
            >
              <div className="who-card__footer">
                <div className="who-card__label">
                  <span className="who-card__title">{card.title}</span>
                  <span className="who-card__subtitle">{card.subtitle}</span>
                </div>
                <a className="who-card__link" href={card.href}>
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoCanUseOpenCredits;
