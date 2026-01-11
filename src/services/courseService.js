import { API_ENDPOINTS } from '../config/constants';
import apiService from './apiService';

/**
 * Course Service
 * Handles all course-related API calls
 */

class CourseService {
  /**
   * Get list of courses with optional filters
   * @param {Object} params - Query parameters
   * @param {string} [params.search] - Course name search
   * @param {string} [params.subject_area] - Subject filter
   * @param {string} [params.credential_type] - Credential type filter
   * @param {boolean} [params.is_active] - Active status filter
   * @param {number} [params.page] - Page number (starts from 0)
   * @param {number} [params.limit] - Items per page
   * @returns {Promise<Object>} Response with courses array and total count
   */
  async getCourses(params = {}) {
    try {
      // Build query string from parameters
      const queryParams = new URLSearchParams();
      
      if (params.search) queryParams.append('search', params.search);
      if (params.subject_area) queryParams.append('subject_area', params.subject_area);
      if (params.credential_type) queryParams.append('credential_type', params.credential_type);
      if (params.is_active !== undefined) queryParams.append('is_active', params.is_active);
      if (params.page !== undefined) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);

      const queryString = queryParams.toString();
      const url = queryString ? `${API_ENDPOINTS.COURSES.LIST}?${queryString}` : API_ENDPOINTS.COURSES.LIST;

      const response = await apiService.get(url);

      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch courses');
      }

      return response.payload;
    } catch (error) {
      console.error('Get courses error:', error);
      throw error;
    }
  }

  /**
   * Get course details by ID
   * @param {string} courseId - Course ID
   * @returns {Promise<Object>} Course details
   */
  async getCourseById(courseId) {
    try {
      const response = await apiService.get(API_ENDPOINTS.COURSES.DETAILS(courseId));

      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch course details');
      }

      return response.payload.course;
    } catch (error) {
      console.error('Get course details error:', error);
      throw error;
    }
  }

  /**
   * Enroll in a course
   * @param {string} courseId - Course ID
   * @returns {Promise<Object>} Enrollment response
   */
  async enrollInCourse(courseId) {
    try {
      const response = await apiService.post(API_ENDPOINTS.COURSES.ENROLL(courseId));

      if (!response.success) {
        throw new Error(response.message || 'Failed to enroll in course');
      }

      return response.payload;
    } catch (error) {
      console.error('Enroll in course error:', error);
      throw error;
    }
  }

  /**
   * Update course progress
   * @param {string} courseId - Course ID
   * @param {Object} progressData - Progress data
   * @returns {Promise<Object>} Updated progress
   */
  async updateProgress(courseId, progressData) {
    try {
      const response = await apiService.post(API_ENDPOINTS.COURSES.PROGRESS(courseId), progressData);

      if (!response.success) {
        throw new Error(response.message || 'Failed to update progress');
      }

      return response.payload;
    } catch (error) {
      console.error('Update progress error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new CourseService();
