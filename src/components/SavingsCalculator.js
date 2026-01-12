import React, { useMemo, useState } from 'react';
import './SavingsCalculator.css';

const TAB_US = 'us';
const TAB_INTL = 'intl';

const SavingsCalculator = () => {
  const [activeTab, setActiveTab] = useState(TAB_US);
  const [courseCount, setCourseCount] = useState(3);
  const [schoolCost, setSchoolCost] = useState(413);

  const openCreditsCostPerCourse = activeTab === TAB_US ? 250 : 275;

  const totals = useMemo(() => {
    const estimated = Math.round(courseCount * schoolCost);
    const openCredits = Math.round(courseCount * openCreditsCostPerCourse);
    const savings = Math.max(estimated - openCredits, 0);

    return { estimated, openCredits, savings };
  }, [courseCount, schoolCost, openCreditsCostPerCourse]);

  const formatCurrency = (value) => `$${value.toLocaleString('en-US')}`;

  return (
    <section className="savings-section" id="pricing">
      <div className="savings-container">
        <h2 className="savings-title">
          Calculate how you saved with <span className="highlight">Open Credits</span>
        </h2>
        <div className="savings-card">
          <div className="savings-tabs">
            <button
              type="button"
              className={`tab-btn ${activeTab === TAB_US ? 'active' : ''}`}
              onClick={() => setActiveTab(TAB_US)}
            >
              US Nationals
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === TAB_INTL ? 'active' : ''}`}
              onClick={() => setActiveTab(TAB_INTL)}
            >
              International Student
            </button>
          </div>

          <div className="slider-row">
            <div className="slider-copy">
              <label htmlFor="course-count">How many courses do you want to take?</label>
              <input
                id="course-count"
                type="range"
                min="1"
                max="8"
                value={courseCount}
                onChange={(event) => setCourseCount(Number(event.target.value))}
              />
            </div>
            <div className="slider-value">{courseCount}</div>
          </div>

          <div className="slider-row">
            <div className="slider-copy">
              <label htmlFor="school-cost">Your school's cost per credit hour</label>
              <input
                id="school-cost"
                type="range"
                min="200"
                max="800"
                step="5"
                value={schoolCost}
                onChange={(event) => setSchoolCost(Number(event.target.value))}
              />
            </div>
            <div className="slider-value">{formatCurrency(schoolCost)}</div>
          </div>

          <div className="savings-divider"></div>

          <div className="savings-results">
            <div className="result-row">
              <span>Estimated cost at your school:</span>
              <strong className="result-estimate">{formatCurrency(totals.estimated)}</strong>
            </div>
            <div className="result-row">
              <span>What you pay Open Credits:</span>
              <strong className="result-open">{formatCurrency(totals.openCredits)}</strong>
            </div>
            <div className="result-row">
              <span>You save:</span>
              <strong className="result-save">{formatCurrency(totals.savings)}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
