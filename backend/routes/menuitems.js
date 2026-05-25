const router = require('express').Router();
const ctrl = require('../controllers/menuitems');
const upload = require("../middlewares/upload");

router.get('/', ctrl.getAll);
router.get("/restaurant/:restaurantId", ctrl.getByRestaurantId);
router.get('/:id', ctrl.getById);
router.post("/",upload.single("foto"), ctrl.create);
router.put("/:id",upload.single("foto"), ctrl.update);

router.delete("/:id", ctrl.delete);

module.exports = router;