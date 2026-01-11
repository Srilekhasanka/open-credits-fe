import { HTTP_METHODS, STORAGE_KEYS } from '../config/constants';
import authService from './authService';

/**
 * Generic API Service
 * Handles common API operations with authentication
 */

class ApiService {
  /**
   * Make an authenticated API request
   * @param {string} url - API endpoint URL
   * @param {Object} options - Fetch options
   * @returns {Promise<Object>} Response data
   */
  async request(url, options = {}) {
    try {
      const token = authService.getAccessToken();
      
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      // Add authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const config = {
        ...options,
        headers,
      };

      let response = await fetch(url, config);

      // Handle token expiration
      if (response.status === 401 && token) {
        try {
          // Try to refresh the token
          await authService.refreshToken();
          
          // Retry the request with new token
          const newToken = authService.getAccessToken();
          if (newToken) {
            headers['Authorization'] = `Bearer ${newToken}`;
            response = await fetch(url, { ...config, headers });
          }
        } catch (refreshError) {
          // Refresh failed, redirect to login
          authService.clearAuthData();
          window.location.href = '/signin';
          throw new Error('Session expired. Please login again.');
        }
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get(url, options = {}) {
    return this.request(url, {
      ...options,
      method: HTTP_METHODS.GET,
    });
  }

  /**
   * POST request
   */
  async post(url, body, options = {}) {
    return this.request(url, {
      ...options,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(body),
    });
  }

  /**
   * PUT request
   */
  async put(url, body, options = {}) {
    return this.request(url, {
      ...options,
      method: HTTP_METHODS.PUT,
      body: JSON.stringify(body),
    });
  }

  /**
   * PATCH request
   */
  async patch(url, body, options = {}) {
    return this.request(url, {
      ...options,
      method: HTTP_METHODS.PATCH,
      body: JSON.stringify(body),
    });
  }

  /**
   * DELETE request
   */
  async delete(url, options = {}) {
    return this.request(url, {
      ...options,
      method: HTTP_METHODS.DELETE,
    });
  }
}

// Export singleton instance
export default new ApiService();
