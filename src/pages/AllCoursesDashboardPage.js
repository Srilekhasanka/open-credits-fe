import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
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

  const courses = [
    {
      id: 'acc-210',
      code: 'ACC 210',
      name: 'Managerial Accounting',
      description: 'Learn core managerial accounting concepts, interpret financial statements.',
      price: 850,
      seats: '22/50 seats left'
    },
    {
      id: 'bus-230',
      code: 'BUS 230',
      name: 'Project Management',
      description: 'Build project management skills with real-world tools and workflows.',
      price: 850,
      seats: '22/50 seats left'
    },
    {
      id: 'bus-250',
      code: 'BUS 250',
      name: 'Business Law',
      description: 'Explore contracts, compliance, and foundational legal principles.',
      price: 850,
      seats: '22/50 seats left'
    },
    {
      id: 'bus-306',
      code: 'BUS 306',
      name: 'Human Resources',
      description: 'Learn hiring, culture, and people operations essentials.',
      price: 850,
      seats: '22/50 seats left'
    },
    {
      id: 'bus-310',
      code: 'BUS 310',
      name: 'Entrepreneurship',
      description: 'Turn ideas into a business plan with lean startup methods.',
      price: 850,
      seats: '22/50 seats left'
    },
    {
      id: 'acc-211',
      code: 'ACC 211',
      name: 'Financial Accounting',
      description: 'Understand balance sheets, cash flow, and core reporting.',
      price: 850,
      seats: '22/50 seats left'
    }
  ];

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
