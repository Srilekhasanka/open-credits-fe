import React from 'react';
import './EnrollPage.css';
import SavingsCalculator from '../components/SavingsCalculator';
import EnrollPricingSection from '../components/EnrollPricingSection';

const EnrollPage = () => (
  <>
    <EnrollPricingSection />
    <section className="enroll-page">
      <div className="enroll-container">
        <SavingsCalculator />
      </div>
    </section>
  </>
);

export default EnrollPage;
