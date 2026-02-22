import { API_ENDPOINTS } from '../config/constants';
import apiService from './apiService';

class UniversityService {
  async getEquivalencies(universityId) {
    const url = API_ENDPOINTS.UNIVERSITIES.EQUIVALENCIES(universityId);
    const response = await apiService.get(url);
    return response;
  }
}

export default new UniversityService();
