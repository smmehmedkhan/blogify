import Blog from '../models/blog.model.js';

class SearchService {
  /**
   * Search blogs by title or description
   */
  async searchBlogs(searchTerm) {
    if (!searchTerm) {
      return await Blog.find({}).limit(18);
    }

    const filter = searchTerm.replace(/[^a-zA-Z0-9]/g, '');

    const serchBlogs = {
      $or: [
        { title: { $regex: new RegExp(filter, 'i') } },
        { descriptions: { $regex: new RegExp(filter, 'i') } },
      ],
    };

    return await Blog.find(serchBlogs);
  }
}

export default new SearchService();
