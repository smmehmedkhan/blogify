import Blog from '../models/blog.model.js';

class UserService {
  /**
   * Get all blogs for a specific user
   */
  async getUserBlogs(userId) {
    return await Blog.find({ userId }).sort({ createdAt: -1 });
  }

  /**
   * Create a new blog for a user
   */
  async createBlog(blogData) {
    const blog = await Blog.create(blogData);
    return blog;
  }

  /**
   * Get a blog by ID
   */
  async getBlogById(blogId) {
    return await Blog.findById(blogId);
  }

  /**
   * Update a blog
   */
  async updateBlog(blogId, updateData) {
    return await Blog.findByIdAndUpdate(blogId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Delete a blog
   */
  async deleteBlog(blogId) {
    return await Blog.findByIdAndDelete(blogId);
  }
}

export default new UserService();
