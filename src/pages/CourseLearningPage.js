import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';
import authService from '../services/authService';
import { API_ENDPOINTS } from '../config/constants';
import Hls from 'hls.js';

const CourseLearningPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
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
  
  const storedChapters = sessionStorage.getItem(`oc_course_chapters_${courseId}`);
  const initialChapters = location.state?.chapters || (storedChapters ? JSON.parse(storedChapters) : []);
  const initialLessons = location.state?.lessons || [];
  const initialChapterId = location.state?.chapterId || initialLessons?.[0]?.chapter_id;
  const storedLessons = initialChapterId
    ? sessionStorage.getItem(`oc_chapter_lessons_${initialChapterId}`)
    : null;
  const initialLessonsFromStorage = storedLessons ? JSON.parse(storedLessons) : [];

  const [chapters, setChapters] = useState(initialChapters);
  const [lessonsByChapter, setLessonsByChapter] = useState(() => {
    if (initialChapterId && Array.isArray(initialLessons) && initialLessons.length > 0) {
      return { [initialChapterId]: initialLessons };
    }
    if (initialChapterId && Array.isArray(initialLessonsFromStorage) && initialLessonsFromStorage.length > 0) {
      return { [initialChapterId]: initialLessonsFromStorage };
    }
    return {};
  });
  const [loadingLessonsId, setLoadingLessonsId] = useState('');
  const [courseError, setCourseError] = useState('');
  const [lessonProgress, setLessonProgress] = useState({});
  const [lessonProgressFetched, setLessonProgressFetched] = useState({});
  const [streamUrl, setStreamUrl] = useState('');
  const [isStreamLoading, setIsStreamLoading] = useState(false);
  const [lessonDurations, setLessonDurations] = useState({});
  const lastProgressSentRef = useRef(0);
  const lastPositionRef = useRef(0);
  const isUpdatingProgressRef = useRef(false);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  // Find the course
  const course = enrolledCourses.find((c) => String(c.id ?? c.course_id ?? c._id) === String(courseId));

  const formatTitle = (title) => {
    if (!title) return '';
    return title
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getCachedLessonProgress = (lessonId) => {
    if (!lessonId || !courseId) return undefined;
    const raw = localStorage.getItem(`oc_lesson_progress_${courseId}`);
    if (!raw) return undefined;
    try {
      const parsed = JSON.parse(raw);
      const value = parsed?.[lessonId];
      const numeric = Number(value);
      return Number.isFinite(numeric) ? numeric : undefined;
    } catch (error) {
      return undefined;
    }
  };

  const setCachedLessonProgress = (lessonId, value) => {
    if (!lessonId || !courseId) return;
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return;
    const key = `oc_lesson_progress_${courseId}`;
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : {};
      const next = { ...parsed, [lessonId]: Math.round(numeric) };
      localStorage.setItem(key, JSON.stringify(next));
    } catch (error) {
      // Ignore cache writes that fail (storage full, invalid JSON, etc).
    }
  };

  useEffect(() => {
    const fetchChapters = async () => {
      if (!courseId || chapters.length > 0) return;
      setCourseError('');
      try {
        const response = await apiService.get(API_ENDPOINTS.CHAPTERS.BY_COURSE(courseId));
        const payload = response?.payload || response?.data || response;
        const fetchedChapters = Array.isArray(payload) ? payload : payload?.chapters || [];
        setChapters(fetchedChapters);
        sessionStorage.setItem(`oc_course_chapters_${courseId}`, JSON.stringify(fetchedChapters));
      } catch (error) {
        setCourseError('Unable to load chapters.');
      }
    };

    fetchChapters();
  }, [courseId, chapters.length]);

  const fetchLessonsForChapter = async (chapterId) => {
    if (!chapterId || lessonsByChapter[chapterId] || loadingLessonsId === chapterId) return;
    setLoadingLessonsId(chapterId);
    setCourseError('');
    try {
      const response = await apiService.get(API_ENDPOINTS.LESSONS.BY_CHAPTER(chapterId));
      const payload = response?.payload || response?.data || response;
      const fetchedLessons = Array.isArray(payload) ? payload : payload?.lessons || [];
      setLessonsByChapter((prev) => ({ ...prev, [chapterId]: fetchedLessons }));
      sessionStorage.setItem(`oc_chapter_lessons_${chapterId}`, JSON.stringify(fetchedLessons));
    } catch (error) {
      setCourseError('Unable to load lessons.');
    } finally {
      setLoadingLessonsId('');
    }
  };

  useEffect(() => {
    const activeChapterId = chapters[selectedModule]?.id;
    if (activeChapterId) {
      fetchLessonsForChapter(activeChapterId);
    }
  }, [chapters, selectedModule]);

  const courseContent = useMemo(() => ({
    modules: chapters.map((chapter) => ({
      id: chapter.id,
      title: formatTitle(chapter.title || chapter.name || 'Module'),
      duration: chapter.estimated_duration || '',
      lessons: (lessonsByChapter[chapter.id] || []).map((lesson) => ({
        ...lesson,
        title: formatTitle(lesson.title),
        duration: lesson.estimated_duration || ''
      }))
    }))
  }), [chapters, lessonsByChapter]);

  useEffect(() => {
    if (courseContent.modules.length === 0) return;
    if (selectedModule >= courseContent.modules.length) {
      setSelectedModule(0);
      setSelectedLesson(0);
      return;
    }
    const lessonCount = courseContent.modules[selectedModule]?.lessons.length || 0;
    if (lessonCount > 0 && selectedLesson >= lessonCount) {
      setSelectedLesson(0);
    }
  }, [courseContent.modules, selectedModule, selectedLesson]);

  const currentLesson = courseContent.modules[selectedModule]?.lessons[selectedLesson];
  const totalLessons = courseContent.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const currentLessonNumber = courseContent.modules
    .slice(0, selectedModule)
    .reduce((acc, module) => acc + module.lessons.length, 0) + selectedLesson + 1;

  useEffect(() => {
    const lessonId = currentLesson?.id;
    const shouldStream = currentLesson?.type === 'video' && lessonId;
    if (!shouldStream) {
      if (streamUrl) {
        URL.revokeObjectURL(streamUrl);
        setStreamUrl('');
      }
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const fetchStream = async () => {
      setIsStreamLoading(true);
      try {
        const token = authService.getAccessToken();
        const response = await fetch(API_ENDPOINTS.LESSONS.STREAM(lessonId), {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Stream request failed');
        }
        const contentType = response.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
          const data = await response.json();
          const payload = data?.payload ?? data?.data ?? data ?? {};
          const url = payload.manifest_url || payload.stream_url || payload.url || payload.link;
          if (!url) {
            throw new Error('Stream URL missing');
          }
          if (!isMounted) return;
          if (streamUrl) {
            URL.revokeObjectURL(streamUrl);
          }
          setStreamUrl(url);
          return;
        }

        const blob = await response.blob();
        if (!isMounted) return;
        const objectUrl = URL.createObjectURL(blob);
        if (streamUrl && streamUrl.startsWith('blob:')) {
          URL.revokeObjectURL(streamUrl);
        }
        setStreamUrl(objectUrl);
      } catch (error) {
        if (isMounted) {
          setStreamUrl('');
        }
      } finally {
        if (isMounted) {
          setIsStreamLoading(false);
        }
      }
    };

    fetchStream();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [currentLesson?.id, currentLesson?.type]);

  useEffect(() => {
    if (!isPlaying) return;
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    const isHls = streamUrl.includes('.m3u8');
    const canPlayHls = video.canPlayType('application/vnd.apple.mpegurl');

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (isHls && !canPlayHls && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
      hlsRef.current = hls;
    } else {
      video.src = streamUrl;
      video.play().catch(() => {});
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [streamUrl, isPlaying]);

  const normalizeProgressValue = (response) => {
    const payload = response?.payload ?? response?.data ?? response ?? {};
    const rawValue =
      payload.progress ??
      payload.percentage ??
      payload.progress_percent ??
      payload.completed_percentage ??
      payload.completedPercent ??
      0;
    const numeric = Number(rawValue);
    return Number.isFinite(numeric) ? numeric : 0;
  };

  useEffect(() => {
    const lessonId = currentLesson?.id;
    if (!lessonId || lessonProgressFetched[lessonId]) return;

    const cachedProgress = getCachedLessonProgress(lessonId);
    if (cachedProgress !== undefined && lessonProgress[lessonId] === undefined) {
      setLessonProgress((prev) => ({ ...prev, [lessonId]: cachedProgress }));
    }

    const fetchLessonProgress = async () => {
      try {
        const response = await apiService.get(API_ENDPOINTS.PROGRESS.LESSON(lessonId));
        const progressValue = normalizeProgressValue(response);
        const resolvedProgress = Math.max(progressValue, cachedProgress ?? 0);
        setLessonProgress((prev) => ({ ...prev, [lessonId]: resolvedProgress }));
        if (resolvedProgress > 0) {
          setCachedLessonProgress(lessonId, resolvedProgress);
        }
      } catch (error) {
        if (cachedProgress !== undefined) {
          setLessonProgress((prev) => ({ ...prev, [lessonId]: cachedProgress }));
        } else {
          setLessonProgress((prev) => ({ ...prev, [lessonId]: 0 }));
        }
      } finally {
        setLessonProgressFetched((prev) => ({ ...prev, [lessonId]: true }));
      }
    };

    fetchLessonProgress();
  }, [currentLesson, lessonProgress, lessonProgressFetched, courseId]);

  useEffect(() => {
    lastProgressSentRef.current = 0;
    lastPositionRef.current = 0;
  }, [currentLesson?.id]);

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

  const parseDurationSeconds = (value) => {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string') {
      if (value.includes(':')) {
        const parts = value.split(':').map((part) => Number(part));
        if (parts.some((part) => Number.isNaN(part))) return null;
        if (parts.length === 3) {
          return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        if (parts.length === 2) {
          return parts[0] * 60 + parts[1];
        }
      }
      const numeric = Number(value);
      return Number.isFinite(numeric) ? numeric : null;
    }
    return null;
  };

  const formatDuration = (value) => {
    const seconds = parseDurationSeconds(value);
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const handleMetadataLoaded = (event) => {
    const lessonId = currentLesson?.id;
    if (!lessonId) return;
    const duration = event.target.duration;
    if (!Number.isFinite(duration)) return;
    setLessonDurations((prev) => ({ ...prev, [lessonId]: duration }));
  };

  const sendLessonProgress = async ({ lessonId, positionSeconds, percent, completed }) => {
    if (!lessonId) return;
    if (isUpdatingProgressRef.current) return;
    isUpdatingProgressRef.current = true;
    try {
      await apiService.put(API_ENDPOINTS.PROGRESS.UPDATE_LESSON(lessonId), {
        last_position_seconds: Math.round(positionSeconds),
        progress_percent: Math.min(100, Math.max(0, Math.round(percent))),
        completed: Boolean(completed)
      });
    } catch (error) {
      // No-op: avoid blocking playback on progress update failures.
    } finally {
      isUpdatingProgressRef.current = false;
    }
  };

  const handleVideoProgress = (event) => {
    const lessonId = currentLesson?.id;
    if (!lessonId) return;
    const currentTime = event.target.currentTime || 0;
    const duration = event.target.duration || 0;
    if (!duration) return;

    const now = Date.now();
    const percent = (currentTime / duration) * 100;

    if (now - lastProgressSentRef.current < 8000) {
      lastPositionRef.current = currentTime;
      return;
    }

    lastProgressSentRef.current = now;
    lastPositionRef.current = currentTime;
    setLessonProgress((prev) => ({ ...prev, [lessonId]: Math.round(percent) }));
    setCachedLessonProgress(lessonId, percent);
    sendLessonProgress({
      lessonId,
      positionSeconds: currentTime,
      percent,
      completed: percent >= 98
    });
  };

  const handleVideoEnded = (event) => {
    const lessonId = currentLesson?.id;
    if (!lessonId) return;
    const duration = event.target.duration || lastPositionRef.current || 0;
    setLessonProgress((prev) => ({ ...prev, [lessonId]: 100 }));
    setCachedLessonProgress(lessonId, 100);
    sendLessonProgress({
      lessonId,
      positionSeconds: duration,
      percent: 100,
      completed: true
    });
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
          {currentLesson?.id && lessonProgress[currentLesson.id] !== undefined && (
            <div style={{
              backgroundColor: '#2d2f31',
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '13px',
              color: '#ccc'
            }}>
              Lesson: {lessonProgress[currentLesson.id]}%
            </div>
          )}
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
            {courseError && (
              <div style={{ color: '#ff8c5a', marginBottom: '12px', fontSize: '13px' }}>
                {courseError}
              </div>
            )}
            {/* Video Player */}
            <div style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              backgroundColor: '#000'
            }}>
              {isPlaying && currentLesson?.type === 'video' && (streamUrl || currentLesson?.source_url) ? (
                <video
                  ref={videoRef}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                  controls
                  autoPlay
                  onTimeUpdate={handleVideoProgress}
                  onEnded={handleVideoEnded}
                  onLoadedMetadata={handleMetadataLoaded}
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
                  <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{formatTitle(currentLesson?.title)}</h2>
                  <p style={{ fontSize: '16px', color: '#ccc' }}>
                    {currentLesson?.type === 'video'
                      ? `Video Duration: ${formatDuration(
                          lessonDurations[currentLesson?.id] ?? currentLesson?.estimated_duration
                        ) || 'N/A'}`
                      : currentLesson?.type === 'quiz'
                        ? `Time Limit: ${currentLesson?.duration}`
                        : `Estimated Time: ${currentLesson?.duration}`}
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
                      cursor: isStreamLoading ? 'not-allowed' : 'pointer',
                      opacity: isStreamLoading ? 0.7 : 1
                    }}
                    disabled={isStreamLoading && currentLesson?.type === 'video'}
                    onMouseEnter={(e) => {
                      if (!isStreamLoading) e.target.style.backgroundColor = '#ff5722';
                    }}
                    onMouseLeave={(e) => {
                      if (!isStreamLoading) e.target.style.backgroundColor = '#ff6b35';
                    }}
                  >
                    {currentLesson?.type === 'video'
                      ? isStreamLoading ? 'Loading video...' : '▶ Play Video'
                      : currentLesson?.type === 'quiz'
                        ? 'Start Quiz'
                        : 'Start Assignment'}
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
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: '#2d2f31',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setSelectedModule(moduleIdx);
                    setSelectedLesson(0);
                    setIsPlaying(false);
                  }}
                >
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
                
                {loadingLessonsId === module.id && (
                  <div style={{ color: '#ccc', fontSize: '12px', padding: '8px 0 8px 8px' }}>
                    Loading lessons...
                  </div>
                )}
                {module.lessons.map((lesson, lessonIdx) => {
                  const progressValue = lessonProgress[lesson.id];
                  const isCompleted = progressValue >= 98 || lesson.completed;
                  return (
                    <div
                      key={lesson.id || lessonIdx}
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
                          {isCompleted ? '✓ ' : ''}{lesson.title}
                        </div>
                        <div style={{ color: '#ccc', fontSize: '11px' }}>
                          {lesson.type === 'video' ? '▶' : lesson.type === 'quiz' ? '📝' : '📄'} {lesson.duration}
                        </div>
                      </div>
                      {isCompleted && (
                        <span style={{ color: '#4caf50', fontSize: '16px' }}>✓</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearningPage;
