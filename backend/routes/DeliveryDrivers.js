const express = require('express');
const router = express.Router();
const controller = require('../controllers/DeliveryDrivers');

router.get('/', controller.MerrDrivers);
router.get('/:id', controller.MerrDriverById);
router.post('/', controller.ShtoDriver);
router.put('/:id', controller.NdryshoDriver);
router.delete('/:id', controller.FshijDriver);

module.exports = router;