// API Base URL
export const API_BASE_URL = 'https://gnh3rb7x-2994.inc1.devtunnels.ms/oc-be/api/v1';

// Toggle mock mode when backend is unavailable
export const USE_MOCK_API = false;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    SIGNIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
    
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
    VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
    PROFILE: `${API_BASE_URL}/auth/profile`,
  },
  COURSES: {
    LIST: `${API_BASE_URL}/courses`,
    DETAILS: (id) => `${API_BASE_URL}/courses/${id}`,
    ENROLL: (id) => `${API_BASE_URL}/courses/${id}/enroll`,
    PROGRESS: (id) => `${API_BASE_URL}/courses/${id}/progress`,
  },
  ENROLLMENTS: {
    COURSES: `${API_BASE_URL}/enrollments/courses`,
  },
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/user/profile`,
    MY_COURSES: `${API_BASE_URL}/user/my-courses`,
  },
  PAYMENT: {
    CREATE_ORDER: `${API_BASE_URL}/payment/create-order`,
    VERIFY_PAYMENT: `${API_BASE_URL}/payment/verify`,
    INTENT: `${API_BASE_URL}/payments/intent`,
  },
  CHAT: {
    SEND: `${API_BASE_URL}/chat/`,
  },
  PROGRESS: {
    LESSON: (lessonId) => `${API_BASE_URL}/progress/lessons/${lessonId}`,
    UPDATE_LESSON: (lessonId) => `${API_BASE_URL}/progress/lessons/${lessonId}`,
  },
  CHAPTERS: {
    BY_COURSE: (courseId) => `${API_BASE_URL}/chapters/course/${courseId}`,
  },
  LESSONS: {
    BY_CHAPTER: (chapterId) => `${API_BASE_URL}/lessons/chapter/${chapterId}`,
    STREAM: (lessonId) => `${API_BASE_URL}/lessons/${lessonId}/stream`,
  },
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'oc_access_token',
  REFRESH_TOKEN: 'oc_refresh_token',
  USER_DATA: 'oc_user_data',
  ENROLLED_COURSES: 'oc_enrolled_courses',
};

// App Constants
export const APP_CONSTANTS = {
  APP_NAME: 'OpenCredits',
  MAX_LOGIN_ATTEMPTS: 3,
  SESSION_TIMEOUT: 3600000, // 1 hour in milliseconds
  PASSWORD_MIN_LENGTH: 8,
};

export const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Sln0kErzX6mrLC5FbCPrFjMHcx3h9N9X6igcopKQeHpmLBpGqhGNNDYscvfHmjVBqNhQqvQEhS14V5UjCbyGsuU008K9gZgY8';
