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

    const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS
      ? require(process.env.GOOGLE_APPLICATION_CREDENTIALS)
      : {
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        };

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      storageBucket: process.env.GCS_BUCKET_NAME,
    });

    firestore = admin.firestore();

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
