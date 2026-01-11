import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CourseLearningPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { enrolledCourses, user } = useAuth();
  
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [selectedModule, setSelectedModule] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Quiz states
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [quizScore, setQuizScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  
  // Find the course
  const course = enrolledCourses.find(c => c.id === parseInt(courseId));
  
  if (!course) {
    return (
      <div style={{ padding: '120px 20px', textAlign: 'center', minHeight: '70vh' }}>
        <h1>Course not found</h1>
        <button onClick={() => navigate('/my-courses')} style={{
          padding: '12px 24px',
          backgroundColor: '#ff6b35',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>
          Back to My Courses
        </button>
      </div>
    );
  }

  // Mock course content - will be replaced with backend data
  const courseContent = {
    modules: [
      {
        title: 'Module 1: Getting Started',
        duration: '45 min',
        lessons: [
          { title: 'Introduction to the Course', duration: '5:30', type: 'video', completed: false },
          { title: 'Course Overview and Objectives', duration: '8:15', type: 'video', completed: false },
          { title: 'Setting Up Your Environment', duration: '12:00', type: 'video', completed: false },
          { title: 'Module 1 Quiz', duration: '10 min', type: 'quiz', completed: false }
        ]
      },
      {
        title: 'Module 2: Core Concepts',
        duration: '1h 20min',
        lessons: [
          { title: 'Understanding the Fundamentals', duration: '15:30', type: 'video', completed: false },
          { title: 'Key Principles and Best Practices', duration: '18:45', type: 'video', completed: false },
          { title: 'Hands-on Exercise 1', duration: '20:00', type: 'assignment', completed: false },
          { title: 'Case Study Analysis', duration: '12:30', type: 'video', completed: false },
          { title: 'Module 2 Assessment', duration: '15 min', type: 'quiz', completed: false }
        ]
      },
      {
        title: 'Module 3: Advanced Topics',
        duration: '1h 45min',
        lessons: [
          { title: 'Advanced Techniques', duration: '22:00', type: 'video', completed: false },
          { title: 'Real-world Applications', duration: '25:30', type: 'video', completed: false },
          { title: 'Project Work', duration: '30:00', type: 'assignment', completed: false },
          { title: 'Expert Interview', duration: '15:00', type: 'video', completed: false },
          { title: 'Final Assessment', duration: '20 min', type: 'quiz', completed: false }
        ]
      }
    ]
  };

  const currentLesson = courseContent.modules[selectedModule]?.lessons[selectedLesson];
  const totalLessons = courseContent.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const currentLessonNumber = courseContent.modules.slice(0, selectedModule).reduce((acc, module) => acc + module.lessons.length, 0) + selectedLesson + 1;

  const handleNextLesson = () => {
    const currentModuleLessons = courseContent.modules[selectedModule].lessons.length;
    if (selectedLesson < currentModuleLessons - 1) {
      setSelectedLesson(selectedLesson + 1);
    } else if (selectedModule < courseContent.modules.length - 1) {
      setSelectedModule(selectedModule + 1);
      setSelectedLesson(0);
    }
    setIsPlaying(false);
  };

  const handlePrevLesson = () => {
    if (selectedLesson > 0) {
      setSelectedLesson(selectedLesson - 1);
    } else if (selectedModule > 0) {
      setSelectedModule(selectedModule - 1);
      setSelectedLesson(courseContent.modules[selectedModule - 1].lessons.length - 1);
    }
    setIsPlaying(false);
  };

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  // Mock quiz questions - will be replaced with backend data
  const quizQuestions = [
    {
      id: 1,
      question: 'What is the primary purpose of this course module?',
      options: [
        'To provide basic understanding of fundamental concepts',
        'To teach advanced programming techniques',
        'To prepare for certification exams',
        'To introduce software tools'
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: 'Which of the following best describes the learning approach used in this module?',
      options: [
        'Theoretical lectures only',
        'Hands-on practice with real-world examples',
        'Self-study with no guidance',
        'Group discussions exclusively'
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'What is the recommended way to apply the concepts learned?',
      options: [
        'Memorize all definitions',
        'Copy examples without understanding',
        'Practice with varied scenarios and understand underlying principles',
        'Skip practical exercises'
      ],
      correctAnswer: 2
    },
    {
      id: 4,
      question: 'How should you prepare for the next module?',
      options: [
        'Complete all current module exercises and review key concepts',
        'Jump directly to advanced topics',
        'Skip the assessment',
        'Only watch videos without practicing'
      ],
      correctAnswer: 0
    },
    {
      id: 5,
      question: 'What is the best strategy for retaining information from this course?',
      options: [
        'Passive watching of videos',
        'Active note-taking, practice, and regular review',
        'Relying solely on memory',
        'Rushing through content'
      ],
      correctAnswer: 1
    }
  ];

  const handleStartQuiz = () => {
    setIsQuizActive(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizScore(null);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quizQuestions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    setQuizScore(percentage);
    setQuizAttempts(quizAttempts + 1);
    setShowResults(true);
  };

  const handleRetakeQuiz = () => {
    if (quizAttempts < 3) {
      setIsQuizActive(true);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setShowResults(false);
      setQuizScore(null);
    }
  };

  const handleExitQuiz = () => {
    setIsQuizActive(false);
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
  };

  const handleContinueAfterQuiz = () => {
    handleExitQuiz();
    handleNextLesson();
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      {/* Top Navigation Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1c1d1f',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        borderBottom: '1px solid #2d2f31',
        height: '60px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            onClick={() => navigate('/my-courses')}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '5px 10px'
            }}
          >
            ←
          </button>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', color: 'white', fontWeight: '600' }}>
              {course.code}: {course.name}
            </h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#ccc' }}>
              Lesson {currentLessonNumber} of {totalLessons}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{
            backgroundColor: '#2d2f31',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '13px',
            color: '#ccc'
          }}>
            Progress: {course.progress}%
          </div>
          <button style={{
            padding: '8px 20px',
            backgroundColor: '#ff6b35',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            ⭐ Rate Course
          </button>
          {/* User Profile */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#ff6b35',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            border: '2px solid #2d2f31'
          }}
          title={user?.name || 'User'}
          onClick={() => navigate('/profile')}>
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', paddingTop: '60px', minHeight: 'calc(100vh - 60px)' }}>
        {/* Video Player Section */}
        <div style={{ flex: 1, backgroundColor: '#000' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            {/* Video Player */}
            <div style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              backgroundColor: '#000'
            }}>
              {isPlaying && currentLesson?.type === 'video' ? (
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Course Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : isQuizActive && currentLesson?.type === 'quiz' ? (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: '40px',
                  overflowY: 'auto',
                  color: 'white',
                  backgroundColor: '#000'
                }}>
                  {!showResults ? (
                    <>
                      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>Question {currentQuestionIndex + 1} of {quizQuestions.length}</h3>
                          <div style={{ color: '#ccc', fontSize: '14px' }}>Attempt {quizAttempts + 1} of 3</div>
                        </div>
                        <button
                          onClick={handleExitQuiz}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#2d2f31',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          Exit Quiz
                        </button>
                      </div>

                      <div style={{ backgroundColor: '#1c1d1f', borderRadius: '8px', padding: '30px', marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '22px', marginBottom: '30px', lineHeight: '1.4' }}>
                          {quizQuestions[currentQuestionIndex].question}
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                          {quizQuestions[currentQuestionIndex].options.map((option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleAnswerSelect(quizQuestions[currentQuestionIndex].id, idx)}
                              style={{
                                padding: '20px',
                                backgroundColor: selectedAnswers[quizQuestions[currentQuestionIndex].id] === idx ? '#ff6b35' : '#2d2f31',
                                color: 'white',
                                border: selectedAnswers[quizQuestions[currentQuestionIndex].id] === idx ? '2px solid #ff8c5a' : '2px solid transparent',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                textAlign: 'left',
                                transition: 'all 0.3s'
                              }}
                              onMouseEnter={(e) => {
                                if (selectedAnswers[quizQuestions[currentQuestionIndex].id] !== idx) {
                                  e.target.style.backgroundColor = '#3e4143';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (selectedAnswers[quizQuestions[currentQuestionIndex].id] !== idx) {
                                  e.target.style.backgroundColor = '#2d2f31';
                                }
                              }}
                            >
                              <span style={{ fontWeight: '600', marginRight: '10px' }}>
                                {String.fromCharCode(65 + idx)}.
                              </span>
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
                        <button
                          onClick={handlePrevQuestion}
                          disabled={currentQuestionIndex === 0}
                          style={{
                            padding: '12px 24px',
                            backgroundColor: currentQuestionIndex === 0 ? '#2d2f31' : '#3e4143',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}
                        >
                          ← Previous
                        </button>

                        {currentQuestionIndex === quizQuestions.length - 1 ? (
                          <button
                            onClick={handleSubmitQuiz}
                            disabled={Object.keys(selectedAnswers).length !== quizQuestions.length}
                            style={{
                              padding: '12px 32px',
                              backgroundColor: Object.keys(selectedAnswers).length === quizQuestions.length ? '#4caf50' : '#2d2f31',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: Object.keys(selectedAnswers).length === quizQuestions.length ? 'pointer' : 'not-allowed',
                              fontSize: '14px',
                              fontWeight: '600'
                            }}
                          >
                            Submit Quiz
                          </button>
                        ) : (
                          <button
                            onClick={handleNextQuestion}
                            style={{
                              padding: '12px 24px',
                              backgroundColor: '#ff6b35',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: '600'
                            }}
                          >
                            Next →
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '400px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '64px', marginBottom: '20px' }}>
                        {quizScore >= 70 ? '🎉' : quizScore >= 50 ? '📚' : '💪'}
                      </div>
                      <h2 style={{ fontSize: '32px', marginBottom: '10px' }}>
                        {quizScore >= 70 ? 'Great Job!' : quizScore >= 50 ? 'Good Effort!' : 'Keep Trying!'}
                      </h2>
                      <p style={{ fontSize: '48px', fontWeight: '700', color: '#ff6b35', marginBottom: '10px' }}>
                        {quizScore}%
                      </p>
                      <p style={{ fontSize: '18px', color: '#ccc', marginBottom: '30px' }}>
                        You answered {Math.round((quizScore / 100) * quizQuestions.length)} out of {quizQuestions.length} questions correctly
                      </p>
                      
                      <div style={{ marginBottom: '20px', color: '#ccc' }}>
                        Attempts used: {quizAttempts} of 3
                      </div>

                      <div style={{ display: 'flex', gap: '15px' }}>
                        {quizAttempts < 3 && quizScore < 70 && (
                          <button
                            onClick={handleRetakeQuiz}
                            style={{
                              padding: '12px 32px',
                              backgroundColor: '#ff6b35',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '16px',
                              fontWeight: '600'
                            }}
                          >
                            🔄 Retake Quiz ({3 - quizAttempts} attempts left)
                          </button>
                        )}
                        <button
                          onClick={quizScore >= 70 ? handleContinueAfterQuiz : handleExitQuiz}
                          style={{
                            padding: '12px 32px',
                            backgroundColor: quizScore >= 70 ? '#4caf50' : '#3e4143',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '600'
                          }}
                        >
                          {quizScore >= 70 ? '✓ Continue' : 'Exit Quiz'}
                        </button>
                      </div>

                      {quizAttempts >= 3 && quizScore < 70 && (
                        <p style={{ marginTop: '20px', color: '#ff6b35', fontSize: '14px' }}>
                          Maximum attempts reached. Please review the material and try again later.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>
                    {currentLesson?.type === 'video' ? '▶️' : currentLesson?.type === 'quiz' ? '📝' : '📄'}
                  </div>
                  <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{currentLesson?.title}</h2>
                  <p style={{ fontSize: '16px', color: '#ccc' }}>
                    {currentLesson?.type === 'video' ? `Video Duration: ${currentLesson?.duration}` : 
                     currentLesson?.type === 'quiz' ? `Time Limit: ${currentLesson?.duration}` :
                     `Estimated Time: ${currentLesson?.duration}`}
                  </p>
                  {currentLesson?.type === 'quiz' && quizAttempts > 0 && (
                    <p style={{ fontSize: '14px', color: '#ccc', marginTop: '10px' }}>
                      Previous score: {quizScore}% | Attempts: {quizAttempts}/3
                    </p>
                  )}
                  <button 
                    onClick={currentLesson?.type === 'quiz' ? handleStartQuiz : handlePlayVideo}
                    style={{
                      marginTop: '20px',
                      padding: '15px 40px',
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
                    {currentLesson?.type === 'video' ? '▶ Play Video' :
                     currentLesson?.type === 'quiz' ? 'Start Quiz' : 'Start Assignment'}
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
              <button
                onClick={handlePrevLesson}
                disabled={selectedModule === 0 && selectedLesson === 0}
                style={{
                  padding: '12px 24px',
                  backgroundColor: selectedModule === 0 && selectedLesson === 0 ? '#2d2f31' : '#3e4143',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: selectedModule === 0 && selectedLesson === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                ← Previous Lesson
              </button>
              <button
                onClick={handleNextLesson}
                disabled={selectedModule === courseContent.modules.length - 1 && 
                         selectedLesson === courseContent.modules[selectedModule].lessons.length - 1}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#ff6b35',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Next Lesson →
              </button>
            </div>

            {/* Tabs Section */}
            <div style={{ backgroundColor: '#1c1d1f', borderRadius: '8px', padding: '0' }}>
              {/* Tab Headers */}
              <div style={{
                display: 'flex',
                borderBottom: '1px solid #2d2f31',
                gap: '10px',
                padding: '0 20px'
              }}>
                {['overview', 'resources', 'notes'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '15px 20px',
                      backgroundColor: 'transparent',
                      color: activeTab === tab ? '#ff6b35' : '#ccc',
                      border: 'none',
                      borderBottom: activeTab === tab ? '3px solid #ff6b35' : '3px solid transparent',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ padding: '20px', color: 'white' }}>
                {activeTab === 'overview' && (
                  <div>
                    <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>About this lesson</h3>
                    <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '20px' }}>
                      This lesson covers the fundamental concepts and provides you with the knowledge needed
                      to understand {currentLesson?.title.toLowerCase()}. You'll learn key principles and see
                      practical examples that you can apply in real-world scenarios.
                    </p>
                    <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>Learning Objectives:</h4>
                    <ul style={{ color: '#ccc', lineHeight: '1.8', paddingLeft: '20px' }}>
                      <li>Understand the core concepts and terminology</li>
                      <li>Apply best practices in practical situations</li>
                      <li>Develop problem-solving skills in this area</li>
                      <li>Prepare for the module assessment</li>
                    </ul>
                  </div>
                )}
                {activeTab === 'resources' && (
                  <div>
                    <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>Downloadable Resources</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {['Lecture Slides (PDF)', 'Code Examples', 'Practice Exercises', 'Additional Reading'].map((resource, idx) => (
                        <div key={idx} style={{
                          padding: '15px',
                          backgroundColor: '#2d2f31',
                          borderRadius: '6px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '600' }}>📎 {resource}</div>
                            <div style={{ fontSize: '12px', color: '#ccc' }}>2.5 MB</div>
                          </div>
                          <button style={{
                            padding: '8px 16px',
                            backgroundColor: '#ff6b35',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}>
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'notes' && (
                  <div>
                    <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>My Notes</h3>
                    <textarea
                      placeholder="Take notes while learning..."
                      style={{
                        width: '100%',
                        minHeight: '200px',
                        padding: '15px',
                        backgroundColor: '#2d2f31',
                        color: 'white',
                        border: '1px solid #3e4143',
                        borderRadius: '6px',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                    <button style={{
                      marginTop: '10px',
                      padding: '10px 20px',
                      backgroundColor: '#ff6b35',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}>
                      Save Notes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum Sidebar */}
        <div style={{
          width: '380px',
          backgroundColor: '#1c1d1f',
          borderLeft: '1px solid #2d2f31',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 60px)'
        }}>
          <div style={{ padding: '20px' }}>
            <h3 style={{ color: 'white', marginBottom: '20px', fontSize: '18px' }}>Course Content</h3>
            
            {courseContent.modules.map((module, moduleIdx) => (
              <div key={moduleIdx} style={{ marginBottom: '15px' }}>
                <div style={{
                  padding: '12px',
                  backgroundColor: '#2d2f31',
                  borderRadius: '6px',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>{module.title}</div>
                      <div style={{ color: '#ccc', fontSize: '12px' }}>
                        {module.lessons.length} lessons • {module.duration}
                      </div>
                    </div>
                    <span style={{ color: '#ccc' }}>▼</span>
                  </div>
                </div>
                
                {module.lessons.map((lesson, lessonIdx) => (
                  <div
                    key={lessonIdx}
                    onClick={() => {
                      setSelectedModule(moduleIdx);
                      setIsPlaying(false);
                      setSelectedLesson(lessonIdx);
                    }}
                    style={{
                      padding: '12px 12px 12px 24px',
                      backgroundColor: selectedModule === moduleIdx && selectedLesson === lessonIdx ? '#3e4143' : 'transparent',
                      borderLeft: selectedModule === moduleIdx && selectedLesson === lessonIdx ? '3px solid #ff6b35' : '3px solid transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '2px'
                    }}
                    onMouseEnter={(e) => {
                      if (!(selectedModule === moduleIdx && selectedLesson === lessonIdx)) {
                        e.currentTarget.style.backgroundColor = '#2d2f31';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!(selectedModule === moduleIdx && selectedLesson === lessonIdx)) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ color: 'white', fontSize: '13px', marginBottom: '4px' }}>
                        {lesson.completed ? '✓ ' : ''}{lesson.title}
                      </div>
                      <div style={{ color: '#ccc', fontSize: '11px' }}>
                        {lesson.type === 'video' ? '▶' : lesson.type === 'quiz' ? '📝' : '📄'} {lesson.duration}
                      </div>
                    </div>
                    {lesson.completed && (
                      <span style={{ color: '#4caf50', fontSize: '16px' }}>✓</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearningPage;
