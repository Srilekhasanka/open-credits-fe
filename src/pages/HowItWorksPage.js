import React from 'react';
import WorkProcess from '../components/WorkProcess';
import SchoolAcceptance from '../components/SchoolAcceptance';
import '../App.css';

const HowItWorksPage = () => {
  return (
    <div className="page-content">
      <div style={{ padding: '80px 20px 40px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2.5rem' }}>
          How It's College
        </h1>
        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px', color: '#666' }}>
          Learn how Open Credits makes earning transferable college credits simple, flexible, and affordable.
        </p>
      </div>
      <WorkProcess />
      <SchoolAcceptance />
    </div>
  );
};

export default HowItWorksPage;
