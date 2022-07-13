const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        nid: {
            type: String,
            trim: true,
            maxlength: 11,
            minlength: 4,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            validate: {
                validator:
                    /**
                     * validating the email address
                     * @param {string} email the provided email address
                     */
                    (email) => {
                        const regexEmail =
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if (email.match(regexEmail)) {
                            return true;
                        }
                        return false;
                    },
                message: (props) => `${props.email} is a invalid email address`,
            },
        },
        isEmailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        passwordResetToken: {
            type: String,
            trim: true,
            default: null,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        roles: {
            // ADMIN, CONTRIBUTOR, GENERAL
            type: [String],
            required: true,
            default: ['GENERAL'],
        },
    },
    { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
