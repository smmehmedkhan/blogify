import express from 'express';

import auth from '../middlewares/auth.middleware.js';
import { imageUploadLimiter } from '../utils/rateLimit.utils.js';
import upload from '../middlewares/upload.middleware.js';
import { uploadImage } from '../controllers/image.controller.js';

const imageRouter = express.Router();
imageRouter.post(
  '/upload',
  auth,
  imageUploadLimiter,
  upload.single('file'),
  uploadImage,
);

export default imageRouter;
