const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');
const auth = require('../middleware/auth');

// Submit a new rating
router.post('/', auth, async (req, res) => {
  try {
    const { userId, userType, rating } = req.body;
    
    const newRating = new Rating({
      userId,
      userType,
      rating,
      ratedBy: req.user.id
    });

    await newRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting rating' });
  }
});

// Get average rating for a user
router.get('/:userId', async (req, res) => {
  try {
    const ratings = await Rating.find({ userId: req.params.userId });
    
    if (ratings.length === 0) {
      return res.json({ averageRating: 0 });
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRating / ratings.length;

    res.json({ averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ratings' });
  }
});

module.exports = router;