// API Base URL
export const API_BASE_URL = 'https://gnh3rb7x-2994.inc1.devtunnels.ms/oc-be/api/v1';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    SIGNIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
    
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  },
  COURSES: {
    LIST: `${API_BASE_URL}/courses`,
    DETAILS: (id) => `${API_BASE_URL}/courses/${id}`,
    ENROLL: (id) => `${API_BASE_URL}/courses/${id}/enroll`,
    PROGRESS: (id) => `${API_BASE_URL}/courses/${id}/progress`,
  },
  USER: {
    PROFILE: `${API_BASE_URL}/user/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/user/profile/update`,
    MY_COURSES: `${API_BASE_URL}/user/my-courses`,
  },
  PAYMENT: {
    CREATE_ORDER: `${API_BASE_URL}/payment/create-order`,
    VERIFY_PAYMENT: `${API_BASE_URL}/payment/verify`,
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
