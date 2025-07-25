import express from 'express';

import { renderExplorePage } from '../controllers/explore.controller.js';
import storeReturnTo from '../middlewares/sessionManager.middleware.js';

const exploreRouter = express.Router();

exploreRouter.get('/', storeReturnTo, renderExplorePage);

export default exploreRouter;
