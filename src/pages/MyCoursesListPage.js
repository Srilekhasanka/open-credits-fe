import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../components/DashboardLayout.css';

const MyCoursesListPage = () => {
  const { isAuthenticated, user, enrolledCourses, cartItems } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="dashboard__auth-cta">
        <div className="dashboard__auth-card">
          <h1>Please sign in to view your courses</h1>
          <p>Access your enrolled courses and continue learning.</p>
          <button onClick={() => navigate('/signin')}>Sign In</button>
        </div>
      </div>
    );
  }

  const displayName = user?.email ? user.email.split('@')[0] : 'Student';
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
  const displayInitial = formattedName.charAt(0);

  const fallbackCourses = [
    {
      id: 'acc-210',
      code: 'ACC 210',
      name: 'Managerial Accounting',
      progress: 80,
      description: 'Learn core managerial accounting concepts, interpret financial statements.'
    },
    {
      id: 'acc-211',
      code: 'ACC 210',
      name: 'Managerial Accounting',
      progress: 80,
      description: 'Learn core managerial accounting concepts, interpret financial statements.'
    },
    {
      id: 'acc-212',
      code: 'ACC 210',
      name: 'Managerial Accounting',
      progress: 80,
      description: 'Learn core managerial accounting concepts, interpret financial statements.'
    }
  ];

  const myCourses = enrolledCourses.length > 0 ? enrolledCourses : fallbackCourses;
  const courseCards = [...myCourses, ...myCourses].slice(0, 6);

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

      <section className="mycourses">
        <div className="mycourses__title-row">
          <h2>My Courses</h2>
          <div className="mycourses__filters">
            <button className="mycourses__filter mycourses__filter--sort" type="button">
              Sort by
              <span aria-hidden="true" className="mycourses__sort-arrow">↑</span>
            </button>
            <button className="mycourses__filter mycourses__filter--active">Completed Courses</button>
            <button className="mycourses__filter">Unfinished Courses</button>
          </div>
        </div>

        <div className="mycourses__grid">
          {courseCards.map((course, index) => {
            const progressValue = course.progress ?? 80;
            return (
              <div key={`${course.id}-${index}`} className="mycourses__card">
                <div className="mycourses__card-top">
                  <div className="mycourses__course-icon">ACC</div>
                  <button className="mycourses__bookmark" type="button" aria-label="Bookmark">
                    <span />
                  </button>
                </div>
                <div className="mycourses__card-body">
                  <h3>{course.code}: {course.name}</h3>
                  <p>{course.description || 'Learn core managerial accounting concepts, interpret financial statements.'}</p>
                </div>
                <div className="mycourses__card-divider" />
                <div className="mycourses__progress-row">
                  <div>
                    <div className="mycourses__progress-label">{progressValue}% complete</div>
                    <div className="mycourses__last-opened">Last opened 2/12/24</div>
                  </div>
                  <button
                    className="mycourses__cta"
                    type="button"
                    onClick={() => navigate(`/course/${course.id}/learn`)}
                  >
                    View Course
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MyCoursesListPage;
