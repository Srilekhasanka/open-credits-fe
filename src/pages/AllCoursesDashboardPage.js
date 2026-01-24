import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import courseService from '../services/courseService';
import '../components/DashboardLayout.css';

const AllCoursesDashboardPage = () => {
  const { isAuthenticated, user, addToCart, cartItems } = useAuth();
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(''), 1800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const payload = await courseService.getCourses({ is_active: true, page: 0, limit: 50 });
        const items = Array.isArray(payload) ? payload : payload?.courses || payload?.data || [];
        const normalized = items.map((course) => {
          const rawName = course.name || course.title || '';
          const [codePart, ...nameParts] = rawName.split(':');
          const hasCode = rawName.includes(':');
          const normalizedPrice = Number(String(course.price ?? course.cost ?? 0).replace(/[^0-9.]/g, ''));
          return {
            id: course.id ?? course.course_id ?? course._id ?? course.slug ?? course.code ?? rawName,
            code: hasCode ? codePart.trim() : '',
            name: hasCode ? nameParts.join(':').trim() : rawName,
            description: course.description || course.desc || '',
            price: Number.isNaN(normalizedPrice) ? 0 : normalizedPrice,
            seats: '22/50 seats left'
          };
        });

        if (isMounted) {
          setCourses(normalized);
        }
      } catch (error) {
        if (isMounted) {
          setCourses([]);
        }
      } finally {
        if (isMounted) {
          setLoadingCourses(false);
        }
      }
    };

    if (isAuthenticated) {
      fetchCourses();
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="dashboard__auth-cta">
        <div className="dashboard__auth-card">
          <h1>Please sign in to view courses</h1>
          <p>Browse all available courses after signing in.</p>
          <button onClick={() => navigate('/signin')}>Sign In</button>
        </div>
      </div>
    );
  }

  const displayName = user?.email ? user.email.split('@')[0] : 'Student';
  const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
  const displayInitial = formattedName.charAt(0);

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

      <section className="allcourses">
        <div className="allcourses__title-row">
          <h2>My Courses</h2>
          <div className="allcourses__filters">
            <button className="mycourses__filter mycourses__filter--sort" type="button">
              Sort by
              <span aria-hidden="true" className="mycourses__sort-arrow">↑</span>
            </button>
          </div>
        </div>

        <div className="allcourses__grid">
          {loadingCourses && courses.length === 0 && (
            <div className="mycourses__loading">Loading courses...</div>
          )}
          {!loadingCourses && courses.length === 0 && (
            <div className="mycourses__loading">No courses found.</div>
          )}
          {courses.map((course) => (
            <div key={course.id} className="allcourses__card">
              <div className="mycourses__card-top">
                <div className="mycourses__course-icon">ACC</div>
                <button className="mycourses__bookmark" type="button" aria-label="Bookmark">
                  <span />
                </button>
              </div>
              <div className="mycourses__card-body">
                <h3>{course.code}: {course.name}</h3>
                <p>{course.description}</p>
              </div>
              <div className="mycourses__card-divider" />
              <div className="allcourses__price-row">
                <div>
                  <div className="allcourses__price">${course.price}</div>
                  <div className="allcourses__seats">{course.seats}</div>
                </div>
                <button
                  className="allcourses__cta"
                  type="button"
                  onClick={() => {
                    const added = addToCart(course);
                    setToastMessage(added ? 'Added to cart' : 'Already in cart');
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {toastMessage && <div className="dashboard__toast">{toastMessage}</div>}
    </div>
  );
};

export default AllCoursesDashboardPage;
