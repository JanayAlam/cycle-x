const { auth: authService } = require('../services');
const {UserResponse, ProfileResponse} = require("../models/view-models");

const register = async (req, res, next) => {
    /**
     * Body:
     *  - nid
     *  - firstName
     *  - lastName
     *  - email
     *  - password
     */
    const { nid, firstName, lastName, email, dob, password } = req.body;
    try {
        const user = await authService.register({
            nid,
            firstName,
            lastName,
            dob,
            email,
            password,
        })
        const response = new UserResponse(user);
        res.status(201).send({ ...response });
    } catch (err) {
        next(err);
    }
};

/**
     * Body:
     *  - email
     *  - password
     */
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const token = await authService.login(email, password);
        return res.status(200).json({ token });
    } catch (err) {
        next(err);
    }
};

const getMe = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const payload = await authService.getMe(_id);
        return res.status(200).json({
            user: new UserResponse(payload.user),
            profile: new ProfileResponse(payload.profile),
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    register,
    login,
    getMe,
};
