const { user: userService } = require('../services');
const { NotFoundError } = require("../errors/apiErrors");
const { UserResponse} = require("../models/view-models");

const get = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await userService.findByProperty('id', userId);
        if (!user) next(new NotFoundError('User not found with the provided id'));
        res.status(200).json(new UserResponse(user));
    } catch (err) {
        next(err);
    }
};

const getAll = async (req, res, next) => {
    try {
        const users = await userService.getAllUser();
        res.status(200).json(users.map(user => {
            return new UserResponse(user);
        }));
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    const { _id } = req.user;
    const { nid, email } = req.body;
    try {
        const user = await userService.update(_id, { nid, email });
        res.status(200).json(new UserResponse(user));
    } catch (err) {
        next(err);
    }
};


module.exports = {
    get,
    getAll,
    update,
};
