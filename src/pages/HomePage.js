import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import WhyOpenCredits from '../components/WhyOpenCredits';
import WorkProcess from '../components/WorkProcess';
import SchoolAcceptance from '../components/SchoolAcceptance';
import PopularCourses from '../components/PopularCourses';
import PartnerUniversities from '../components/PartnerUniversities';
import FAQ from '../components/FAQ';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Stats />
      <WhyOpenCredits />
      <WorkProcess />
      <SchoolAcceptance />
      <PopularCourses />
      <PartnerUniversities />
      <FAQ />
    </>
  );
};

export default HomePage;
