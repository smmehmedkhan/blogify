/**
 * Error Handler
 * Default error handler middleware function for handling errors & render error.ejs
 */
export default function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  const bundle = {
    title: statusCode,
    message,
    error: process.env.NODE_ENV === 'development' ? err : {}, // Show details only in development
  };

  return res.status(statusCode).render('pages/error', bundle);
}
