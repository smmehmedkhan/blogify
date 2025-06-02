import mongoose from 'mongoose';

/**
 * Comment Model
 * Define schema to store comments data to the database for Blogs.
 */
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Blog',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
