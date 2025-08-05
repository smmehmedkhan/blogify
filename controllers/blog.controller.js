import striptags from 'striptags';

import handleError from '../utils/handleError.utils.js';
import blogService from '../services/blog.service.js';
import commentService from '../services/comment.service.js';

/**
 * Get all blogs with pagination
 */
export async function findBlogs(req, res) {
  const nonce = res.locals.nonce;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const search = req.query.search || '';
  const locals = {
    title: 'Blogify',
    description:
      'A modern blogging platform built with NodeJs, Express & MongoDB.',
  };

  try {
    const { blogs, pagination } = await blogService.getBlogs(
      page,
      limit,
      search,
    );

    // Strip HTML from descriptions
    const sanitizedBlogs = blogs.map((blog) => ({
      ...blog,
      descriptions: striptags(blog.descriptions),
    }));

    if (blogs.length === 0 && page === 1) {
      const bundle = {
        nonce,
        locals,
        blogs: [],
        current: 1,
        nextPage: null,
        prevPage: null,
        totalPages: 0,
      };
      return res.render('pages/index', bundle);
    }

    const bundle = {
      locals,
      blogs: sanitizedBlogs,
      current: pagination.currentPage,
      nextPage: pagination.nextPage,
      prevPage: pagination.prevPage,
      totalPages: pagination.totalPages,
      currentRoute: '/',
    };

    return res.render('pages/index', bundle);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 * Get a single blog by ID
 */
export async function findABlog(req, res) {
  const blogId = req.params.id;
  const nonce = res.locals.nonce;

  try {
    const blog = await blogService.getBlogById(blogId);
    const comments = await commentService.getCommentsByBlogId(blogId);

    const userId = res.locals?.user?._id || null; // Check user sign-in
    const userLiked = userId ? blog.likes.includes(userId) : false;
    const userDisliked = userId ? blog.dislikes.includes(userId) : false;
    const metaData = {
      title: blog.title,
      description: striptags(blog.descriptions),
    };

    const bundle = {
      nonce,
      metaData,
      blog,
      comments: comments.length > 0 ? comments : [],
      userLiked,
      userDisliked,
      userId,
      currentRoute: '/blog',
    };

    return res.render('pages/blog', bundle);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 * Toggle like on a blog
 */
export async function toggleLike(req, res) {
  const blogId = req.params.id;
  const userId = req.user._id;

  try {
    const updatedBlog = await blogService.toggleLike(blogId, userId);
    const data = {
      likes: updatedBlog.likes.length,
      dislikes: updatedBlog.dislikes.length,
      userLiked: updatedBlog.likes.includes(userId),
      userDisliked: updatedBlog.dislikes.includes(userId),
    };

    return res.status(200).json(data);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 * Toggle dislike on a blog
 */
export async function toggleDislike(req, res) {
  const blogId = req.params.id;
  const userId = req.user._id;

  try {
    const updatedBlog = await blogService.toggleDislike(blogId, userId);
    const data = {
      likes: updatedBlog.likes.length,
      dislikes: updatedBlog.dislikes.length,
      userLiked: updatedBlog.likes.includes(userId),
      userDisliked: updatedBlog.dislikes.includes(userId),
    };

    return res.status(200).json(data);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 * Increment share count for a blog
 */
export async function incrementShareCount(req, res) {
  const blogId = req.params.id;

  try {
    const updatedBlog = await blogService.incrementShareCount(blogId);
    const data = {
      shareCount: updatedBlog.shareCount,
    };

    return res.status(200).json(data);
  } catch (error) {
    handleError(res, error);
  }
}