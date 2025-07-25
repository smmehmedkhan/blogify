export default function storeReturnTo(req, res, next) {
  if (!req.isAuthenticated?.() && req.method === 'GET') {
    // Save original URL in session
    req.session.returnTo = req.originalUrl;
  }
  next();
}
