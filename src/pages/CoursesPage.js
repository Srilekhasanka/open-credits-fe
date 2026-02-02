import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import courseService from '../services/courseService';
import '../App.css';
import './CoursesPage.css';
import businessIcon from '../assets/Business.svg';
import computerIcon from '../assets/Computer.svg';
import healthIcon from '../assets/Health.svg';
import lawIcon from '../assets/Law.svg';
import psychologyIcon from '../assets/Psychology.svg';
import scienceIcon from '../assets/Science.svg';
import literatureIcon from '../assets/Literature.svg';
import financeIcon from '../assets/Finance.svg';
import generalIcon from '../assets/General.svg';
import economyIcon from '../assets/Economy.svg';
import mathIcon from '../assets/Math.svg';
import bookmarkAddIcon from '../assets/bookmark_add.svg';

const CoursesPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [subject, setSubject] = useState('All');
  const [sortBy, setSortBy] = useState('Price: Low to High');
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [showError, setShowError] = useState(false);
  const [retryToken, setRetryToken] = useState(0);

  const coursesData = [
    { id: 1, code: 'BUS 230', name: 'Project Management', desc: 'Project Management Essentials certificate provides students wit...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: 'C', color: '#ff9800', credits: 'ACE Credits, CSU (Cal-State)', subject: 'Business', auth: 'NCCRS' },
    { id: 2, code: 'BUS 250', name: 'Business Law (ACE)', desc: 'This certificate provides business leaders with an...', price: 250, tags: ['NCCRS Courses', 'Gen Eds'], icon: 'C', color: '#ff9800', credits: 'ACE Courses, Business', subject: 'Business', auth: 'ACE' },
    { id: 3, code: 'BUS 300', name: 'International Business', desc: "You'll expand thinking internationally trade, global...", price: 250, tags: ['NCCRS Courses', 'Business'], icon: 'C', color: '#ff9800', credits: 'ACE Courses, Business', subject: 'Business', auth: 'ACE' },
    { id: 4, code: 'BUS 306', name: 'Human Resources Management', desc: 'Explore the strategic side of human resources with this engaging introduc...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: 'C', color: '#ff9800', credits: 'ACE Courses, Business', subject: 'Business', auth: 'ACE' },
    { id: 5, code: 'BUS 309', name: 'Globalization & International Management', desc: "You'll explore how businesses adapt and succeed...", price: 250, tags: ['NCCRS Courses', 'Business'], icon: 'C', color: '#ff9800', credits: 'NCCRS Courses, Business', subject: 'Business', auth: 'NCCRS' },
    { id: 6, code: 'BUS 310', name: 'Entrepreneurship', desc: 'Entrepreneurship Essentials helps you turn an idea into...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: 'C', color: '#ff9800', credits: 'NCCRS Courses, Business, ACE Credits and Budding', subject: 'Business', auth: 'NCCRS' },
    { id: 7, code: 'ACC 210', name: 'Managerial Accounting', desc: 'Learn core managerial accounting concepts, interpret financial stateme...', price: 250, tags: ['NCCRS Courses', 'NCCRS Courses'], icon: 'C', color: '#ff9800', credits: 'ACE Courses, Business', subject: 'Business', auth: 'ACE' },
    { id: 8, code: 'BUS 100', name: 'Business Essentials', desc: 'Students will understand core economic concepts, interpret economic...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: 'C', color: '#ff9800', credits: 'NCCRS Courses, Business', subject: 'Business', auth: 'NCCRS' },
    { id: 9, code: 'BUS 101', name: 'Principles of Management', desc: 'This course is designed to help students understand the...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: 'C', color: '#ff9800', credits: 'Free Skill and Budding', subject: 'Business', auth: 'NCCRS' },
    { id: 10, code: 'BUS 205', name: 'Foundations of Leadership', desc: 'An interactive, blended learning course for leaders at every...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: 'C', color: '#ff9800', credits: 'Free Skill and Budding', subject: 'Business', auth: 'NCCRS' },
    { id: 11, code: 'BUS 206', name: 'Leadership & Organizational Behaviour', desc: 'Leadership and Organizational Behaviour (LEAD250) applies...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: 'C', color: '#ff9800', credits: 'Free Skill and Budding', subject: 'Business', auth: 'NCCRS' },
    { id: 12, code: 'BUS 210', name: 'Business Communication', desc: 'This course will teach you how to teach effective communication...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: 'C', color: '#ff9800', credits: 'NCCRS Courses, Business', subject: 'Business', auth: 'NCCRS' },
    { id: 13, code: 'PSY 111', name: 'Research Methods in Psychology', desc: 'Learn survey methods, research ethics, and the...', price: 250, tags: ['NCCRS Courses', 'Healthcare'], icon: 'C', color: '#9c27b0', credits: 'Psychology', subject: 'Healthcare', auth: 'NCCRS' },
    { id: 14, code: 'PSY 112', name: 'Psychology of Diversity', desc: 'This course is a great option for students interested...', price: 250, tags: ['NCCRS Courses', 'Healthcare'], icon: 'C', color: '#9c27b0', credits: 'Psychology, Humanities', subject: 'Healthcare', auth: 'NCCRS' },
    { id: 15, code: 'BIO 100', name: 'Introduction to Biology 1', desc: 'The course aims to elucidate and apply the foundational...', price: 250, tags: ['Science', 'NCCRS Courses'], icon: 'C', color: '#4caf50', credits: 'ACE Courses, Most Popular', subject: 'Science', auth: 'ACE' },
    { id: 16, code: 'CHEM 111', name: 'Chemistry I', desc: 'The course aims to impart a thorough...', price: 250, tags: ['NCCRS Courses', 'Science'], icon: 'C', color: '#795548', credits: 'ACE Courses, College Prep', subject: 'Science', auth: 'ACE' },
    { id: 17, code: 'MATH 100', name: 'Business Math', desc: 'The course objective is to introduce and teach you...', price: 250, tags: ['NCCRS Courses', 'Math'], icon: 'C', color: '#00bcd4', credits: 'College Prep, Math', subject: 'Math', auth: 'NCCRS' },
    { id: 18, code: 'CS 210', name: 'Introduction to Java', desc: 'Learn programming in Java and OOC++ with Artificial...', price: 250, tags: ['NCCRS Courses', 'Computer Science'], icon: 'C', color: '#673ab7', credits: 'Computer Science', subject: 'Computer Science', auth: 'NCCRS' },
  ];

  const [courses, setCourses] = useState([]);

  const subjectIcons = {
    business: businessIcon,
    'computer science': computerIcon,
    computerscience: computerIcon,
    health: healthIcon,
    healthcare: healthIcon,
    law: lawIcon,
    lawandjustice: lawIcon,
    psychology: psychologyIcon,
    science: scienceIcon,
    literature: literatureIcon,
    finance: financeIcon,
    finances: financeIcon,
    general: generalIcon,
    economics: economyIcon,
    economy: economyIcon,
    math: mathIcon
  };

  const getSubjectIcon = (course) => {
    const raw = course.subject || '';
    const normalized = raw.toLowerCase().replace(/\s+/g, '');
    const spaced = raw.toLowerCase();
    return subjectIcons[normalized] || subjectIcons[spaced] || null;
  };

  const parsePrice = (value) => {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string') {
      const cleaned = value.replace(/[^0-9.]/g, '');
      const parsed = Number(cleaned);
      return Number.isFinite(parsed) ? parsed : 0;
    }
    return 0;
  };

  const normalizeCourse = (course) => {
    const tags = Array.isArray(course.tags) ? course.tags : [];
    if (!tags.length) {
      if (course.credential_type) tags.push(course.credential_type);
      if (course.subject_area) tags.push(course.subject_area);
    }

    const seats = course.seats || {};
    return {
      id: course.id ?? course.course_id ?? course._id ?? course.slug ?? course.code ?? course.name,
      code: course.code ?? course.course_code ?? '',
      name: course.name ?? course.title ?? '',
      desc: course.description ?? course.desc ?? '',
      price: parsePrice(course.price ?? course.cost),
      tags,
      icon: course.icon ?? 'C',
      color: course.color ?? '#ff9800',
      credits: course.credits ?? course.credit_info ?? '',
      subject: course.subject ?? course.subject_area ?? '',
      auth: course.auth ?? (course.ace_certified ? 'ACE' : course.nccrs_certified ? 'NCCRS' : ''),
      seats: {
        enrolled: seats.enrolled ?? 0,
        total: seats.total ?? 50,
        display: seats.display ?? `${seats.enrolled ?? 0}/${seats.total ?? 50}`
      }
    };
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      setLoading(true);
      setLoadError('');

      try {
        const params = {};

        const payload = await courseService.getCourses(params);
        const items = Array.isArray(payload) ? payload : payload?.courses || payload?.data || [];

        if (isMounted) {
          const normalized = items.map(normalizeCourse);
          setCourses(normalized);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError('Failed to load courses. Please try again.');
          setShowError(true);
          setCourses([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, [searchQuery, subject, retryToken]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subject === 'All' || subject === 'Subject' || course.subject === subject;
    return matchesSearch && matchesSubject;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return (Number(a.price) || 0) - (Number(b.price) || 0);
    if (sortBy === 'Price: High to Low') return (Number(b.price) || 0) - (Number(a.price) || 0);
    if (sortBy === 'Name A-Z') return (a.name || '').localeCompare(b.name || '');
    return 0;
  });

  const handleEnrollClick = (course) => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: '/payment', course } });
    } else {
      navigate('/payment', { state: { course } });
    }
  };

  useEffect(() => {
    if (!showError) return;
    const timer = setTimeout(() => setShowError(false), 18000);
    return () => clearTimeout(timer);
  }, [showError]);

  return (
    <div className="courses-page">
      <div className="courses-wrapper">
        <div className="courses-head">
          <h1>Find Courses</h1>
          <div className="courses-search">
            <input
              type="text"
              placeholder="Search Courses, subjects and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="courses-search-icon" aria-hidden="true" />
          </div>
        </div>

        <div className="courses-filters">
          <div className="filters-left">
            <div className="subject-control">
              <span className="subject-label">Subject</span>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="All">All</option>
                <option value="Psychology">Psychology</option>
                <option value="Science">Science</option>
                <option value="Business">Business</option>
                <option value="Marketing">Marketing</option>
                <option value="ComputerScience">ComputerScience</option>
                <option value="LawAndJustice">LawAndJustice</option>
                <option value="Health">Health</option>
                <option value="Finances">Finances</option>
                <option value="Literature">Literature</option>
                <option value="General">General</option>
                <option value="Economics">Economics</option>
                <option value="Math">Math</option>
              </select>
            </div>
          </div>
          <div className="filters-right">
            <div className="sort-control">
              <span className="sort-label">Sort by</span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
              <span className="sort-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" focusable="false">
                  <path d="M4 6h12M6 10h8M8 14h4" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="courses-breadcrumb">
          Home/Courses/{subject === 'All' ? 'All' : subject}
        </div>

        {showError && loadError && (
          <div className="courses-snackbar" role="status" aria-live="polite">
            {loadError}
          </div>
        )}

        {loading ? (
          <div className="courses-loading">Loading courses...</div>
        ) : sortedCourses.length === 0 ? (
          <div className="courses-empty">
            <p>No courses available.</p>
            <button
              className="courses-retry"
              type="button"
              onClick={() => setRetryToken((prev) => prev + 1)}
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="courses-grid">
            {sortedCourses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-card-top">
                  <div className="course-icon">
                    {getSubjectIcon(course) ? (
                      <img
                        src={getSubjectIcon(course)}
                        alt={`${course.subject || 'Course'} icon`}
                        className="course-icon-image"
                      />
                    ) : (
                      <span>OC</span>
                    )}
                  </div>
                  <div className="course-bookmark" aria-hidden="true">
                    <img src={bookmarkAddIcon} alt="" />
                  </div>
                </div>

                <h3>
                  {course.code ? `${course.code}: ` : ''}{course.name}
                </h3>
                <p className="course-desc">{course.desc}</p>

                <div className="course-tags">
                  {(course.tags || []).map((tag, idx) => (
                    <span key={idx}>{tag}</span>
                  ))}
                </div>

                <div className="course-price-row">
                  <div>
                    <div className="course-price">${course.price}</div>
                    <div className="course-seats">{course.seats?.display || `${course.seats?.enrolled || 0}/${course.seats?.total || 50}`} seats filled</div>
                  </div>
                  <button className="course-enroll" type="button" onClick={() => handleEnrollClick(course)}>
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CoursesPage;
