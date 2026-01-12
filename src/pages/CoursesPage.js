import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import courseService from '../services/courseService';
import '../App.css';

const CoursesPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [authenticated, setAuthenticated] = useState('All');
  const [subject, setSubject] = useState('All');
  const [accepted, setAccepted] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  const coursesData = [
    { id: 1, code: 'BUS 230', name: 'Project Management', desc: 'Project Management Essentials certificate provides students wit...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: '📊', color: '#ff9800', credits: 'ACE Credits, CSU (Cal-State)', subject: 'Business', auth: 'NCCRS' },
    { id: 2, code: 'BUS 250', name: 'Business Law (ACE)', desc: 'This certificate provides business leaders with an...', price: 250, tags: ['NCCRS Courses', 'Gen Eds'], icon: '⚖️', color: '#ff9800', credits: 'ACE Courses, Business', subject: 'Business', auth: 'ACE' },
    { id: 3, code: 'BUS 300', name: 'International Business', desc: "You'll expand thinking internationally trade, global...", price: 250, tags: ['NCCRS Courses', 'Business'], icon: '🌍', color: '#ff9800', credits: 'ACE Courses, Business', subject: 'Business', auth: 'ACE' },
    { id: 4, code: 'BUS 306', name: 'Human Resources Management', desc: 'Explore the strategic side of human resources with this engaging introduc...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: '👥', color: '#ff9800', credits: 'ACE Courses, Business', subject: 'Business', auth: 'ACE' },
    { id: 5, code: 'BUS 309', name: 'Globalization & International Management', desc: "You'll explore how businesses adapt and succeed...", price: 250, tags: ['NCCRS Courses', 'Business'], icon: '🌐', color: '#ff9800', credits: 'NCCRS Courses, Business', subject: 'Business', auth: 'NCCRS' },
    { id: 6, code: 'BUS 310', name: 'Entrepreneurship', desc: 'Entrepreneurship Essentials helps you turn an idea into...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: '💡', color: '#ff9800', credits: 'NCCRS Courses, Business, ACE Credits and Budding', subject: 'Business', auth: 'NCCRS' },
    { id: 7, code: 'ACC 210', name: 'Managerial Accounting', desc: 'Learn core managerial accounting concepts, interpret financial stateme...', price: 250, tags: ['NCCRS Courses', 'NCCRS Courses'], icon: '💼', color: '#ff9800', credits: 'ACE Courses, Business', subject: 'Business', auth: 'ACE' },
    { id: 8, code: 'BUS 100', name: 'Business Essentials', desc: 'Students will understand core economic concepts, interpret economic...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: '📈', color: '#ff9800', credits: 'NCCRS Courses, Business', subject: 'Business', auth: 'NCCRS' },
    { id: 9, code: 'BUS 101', name: 'Principles of Management', desc: 'This course is designed to help students understand the...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: '📋', color: '#ff9800', credits: 'Free Skill and Budding', subject: 'Business', auth: 'NCCRS' },
    { id: 10, code: 'BUS 205', name: 'Foundations of Leadership', desc: 'An interactive, blended learning course for leaders at every...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: '👔', color: '#ff9800', credits: 'Free Skill and Budding', subject: 'Business', auth: 'NCCRS' },
    { id: 11, code: 'BUS 206', name: 'Leadership & Organizational Behaviour', desc: 'Leadership and Organizational Behaviour (LEAD250) applies...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: '📊', color: '#ff9800', credits: 'Free Skill and Budding', subject: 'Business', auth: 'NCCRS' },
    { id: 12, code: 'BUS 210', name: 'Business Communication', desc: 'This course will teach you how to teach effective communication...', price: 250, tags: ['NCCRS Courses', 'Business'], icon: '💬', color: '#ff9800', credits: 'NCCRS Courses, Business', subject: 'Business', auth: 'NCCRS' },
    { id: 13, code: 'PSY 111', name: 'Research Methods in Psychology', desc: 'Learn survey methods, research ethics, and the...', price: 250, tags: ['NCCRS Courses', 'Healthcare'], icon: '🧠', color: '#9c27b0', credits: 'Psychology', subject: 'Healthcare', auth: 'NCCRS' },
    { id: 14, code: 'PSY 112', name: 'Psychology of Diversity', desc: 'This course is a great option for students interested...', price: 250, tags: ['NCCRS Courses', 'Healthcare'], icon: '🧠', color: '#9c27b0', credits: 'Psychology, Humanities', subject: 'Healthcare', auth: 'NCCRS' },
    { id: 15, code: 'BIO 100', name: 'Introduction to Biology 1', desc: 'The course aims to elucidate and apply the foundational...', price: 250, tags: ['Science', 'NCCRS Courses'], icon: '🔬', color: '#4caf50', credits: 'ACE Courses, Most Popular', subject: 'Science', auth: 'ACE' },
    { id: 16, code: 'CHEM 111', name: 'Chemistry I', desc: 'The course aims to impart a thorough...', price: 250, tags: ['NCCRS Courses', 'Science'], icon: '⚗️', color: '#795548', credits: 'ACE Courses, College Prep', subject: 'Science', auth: 'ACE' },
    { id: 17, code: 'MATH 100', name: 'Business Math', desc: 'The course objective is to introduce and teach you...', price: 250, tags: ['NCCRS Courses', 'Math'], icon: '🔢', color: '#00bcd4', credits: 'College Prep, Math', subject: 'Math', auth: 'NCCRS' },
    { id: 18, code: 'CS 210', name: 'Introduction to Java', desc: 'Learn programming in Java and OOC++ with Artificial...', price: 250, tags: ['NCCRS Courses', 'Computer Science'], icon: '💻', color: '#673ab7', credits: 'Computer Science', subject: 'Computer Science', auth: 'NCCRS' },
  ];

  const [courses, setCourses] = useState(coursesData);

  const normalizeCourse = (course) => {
    const tags = Array.isArray(course.tags) ? course.tags : [];
    if (!tags.length) {
      if (course.credential_type) tags.push(course.credential_type);
      if (course.subject_area) tags.push(course.subject_area);
    }

    return {
      id: course.id ?? course.course_id ?? course._id ?? course.slug ?? course.code ?? course.name,
      code: course.code ?? course.course_code ?? '',
      name: course.name ?? course.title ?? '',
      desc: course.description ?? course.desc ?? '',
      price: Number(course.price ?? course.cost ?? 0),
      tags,
      icon: course.icon ?? 'C',
      color: course.color ?? '#ff9800',
      credits: course.credits ?? course.credit_info ?? '',
      subject: course.subject ?? course.subject_area ?? '',
      auth: course.auth ?? (course.ace_certified ? 'ACE' : course.nccrs_certified ? 'NCCRS' : '')
    };
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      setLoading(true);
      setLoadError('');

      try {
        const params = {
          search: searchQuery || undefined,
          subject_area: subject !== 'All' && subject !== 'Subject' ? subject : undefined,
          is_active: true,
          page: 0,
          limit: 50
        };

        const payload = await courseService.getCourses(params);
        const items = Array.isArray(payload) ? payload : payload?.courses || payload?.data || [];

        if (isMounted) {
          const normalized = items.map(normalizeCourse);
          setCourses(normalized);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError('Failed to load courses. Please try again.');
          setCourses(coursesData);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, [searchQuery, subject, authenticated]);

  // Filter courses based on all criteria
  const filteredCourses = courses.filter(course => {
    // Search filter
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Authentication filter (ACE/NCCRS)
    const matchesAuth = authenticated === 'All' || authenticated === 'Authenticated by' || course.auth === authenticated;
    
    // Subject filter
    const matchesSubject = subject === 'All' || subject === 'Subject' || course.subject === subject;
    
    return matchesSearch && matchesAuth && matchesSubject;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return (Number(a.price) || 0) - (Number(b.price) || 0);
    if (sortBy === 'Price: High to Low') return (Number(b.price) || 0) - (Number(a.price) || 0);
    if (sortBy === 'Name A-Z') return (a.name || '').localeCompare(b.name || '');
    return 0; // Featured - default order
  });

  const handleEnrollClick = (course) => {
    if (!isAuthenticated) {
      // Redirect to sign in if not authenticated
      navigate('/signin', { state: { from: '/payment', course } });
    } else {
      // Navigate to payment page with course details
      navigate('/payment', { state: { course } });
    }
  };

  return (
    <div className="page-content" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Header */}
        <h1 style={{ fontSize: '2rem', marginBottom: '30px', color: '#333' }}>Find Courses</h1>
        
        {/* Search and Filters */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '8px', 
          marginBottom: '30px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search Courses, subjects and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 40px 12px 16px',
                fontSize: '15px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                outline: 'none'
              }}
            />
            <span style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>🔍</span>
          </div>

          {/* Filters */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '15px',
            alignItems: 'center'
          }}>
            <select 
              value={authenticated}
              onChange={(e) => setAuthenticated(e.target.value)}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
            >
              <option value="All">Authenticated by</option>
              <option value="ACE">ACE</option>
              <option value="NCCRS">NCCRS</option>
            </select>

            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
            >
              <option value="All">All Subjects</option>
              <option value="Business">Business</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Math">Math</option>
              <option value="Science">Science</option>
            </select>

            <select 
              value={accepted}
              onChange={(e) => setAccepted(e.target.value)}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
            >
              <option value="All">All Universities</option>
            </select>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
            >
              <option value="Featured">Featured</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Name A-Z">Name A-Z</option>
            </select>
          </div>
        </div>
        {loadError && (
          <div style={{ marginBottom: '20px', color: '#d32f2f', fontSize: '14px' }}>
            {loadError}
          </div>
        )}

        {/* Course Grid */}
        {loading ? (
          <div style={{ fontSize: '14px', color: '#666' }}>Loading courses...</div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '25px' 
          }}>
          {sortedCourses.map(course => (
            <div key={course.id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}>
              {/* Icon */}
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: course.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                marginBottom: '15px'
              }}>
                {course.icon}
              </div>

              {/* Bookmark Icon */}
              <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }}>📑</div>

              {/* Course Title */}
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                {course.code}: {course.name}
              </h3>

              {/* Description */}
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px', lineHeight: '1.5', minHeight: '60px' }}>
                {course.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
                {(course.tags || []).map((tag, idx) => (
                  <span key={idx} style={{
                    padding: '4px 10px',
                    backgroundColor: '#fff5f0',
                    color: '#ff6b35',
                    fontSize: '12px',
                    borderRadius: '4px',
                    border: '1px solid #ffe0d5'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Credits */}
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px', minHeight: '40px' }}>
                {course.credits}
              </p>

              {/* Price and Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #f0f0f0' }}>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#ff6b35' }}>${course.price}</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>12345 seats filled</div>
                </div>
                <button style={{
                  padding: '12px 24px',
                  backgroundColor: '#ff6b35',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onClick={() => handleEnrollClick(course)}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#ff5722'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ff6b35'}>
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
