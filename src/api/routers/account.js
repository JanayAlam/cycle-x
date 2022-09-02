const router = require('express').Router();
const passport = require('passport');
const accountController = require('../controllers/account');

router.patch(
    '/recharge',
    passport.authenticate('jwt', { session: false }, null),
    accountController.recharge
);

module.exports = router;
