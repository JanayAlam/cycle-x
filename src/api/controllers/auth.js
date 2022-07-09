const { auth: authService } = require('../services');
const {UserResponse} = require("../models/view-models");

const register = async (req, res, next) => {
    /**
     * Body:
     *  - nid
     *  - firstName
     *  - lastName
     *  - email
     *  - password
     */
    const { nid, firstName, lastName, email, password } = req.body;
    try {
        const user = await authService.register({
            nid,
            firstName,
            lastName,
            email,
            password,
        })
        const response = new UserResponse(user);
        res.status(201).send({ user: response });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
};
