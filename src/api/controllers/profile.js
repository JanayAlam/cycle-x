const { profile: profileService } = require('../services');
const { BadRequestError, NotFoundError} = require("../errors/apiErrors");
const { ProfileResponse } = require("../models/view-models");

const get = async (req, res, next) => {
    const { profileId } = req.params;
    try {
        const profile = await profileService.findByProperty('id', profileId);
        if (!profile) next(new NotFoundError('Profile not found with provided id'));
        res.status(200).json(new ProfileResponse(profile));
    } catch (err) {
        next(err);
    }
};

const getAll = async (req, res, next) => {
    try {
        const profiles = await profileService.getAllProfile();
        res.status(200).json(profiles.map(profile => {
            return new ProfileResponse(profile);
        }));
    } catch (err) {
        next(err);
    }
};

const changeProfileDetails = async (req, res, next) => {
    const { _id } = req.user;
    const { firstName, lastName, dob } = req.body;
    try {
        const profile = await profileService.update(
            _id,
            { firstName, lastName, dob }
        );
        res.status(200).json(new ProfileResponse(profile));
    } catch (err) {
        next(err);
    }
}

const changeProfilePhoto = async (req, res, next) => {
    const { _id } = req.user;
    try {
        if (!req.file) next(new BadRequestError('Photo is required'));
        const profile = await profileService.changeProfilePhoto(_id, req.file.filename);
        res.status(200).json(new ProfileResponse(profile));
    } catch (err) {
        next(err);
    }
};

const deleteProfilePhoto = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const profile = await profileService.deleteProfilePhoto(_id);
        res.status(200).json(new ProfileResponse(profile));
    } catch (err) {
        next(err);
    }
}

module.exports = {
    get,
    getAll,
    changeProfileDetails,
    changeProfilePhoto,
    deleteProfilePhoto,
};
