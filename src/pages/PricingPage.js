import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import SavingsCalculator from '../components/SavingsCalculator';
import './PricingPage.css';

const PricingPage = () => {
  return (
    <section className="pricing-page">
      <ScrollReveal variant="fade-up">
        <div className="pricing-container">
          <SavingsCalculator />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default PricingPage;
