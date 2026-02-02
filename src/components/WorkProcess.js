import React from 'react';
import './WorkProcess.css';
import curveImage from '../assets/curvyline.png';
import pickCourseIcon from '../assets/pickcourse.svg';
import collegeCreditIcon from '../assets/collegecredit.svg';
import transferCreditIcon from '../assets/transfercredit.svg';

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
            <img className="process-curve" src={curveImage} alt="How it works" />
            <img className="process-icon icon-pickcourse" src={pickCourseIcon} alt="" aria-hidden="true" />
            <img className="process-icon icon-collegecredit" src={collegeCreditIcon} alt="" aria-hidden="true" />
            <img className="process-icon icon-transfercredit" src={transferCreditIcon} alt="" aria-hidden="true" />

            <div className="process-step step-1">
              <div className="process-step-number" aria-hidden="true">1</div>
              <h3>Pick Your Courses</h3>
              <p>
                Choose from flexible, self-paced
                <br/>
                online courses that fit your goals,
                <br/>
                schedule, and university
                <br/>
                requirements.
              </p>
              <a className="process-step-link" href="/courses">View Courses</a>
            </div>

            <div className="process-step step-2">
              <div className="process-step-number" aria-hidden="true">2</div>
              <h3>Earn College Credits</h3>
              <p>
                Complete the course and receive
                <br/>
                credit recommendations you can
                <br/>
                submit to your school, helping you
                <br/>
                save time and reduce tuition costs.
              </p>
              <a className="process-step-link" href="/find-my-college">View Accepted Universities</a>
            </div>

            <div className="process-step step-3">
              <div className="process-step-number" aria-hidden="true">3</div>
              <h3>Transfer your Credit</h3>
              <p>
                Bring your completed coursework
                <br/>
                with you. We help you understand
                <br/>
                what transfers and how to apply
                <br/>
                credits toward your degree.
              </p>
              <a className="process-step-link" href="#pricing">View Pricing</a>
            </div>

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
