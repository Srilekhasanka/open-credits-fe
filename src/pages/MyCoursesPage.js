import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/constants';
import enrollmentService from '../services/enrollmentService';
import '../components/DashboardLayout.css';

const bookmarkAddIcon = '/images/bookmark_add.svg';

const businessIcon = '/images/Business.svg';
const computerIcon = '/images/Computer.svg';
const healthIcon = '/images/Health.svg';
const lawIcon = '/images/Law.svg';
const psychologyIcon = '/images/Psychology.svg';
const scienceIcon = '/images/Science.svg';
const literatureIcon = '/images/Literature.svg';
const financeIcon = '/images/Finance.svg';
const generalIcon = '/images/General.svg';
const economyIcon = '/images/Economy.svg';
const mathIcon = '/images/Math.svg';

const subjectIcons = {
  business: businessIcon,
  accounting: businessIcon,
  account: businessIcon,
  'computer science': computerIcon,
  computerscience: computerIcon,
  health: healthIcon,
  healthcare: healthIcon,
  law: lawIcon,
  lawandjustice: lawIcon,
  psychology: psychologyIcon,
  sociology: psychologyIcon,
  'social science': psychologyIcon,
  socialscience: psychologyIcon,
  philosophy: psychologyIcon,
  science: scienceIcon,
  literature: literatureIcon,
  finance: financeIcon,
  finances: financeIcon,
  general: generalIcon,
  economics: economyIcon,
  economy: economyIcon,
  math: mathIcon
};

const prefixToSubject = {
  bus: 'business',
  acc: 'business',
  law: 'law',
  psy: 'psychology',
  soc: 'psychology',
  phi: 'psychology',
  phil: 'psychology',
  bio: 'science',
  chem: 'science',
  math: 'math',
  cs: 'computer science'
};

