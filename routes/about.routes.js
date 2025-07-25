import express from 'express';
import storeReturnTo from '../middlewares/sessionManager.middleware.js';

const aboutRouter = express.Router();

aboutRouter.get('/', storeReturnTo, (_req, res) => {
  res.render('pages/about', { title: 'About us', currentRoute: '/about' });
});

export default aboutRouter;
