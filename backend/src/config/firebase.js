const admin = require('firebase-admin');
const logger = require('../utils/logger');

let firebaseApp = null;
let firestore = null;

/**
 * Initialize Firebase Admin SDK
 */
const initializeFirebase = () => {
  try {
    if (firebaseApp) {
      return firebaseApp;
    }

    let serviceAccount;

    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      logger.info('Loading Firebase credentials from service account file');
      serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    } else {
      logger.info('Loading Firebase credentials from environment variables');
      serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      };

      // Debug: Log if credentials are missing
      if (!serviceAccount.projectId) {
        logger.error('FIREBASE_PROJECT_ID is not set');
      }
      if (!serviceAccount.clientEmail) {
        logger.error('FIREBASE_CLIENT_EMAIL is not set');
      }
      if (!serviceAccount.privateKey) {
        logger.error('FIREBASE_PRIVATE_KEY is not set');
      }
    }

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      storageBucket: process.env.GCS_BUCKET_NAME,
    });

    // Use the named database "aptx" or default database
    const databaseId = process.env.FIRESTORE_DATABASE_ID;

    if (databaseId && databaseId !== '(default)') {
      // Use named database
      logger.info(`Using Firestore database: ${databaseId}`);
      const { Firestore } = require('@google-cloud/firestore');
      firestore = new Firestore({
        projectId: serviceAccount.projectId,
        credentials: serviceAccount,
        databaseId: databaseId,
      });
    } else {
      // Use default database
      logger.info('Using Firestore default database');
      firestore = admin.firestore();
    }

    // Configure Firestore settings
    firestore.settings({
      ignoreUndefinedProperties: true,
    });

    logger.info('Firebase initialized successfully');
    return firebaseApp;
  } catch (error) {
    logger.error('Failed to initialize Firebase', { error: error.message });
    throw error;
  }
};

/**
 * Get Firestore instance
 */
const getFirestore = () => {
  if (!firestore) {
    initializeFirebase();
  }
  return firestore;
};

/**
 * Get Firebase Auth instance
 */
const getAuth = () => {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return admin.auth();
};

/**
 * Get Firebase Storage instance
 */
const getStorage = () => {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return admin.storage();
};

/**
 * Firestore collections
 */
const collections = {
  USERS: 'users',
  CURRICULA: 'curricula',
  LESSONS: 'lessons',
  LEARNING_MATERIALS: 'learningMaterials',
  STUDENT_PROGRESS: 'studentProgress',
  EXAMS: 'exams',
  NOTIFICATIONS: 'notifications',
  ANALYTICS: 'analytics',
};

/**
 * Firestore subcollections
 */
const subcollections = {
  LESSONS: 'lessons',
  LESSON_PROGRESS: 'lessonProgress',
  EXAM_RESULTS: 'examResults',
};

module.exports = {
  initializeFirebase,
  getFirestore,
  getAuth,
  getStorage,
  collections,
  subcollections,
  admin,
};
