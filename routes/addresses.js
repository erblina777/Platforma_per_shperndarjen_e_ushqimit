const router = require('express').Router();
const controller = require('../controllers/addresses');

router.get('/', controller.MerrAddresses);
router.get('/:id', controller.MerrAddressById);
router.post('/', controller.ShtoAddress);
router.put('/:id', controller.NdryshoAddress);
router.delete('/:id', controller.FshijAddress);

module.exports = router;