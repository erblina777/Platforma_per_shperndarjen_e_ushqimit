const express = require("express");
const router = express.Router();
const menuItemsController = require("../controllers/menuitems");
router.get("/", menuItemsController.getAll);
router.get("/restaurant/:restaurantId", menuItemsController.getByRestaurantId);
router.get("/:id", menuItemsController.getById);
router.post("/", menuItemsController.create);
router.put("/:id", menuItemsController.update);
router.delete("/:id", menuItemsController.delete);

module.exports = router;