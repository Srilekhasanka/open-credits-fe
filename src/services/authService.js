import { API_ENDPOINTS, HTTP_METHODS, STORAGE_KEYS } from '../config/constants';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

class AuthService {
  /**
   * Sign up a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password
   * @param {string} [userData.firstName]
   * @param {string} [userData.lastName] - User full name (optional)
   * @returns {Promise<Object>} Response data
   */
  async signup(userData) {
    try {
      const firstName = userData.firstName ?? userData.first_name;
      const lastName = userData.lastName ?? userData.last_name;

      const response = await fetch(API_ENDPOINTS.AUTH.SIGNUP, {
        method: HTTP_METHODS.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          ...(firstName && { first_name: firstName }),
          ...(lastName && { last_name: lastName }),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Signup failed');
      }

      // Extract payload from response
      const { payload } = data;

      // Store tokens if provided
      if (payload.accessToken) {
        this.setAccessToken(payload.accessToken);
      }
      if (payload.refreshToken) {
        this.setRefreshToken(payload.refreshToken);
      }
      if (payload.user) {
        this.setUserData(payload.user);
      }

      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  /**
   * Sign in an existing user
   * @param {Object} credentials - User credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise<Object>} Response data
   */
  async signin(credentials) {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.SIGNIN, {
        method: HTTP_METHODS.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Sign in failed');
      }

      // Extract payload from response
      const { payload } = data;

      // Store tokens and user data
      if (payload.accessToken) {
        this.setAccessToken(payload.accessToken);
      }
      if (payload.refreshToken) {
        this.setRefreshToken(payload.refreshToken);
      }
      if (payload.user) {
        this.setUserData(payload.user);
      }

      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  /**
   * Send forgot password email
   * @param {string} email - User email
   * @returns {Promise<Object>} Response data
   */
  async forgotPassword(email) {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        method: HTTP_METHODS.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Forgot password request failed');
      }

      return data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  /**
   * Verify OTP for password reset
   * @param {string} email - User email
   * @param {string} otp - 6 digit OTP
   * @returns {Promise<Object>} Response data
   */
  async verifyOtp(email, otp) {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.VERIFY_OTP, {
        method: HTTP_METHODS.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'OTP verification failed');
      }

      return data;
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error;
    }
  }

  /**
   * Fetch current user profile
   * @returns {Promise<Object>} Response data
   */
  async getProfile() {
    try {
      const token = this.getAccessToken();

      if (!token) {
        throw new Error('No access token available');
      }

      const response = await fetch(API_ENDPOINTS.AUTH.PROFILE, {
        method: HTTP_METHODS.GET,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   * @param {Object} payload
   * @returns {Promise<Object>} Response data
   */
  async updateProfile(payload) {
    try {
      const token = this.getAccessToken();

      if (!token) {
        throw new Error('No access token available');
      }

      const response = await fetch(API_ENDPOINTS.AUTH.PROFILE, {
        method: HTTP_METHODS.PUT,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to update profile');
      }

      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  /**
   * Reset password using verified OTP token
   * @param {Object} payload
   * @param {string} payload.email
   * @param {string} payload.resetToken
   * @param {string} payload.password
   * @returns {Promise<Object>} Response data
   */
  async resetPassword({ email, resetToken, newPassword, confirmPassword }) {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        method: HTTP_METHODS.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          reset_token: resetToken,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Password reset failed');
      }

      return data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      const token = this.getAccessToken();
      
      if (token) {
        await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
          method: HTTP_METHODS.POST,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call result
      this.clearAuthData();
    }
  }

  /**
   * Refresh access token
   * @returns {Promise<Object>} New access token
   */
  async refreshToken() {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
        method: HTTP_METHODS.POST,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Token refresh failed');
      }

      // Extract payload from response
      const { payload } = data;

      if (payload.accessToken) {
        this.setAccessToken(payload.accessToken);
      }

      return data;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearAuthData();
      throw error;
    }
  }

  // Token management methods
  setAccessToken(token) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  getAccessToken() {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  setRefreshToken(token) {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  getRefreshToken() {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  setUserData(userData) {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  }

  getUserData() {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  }

  clearAuthData() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  }

  isAuthenticated() {
    return !!this.getAccessToken();
  }
}

// Export singleton instance
export default new AuthService();
