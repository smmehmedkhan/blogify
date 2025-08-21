import User from '../models/user.model.js';
import Blog from '../models/blog.model.js';

class UserService {
  /**
   * Get all blogs for a specific user
   */
  async getUserDetails(userId) {
    const user = await User.findById(userId).select(
      '-password -emailVerificationToken -emailVerificationExpires -resetPasswordToken -resetPasswordExpires -passwordResetUsed -createdAt -updatedAt -__v',
    );

    return user;
  }

  /**
   * Get all blogs for a specific user
   */
  async updateUserDetails(userId, updateData) {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Delete user
   */
  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  }

  /**
   * Get all blogs for a specific user
   */
  async previewUserDetails(username) {
    const userDetails = await User.findOne({ username }).select(
      '-password -emailVerificationToken -emailVerificationExpires -resetPasswordToken -resetPasswordExpires -passwordResetUsed -createdAt -updatedAt -__v',
    );

    return userDetails;
  }

  /**
   * Get all blogs for a specific user
   */
  async follow(userDetails, targetUser) {
    const userId = userDetails._id;
    const targetUserId = targetUser._id;

    // Update targeted user followers & user following list
    await targetUser.updateOne({ $addToSet: { followers: userId } });
    await userDetails.updateOne({ $addToSet: { following: targetUserId } });

    return true;
  }

  /**
   * Get all blogs for a specific user
   */
  async unfollow(userDetails, targetUser) {
    const userId = userDetails._id;
    const targetUserId = targetUser._id;

    // Update targeted user followers & user following list
    await targetUser.updateOne({ $pull: { followers: userId } });
    await userDetails.updateOne({ $pull: { following: targetUserId } });

    return true;
  }

  /**
   * Get user's most liked posts
   * Find blogs by user, sort by likes descending, limit results
   */
  async getUserPosts(userId, limit = 6) {
    const posts = await Blog.find({ userId })
      .sort({ likes: -1 })
      .limit(limit)
      .exec();

    return posts;
  }

  /**
   * Get all blogs for a specific user
   */
  async getUserBlogs(userId) {
    const blogs = await Blog.find({ userId }).sort({ createdAt: -1 });
    return blogs;
  }

  /**
   * Create a new blog for a user
   */
  async createBlog(blogData) {
    const blog = await Blog.create(blogData);

    // Update user post array
    await User.findByIdAndUpdate(blogData.userId, {
      $push: { posts: blog._id },
    });

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
    const blog = await Blog.findById(blogId);

    // Remove blog ID from user.post
    if (blog) {
      await User.findByIdAndUpdate(blog.userId, {
        $pull: { posts: blogId },
      });
    }
    return await Blog.findByIdAndDelete(blogId);
  }
}

export default new UserService();
