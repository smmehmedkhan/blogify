import express from 'express';
import { renderContactPage, submitContactForm } from '../controllers/contact.controller.js';
import { verifyToken } from '../middlewares/csrf.middleware.js';

const contactRouter = express.Router();

// Render contact page
contactRouter.get('/', renderContactPage);

// Handle contact form submission
contactRouter.post('/', verifyToken, submitContactForm);

export default contactRouter;