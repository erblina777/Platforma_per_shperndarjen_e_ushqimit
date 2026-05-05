const express = require('express');
const router = express.Router();
const controller = require('../controllers/OrderItems');

router.get('/', controller.MerrOrderItems);
router.get('/:id', controller.MerrOrderItemById);
router.post('/', controller.ShtoOrderItem);
router.put('/:id', controller.NdryshoOrderItem);
router.delete('/:id', controller.FshijOrderItem);

module.exports = router;