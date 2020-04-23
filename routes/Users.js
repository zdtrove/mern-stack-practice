const router = require('express').Router();
const { check, body } = require('express-validator');
const { validateRegister, validateLogin, validateUpdateUser } = require('../middlewares/validator');
const UsersController = require('../controllers/UsersController');
const auth = require('../middlewares/auth');

router.get('/', auth, UsersController.loadAuth);

router.get('/user/:userId', auth, UsersController.getUser);

router.put('/user/:userId', auth, validateUpdateUser(), UsersController.updateUser);

router.delete('/user/:userId', auth, UsersController.deleteUser);

router.get('/users', auth, UsersController.getUsers);

router.get('/users/insertUsers', auth, UsersController.insertUsers);

router.post('/register', validateRegister(), UsersController.register);

router.post('/login', validateLogin(), UsersController.login);

module.exports = router;