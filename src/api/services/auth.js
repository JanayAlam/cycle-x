const { AuthenticationError } = require('../errors/apiErrors');
const userService = require('./user');
const profileService = require('./profile');
const { UserResponse } = require('../models/view-models')
const jwt = require('jsonwebtoken');
const { generateHash, compareHashedString } = require('../utils/hashing');

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
    const payload = new UserResponse(user);
    return jwt.sign({...payload}, process.env.SECRET_KEY, { expiresIn: '4h' });
};

module.exports = {
    register,
    login,
};
