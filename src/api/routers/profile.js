const router = require('express').Router();
const passport = require('passport');
const profileController = require('../controllers/profile');
const { profileReqModel } = require('../models/req-models');
const { upload } = require('../middlewares');
const { reqValidator } = require('../middlewares');

router.patch(
    '/settings/details',
    reqValidator(profileReqModel),
    passport.authenticate('jwt', { session: false }, null),
    profileController.changeProfileDetails);

router.patch(
    '/settings/profile-photo',
    passport.authenticate('jwt', { session: false }, null),
    upload.single('profilePhoto'),
    profileController.changeProfilePhoto
)

router.delete(
    '/settings/profile-photo',
    passport.authenticate('jwt', { session: false }, null),
    profileController.deleteProfilePhoto
);

router.get(
    '/:profileId',
    passport.authenticate('jwt', { session: false }, null),
    profileController.get
);

router.get(
    '/',
    passport.authenticate('jwt', { session: false }, null),
    profileController.getAll
);

module.exports = router;
