const router = require('express').Router();
const passport = require('passport');
const profileController = require('../controllers/profile');
const { profileReqModel } = require('../models/req-models');
const { upload } = require('../middlewares');
const { reqValidator } = require('../middlewares');

/**
 * change profile details
 * @route /api/v1/profiles/settings/details
 * @method PATCH
 * @visibility Private
 */
router.patch(
    '/settings/details',
    reqValidator(profileReqModel),
    passport.authenticate('jwt', { session: false }, null),
    profileController.changeProfileDetails);

/**
 * change profile photo
 * @route /api/v1/profiles/settings/profile-photo
 * @method PATCH
 * @visibility Private
 */
router.patch(
    '/settings/profile-photo',
    passport.authenticate('jwt', { session: false }, null),
    upload.single('profilePhoto'),
    profileController.changeProfilePhoto
);

/**
 * delete profile photo
 * @route /api/v1/profiles/settings/profile-photo
 * @method DELETE
 * @visibility Private
 */
router.delete(
    '/settings/profile-photo',
    passport.authenticate('jwt', { session: false }, null),
    profileController.deleteProfilePhoto
);

/**
 * get a profile
 * @route /api/v1/profiles/:profileId
 * @method GET
 * @visibility Private
 */
router.get(
    '/:profileId',
    passport.authenticate('jwt', { session: false }, null),
    profileController.get
);

/**
 * get all profile
 * @route /api/v1/profiles
 * @method GET
 * @visibility Private
 */
router.get(
    '/',
    passport.authenticate('jwt', { session: false }, null),
    profileController.getAll
);

module.exports = router;
