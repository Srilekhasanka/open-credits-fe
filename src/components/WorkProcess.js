import React from 'react';
import './WorkProcess.css';

const WorkProcess = () => {
  return (
    <section className="work-process">
      {/* Left gradient blur effect */}
      <div className="gradient-blur-left"></div>
      
      <div className="work-container">
        <div className="process-header">
          <h2>Our <span className="highlight">Work Process</span></h2>
          <button className="btn-enroll">Enroll Now</button>
        </div>

        <div className="process-content">
          <div className="process-visual-new">
            {/* SVG Curve - S-shaped flowing from bottom-left to top-right */}
            <svg className="work-curve" viewBox="0 0 1000 450" preserveAspectRatio="none">
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6633" />
                  <stop offset="100%" stopColor="#FF6633" />
                </linearGradient>
              </defs>
              <path 
                d="M 0 380 
                   C 80 380, 120 350, 180 320
                   Q 280 270, 380 250
                   C 480 230, 520 230, 580 200
                   Q 680 150, 780 100
                   C 850 70, 900 40, 1000 10" 
                fill="none" 
                stroke="url(#curveGradient)" 
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Small decorative elements on curve */}
              <circle cx="180" cy="320" r="8" fill="#FF6633" />
              <circle cx="580" cy="200" r="8" fill="#FF6633" />
              <circle cx="900" cy="35" r="8" fill="#FF6633" />
              {/* Star decoration at the end */}
              <g transform="translate(920, 10)">
                <path d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z" fill="#FF6633" />
              </g>
              <g transform="translate(940, 25)">
                <path d="M 0 -5 L 1.5 -1.5 L 5 0 L 1.5 1.5 L 0 5 L -1.5 1.5 L -5 0 L -1.5 -1.5 Z" fill="#FF6633" opacity="0.6" />
              </g>
            </svg>

            {/* Step 1 - Bottom Left */}
            <div className="work-step work-step-1">
              <div className="step-number">1</div>
              <div className="work-icon work-icon-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white"/>
                </svg>
              </div>
              <div className="work-content">
                <h3>Pick Your Courses</h3>
                <p>Start one or more courses covering lower or upper division requirements. Great for completing your degree.</p>
              </div>
            </div>

            {/* Step 2 - Center */}
            <div className="work-step work-step-2">
              <div className="step-number">2</div>
              <div className="work-icon work-icon-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="white"/>
                </svg>
              </div>
              <div className="work-content">
                <h3>Earn College Credits</h3>
                <p>Start one or more courses covering lower or upper division requirements. Great for completing your degree.</p>
              </div>
            </div>

            {/* Step 3 - Top Right */}
            <div className="work-step work-step-3">
              <div className="step-number">3</div>
              <div className="work-icon work-icon-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z" fill="white"/>
                </svg>
              </div>
              <div className="work-content">
                <h3>Transfer your Credit</h3>
                <p>Start one or more courses covering lower or upper division requirements. Great for completing your degree.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
