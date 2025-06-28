import express from 'express';

import { findBlogs } from '../controllers/blog.controller.js';

const indexRouter = express.Router();

/* GET home page & all blogs */
indexRouter.route('/').get(findBlogs);

export default indexRouter;
