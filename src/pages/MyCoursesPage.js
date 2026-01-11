import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const MyCoursesPage = () => {
  const { isAuthenticated, enrolledCourses } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="page-content" style={{ padding: '120px 20px', textAlign: 'center', minHeight: '70vh' }}>
        <h1 style={{ marginBottom: '20px' }}>Please sign in to view your courses</h1>
        <button 
          onClick={() => navigate('/signin')}
          style={{
            padding: '14px 32px',
            backgroundColor: '#ff6b35',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Sign In
        </button>
      </div>
    );
  }

  // Get completion statistics
  const completedCourses = enrolledCourses.filter(c => c.status === 'Completed').length;
  const inProgressCourses = enrolledCourses.filter(c => c.status === 'In Progress').length;
  const totalProgress = enrolledCourses.length > 0 
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
    : 0;

  return (
    <div className="page-content" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>My Courses</h1>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>
            Track your learning progress and continue where you left off
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#ff6b35', marginBottom: '8px' }}>
              {enrolledCourses.length}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Total Enrolled</div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#4CAF50', marginBottom: '8px' }}>
              {completedCourses}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Completed</div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#2196F3', marginBottom: '8px' }}>
              {inProgressCourses}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>In Progress</div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '25px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#9c27b0', marginBottom: '8px' }}>
              {totalProgress}%
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>Avg. Progress</div>
          </div>
        </div>

        {/* Empty State or Courses List */}
        {enrolledCourses.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '60px 30px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            textAlign: 'center',
            marginTop: '40px'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>📚</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>No Courses Yet</h2>
            <p style={{ fontSize: '1rem', color: '#666', marginBottom: '25px' }}>
              Start your learning journey by enrolling in a course
            </p>
            <button
              onClick={() => navigate('/courses')}
              style={{
                padding: '14px 32px',
                backgroundColor: '#ff6b35',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#ff5722'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6b35'}
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {enrolledCourses.map(course => (
            <div key={course.id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '30px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: course.status === 'Completed' ? '#e8f5e9' : '#fff3e0',
                    color: course.status === 'Completed' ? '#4CAF50' : '#ff9800',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '12px'
                  }}>
                    {course.status}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#333' }}>
                    {course.code}: {course.name}
                  </h3>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                    👨‍🏫 {course.instructor}
                  </div>
                  <div style={{ fontSize: '14px', color: '#999' }}>
                    📅 Enrolled: {course.enrolledDate}
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate(`/course/${course.id}/learn`)}
                  style={{
                  padding: '12px 28px',
                  backgroundColor: '#ff6b35',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#ff5722'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6b35'}>
                  {course.status === 'Completed' ? 'View Certificate' : 'Continue Learning'}
                </button>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '15px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  <span>Progress</span>
                  <span style={{ fontWeight: '600', color: '#333' }}>{course.progress}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${course.progress}%`,
                    height: '100%',
                    backgroundColor: course.status === 'Completed' ? '#4CAF50' : '#ff6b35',
                    transition: 'width 0.3s'
                  }}></div>
                </div>
              </div>

              {/* Next Lesson */}
              <div style={{
                padding: '15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#666'
              }}>
                <strong style={{ color: '#333' }}>Next:</strong> {course.nextLesson}
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Browse More Courses */}
        <div style={{
          textAlign: 'center',
          marginTop: '50px',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>
            Want to learn more?
          </h3>
          <p style={{ color: '#666', marginBottom: '25px' }}>
            Explore our catalog of 100+ courses
          </p>
          <button 
            onClick={() => navigate('/courses')}
            style={{
              padding: '14px 32px',
              backgroundColor: '#ff6b35',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#ff5722'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6b35'}
          >
            Browse All Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesPage;
