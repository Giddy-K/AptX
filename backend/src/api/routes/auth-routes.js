const express = require('express');
const authController = require('../controllers/auth-controller');
const { authMiddleware } = require('../../middleware/auth');
const { body } = require('express-validator');
const { validate } = require('../../middleware/validator');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('role')
    .isIn(['teacher', 'guardian', 'student'])
    .withMessage('Role must be teacher, guardian, or student'),
  body('firstName').optional().trim().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().trim().notEmpty().withMessage('Last name cannot be empty'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const refreshTokenValidation = [
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
];

// Public routes
router.post('/register', registerValidation, validate, authController.register.bind(authController));
router.post('/login', loginValidation, validate, authController.login.bind(authController));
router.post('/refresh', refreshTokenValidation, validate, authController.refreshToken.bind(authController));

// Google Sign-In
router.post(
  '/google',
  [
    body('idToken').notEmpty().withMessage('ID token is required'),
    body('role').optional().isIn(['teacher', 'guardian', 'student']).withMessage('Invalid role'),
  ],
  validate,
  authController.googleSignIn.bind(authController)
);

// Anonymous Sign-In
router.post('/anonymous', authController.anonymousSignIn.bind(authController));

// Protected routes (require authentication)
router.get('/me', authMiddleware, authController.getCurrentUser.bind(authController));
router.post('/logout', authMiddleware, authController.logout.bind(authController));

// Link anonymous account
router.post(
  '/link-account',
  authMiddleware,
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  validate,
  authController.linkAccount.bind(authController)
);

module.exports = router;
