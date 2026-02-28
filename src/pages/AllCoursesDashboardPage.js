import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/constants';
import '../components/DashboardLayout.css';

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
const bookmarkAddIcon = '/images/bookmark_add.svg';

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
  sociology: 'psychology',
  phi: 'psychology',
  phil: 'psychology',
  philosophy: 'psychology',
  bio: 'science',
  chem: 'science',
  math: 'math',
  cs: 'computer science'
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
  if (fallbackKey) return subjectIcons[fallbackKey];

  const fallbackText = [rawSubject, course.code, course.name]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  if (
    fallbackText.includes('social science') ||
    fallbackText.includes('social sciences') ||
    fallbackText.includes('sociology') ||
    fallbackText.includes('philosophy') ||
    fallbackText.includes('psychology')
  ) {
    return subjectIcons.psychology;
  }
  if (fallbackText.includes('accounting')) {
    return subjectIcons.business;
  }
  return null;
};

const parseDisplayOrder = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const AllCoursesDashboardPage = () => {
  const { isAuthenticated, user, addToCart, cartItems } = useAuth();
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceSort, setPriceSort] = useState('desc');
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [loadingBookmarks, setLoadingBookmarks] = useState(false);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(''), 1800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    let isMounted = true;

    const fetchBookmarks = async () => {
      setLoadingBookmarks(true);
      try {
        const response = await apiService.get(API_ENDPOINTS.BOOKMARKS.LIST);
        const payload = response?.payload || response?.data || response;
        const items = Array.isArray(payload)
          ? payload
          : payload?.bookmarks || payload?.data || payload?.payload || [];
        const ids = items
          .map((item) => item.course_id || item.courseId || item.course?.id || item.id)
          .filter(Boolean);
        if (isMounted) {
          setBookmarkedIds(new Set(ids));
        }
      } catch (error) {
        if (isMounted) {
          setBookmarkedIds(new Set());
        }
      } finally {
        if (isMounted) {
          setLoadingBookmarks(false);
        }
      }
    };

    fetchBookmarks();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const response = await apiService.get(API_ENDPOINTS.COURSES.LIST);
        const payload = response?.payload || response?.data || response;
        const items = Array.isArray(payload) ? payload : payload?.courses || payload?.data || [];
        const normalized = items.map((course) => {
          const rawName = course.name || course.title || '';
          const [codePart, ...nameParts] = rawName.split(':');
          const hasCode = rawName.includes(':');
          const normalizedPrice = Number(String(course.price ?? course.cost ?? 0).replace(/[^0-9.]/g, ''));
          const seatDisplay =
            course?.seats?.display ||
            (course?.seats?.enrolled != null && course?.seats?.total != null
              ? `${course.seats.enrolled}/${course.seats.total}`
              : '') ||
            course.seats_display ||
            course.seatsDisplay ||
            '';
          return {
            id: course.id ?? course.course_id ?? course._id ?? course.slug ?? course.code ?? rawName,
            code: hasCode ? codePart.trim() : '',
            name: hasCode ? nameParts.join(':').trim() : rawName,
            description: course.description || course.desc || '',
            price: Number.isNaN(normalizedPrice) ? 0 : normalizedPrice,
            seats: seatDisplay ? `${seatDisplay} seats left` : 'Seats unavailable',
            subject:
              course.subject ||
              course.subject_area ||
              course.category ||
              course.discipline ||
              '',
            displayOrder: parseDisplayOrder(course.display_order ?? course.displayOrder)
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

  const getDisplayOrderValue = (course) =>
    Number.isFinite(course.displayOrder) ? course.displayOrder : Number.MAX_SAFE_INTEGER;

  const sortedCourses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const filtered = query
      ? courses.filter((course) => {
          const haystack = [course.code, course.name]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();
          return haystack.includes(query);
        })
      : courses;
    return [...filtered].sort((a, b) => {
      if (priceSort === 'asc' || priceSort === 'desc') {
        const priceDiff = priceSort === 'asc'
          ? (a.price ?? 0) - (b.price ?? 0)
          : (b.price ?? 0) - (a.price ?? 0);
        if (priceDiff !== 0) return priceDiff;
      }
      const displayDiff = getDisplayOrderValue(a) - getDisplayOrderValue(b);
      if (displayDiff !== 0) return displayDiff;
      return (a.name || '').localeCompare(b.name || '');
    });
  }, [courses, searchTerm, priceSort]);

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

  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ');
  const formattedName = fullName || (user?.email ? user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1) : 'Student');
  const displayInitial = formattedName.charAt(0);

  const toggleBookmark = async (courseId) => {
    if (!courseId || loadingBookmarks) return;
    const isBookmarked = bookmarkedIds.has(courseId);
    try {
      if (isBookmarked) {
        await apiService.delete(API_ENDPOINTS.BOOKMARKS.REMOVE(courseId));
      } else {
        await apiService.post(API_ENDPOINTS.BOOKMARKS.ADD, { course_id: courseId });
      }
      setBookmarkedIds((prev) => {
        const next = new Set(prev);
        if (isBookmarked) {
          next.delete(courseId);
          setToastMessage('Bookmark removed');
        } else {
          next.add(courseId);
          setToastMessage('Bookmarked');
        }
        return next;
      });
    } catch (error) {
      setToastMessage('Bookmark update failed');
    }
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
            <input type="text" placeholder="Search Courses" aria-label="Search courses" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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

      <section className="allcourses">
        <div className="allcourses__title-row">
          <h2>All Courses</h2>
          <div className="allcourses__filters">
            <button
              className={`mycourses__filter mycourses__filter--sort${priceSort ? ' mycourses__filter--sort-active' : ''}`}
              type="button"
              onClick={() => setPriceSort((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
            >
              Sort by
              <span
                aria-hidden="true"
                className={`mycourses__sort-arrow${priceSort === 'desc' ? ' mycourses__sort-arrow--desc' : ''}`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 3.5V12.5M8 3.5L4 7.5M8 3.5L12 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
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
          {sortedCourses.map((course) => {
            const iconSrc = getSubjectIcon(course);
            return (
              <div key={course.id} className="allcourses__card">
                <div className="mycourses__card-top">
                  <div className="mycourses__course-icon">
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
                <div className="mycourses__card-body">
                  <h3>{course.code ? `${course.code}: ` : ''}{course.name}</h3>
                  <p>{course.description}</p>
                </div>
                <div className="mycourses__card-divider" />
                <div className="allcourses__price-row">
                  <div>
                    <div className="allcourses__price">${course.price}</div>
                    <div className="allcourses__seats">{course.seats}</div>
                  </div>
                  {cartItems.some((item) => item.id === course.id) ? (
                    <span className="allcourses__cta allcourses__cta--added">Added to cart</span>
                  ) : (
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
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {toastMessage && <div className="dashboard__toast">{toastMessage}</div>}
    </div>
  );
};

export default AllCoursesDashboardPage;


