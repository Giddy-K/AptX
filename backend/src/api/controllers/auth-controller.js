const authService = require('../services/auth-service');
const logger = require('../../utils/logger');

class AuthController {
  /**
   * Register a new user
   * POST /api/v1/auth/register
   */
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result,
      });
    } catch (error) {
      logger.error('Error in register controller', { error: error.message });
      next(error);
    }
  }

  /**
   * Login user
   * POST /api/v1/auth/login
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      logger.error('Error in login controller', { error: error.message });
      next(error);
    }
  }

  /**
   * Refresh access token
   * POST /api/v1/auth/refresh
   */
  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshAccessToken(refreshToken);

      res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: result,
      });
    } catch (error) {
      logger.error('Error in refreshToken controller', { error: error.message });
      next(error);
    }
  }

  /**
   * Get current user
   * GET /api/v1/auth/me
   */
  async getCurrentUser(req, res, next) {
    try {
      // User is attached to req by auth middleware
      const user = await authService.getUserById(req.user.id);

      res.status(200).json({
        success: true,
        data: { user },
      });
    } catch (error) {
      logger.error('Error in getCurrentUser controller', { error: error.message });
      next(error);
    }
  }

  /**
   * Logout user
   * POST /api/v1/auth/logout
   */
  async logout(req, res, next) {
    try {
      // For JWT-based auth, logout is handled client-side by removing tokens
      // This endpoint can be used for logging or token invalidation if needed
      res.status(200).json({
        success: true,
        message: 'Logout successful',
      });
    } catch (error) {
      logger.error('Error in logout controller', { error: error.message });
      next(error);
    }
  }

  /**
   * Google Sign-In
   * POST /api/v1/auth/google
   */
  async googleSignIn(req, res, next) {
    try {
      const { idToken, role } = req.body;
      const result = await authService.googleSignIn(idToken, role);

      res.status(200).json({
        success: true,
        message: 'Google sign-in successful',
        data: result,
      });
    } catch (error) {
      logger.error('Error in googleSignIn controller', { error: error.message });
      next(error);
    }
  }

  /**
   * Anonymous Sign-In
   * POST /api/v1/auth/anonymous
   */
  async anonymousSignIn(req, res, next) {
    try {
      const result = await authService.anonymousSignIn();

      res.status(200).json({
        success: true,
        message: 'Anonymous sign-in successful',
        data: result,
      });
    } catch (error) {
      logger.error('Error in anonymousSignIn controller', { error: error.message });
      next(error);
    }
  }

  /**
   * Link anonymous account
   * POST /api/v1/auth/link-account
   */
  async linkAccount(req, res, next) {
    try {
      const { email, password } = req.body;
      const userId = req.user.id;

      const result = await authService.linkAnonymousAccount(userId, email, password);

      res.status(200).json({
        success: true,
        message: 'Account linked successfully',
        data: result,
      });
    } catch (error) {
      logger.error('Error in linkAccount controller', { error: error.message });
      next(error);
    }
  }
}

module.exports = new AuthController();
