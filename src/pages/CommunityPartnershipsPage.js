import React from 'react';
import { Link } from 'react-router-dom';
import communityImage from '../assets/community_image.png';
import dollarIcon from '../assets/dollar.svg';
import menusIcon from '../assets/menus.svg';
import partnershipIcon from '../assets/partnership.svg';
import questionMarkIcon from '../assets/questionmark.png';
import orangeCommunityImage from '../assets/orange_community.png';
import WorkProcess from '../components/WorkProcess';
import './CommunityPartnershipsPage.css';
import SavingsCalculator from '../components/SavingsCalculator';

const communityCards = [
  {
    title: 'Expand access and opportunity',
    copy: 'Open Credits helps learners keep moving forward with affordable, flexible courses that fit work and life schedules.',
    icon: dollarIcon
  },
  {
    title: 'Support meaningful outcomes',
    copy: 'Partners can offer pathways that lead to credit, credentials, and measurable progress toward degrees or careers.',
    icon: partnershipIcon
  },
  {
    title: 'Designed for community impact',
    copy: 'Our model helps organizations reduce cost barriers while supporting learners with structured, high-quality coursework.',
    icon: menusIcon
  },
  {
    title: 'Guaranteed Support',
    copy: 'Help with Credit support and documentation every step of the way.',
    icon: questionMarkIcon
  }
];

const CommunityPartnershipsPage = () => (
  <section className="community-page">
    <div className="community-container">
      <div className="community-hero">
        <img src={communityImage} alt="Community partnership" />
      </div>
      <h1>
        Community <span>Partnerships</span>
      </h1>
      <p>
        Education should not be limited by cost, background, or timing. Open Credits helps learners
        move forward with affordable, flexible, online courses designed to support college progress
        and career mobility.
      </p>
      <div className="community-actions">
        <button type="button" className="community-button is-outline">
          Get a Partnership Proposal
        </button>
        <button type="button" className="community-button">
          Talk to us
        </button>
      </div>
    </div>

    <section className="community-why">
      <div className="community-container">
        <div className="community-why-header">
          <h2>
            Why Companies Choose <span>Open Credits?</span>
          </h2>
          <p className="community-why-lead">Open doors through flexible education pathways</p>
          <p>
            When you partner with Open Credits, you support progress toward life changing goals.
            Our partnerships help organizations and institutions expand access to learning, improve
            outcomes, and create meaningful impact.
          </p>
        </div>
        <div className="community-why-grid">
          {communityCards.map((card) => (
            <article key={card.title} className="community-why-card">
              <span className="community-why-icon" aria-hidden="true">
                <img src={card.icon} alt="" />
              </span>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="community-orange">
      <div className="community-container">
        <div className="community-orange__card">
          <Link to="/courses" className="community-orange__cta" aria-label="View courses">
            View courses
          </Link>
          <img src={orangeCommunityImage} alt="Employees love Open Credits" />
        </div>
      </div>
    </section>

    <WorkProcess />

    <SavingsCalculator />
  </section>
);

export default CommunityPartnershipsPage;
