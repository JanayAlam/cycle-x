const router = require('express').Router();
const {reqValidator} = require('../middlewares');
const {registrationReqModel: register,
    loginReqModel: login,
    forgetPasswordReqModel: forgetPass,
    resetPasswordReqModel: resetPass} = require('../models/req-models');
const authController = require('../controllers/auth');
const passport = require('passport');

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

/**
 * get user and profile object through jwt token
 * @route /api/v1/auth/me
 * @visibility Private
 */
router.get('/me', passport.authenticate('jwt', { session: false }), authController.getMe)

/**
 * request for email with a token
 * @route /api/v1/auth/forget-password
 * @visibility Public
 */
router.post('/forget-password', reqValidator(forgetPass), authController.forgetPassword);

/**
 * reset the password with new one
 * @route /api/v1/auth/reset-password
 * @visibility Public
 */
router.post('/reset-password/:userId/:token', reqValidator(resetPass), authController.resetPassword);

module.exports = router;
