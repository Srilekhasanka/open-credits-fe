import React from 'react';
import './EnrollPricingSection.css';
import peopleBox from '../assets/peoplebox.png';
import globeBox from '../assets/globebox.png';
import buildingBox from '../assets/buildingbox.png';
import peopleSub1 from '../assets/peoplesub1.png';
import peopleSub2 from '../assets/peoplesub2.png';

const pricingCards = [
  {
    title: 'Single Course -\nOne time Pay (US Nationals and Military)',
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
      <>
        <img className="enroll-pricing-sub enroll-pricing-sub--left" src={peopleSub2} alt="" aria-hidden="true" />
        <img className="enroll-pricing-sub enroll-pricing-sub--right" src={peopleSub1} alt="" aria-hidden="true" />
        <img className="enroll-pricing-main" src={peopleBox} alt="" aria-hidden="true" />
      </>
    )
  },
  {
    title: 'Single Course -\nOne time Pay (International Students)',
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
    icon: <img src={globeBox} alt="" aria-hidden="true" />
  },
  {
    title: 'University specific Pricing\nand bundle discounts\n(Custom Plan)',
    description: 'Custom Courses, bundles and university specific pricing',
    price: null,
    priceSuffix: null,
    bullets: ['Custom Plan for you', 'No time restrictions', 'Loan approval Letter'],
    cta: 'Calculate Now',
    variant: 'solid',
    icon: <img src={buildingBox} alt="" aria-hidden="true" />
  }
];

const EnrollPricingSection = () => {
  const mailHref = 'mailto:Connect@opencredits.org';

  return (
    <section className="enroll-pricing-section">
      <div className="enroll-pricing-container">
        <h2>Enroll now</h2>
        <p className="enroll-pricing-note">
          <strong>
            NOTE : Education loans or sponsorships can be used to take Open Credits Courses. We
            provide an official offer letter on request.
            <br /> Send us an Email -
            <a href={mailHref}>Connect@opencredits.org</a>
          </strong>
        </p>

        <div className="enroll-pricing-grid">
          {pricingCards.map((card) => (
            <article key={card.title} className="enroll-pricing-card">
              <div className="enroll-pricing-visual">{card.icon}</div>
              <h3>{card.title}</h3>
              <p className="enroll-pricing-desc">{card.description}</p>
              <ul className="enroll-pricing-list">
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {card.price && (
                <div className="enroll-pricing-price">
                  <span className="enroll-price-main">{card.price}</span>
                  <span className="enroll-price-sub">{card.priceSuffix}</span>
                </div>
              )}
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
