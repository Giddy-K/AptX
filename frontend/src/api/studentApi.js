import api from './axios';

/**
 * Student API calls
 */
export const studentApi = {
  /**
   * Get assigned curriculum
   */
  getCurriculum: async () => {
    return await api.get('/student/curriculum');
  },

  /**
   * Get available lessons
   */
  getLessons: async (params = {}) => {
    return await api.get('/student/lessons', { params });
  },

  /**
   * Get lesson details
   */
  getLesson: async (lessonId) => {
    return await api.get(`/student/lesson/${lessonId}`);
  },

  /**
   * Start a lesson
   */
  startLesson: async (lessonId) => {
    return await api.post(`/student/lesson/${lessonId}/start`);
  },

  /**
   * Complete a lesson
   */
  completeLesson: async (lessonId, data) => {
    return await api.post(`/student/lesson/${lessonId}/complete`, data);
  },

  /**
   * Get exam for lesson
   */
  getExam: async (lessonId) => {
    return await api.get(`/student/exam/${lessonId}`);
  },

  /**
   * Submit exam answers
   */
  submitExam: async (examId, answers) => {
    return await api.post(`/student/exam/${examId}/submit`, { answers });
  },

  /**
   * Get own progress
   */
  getProgress: async () => {
    return await api.get('/student/progress');
  },

  /**
   * Submit emotional feedback
   */
  submitFeedback: async (feedbackData) => {
    return await api.post('/student/feedback', feedbackData);
  },

  /**
   * Get learning materials
   */
  getLearningMaterials: async (lessonId) => {
    return await api.get(`/student/lesson/${lessonId}/materials`);
  },

  /**
   * Update lesson progress
   */
  updateProgress: async (lessonId, progressData) => {
    return await api.put(`/student/lesson/${lessonId}/progress`, progressData);
  },
};

export default studentApi;
