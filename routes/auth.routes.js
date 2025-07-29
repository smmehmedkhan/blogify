import express from 'express';

import {
  passwordResetLimiter,
  signupLimiter,
  loginLimiter,
} from '../utils/rateLimit.utils.js';
import auth from '../middlewares/auth.middleware.js';
import signInChecker from '../middlewares/signInChecker.middleware.js';
import * as ac from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter
  .route('/sign-in')
  .get(signInChecker, ac.signInPage)
  .post(loginLimiter, ac.signIn);
authRouter.route('/sign-out').get(auth, ac.signOut);
authRouter
  .route('/sign-up')
  .get(signInChecker, ac.signUpPage)
  .post(signupLimiter, ac.signUp);
authRouter.route('/verify').get(auth, ac.verificationPage);
authRouter.route('/verify/:token').get(ac.verification);
authRouter
  .route('/verify/resend')
  .post(auth, passwordResetLimiter, ac.resendVerification);
authRouter
  .route('/forgot-password')
  .get(ac.forgotPasswordPage)
  .post(passwordResetLimiter, ac.forgotPassword);
authRouter
  .route('/reset-password/:token')
  .get(ac.resetPasswordPage)
  .post(passwordResetLimiter, ac.resetPassword);

export default authRouter;
