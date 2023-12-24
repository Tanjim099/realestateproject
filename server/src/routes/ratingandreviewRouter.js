import {Router} from 'express';
import { createRating, getAllRating, getAverageRating } from '../controllers/ratingandrevieController.js';
import { requiredSignIn } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/create/:projectId',createRating);
router.get('/avgRating/:projectId',getAverageRating);
router.get('/allRating',getAllRating);

export default router;