import express from 'express';
import searchBlogs from '../controllers/search.controller.js';

const searchRouter = express.Router();

// Search Route
searchRouter.route('/').post(searchBlogs);

export default searchRouter;
