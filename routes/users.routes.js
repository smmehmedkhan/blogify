import express from 'express';

import {
  followLimiter,
  likeLimiter,
  postCreationLimiter,
  profileUpdateLimiter,
} from '../utils/rateLimit.utils.js';
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
    profileUpdateLimiter,
    verifyToken,
    uc.userProfileUpdate,
  );

userRouter.route('/delete/:id').delete(auth, uc.deleteUser);

userRouter.get('/dashboard', auth, emailVerification, uc.userDashboard);

userRouter
  .route('/dashboard/add')
  .get(auth, uc.addBlogPage)
  .post(
    auth,
    upload.single('addPostCoverImage'),
    postCreationLimiter,
    verifyToken,
    uc.addABlog,
  );

userRouter
  .route('/dashboard/edit/:id')
  .get(auth, uc.updateBlogPage)
  .put(
    auth,
    upload.single('editPostCoverImage'),
    postCreationLimiter,
    verifyToken,
    uc.updateABlog,
  );

userRouter.delete('/dashboard/delete/:id', auth, likeLimiter, uc.deleteBlog);

userRouter.get('/:username', authStatus, uc.userProfilePreview);
userRouter.post('/:username/follow', auth, followLimiter, uc.followUser);
userRouter.post('/:username/unfollow', auth, followLimiter, uc.unfollowUser);

export default userRouter;
