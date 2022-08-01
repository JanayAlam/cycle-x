const router = require('express').Router();
const { reqValidator } = require('../middlewares');
const {
    registrationReqModel: register,
    loginReqModel: login,
    forgetPasswordReqModel: forgetPass,
    resetPasswordReqModel: resetPass,
    changePasswordReqModel: changePass
} = require('../models/req-models');
const authController = require('../controllers/auth');
const passport = require('passport');

/**
 * register a new user into the system
 * @route /api/v1/auth/register
 * @method POST
 * @visibility Public
 */
router.post('/register', reqValidator(register), authController.register);

/**
 * login a user to the system
 * @route /api/v1/auth/login
 * @method POST
 * @visibility Public
 */
router.post('/login', reqValidator(login), authController.login);

/**
 * get user and profile object through jwt token
 * @route /api/v1/auth/me
 * @method GET
 * @visibility Private
 */
router.get(
    '/me',
    passport.authenticate('jwt', { session: false }, null),
    authController.getMe
)

/**
 * request for email with a token
 * @route /api/v1/auth/forget-password
 * @method POST
 * @visibility Public
 */
router.post('/forget-password', reqValidator(forgetPass), authController.forgetPassword);

/**
 * reset the password with new one
 * @route /api/v1/auth/reset-password
 * @method POST
 * @visibility Public
 */
router.post(
    '/reset-password/:userId/:token',
    reqValidator(resetPass),
    authController.resetPassword
);

/**
 * change the password with new one
 * @route /api/v1/auth/change-password
 * @method PATCH
 * @visibility Private
 */
router.patch(
    '/change-password',
    reqValidator(changePass),
    passport.authenticate('jwt', { session: false }, null),
    authController.changePassword
);

/**
 * resend the verification token
 * @route /api/v1/auth/resend-email-verification-token
 * @method GET
 * @visibility Private
 */
router.get(
    '/resend-email-verification-token',
    passport.authenticate('jwt', { session: false }, null),
    authController.resendVerificationToken
);

module.exports = router;
