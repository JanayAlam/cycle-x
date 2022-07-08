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
    },
    { timestamps: true }
);

const Account = model('Account', accountSchema);

module.exports = Account;
