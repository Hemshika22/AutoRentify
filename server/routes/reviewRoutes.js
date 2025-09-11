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
import { protect } from '../middleware/auth.js';

// Public routes
router.get('/car/:carId', getCarReviews);
router.get('/car/:carId/stats', getCarReviewStats);

// Protected routes (require authentication)
router.post('/create', protect, createReview);
router.get('/user', protect, getUserReviews);
router.put('/:reviewId', protect, updateReview);
router.delete('/:reviewId', protect, deleteReview);

export default router;
