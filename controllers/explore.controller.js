import striptags from 'striptags';
import handleError from '../utils/handleError.utils.js';
import blogService from '../services/blog.service.js';

export async function renderExplorePage(req, res) {
  const { nonce } = res.locals;
  const metaData = {
    title: 'Explore Blogs',
    description: 'Discover and explore blog posts on various topics.',
  };

  try {
    // Get query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';
    const tags = req.query.tags
      ? Array.isArray(req.query.tags)
        ? req.query.tags
        : [req.query.tags]
      : [];
    const search = req.query.search || '';

    // Get blogs with filters
    const { blogs, pagination } = await blogService.getBlogsWithFilters({
      page,
      limit,
      sortBy,
      sortOrder,
      tags,
      search,
    });

    // Get all tags with count for the filter sidebar
    const tagsWithCount = await blogService.getTagsWithCount();

    // Strip HTML from descriptions
    const sanitizedBlogs = blogs.map((blog) => ({
      ...blog,
      descriptions: striptags(blog.descriptions.substring(0, 500)), // Limit to 500 characters
    }));

    const bundle = {
      nonce,
      metaData,
      blogs: sanitizedBlogs,
      pagination,
      currentRoute: '/explore',
      filters: {
        sortBy,
        sortOrder,
        tags,
        search,
      },
      availableTags: tagsWithCount,
      sortOptions: [
        { value: 'createdAt', label: 'Date' },
        { value: 'title', label: 'Title' },
        { value: 'likes', label: 'Popularity' },
      ],
    };

    res.render('pages/explore', bundle);
  } catch (error) {
    handleError(res, error);
  }
}
