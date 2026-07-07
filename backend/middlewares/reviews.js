const validateReview = (req, res, next) => {
  const { order_id, user_id, restaurant_id, vleresimi, komenti } = req.body;

  if (!order_id || !user_id || !restaurant_id) {
    return res.status(400).json({
      message: "order_id, user_id dhe restaurant_id janë të detyrueshme"
    });
  }

  if (vleresimi < 1 || vleresimi > 5) {
    return res.status(400).json({
      message: "Vleresimi duhet të jetë nga 1 deri në 5"
    });
  }

  next();
};

module.exports = {
  validateReview
};