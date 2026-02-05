import { useCallback, useEffect, useRef, useState } from 'react';
import './SavingsCalculator.css';
import { API_ENDPOINTS } from '../config/constants';

const TAB_US = 'us';
const TAB_INTL = 'intl';

const parseNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getUniversityName = (university) =>
  university?.name || university?.university_name || university?.title || '';

const getUniversityState = (university) =>
  university?.state || university?.state_code || '';

const normalize = (value) => (value || '').trim().toLowerCase();

const getUniversityResults = (response) => {
  const candidates =
    response?.payload?.universities ??
    response?.data?.universities ??
    response?.payload ??
    response?.data ??
    response?.universities ??
    [];

  if (!Array.isArray(candidates)) {
    return [];
  }

  return candidates.filter((university) => getUniversityName(university));
};

const getUniversityCostPerCredit = (university, activeTab) => {
  if (!university) {
    return 0;
  }

  const averageCostPerCourse = parseNumber(university.averageCostPerCourse);
  const fromAveragePerCredit = averageCostPerCourse > 0 ? Math.round(averageCostPerCourse / 3) : 0;

  if (activeTab !== TAB_INTL) {
    return (
      parseNumber(university.costPerCredit) ||
      parseNumber(university.cost_per_credit) ||
      parseNumber(university.university_cost_per_credit) ||
      parseNumber(university.inStateCostPerCredit) ||
      parseNumber(university.in_state_cost_per_credit) ||
      fromAveragePerCredit ||
      parseNumber(university.outOfStateCostPerCredit) ||
      parseNumber(university.out_of_state_cost_per_credit)
    );
  }

  return (
    parseNumber(university.costPerCredit) ||
    parseNumber(university.cost_per_credit) ||
    parseNumber(university.university_cost_per_credit) ||
    parseNumber(university.outOfStateCostPerCredit) ||
    parseNumber(university.out_of_state_cost_per_credit) ||
    parseNumber(university.inStateCostPerCredit) ||
    parseNumber(university.in_state_cost_per_credit) ||
    fromAveragePerCredit
  );
};

const getUniversityLivingCost = (university) =>
  parseNumber(university?.costOfLiving) ||
  parseNumber(university?.cost_of_living) ||
  parseNumber(university?.costOfLivingPerSemester) ||
  parseNumber(university?.cost_of_living_per_semester) ||
  parseNumber(university?.livingCostPerSemester);

