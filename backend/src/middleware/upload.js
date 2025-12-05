const multer = require('multer');
const path = require('path');
const { AppError } = require('./error-handler');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, `${basename}-${uniqueSuffix}${ext}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(',') || [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError(`File type not allowed: ${file.mimetype}`, 400), false);
  }
};

// Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 10 * 1024 * 1024, // 10MB default
  },
});

/**
 * Single file upload
 */
const uploadSingle = (fieldName) => upload.single(fieldName);

/**
 * Multiple files upload
 */
const uploadMultiple = (fieldName, maxCount = 10) => upload.array(fieldName, maxCount);

/**
 * Multiple fields upload
 */
const uploadFields = (fields) => upload.fields(fields);

module.exports = {
  uploadSingle,
  uploadMultiple,
  uploadFields,
};
