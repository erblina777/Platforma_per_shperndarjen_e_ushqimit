const Promotions = require('../models/promotions');

// GET all
const MerrPromotions = (req, res) => {
  res.json([]);
};

// GET by id
const MerrPromotionById = (req, res) => {
  res.json({});
};

// POST
const ShtoPromotion = (req, res) => {
  const promotion = new Promotions(
    null,
    req.body.title,
    req.body.description,
    req.body.discount,
    req.body.start_date,
    req.body.end_date
  );

  res.status(201).json(promotion);
};

// PUT
const NdryshoPromotion = (req, res) => {
  const promotion = new Promotions(
    req.params.id,
    req.body.title,
    req.body.description,
    req.body.discount,
    req.body.start_date,
    req.body.end_date
  );

  res.json(promotion);
};

// DELETE
const FshijPromotion = (req, res) => {
  res.json({ message: "Promotion u fshi me sukses" });
};

module.exports = {
  MerrPromotions,
  MerrPromotionById,
  ShtoPromotion,
  NdryshoPromotion,
  FshijPromotion
};