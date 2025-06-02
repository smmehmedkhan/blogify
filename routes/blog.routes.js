import express from 'express';

import * as bc from '../controllers/blog.controller.js';
import * as cc from '../controllers/comment.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

// Get a single blog
router.get('/:id', bc.findABlog);

// Like/dislike routes (require authentication)
router.post('/:id/like', auth, bc.toggleLike);
router.post('/:id/dislike', auth, bc.toggleDislike);
router.post('/:id/share', bc.incrementShareCount);

// Comment routes
router.get('/:id/comments', cc.getComments);
router.post('/:id/comments', auth, cc.createComment);
router.delete('/:id/comments/:commentId', auth, cc.deleteComment);

export default router;
