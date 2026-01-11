import React from 'react';
import FAQ from '../components/FAQ';
import PartnerUniversities from '../components/PartnerUniversities';
import '../App.css';

const ResourcesPage = () => {
  return (
    <div className="page-content">
      <div style={{ padding: '80px 20px 40px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2.5rem' }}>
          Resources
        </h1>
        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px', color: '#666' }}>
          Everything you need to succeed with Open Credits - from FAQs to partner universities.
        </p>
      </div>
      <PartnerUniversities />
      <FAQ />
    </div>
  );
};

export default ResourcesPage;
