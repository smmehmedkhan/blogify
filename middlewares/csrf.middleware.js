import crypto from 'crypto';
import { NODE_ENV } from '../config/env.js';

/**
 * Generate CSRF token and set in cookie and locals
 */
export function generateToken(req, res, next) {
  let token = req.cookies._csrf;

  if (!token) {
    token = crypto.randomBytes(16).toString('hex');

    //
    res.cookie('_csrf', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.cookie('XSRF-TOKEN', token, {
      httpOnly: false,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  res.locals.csrfToken = token;

  next();
}

/**
 * Verify CSRF token from request against cookie
 */
export function verifyToken(req, res, next) {
  // Skip for GET, HEAD, OPTIONS requests (they don't modify state)
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const cookieToken = req.cookies._csrf;
  const bodyToken = req.body._csrf;
  const headerToken =
    req.headers['x-csrf-token'] || req.headers['x-xsrf-token'];
  const requestToken = bodyToken || headerToken;

  if (!cookieToken || !requestToken || cookieToken !== requestToken) {
    return res.status(403).render('pages/error', {
      title: 403,
      message: 'CSRF token validation failed',
      error: { status: 403 },
    });
  }

  next();
}
