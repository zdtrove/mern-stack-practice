const router = require('express').Router();
const { check, body } = require('express-validator');
const UsersController = require('../controllers/UsersController');

router.post('/register', [
    check('name', 'Please provide a name').not().isEmpty(),
    check('email', 'Please provide an email').not().isEmpty(),
    check('email', 'Invalid email address').isEmail(),
    check('password', 'Please provide a password').not().isEmpty(),
    check('passwordConfirm', 'Please provide a password').not().isEmpty()
], body('passwordConfirm').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
    }
    return true;
  }), UsersController.register);

router.post('/login', [
    check('email', 'Please provide an email').not().isEmpty(),
    check('email', 'Invalid email address').isEmail(),
    check('password', 'Please provide a password').not().isEmpty()
], UsersController.login);

module.exports = router;