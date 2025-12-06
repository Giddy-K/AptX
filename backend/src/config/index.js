const dotenv = require("dotenv");
const path = require("path");

// Determine which .env file to load based on NODE_ENV
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.prod"
    : process.env.NODE_ENV === "uat"
      ? ".env.uat"
      : ".env.development";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../", envFile) });

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  apiVersion: process.env.API_VERSION || "v1",

  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  },

  gcp: {
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    location: process.env.GOOGLE_CLOUD_LOCATION,
    credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  },

  storage: {
    bucketName: process.env.GCS_BUCKET_NAME,
    curriculumBucket: process.env.GCS_CURRICULUM_BUCKET,
    mediaBucket: process.env.GCS_MEDIA_BUCKET,
  },

  documentAI: {
    processorId: process.env.DOCUMENT_AI_PROCESSOR_ID,
    location: process.env.DOCUMENT_AI_LOCATION,
  },

  vertexAI: {
    model: process.env.VERTEX_AI_MODEL,
    location: process.env.VERTEX_AI_LOCATION,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpire: process.env.JWT_REFRESH_EXPIRE,
  },

  cors: {
    origin: process.env.CORS_ORIGIN?.split(",") || [],
    credentials: process.env.CORS_CREDENTIALS === "true",
  },
};
