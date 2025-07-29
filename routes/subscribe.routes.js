import express from 'express';

import { contactLimiter } from '../utils/rateLimit.utils.js';
import storeReturnTo from '../middlewares/sessionManager.middleware.js';
import { subscribe } from '../controllers/subscribe.controller.js';

const subscribeRouter = express.Router();

subscribeRouter.post('/', contactLimiter, storeReturnTo, subscribe);

export default subscribeRouter;
