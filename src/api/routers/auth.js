const router = require('express').Router();
const {reqValidator} = require('../middlewares');
const {registrationReqModel: register, loginReqModel: login} = require('../models/req-models');
const authController = require('../controllers/auth');

/**
 * register a new user into the system
 * @route /api/v1/auth/register
 * @visibility Public
 */
router.post('/register', reqValidator(register), authController.register);

/**
 * login a user to the system
 * @route /api/v1/auth/login
 * @visibility Public
 */
router.post('/login', reqValidator(login), authController.login);

router.get('/forget-password', () => {
});

router.post('/reset-password', () => {
});

module.exports = router;
