import express from 'express';

import { verifyToken } from '../middlewares/csrf.middleware.js';
import loginLimiter from '../utils/loginLimiter.utils.js';
import {
  renderContactPage,
  submitContactForm,
} from '../controllers/contact.controller.js';
import storeReturnTo from '../middlewares/sessionManager.middleware.js';

const contactRouter = express.Router();

// Render contact page
contactRouter.get('/', storeReturnTo, renderContactPage);

// Handle contact form submission
contactRouter.post('/', verifyToken, loginLimiter, submitContactForm);

export default contactRouter;
