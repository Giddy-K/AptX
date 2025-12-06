const logger = require('../utils/logger');
const { errorResponse } = require('../utils/response');

/**
 * Custom error class
 */
class AppError extends Error {
  constructor(message, statusCode, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not found error handler
 */
const notFound = (req, res, next) => {
  const error = new AppError(`Route not found: ${req.originalUrl}`, 404);
  next(error);
};

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.stack = err.stack;

  // Log error
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new AppError(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new AppError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((val) => val.message);
    const message = 'Validation error';
    error = new AppError(message, 400, errors);
  }

  // Firebase auth errors
  if (err.code && typeof err.code === 'string' && err.code.startsWith('auth/')) {
    const message = getFirebaseAuthErrorMessage(err.code);
    error = new AppError(message, 401);
  }

  // Firestore gRPC errors
  if (err.code && typeof err.code === 'number') {
    const grpcMessages = {
      5: 'Database not found or not configured properly',
      7: 'Permission denied',
      16: 'Unauthenticated request',
    };
    const message = grpcMessages[err.code] || err.message || 'Database error';
    error = new AppError(message, err.code === 16 ? 401 : 500);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = new AppError(message, 401);
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = new AppError(message, 401);
  }

  // Multer errors (file upload)
  if (err.name === 'MulterError') {
    const message = getMulterErrorMessage(err.code);
    error = new AppError(message, 400);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error';

  return errorResponse(res, message, statusCode, error.errors);
};

/**
 * Get Firebase auth error message
 */
const getFirebaseAuthErrorMessage = (code) => {
  const messages = {
    'auth/email-already-exists': 'Email already in use',
    'auth/invalid-email': 'Invalid email address',
    'auth/invalid-password': 'Password must be at least 6 characters',
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Incorrect password',
    'auth/id-token-expired': 'Token expired',
    'auth/id-token-revoked': 'Token revoked',
    'auth/invalid-id-token': 'Invalid token',
  };

  return messages[code] || 'Authentication error';
};

/**
 * Get Multer error message
 */
const getMulterErrorMessage = (code) => {
  const messages = {
    LIMIT_FILE_SIZE: 'File size too large',
    LIMIT_FILE_COUNT: 'Too many files',
    LIMIT_UNEXPECTED_FILE: 'Unexpected file field',
  };

  return messages[code] || 'File upload error';
};

/**
 * Async handler wrapper
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  AppError,
  notFound,
  errorHandler,
  asyncHandler,
};
