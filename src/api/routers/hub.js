const router = require('express').Router();
const passport = require('passport');
const hubController = require('../controllers/hub');
const { reqValidator, adminOnly } = require('../middlewares');
const { hubReqModel } = require('../models/req-models');

router.get(
    '/:hubId',
    passport.authenticate('jwt', { session: false }, null),
    hubController.getHandler
);

router.post(
    '/',
    reqValidator(hubReqModel),
    passport.authenticate('jwt', { session: false }, null),
    adminOnly,
    hubController.postHandler
);

router.patch(
    '/:hubId',
    reqValidator(hubReqModel),
    passport.authenticate('jwt', { session: false }, null),
    adminOnly,
    hubController.patchHandler
);

router.delete(
    '/:hubId',
    passport.authenticate('jwt', { session: false }, null),
    adminOnly,
    hubController.deleteHandler
);

router.get(
    '/',
    passport.authenticate('jwt', { session: false }, null),
    hubController.getAllHandler
);

module.exports = router;
