import handleError from '../utils/handleError.utils.js';
import searchService from '../services/search.service.js';

/**
 * Search for blogs based on search term
 */
export default async function searchBlogs(req, res) {
  let searches = req.body.searches;

  try {
    const data = await searchService.searchBlogs(searches);

    return res.render('partials/search-results', {
      data,
    });
  } catch (error) {
    handleError(res, error);
  }
}
