const { AuthenticationError, NotFoundError} = require('../errors/apiErrors');
const userService = require('./user');
const profileService = require('./profile');
const { UserResponse, ProfileResponse} = require('../models/view-models')
const jwt = require('jsonwebtoken');
const { generateHash, compareHashedString } = require('../utils/hashing');
const {user} = require("./index");

const register = async ({
    nid,
    email,
    firstName,
    lastName,
    password,
    dob,
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
        dob,
        userId: user._id,
    });
    const profile =await profilePayload.save();
    // 4: respond with the user object
    return user;
};

const login = async (email, password) => {
    // 1: check for the user with email
    const user = await userService.findByProperty('email', email);
    if (!user) throw new AuthenticationError();
    // 2: validate the password
    const isMatched = await compareHashedString(password, user.password);
    if (!isMatched) throw new AuthenticationError();
    // 3: generate a jwt token and response back
    return jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '2h' });
};

const getMe = async (userId) => {
    // 1: get the user
    const user = await userService.findByProperty('id', userId);
    if (!user) throw new NotFoundError('User not found with the provided id');
    // 2: get the profile
    const profile = await profileService.findByProperty('user', userId);
    if (!profile) throw new NotFoundError('Profile not found with the provided user id');
    // 3: respond back the payload
    return { user, profile };
}

module.exports = {
    register,
    login,
    getMe,
};
