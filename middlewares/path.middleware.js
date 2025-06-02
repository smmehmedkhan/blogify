/**
 * Path Middleware
 * Used in app to identify paths, Help to highlighting active paths/routes.
 */
export default function pathMiddleware(req, res, next) {
  // Add the current path to res.locals
  res.locals.path = req.path;
  next();
}
