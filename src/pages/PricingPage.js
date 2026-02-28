import React from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import SavingsCalculator from '../components/SavingsCalculator';
import './PricingPage.css';

const PricingPage = () => {
  return (
    <section className="pricing-page">
      <SEO
        title="Pricing"
        description="Affordable pricing for accredited online college courses. Earn transferable credits from $250 per course."
        canonicalPath="/pricing"
      />
      <ScrollReveal variant="fade-up">
        <div className="pricing-container">
          <SavingsCalculator />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default PricingPage;
