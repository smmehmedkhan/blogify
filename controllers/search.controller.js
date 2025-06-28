import handleError from '../utils/handleError.utils.js';
import searchService from '../services/search.service.js';

/**
 * Search for blogs based on search term
 */
export default async function searchBlogs(req, res) {
  const nonce = res.locals.nonce;
  let searchQuery = req.body.searchTerm || req.body.search_input;

  try {
    const blogs = await searchService.searchBlogs(searchQuery);

    // Check AJAX request
    if (req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest') {
      return res.json({ blogs });
    } else {
      return res.render('pages/index', {
        nonce,
        blogs,
        currentPage: 1,
        totalPages: 1,
      });
    }
  } catch (error) {
    if (req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest') {
      return res.status(500).json({ error: error.message });
    }

    handleError(res, error);
  }
}
