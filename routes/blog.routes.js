import express from 'express';

import * as bc from '../controllers/blog.controller.js';
import * as cc from '../controllers/comment.controller.js';
import auth from '../middlewares/auth.middleware.js';
import loginLimiter from '../utils/loginLimiter.utils.js';

const router = express.Router();

// Get a single blog
router.get('/:id', bc.findABlog);

// Like/dislike routes (require authentication)
router.post('/:id/like', auth, loginLimiter, bc.toggleLike);
router.post('/:id/dislike', auth, loginLimiter, bc.toggleDislike);
router.post('/:id/share', loginLimiter, bc.incrementShareCount);

// Comment routes
router.get('/:id/comments', cc.getComments);
router.post('/:id/comments', auth, loginLimiter, cc.createComment);
router.delete('/:id/comments/:commentId', auth, loginLimiter, cc.deleteComment);

export default router;
