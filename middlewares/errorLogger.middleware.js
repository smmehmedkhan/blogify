import logger from '../utils/logger.js';

/**
 * Error logger middleware
 * Logs errors to the console and to the log file
 */
export default function errorLogger(err, req, _res, next) {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );
  next(err);
}
