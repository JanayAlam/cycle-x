const { InternalServerError } = require('../errors/apiErrors');
const transporter = require('./transporter');


/**
 * send the email to a desire address
 * @param {EmailMessage} emailMessage the EmailMessage class's instance
 */
module.exports = async (emailMessage) => {
    try {
        await transporter.sendMail(emailMessage.getEmailObject());
    } catch (error) {
        throw new InternalServerError(
            `Failed to send email${
                emailMessage.to ? (' to ' + emailMessage.to + '.') : '.'
            } -> ${error.message}.`
        );
    }
}