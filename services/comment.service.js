import Comment from '../models/comment.model.js';

class CommentService {
  /**
   * Create a new comment
   */
  async createComment(content, blogId, userId) {
    const comment = new Comment({
      content,
      blogId,
      userId,
    });

    return await comment.save();
  }

  /**
   * Get all comments for a blog
   */
  async getCommentsByBlogId(blogId) {
    return await Comment.find({ blogId })
      .populate('userId', 'username')
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Delete a comment
   */
  async deleteComment(commentId, userId) {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.userId.toString() !== userId) {
      throw new Error('Unauthorized to delete this comment');
    }

    return await Comment.findByIdAndDelete(commentId);
  }
}

export default new CommentService();
