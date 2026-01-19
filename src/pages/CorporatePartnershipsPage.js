import React from 'react';
import corporateImage from '../assets/corporate_main.png';
import whyCompaniesImage from '../assets/whycompanies.png';
import builtImage from '../assets/built.png';
import orangeBanner from '../assets/orange.png';
import whyEmpImage from '../assets/whyemp.png';
import WorkProcess from '../components/WorkProcess';
import FAQ from '../components/FAQ';
import './CorporatePartnershipsPage.css';

const whyCards = [
  {
    title: 'Recruit and retain talent',
    copy: 'Become an employer of choice with a benefit that supports career mobility and employee loyalty.',
    icon: 'S'
  },
  {
    title: 'Flexible partnership options',
    copy: 'Reimbursable, subscription, or enterprise. We design a plan that fits your goals and your budget.',
    icon: 'F'
  },
  {
    title: 'Purposeful learning paths',
    copy: 'Employees follow personalized learning paths aligned with business outcomes and individual career goals.',
    icon: 'P'
  },
  {
    title: 'Guaranteed Support',
    copy: 'Help with Credit support and documentation every step of the way.',
    icon: 'G'
  }
];

const whyEmployerCards = [
  {
    title: 'High quality learning at a low cost',
    copy: 'High quality learning at a fraction of traditional tuition costs, so employers can offer meaningful education benefits without inflating budgets.',
    icon: 'S'
  },
  {
    title: 'Transferable learning pathways',
    copy: 'Employees can build progress toward degree completion while also gaining practical skills.',
    icon: 'T'
  },
  {
    title: 'Built for trust and readiness',
    copy: 'We take learner privacy and platform security seriously, with standards built for enterprise partnerships.',
    icon: 'B'
  },
  {
    title: 'Guaranteed Support',
    copy: 'Help with Credit support and documentation every step of the way.',
    icon: 'G'
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
        <div className="corporate-why-image">
          <img src={whyEmpImage} alt="Why employers choose Open Credits" />
        </div>
        <div className="corporate-why-grid" />
      </div>
    </section>

    <WorkProcess />
    <section className="savings-section">
      <div className="corporate-container">
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
      </div>
    </section>
    <FAQ />
  </section>
);

export default CorporatePartnershipsPage;
