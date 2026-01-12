import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PopularCourses.css';
import { FaClock, FaBook } from 'react-icons/fa';

const PopularCourses = () => {
  const navigate = useNavigate();
  const courses = [
    {
      id: 1,
      title: 'CS 101 Software Engineering',
      description: 'Learn the fundamentals of software development and programming.',
      duration: '4-6 weeks',
      credits: '3 credits',
      price: '$399',
      color: '#8B5CF6'
    },
    {
      id: 2,
      title: 'Philosophy 200 Principles of Philosophy',
      description: 'Explore the fundamental questions and ideas that shape philosophical thought.',
      duration: '4-6 weeks',
      credits: '3 credits',
      price: '$399',
      color: '#C084FC'
    },
    {
      id: 3,
      title: 'MAR 101 Principles of Marketing',
      description: 'Understand marketing strategies and consumer behavior.',
      duration: '4-6 weeks',
      credits: '3 credits',
      price: '$399',
      color: '#FFA500'
    },
    {
      id: 4,
      title: 'CS 101 Software Engineering',
      description: 'Learn the fundamentals of software development and programming.',
      duration: '4-6 weeks',
      credits: '3 credits',
      price: '$399',
      color: '#8B5CF6'
    },
    {
      id: 5,
      title: 'Philosophy 200 Principles of Philosophy',
      description: 'Explore the fundamental questions and ideas that shape philosophical thought.',
      duration: '4-6 weeks',
      credits: '3 credits',
      price: '$399',
      color: '#C084FC'
    },
    {
      id: 6,
      title: 'MAR 101 Principles of Marketing',
      description: 'Understand marketing strategies and consumer behavior.',
      duration: '4-6 weeks',
      credits: '3 credits',
      price: '$399',
      color: '#FFA500'
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
              <div className="course-icon" style={{ background: course.color }}>
                <FaBook size={28} color="white" />
              </div>

              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <div className="course-meta">
                <div className="meta-item">
                  <FaClock size={14} />
                  <span>{course.duration}</span>
                </div>
                <div className="meta-item">
                  <FaBook size={14} />
                  <span>{course.credits}</span>
                </div>
              </div>

              <div className="course-footer">
                <span className="course-price">{course.price}</span>
                <button className="btn-enroll">Enroll Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
