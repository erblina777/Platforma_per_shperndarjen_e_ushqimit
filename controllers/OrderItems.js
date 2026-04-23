const OrderItems = require('../models/orderitems');

const MerrOrderItems = (req, res) => {
  OrderItems.findAll((err, data) => {
    if (err) return res.status(500).json(err);

    return res.json(data);
  });
};

const MerrOrderItemById = (req, res) => {
  OrderItems.findById(req.params.id, (data) => {
    if (!data) return res.status(404).send("Nuk u gjet");
    res.json(data);
  });
};

const ShtoOrderItem = (req, res) => {
  const item = new OrderItems(
    null,
    req.body.order_id,
    req.body.menu_item_id,
    req.body.sasia,
    req.body.cmimi,
    req.body.shenimet
  );

  OrderItems.create(item, (data) => res.status(201).json(data));
};

const NdryshoOrderItem = (req, res) => {
  const item = new OrderItems(
    req.params.id,
    req.body.order_id,
    req.body.menu_item_id,
    req.body.sasia,
    req.body.cmimi,
    req.body.shenimet
  );

  OrderItems.update(item, (data) => res.json(data));
};

const FshijOrderItem = (req, res) => {
  OrderItems.deleteById(req.params.id, () => {
    res.json({ message: "OrderItem u fshi" });
  });
};

module.exports = {
  MerrOrderItems,
  MerrOrderItemById,
  ShtoOrderItem,
  NdryshoOrderItem,
  FshijOrderItem
};