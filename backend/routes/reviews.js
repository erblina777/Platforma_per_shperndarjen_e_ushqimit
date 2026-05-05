const express = require('express');
const router = express.Router();

const {
  MerrReviews,
  MerrReviewById,
  ShtoReview,
  NdryshoReview,
  FshijReview
} = require('../controllers/reviews');

const { validateReview } = require('../middlewares/reviews');

// GET - merr të gjitha reviews
router.get('/', MerrReviews);

// GET - merr review sipas ID
router.get('/:id', MerrReviewById);

// POST - shto review (me validim middleware)
router.post('/', validateReview, ShtoReview);

// PUT - përditëso review (me validim middleware)
router.put('/:id', validateReview, NdryshoReview);

// DELETE - fshij review
router.delete('/:id', FshijReview);

module.exports = router;