const express = require('express');
const router = express.Router();

const {
  MerrAddresses,
  MerrAddressById,
  ShtoAddress,
  NdryshoAddress,
  FshijAddress
} = require('../controllers/addresses');

router.get('/', MerrAddresses);
router.get('/:id', MerrAddressById);
router.post('/', ShtoAddress);
router.put('/:id', NdryshoAddress);
router.delete('/:id', FshijAddress);

module.exports = router;