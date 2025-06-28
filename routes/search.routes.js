import express from 'express';

import loginLimiter from '../utils/loginLimiter.utils.js';
import searchBlogs from '../controllers/search.controller.js';

const searchRouter = express.Router();

// Search Route
searchRouter.route('/').post(loginLimiter, searchBlogs);

export default searchRouter;
