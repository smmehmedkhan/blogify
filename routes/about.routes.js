import express from 'express';

const aboutRouter = express.Router();

aboutRouter.get('/', (req, res) => {
  res.render('pages/about', { title: 'About us', currentRoute: '/about' });
});

export default aboutRouter;
