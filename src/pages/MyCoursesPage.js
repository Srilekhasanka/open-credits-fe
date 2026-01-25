import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import enrollmentService from '../services/enrollmentService';
import '../components/DashboardLayout.css';

const MyCoursesPage = () => {
  const { isAuthenticated, user, enrolledCourses, cartItems, setEnrolledCoursesData } = useAuth();
  const navigate = useNavigate();

  const [courseFilter, setCourseFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingEnrollments, setLoadingEnrollments] = useState(false);

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
            status: item.status || item.course?.status || 'In Progress'
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

  const displayName = user?.email ? user.email.split('@')[0] : 'Student';
  const displayInitial = displayName.charAt(0).toUpperCase();

  const continueCourses = enrolledCourses.slice(0, 3);
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

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
            <FiShoppingCart />
            {cartItems.length > 0 && <span className="dashboard__cart-badge">{cartItems.length}</span>}
          </button>
          <button className="dashboard__icon-btn" type="button" aria-label="Notifications">
            <FiBell />
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
              <p>Refer it to your friends, family and more to win iPad, Mac Books, iPhones, and more.</p>
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
                  return (
                    <div key={course.id} className="dashboard__mini-card">
                      <div className="dashboard__mini-header">
                        <div className="dashboard__mini-dot" />
                        <h3>{course.code}: {course.name}</h3>
                      </div>
                      <span>{progressValue}% complete</span>
                      <div className="dashboard__mini-progress">
                        <div style={{ width: `${progressValue}%` }} />
                      </div>
                      <button
                        className="dashboard__mini-action"
                        type="button"
                        onClick={() => navigate(`/course/${course.id}/learn`, { state: { resume: true } })}
                      >
                        Continue
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="dashboard__section">
              <div className="dashboard__section-header dashboard__section-header--stack">
                <div className="dashboard__section-title">My Courses</div>
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
                {filteredCourses.map((course) => {
                  const progressValue = course.progress ?? 0;
                  return (
                    <div key={course.id} className="dashboard__course-card">
                      <div className="dashboard__course-icon">{course.code?.split(' ')[0] || 'OC'}</div>
                      <div>
                        <h3>{course.code}: {course.name}</h3>
                        <p>{course.description || 'Track your coursework, assignments, and weekly milestones.'}</p>
                      </div>
                      <div className="dashboard__progress">
                        <span>{progressValue}% complete</span>
                        <span>{progressValue}%</span>
                      </div>
                      <div className="dashboard__progress-bar">
                        <div style={{ width: `${progressValue}%` }} />
                      </div>
                      <button
                        className="dashboard__course-action"
                        type="button"
                        onClick={() => navigate(`/course/${course.id}/learn`, { state: { resume: true } })}
                      >
                        View Course
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
        </div>

        <aside className="dashboard__profile">
          <div className="dashboard__profile-card">
            <button className="dashboard__profile-link-inline" type="button" onClick={() => navigate('/my-account')}>
              view profile
            </button>
            <div className="dashboard__profile-avatar">{displayInitial}</div>
            <h3>{formattedName}</h3>
            <span>@{displayName}</span>
          </div>

          <div className="dashboard__highlights">
            <h4>Highlights</h4>
            <div className="dashboard__highlight-item">
              <span>You have completed a course</span>
            </div>
            <div className="dashboard__highlight-item">
              <span>You have an incomplete Quiz</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MyCoursesPage;

