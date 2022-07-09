const { BadRequestError } = require('../errors/apiErrors');
const userService = require('./user');
const profileService = require('./profile');
const { generateHash } = require('../utils/hashing');

const register = async ({
    nid,
    email,
    firstName,
    lastName,
    password,
    roles,
    isEmailVerified,
}) => {
    // 1: password hashing
    const hashedPassword = await generateHash(password);
    // 2: creating user
    const userPayload = await userService.create({
        nid,
        email,
        password: hashedPassword,
        roles,
        isEmailVerified,
    });
    const user = await userPayload.save();
    // 3: creating profile
    const profilePayload = await profileService.create({
        firstName,
        lastName,
        userId: user._id,
    });
    await profilePayload.save();
    // 4: responding with the user object
    return user;
};

const login = (email, password) => {
    // TODO
};

module.exports = {
    register,
    login,
};
