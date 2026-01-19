import React from 'react';
import './EnrollPage.css';

const pricingCards = [
  {
    title: 'Single Course - One time Pay (US Nationals and Military)',
    description: 'One course, pay only once and get 3 Credits.',
    price: '$250',
    priceSuffix: '/ course',
    features: [
      '1 transferable college- credit courses',
      'No time restrictions',
      'Loan approval Letter'
    ],
    cta: 'Enroll Now',
    variant: 'primary',
    icon: 'person'
  },
  {
    title: 'Single Course - One time Pay (International Students)',
    description: 'One course, pay only once and get 3 Credits.',
    price: '$850',
    priceSuffix: '/ course',
    features: [
      '1 transferable college- credit courses',
      'No time restrictions product',
      'Loan approval Letter'
    ],
    cta: 'Enroll Now',
    variant: 'primary',
    icon: 'globe'
  },
  {
    title: 'University specific Pricing and bundle discounts (Custom Plan)',
    description: 'Custom Courses, bundles and university specific pricing',
    price: '',
    priceSuffix: '',
    features: [
      'Custom Plan for you',
      'No time restrictions',
      'Loan approval Letter'
    ],
    cta: 'Calculate Now',
    variant: 'accent',
    icon: 'building'
  }
];


const EnrollPage = () => {
  const mailSubject =
    'Letter of Utilisation of Education Loan Funds for Undergraduate Academic Program';
  const mailBody =
    'To,\r\nWhomsoever It May Concern\r\n\r\n' +
    'Subject: Letter of Utilisation of Education Loan Funds for Undergraduate Academic Program\r\n\r\n' +
    'This letter is issued to formally certify the utilization of education loan funds by the student ' +
    'mentioned below for approved academic purposes through [Program / Platform Name].\r\n\r\n' +
    'Student Details:\r\n' +
    'Full Name: [Student Full Name]\r\n' +
    'Date of Birth: [DD Month YYYY]\r\n' +
    'Address: [Full Residential Address]\r\n\r\n' +
    'The student is currently enrolled as an undergraduate student majoring in [Major / Field of Study] ' +
    'at [University Name].\r\n\r\n' +
    'An amount of USD [Amount] from the sanctioned education loan shall be utilized toward enrollment in ' +
    'an academic program comprising [duration, e.g., one full year] of undergraduate-level coursework ' +
    'delivered through [Program / Platform Name].\r\n' +
    '[Program / Platform Name] is an education board accredited by [Accrediting Bodies, e.g., ACE / NCCRS], ' +
    'supporting the transfer of undergraduate academic credits to universities across the United States.\r\n\r\n' +
    'The program includes structured academic instruction, formal assessments, and the awarding of ' +
    'undergraduate academic credits equivalent to [e.g., first year of undergraduate study]. The academic ' +
    'credits earned will be formally documented and are intended to be transferred to [University Name] in ' +
    'partial fulfilment of the student\'s undergraduate degree requirements.\r\n\r\n' +
    'The aforementioned funds will be used exclusively for educational purposes. No portion of the ' +
    'education loan funds will be applied toward any non-academic or personal expenses.\r\n' +
    'Should you require any additional verification, clarification, or supporting documentation, please ' +
    'feel free to contact us at [Official Email Address].\r\n\r\n' +
    'Yours sincerely,\r\n' +
    '[Authorized Signatory Name]\r\n' +
    '[Designation]\r\n' +
    '[Organization Name]\r\n';
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=Connect@opencredits.org&su=${encodeURIComponent(
    mailSubject
  )}&body=${encodeURIComponent(mailBody)}`;

  return (
    <section className="enroll-page">
      <div className="enroll-container">
        <h1>Enroll now</h1>
        <p className="enroll-note">
          <strong>NOTE :</strong> Education loans or sponsorships can be used to take Open Credits
          Courses. We provide an official offer letter on request.
          <br />
          Send us an Email -
          <a href={gmailHref} target="_blank" rel="noreferrer">
            contact@opencredits.org
          </a>
        </p>

        <div className="enroll-grid">
          {pricingCards.map((card) => (
            <article key={card.title} className="enroll-card">
              <div className={`enroll-illustration enroll-illustration--${card.icon}`}>
                {card.icon === 'person' && (
                  <svg viewBox="0 0 64 64" aria-hidden="true">
                    <rect x="14" y="22" width="36" height="26" rx="3" />
                    <circle cx="32" cy="18" r="6" />
                    <path d="M32 28v16M26 36h12" />
                  </svg>
                )}
                {card.icon === 'globe' && (
                  <svg viewBox="0 0 64 64" aria-hidden="true">
                    <rect x="14" y="22" width="36" height="26" rx="3" />
                    <circle cx="32" cy="18" r="7" />
                    <path d="M25 18h14M32 11v14" />
                  </svg>
                )}
                {card.icon === 'building' && (
                  <svg viewBox="0 0 64 64" aria-hidden="true">
                    <rect x="14" y="22" width="36" height="26" rx="3" />
                    <path d="M24 26h16v18H24zM28 30h4v4h-4zM32 30h4v4h-4zM28 36h4v4h-4zM32 36h4v4h-4z" />
                  </svg>
                )}
              </div>
              <h2>{card.title}</h2>
              <p className="enroll-desc">{card.description}</p>
              {card.price && (
                <div className="enroll-price">
                  <span className="enroll-price-main">{card.price}</span>
                  <span className="enroll-price-sub">{card.priceSuffix}</span>
                </div>
              )}
              <ul className="enroll-features">
                {card.features.map((feature) => (
                  <li key={feature}>
                    <span className="enroll-check" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button type="button" className={`enroll-cta enroll-cta--${card.variant}`}>
                {card.cta}
              </button>
            </article>
          ))}
        </div>

        <section className="savings-section">
          <h2>
            Calculate how much you save with <span>Open Credits</span>
          </h2>
          <div className="savings-card">
            <div className="savings-left">
              <div className="savings-field">
                <label>Pick your University</label>
                <div className="savings-input">
                  <input type="text" placeholder="Search your college" />
                  <span className="savings-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" focusable="false">
                      <circle cx="9" cy="9" r="6" />
                      <line x1="13.5" y1="13.5" x2="18" y2="18" />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="savings-field">
                <label>Number of Courses</label>
                <div className="savings-input">
                  <select>
                    <option>1 (1 course = 3 Credits)</option>
                    <option>2 (2 courses = 6 Credits)</option>
                    <option>3 (3 courses = 9 Credits)</option>
                  </select>
                </div>
              </div>
              <div className="savings-field">
                <label>Student Type</label>
                <div className="savings-toggle">
                  <button type="button" className="is-active">U.S Local/ Military</button>
                  <button type="button">International Student</button>
                </div>
              </div>
              <div className="savings-breakdown">
                <h3>Breakdown</h3>
                <div className="savings-row">
                  <span>Estimated cost per course (3 credits):</span>
                  <span>$1400</span>
                </div>
                <div className="savings-row">
                  <span>Estimated cost of living (per semester):</span>
                  <span>$1400</span>
                </div>
                <div className="savings-row">
                  <span>What you pay Open Credits per course (3 credits):</span>
                  <span>$750</span>
                </div>
                <div className="savings-row is-total">
                  <span>You save:</span>
                  <span>$1400</span>
                </div>
              </div>
            </div>
            <div className="savings-right">
              <div className="savings-pill">
                <div>You Pay</div>
                <strong>$11,000</strong>
                <span>without Open Credits</span>
              </div>
              <div className="savings-pill is-accent">
                <div>You Pay</div>
                <strong>$2,000</strong>
                <span>with Open Credits (Tax included)</span>
              </div>
            </div>
            <div className="savings-bundles">
              <h3>Also See - Bundle Savings</h3>
              <div className="savings-bundle-grid">
                <div className="savings-bundle">
                  <div className="bundle-label">6 Course Bundle</div>
                  <div className="bundle-price">$2,000</div>
                  <div className="bundle-note">Save upto $11,000</div>
                </div>
                <div className="savings-bundle">
                  <div className="bundle-label">12 Course Bundle</div>
                  <div className="bundle-price">$2,000</div>
                  <div className="bundle-note">Save upto $11,000</div>
                </div>
                <div className="savings-bundle">
                  <div className="bundle-label">24 Course Bundle</div>
                  <div className="bundle-price">$2,000</div>
                  <div className="bundle-note">Save upto $11,000</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default EnrollPage;
