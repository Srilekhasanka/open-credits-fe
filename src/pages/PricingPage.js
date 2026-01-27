import React from 'react';
import SavingsCalculator from '../components/SavingsCalculator';
import './PricingPage.css';

const PricingPage = () => {
  return (
    <section className="pricing-page">
      <div className="pricing-container">
        <SavingsCalculator />
      </div>
    </section>
  );
};

export default PricingPage;
