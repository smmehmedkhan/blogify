import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import userService from '../services/user.service.js';

/**
 * Authenticator Middleware
 * Checks token in request cookies, !token redirect to sign-in page || add user id in request user.
 */
export default async function auth(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    req.session.returnTo = req.originalUrl; // Store prev req path in a var
    return res.redirect(302, '/auth/sign-in');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userService.getUserDetails(decoded._id); // Fetch user info by decoded ID

    if (!user) {
      return res.redirect(302, '/auth/sign-in');
    }

    // Append user info
    req.user = {
      _id: user._id,
      name: user.name,
      username: user.username,
      photo: {
        url: user.photo.url,
      },
      verified: user.verified,
    };

    return next();
  } catch (error) {
    return next(error);
  }
}
