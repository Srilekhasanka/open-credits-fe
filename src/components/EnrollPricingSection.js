import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EnrollPricingSection.css';

const globeBox = '/images/globebox.svg';
const buildingBox = '/images/buildingbox.svg';

const pricingCards = [
  {
    title: 'Single Course - One time Pay',
    description: 'One course, pay only once and get 3 Credits.',
    price: '$850',
    priceSuffix: '/ course',
    bullets: [
      '1 transferable college- credit courses',
      'No time restrictions product',
      'Loan approval Letter'
    ],
    cta: 'Enroll Now',
    variant: 'outline',
    icon: <img className="enroll-pricing-main" src={globeBox} alt="" aria-hidden="true" />
  },
  {
    title: 'Bundle Savings\n(6, 12, 24 courses)',
    description: 'One course, pay only once and get 3 Credits.',
    price: null,
    priceSuffix: null,
    bullets: [
      '1 transferable college- credit courses',
      'No time restrictions product',
      'Loan approval Letter'
    ],
    cta: 'Calculate Now',
    variant: 'solid',
    icon: (
      <img
        className="enroll-pricing-main enroll-pricing-main--building"
        src={buildingBox}
        alt=""
        aria-hidden="true"
      />
    )
  }
];

const EnrollPricingSection = ({ className = '' }) => {
  const navigate = useNavigate();
  const emailSubject = 'Letter of Utilisation of Education Loan Funds for Undergraduate Academic Program';
  const emailBody =
    'To,\r\nWhomsoever It May Concern\r\n\r\n' +
    'Subject: Letter of Utilisation of Education Loan Funds for Undergraduate Academic Program\r\n\r\n' +
    'This letter is issued to formally certify the utilization of education loan funds by the student ' +
    'mentioned below for approved academic purposes through [Program / Platform Name].\r\n\r\n' +
    'Student Details:\r\n' +
    '• Full Name: [Student Full Name]\r\n' +
    '• Date of Birth: [DD Month YYYY]\r\n' +
    '• Address: [Full Residential Address]\r\n\r\n' +
    'The student is currently enrolled as an undergraduate student majoring in [Major / Field of ' +
    'Study] at [University Name].\r\n\r\n' +
    'An amount of USD [Amount] from the sanctioned education loan shall be utilized toward ' +
    'enrollment in an academic program comprising [duration, e.g., one full year] of ' +
    'undergraduate-level coursework delivered through [Program / Platform Name].\r\n' +
    '[Program / Platform Name] is an education board accredited by [Accrediting Bodies, e.g., ACE ' +
    '/ NCCRS], supporting the transfer of undergraduate academic credits to universities across ' +
    'the United States.\r\n\r\n' +
    'The program includes structured academic instruction, formal assessments, and the awarding ' +
    'of undergraduate academic credits equivalent to [e.g., first year of undergraduate study]. ' +
    'The academic credits earned will be formally documented and are intended to be transferred ' +
    'to [University Name] in partial fulfilment of the student\'s undergraduate degree ' +
    'requirements.\r\n\r\n' +
    'The aforementioned funds will be used exclusively for educational purposes. No portion of ' +
    'the education loan funds will be applied toward any non-academic or personal expenses.\r\n' +
    'Should you require any additional verification, clarification, or supporting documentation, ' +
    'please feel free to contact us at [Official Email Address].\r\n\r\n' +
    'Yours sincerely,\r\n' +
    '[Authorized Signatory Name]\r\n' +
    '[Designation]\r\n' +
    '[Organization Name]\r\n';
  const mailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=Contact@opencredits.org&su=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

  return (
    <section className={`enroll-pricing-section ${className}`.trim()}>
      <div className="enroll-pricing-container">
        <h2>Enroll now</h2>
        <p className="enroll-pricing-note">
          <strong>
            NOTE : Education loans or sponsorships can be used to take Open Credits Courses. We
            provide an official offer letter on request.
            <br /> Send us an Email -
            <a href={mailHref} target="_blank" rel="noreferrer">contact@opencredits.org</a>
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
              <div
                className={`enroll-pricing-price${
                  card.price ? '' : ' enroll-pricing-price--placeholder'
                }`}
                aria-hidden={card.price ? undefined : 'true'}
              >
                {card.price && (
                  <>
                    <span className="enroll-price-main">{card.price}</span>
                    <span className="enroll-price-sub">{card.priceSuffix}</span>
                  </>
                )}
              </div>
              <button
                type="button"
                className={`enroll-pricing-cta enroll-pricing-cta--${card.variant}`}
                onClick={card.cta === 'Calculate Now' ? () => navigate('/pricing') : card.cta === 'Enroll Now' ? () => navigate('/signin') : undefined}
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
