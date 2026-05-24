const Promotions = require('../models/promotions');


const MerrPromotions = (req, res) => {
  Promotions.findAll((data) => res.json(data));
};
const getByRestaurantId = (req, res) => {
  const id = req.params.id;

  Promotions.findByRestaurantId(id, (rows) => {
    res.json(rows);
  });
};

const MerrPromotionById = (req, res) => {
  Promotions.findById(req.params.id, (data) => {
    if (!data) return res.status(404).send("Promotion nuk u gjet");
    res.json(data);
  });
};


const ShtoPromotion = (req, res) => {
  const promotion = new Promotions(
    null,
    req.body.restaurant_id,
    req.body.kodi,
    req.body.zbritja_perqind,
    req.body.zbritja_max,
    req.body.data_fillimit,
    req.body.data_perfundimit,
    req.body.statusi
  );

  Promotions.create(promotion, (data) => res.status(201).json(data));
};


const NdryshoPromotion = (req, res) => {
  const promotion = new Promotions(
    req.params.id,
    req.body.restaurant_id,
    req.body.kodi,
    req.body.zbritja_perqind,
    req.body.zbritja_max,
    req.body.data_fillimit,
    req.body.data_perfundimit,
    req.body.statusi
  );

  Promotions.update(promotion, (data) => res.json(data));
};


const FshijPromotion = (req, res) => {
  Promotions.deleteById(req.params.id, () => {
    res.json({ message: "Promotion u fshi me sukses" });
  });
};

module.exports = {
  MerrPromotions,
  getByRestaurantId,
  MerrPromotionById,
  ShtoPromotion,
  NdryshoPromotion,
  FshijPromotion,
};