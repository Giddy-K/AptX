const { getAuth } = require('../config/firebase');
const { AppError, asyncHandler } = require('./error-handler');
const { unauthorizedResponse, forbiddenResponse } = require('../utils/response');
const logger = require('../utils/logger');

/**
 * Verify Firebase ID token
 */
const verifyToken = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return unauthorizedResponse(res, 'No authentication token provided');
  }

  try {
    // Verify token with Firebase
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);

    // Attach user to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role || 'student',
    };

    next();
  } catch (error) {
    logger.error('Token verification failed', { error: error.message });
    return unauthorizedResponse(res, 'Invalid or expired token');
  }
});

/**
 * Check if user has required role
 */
const authorize = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      return unauthorizedResponse(res, 'Authentication required');
    }

    if (!roles.includes(req.user.role)) {
      logger.warn('Authorization failed', {
        userId: req.user.uid,
        requiredRoles: roles,
        userRole: req.user.role,
      });
      return forbiddenResponse(res, 'You do not have permission to access this resource');
    }

    next();
  });
};

/**
 * Check if user is the owner of the resource or has admin role
 */
const authorizeOwnerOrAdmin = (userIdParam = 'id') => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      return unauthorizedResponse(res, 'Authentication required');
    }

    const resourceUserId = req.params[userIdParam] || req.body.userId;

    // Allow if user is admin or owns the resource
    if (req.user.role === 'admin' || req.user.uid === resourceUserId) {
      return next();
    }

    logger.warn('Authorization failed - not owner', {
      userId: req.user.uid,
      resourceUserId,
    });
    return forbiddenResponse(res, 'You do not have permission to access this resource');
  });
};

/**
 * Check if guardian has access to student
 */
const authorizeGuardianAccess = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return unauthorizedResponse(res, 'Authentication required');
  }

  const studentId = req.params.studentId || req.params.id;

  // Admin can access all students
  if (req.user.role === 'admin') {
    return next();
  }

  // Guardian must be assigned to the student
  if (req.user.role === 'guardian') {
    const { getFirestore, collections } = require('../config/firebase');
    const db = getFirestore();

    try {
      const guardianDoc = await db.collection(collections.USERS).doc(req.user.uid).get();

      if (!guardianDoc.exists) {
        return unauthorizedResponse(res, 'Guardian profile not found');
      }

      const guardianData = guardianDoc.data();
      const assignedStudents = guardianData.studentIds || [];

      if (assignedStudents.includes(studentId)) {
        return next();
      }
    } catch (error) {
      logger.error('Error checking guardian access', { error: error.message });
      throw new AppError('Failed to verify guardian access', 500);
    }
  }

  logger.warn('Guardian authorization failed', {
    guardianId: req.user.uid,
    studentId,
  });
  return forbiddenResponse(res, 'You do not have access to this student');
});

/**
 * Check if teacher has access to curriculum
 */
const authorizeTeacherCurriculum = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return unauthorizedResponse(res, 'Authentication required');
  }

  const curriculumId = req.params.curriculumId || req.params.id;

  // Admin can access all curricula
  if (req.user.role === 'admin') {
    return next();
  }

  // Teacher must own the curriculum
  if (req.user.role === 'teacher') {
    const { getFirestore, collections } = require('../config/firebase');
    const db = getFirestore();

    try {
      const curriculumDoc = await db.collection(collections.CURRICULA).doc(curriculumId).get();

      if (!curriculumDoc.exists) {
        return unauthorizedResponse(res, 'Curriculum not found');
      }

      const curriculumData = curriculumDoc.data();

      if (curriculumData.teacherId === req.user.uid) {
        return next();
      }
    } catch (error) {
      logger.error('Error checking teacher curriculum access', { error: error.message });
      throw new AppError('Failed to verify curriculum access', 500);
    }
  }

  logger.warn('Teacher authorization failed', {
    teacherId: req.user.uid,
    curriculumId,
  });
  return forbiddenResponse(res, 'You do not have access to this curriculum');
});

module.exports = {
  verifyToken,
  authorize,
  authorizeOwnerOrAdmin,
  authorizeGuardianAccess,
  authorizeTeacherCurriculum,
};
