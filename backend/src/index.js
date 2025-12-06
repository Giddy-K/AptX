// Load configuration first (this will load the correct .env file)
const config = require('./config');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const { initializeFirebase } = require('./config/firebase');
const { notFound, errorHandler } = require('./middleware/error-handler');
const { apiLimiter } = require('./middleware/rate-limiter');
const logger = require('./utils/logger');

// Initialize Express app
const app = express();

// Initialize Firebase
try {
  initializeFirebase();
} catch (error) {
  logger.error('Failed to start server - Firebase initialization failed', { error: error.message });
  process.exit(1);
}

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: process.env.CORS_CREDENTIALS === 'true',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { stream: logger.stream }));
}

// Rate limiting
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API version info
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'APTX Learning Platform API',
    version: process.env.API_VERSION || 'v1',
    documentation: '/api-docs',
  });
});

// API Routes
const authRoutes = require('./api/routes/auth-routes');
// TODO: Import and use other routes here
// const teacherRoutes = require('./api/routes/teacher-routes');
// const guardianRoutes = require('./api/routes/guardian-routes');
// const studentRoutes = require('./api/routes/student-routes');

app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/teacher', teacherRoutes);
// app.use('/api/v1/guardian', guardianRoutes);
// app.use('/api/v1/student', studentRoutes);

// Swagger documentation
// TODO: Set up Swagger documentation
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./config/swagger');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection', { error: err.message, stack: err.stack });
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, closing server gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

module.exports = app;
