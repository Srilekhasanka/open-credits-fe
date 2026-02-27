import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import WhyOpenCredits from '../components/WhyOpenCredits';
import WhoCanUseOpenCredits from '../components/WhoCanUseOpenCredits';
import WorkProcess from '../components/WorkProcess';
import SavingsCalculator from '../components/SavingsCalculator';
import FeaturedUniversities from '../components/FeaturedUniversities';
import SchoolAcceptance from '../components/SchoolAcceptance';
import PopularCourses from '../components/PopularCourses';
import PartnerUniversities from '../components/PartnerUniversities';
import EnrollPricingSection from '../components/EnrollPricingSection';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import ScrollReveal from '../components/ScrollReveal';

const HomePage = () => {
  return (
    <>
      <Hero />
      <ScrollReveal variant="fade-up">
        <Stats />
      </ScrollReveal>
      <ScrollReveal variant="fade-up">
        <WhyOpenCredits />
      </ScrollReveal>
      <ScrollReveal variant="fade-up">
        <WhoCanUseOpenCredits />
      </ScrollReveal>
      <WorkProcess />
      <div className="home-orange-banner">
        <div className="home-orange-banner__wrap">
          <img src="/images/homeorange.svg" alt="" />
          <div className="home-orange-banner__text">
            <div className="home-orange-banner__left">
              <h3>Are you a U.S  Military/resident?</h3>
              <p>You might be eligible for a $350 every course. Please fill the form and sign in to get a unique code for your account.</p>
            </div>
            <a className="home-orange-banner__btn" href="https://airtable.com/appEEgayj533RzdNH/pagaPGUpHEtQC6oVb/form" target="_blank" rel="noreferrer">Fill form</a>
          </div>
        </div>
      </div>
      <ScrollReveal variant="fade-up">
        <SavingsCalculator />
      </ScrollReveal>
      <ScrollReveal variant="fade-up">
        <FeaturedUniversities />
      </ScrollReveal>
      <ScrollReveal variant="zoom-in">
        <SchoolAcceptance />
      </ScrollReveal>
      <ScrollReveal variant="fade-up">
        <PopularCourses />
      </ScrollReveal>
      <ScrollReveal variant="fade-up">
        <PartnerUniversities className="partner-universities--home" />
      </ScrollReveal>
      <ScrollReveal variant="fade-up">
        <EnrollPricingSection className="enroll-pricing-section--home" />
      </ScrollReveal>
      <ScrollReveal variant="fade-up">
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal variant="fade-up">
        <FAQ />
      </ScrollReveal>
    </>
  );
};

export default HomePage;
