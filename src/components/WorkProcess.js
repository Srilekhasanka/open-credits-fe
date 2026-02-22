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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
              Choose from flexible, self-paced online courses that fit your goals,
              schedule, and university requirements.
            </p>
            <Link className="work-step__link" to="/courses">View Courses &nbsp;&rarr;</Link>
          </div>

          <div className="work-step">
            <div className="work-step__icon">
              <img src={collegeCreditIcon} alt="" aria-hidden="true" />
            </div>
            <h3>Earn College Credits</h3>
            <p>
              Complete the course and receive credit recommendations you can submit
              to your school, helping you save time and reduce tuition costs.
            </p>
            <Link className="work-step__link" to="/find-my-college">View Accepted Universities &nbsp;&rarr;</Link>
          </div>

          <div className="work-step">
            <div className="work-step__icon">
              <img src={transferCreditIcon} alt="" aria-hidden="true" />
            </div>
            <h3>Transfer your Credit</h3>
            <p>
              Bring your completed coursework with you. We help you understand
              what transfers and how to apply credits toward your degree.
            </p>
            <a className="work-step__link" href="#pricing" onClick={handlePricingClick}>View Pricing &nbsp;&rarr;</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
