import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import apiService from '../services/apiService';
import authService from '../services/authService';
import { API_ENDPOINTS } from '../config/constants';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Load user and enrolled courses from storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }

    const storedCourses = localStorage.getItem('enrolledCourses');
    if (storedCourses) {
      setEnrolledCourses(JSON.parse(storedCourses));
    }

    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const login = (userData, options = {}) => {
    setIsAuthenticated(true);
    setUser(userData);
    if (options.remember) {
      localStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.removeItem('user');
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData));
      localStorage.removeItem('user');
    }
  };

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    setEnrolledCourses([]);
    setCartItems([]);
    authService.clearAuthData();
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    localStorage.removeItem('enrolledCourses');
    localStorage.removeItem('cartItems');
  }, []);

  // Register session-expired callback so apiService can trigger logout
  useEffect(() => {
    apiService.onSessionExpired(() => {
      logout();
      window.location.href = '/signin';
    });
  }, [logout]);

  // Validate session on app load — if token exists, verify it's still valid
  useEffect(() => {
    const token = authService.getAccessToken();
    if (token && isAuthenticated) {
      authService.getProfile().catch(() => {
        // Token invalid — try refresh, else logout
        authService.refreshToken().catch(() => {
          logout();
        });
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  const register = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const enrollCourse = (course) => {
    const enrolledCourse = {
      ...course,
      enrolledDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      progress: 0,
      status: 'In Progress',
      nextLesson: 'Module 1: Getting Started'
    };
    
    const updatedCourses = [...enrolledCourses, enrolledCourse];
    setEnrolledCourses(updatedCourses);
    localStorage.setItem('enrolledCourses', JSON.stringify(updatedCourses));
  };

  const setEnrolledCoursesData = useCallback((courses) => {
    setEnrolledCourses(courses);
    localStorage.setItem('enrolledCourses', JSON.stringify(courses));
  }, []);

  // Fetch cart from API
  const fetchCart = useCallback(async () => {
    try {
      const response = await apiService.get(API_ENDPOINTS.CART.LIST);
      const payload = response?.payload || response?.data || response;
      const items = Array.isArray(payload)
        ? payload
        : payload?.items || payload?.cart_items || payload?.cart || [];
      const normalized = items.map((item) => {
        const course = item.course || item;
        const rawName = course.name || '';
        const [codePart, ...nameParts] = rawName.split(':');
        const hasCode = rawName.includes(':');
        return {
          id: course.id || item.course_id,
          cart_item_id: item.id,
          code: hasCode ? codePart.trim() : '',
          name: hasCode ? nameParts.join(':').trim() : rawName,
          description: course.description || '',
          price: Number(String(course.price ?? 0).replace(/[^0-9.]/g, '')),
          subject: course.subject_area || course.subject || '',
        };
      });
      setCartItems(normalized);
      localStorage.setItem('cartItems', JSON.stringify(normalized));
    } catch {
      // Keep local cart on API failure
    }
  }, []);

  // Fetch cart when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const addToCart = async (course) => {
    const exists = cartItems.some((item) => item.id === course.id);
    if (exists) return false;

    // Optimistic update
    const updatedCart = [...cartItems, course];
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    try {
      await apiService.post(API_ENDPOINTS.CART.ADD, { course_id: course.id });
      // Re-fetch to get server-assigned cart_item_id
      fetchCart();
    } catch {
      // Revert on failure
      setCartItems(cartItems);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return false;
    }
    return true;
  };

  const removeFromCart = async (courseId) => {
    const updatedCart = cartItems.filter((i) => i.id !== courseId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    try {
      await apiService.delete(API_ENDPOINTS.CART.REMOVE, {
        body: JSON.stringify({ course_id: courseId }),
      });
    } catch {
      // Revert on failure
      setCartItems(cartItems);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      register,
      enrolledCourses,
      enrollCourse,
      setEnrolledCoursesData,
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      fetchCart
    }}>
      {children}
    </AuthContext.Provider>
  );
};
