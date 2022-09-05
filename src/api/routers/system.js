const router = require('express').Router();
const passport = require('passport');
const systemController = require('../controllers/system');
const { adminOnly } = require('../middlewares');


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

router.patch(
    '/rank-up',
    passport.authenticate('jwt', { session: false }, null),
    adminOnly,
    systemController.rankUp
);

module.exports = router;
