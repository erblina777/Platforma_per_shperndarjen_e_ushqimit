const router = require('express').Router();

const usersController = require('../controllers/users');
const usersMiddleware = require('../middlewares/users');

router.get('/', usersController.MerrUserat);
router.get('/:id', usersController.MerrUserById);

router.post(
  '/',
  usersMiddleware.validateUser,
  usersMiddleware.verifyUser,
  usersController.ShtoUser
);

router.put(
  '/:id',
  usersMiddleware.validateUser,
  usersController.NdryshoUser
);
router.put("/change-password/:id", (req,res,next)=>{
    console.log("CHANGE PASSWORD HIT");
    next();
}, usersController.changePassword);
router.delete('/:id', usersController.FshijUser);

module.exports = router;