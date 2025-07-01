import express from 'express';
import * as tag from '../controllers/tag.controller.js';

const router = express.Router();

router.route('/').get(tag.getAllTags).post(tag.addTags);

export default router;
