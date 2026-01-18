import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

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

  // Load user and enrolled courses from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
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

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setEnrolledCourses([]);
    setCartItems([]);
    localStorage.removeItem('user');
    localStorage.removeItem('enrolledCourses');
    localStorage.removeItem('cartItems');
  };

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

  const addToCart = (course) => {
    const exists = cartItems.some((item) => item.id === course.id);
    if (exists) return false;

    const updatedCart = [...cartItems, course];
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    return true;
  };

  const removeFromCart = (courseId) => {
    const updatedCart = cartItems.filter((item) => item.id !== courseId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
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
      removeFromCart
    }}>
      {children}
    </AuthContext.Provider>
  );
};
