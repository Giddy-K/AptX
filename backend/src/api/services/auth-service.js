const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getFirestore, collections, getAuth } = require('../../config/firebase');
const logger = require('../../utils/logger');

class AuthService {
  /**
   * Register a new user
   */
  async register(userData) {
    try {
      const { email, password, role, firstName, lastName, ...additionalData } = userData;

      // Validate required fields
      if (!email || !password || !role) {
        throw new Error('Email, password, and role are required');
      }

      // Validate role
      const validRoles = ['teacher', 'guardian', 'student'];
      if (!validRoles.includes(role)) {
        throw new Error('Invalid role. Must be teacher, guardian, or student');
      }

      const db = getFirestore();

      // Check if user already exists
      const existingUser = await db
        .collection(collections.USERS)
        .where('email', '==', email.toLowerCase())
        .get();

      if (!existingUser.empty) {
        throw new Error('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_ROUNDS) || 10
      );

      // Create user document
      const userDoc = {
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
        firstName: firstName || '',
        lastName: lastName || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        ...additionalData,
      };

      // Save user to Firestore
      const userRef = await db.collection(collections.USERS).add(userDoc);

      // Get the created user
      const createdUser = await userRef.get();
      const user = { id: createdUser.id, ...createdUser.data() };

      // Remove password from response
      delete user.password;

      // Generate tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      logger.info(`User registered successfully: ${email}`);

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      logger.error('Error in register service', { error: error.message });
      throw error;
    }
  }

  /**
   * Login user
   */
  async login(email, password) {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const db = getFirestore();

      // Find user by email
      const userSnapshot = await db
        .collection(collections.USERS)
        .where('email', '==', email.toLowerCase())
        .get();

      if (userSnapshot.empty) {
        throw new Error('Invalid email or password');
      }

      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();
      const user = { id: userDoc.id, ...userData };

      // Check if user is active
      if (!user.isActive) {
        throw new Error('Account is deactivated. Please contact support');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Remove password from response
      delete user.password;

      // Generate tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      logger.info(`User logged in successfully: ${email}`);

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      logger.error('Error in login service', { error: error.message });
      throw error;
    }
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(refreshToken) {
    try {
      if (!refreshToken) {
        throw new Error('Refresh token is required');
      }

      // Verify refresh token
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      const db = getFirestore();
      const userDoc = await db.collection(collections.USERS).doc(decoded.id).get();

      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const userData = userDoc.data();
      const user = { id: userDoc.id, ...userData };

      // Check if user is active
      if (!user.isActive) {
        throw new Error('Account is deactivated');
      }

      // Remove password
      delete user.password;

      // Generate new access token
      const accessToken = this.generateAccessToken(user);

      return { accessToken };
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new Error('Invalid or expired refresh token');
      }
      logger.error('Error in refreshAccessToken service', { error: error.message });
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId) {
    try {
      const db = getFirestore();
      const userDoc = await db.collection(collections.USERS).doc(userId).get();

      if (!userDoc.exists) {
        throw new Error('User not found');
      }

      const user = { id: userDoc.id, ...userDoc.data() };
      delete user.password;

      return user;
    } catch (error) {
      logger.error('Error in getUserById service', { error: error.message });
      throw error;
    }
  }

  /**
   * Generate access token
   */
  generateAccessToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '1h' }
    );
  }

  /**
   * Generate refresh token
   */
  generateRefreshToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
    );
  }

  /**
   * Google Sign-In
   * Verify Google ID token and create/login user
   */
  async googleSignIn(idToken, role = 'student') {
    try {
      const auth = getAuth();
      const db = getFirestore();

      // Verify the Google ID token
      const decodedToken = await auth.verifyIdToken(idToken);
      const { uid, email, name, picture } = decodedToken;

      if (!email) {
        throw new Error('Email not provided by Google');
      }

      // Check if user exists
      let userSnapshot = await db
        .collection(collections.USERS)
        .where('email', '==', email.toLowerCase())
        .get();

      let user;
      let userDoc;

      if (userSnapshot.empty) {
        // Create new user
        const newUser = {
          email: email.toLowerCase(),
          role: role || 'student',
          firstName: name?.split(' ')[0] || '',
          lastName: name?.split(' ').slice(1).join(' ') || '',
          photoURL: picture || '',
          provider: 'google',
          providerId: uid,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
        };

        const userRef = await db.collection(collections.USERS).add(newUser);
        userDoc = await userRef.get();
        user = { id: userDoc.id, ...userDoc.data() };
        logger.info(`New user created via Google: ${email}`);
      } else {
        // User exists, update last login
        userDoc = userSnapshot.docs[0];
        await userDoc.ref.update({
          updatedAt: new Date().toISOString(),
        });
        user = { id: userDoc.id, ...userDoc.data() };
        logger.info(`User logged in via Google: ${email}`);
      }

      // Generate tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      logger.error('Error in googleSignIn service', { error: error.message });
      throw error;
    }
  }

  /**
   * Anonymous Sign-In
   * Create anonymous user account
   */
  async anonymousSignIn() {
    try {
      const db = getFirestore();

      // Create anonymous user
      const anonymousUser = {
        email: `anonymous_${Date.now()}@aptx.local`,
        role: 'student',
        firstName: 'Anonymous',
        lastName: 'User',
        provider: 'anonymous',
        isAnonymous: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
      };

      const userRef = await db.collection(collections.USERS).add(anonymousUser);
      const userDoc = await userRef.get();
      const user = { id: userDoc.id, ...userDoc.data() };

      // Generate tokens
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);

      logger.info(`Anonymous user created: ${user.id}`);

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      logger.error('Error in anonymousSignIn service', { error: error.message });
      throw error;
    }
  }

  /**
   * Link anonymous account to email/password
   */
  async linkAnonymousAccount(userId, email, password) {
    try {
      const db = getFirestore();

      // Check if email is already used
      const existingUser = await db
        .collection(collections.USERS)
        .where('email', '==', email.toLowerCase())
        .get();

      if (!existingUser.empty) {
        throw new Error('Email already in use');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.BCRYPT_ROUNDS) || 10
      );

      // Update user
      await db.collection(collections.USERS).doc(userId).update({
        email: email.toLowerCase(),
        password: hashedPassword,
        provider: 'email',
        isAnonymous: false,
        updatedAt: new Date().toISOString(),
      });

      const userDoc = await db.collection(collections.USERS).doc(userId).get();
      const user = { id: userDoc.id, ...userDoc.data() };
      delete user.password;

      logger.info(`Anonymous account linked to email: ${email}`);

      return { user };
    } catch (error) {
      logger.error('Error in linkAnonymousAccount service', { error: error.message });
      throw error;
    }
  }
}

module.exports = new AuthService();
