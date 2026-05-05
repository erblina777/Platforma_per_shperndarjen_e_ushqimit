const router = require('express').Router();
const controller = require('../controllers/reviews');
const { validateReview } = require('../middlewares/reviews');

router.get('/', controller.MerrReviews);
router.get('/:id', controller.MerrReviewById);
router.post('/', validateReview, controller.ShtoReview);
router.put('/:id', validateReview, controller.NdryshoReview);
router.delete('/:id', controller.FshijReview);

module.exports = router;