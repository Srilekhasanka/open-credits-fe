import React from 'react';
import './EnrollPage.css';

const pricingCards = [
  {
    title: 'Single Course - One time Pay (US Nationals and Military)',
    description: 'One course, pay only once and get 3 Credits.',
    price: '$250',
    priceSuffix: '/ course',
    detail:
      'Choose any 1 transferable college-credit courses (3 credits) Finish faster. Pay less. No fluff.',
    cta: 'Enroll Now'
  },
  {
    title: 'Single Course - One time Pay (International Students)',
    description: 'One course, pay only once and get 3 Credits.',
    price: '$850',
    priceSuffix: '/ course',
    detail:
      'Choose any 1 transferable college-credit courses (3 credits) Finish faster. Pay less. No fluff.',
    cta: 'Enroll Now'
  },
  {
    title: 'University specific Pricing',
    description: 'Custom Courses, bundles and university specific pricing.',
    price: '$850',
    priceSuffix: '/ course',
    detail:
      'Choose any 1 transferable college-credit courses (3 credits) Finish faster. Pay less. No fluff.',
    cta: 'Calculate Now'
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
  const mailtoHref = `mailto:Connect@opencredits.org?subject=${encodeURIComponent(
    mailSubject
  )}&body=${encodeURIComponent(mailBody)}`;

  return (
    <section className="enroll-page">
      <div className="enroll-container">
        <h1>Enroll now</h1>
        <p className="enroll-note">
          NOTE : Education loans or sponsorships can be used to take Open Credits Courses. We
          provide an official offer letter on request. Send us an Email -
          <a href={mailtoHref}>
            Connect@opencredits.org
          </a>
        </p>

        <div className="enroll-grid">
          {pricingCards.map((card) => (
            <article key={card.title} className="enroll-card">
              <h2>{card.title}</h2>
              <p className="enroll-desc">{card.description}</p>
              <div className="enroll-price">
                <span className="enroll-price-main">{card.price}</span>
                <span className="enroll-price-sub">{card.priceSuffix}</span>
              </div>
              <div className="enroll-detail">
                <span className="enroll-check" aria-hidden="true">✓</span>
                <span>{card.detail}</span>
              </div>
              <button type="button" className="enroll-cta">
                {card.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnrollPage;
