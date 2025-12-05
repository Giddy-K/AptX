const { Storage } = require('@google-cloud/storage');
const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;
const textToSpeech = require('@google-cloud/text-to-speech');
const { VertexAI } = require('@google-cloud/vertexai');
const logger = require('../utils/logger');

/**
 * Initialize Google Cloud Storage
 */
const initializeStorage = () => {
  try {
    const storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });

    logger.info('Google Cloud Storage initialized');
    return storage;
  } catch (error) {
    logger.error('Failed to initialize Cloud Storage', { error: error.message });
    throw error;
  }
};

/**
 * Initialize Document AI client
 */
const initializeDocumentAI = () => {
  try {
    const client = new DocumentProcessorServiceClient({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });

    logger.info('Document AI client initialized');
    return client;
  } catch (error) {
    logger.error('Failed to initialize Document AI', { error: error.message });
    throw error;
  }
};

/**
 * Initialize Text-to-Speech client
 */
const initializeTextToSpeech = () => {
  try {
    const client = new textToSpeech.TextToSpeechClient({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });

    logger.info('Text-to-Speech client initialized');
    return client;
  } catch (error) {
    logger.error('Failed to initialize Text-to-Speech', { error: error.message });
    throw error;
  }
};

/**
 * Initialize Vertex AI
 */
const initializeVertexAI = () => {
  try {
    const vertexAI = new VertexAI({
      project: process.env.GOOGLE_CLOUD_PROJECT_ID,
      location: process.env.VERTEX_AI_LOCATION || 'us-central1',
    });

    const model = process.env.VERTEX_AI_MODEL || 'gemini-1.5-pro-002';
    const generativeModel = vertexAI.getGenerativeModel({
      model: model,
    });

    logger.info(`Vertex AI initialized with model: ${model}`);
    return { vertexAI, generativeModel };
  } catch (error) {
    logger.error('Failed to initialize Vertex AI', { error: error.message });
    throw error;
  }
};

/**
 * Cloud Storage buckets
 */
const buckets = {
  CURRICULUM: process.env.GCS_CURRICULUM_BUCKET || 'aptx-curriculum-files',
  MEDIA: process.env.GCS_MEDIA_BUCKET || 'aptx-media-files',
  LEARNING_MATERIALS: process.env.GCS_BUCKET_NAME || 'aptx-learning-materials',
};

/**
 * Upload file to Cloud Storage
 */
const uploadToCloudStorage = async (bucketName, filePath, destination, metadata = {}) => {
  try {
    const storage = initializeStorage();
    const bucket = storage.bucket(bucketName);

    const options = {
      destination,
      metadata: {
        contentType: metadata.contentType,
        metadata: metadata.customMetadata || {},
      },
    };

    await bucket.upload(filePath, options);

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${destination}`;
    logger.info(`File uploaded to Cloud Storage: ${publicUrl}`);

    return publicUrl;
  } catch (error) {
    logger.error('Failed to upload to Cloud Storage', { error: error.message });
    throw error;
  }
};

/**
 * Delete file from Cloud Storage
 */
const deleteFromCloudStorage = async (bucketName, fileName) => {
  try {
    const storage = initializeStorage();
    const bucket = storage.bucket(bucketName);

    await bucket.file(fileName).delete();
    logger.info(`File deleted from Cloud Storage: ${fileName}`);
  } catch (error) {
    logger.error('Failed to delete from Cloud Storage', { error: error.message });
    throw error;
  }
};

/**
 * Get signed URL for private files
 */
const getSignedUrl = async (bucketName, fileName, expiresIn = 3600) => {
  try {
    const storage = initializeStorage();
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + expiresIn * 1000,
    });

    return url;
  } catch (error) {
    logger.error('Failed to generate signed URL', { error: error.message });
    throw error;
  }
};

module.exports = {
  initializeStorage,
  initializeDocumentAI,
  initializeTextToSpeech,
  initializeVertexAI,
  buckets,
  uploadToCloudStorage,
  deleteFromCloudStorage,
  getSignedUrl,
};
