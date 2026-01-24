import React from 'react';
import './WorkProcess.css';
import howItWorksImage from '../assets/howitworks.png';

const WorkProcess = () => {
  return (
    <section className="work-process">
      {/* Left gradient blur effect */}
      <div className="gradient-blur-left"></div>
      
      <div className="work-container">
        <div className="process-header">
          <h2>How does it <span className="highlight">Work?</span></h2>
        </div>
        <div className="process-content">
          <div className="process-visual">
            <img src={howItWorksImage} alt="Work process" />
            <a href="/courses" className="process-overlay overlay-courses" aria-label="View courses"></a>
            <a href="/find-my-college" className="process-overlay overlay-universities" aria-label="View accepted universities"></a>
            <a href="#pricing" className="process-overlay overlay-pricing" aria-label="View pricing"></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
