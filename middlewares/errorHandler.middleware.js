import { NODE_ENV } from '../config/env.js';
import logger from '../utils/logger.js';

/**
 * Error Handler
 * Default error handler middleware function for handling errors & render error.ejs
 */
export default function errorHandler(err, req, res, next) {
  const isProd = NODE_ENV === 'production';

  // Log error with details
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  // Log error for debugging
  console.error(err);

  // Don't expose error details in production
  const statusCode = err.statusCode || 500;
  const errorMessage =
    isProd && statusCode === 500 ? 'Internal Server Error' : err.message;

  res.status(statusCode).render('pages/error', {
    title: statusCode,
    message: errorMessage,
    error: isProd ? {} : err,
  });

  next();
}
