const router = require('express').Router();
const controller = require('../controllers/userroles');

router.get('/', controller.MerrUserRoles);
router.get('/user/:user_id', controller.MerrUserRolesByUser);
router.post('/', controller.ShtoUserRole);
router.delete('/:id', controller.FshijUserRole);

module.exports = router;