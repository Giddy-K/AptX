import api from './axios';

/**
 * Authentication API calls
 */
export const authApi = {
  /**
   * Register a new user
   */
  register: async (userData) => {
    return await api.post('/auth/register', userData);
  },

  /**
   * Login user
   */
  login: async (credentials) => {
    return await api.post('/auth/login', credentials);
  },

  /**
   * Logout user
   */
  logout: async () => {
    return await api.post('/auth/logout');
  },

  /**
   * Get current user profile
   */
  getProfile: async () => {
    return await api.get('/auth/me');
  },

  /**
   * Update user profile
   */
  updateProfile: async (profileData) => {
    return await api.put('/auth/profile', profileData);
  },

  /**
   * Change password
   */
  changePassword: async (passwordData) => {
    return await api.put('/auth/password', passwordData);
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email) => {
    return await api.post('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token, newPassword) => {
    return await api.post('/auth/reset-password', { token, newPassword });
  },

  /**
   * Google Sign-In
   */
  googleSignIn: async (idToken, role) => {
    return await api.post('/auth/google', { idToken, role });
  },

  /**
   * Anonymous Sign-In
   */
  anonymousSignIn: async () => {
    return await api.post('/auth/anonymous');
  },

  /**
   * Link anonymous account to email/password
   */
  linkAccount: async (email, password) => {
    return await api.post('/auth/link-account', { email, password });
  },
};

export default authApi;
