const router = require('express').Router();
const controller = require('../controllers/promotions');

router.get('/', controller.MerrPromotions);
router.get('/:id', controller.MerrPromotionById);
router.post('/', controller.ShtoPromotion);
router.put('/:id', controller.NdryshoPromotion);
router.delete('/:id', controller.FshijPromotion);

module.exports = router;