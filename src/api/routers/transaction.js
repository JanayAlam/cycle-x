const router = require('express').Router();
const passport = require('passport');
const transactionController = require('../controllers/transaction');
const { adminOnly } = require('../middlewares');

router.post(
    '/',
    passport.authenticate('jwt', { session: false }, null),
    transactionController.createHandler
);

router.get(
    '/',
    passport.authenticate('jwt', { session: false }, null),
    adminOnly,
    transactionController.getAllHandler
);

router.get(
    '/:transactionId',
    passport.authenticate('jwt', { session: false }, null),
    transactionController.getHandler
);

module.exports = router;
