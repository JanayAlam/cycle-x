const router = require('express').Router();
const passport = require('passport');
const profileController = require('../controllers/profile');
const { upload } = require('../middlewares');

router.get('/:profileId', () => {});

router.put('/:profileId', () => {});

router.patch('/:profileId', () => {});

router.delete('/:profileId', () => {});

router.post('/', () => {});

router.get('/', () => {});

router.patch(
    '/settings/profile-photo',
    passport.authenticate('jwt', { session: false }),
    upload.single('profilePhoto'),
    profileController.changeProfilePhoto
)

module.exports = router;
