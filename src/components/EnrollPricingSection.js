import React from 'react';
import './EnrollPricingSection.css';

const pricingCards = [
  {
    title: 'Single Course - One time Pay (US Nationals and Military)',
    description: 'One course, pay only once and get 3 Credits.',
    price: '$250',
    priceSuffix: '/ course',
    bullets: [
      '1 transferable college-credit courses',
      'No time restrictions',
      'Loan approval Letter'
    ],
    cta: 'Enroll Now',
    variant: 'outline',
    icon: (
      <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <rect x="18" y="48" width="84" height="44" rx="6" />
        <path d="M20 52l40-26 40 26" />
        <path d="M60 26v30" />
        <circle cx="60" cy="26" r="6" />
      </svg>
    )
  },
  {
    title: 'Single Course - One time Pay (International Students)',
    description: 'One course, pay only once and get 3 Credits.',
    price: '$850',
    priceSuffix: '/ course',
    bullets: [
      '1 transferable college-credit courses',
      'No time restrictions',
      'Loan approval Letter'
    ],
    cta: 'Enroll Now',
    variant: 'outline',
    icon: (
      <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <rect x="18" y="48" width="84" height="44" rx="6" />
        <path d="M20 52l40-26 40 26" />
        <circle cx="60" cy="34" r="12" />
        <path d="M48 34h24M60 22v24" />
      </svg>
    )
  },
  {
    title: 'University specific Pricing and bundle discounts (Custom Plan)',
    description: 'Custom Courses, bundles and university specific pricing',
    price: null,
    priceSuffix: null,
    bullets: ['Custom Plan for you', 'No time restrictions', 'Loan approval Letter'],
    cta: 'Calculate Now',
    variant: 'solid',
    icon: (
      <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <rect x="18" y="48" width="84" height="44" rx="6" />
        <path d="M20 52l40-26 40 26" />
        <rect x="48" y="24" width="24" height="18" rx="2" />
        <rect x="52" y="28" width="6" height="10" />
        <rect x="62" y="28" width="6" height="10" />
      </svg>
    )
  }
];

const EnrollPricingSection = () => {
  const mailHref = 'mailto:Connect@opencredits.org';

  return (
    <section className="enroll-pricing-section">
      <div className="enroll-pricing-container">
        <h2>Enroll now</h2>
        <p className="enroll-pricing-note">
          NOTE : Education loans or sponsorships can be used to take Open Credits Courses. We
          provide an official offer letter on request. Send us an Email -
          <a href={mailHref}>Connect@opencredits.org</a>
        </p>

        <div className="enroll-pricing-grid">
          {pricingCards.map((card) => (
            <article key={card.title} className="enroll-pricing-card">
              <div className="enroll-pricing-visual">{card.icon}</div>
              <h3>{card.title}</h3>
              <p className="enroll-pricing-desc">{card.description}</p>
              {card.price && (
                <div className="enroll-pricing-price">
                  <span className="enroll-price-main">{card.price}</span>
                  <span className="enroll-price-sub">{card.priceSuffix}</span>
                </div>
              )}
              <ul className="enroll-pricing-list">
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <button
                type="button"
                className={`enroll-pricing-cta enroll-pricing-cta--${card.variant}`}
              >
                {card.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnrollPricingSection;
