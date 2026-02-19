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

const HomePage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <WhyOpenCredits />
      <WhoCanUseOpenCredits />
      <WorkProcess />
      <SavingsCalculator />
      <FeaturedUniversities />
      <SchoolAcceptance />
      <PopularCourses />
      <PartnerUniversities />
      <EnrollPricingSection />
      <Testimonials />
      <FAQ />
    </>
  );
};

export default HomePage;
