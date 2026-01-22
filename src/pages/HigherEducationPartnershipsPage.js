import React from 'react';
import higherEduImage from '../assets/higheredu_main.png';
import whyCompaniesHigherImage from '../assets/whycompanies_higher.png';
import builtHigherImage from '../assets/built_higher.png';
import orangeHigherImage from '../assets/orange_higher.png';
import WorkProcess from '../components/WorkProcess';
import FAQ from '../components/FAQ';
import './HigherEducationPartnershipsPage.css';

const HigherEducationPartnershipsPage = () => (
  <section className="higheredu-page">
    <div className="higheredu-container">
      <div className="higheredu-hero">
        <img src={higherEduImage} alt="Higher education classroom" />
      </div>
      <h1>
        Higher Education <span>Partnerships</span>
      </h1>
      <p>
        Open Credits partners with colleges and universities to help students stay on track, fill
        credit gaps, and complete general education requirements through affordable, self-paced
        online courses designed to transfer for credit.
      </p>
      <div className="higheredu-actions">
        <button type="button" className="higheredu-button is-outline">
          Get a Partnership Proposal
        </button>
        <button type="button" className="higheredu-button">
          Talk to us
        </button>
      </div>
    </div>

    <section className="higheredu-why">
      <div className="higheredu-container">
        <div className="higheredu-why-header">
          <h2>
            Why Companies Choose <span>Open Credits?</span>
          </h2>
          <p className="higheredu-why-lead">Before making a commitment</p>
          <p>
            Regionally accredited colleges and universities may connect with our partnerships team
            to review articulation options, transfer workflows, and student success goals.
          </p>
        </div>
        <div className="higheredu-why-image">
          <img src={whyCompaniesHigherImage} alt="Why companies choose Open Credits" />
        </div>
      </div>
    </section>

    <section className="higheredu-built">
      <div className="higheredu-container higheredu-built__layout">
        <div className="higheredu-built__copy">
          <h2>Built for academic quality and flexibility</h2>
          <div className="higheredu-built__item">
            <h3>Flexible and intuitive learning</h3>
            <p>
              Open Credits is designed for outcomes, not just access. Our platform helps learners
              complete courses efficiently while receiving the resources they need to succeed.
            </p>
          </div>
          <div className="higheredu-built__item">
            <h3>1. Expertly crafted for learner success</h3>
            <p>
              Students can learn anytime from almost any device with a structured, intuitive
              experience.
            </p>
          </div>
          <div className="higheredu-built__item">
            <h3>2. Built on proven instructional design</h3>
            <p>
              Courses are designed to be clear, engaging, and aligned with effective online
              learning best practices.
            </p>
          </div>
          <div className="higheredu-built__item">
            <h3>3. Designed for credit transfer</h3>
            <p>
              Courses are created with transfer evaluation in mind, helping institutions support
              degree progress with confidence.
            </p>
          </div>
        </div>
        <div className="higheredu-built__image">
          <img src={builtHigherImage} alt="Students in higher education classroom" />
        </div>
      </div>
    </section>

    <section className="higheredu-orange">
      <div className="higheredu-container">
        <div className="higheredu-orange__card">
          <img src={orangeHigherImage} alt="Everyone loves Open Credits" />
        </div>
      </div>
    </section>

    <WorkProcess />

    <section className="savings-section">
      <div className="higheredu-container">
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

export default HigherEducationPartnershipsPage;
