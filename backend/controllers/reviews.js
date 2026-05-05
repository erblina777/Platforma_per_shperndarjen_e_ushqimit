const Reviews = require('../models/reviews');

const MerrReviews = (req, res) => {
  Reviews.findAll((data) => res.json(data));
};

const MerrReviewById = (req, res) => {
  Reviews.findById(req.params.id, (data) => {
    if (!data) return res.status(404).send("Review nuk u gjet");
    res.json(data);
  });
};

const ShtoReview = (req, res) => {
  const review = new Reviews(
    null,
    req.body.order_id,
    req.body.user_id,
    req.body.restaurant_id,
    req.body.vleresimi,
    req.body.komenti
  );

  Reviews.create(review, (data) => res.status(201).json(data));
};

const NdryshoReview = (req, res) => {
  const review = new Reviews(
    req.params.id,
    req.body.order_id,
    req.body.user_id,
    req.body.restaurant_id,
    req.body.vleresimi,
    req.body.komenti
  );

  Reviews.update(review, (data) => res.json(data));
};

const FshijReview = (req, res) => {
  Reviews.deleteById(req.params.id, () => {
    res.json({ message: "Review u fshi me sukses" });
  });
};

module.exports = {
  MerrReviews,
  MerrReviewById,
  ShtoReview,
  NdryshoReview,
  FshijReview
};