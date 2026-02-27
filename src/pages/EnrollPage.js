import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import './EnrollPage.css';
import SavingsCalculator from '../components/SavingsCalculator';
import EnrollPricingSection from '../components/EnrollPricingSection';

const EnrollPage = () => (
  <>
    <ScrollReveal variant="fade-up">
      <EnrollPricingSection />
    </ScrollReveal>
    <ScrollReveal variant="fade-up">
      <section className="enroll-page">
        <div className="enroll-container">
          <SavingsCalculator />
        </div>
      </section>
    </ScrollReveal>
  </>
);

export default EnrollPage;
