import api from './axios';

/**
 * Teacher API calls
 */
export const teacherApi = {
  /**
   * Upload curriculum file
   */
  uploadCurriculum: async (formData) => {
    return await api.post('/teacher/curriculum', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Get all curricula
   */
  getCurricula: async (params = {}) => {
    return await api.get('/teacher/curriculum', { params });
  },

  /**
   * Get specific curriculum
   */
  getCurriculum: async (id) => {
    return await api.get(`/teacher/curriculum/${id}`);
  },

  /**
   * Update curriculum
   */
  updateCurriculum: async (id, data) => {
    return await api.put(`/teacher/curriculum/${id}`, data);
  },

  /**
   * Delete curriculum
   */
  deleteCurriculum: async (id) => {
    return await api.delete(`/teacher/curriculum/${id}`);
  },

  /**
   * Get lessons for curriculum
   */
  getLessons: async (curriculumId) => {
    return await api.get(`/teacher/curriculum/${curriculumId}/lessons`);
  },

  /**
   * Trigger AI processing for curriculum
   */
  processCurriculum: async (id) => {
    return await api.post(`/teacher/curriculum/${id}/process`);
  },

  /**
   * Get assigned students
   */
  getStudents: async () => {
    return await api.get('/teacher/students');
  },

  /**
   * Get teaching analytics
   */
  getAnalytics: async (params = {}) => {
    return await api.get('/teacher/analytics', { params });
  },

  /**
   * Assign curriculum to student
   */
  assignCurriculum: async (studentId, curriculumId) => {
    return await api.post('/teacher/assign', { studentId, curriculumId });
  },
};

export default teacherApi;
