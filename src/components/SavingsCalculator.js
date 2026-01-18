import React, { useMemo, useState } from 'react';
import './SavingsCalculator.css';

const TAB_US = 'us';
const TAB_INTL = 'intl';
const LIVING_COST = 1400;

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
  const perCourseSchoolCost = Math.round(schoolCost * 3);
  const perCourseSavings = Math.max(perCourseSchoolCost - openCreditsCostPerCourse, 0);

  return (
    <section className="savings-section" id="pricing">
      <div className="savings-container">
        <h2 className="savings-title">
          Calculate how much you save with <span className="highlight">Open Credits</span>
        </h2>
        <div className="savings-card">
          <div className="savings-grid">
            <div className="savings-form">
              <div className="field-group">
                <label htmlFor="university-search">Pick your University</label>
                <div className="search-input">
                  <input id="university-search" type="text" placeholder="Search your college" />
                  <span className="search-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <circle cx="11" cy="11" r="6"></circle>
                      <path d="M16 16l4 4"></path>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="field-group">
                <label htmlFor="course-count">Number of Courses</label>
                <select
                  id="course-count"
                  value={courseCount}
                  onChange={(event) => setCourseCount(Number(event.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? 'course' : 'courses'} - {count * 3} Credits
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label>Student Type</label>
                <div className="student-tabs">
                  <button
                    type="button"
                    className={`student-tab ${activeTab === TAB_US ? 'active' : ''}`}
                    onClick={() => setActiveTab(TAB_US)}
                  >
                    US Local/ Military
                  </button>
                  <button
                    type="button"
                    className={`student-tab ${activeTab === TAB_INTL ? 'active' : ''}`}
                    onClick={() => setActiveTab(TAB_INTL)}
                  >
                    International Student
                  </button>
                </div>
              </div>

              <div className="breakdown">
                <h3>Breakdown</h3>
                <div className="breakdown-row">
                  <span>Estimated cost per course (3 credits):</span>
                  <strong>{formatCurrency(perCourseSchoolCost)}</strong>
                </div>
                <div className="breakdown-row">
                  <span>Estimated cost of living (per semester):</span>
                  <strong>{formatCurrency(LIVING_COST)}</strong>
                </div>
                <div className="breakdown-row">
                  <span>What you pay Open Credits per course (3 credits):</span>
                  <strong>{formatCurrency(openCreditsCostPerCourse)}</strong>
                </div>
                <div className="breakdown-row highlight">
                  <span>You save:</span>
                  <strong>{formatCurrency(perCourseSavings)}</strong>
                </div>
              </div>
            </div>

            <div className="savings-summary">
              <div className="summary-card summary-outline">
                <span>You Pay</span>
                <strong>{formatCurrency(totals.estimated)}</strong>
                <small>without Open Credits</small>
              </div>
              <div className="summary-card summary-solid">
                <span>You Pay</span>
                <strong>{formatCurrency(totals.openCredits)}</strong>
                <small>with Open Credits (Tax included)</small>
              </div>
            </div>
          </div>

          <div className="bundle-section">
            <h3>Also See - Bundle Savings</h3>
            <div className="bundle-grid">
              {[
                { label: '6 Course Bundle', value: 2000 },
                { label: '12 Course Bundle', value: 2000 },
                { label: '24 Course Bundle', value: 2000 }
              ].map((bundle) => (
                <div key={bundle.label} className="bundle-card">
                  <span>{bundle.label}</span>
                  <strong>{formatCurrency(bundle.value)}</strong>
                  <small>Save upto $11,000</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
