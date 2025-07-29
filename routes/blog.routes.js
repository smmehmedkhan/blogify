import express from 'express';

import authStatus from '../middlewares/authStatus.middleware.js';
import auth from '../middlewares/auth.middleware.js';
import { commentLimiter, likeLimiter } from '../utils/rateLimit.utils.js';
import * as blogController from '../controllers/blog.controller.js';
import * as commentController from '../controllers/comment.controller.js';
import storeReturnTo from '../middlewares/sessionManager.middleware.js';

const router = express.Router();

// Get a single blog
router.get('/:id', storeReturnTo, authStatus, blogController.findABlog);

// Like/dislike routes (require authentication)
router.post('/:id/like', auth, likeLimiter, blogController.toggleLike);
router.post('/:id/dislike', auth, likeLimiter, blogController.toggleDislike);
router.post('/:id/share', likeLimiter, blogController.incrementShareCount);

// Comment routes
router.get('/:id/comments', commentController.getComments);
router.post(
  '/:id/comments',
  auth,
  commentLimiter,
  commentController.createComment,
);
router.delete(
  '/:id/comments/:commentId',
  auth,
  commentLimiter,
  commentController.deleteComment,
);

export default router;
