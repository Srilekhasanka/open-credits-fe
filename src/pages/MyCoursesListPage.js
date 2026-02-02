import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import enrollmentService from '../services/enrollmentService';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/constants';
import bookmarkAddIcon from '../assets/bookmark_add.svg';
import '../components/DashboardLayout.css';

const MyCoursesListPage = () => {
  const { isAuthenticated, user, enrolledCourses, cartItems, setEnrolledCoursesData } = useAuth();
  const navigate = useNavigate();
  const [loadingEnrollments, setLoadingEnrollments] = useState(false);
  const [courseFilter, setCourseFilter] = useState('all');
  const [loadingCourseId, setLoadingCourseId] = useState('');
  const [courseError, setCourseError] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [loadingBookmarks, setLoadingBookmarks] = useState(false);

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

  const myCourses = filteredCourses;

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
        } else {
          next.add(courseId);
        }
        return next;
      });
    } catch (error) {
      // Ignore bookmark update errors on this view.
    }
  };

  const handleViewCourse = async (course) => {
    if (!course?.id) {
      setCourseError('Unable to open course. Missing course id.');
      return;
    }

    setLoadingCourseId(course.id);
    setCourseError('');
    try {
      const chaptersResponse = await apiService.get(API_ENDPOINTS.CHAPTERS.BY_COURSE(course.id));
      const chaptersPayload = chaptersResponse?.payload || chaptersResponse?.data || chaptersResponse;
      const chapters = Array.isArray(chaptersPayload) ? chaptersPayload : chaptersPayload?.chapters || [];
      const firstChapterId = chapters[0]?.id || chapters[0]?._id;

      let lessons = [];
      if (firstChapterId) {
        const lessonsResponse = await apiService.get(API_ENDPOINTS.LESSONS.BY_CHAPTER(firstChapterId));
        const lessonsPayload = lessonsResponse?.payload || lessonsResponse?.data || lessonsResponse;
        lessons = Array.isArray(lessonsPayload) ? lessonsPayload : lessonsPayload?.lessons || [];
      }

      sessionStorage.setItem(`oc_course_chapters_${course.id}`, JSON.stringify(chapters));
      if (firstChapterId) {
        sessionStorage.setItem(`oc_chapter_lessons_${firstChapterId}`, JSON.stringify(lessons));
      }

      navigate(`/course/${course.id}/learn`, {
        state: {
          course,
          resume: true,
          chapters,
          lessons,
          chapterId: firstChapterId
        }
      });
    } catch (error) {
      setCourseError('Failed to load course content. Please try again.');
    } finally {
      setLoadingCourseId('');
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
            <button
              className={`mycourses__filter ${courseFilter === 'completed' ? 'mycourses__filter--active' : ''}`}
              type="button"
              onClick={() => setCourseFilter('completed')}
            >
              Completed Courses
            </button>
            <button
              className={`mycourses__filter ${courseFilter === 'unfinished' ? 'mycourses__filter--active' : ''}`}
              type="button"
              onClick={() => setCourseFilter('unfinished')}
            >
              Unfinished Courses
            </button>
          </div>
        </div>

        <div className="mycourses__grid">
          {loadingEnrollments && enrolledCourses.length === 0 && (
            <div className="mycourses__loading">Loading enrolled courses...</div>
          )}
          {!loadingEnrollments && enrolledCourses.length === 0 && (
            <div className="mycourses__loading">No enrolled courses found.</div>
          )}
          {!loadingEnrollments && enrolledCourses.length > 0 && myCourses.length === 0 && (
            <div className="mycourses__loading">No courses match this filter.</div>
          )}
          {courseError && (
            <div className="mycourses__loading">{courseError}</div>
          )}
          {myCourses.map((course, index) => {
            const progressValue = course.progress ?? 0;
            return (
              <div key={`${course.id}-${index}`} className="mycourses__card">
                <div className="mycourses__card-top">
                  <div className="mycourses__course-icon">ACC</div>
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
                    onClick={() => handleViewCourse(course)}
                    disabled={loadingCourseId === course.id}
                  >
                    {loadingCourseId === course.id ? 'Loading...' : 'View Course'}
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
