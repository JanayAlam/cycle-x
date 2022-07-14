const fs = require('fs');
const { BadRequestError, NotFoundError, InternalServerError} = require('../errors/apiErrors');
const Profile = require('../models/data-models/Profile');

const _unlinkProfilePhoto = (img) => {
    if (img !== '/default/default.png' || !img) {
        fs.unlink(`public${img}`, (error) => {
            if (error) {
                return error;
            }
            return null;
        });
    }
    return null;
};

const findByProperty = (key, value) => {
    if (key === 'id') {
        return Profile.findById(value);
    }
    return Profile.findOne({ [key]: value });
};

const create = async ({
    firstName,
    lastName,
    profilePhoto,
    userId,
    bio,
    dob,
    rank,
    mute,
}) => {
    let profile = await findByProperty('user', userId);
    if (profile) {
        throw new BadRequestError('Profile already exist with the provided user');
    }

    profile = new Profile({
        firstName,
        lastName,
        profilePhoto, // TODO: default string value
        bio,
        dob,
        user: userId,
        rank,
        mute,
    });
    return profile.save();
};

const changeProfilePhoto = async (userId, filename) => {
    // 1: get the profile
    const profile = await findByProperty('user', userId);
    if (!profile) throw NotFoundError('Profile not found');
    // 2: unlink the old photo
    const oldPhoto = profile.profilePhoto;
    const isError = _unlinkProfilePhoto(oldPhoto);
    if (isError) throw isError;
    // 3: set the new profile photo
    profile.profilePhoto = `/profile-photos/${filename}`;
    return profile.save();
};

module.exports = {
    findByProperty,
    create,
    changeProfilePhoto,
};
