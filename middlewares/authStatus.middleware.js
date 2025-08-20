import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import userService from '../services/user.service.js';

/**
 * Auth status Middleware
 * Set signIn true/false based on token, Help toggle sign-in/sing-out button in UI.
 */
export default async function authStatus(req, res, next) {
  const { token } = req.cookies;
  res.locals.signedIn = !!token;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      // Get user info from DB by decoded id
      const user = await userService.getUserDetails(decoded._id);

      // Append user info
      res.locals.user = {
        _id: user._id,
        signedIn: true,
        name: user.name,
        username: user.username,
        photo: {
          url: user.photo.url,
        },
        verified: user.verified,
      };
    } catch (error) {
      res.clearCookie('token');
      res.locals.signedIn = false;
      next(error);
    }
  }

  next();
}
