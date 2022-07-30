const { AuthenticationError, NotFoundError, BadRequestError, NotAcceptableError} = require('../errors/apiErrors');
const userService = require('./user');
const profileService = require('./profile');
const sendEmail = require('../email/send-email');
const EmailMessage = require('../email/EmailMessage');
const jwt = require('jsonwebtoken');
const { generateHash, compareHashedString } = require('../utils/hashing');
const generateToken = require('../utils/generate-token');
const accountService = require("./account");

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
    // 3: creating an account
    const account = await accountService.create();
    // 4: creating profile
    const profilePayload = await profileService.create({
        firstName,
        lastName,
        dob,
        userId: user._id,
        accountId: account._id,
    });
    await profilePayload.save();
    // 5: respond with the user object
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

const forgetPassword = async (email) => {
    // 1: get the user
    const user = await userService.findByProperty('email', email);
    if (!user) throw new NotFoundError('User not found');
    const token = generateToken(8);
    // 2: saving the token in database
    user.passwordResetToken = await generateHash(token);
    user.save();
    // 3: send email
    const emailMessage = new EmailMessage(
        user.email,
        'Resetting the password',
        `Visit http://localhost:8080/reset-password/${user._id}/${token}`);
    return sendEmail(emailMessage);
}

const resetPassword = async (userId, token, password) => {
    // 1: get the user
    const user = await userService.findByProperty('id', userId);
    if (!user) throw new NotFoundError('User not found');
    // 2: matching the token
    if (!user.passwordResetToken) throw new NotAcceptableError('There are no request for resetting password')
    const isMatched = await compareHashedString(token, user.passwordResetToken);
    if (!isMatched) throw new BadRequestError('Password reset token is not matching');
    // 3: save new password
    user.password = await generateHash(password);
    // 4: remove the token from the database
    user.passwordResetToken = null;
    // 5: saving the user
    return user.save();
}

module.exports = {
    register,
    login,
    getMe,
    forgetPassword,
    resetPassword,
};
