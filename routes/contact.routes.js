import express from 'express';

const contactRouter = express.Router();

contactRouter.get('/', (_req, res) => {
  res.render('pages/contact', {
    title: 'Contact us',
    currentRoute: '/contact',
  });
});

export default contactRouter;
