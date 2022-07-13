const { profile: profileService } = require('../services');
const {UserResponse} = require("../models/view-models");

const get = async (req, res, next) => {
    const { profileId } = req.params;
    try {
        //
    } catch (err) {
        next(err);
    }
};

module.exports = {
    get,
};
