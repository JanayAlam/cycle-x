const { BadRequestError } = require('../errors/apiErrors');
const Profile = require('../models/data-models/Profile');

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

module.exports = {
    findByProperty,
    create,
};
