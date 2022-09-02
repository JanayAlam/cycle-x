const router = require('express').Router();
const passport = require('passport');
const accountController = require('../controllers/account');

router.get(
    '/:accountId',
    passport.authenticate('jwt', { session: false }, null),
    accountController.getHandler
);

module.exports = router;
