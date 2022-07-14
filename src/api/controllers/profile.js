const { profile: profileService } = require('../services');
const { BadRequestError } = require("../errors/apiErrors");
const { ProfileResponse } = require("../models/view-models");

const get = async (req, res, next) => {
    const { profileId } = req.params;
    try {
        //
    } catch (err) {
        next(err);
    }
};

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

module.exports = {
    get,
    changeProfilePhoto,
};
