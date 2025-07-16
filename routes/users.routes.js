import express from 'express';

import loginLimiter from '../utils/loginLimiter.utils.js';
import auth from '../middlewares/auth.middleware.js';
import * as uc from '../controllers/user.controller.js';
import emailVerification from '../middlewares/emailVerification.middleware.js';
import upload from '../middlewares/upload.middleware.js';
import { verifyToken } from '../middlewares/csrf.middleware.js';
import authStatus from '../middlewares/authStatus.middleware.js';

const userRouter = express.Router();

userRouter.route('/').get(auth, uc.userProfile);

userRouter
  .route('/edit/:id')
  .get(auth, uc.userProfileEdit)
  .post(
    auth,
    upload.single('photo'),
    loginLimiter,
    verifyToken,
    uc.userProfileUpdate,
  );

userRouter.get('/dashboard', auth, emailVerification, uc.userDashboard);

userRouter
  .route('/dashboard/add')
  .get(auth, uc.addBlogPage)
  .post(
    auth,
    upload.single('addPostCoverImage'),
    loginLimiter,
    verifyToken,
    uc.addABlog,
  );

userRouter
  .route('/dashboard/edit/:id')
  .get(auth, uc.updateBlogPage)
  .put(
    auth,
    upload.single('editPostCoverImage'),
    loginLimiter,
    verifyToken,
    uc.updateABlog,
  );

userRouter.delete('/dashboard/delete/:id', auth, loginLimiter, uc.deleteBlog);

userRouter.get('/:username', authStatus, uc.userProfilePreview);
userRouter.post('/:username/follow', auth, uc.followUser);
userRouter.post('/:username/unfollow', auth, uc.unfollowUser);

export default userRouter;
