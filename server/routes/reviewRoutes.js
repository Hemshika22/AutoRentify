import express from 'express';
const router = express.Router();
import {
  createReview,
  getCarReviews,
  getUserReviews,
  updateReview,
  deleteReview,
  getCarReviewStats
} from '../controllers/reviewController.js';
import auth from '../middleware/auth.js';

// Public routes
router.get('/car/:carId', getCarReviews);
router.get('/car/:carId/stats', getCarReviewStats);

// Protected routes (require authentication)
router.post('/create', auth, createReview);
router.get('/user', auth, getUserReviews);
router.put('/:reviewId', auth, updateReview);
router.delete('/:reviewId', auth, deleteReview);

export default router;
