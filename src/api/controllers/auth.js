const { auth: authService, email: emailService } = require('../services');
const { UserResponse, ProfileResponse } = require("../models/view-models");
const { BadRequestError, NotFoundError } = require("../errors/apiErrors");

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
};

const forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        await authService.forgetPassword(email);
        return res.status(203).send();
    } catch (err) {
        next(err);
    }
};

const resetPassword = async (req, res, next) => {
    const { password } = req.body;
    const { token, userId } = req.params;
    try {
        await authService.resetPassword(userId, token, password);
        return res.status(203).send();
    } catch (err) {
        next(err);
    }
};

const changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const { _id } = req.user;
    try {
        await authService.changePassword(_id, oldPassword, newPassword);
        return res.status(203).send();
    } catch (err) {
        next(err);
    }
};

const resendVerificationToken = async (req, res, next) => {
    const { email } = req.user;
    try {
        await authService.resendVerificationToken(email);
        return res.status(203).send();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
    login,
    getMe,
    forgetPassword,
    resetPassword,
    changePassword,
    resendVerificationToken,
};
