import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopularCourses.css';
import { FaBook } from 'react-icons/fa';
import courseService from '../services/courseService';

const computerIcon = '/images/Computer.svg';
const businessIcon = '/images/Business.svg';
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

const fallbackCourses = [
  {
    id: 1,
    title: 'CS 301 Software\nEngineering',
    description: 'Become a software engineering\nexpertise with our comprehensive\ncourse!',
    price: 399,
    seats: { enrolled: 22, total: 50 },
    tags: ['Computer Science'],
    color: '#8B5CF6',
    icon: computerIcon
  },
  {
    id: 2,
    title: 'Philosophy 200 Principles\nof Philosophy',
    description: 'Covers foundational principles,\nfostering critical',
    price: 399,
    seats: { enrolled: 31, total: 50 },
    tags: ['Gen Eds', 'Most Popular'],
    color: '#C084FC',
    icon: literatureIcon
  },
  {
    id: 3,
    title: 'MAR 102 Principles of Marketing',
    description: 'This course provides a profound\nunderstanding of ',
    price: 399,
    seats: { enrolled: 17, total: 50 },
    tags: ['Gen Eds', 'Business'],
    color: '#FFA500',
    icon: businessIcon
  },
  {
    id: 4,
    title: 'CS 301 Software\nEngineering',
    description: 'Become a software engineering\nexpertise with our comprehensive\ncourse!',
    price: 399,
    seats: { enrolled: 40, total: 50 },
    tags: ['Computer Science'],
    color: '#8B5CF6',
    icon: computerIcon
  },
  {
    id: 5,
    title: 'Philosophy 200 Principles\nof Philosophy',
    description: 'Covers foundational principles,\nfostering critical',
    price: 399,
    seats: { enrolled: 26, total: 50 },
    tags: ['Gen Eds', 'Most Popular'],
    color: '#C084FC',
    icon: literatureIcon
  },
  {
    id: 6,
    title: 'MAR 101 Principles of Marketing',
    description: 'This course provides a profound\nunderstanding of',
    price: 399,
    seats: { enrolled: 12, total: 50 },
    tags: ['Gen Eds', 'Business'],
    color: '#FFA500',
    icon: businessIcon
  }
];

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
  const raw = course.subject || course.subject_area || course.category || '';
  const normalized = raw.toLowerCase().replace(/\s+/g, '');
  const spaced = raw.toLowerCase();
  return subjectIcons[normalized] || subjectIcons[spaced] || null;
};

const hasImageExtension = (value) =>
  typeof value === 'string' && /\.(svg|png|jpe?g|webp)$/i.test(value);

const resolveCourseIcon = (course) => {
  const rawIcon = course.icon || course.icon_url || course.iconUrl;
  if (hasImageExtension(rawIcon)) return rawIcon;
  return getSubjectIcon(course);
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
  const name = (course.name ?? course.title ?? '').trim();
  const code = (course.code ?? course.course_code ?? '').trim();

  return {
    id: course.id ?? course.course_id ?? course._id ?? course.slug ?? code ?? name,
    title: code ? `${code} ${name}`.trim() : name,
    description: course.description ?? course.desc ?? '',
    price: parsePrice(course.price ?? course.cost),
    seats: {
      enrolled: seats.enrolled ?? 0,
      total: seats.total ?? 50,
      display: seats.display
    },
    tags,
    icon: resolveCourseIcon(course)
  };
};

const PopularCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(fallbackCourses);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        const payload = await courseService.getCourses({ limit: 6, is_active: true });
        const items = Array.isArray(payload) ? payload : payload?.courses || payload?.data || [];
        if (!items.length) return;

        const normalized = items.map(normalizeCourse);
        if (isMounted) {
          setCourses(normalized.slice(0, 6));
        }
      } catch (error) {
        if (isMounted) {
          setCourses(fallbackCourses);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="popular-courses">
      <div className="courses-container">
        <div className="courses-header">
          <h2>Our <span className="highlight">Popular Courses</span></h2>
          <button className="btn-view-all" onClick={() => navigate('/courses')}>View All Courses</button>
        </div>

        <div className="courses-grid">
          {courses.map((course) => {
            const priceLabel = typeof course.price === 'number' ? `$${course.price}` : (course.price || '$0');
            const seatLabel = course.seats?.display || `${course.seats?.enrolled ?? 0}/${course.seats?.total ?? 50}`;

            return (
              <div key={course.id} className="course-card">
                <button
                  className="course-bookmark"
                  type="button"
                  aria-label="Bookmark course"
                  onClick={() => navigate('/signin')}
                >
                  <img src={bookmarkAddIcon} alt="" aria-hidden="true" />
                </button>
                <div className="course-icon">
                  {course.icon ? (
                    <img src={course.icon} alt="" aria-hidden="true" />
                  ) : (
                    <FaBook size={28} color="white" />
                  )}
                </div>

                <h3>{course.title}</h3>
                <p>{course.description}</p>

                {course.tags?.length ? (
                  <div className="course-tags">
                    {course.tags.map((tag) => (
                      <span key={`${course.id}-${tag}`} className="course-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="course-footer">
                  <div className="course-price-group">
                    <span className="course-price">{priceLabel}</span>
                    <span className="course-seats">{seatLabel} seats filled</span>
                  </div>
                  <button className="btn-enroll" onClick={() => navigate('/enroll')}>
                    Enroll Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