const MyCoursesPage = () => {
  const { isAuthenticated, user, enrolledCourses, cartItems, setEnrolledCoursesData } = useAuth();
  const navigate = useNavigate();

  const [courseFilter, setCourseFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingEnrollments, setLoadingEnrollments] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  useEffect(() => {
    if (!isAuthenticated) return;
    let isMounted = true;
    const fetchBookmarks = async () => {
      try {
        const response = await apiService.get(API_ENDPOINTS.BOOKMARKS.LIST);
        const payload = response?.payload || response?.data || response;
        const items = Array.isArray(payload) ? payload : payload?.bookmarks || payload?.data || [];
        const ids = items.map((item) => item.course_id || item.courseId || item.course?.id || item.id).filter(Boolean);
        if (isMounted) setBookmarkedIds(new Set(ids));
      } catch { /* ignore */ }
    };
    fetchBookmarks();
    return () => { isMounted = false; };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let isMounted = true;

    const fetchEnrollments = async () => {
      setLoadingEnrollments(true);
      try {
        const payload = await enrollmentService.getEnrolledCourses();
        const enrollments = payload?.enrollments || [];
        const mapped = enrollments.map((item) => {
          const rawName = item.course?.name || '';
          const [codePart, ...nameParts] = rawName.split(':');
          const hasCode = rawName.includes(':');
          const rawProgress =
            item.progress ??
            item.progress_percent ??
            item.completed_percentage ??
            item.course_progress ??
            item.course?.progress ??
            0;
          const numericProgress = Number(rawProgress);
          return {
            id: item.course?.id || item.course_id || item.id,
            code: hasCode ? codePart.trim() : '',
            name: hasCode ? nameParts.join(':').trim() : rawName,
            description: item.course?.description || '',
            progress: Number.isFinite(numericProgress) ? numericProgress : 0,
            status: item.status || item.course?.status || 'In Progress',
            subject:
              item.course?.subject ||
              item.course?.subject_area ||
              item.course?.category ||
              item.course?.discipline ||
              ''
          };
        });

        if (isMounted) {
          setEnrolledCoursesData(mapped);
        }
      } catch (error) {
        // Keep fallback data when API is unavailable.
      } finally {
        if (isMounted) {
          setLoadingEnrollments(false);
        }
      }
    };

    fetchEnrollments();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, setEnrolledCoursesData]);

  const filteredCourses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const searchable = query
      ? enrolledCourses.filter((course) => {
          const haystack = [
            course.code,
            course.name,
            course.description,
            course.status
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
          return haystack.includes(query);
        })
      : enrolledCourses;
    if (courseFilter === 'completed') {
      return searchable.filter((course) => course.status === 'Completed');
    }
    if (courseFilter === 'unfinished') {
      return searchable.filter((course) => course.status !== 'Completed');
    }
    return searchable;
  }, [enrolledCourses, courseFilter, searchTerm]);

  if (!isAuthenticated) {
    return (
      <div className="dashboard__auth-cta">
        <div className="dashboard__auth-card">
          <h1>Please sign in to view your dashboard</h1>
          <p>Access your courses, progress, and highlights.</p>
          <button onClick={() => navigate('/signin')}>Sign In</button>
        </div>
      </div>
    );
  }

  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ');
  const formattedName = fullName || (user?.email ? user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1) : 'Student');
  const displayInitial = formattedName.charAt(0);

  const continueCourses = enrolledCourses.slice(0, 3);

  const toggleBookmark = async (courseId) => {
    if (!courseId) return;
    const isBookmarked = bookmarkedIds.has(courseId);
    try {
      if (isBookmarked) {
        await apiService.delete(API_ENDPOINTS.BOOKMARKS.REMOVE(courseId));
      } else {
        await apiService.post(API_ENDPOINTS.BOOKMARKS.ADD, { course_id: courseId });
      }
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        isBookmarked ? next.delete(courseId) : next.add(courseId);
        return next;
      });
    } catch { /* ignore */ }
  };

  const getSubjectIcon = (course) => {
    const rawSubject = course.subject || '';
    const normalized = rawSubject.toLowerCase().replace(/\s+/g, '');
    const spaced = rawSubject.toLowerCase();
    if (subjectIcons[normalized] || subjectIcons[spaced]) {
      return subjectIcons[normalized] || subjectIcons[spaced];
    }
    const codePrefix = (course.code || '').split(' ')[0].toLowerCase();
    const fallbackKey = prefixToSubject[codePrefix];
    return fallbackKey ? subjectIcons[fallbackKey] : null;
  };

  return (
    <div className="dashboard__main">
      <header className="dashboard__topbar">
        <div className="dashboard__welcome">
          <h1>
            Welcome back, <span>{formattedName}!</span>
          </h1>
        </div>
        <div className="dashboard__topbar-actions">
          <div className="dashboard__search">
            <input
              type="text"
              placeholder="Search Courses"
              aria-label="Search courses"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch />
          </div>
          <button className="dashboard__icon-btn dashboard__icon-btn--cart" type="button" aria-label="Cart" onClick={() => navigate('/shop')}>
            <img src="/images/dashcart.svg" alt="" className="dashboard__icon-img" />
            {cartItems.length > 0 && <span className="dashboard__cart-badge">{cartItems.length}</span>}
          </button>
          <button className="dashboard__icon-btn" type="button" aria-label="Notifications">
            <img src="/images/dashnoti.svg" alt="" className="dashboard__icon-img" />
          </button>
          <button className="dashboard__avatar" type="button" onClick={() => navigate('/my-account')}>
            {displayInitial}
          </button>
        </div>
      </header>

      <div className="dashboard__layout">
        <div className="dashboard__content">
          <section className="dashboard__banner">
            <div>
              <h2>Enjoying Open Credits?</h2>
              <p>
                Refer it to your friends, family and more to win Ipad, Mac Books, Iphones, Trip to Miami, Cruise rides, and more!
              </p>
            </div>
            <button type="button" onClick={() => navigate('/resources')}>Refer Now</button>
          </section>

            <section className="dashboard__section">
              <div className="dashboard__section-title">Continue course</div>
              <div className="dashboard__card-grid">
                {loadingEnrollments && enrolledCourses.length === 0 && (
                  <div className="mycourses__loading">Loading enrolled courses...</div>
                )}
                {!loadingEnrollments && continueCourses.length === 0 && (
                  <div className="mycourses__loading">No enrolled courses yet.</div>
                )}
                {continueCourses.map((course) => {
                  const progressValue = course.progress ?? 0;
                  const iconSrc = getSubjectIcon(course);
                  return (
                    <div key={course.id} className="dashboard__mini-card">
                      <div className="dashboard__mini-icon">
                        {iconSrc ? (
                          <img src={iconSrc} alt="" aria-hidden="true" />
                        ) : (
                          <span>{course.code?.split(' ')[0] || 'OC'}</span>
                        )}
                      </div>
                      <div className="dashboard__mini-body">
                        <h3>{course.code ? `${course.code}: ` : ''}{course.name}</h3>
                        <span>{progressValue}% complete</span>
                      </div>
                      <img src="/images/contiplay.svg" alt="" className="dashboard__mini-play" />
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="dashboard__section">
              <div className="dashboard__section-header dashboard__section-header--stack">
                <div className="dashboard__section-title">My Courses</div>
                <button className="dashboard__view-all-btn" type="button" onClick={() => navigate('/my-courses')}>View my Courses</button>
                <div className="dashboard__filters">
                  <button
                    className={`dashboard__filter-btn ${courseFilter === 'completed' ? 'is-active' : ''}`}
                    type="button"
                    onClick={() => setCourseFilter('completed')}
                  >
                    Completed Courses
                  </button>
                  <button
                    className={`dashboard__filter-btn ${courseFilter === 'unfinished' ? 'is-active' : ''}`}
                    type="button"
                    onClick={() => setCourseFilter('unfinished')}
                  >
                    Unfinished Courses
                  </button>
                </div>
              </div>
              <div className="dashboard__course-grid">
                {loadingEnrollments && enrolledCourses.length === 0 && (
                  <div className="mycourses__loading">Loading enrolled courses...</div>
                )}
                {!loadingEnrollments && filteredCourses.length === 0 && (
                  <div className="mycourses__loading">No courses match this filter.</div>
                )}
                {filteredCourses.slice(0, 2).map((course) => {
                  const progressValue = course.progress ?? 0;
                  const iconSrc = getSubjectIcon(course);
                  return (
                    <div key={course.id} className="dashboard__course-card">
                      <div className="dashboard__course-card-top">
                        <div className="dashboard__course-icon">
                          {iconSrc ? (
                            <img src={iconSrc} alt="" aria-hidden="true" />
                          ) : (
                            course.code?.split(' ')[0] || 'OC'
                          )}
                        </div>
                        <button
                          className={`mycourses__bookmark ${bookmarkedIds.has(course.id) ? 'is-active' : ''}`}
                          type="button"
                          aria-label="Bookmark"
                          aria-pressed={bookmarkedIds.has(course.id)}
                          onClick={() => toggleBookmark(course.id)}
                        >
                          <img src={bookmarkAddIcon} alt="" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="dashboard__course-card-body">
                        <h3>{course.code ? `${course.code}: ` : ''}{course.name}</h3>
                        <p>{course.description || 'Learn core managerial accounting concepts, interpret financial statements.'}</p>
                      </div>
                      <div className="dashboard__course-card-footer">
                        <div>
                          <div className="dashboard__progress-label">{progressValue}% complete</div>
                          <div className="dashboard__last-opened">Last opened 2/12/24</div>
                        </div>
                        <span className="dashboard__course-action">
                          View Course
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
        </div>

      </div>
    </div>
  );
};

export default MyCoursesPage;

