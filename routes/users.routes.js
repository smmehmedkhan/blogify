import express from 'express';

import auth from '../middlewares/auth.middleware.js';
import * as uc from '../controllers/user.controller.js';
import singInChecker from '../middlewares/signInChecker.middleware.js';
import emailVerification from '../middlewares/verification.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const userRouter = express.Router();

userRouter.get('/', singInChecker, uc.userPanel);
userRouter.get('/dashboard', auth, emailVerification, uc.userDashboard);
userRouter
  .route('/dashboard/add')
  .get(auth, uc.addBlogPage)
  .post(auth, upload.single('blogImage'), uc.addABlog);
userRouter
  .route('/dashboard/edit/:id')
  .get(auth, uc.updateBlogPage)
  .put(auth, upload.single('blogImage'), uc.updateABlog);
userRouter.delete('/dashboard/delete/:id', auth, uc.deleteBlog);

export default userRouter;
