import React from 'react';
import whyLearnerImage from '../assets/whylearner.png';
import forStudentImage from '../assets/forstudent.png';
import forTeachersImage from '../assets/forteachers.png';
import orangeStudentImage from '../assets/orangestudent.png';
import k12Image from '../assets/K-12_main.png';
import WorkProcess from '../components/WorkProcess';
import './K12PartnershipsPage.css';

const K12PartnershipsPage = () => (
  <section className="k12-page">
    <div className="k12-container">
      <div className="k12-hero">
        <img src={k12Image} alt="K-12 classroom learning" />
      </div>
      <h1>
        K-12 <span>Partnerships</span>
      </h1>
      <p>
        Open Credits helps schools and districts expand access to affordable, college-level general
        education courses. Students can earn transferable credit while still in high school and
        build momentum toward graduation.
      </p>
      <div className="k12-actions">
        <button type="button" className="k12-button is-outline">
          Get a Partnership Proposal
        </button>
        <button type="button" className="k12-button">
          Talk to us
        </button>
      </div>
    </div>

    <section className="k12-why">
      <div className="k12-container">
        <div className="k12-why-header">
          <h2>
            Why Learners Love <span>Open Credits?</span>
          </h2>
          <p className="k12-why-lead">An education benefit that benefits everyone</p>
          <p>
            Open Credits makes it easy for students and teachers to build skills, earn college
            credit, and make progress toward long term goals.
          </p>
        </div>
        <div className="k12-why-image">
          <img src={whyLearnerImage} alt="Why learners love Open Credits" />
        </div>
        <div className="k12-why-grid" />
      </div>
    </section>

    <section className="k12-partners">
      <div className="k12-container">
        <h2>
          How Open Credits Partners <span>With K-12 Schools</span>
        </h2>

        <div className="k12-partners-row">
          <div className="k12-partners-copy">
            <h3>For students</h3>
            <p>
              Open Credits supports college readiness by giving students access to transferable
              college-level courses during high school. Similar to AP and dual enrollment, students
              can earn progress toward college credit, but with greater flexibility and
              affordability.
            </p>
            <div className="k12-partners-list">
              <h4>What makes Open Credits different?</h4>
              <ul>
                <li>Students learn at their own pace</li>
                <li>Progress is demonstrated throughout the course, not dependent on one final exam</li>
                <li>Learners can move quickly through topics they already understand</li>
              </ul>
            </div>
          </div>
          <div className="k12-partners-image">
            <img src={forStudentImage} alt="Students learning in class" />
          </div>
        </div>

        <div className="k12-partners-row">
          <div className="k12-partners-copy">
            <h3>For teachers and staff</h3>
            <p>
              Open Credits supports districts in building stronger educator pipelines. Teachers
              and classified staff can use transferable courses to advance professionally and make
              progress toward degree completion at a lower cost.
            </p>
            <div className="k12-partners-list">
              <h4>What makes Open Credits different?</h4>
              <ul>
                <li>Affordable and flexible for working professionals</li>
                <li>Helps staff complete degrees faster</li>
                <li>Supports retention and career mobility</li>
              </ul>
            </div>
          </div>
          <div className="k12-partners-image">
            <img src={forTeachersImage} alt="Teacher working with students" />
          </div>
        </div>
      </div>
    </section>

    <section className="k12-orange">
      <div className="k12-container">
        <div className="k12-orange__card">
          <img src={orangeStudentImage} alt="Students and teachers love it" />
        </div>
      </div>
    </section>

    <WorkProcess />

    <section className="savings-section">
      <div className="k12-container">
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

  </section>
);

export default K12PartnershipsPage;
