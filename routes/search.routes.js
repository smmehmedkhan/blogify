import express from 'express';

import { searchLimiter } from '../utils/rateLimit.utils.js';
import searchBlogs from '../controllers/search.controller.js';

const searchRouter = express.Router();

// Search Route
searchRouter.route('/').post(searchLimiter, searchBlogs);

export default searchRouter;
