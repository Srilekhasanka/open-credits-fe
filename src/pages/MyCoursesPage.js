import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../components/DashboardLayout.css';

const MyCoursesPage = () => {
  const { isAuthenticated, user, enrolledCourses, cartItems } = useAuth();
  const navigate = useNavigate();

  const [courseFilter, setCourseFilter] = useState('all');

  const filteredCourses = useMemo(() => {
    if (courseFilter === 'completed') {
      return enrolledCourses.filter((course) => course.status === 'Completed');
    }
    if (courseFilter === 'unfinished') {
      return enrolledCourses.filter((course) => course.status !== 'Completed');
    }
    return enrolledCourses;
  }, [enrolledCourses, courseFilter]);

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
            <input type="text" placeholder="Search Courses" aria-label="Search courses" />
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
                {continueCourses.length === 0 && (
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
                    className="dashboard__filter-btn dashboard__filter-btn--sort"
                    type="button"
                  >
                    Sort by
                    <span aria-hidden="true" className="dashboard__sort-arrow">↑</span>
                  </button>
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
                {filteredCourses.length === 0 && (
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
                        onClick={() => navigate(`/course/${course.id}/learn`)}
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
