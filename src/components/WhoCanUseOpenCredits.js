import React from 'react';
import './WhoCanUseOpenCredits.css';

const highschoolGirl = '/images/Highschoolgirl.svg';
const universityBoy = '/images/Universityboy.svg';
const adultUncle = '/images/Adultuncle.svg';

const cards = [
  { img: highschoolGirl, title: 'High School', subtitle: 'Students', href: '/get-started' },
  { img: universityBoy, title: 'University', subtitle: 'Students', href: '/get-started' },
  { img: adultUncle, title: 'Adult', subtitle: 'Learners', href: '/get-started' }
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
              className="who-card"
              key={`${card.title}-${card.subtitle}`}
              style={{ backgroundImage: `url(${card.img})` }}
            >
              <div className="who-card__footer">
                <div className="who-card__label">
                  <span>{card.title}</span>
                  <span>{card.subtitle}</span>
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
