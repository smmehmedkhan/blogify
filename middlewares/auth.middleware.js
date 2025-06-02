import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../.configs/env.js';
import User from '../models/user.model.js';

/**
 * Authenticator Middleware
 * Checks token in request cookies, !token redirect to sign-in page || add user id in request user.
 */
export default async function auth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect(302, '/auth/sign-in');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Fetch complete user information
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.redirect(302, '/auth/sign-in');
    }
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
}
