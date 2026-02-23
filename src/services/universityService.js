import { API_ENDPOINTS } from '../config/constants';

class UniversityService {
  async getEquivalencies(universityId) {
    const url = API_ENDPOINTS.UNIVERSITIES.EQUIVALENCIES(universityId);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  }
}

export default new UniversityService();
