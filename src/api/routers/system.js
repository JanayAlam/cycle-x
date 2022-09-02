const router = require('express').Router();
const passport = require('passport');
const systemController = require('../controllers/system');

router.patch(
    '/book',
    passport.authenticate('jwt', { session: false }, null),
    systemController.bookCycle
);

router.patch(
    '/finish-riding',
    passport.authenticate('jwt', { session: false }, null),
    systemController.finishRiding
);

module.exports = router;
