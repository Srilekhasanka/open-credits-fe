import React from 'react';
import { Link } from 'react-router-dom';
import higherEduImage from '../assets/higheredu_main.png';
import dollarIcon from '../assets/dollar.svg';
import menusIcon from '../assets/menus.svg';
import partnershipIcon from '../assets/partnership.svg';
import questionMarkIcon from '../assets/questionmark.png';
import builtHigherImage from '../assets/built_higher.png';
import orangeHigherImage from '../assets/orange_higher.png';
import WorkProcess from '../components/WorkProcess';
import FAQ from '../components/FAQ';
import './HigherEducationPartnershipsPage.css';
import SavingsCalculator from '../components/SavingsCalculator';

const higherEduCards = [
  {
    title: 'Increase student persistence',
    copy: 'Open Credits helps students continue making progress even when they face barriers like course unavailability, work schedules, or delayed enrollment.',
    icon: dollarIcon
  },
  {
    title: 'Expand enrollment influence',
    copy: 'Open Credits serves thousands of learners annually. Many of these learners are actively exploring institutions that recognize affordable, transferable credit pathways.',
    icon: partnershipIcon
  },
  {
    title: 'Transferable general education courses',
    copy: 'Open Credits enables institutions to provide access to a broad set of online courses aligned with general education needs.',
    icon: menusIcon
  },
  {
    title: 'Guaranteed Support',
    copy: 'Help with Credit support and documentation every step of the way.',
    icon: questionMarkIcon
  }
];

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
        <div className="higheredu-why-grid">
          {higherEduCards.map((card) => (
            <article key={card.title} className="higheredu-why-card">
              <span className="higheredu-why-icon" aria-hidden="true">
                <img src={card.icon} alt="" />
              </span>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
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
          <Link to="/courses" className="higheredu-orange__cta" aria-label="View courses">
            View courses
          </Link>
          <img src={orangeHigherImage} alt="Everyone loves Open Credits" />
        </div>
      </div>
    </section>

    <WorkProcess />
    <SavingsCalculator />
    <FAQ />
  </section>
);

export default HigherEducationPartnershipsPage;
