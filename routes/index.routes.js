import express from 'express';

import { findBlogs } from '../controllers/blog.controller.js';
import storeReturnTo from '../middlewares/sessionManager.middleware.js';

const indexRouter = express.Router();

/* GET home page & all blogs */
indexRouter.route('/').get(storeReturnTo, findBlogs);

export default indexRouter;
