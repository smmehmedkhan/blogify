import Blog from '../models/blog.model.js';

class BlogService {
  /**
   * Get blogs with pagination
   */
  async getBlogs(page = 1, limit = 12) {
    const totalBlogs = await Blog.countDocuments();
    const totalPages = Math.ceil(totalBlogs / limit);
    const currentPage = Math.min(Math.max(1, page), totalPages || 1);
    const skipValue = (currentPage - 1) * limit;

    const blogs = await Blog.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skipValue },
      { $limit: limit },
    ]).exec();

    return {
      blogs,
      pagination: {
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        nextPage: currentPage < totalPages ? currentPage + 1 : null,
        prevPage: currentPage > 1 ? currentPage - 1 : null,
      },
    };
  }

  /**
   * Get a single blog by ID
   */
  async getBlogById(id) {
    return await Blog.findById(id).populate('userId', 'username');
  }
  
  /**
   * Get blogs with advanced filtering, sorting, and pagination
   */
  async getBlogsWithFilters({
    page = 1,
    limit = 12,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    tags = [],
    search = '',
  }) {
    const query = {};

    // Apply tag filtering if provided
    if (tags && tags.length > 0) {
      query.tags = { $in: tags.map((tag) => tag.toLowerCase()) };
    }

    // Apply search if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { descriptions: { $regex: search, $options: 'i' } },
      ];
    }

    // Calculate pagination values
    const totalBlogs = await Blog.countDocuments(query);
    const totalPages = Math.ceil(totalBlogs / limit);
    const currentPage = Math.min(Math.max(1, page), totalPages || 1);
    const skipValue = (currentPage - 1) * limit;

    // Determine sort direction
    const sortDirection = sortOrder.toLowerCase() === 'asc' ? 1 : -1;

    // Get blogs with filters and sorting
    const blogs = await Blog.find(query)
      .sort({ [sortBy]: sortDirection })
      .skip(skipValue)
      .limit(limit)
      .populate('userId', 'username')
      .lean();

    return {
      blogs,
      pagination: {
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        nextPage: currentPage < totalPages ? currentPage + 1 : null,
        prevPage: currentPage > 1 ? currentPage - 1 : null,
      },
    };
  }

  /**
   * Get all unique tags used in blogs with count
   */
  async getTagsWithCount() {
    return await Blog.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { _id: 0, name: '$_id', count: 1 } },
    ]);
  }

  /**
   * Toggle like on a blog
   */
  async toggleLike(blogId, userId) {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new Error('Blog not found');
    }

    // Check if user already liked this blog
    const alreadyLiked = blog.likes.includes(userId);

    // If already liked, remove the like
    if (alreadyLiked) {
      return await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { likes: userId } },
        { new: true },
      );
    }

    // If user has disliked, remove the dislike
    if (blog.dislikes.includes(userId)) {
      await Blog.findByIdAndUpdate(blogId, { $pull: { dislikes: userId } });
    }

    // Add the like
    return await Blog.findByIdAndUpdate(
      blogId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
  }

  /**
   * Toggle dislike on a blog
   */
  async toggleDislike(blogId, userId) {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new Error('Blog not found');
    }

    // Check if user already disliked this blog
    const alreadyDisliked = blog.dislikes.includes(userId);

    // If already disliked, remove the dislike
    if (alreadyDisliked) {
      return await Blog.findByIdAndUpdate(
        blogId,
        { $pull: { dislikes: userId } },
        { new: true },
      );
    }

    // If user has liked, remove the like
    if (blog.likes.includes(userId)) {
      await Blog.findByIdAndUpdate(blogId, { $pull: { likes: userId } });
    }

    // Add the dislike
    return await Blog.findByIdAndUpdate(
      blogId,
      { $addToSet: { dislikes: userId } },
      { new: true },
    );
  }

  /**
   * Increment share count for a blog
   */
  async incrementShareCount(blogId) {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new Error('Blog not found');
    }

    return await Blog.findByIdAndUpdate(
      blogId,
      { $inc: { shareCount: 1 } },
      { new: true },
    );
  }
}

export default new BlogService();
