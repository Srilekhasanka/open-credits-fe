import React from 'react';
import '../App.css';

const FinancingPage = () => {
  return (
    <div className="page-content">
      <div style={{ padding: '120px 20px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2.5rem' }}>
          Financing Options
        </h1>
        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px', color: '#666', fontSize: '1.1rem' }}>
          Affordable payment plans to help you achieve your educational goals without breaking the bank.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
          <div style={{ padding: '30px', border: '2px solid #e0e0e0', borderRadius: '12px' }}>
            <h3 style={{ color: '#ff6b35', marginBottom: '15px' }}>Pay Per Course</h3>
            <p style={{ color: '#666' }}>Flexible payment options for individual courses. No long-term commitment required.</p>
          </div>
          <div style={{ padding: '30px', border: '2px solid #e0e0e0', borderRadius: '12px' }}>
            <h3 style={{ color: '#ff6b35', marginBottom: '15px' }}>Monthly Plans</h3>
            <p style={{ color: '#666' }}>Subscribe to access multiple courses with affordable monthly payments.</p>
          </div>
          <div style={{ padding: '30px', border: '2px solid #e0e0e0', borderRadius: '12px' }}>
            <h3 style={{ color: '#ff6b35', marginBottom: '15px' }}>Financial Aid</h3>
            <p style={{ color: '#666' }}>Learn about available financial aid options and scholarship opportunities.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancingPage;
