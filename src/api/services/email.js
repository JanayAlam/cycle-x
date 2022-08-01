const EmailMessage = require('../email/EmailMessage');
const sendEmail = require('../email/send-email');

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

module.exports = {
    sendEmailVerificationToken,
};