const SavingsCalculator = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [courseCount, setCourseCount] = useState(null);
  const [costPerCredit, setCostPerCredit] = useState(0);
  const [scholarshipAmount, setScholarshipAmount] = useState(0);
  const [livingCost, setLivingCost] = useState(0);
  const courseSelectRef = useRef(null);
  const courseDropdownRef = useRef(null);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const courseOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  // University search state
  const [universitySearch, setUniversitySearch] = useState('');
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [isUniversityOpen, setIsUniversityOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const universityDropdownRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Calculator API state
  const [calculatorData, setCalculatorData] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const calcTimeoutRef = useRef(null);

  // Fetch universities from API
  const fetchUniversities = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setUniversities([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.UNIVERSITIES.SEARCH(query));
      const data = await response.json();

      if (data?.success === false) {
        setUniversities([]);
        return;
      }

      setUniversities(getUniversityResults(data));
    } catch (error) {
      console.error('Error fetching universities:', error);
      setUniversities([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Call course calculator API
  const calculateCosts = useCallback(async () => {
    if (!courseCount || !selectedUniversity || !activeTab) {
      setCalculatorData(null);
      return;
    }

    setIsCalculating(true);
    try {
      const response = await fetch(API_ENDPOINTS.CALCULATOR.COURSE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_type: activeTab === TAB_US ? 'us_local_military' : 'international_student',
          number_of_courses: courseCount,
          scholarship_amount: scholarshipAmount || 0,
          cost_of_living_per_semester: livingCost || 0,
          university_cost_per_credit: costPerCredit || 0,
        }),
      });

      const data = await response.json();
      if (data.success && data.payload) {
        setCalculatorData(data.payload);
      }
    } catch (error) {
      console.error('Error calculating costs:', error);
    } finally {
      setIsCalculating(false);
    }
  }, [activeTab, courseCount, scholarshipAmount, livingCost, costPerCredit, selectedUniversity]);

  // Debounced calculator API call
  useEffect(() => {
    if (calcTimeoutRef.current) {
      clearTimeout(calcTimeoutRef.current);
    }

    if (courseCount && selectedUniversity && activeTab) {
      calcTimeoutRef.current = setTimeout(() => {
        calculateCosts();
      }, 300);
    } else {
      setCalculatorData(null);
    }

    return () => {
      if (calcTimeoutRef.current) {
        clearTimeout(calcTimeoutRef.current);
      }
    };
  }, [calculateCosts, courseCount, selectedUniversity, activeTab]);

  // Debounced university search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (universitySearch && !selectedUniversity) {
      searchTimeoutRef.current = setTimeout(() => {
        fetchUniversities(universitySearch);
      }, 300);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [universitySearch, selectedUniversity, fetchUniversities]);

  useEffect(() => {
    if (selectedUniversity || !universitySearch || universities.length === 0) {
      return;
    }

    const searchName = normalize(universitySearch);
    const exactMatch = universities.find((uni) => normalize(getUniversityName(uni)) === searchName);

    if (!exactMatch) {
      return;
    }

    setSelectedUniversity(exactMatch);
    setCostPerCredit(getUniversityCostPerCredit(exactMatch, activeTab));
    setLivingCost(getUniversityLivingCost(exactMatch));
  }, [universities, universitySearch, selectedUniversity, activeTab]);

  // Handle university selection
  const handleUniversitySelect = (university) => {
    setSelectedUniversity(university);
    setUniversitySearch(getUniversityName(university));
    setIsUniversityOpen(false);
    setUniversities([]);
    setCostPerCredit(getUniversityCostPerCredit(university, activeTab));
    setLivingCost(getUniversityLivingCost(university));
  };

  // Handle university search input change
  const handleUniversitySearchChange = (e) => {
    const value = e.target.value;
    setUniversitySearch(value);
    setSelectedUniversity(null);
    setCostPerCredit(0);
    setLivingCost(0);
    setCalculatorData(null);
    setIsUniversityOpen(value.length >= 2);
  };

  // Close university dropdown on outside click
  useEffect(() => {
    if (!isUniversityOpen) return;
    const handleOutsideClick = (event) => {
      if (!universityDropdownRef.current?.contains(event.target)) {
        setIsUniversityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isUniversityOpen]);

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

  useEffect(() => {
    if (!selectedUniversity) {
      return;
    }

    setCostPerCredit(getUniversityCostPerCredit(selectedUniversity, activeTab));
  }, [selectedUniversity, activeTab]);

  const formatCurrency = (value) => `$${(value || 0).toLocaleString('en-US')}`;

  // Handle scholarship input
  const handleScholarshipChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setScholarshipAmount(value ? parseInt(value, 10) : 0);
  };

  // Get values from API response only
  const withoutOpenCredits = calculatorData?.without_open_credits?.you_pay || 0;
  const withOpenCredits = calculatorData?.with_open_credits?.you_pay || 0;
  const estimatedCostPerCourse = calculatorData?.without_open_credits?.estimated_cost_per_course || 0;
  const openCreditsPerCourse = calculatorData?.with_open_credits?.open_credits_per_course || 0;
  const youSave = calculatorData?.savings?.you_save || 0;
  const costOfLivingDisplay = calculatorData?.without_open_credits?.cost_of_living || 0;
  const bundles = calculatorData?.bundles || [];

  return (
    <section className="savings-section savings-calculator" id="pricing">
      <h2>
        Calculate how much you save with <span>Open Credits</span>
      </h2>
      <div className="savings-card">
        <div className="savings-left">
          <div className="savings-field">
            <label htmlFor="university-search">Pick your University</label>
            <div className="savings-input savings-input--autocomplete" ref={universityDropdownRef}>
              <input
                id="university-search"
                type="text"
                placeholder="Search your college"
                value={universitySearch}
                onChange={handleUniversitySearchChange}
                onFocus={() => universitySearch.length >= 2 && setIsUniversityOpen(true)}
                autoComplete="off"
              />
              <span className="savings-icon" aria-hidden="true">
                {isLoading ? (
                  <svg className="spinner" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" strokeWidth="3" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" focusable="false">
                    <circle cx="9" cy="9" r="6" />
                    <line x1="13.5" y1="13.5" x2="18" y2="18" />
                  </svg>
                )}
              </span>
              {isUniversityOpen && universities.length > 0 && (
                <ul className="savings-autocomplete-menu" role="listbox">
                  {universities.map((uni) => {
                    const uniName = getUniversityName(uni);
                    const uniState = getUniversityState(uni);
                    const selectedKey =
                      selectedUniversity?._id || selectedUniversity?.id || getUniversityName(selectedUniversity);
                    const optionKey = uni._id || uni.id || uniName;
                    const isSelected = selectedKey && selectedKey === optionKey;

                    return (
                      <li key={optionKey} role="option" aria-selected={Boolean(isSelected)}>
                        <button
                          type="button"
                          className="savings-autocomplete-option"
                          onClick={() => handleUniversitySelect(uni)}
                        >
                          <span className="uni-name">{uniName}</span>
                          {(uni.city || uniState) && (
                            <span className="uni-location">
                              {uni.city ? `${uni.city}${uniState ? ', ' : ''}` : ''}
                              {uniState}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
              {isUniversityOpen && universitySearch.length >= 2 && universities.length === 0 && !isLoading && (
                <div className="savings-autocomplete-empty">No universities found</div>
              )}
            </div>
          </div>
          <div className="savings-field">
            <label htmlFor="course-count">Number of Courses</label>
            <div className="savings-input savings-input--select" ref={courseDropdownRef}>
              <button
                id="course-count"
                ref={courseSelectRef}
                type="button"
                className={`savings-select-button${courseCount !== null ? ' has-value' : ''}`}
                aria-haspopup="listbox"
                aria-expanded={isCourseOpen}
                onClick={() => setIsCourseOpen((prev) => !prev)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setIsCourseOpen(false);
                  if (event.key === 'ArrowDown') setIsCourseOpen(true);
                }}
              >
                {courseCount === null
                  ? 'Select number of courses'
                  : `${courseCount} ${courseCount === 1 ? 'course' : 'courses'} - ${courseCount * 3} Credits`}
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
            <label htmlFor="scholarship-amount">Scholarship amount</label>
            <div className="savings-input">
              <input
                id="scholarship-amount"
                type="text"
                placeholder="Enter amount here"
                value={scholarshipAmount > 0 ? scholarshipAmount : ''}
                onChange={handleScholarshipChange}
              />
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
            <strong>{isCalculating ? '...' : formatCurrency(withoutOpenCredits)}</strong>
            <span>without Open Credits</span>
          </div>
          <div className="savings-pill is-accent">
            <div>You Pay</div>
            <strong>{isCalculating ? '...' : formatCurrency(withOpenCredits)}</strong>
            <span>with Open Credits (Tax included)</span>
          </div>
        </div>

        <div className="savings-breakdown">
          <h3>Breakdown</h3>
          <div className="savings-row">
            <span>Estimated cost per course (3 credits):</span>
            <span>{formatCurrency(estimatedCostPerCourse)}</span>
          </div>
          <div className="savings-row">
            <span>Estimated cost of living (per semester):</span>
            <span>{formatCurrency(costOfLivingDisplay)}</span>
          </div>
          <div className="savings-row">
            <span>What you pay Open Credits per course (3 credits):</span>
            <span>{formatCurrency(openCreditsPerCourse)}</span>
          </div>
          <div className="savings-row is-total">
            <span>You save:</span>
            <span>{isCalculating ? '...' : formatCurrency(youSave)}</span>
          </div>
        </div>

        <div className="savings-bundles">
          <h3>Also See - Bundle Savings</h3>
          <div className="savings-bundle-grid">
            {bundles.length > 0 ? (
              bundles.map((bundle) => (
                <div key={bundle.courses} className="savings-bundle">
                  <div className="bundle-label">{bundle.courses} Course Bundle</div>
                  <div className="bundle-price">{formatCurrency(bundle.final_price)}</div>
                  <div className="bundle-note">
                    {bundle.discount ? `Save ${formatCurrency(bundle.discount)}` : ''}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="savings-bundle">
                  <div className="bundle-label">6 Course Bundle</div>
                  <div className="bundle-price">$0</div>
                  <div className="bundle-note"></div>
                </div>
                <div className="savings-bundle">
                  <div className="bundle-label">12 Course Bundle</div>
                  <div className="bundle-price">$0</div>
                  <div className="bundle-note"></div>
                </div>
                <div className="savings-bundle">
                  <div className="bundle-label">24 Course Bundle</div>
                  <div className="bundle-price">$0</div>
                  <div className="bundle-note"></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
