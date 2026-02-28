import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './WorkProcess.css';

const pickCourseIcon = '/images/pickcourse.svg';
const collegeCreditIcon = '/images/collegecredit.svg';
const transferCreditIcon = '/images/transfercredit.svg';

const WorkProcess = () => {
  const navigate = useNavigate();
  const stepsRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  const handlePricingClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#pricing');
    }
  };

  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Start filling when top of section enters viewport bottom,
      // fully filled when top of section reaches ~55% from top
      const start = windowH;
      const end = windowH * 0.55;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));

      el.style.setProperty('--line-progress', progress);

      if (progress > 0 && !animate) {
        setAnimate(true);
      }

      // Handle mobile vertical line animation
      const steps = el.querySelectorAll('.work-step');
      steps.forEach((step) => {
        const stepRect = step.getBoundingClientRect();
        const stepStart = windowH;
        const stepEnd = windowH * 0.3;
        const stepProgress = Math.min(1, Math.max(0, (stepStart - stepRect.top) / (stepStart - stepEnd)));
        step.style.setProperty('--line-progress-mobile', stepProgress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animate]);

  return (
    <section className="work-process">
      <div className="work-container">
        <h2 className="work-heading">
          How does it <span className="highlight">Work?</span>
        </h2>

        <div ref={stepsRef} className={`work-steps${animate ? ' animate' : ''}`}>
          <div className="work-step">
            <div className="work-step__icon">
              <img src={pickCourseIcon} alt="" aria-hidden="true" />
            </div>
            <h3>Pick Your Courses</h3>
            <p>
              Choose from flexible, self-paced<br />online courses that fit your goals,<br />schedule, and university<br />requirements.
            </p>
            <Link className="work-step__link" to="/courses">View Courses &nbsp;&rarr;</Link>
          </div>

          <div className="work-step">
            <div className="work-step__icon">
              <img src={collegeCreditIcon} alt="" aria-hidden="true" />
            </div>
            <h3>Earn College Credits</h3>
            <p>
              Complete the course and receive<br />credit recommendations you can submit to<br />your school, helping you save time and<br />reduce tuition costs.
            </p>
            <Link className="work-step__link" to="/find-my-college">View Accepted Universities &nbsp;&rarr;</Link>
          </div>

          <div className="work-step">
            <div className="work-step__icon">
              <img src={transferCreditIcon} alt="" aria-hidden="true" />
            </div>
            <h3>Transfer your Credit</h3>
            <p>
              Bring your completed coursework with<br />you. We help you understand what<br />transfers and how to apply credits<br />toward your degree.
            </p>
            <a className="work-step__link" href="#pricing" onClick={handlePricingClick}>View Pricing &nbsp;&rarr;</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
