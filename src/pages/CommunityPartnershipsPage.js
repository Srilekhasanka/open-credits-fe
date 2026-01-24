import React from 'react';
import communityImage from '../assets/community_image.png';
import communityWhyImage from '../assets/community_why.png';
import orangeCommunityImage from '../assets/orange_community.png';
import WorkProcess from '../components/WorkProcess';
import './CommunityPartnershipsPage.css';
import SavingsCalculator from '../components/SavingsCalculator';

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
        <div className="community-why-image">
          <img src={communityWhyImage} alt="Why companies choose Open Credits" />
        </div>
      </div>
    </section>

    <section className="community-orange">
      <div className="community-container">
        <div className="community-orange__card">
          <img src={orangeCommunityImage} alt="Employees love Open Credits" />
        </div>
      </div>
    </section>

    <WorkProcess />

    <SavingsCalculator />
  </section>
);

export default CommunityPartnershipsPage;
