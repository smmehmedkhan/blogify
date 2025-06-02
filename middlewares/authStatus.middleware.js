import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../.configs/env.js';

/**
 * Auth status Middleware
 * Set signIn true/false based on token, Help toggle sign-in/sing-out button in UI.
 */
export default function authStatus(req, res, next) {
  const token = req.cookies.token;
  res.locals.signIn = !!token;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = { _id: decoded._id };
    } catch (error) {
      res.clearCookie('token');
      res.locals.signIn = false;
    }
  }

  next();
}
