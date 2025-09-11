import Review from '../models/Review.js';
import Car from '../models/Car.js';
import mongoose from 'mongoose';

// Create a new review
const createReview = async (req, res) => {
  try {
    const { carId, rating, comment } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!carId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Car ID, rating, and comment are required'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Check if user has already reviewed this car
    const existingReview = await Review.findOne({ user: userId, car: carId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this car'
      });
    }

    // Create new review
    const review = new Review({
      user: userId,
      car: carId,
      rating,
      comment
    });

    await review.save();

    // Populate user data for response
    await review.populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      review
    });

  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get reviews for a specific car
const getCarReviews = async (req, res) => {
  try {
    const { carId } = req.params;

    // Validate car ID
    if (!carId) {
      return res.status(400).json({
        success: false,
        message: 'Car ID is required'
      });
    }

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Get reviews with user data
    const reviews = await Review.find({ car: carId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
      totalReviews: reviews.length
    });

  } catch (error) {
    console.error('Error fetching car reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get user's reviews
const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id;

    const reviews = await Review.find({ user: userId })
      .populate('car', 'brand model image')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
      totalReviews: reviews.length
    });

  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Rating and comment are required'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Find and update review
    const review = await Review.findOneAndUpdate(
      { _id: reviewId, user: userId },
      { rating, comment },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or you are not authorized to update it'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      review
    });

  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findOneAndDelete({
      _id: reviewId,
      user: userId
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or you are not authorized to delete it'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get review statistics for a car
const getCarReviewStats = async (req, res) => {
  try {
    const { carId } = req.params;

    // Convert string ID to ObjectId
    const objectId = new mongoose.Types.ObjectId(carId);

    const stats = await Review.aggregate([
      { $match: { car: objectId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
          ratingDistribution: {
            $push: '$rating'
          }
        }
      }
    ]);

    if (stats.length === 0) {
      return res.status(200).json({
        success: true,
        stats: {
          averageRating: 0,
          totalReviews: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        }
      });
    }

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    stats[0].ratingDistribution.forEach(rating => {
      ratingDistribution[rating]++;
    });

    res.status(200).json({
      success: true,
      stats: {
        averageRating: Math.round(stats[0].averageRating * 10) / 10,
        totalReviews: stats[0].totalReviews,
        ratingDistribution
      }
    });

  } catch (error) {
    console.error('Error fetching review stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export {
  createReview,
  getCarReviews,
  getUserReviews,
  updateReview,
  deleteReview,
  getCarReviewStats
};
