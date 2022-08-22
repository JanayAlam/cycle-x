const router = require('express').Router();
const passport = require('passport');
const cycleController = require('../controllers/cycle');
const { reqValidator, adminOnly } = require('../middlewares');
const {  cycleReqModel, cycleUpdateModel } = require('../models/req-models');

router.get(
    '/:cycleId',
    passport.authenticate('jwt', { session: false }, null),
    cycleController.getHandler
);

router.post(
    '/',
    reqValidator(cycleReqModel),
    passport.authenticate('jwt', { session: false }, null),
    adminOnly,
    cycleController.postHandler
);

router.patch(
    '/:cycleId',
    reqValidator(cycleUpdateModel),
    passport.authenticate('jwt', { session: false }, null),
    adminOnly,
    cycleController.patchHandler
);

router.delete(
    '/:cycleId',
    passport.authenticate('jwt', { session: false }, null),
    adminOnly,
    cycleController.deleteHandler
);

router.get(
    '/',
    passport.authenticate('jwt', { session: false }, null),
    cycleController.getAllHandler
);

module.exports = router;
