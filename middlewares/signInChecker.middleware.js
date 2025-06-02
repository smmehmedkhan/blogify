import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../.configs/env.js';

/**
 * Sign In Checker
 * Checks token in request cookies, !token clear cookies || Add user id in request user then redirect.
 */
export default function singInChecker(req, res, next) {
  const token = req.cookies.token;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = { _id: decoded._id };
      return res.redirect('/users/dashboard');
    } catch (err) {
      return next(err);
    }
  } else {
    res.clearCookie('token');
  }

  return next();
}
