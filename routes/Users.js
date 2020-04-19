const router = require('express').Router();
const { check, body } = require('express-validator');
const { validateRegister, validateLogin } = require('../utils/validator');
const UsersController = require('../controllers/UsersController');

router.post('/register', validateRegister(), UsersController.register);

router.post('/login', validateLogin(), UsersController.login);

module.exports = router;