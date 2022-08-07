const EmailMessage = require('../email/EmailMessage');
const sendEmail = require('../email/send-email');
const { BadRequestError } = require("../errors/apiErrors");
const generateToken = require("../utils/generate-token");
const { generateHash } = require("../utils/hashing");
const User = require('../models/data-models/User');

/**
 * send email verification token to the user
 * @param to {string}
 * @param token {string}
 */
const sendEmailVerificationToken = (to, token) => {
    const emailMessage = new EmailMessage(
        to,
        'Verification token to activate email address',
        '',
        `
        <h1>Verification token</h1>
        <p>Your email verification token is ${token}. Please activate your account.</p>
        `
    )
    return sendEmail(emailMessage);
};

const update = async (user, email) => {
    // 1: check duplicate user with the email address
    const isValidEmail = await User.findOne({ email });
    if (isValidEmail) {
        throw new BadRequestError('Email is already in use');
    }
    // 2: generate token
    const token = generateToken(8);
    const hashedToken = await generateHash(token);
    // 3: sendd the email
    sendEmailVerificationToken(email, token);
    // 4: save data in the database
    user.emailVerificationToken = hashedToken;
    user.isEmailVerified = false;
    // 5: return the saved user
    return user.save();
}

module.exports = {
    sendEmailVerificationToken,
    update,
};
