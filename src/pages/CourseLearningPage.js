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
  const [openModuleIndex, setOpenModuleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('notes');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProgressMenuOpen, setIsProgressMenuOpen] = useState(false);
  const [autoPlayCountdown, setAutoPlayCountdown] = useState(null);
  const [autoPlayTarget, setAutoPlayTarget] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [noteId, setNoteId] = useState(null);
  const [noteStatus, setNoteStatus] = useState('');
  const [noteError, setNoteError] = useState('');
  
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
  const hasCachedProgress = useMemo(() => {
    if (!courseId) return false;
    const raw = localStorage.getItem(`oc_lesson_progress_${courseId}`);
    if (!raw) return false;
    try {
      const parsed = JSON.parse(raw);
      return Boolean(parsed && Object.keys(parsed).length > 0);
    } catch (error) {
      return false;
    }
  }, [courseId]);

  const hasCachedLastCompleted = useMemo(() => {
    if (!courseId) return false;
    return Boolean(localStorage.getItem(`oc_last_completed_${courseId}`));
  }, [courseId]);

  const shouldResume = Boolean(location.state?.resume || hasCachedProgress || hasCachedLastCompleted);
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
  const [lessonCompleted, setLessonCompleted] = useState({});
  const [resumeApplied, setResumeApplied] = useState(false);
  const [resumeLessonsReady, setResumeLessonsReady] = useState(false);
  const [resumeProgressReady, setResumeProgressReady] = useState(false);
  const [streamUrl, setStreamUrl] = useState('');
  const [isStreamLoading, setIsStreamLoading] = useState(false);
  const [lessonDurations, setLessonDurations] = useState({});
  const lastProgressSentRef = useRef(0);
  const lastPositionRef = useRef(0);
  const isUpdatingProgressRef = useRef(false);
  const autoPlayTimeoutRef = useRef(null);
  const autoPlayIntervalRef = useRef(null);
  const resumePrefetchRef = useRef(false);
  const resumeProgressRef = useRef({});
  const resumeCompletedRef = useRef({});
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const progressMenuRef = useRef(null);

  useEffect(() => {
    resumePrefetchRef.current = false;
    resumeProgressRef.current = {};
    resumeCompletedRef.current = {};
    setResumeApplied(false);
    setResumeLessonsReady(false);
    setResumeProgressReady(false);
  }, [courseId]);

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

  const getCachedLastCompleted = () => {
    if (!courseId) return null;
    const raw = localStorage.getItem(`oc_last_completed_${courseId}`);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      const moduleIndex = Number(parsed?.moduleIndex);
      const lessonIndex = Number(parsed?.lessonIndex);
      if (!Number.isInteger(moduleIndex) || !Number.isInteger(lessonIndex)) return null;
      return { moduleIndex, lessonIndex };
    } catch (error) {
      return null;
    }
  };

  const setCachedLastCompleted = (moduleIndex, lessonIndex) => {
    if (!courseId) return;
    if (!Number.isInteger(moduleIndex) || !Number.isInteger(lessonIndex)) return;
    try {
      localStorage.setItem(
        `oc_last_completed_${courseId}`,
        JSON.stringify({ moduleIndex, lessonIndex, updatedAt: Date.now() })
      );
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

  useEffect(() => {
    if (!shouldResume || chapters.length === 0) return;
    if (resumePrefetchRef.current) return;
    resumePrefetchRef.current = true;

    let isMounted = true;

    const fetchAllLessonsForResume = async () => {
      const updates = {};

      await Promise.all(
        chapters.map(async (chapter) => {
          const chapterId = chapter?.id;
          if (!chapterId) return;
          if (lessonsByChapter[chapterId]) return;

          const cached = sessionStorage.getItem(`oc_chapter_lessons_${chapterId}`);
          if (cached) {
            try {
              const parsed = JSON.parse(cached);
              if (Array.isArray(parsed)) {
                updates[chapterId] = parsed;
                return;
              }
            } catch (error) {
              // Ignore bad cache; fall through to fetch.
            }
          }

          try {
            const response = await apiService.get(API_ENDPOINTS.LESSONS.BY_CHAPTER(chapterId));
            const payload = response?.payload || response?.data || response;
            const fetchedLessons = Array.isArray(payload) ? payload : payload?.lessons || [];
            updates[chapterId] = fetchedLessons;
            sessionStorage.setItem(`oc_chapter_lessons_${chapterId}`, JSON.stringify(fetchedLessons));
          } catch (error) {
            // Ignore individual chapter failures.
          }
        })
      );

      if (!isMounted) return;
      if (Object.keys(updates).length > 0) {
        setLessonsByChapter((prev) => ({ ...prev, ...updates }));
      }
      setResumeLessonsReady(true);
    };

    fetchAllLessonsForResume();

    return () => {
      isMounted = false;
    };
  }, [shouldResume, chapters]);

  useEffect(() => {
    if (!shouldResume) {
      setResumeLessonsReady(true);
    }
  }, [shouldResume]);

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
    if (!shouldResume || !resumeLessonsReady) return;
    let isMounted = true;

    const fetchAllLessonProgressForResume = async () => {
      const progressUpdates = {};
      const completedUpdates = {};

      const lessons = courseContent.modules.flatMap((module) => module.lessons || []);
      if (lessons.length === 0) {
        setResumeProgressReady(true);
        return;
      }

      await Promise.all(
        lessons.map(async (lesson) => {
          const lessonId = lesson?.id;
          if (!lessonId) return;
          const existingProgress = lessonProgress[lessonId];
          const existingCompleted = lessonCompleted[lessonId];
          if (existingCompleted || (Number.isFinite(existingProgress) && existingProgress >= 98)) return;

          const cachedProgress = getCachedLessonProgress(lessonId);
          try {
            const response = await apiService.get(API_ENDPOINTS.PROGRESS.LESSON(lessonId));
            const progressValue = normalizeProgressValue(response);
            const completedValue = normalizeCompletedValue(response);
            const resolvedProgress = Math.max(progressValue, cachedProgress ?? 0, completedValue ? 100 : 0);
            progressUpdates[lessonId] = resolvedProgress;
            if (resolvedProgress > 0) {
              setCachedLessonProgress(lessonId, resolvedProgress);
            }
            if (completedValue || resolvedProgress >= 98) {
              completedUpdates[lessonId] = true;
            }
          } catch (error) {
            if (cachedProgress !== undefined) {
              progressUpdates[lessonId] = cachedProgress;
              if (cachedProgress >= 98) {
                completedUpdates[lessonId] = true;
              }
            }
          }
        })
      );

      if (!isMounted) return;
      if (Object.keys(progressUpdates).length > 0) {
        resumeProgressRef.current = { ...resumeProgressRef.current, ...progressUpdates };
        setLessonProgress((prev) => ({ ...prev, ...progressUpdates }));
      }
      if (Object.keys(completedUpdates).length > 0) {
        resumeCompletedRef.current = { ...resumeCompletedRef.current, ...completedUpdates };
        setLessonCompleted((prev) => ({ ...prev, ...completedUpdates }));
      }
      setResumeProgressReady(true);
    };

    fetchAllLessonProgressForResume();

    return () => {
      isMounted = false;
    };
  }, [shouldResume, resumeLessonsReady, courseContent.modules, lessonProgress, lessonCompleted]);

  useEffect(() => {
    if (courseContent.modules.length === 0) return;
    const progressUpdates = {};
    const completedUpdates = {};

    courseContent.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        if (!lesson?.id) return;
        if (lessonProgress[lesson.id] !== undefined) return;
        const cachedProgress = getCachedLessonProgress(lesson.id);
        if (cachedProgress === undefined) return;
        progressUpdates[lesson.id] = cachedProgress;
        if (cachedProgress >= 98) {
          completedUpdates[lesson.id] = true;
        }
      });
    });

    if (Object.keys(progressUpdates).length > 0) {
      setLessonProgress((prev) => ({ ...prev, ...progressUpdates }));
    }
    if (Object.keys(completedUpdates).length > 0) {
      setLessonCompleted((prev) => ({ ...prev, ...completedUpdates }));
    }
  }, [courseContent.modules, lessonProgress, lessonCompleted]);

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

  useEffect(() => {
    if (!shouldResume || resumeApplied || !resumeLessonsReady || !resumeProgressReady) return;
    if (courseContent.modules.length === 0) return;

    let foundModuleIndex = null;
    let foundLessonIndex = null;
    const mergedProgress = { ...resumeProgressRef.current, ...lessonProgress };
    const mergedCompleted = { ...resumeCompletedRef.current, ...lessonCompleted };

    courseContent.modules.some((module, moduleIdx) => {
      return module.lessons.some((lesson, lessonIdx) => {
        const cachedProgress = getCachedLessonProgress(lesson.id) ?? 0;
        const trackedProgress = mergedProgress[lesson.id];
        const effectiveProgress = Math.max(
          cachedProgress,
          Number.isFinite(trackedProgress) ? trackedProgress : 0
        );
        const isDone =
          effectiveProgress >= 98 ||
          mergedCompleted[lesson.id] ||
          lesson.completed;
        if (!isDone) {
          foundModuleIndex = moduleIdx;
          foundLessonIndex = lessonIdx;
          return true;
        }
        return false;
      });
    });

    if (foundModuleIndex !== null && foundLessonIndex !== null) {
      const lastCompleted = getCachedLastCompleted();
      if (lastCompleted) {
        const nextFromLast = getNextLessonPositionFrom(lastCompleted.moduleIndex, lastCompleted.lessonIndex);
        const foundIndex = getLinearLessonIndex(foundModuleIndex, foundLessonIndex);
        const nextIndex = nextFromLast
          ? getLinearLessonIndex(nextFromLast.moduleIndex, nextFromLast.lessonIndex)
          : null;
        if (nextFromLast && nextIndex !== null && foundIndex !== null && nextIndex > foundIndex) {
          foundModuleIndex = nextFromLast.moduleIndex;
          foundLessonIndex = nextFromLast.lessonIndex;
        }
      }
    }

    if (foundModuleIndex !== null && foundLessonIndex !== null) {
      setSelectedModule(foundModuleIndex);
      setSelectedLesson(foundLessonIndex);
      setOpenModuleIndex(foundModuleIndex);
    }

    setResumeApplied(true);
  }, [shouldResume, resumeApplied, courseContent.modules, lessonCompleted, lessonProgress]);

  const currentLesson = courseContent.modules[selectedModule]?.lessons[selectedLesson];
  const totalLessons = courseContent.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = useMemo(() => {
    return courseContent.modules.reduce((acc, module) => {
      const completedInModule = module.lessons.filter((lesson) => {
        const progressValue = lessonProgress[lesson.id];
        return (progressValue ?? 0) >= 98 || lesson.completed;
      }).length;
      return acc + completedInModule;
    }, 0);
  }, [courseContent.modules, lessonProgress]);
  const currentLessonNumber = courseContent.modules
    .slice(0, selectedModule)
    .reduce((acc, module) => acc + module.lessons.length, 0) + selectedLesson + 1;
  const AUTO_PLAY_DELAY_SECONDS = 10;

  useEffect(() => {
    let isMounted = true;
    const lessonId = currentLesson?.id;

    const loadNotes = async () => {
      if (!lessonId) {
        setNoteText('');
        setNoteId(null);
        setNoteError('');
        setNoteStatus('');
        return;
      }

      setNoteStatus('loading');
      setNoteError('');

      try {
        const response = await apiService.get(API_ENDPOINTS.NOTES.BY_LESSON(lessonId));
        if (!isMounted) return;
        const note = resolveNoteFromResponse(response);
        setNoteText(note?.note_text ?? note?.noteText ?? '');
        setNoteId(note?.id ?? note?.note_id ?? note?._id ?? null);
      } catch (error) {
        if (!isMounted) return;
        setNoteText('');
        setNoteId(null);
        setNoteError('Unable to load notes.');
      } finally {
        if (isMounted) {
          setNoteStatus('');
        }
      }
    };

    loadNotes();

    return () => {
      isMounted = false;
    };
  }, [currentLesson?.id]);

  const handleSaveNote = async () => {
    const lessonId = currentLesson?.id;
    if (!lessonId || noteStatus === 'saving') return;
    setNoteStatus('saving');
    setNoteError('');
    try {
      const payload = { note_text: noteText };
      const response = noteId
        ? await apiService.put(API_ENDPOINTS.NOTES.UPDATE(noteId), payload)
        : await apiService.post(API_ENDPOINTS.NOTES.BY_LESSON(lessonId), payload);
      const savedNote = resolveNoteFromResponse(response);
      setNoteId(savedNote?.id ?? savedNote?.note_id ?? savedNote?._id ?? noteId ?? null);
      setNoteStatus('saved');
      setTimeout(() => setNoteStatus(''), 2000);
    } catch (error) {
      setNoteStatus('');
      setNoteError('Unable to save notes.');
    }
  };

  const isLessonComplete = (lessonId, lessonCompletedFlag, lessonCompletedValue) => {
    const cachedProgress = getCachedLessonProgress(lessonId) ?? 0;
    const trackedProgress = lessonProgress[lessonId];
    const effectiveProgress = Math.max(
      cachedProgress,
      Number.isFinite(trackedProgress) ? trackedProgress : 0
    );
    return (
      effectiveProgress >= 98 ||
      lessonCompletedFlag ||
      lessonCompletedValue
    );
  };

  const isChapterComplete = (chapterIndex) => {
    const module = courseContent.modules[chapterIndex];
    if (!module || module.lessons.length === 0) return false;
    return module.lessons.every((lesson) =>
      isLessonComplete(lesson.id, lessonCompleted[lesson.id], lesson.completed)
    );
  };

  const isChapterLocked = (chapterIndex) => {
    if (chapterIndex <= 0) return false;
    return !isChapterComplete(0);
  };

  const clearAutoPlayTimers = () => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  };

  const clearAutoPlay = () => {
    clearAutoPlayTimers();
    setAutoPlayCountdown(null);
    setAutoPlayTarget(null);
  };

  const resolveNoteFromResponse = (response) => {
    const payload = response?.payload || response?.data || response;
    const candidateArray = Array.isArray(payload)
      ? payload
      : payload?.notes || payload?.data || payload?.payload || [];
    if (Array.isArray(candidateArray) && candidateArray.length > 0) {
      return candidateArray[0];
    }
    if (payload?.note) return payload.note;
    if (payload?.note_text || payload?.noteText) return payload;
    return null;
  };

  const getNextLessonPosition = () => {
    const currentModuleLessons = courseContent.modules[selectedModule]?.lessons.length || 0;
    if (selectedLesson < currentModuleLessons - 1) {
      return { moduleIndex: selectedModule, lessonIndex: selectedLesson + 1 };
    }
    if (selectedModule < courseContent.modules.length - 1) {
      return { moduleIndex: selectedModule + 1, lessonIndex: 0 };
    }
    return null;
  };

  const getLinearLessonIndex = (moduleIndex, lessonIndex) => {
    if (moduleIndex === null || lessonIndex === null) return null;
    let offset = 0;
    for (let i = 0; i < courseContent.modules.length; i += 1) {
      if (i === moduleIndex) return offset + lessonIndex;
      offset += courseContent.modules[i].lessons.length;
    }
    return null;
  };

  const getNextLessonPositionFrom = (moduleIndex, lessonIndex) => {
    const currentModuleLessons = courseContent.modules[moduleIndex]?.lessons.length || 0;
    if (lessonIndex < currentModuleLessons - 1) {
      return { moduleIndex, lessonIndex: lessonIndex + 1 };
    }
    if (moduleIndex < courseContent.modules.length - 1) {
      return { moduleIndex: moduleIndex + 1, lessonIndex: 0 };
    }
    return null;
  };

  const scheduleAutoPlayNext = () => {
    const nextPosition = getNextLessonPosition();
    if (!nextPosition) return;
    const nextLesson = courseContent.modules[nextPosition.moduleIndex]?.lessons[nextPosition.lessonIndex];
    if (!nextLesson) return;

    clearAutoPlay();
    setAutoPlayTarget({ ...nextPosition, lesson: nextLesson });
    setAutoPlayCountdown(AUTO_PLAY_DELAY_SECONDS);

    autoPlayIntervalRef.current = setInterval(() => {
      setAutoPlayCountdown((prev) => {
        if (prev === null) return null;
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    autoPlayTimeoutRef.current = setTimeout(() => {
      setSelectedModule(nextPosition.moduleIndex);
      setSelectedLesson(nextPosition.lessonIndex);
      setOpenModuleIndex(nextPosition.moduleIndex);
      setIsPlaying(nextLesson.type === 'video');
      clearAutoPlay();
    }, AUTO_PLAY_DELAY_SECONDS * 1000);
  };

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

  useEffect(() => {
    if (!isProgressMenuOpen) return;
    const handleOutsideClick = (event) => {
      if (!progressMenuRef.current) return;
      if (!progressMenuRef.current.contains(event.target)) {
        setIsProgressMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isProgressMenuOpen]);

  const normalizeProgressValue = (response) => {
    const payload = response?.payload ?? response?.data ?? response ?? {};
    const progressPayload = payload.progress ?? payload?.data?.progress ?? payload;
    const rawValue =
      progressPayload?.progress_percent ??
      progressPayload?.completed_percentage ??
      progressPayload?.percentage ??
      payload.progress_percent ??
      payload.completed_percentage ??
      payload.completedPercent ??
      progressPayload ??
      0;
    const numeric = Number(rawValue);
    return Number.isFinite(numeric) ? numeric : 0;
  };

  const normalizeCompletedValue = (response) => {
    const payload = response?.payload ?? response?.data ?? response ?? {};
    const progressPayload = payload.progress ?? payload?.data?.progress ?? payload;
    const rawValue =
      progressPayload?.completed ??
      payload.completed ??
      payload.is_completed ??
      payload.isCompleted ??
      false;
    return Boolean(rawValue);
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
        const completedValue = normalizeCompletedValue(response);
        const resolvedProgress = Math.max(progressValue, cachedProgress ?? 0, completedValue ? 100 : 0);
        setLessonProgress((prev) => ({ ...prev, [lessonId]: resolvedProgress }));
        if (resolvedProgress > 0) {
          setCachedLessonProgress(lessonId, resolvedProgress);
        }
        if (completedValue) {
          setLessonCompleted((prev) => ({ ...prev, [lessonId]: true }));
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

  useEffect(() => {
    return () => {
      clearAutoPlayTimers();
    };
  }, []);

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
    clearAutoPlay();
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
    clearAutoPlay();
    if (selectedLesson > 0) {
      setSelectedLesson(selectedLesson - 1);
    } else if (selectedModule > 0) {
      setSelectedModule(selectedModule - 1);
      setSelectedLesson(courseContent.modules[selectedModule - 1].lessons.length - 1);
    }
    setIsPlaying(false);
  };

  const handlePlayVideo = () => {
    clearAutoPlay();
    setIsPlaying(true);
  };

  const parseDurationSeconds = (value) => {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      const lowered = trimmed.toLowerCase();
      if (trimmed.includes(':')) {
        const parts = value.split(':').map((part) => Number(part));
        if (parts.some((part) => Number.isNaN(part))) return null;
        if (parts.length === 3) {
          return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        if (parts.length === 2) {
          return parts[0] * 60 + parts[1];
        }
      }
      const hoursMatch = lowered.match(/(\d+)\s*h/);
      const minsMatch = lowered.match(/(\d+)\s*m(in)?/);
      const secsMatch = lowered.match(/(\d+)\s*s(ec)?/);
      if (hoursMatch || minsMatch || secsMatch) {
        const hours = hoursMatch ? Number(hoursMatch[1]) : 0;
        const mins = minsMatch ? Number(minsMatch[1]) : 0;
        const secs = secsMatch ? Number(secsMatch[1]) : 0;
        if ([hours, mins, secs].some((part) => Number.isNaN(part))) return null;
        return hours * 3600 + mins * 60 + secs;
      }
      const numeric = Number(trimmed);
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

  const getDurationLabel = (lesson) => {
    if (!lesson) return '';
    const raw = lessonDurations[lesson.id] ?? lesson.duration ?? lesson.estimated_duration ?? '';
    const formatted = formatDuration(raw);
    if (formatted) return formatted;
    if (typeof raw === 'string') return raw;
    return '';
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
    if (percent >= 98) {
      setLessonCompleted((prev) => ({ ...prev, [lessonId]: true }));
      setCachedLastCompleted(selectedModule, selectedLesson);
    }
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
    setLessonCompleted((prev) => ({ ...prev, [lessonId]: true }));
    setCachedLastCompleted(selectedModule, selectedLesson);
    sendLessonProgress({
      lessonId,
      positionSeconds: duration,
      percent: 100,
      completed: true
    });
    scheduleAutoPlayNext();
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
          <div style={{ position: 'relative' }} ref={progressMenuRef}>
            <button
              type="button"
              onClick={() => setIsProgressMenuOpen((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#2d2f31',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#ccc',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: '1px solid #4a4d50',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d0d3d6',
                fontSize: '14px'
              }}>
                🏆
              </span>
              <span style={{ color: '#e6e7e8', fontWeight: 500 }}>Your progress</span>
              <span style={{ color: '#9aa0a6' }}>{course.progress}%</span>
              <span style={{ color: '#7f8489' }}>{isProgressMenuOpen ? '⌃' : '⌄'}</span>
            </button>
            {isProgressMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '42px',
                right: 0,
                backgroundColor: '#1f2124',
                border: '1px solid #2c2f33',
                borderRadius: '10px',
                padding: '14px 16px',
                minWidth: '280px',
                boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
                zIndex: 50
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '18px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#1f2124',
                  borderLeft: '1px solid #2c2f33',
                  borderTop: '1px solid #2c2f33',
                  transform: 'rotate(45deg)'
                }} />
                <div style={{ color: '#e6e7e8', fontWeight: 600, marginBottom: '6px' }}>
                  {completedLessons} of {totalLessons} complete.
                </div>
                <div style={{ color: '#9aa0a6', fontSize: '12px' }}>
                  Finish course to get your certificate
                </div>
              </div>
            )}
          </div>
          
          
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
          title={user?.name || user?.email || ''}
          onClick={() => navigate('/profile')}>
            {(user?.name || user?.email || '').charAt(0).toUpperCase()}
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
                          lessonDurations[currentLesson?.id] ??
                          currentLesson?.estimated_duration ??
                          currentLesson?.duration
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
              {autoPlayCountdown !== null && autoPlayTarget?.lesson && (
                <div style={{
                  position: 'absolute',
                  right: '20px',
                  bottom: '20px',
                  backgroundColor: 'rgba(20, 21, 23, 0.92)',
                  border: '1px solid #2d2f31',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  maxWidth: '280px',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.4)'
                }}>
                  <div style={{ fontSize: '12px', color: '#9aa0a6', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    Auto play next lesson
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>
                    {autoPlayTarget.lesson.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#ccc' }}>
                    <span>Starting in {autoPlayCountdown}s</span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: '#ff6b35',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 700
                    }}>
                      ▶
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => {
                        clearAutoPlay();
                        setSelectedModule(autoPlayTarget.moduleIndex);
                        setSelectedLesson(autoPlayTarget.lessonIndex);
                        setOpenModuleIndex(autoPlayTarget.moduleIndex);
                        setIsPlaying(autoPlayTarget.lesson.type === 'video');
                      }}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: '#ff6b35',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      Play now
                    </button>
                    <button
                      onClick={clearAutoPlay}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: '#2d2f31',
                        color: 'white',
                        border: '1px solid #3e4143',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 600
                      }}
                    >
                      Cancel
                    </button>
                  </div>
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
                {['notes'].map(tab => (
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
                {activeTab === 'notes' && (
                  <div>
                    <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>My Notes</h3>
                    <textarea
                      placeholder="Take notes while learning..."
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      data-grammarly="false"
                      data-enable-grammarly="false"
                      spellCheck={false}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                      <button
                        onClick={handleSaveNote}
                        disabled={!currentLesson?.id || noteStatus === 'saving'}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#ff6b35',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '14px',
                          cursor: noteStatus === 'saving' || !currentLesson?.id ? 'not-allowed' : 'pointer',
                          opacity: noteStatus === 'saving' || !currentLesson?.id ? 0.7 : 1
                        }}
                      >
                        {noteStatus === 'saving' ? 'Saving...' : 'Save Notes'}
                      </button>
                      {noteStatus === 'saved' && (
                        <span style={{ color: '#9c7dff', fontSize: '13px' }}>Saved</span>
                      )}
                      {noteStatus === 'loading' && (
                        <span style={{ color: '#ccc', fontSize: '13px' }}>Loading...</span>
                      )}
                      {noteError && (
                        <span style={{ color: '#ff6b35', fontSize: '13px' }}>{noteError}</span>
                      )}
                    </div>
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
                    cursor: isChapterLocked(moduleIdx) ? 'not-allowed' : 'pointer',
                    opacity: isChapterLocked(moduleIdx) ? 0.6 : 1
                  }}
                  onClick={() => {
                    if (isChapterLocked(moduleIdx)) return;
                    clearAutoPlay();
                    setOpenModuleIndex((prev) => (prev === moduleIdx ? -1 : moduleIdx));
                    if (openModuleIndex !== moduleIdx) {
                      setSelectedModule(moduleIdx);
                      setSelectedLesson(0);
                      setIsPlaying(false);
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>{module.title}</div>
                      <div style={{ color: '#ccc', fontSize: '12px' }}>
                        {module.lessons.length} lessons ? {formatDuration(module.duration) || module.duration}
                      </div>
                    </div>
                    <span style={{ color: '#ccc' }}>{openModuleIndex === moduleIdx ? '⌃' : '⌄'}</span>
                  </div>
                </div>
                
                {openModuleIndex === moduleIdx && (
                  <>
                    {loadingLessonsId === module.id && (
                      <div style={{ color: '#ccc', fontSize: '12px', padding: '8px 0 8px 8px' }}>
                        Loading lessons...
                      </div>
                    )}
                    {module.lessons.map((lesson, lessonIdx) => {
                  const progressValue = lessonProgress[lesson.id];
                  const isCompleted = lessonCompleted[lesson.id] || progressValue >= 98 || lesson.completed;
                  return (
                    <div
                      key={lesson.id || lessonIdx}
                      onClick={() => {
                        if (isChapterLocked(moduleIdx)) return;
                        clearAutoPlay();
                        setSelectedModule(moduleIdx);
                        setIsPlaying(false);
                        setSelectedLesson(lessonIdx);
                      }}
                      style={{
                        padding: '12px 12px 12px 24px',
                        backgroundColor: selectedModule === moduleIdx && selectedLesson === lessonIdx ? '#3e4143' : 'transparent',
                        borderLeft: selectedModule === moduleIdx && selectedLesson === lessonIdx ? '3px solid #ff6b35' : '3px solid transparent',
                        cursor: isChapterLocked(moduleIdx) ? 'not-allowed' : 'pointer',
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
                      <div style={{ flex: 1, display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '3px',
                          border: isCompleted ? '1px solid #9c7dff' : '1px solid #5a5f63',
                          backgroundColor: isCompleted ? '#9c7dff' : 'transparent',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          lineHeight: 1,
                          marginTop: '2px',
                          flexShrink: 0
                        }}>
                          {isCompleted ? '✓' : ''}
                        </div>
                        <div>
                          <div style={{ color: 'white', fontSize: '13px', marginBottom: '4px' }}>
                            {lesson.title}
                          </div>
                          <div style={{ color: '#ccc', fontSize: '11px' }}>
                            {lesson.type === 'video' ? 'Video' : lesson.type === 'quiz' ? 'Quiz' : 'Lesson'} {getDurationLabel(lesson)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                  </>
                )}              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearningPage;
