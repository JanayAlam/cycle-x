const fs = require('fs');
const { BadRequestError, NotFoundError } = require('../errors/apiErrors');
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
    dob,
    rankId,
    accountId,
    mute,
}) => {
    let profile = await findByProperty('user', userId);
    if (profile) {
        throw new BadRequestError(
            'Profile already exist with the provided user'
        );
    }

    profile = new Profile({
        firstName,
        lastName,
        profilePhoto: profilePhoto || '/default/default.png',
        dob,
        user: userId,
        account: accountId,
        rank: rankId,
        mute,
    });
    return profile.save();
};

const update = async (userId, { firstName, lastName, dob, rank, mute }) => {
    // 1: get the profile
    const profile = await findByProperty('user', userId);
    if (!profile) throw new NotFoundError('Profile not found');
    // 2: update the profile with new value
    profile.firstName = firstName ? firstName : profile.firstName;
    profile.lastName = lastName ? lastName : profile.lastName;
    profile.dob = dob ? dob : profile.dob;
    profile.rank = rank ? rank : profile.rank;
    profile.mute = mute ? mute : profile.mute;
    // 3: save the profile and return
    return profile.save();
};

const getAllProfile = () => {
    // 1: get all the profiles and return
    return Profile.find().populate({
        path: 'rank',
        select: '_id rankName discount',
    });
};

const changeProfilePhoto = async (userId, filename) => {
    // 1: get the profile
    const profile = await findByProperty('user', userId);
    if (!profile) throw new NotFoundError('Profile not found');
    // 2: unlink the old photo
    const oldPhoto = profile.profilePhoto;
    const isError = _unlinkProfilePhoto(oldPhoto);
    if (isError) throw isError;
    // 3: set the new profile photo
    profile.profilePhoto = `/profile-photos/${filename}`;
    return profile.save();
};

const deleteProfilePhoto = async (userId) => {
    // 1: get the profile
    const profile = await findByProperty('user', userId);
    if (!profile) throw new NotFoundError('Profile not found');
    // 2: check the profile photo if it is set to default or not
    if (profile.profilePhoto === '/default/default.png')
        throw new BadRequestError(
            'The default profile photo cannot be deleted'
        );
    // 3: unlink the photo if it is not set to default
    const photo = profile.profilePhoto;
    const isError = _unlinkProfilePhoto(photo);
    if (isError) throw isError;
    // 4: update return the new profile data
    profile.profilePhoto = '/default/default.png';
    return profile.save();
};

module.exports = {
    findByProperty,
    create,
    update,
    getAllProfile,
    changeProfilePhoto,
    deleteProfilePhoto,
};
