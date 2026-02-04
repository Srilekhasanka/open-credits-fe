import React from 'react';
import { Link } from 'react-router-dom';
import WorkProcess from '../components/WorkProcess';
import './K12PartnershipsPage.css';
import SavingsCalculator from '../components/SavingsCalculator';

const dollarIcon = '/images/dollar_card.svg';
const menusIcon = '/images/menus_card.svg';
const partnershipIcon = '/images/partnership_card.svg';
const questionMarkIcon = '/images/questionmark.svg';
const forStudentImage = '/images/forstudent.svg';
const forTeachersImage = '/images/forteachers.svg';
const k12Image = '/images/K-12_main.svg';

const learnerCards = [
  {
    title: 'Affordable',
    copy: 'We keep learning accessible. Open Credits helps students get ahead on college-level coursework without the financial burden of traditional college tuition or expensive testing programs.',
    icon: dollarIcon
  },
  {
    title: 'Flexible and self-paced',
    copy: 'Students can learn on their schedule, from almost any device. This flexibility supports different learning speeds, school schedules, and individual needs.',
    icon: partnershipIcon
  },
  {
    title: 'Competency-based learning',
    copy: 'Courses are designed around mastery. Learners demonstrate understanding throughout the course, building deeper comprehension and confidence.',
    icon: menusIcon
  },
  {
    title: 'Supportive learning experience',
    copy: 'Help with Credit support and documentation every step of the way.',
    icon: questionMarkIcon
  }
];

const K12PartnershipsPage = () => (
  <section className="k12-page">
    <div className="k12-hero">
      <img className="k12-shared-image" src={k12Image} alt="K-12 classroom learning" />
    </div>
    <div className="k12-container">
      <div className="k12-hero__content">
        <h1>
          K-12 <span>Partnerships</span>
        </h1>
        <p className="k12-hero__lead">
          <span className="k12-hero__lead-line1">
            Open Credits helps schools and districts expand access to affordable, college-level
            general education courses. Students can earn transferable
          </span>
          <br />
          credit while still in high school and build momentum toward graduation.
        </p>
      </div>
      <div className="k12-actions">
        <button type="button" className="k12-button k12-button--proposal is-outline">
          Get a Partnership Proposal
        </button>
        <button type="button" className="k12-button k12-button--talk">
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
          <p className="k12-why-copy">
            Open Credits makes it easy for students and teachers to build skills, earn college
            credit, and make progress toward long term goals.
          </p>
        </div>
        <div className="k12-why-grid">
          {learnerCards.map((card) => (
            <article key={card.title} className="k12-why-card">
              <span className="k12-why-icon" aria-hidden="true">
                <img src={card.icon} alt="" />
              </span>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
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
              Open Credits supports college readiness by giving students
              <br />
              <span className="k12-partners-copy-line--nowrap">
                access to transferable college-level courses during high school.
              </span>
              <br />
              Similar to AP and dual enrollment, students can earn progress
              <br />
              <span className="k12-partners-copy-line--nowrap">
                toward college credit, but with greater flexibility and affordability.
              </span>
            </p>
            <div className="k12-partners-list">
              <h4>What makes Open Credits different?</h4>
              <ul>
                <li>Students learn at their own pace</li>
                <li>
                  Progress is demonstrated throughout the course, not
                  <br />
                  dependent on one final exam
                </li>
                <li>
                  Learners can move quickly through topics they already
                  <br />
                  understand
                </li>
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
          <div className="k12-orange__steps" aria-hidden="true">
            <span className="k12-orange__step k12-orange__step--1" />
            <span className="k12-orange__step k12-orange__step--2" />
            <span className="k12-orange__step k12-orange__step--3" />
          </div>
          <h3 className="k12-orange__title">
            Not just a students favorite.
            <br />
            Teachers love it too.
          </h3>
          <Link to="/courses" className="k12-orange__cta" aria-label="View courses">
            View courses
          </Link>
        </div>
      </div>
    </section>

    <WorkProcess />
    <SavingsCalculator />

  </section>
);

export default K12PartnershipsPage;
