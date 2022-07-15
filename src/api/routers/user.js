const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/user');
const { reqValidator } = require('../middlewares');
const { userReqModel } = require('../models/req-models')

/**
 * get a user
 * @route /api/v1/users/:userId'
 * @method GET
 * @visibility Private
 */
router.get(
    '/:userId',
    passport.authenticate('jwt', { session: false }, null),
    userController.get
);

/**
 * update a user
 * @route /api/v1/users'
 * @method GET
 * @visibility Private
 */
router.patch(
    '/',
    reqValidator(userReqModel),
    passport.authenticate('jwt', { session: false }, null),
    userController.update
);

/**
 * get all user
 * @route /api/v1/users'
 * @method GET
 * @visibility Private
 */
router.get(
    '/',
    passport.authenticate('jwt', { session: false }, null),
    userController.getAll
);

module.exports = router;
