const router = require('express').Router();

const usersController = require('../controllers/users');
const usersMiddleware = require('../middlewares/users');

router.get('/', usersController.MerrUserat);
router.get('/:id', usersController.MerrUserById);

router.post('/',
  usersMiddleware.validateUser,
  usersMiddleware.verifyUser,
  usersController.ShtoUser
);

router.put('/:id',
  usersMiddleware.validateUser,
  usersController.NdryshoUser
);

router.delete('/:id', usersController.FshijUser);

module.exports = router;