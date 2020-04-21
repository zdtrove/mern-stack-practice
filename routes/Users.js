const router = require('express').Router();
const { check, body } = require('express-validator');
const { validateRegister, validateLogin } = require('../middlewares/validator');
const UsersController = require('../controllers/UsersController');
const auth = require('../middlewares/auth');

router.get('/', auth, UsersController.loadUser);

router.get('/all', auth, UsersController.loadAllUsers);

router.post('/register', validateRegister(), UsersController.register);

router.post('/login', validateLogin(), UsersController.login);

module.exports = router;