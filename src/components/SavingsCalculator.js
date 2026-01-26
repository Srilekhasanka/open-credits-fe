import React, { useEffect, useMemo, useRef, useState } from 'react';
import './SavingsCalculator.css';

const TAB_US = 'us';
const TAB_INTL = 'intl';
const LIVING_COST = 1400;

const SavingsCalculator = () => {
  const [activeTab, setActiveTab] = useState(TAB_US);
  const [courseCount, setCourseCount] = useState(3);
  const [schoolCost, setSchoolCost] = useState(413);
  const courseSelectRef = useRef(null);
  const courseDropdownRef = useRef(null);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const courseOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    if (!isCourseOpen) return;
    const handleOutsideClick = (event) => {
      if (!courseDropdownRef.current?.contains(event.target)) {
        setIsCourseOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isCourseOpen]);

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
    <section className="savings-section savings-calculator" id="pricing">
      <h2>
        Calculate how much you save with <span>Open Credits</span>
      </h2>
      <div className="savings-card">
        <div className="savings-left">
          <div className="savings-field">
            <label htmlFor="university-search">Pick your University</label>
            <div className="savings-input">
              <input id="university-search" type="text" placeholder="Search your college" />
              <span className="savings-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" focusable="false">
                  <circle cx="9" cy="9" r="6" />
                  <line x1="13.5" y1="13.5" x2="18" y2="18" />
                </svg>
              </span>
            </div>
          </div>
          <div className="savings-field">
            <label htmlFor="course-count">Number of Courses</label>
            <div className="savings-input savings-input--select" ref={courseDropdownRef}>
              <button
                id="course-count"
                ref={courseSelectRef}
                type="button"
                className="savings-select-button"
                aria-haspopup="listbox"
                aria-expanded={isCourseOpen}
                onClick={() => setIsCourseOpen((prev) => !prev)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setIsCourseOpen(false);
                  if (event.key === 'ArrowDown') setIsCourseOpen(true);
                }}
              >
                {courseCount} {courseCount === 1 ? 'course' : 'courses'} - {courseCount * 3} Credits
              </button>
              {isCourseOpen && (
                <ul className="savings-select-menu" role="listbox" aria-labelledby="course-count">
                  {courseOptions.map((count) => (
                    <li key={count} role="option" aria-selected={count === courseCount}>
                      <button
                        type="button"
                        className="savings-select-option"
                        onClick={() => {
                          setCourseCount(count);
                          setIsCourseOpen(false);
                        }}
                      >
                        {count} {count === 1 ? 'course' : 'courses'} - {count * 3} Credits
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="savings-field">
            <label>Student Type</label>
            <div className="savings-toggle">
              <button
                type="button"
                className={activeTab === TAB_US ? 'is-active' : ''}
                onClick={() => setActiveTab(TAB_US)}
              >
                U.S Local/ Military
              </button>
              <button
                type="button"
                className={activeTab === TAB_INTL ? 'is-active' : ''}
                onClick={() => setActiveTab(TAB_INTL)}
              >
                International Student
              </button>
            </div>
          </div>
        </div>

        <div className="savings-right">
          <div className="savings-pill">
            <div>You Pay</div>
            <strong>{formatCurrency(totals.estimated)}</strong>
            <span>without Open Credits</span>
          </div>
          <div className="savings-pill is-accent">
            <div>You Pay</div>
            <strong>{formatCurrency(totals.openCredits)}</strong>
            <span>with Open Credits (Tax included)</span>
          </div>
        </div>

        <div className="savings-breakdown">
          <h3>Breakdown</h3>
          <div className="savings-row">
            <span>Estimated cost per course (3 credits):</span>
            <span>{formatCurrency(perCourseSchoolCost)}</span>
          </div>
          <div className="savings-row">
            <span>Estimated cost of living (per semester):</span>
            <span>{formatCurrency(LIVING_COST)}</span>
          </div>
          <div className="savings-row">
            <span>What you pay Open Credits per course (3 credits):</span>
            <span>{formatCurrency(openCreditsCostPerCourse)}</span>
          </div>
          <div className="savings-row is-total">
            <span>You save:</span>
            <span>{formatCurrency(perCourseSavings)}</span>
          </div>
        </div>

        <div className="savings-bundles">
          <h3>Also See - Bundle Savings</h3>
          <div className="savings-bundle-grid">
            {[
              { label: '6 Course Bundle', value: 2000 },
              { label: '12 Course Bundle', value: 2000 },
              { label: '24 Course Bundle', value: 2000 }
            ].map((bundle) => (
              <div key={bundle.label} className="savings-bundle">
                <div className="bundle-label">{bundle.label}</div>
                <div className="bundle-price">{formatCurrency(bundle.value)}</div>
                <div className="bundle-note">Save upto $11,000</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
