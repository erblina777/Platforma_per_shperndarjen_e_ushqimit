const router = require('express').Router();
const controller = require('../controllers/roles');

router.get('/', controller.MerrRolet);
router.get('/:id', controller.MerrRoleById);
router.post('/', controller.ShtoRole);
router.put('/:id', controller.NdryshoRole);
router.delete('/:id', controller.FshijRole);

module.exports = router;