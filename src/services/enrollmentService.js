import { API_ENDPOINTS } from '../config/constants';
import apiService from './apiService';

class EnrollmentService {
  async getEnrolledCourses() {
    const response = await apiService.get(API_ENDPOINTS.ENROLLMENTS.COURSES);

    if (!response.success) {
      throw new Error(response.message || 'Failed to fetch enrolled courses');
    }

    return response.payload;
  }
}

export default new EnrollmentService();
