const router = require('express').Router();
const { check, body } = require('express-validator');
const { validateRegister } = require('../utils/validator');
const UsersController = require('../controllers/UsersController');

router.post('/register', validateRegister(), UsersController.register);

router.post('/login', [
    check('email', 'Please provide an email').not().isEmpty(),
    check('email', 'Invalid email address').isEmail(),
    check('password', 'Please provide a password').not().isEmpty()
], UsersController.login);

module.exports = router;