import handleError from '../utils/handleError.utils.js';
import commentService from '../services/comment.service.js';

/**
 * Create a new comment
 */
export async function createComment(req, res) {
  const { content } = req.body;
  const blogId = req.params.id;
  const userId = req.user._id;

  try {
    const comment = await commentService.createComment(content, blogId, userId);

    req.flash('success', 'Comment created successfully');
    return res.status(201).json(comment);
  } catch (error) {
    req.flash('error', error.message);
    handleError(res, error);
  }
}

/**
 * Get all comments for a blog
 */
export async function getComments(req, res) {
  const blogId = req.params.id;

  try {
    const comments = await commentService.getCommentsByBlogId(blogId);

    return res.status(200).json(comments);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 * Delete a comment
 */
export async function deleteComment(req, res) {
  console.log('req.params:', req.params);
  console.log('req.user:', req.user);

  const userId = req.user._id;
  const commentId = req.params.commentId;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await commentService.deleteComment(commentId, userId);

    req.flash('success', 'Comment deleted successfully');
    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    req.flash('error', error.message);
    handleError(res, error);
  }
}
