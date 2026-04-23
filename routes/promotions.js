const express = require('express');
const router = express.Router();

const {
  MerrPromotions,
  MerrPromotionById,
  ShtoPromotion,
  NdryshoPromotion,
  FshijPromotion
} = require('../controllers/promotions');

// GET all
router.get('/', MerrPromotions);

// GET by id
router.get('/:id', MerrPromotionById);

// POST
router.post('/', ShtoPromotion);

// PUT
router.put('/:id', NdryshoPromotion);

// DELETE
router.delete('/:id', FshijPromotion);

module.exports = router;