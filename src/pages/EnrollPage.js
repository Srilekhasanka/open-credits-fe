import React from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import './EnrollPage.css';
import SavingsCalculator from '../components/SavingsCalculator';
import EnrollPricingSection from '../components/EnrollPricingSection';

const EnrollPage = () => (
  <>
    <SEO
      title="Enroll"
      description="Enroll in accredited online college courses and start earning transferable credits."
      canonicalPath="/enroll"
    />
    <ScrollReveal variant="fade-up">
      <EnrollPricingSection showBanner />
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
