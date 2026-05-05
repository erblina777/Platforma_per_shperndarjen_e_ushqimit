const express = require('express');
const router = express.Router();
const controller = require('../controllers/Deliveries');

router.get('/', controller.MerrDeliveries);
router.get('/:id', controller.MerrDeliveryById);
router.post('/', controller.ShtoDelivery);
router.put('/:id', controller.NdryshoDelivery);
router.delete('/:id', controller.FshijDelivery);

module.exports = router;