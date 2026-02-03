import React from 'react';
import { Link } from 'react-router-dom';
import corporateImage from '../assets/corporate_main.svg';
import dollarIcon from '../assets/dollar.svg';
import menusIcon from '../assets/menus.svg';
import partnershipIcon from '../assets/partnership.svg';
import questionMarkIcon from '../assets/questionmark.png';
import builtImage from '../assets/built.png';
import orangeBanner from '../assets/orange.png';
import WorkProcess from '../components/WorkProcess';
import FAQ from '../components/FAQ';
import './CorporatePartnershipsPage.css';
import SavingsCalculator from '../components/SavingsCalculator';

const whyCards = [
  {
    title: 'Recruit and retain talent',
    copy: 'Become an employer of choice with a benefit that supports career mobility and employee loyalty.',
    icon: dollarIcon
  },
  {
    title: 'Flexible partnership options',
    copy: 'Reimbursable, subscription, or enterprise. We design a plan that fits your goals and your budget.',
    icon: partnershipIcon
  },
  {
    title: 'Purposeful learning paths',
    copy: 'Employees follow personalized learning paths aligned with business outcomes and individual career goals.',
    icon: menusIcon
  },
  {
    title: 'Guaranteed Support',
    copy: 'Help with Credit support and documentation every step of the way.',
    icon: questionMarkIcon
  }
];

const whyEmployerCards = [
  {
    title: 'High quality learning at a low cost',
    copy: 'High quality learning at a fraction of traditional tuition costs, so employers can offer meaningful education benefits without inflating budgets.',
    icon: dollarIcon
  },
  {
    title: 'Transferable learning pathways',
    copy: 'Employees can build progress toward degree completion while also gaining practical skills.',
    icon: partnershipIcon
  },
  {
    title: 'Built for trust and readiness',
    copy: 'We take learner privacy and platform security seriously, with standards built for enterprise partnerships.',
    icon: menusIcon
  },
  {
    title: 'Guaranteed Support',
    copy: 'Help with Credit support and documentation every step of the way.',
    icon: questionMarkIcon
  }
];

const CorporatePartnershipsPage = () => (
  <section className="corporate-page">
    <div className="corporate-container">
      <div className="corporate-hero">
        <img src={corporateImage} alt="Corporate partnership meeting" />
      </div>
      <h1>
        Corporate <span>Partnerships</span>
      </h1>
      <p>
        Help employees grow faster without the traditional cost of college. Open Credits is a
        flexible education benefit that helps teams earn affordable, transferable college credit
        and build job ready skills online.
      </p>
      <div className="corporate-actions">
        <button type="button" className="corporate-button is-outline">
          Get a Partnership Proposal
        </button>
        <button type="button" className="corporate-button">
          Talk to us
        </button>
      </div>
    </div>

    <section className="corporate-why">
      <div className="corporate-container">
        <div className="corporate-why-header">
          <h2>
            Why Companies Choose <span>Open Credits?</span>
          </h2>
          <p className="corporate-why-lead">An education benefit employees actually use</p>
          <p>
            Open Credits makes it easy for working professionals to build skills, earn college
            credit, and make progress toward long term goals while staying employed full time.
          </p>
        </div>
        <div className="corporate-why-grid">
          {whyCards.map((card) => (
            <article key={card.title} className="corporate-why-card">
              <span className="corporate-why-icon" aria-hidden="true">
                <img src={card.icon} alt="" />
              </span>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="corporate-built">
      <div className="corporate-container corporate-built__layout">
        <div className="corporate-built__copy">
          <h2>Built for Working Adults</h2>
          <div className="corporate-built__item">
            <h3>Flexible and intuitive learning</h3>
            <p>
              Employees can access courses anytime from nearly any device. Courses are self paced,
              structured, and built for working professionals.
            </p>
          </div>
          <div className="corporate-built__item">
            <h3>Support that keeps learners progressing</h3>
            <p>
              Employees get learner support whenever they need it. If they are stuck on a concept
              or need help staying on track, assistance is available inside the platform.
            </p>
          </div>
          <div className="corporate-built__item">
            <h3>Courses designed for transferability</h3>
            <p>
              Open Credits courses are designed to be evaluated for college credit. Employees can
              apply completed courses toward their education goals with confidence.
            </p>
          </div>
        </div>
        <div className="corporate-built__image">
          <img src={builtImage} alt="Working adult learning online" />
        </div>
      </div>
    </section>

    <section className="corporate-orange">
      <div className="corporate-container">
        <div className="corporate-orange__card">
          <Link to="/courses" className="corporate-orange__cta" aria-label="View courses">
            View courses
          </Link>
          <img src={orangeBanner} alt="Employee testimonial banner" />
        </div>
      </div>
    </section>

    <section className="corporate-why corporate-why--employers">
      <div className="corporate-container">
        <div className="corporate-why-header">
          <h2>
            Why Employers Choose <span>Open Credits?</span>
          </h2>
          <p className="corporate-why-lead">An education benefit employees actually use</p>
          <p>
            Open Credits makes it easy for working professionals to build skills, earn college
            credit, and make progress toward long term goals while staying employed full time.
          </p>
        </div>
        <div className="corporate-why-grid">
          {whyEmployerCards.map((card) => (
            <article key={card.title} className="corporate-why-card">
              <span className="corporate-why-icon" aria-hidden="true">
                <img src={card.icon} alt="" />
              </span>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <WorkProcess />
    <SavingsCalculator />
    <FAQ />
  </section>
);

export default CorporatePartnershipsPage;
