import Blog from '../models/blog.model.js';

class SearchService {
  /**
   * Search blogs by title or description
   */
  async searchBlogs(searchTerm) {
    // Check if searchTerm is undefined or null
    if (!searchTerm) {
      return await Blog.find({}).limit(10); // Return some default results
    }

    // Sanitize the search term
    const filter = searchTerm.replace(/[^a-zA-Z0-9]/g, '');

    // Create search query
    const findItem = {
      $or: [
        { title: { $regex: new RegExp(filter, 'i') } },
        { descriptions: { $regex: new RegExp(filter, 'i') } },
      ],
    };

    return await Blog.find(findItem);
  }
}

export default new SearchService();
