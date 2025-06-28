import mongoose from 'mongoose';
import slugify from 'slugify';

/**
 * Blog Models
 * Define schema for storing data about blogs to the database
 */
const Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    coverImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    featuredImage: {
      public_id: String,
      url: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    shareCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

blogSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
