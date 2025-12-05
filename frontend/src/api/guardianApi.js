import api from './axios';

/**
 * Guardian API calls
 */
export const guardianApi = {
  /**
   * Get assigned students
   */
  getStudents: async () => {
    return await api.get('/guardian/students');
  },

  /**
   * Get student progress
   */
  getStudentProgress: async (studentId) => {
    return await api.get(`/guardian/student/${studentId}/progress`);
  },

  /**
   * Get student analytics
   */
  getStudentAnalytics: async (studentId, params = {}) => {
    return await api.get(`/guardian/student/${studentId}/analytics`, { params });
  },

  /**
   * Get notifications
   */
  getNotifications: async (params = {}) => {
    return await api.get('/guardian/notifications', { params });
  },

  /**
   * Mark notification as read
   */
  markNotificationRead: async (notificationId) => {
    return await api.put(`/guardian/notifications/${notificationId}/read`);
  },

  /**
   * Set reminder for student
   */
  setReminder: async (studentId, reminderData) => {
    return await api.post(`/guardian/student/${studentId}/reminder`, reminderData);
  },

  /**
   * Get student lesson history
   */
  getLessonHistory: async (studentId) => {
    return await api.get(`/guardian/student/${studentId}/lessons`);
  },

  /**
   * Get student exam results
   */
  getExamResults: async (studentId) => {
    return await api.get(`/guardian/student/${studentId}/exams`);
  },
};

export default guardianApi;
