import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import WhyOpenCredits from '../components/WhyOpenCredits';
import WorkProcess from '../components/WorkProcess';
import SavingsCalculator from '../components/SavingsCalculator';
import FeaturedUniversities from '../components/FeaturedUniversities';
import SchoolAcceptance from '../components/SchoolAcceptance';
import PopularCourses from '../components/PopularCourses';
import PartnerUniversities from '../components/PartnerUniversities';
import MarketingVideo from '../components/MarketingVideo';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <WhyOpenCredits />
      <WorkProcess />
      <SavingsCalculator />
      <FeaturedUniversities />
      <SchoolAcceptance />
      <PopularCourses />
      <PartnerUniversities />
      <MarketingVideo />
      <Testimonials />
      <FAQ />
    </>
  );
};

export default HomePage;
