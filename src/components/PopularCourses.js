import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PopularCourses.css';
import { FaClock, FaBook } from 'react-icons/fa';
const computerIcon = '/images/Computer.svg';
const businessIcon = '/images/Business.svg';
const literatureIcon = '/images/Literature.svg';
const bookmarkAddIcon = '/images/bookmark_add.svg';

const PopularCourses = () => {
  const navigate = useNavigate();
  const courses = [
    {
      id: 1,
      title: 'CS 301 Software\nEngineering',
      description: 'Become a software engineering\nexpertise with our comprehensive\ncourse!',
      duration: '4-6 weeks',
      credits: '3 credits',
      price: '$399',
      seats: '22/50 seats filled',
      tags: ['Computer Science'],
      color: '#8B5CF6',
      icon: computerIcon
    },
    {
      id: 2,
      title: 'Philosophy 200 Principles\nof Philosophy',
      description: 'Covers foundational principles,\nfostering critical',
      duration: '4-6 weeks',
      credits: '3 credits',
      price: '$399',
      seats: '22/50 seats filled',
      tags: ['Gen Eds', 'Most Popular'],
      color: '#C084FC',
      icon: literatureIcon
    },
    {
      id: 3,
      title: 'MAR 102 Principles of Marketing',
      description: 'This course provides a profound\nunderstanding of ',
      duration: '4-6 weeks',
      credits: '3 credits',
      price: '$399',
      seats: '22/50 seats filled',
      tags: ['Gen Eds', 'Business'],
      color: '#FFA500',
      icon: businessIcon
    },
    {
      id: 4,
      title: 'CS 301 Software\nEngineering',
      description: 'Become a software engineering\nexpertise with our comprehensive\ncourse!',
      duration: '4-6 weeks',
      credits: '3 credits',
      price: '$399',
      seats: '22/50 seats filled',
      tags: ['Computer Science'],
      color: '#8B5CF6',
      icon: computerIcon
    },
    {
      id: 5,
      title: 'Philosophy 200 Principles\nof Philosophy',
      description: 'Covers foundational principles,\nfostering critical',
      duration: '4-6 weeks',
      credits: '3 credits',
      price: '$399',
      seats: '22/50 seats filled',
      tags: ['Gen Eds', 'Most Popular'],
      color: '#C084FC',
      icon: literatureIcon
    },
    {
      id: 6,
      title: 'MAR 101 Principles of Marketing',
      description: 'This course provides a profound\nunderstanding of',
      duration: '4-6 weeks',
      credits: '3 credits',
      price: '$399',
      seats: '22/50 seats filled',
      tags: ['Gen Eds', 'Business'],
      color: '#FFA500',
      icon: businessIcon
    }
  ];

  return (
    <section className="popular-courses">
      <div className="courses-container">
        <div className="courses-header">
          <h2>Our <span className="highlight">Popular Courses</span></h2>
          <button className="btn-view-all" onClick={() => navigate('/courses')}>View All Courses</button>
        </div>

        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <button className="course-bookmark" type="button" aria-label="Bookmark course">
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
                  <span className="course-price">{course.price}</span>
                  <span className="course-seats">{course.seats}</span>
                </div>
                <button className="btn-enroll" onClick={() => navigate('/enroll')}>
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
