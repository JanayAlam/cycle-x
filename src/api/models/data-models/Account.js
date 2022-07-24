const { Schema, model } = require('mongoose');

const accountSchema = new Schema(
    {
        balance: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
            required: true,
        },
        bkashLogo: {
            type: String,
            required: true,
            default: '/default/bkash-logo.png'
        },
        nagadLogo: {
            type: String,
            required: true,
            default: '/default/nagad-logo.png'
        },
        rocketLogo: {
            type: String,
            required: true,
            default: '/default/rocket-logo.png'
        },
    },
    { timestamps: true }
);

const Account = model('Account', accountSchema);

module.exports = Account;
