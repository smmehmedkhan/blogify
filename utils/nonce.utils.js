import crypto from 'crypto';

/**
 * @name Nonce Middleware
 * @description Generates a nonce for Content Security Policy (CSP) and attaches it to res.locals.
 * This nonce can be used in CSP headers to allow inline scripts/styles.
 */
export default function nonceToken(_req, res, next) {
  const nonceToken = crypto.randomBytes(16).toString('base64');
  res.locals.nonce = nonceToken;

  next();
}
